/**
 * Seed Studio API — Cloudflare Worker
 * Endpoint: odd-sky-4c45.402741165.workers.dev
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json',
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers });

    try {
      if (path === '/register' && request.method === 'POST') return await handleRegister(request, env, headers);
      if (path === '/login' && request.method === 'POST') return await handleLogin(request, env, headers);
      if (path === '/me' && request.method === 'GET') return await handleMe(request, env, headers);
      if (path === '/deduct' && request.method === 'POST') return await handleDeduct(request, env, headers);
      if (path === '/upgrade' && request.method === 'POST') return await handleUpgrade(request, env, headers);
      if (path === '/verify-payment' && request.method === 'POST') return await handleVerifyPayment(request, env, headers);
      if (path === '/export' && request.method === 'POST') return await handleExport(request, env, headers);

      return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500, headers });
    }
  },
};

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateToken() {
  return 'st_' + crypto.randomUUID();
}

async function getUser(env, token) {
  const data = await env.DB.get('user_' + token, 'json');
  return data;
}

async function getUserByToken(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.replace('Bearer ', '');
  if (!token) return null;
  return await getUser(env, token);
}

// ═══════════════ REGISTER ═══════════════
async function handleRegister(request, env, headers) {
  const { email, password, inviteCode } = await request.json();
  if (!email || !password) return new Response(JSON.stringify({ error: '邮箱和密码必填' }), { status: 400, headers });
  if (password.length < 6) return new Response(JSON.stringify({ error: '密码至少6位' }), { status: 400, headers });

  const existing = await env.DB.get('email_' + email);
  if (existing) return new Response(JSON.stringify({ error: '该邮箱已注册' }), { status: 409, headers });

  const token = generateToken();
  const referralCode = 'S' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const user = {
    email, referralCode,
    passwordHash: await sha256(password + 'seedstudio_salt'),
    credits: 3, tier: 'free',
    invitedBy: inviteCode || '',
    createdAt: new Date().toISOString(),
  };

  await env.DB.put('user_' + token, JSON.stringify(user));
  await env.DB.put('email_' + email, token);

  // Referral bonus
  if (inviteCode) {
    // Find inviter by scanning all users (limited in KV, but OK for small scale)
    const list = await env.DB.list({ prefix: 'user_' });
    for (const key of list.keys) {
      const u = await env.DB.get(key.name, 'json');
      if (u && u.referralCode === inviteCode) {
        u.credits = (u.credits || 0) + 2;
        await env.DB.put(key.name, JSON.stringify(u));
        user.credits += 2;
        await env.DB.put('user_' + token, JSON.stringify(user));
        break;
      }
    }
  }

  return new Response(JSON.stringify({ token, credits: user.credits, tier: user.tier, referralCode }), { status: 201, headers });
}

// ═══════════════ LOGIN ═══════════════
async function handleLogin(request, env, headers) {
  const { email, password } = await request.json();
  if (!email || !password) return new Response(JSON.stringify({ error: '邮箱和密码必填' }), { status: 400, headers });

  const token = await env.DB.get('email_' + email);
  if (!token) return new Response(JSON.stringify({ error: '账号不存在' }), { status: 404, headers });

  const user = await getUser(env, token);
  if (!user) return new Response(JSON.stringify({ error: '账号不存在' }), { status: 404, headers });

  const pwHash = await sha256(password + 'seedstudio_salt');
  if (user.passwordHash !== pwHash) return new Response(JSON.stringify({ error: '密码错误' }), { status: 401, headers });

  return new Response(JSON.stringify({ token, credits: user.credits, tier: user.tier, referralCode: user.referralCode }), { headers });
}

// ═══════════════ ME ═══════════════
async function handleMe(request, env, headers) {
  const user = await getUserByToken(request, env);
  if (!user) return new Response(JSON.stringify({ error: '未登录' }), { status: 401, headers });
  return new Response(JSON.stringify({ email: user.email, credits: user.credits, tier: user.tier, referralCode: user.referralCode }), { headers });
}

// ═══════════════ DEDUCT ═══════════════
async function handleDeduct(request, env, headers) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.replace('Bearer ', '');
  if (!token) return new Response(JSON.stringify({ error: '未登录' }), { status: 401, headers });

  const user = await getUser(env, token);
  if (!user) return new Response(JSON.stringify({ error: '未登录' }), { status: 401, headers });

  const { amount } = await request.json();
  const deduct = amount || 1;

  if (user.tier === 'pro' || user.tier === 'lifetime') {
    return new Response(JSON.stringify({ deducted: 0, remaining: user.credits, unlimited: true }), { headers });
  }
  if ((user.credits || 0) < deduct) {
    return new Response(JSON.stringify({ error: '积分不足' }), { status: 402, headers });
  }

  user.credits -= deduct;
  await env.DB.put('user_' + token, JSON.stringify(user));
  return new Response(JSON.stringify({ deducted: deduct, remaining: user.credits }), { headers });
}

// ═══════════════ EXPORT (deduct + log) ═══════════════
async function handleExport(request, env, headers) {
  return await handleDeduct(request, env, headers);
}

// ═══════════════ UPGRADE (admin) ═══════════════
async function handleUpgrade(request, env, headers) {
  const { email, tier } = await request.json();
  if (!email) return new Response(JSON.stringify({ error: 'Missing email' }), { status: 400, headers });

  const token = await env.DB.get('email_' + email);
  if (!token) return new Response(JSON.stringify({ error: '用户不存在' }), { status: 404, headers });

  const user = await getUser(env, token);
  if (!user) return new Response(JSON.stringify({ error: '用户不存在' }), { status: 404, headers });

  user.tier = tier || 'pro';
  user.credits = 999;
  user.upgradedAt = new Date().toISOString();
  await env.DB.put('user_' + token, JSON.stringify(user));

  return new Response(JSON.stringify({ success: true, email, tier: user.tier }), { headers });
}

// ═══════════════ VERIFY PAYMENT ═══════════════
async function handleVerifyPayment(request, env, headers) {
  const { orderId } = await request.json();
  if (!orderId) return new Response(JSON.stringify({ error: 'Missing orderId' }), { status: 400, headers });

  // Check if already processed
  const existing = await env.DB.get('order_' + orderId);
  if (existing) {
    return new Response(JSON.stringify({ verified: true, key: existing }), { headers });
  }

  // Generate license key
  const key = 'SEED-PRO-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  const keyHash = await sha256(key);

  // Store
  await env.DB.put('order_' + orderId, key);
  await env.DB.put('key_' + keyHash, JSON.stringify({ orderId, key, createdAt: new Date().toISOString() }));

  return new Response(JSON.stringify({ verified: true, key, orderId }), { headers });
}
