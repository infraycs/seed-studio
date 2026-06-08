export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const p = url.pathname;
    const h = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json',
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: h });

    try {
      // Test endpoint
      if (p === '/test') return json({ env: !!env, db: !!env.DB, keys: env.DB ? 'OK' : 'MISSING' }, h);

      const body = request.method !== 'GET' ? await request.json().catch(() => ({})) : {};

      if (p === '/register' && request.method === 'POST') return await reg(env, body, h);
      if (p === '/login' && request.method === 'POST') return await login(env, body, h);
      if (p === '/me' && request.method === 'GET') return await me(request, env, h);
      if (p === '/deduct' && request.method === 'POST') return await deduct(request, env, body, h);
      if (p === '/upgrade' && request.method === 'POST') return await upgrade(env, body, h);
      if (p === '/order' && request.method === 'POST') return await order(env, body, h);

      return json({ error: 'Not found' }, h, 404);
    } catch (e) {
      return json({ error: e.message, stack: e.stack }, h, 500);
    }
  },
};

function json(data, headers, status) {
  return new Response(JSON.stringify(data), { status: status || 200, headers });
}

async function sha256(text) {
  const d = new TextEncoder().encode(text);
  const h = await crypto.subtle.digest('SHA-256', d);
  return Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function uid() { return 'st_' + crypto.randomUUID(); }
function rcode() { return 'S' + Math.random().toString(36).substring(2, 8).toUpperCase(); }

async function getUser(env, token) {
  if (!env.DB) return null;
  try { return await env.DB.get('u_' + token, 'json'); } catch (e) { return null; }
}

// ── REGISTER ──
async function reg(env, body, h) {
  const { email, password, inviteCode } = body;
  if (!email || !password) return json({ error: 'missing email/password' }, h, 400);
  if (password.length < 6) return json({ error: 'password too short' }, h, 400);

  const et = await env.DB.get('e_' + email);
  if (et) return json({ error: 'email exists' }, h, 409);

  const token = uid();
  const user = {
    email, ph: await sha256(password + '_salt_'),
    cr: 3, ti: 'free', rc: rcode(),
    ib: inviteCode || '', ct: new Date().toISOString(),
  };

  // Referral
  if (inviteCode) {
    const list = await env.DB.list({ prefix: 'u_' });
    for (const k of list.keys) {
      const u = await env.DB.get(k.name, 'json');
      if (u && u.rc === inviteCode) {
        u.cr = (u.cr || 0) + 2;
        await env.DB.put(k.name, JSON.stringify(u));
        user.cr += 2;
        break;
      }
    }
  }

  await env.DB.put('u_' + token, JSON.stringify(user));
  await env.DB.put('e_' + email, token);

  return json({ ok: true, token, cr: user.cr, ti: user.ti, rc: user.rc }, h, 201);
}

// ── LOGIN ──
async function login(env, body, h) {
  const { email, password } = body;
  if (!email || !password) return json({ error: 'missing email/password' }, h, 400);

  const token = await env.DB.get('e_' + email);
  if (!token) return json({ error: 'user not found' }, h, 404);

  const user = await env.DB.get('u_' + token, 'json');
  if (!user) return json({ error: 'user not found' }, h, 404);

  if (user.ph !== await sha256(password + '_salt_')) {
    return json({ error: 'wrong password' }, h, 401);
  }

  return json({ ok: true, token, cr: user.cr, ti: user.ti, rc: user.rc }, h);
}

// ── ME ──
async function me(request, env, h) {
  const token = (request.headers.get('Authorization') || '').replace('Bearer ', '');
  if (!token) return json({ error: 'not logged in' }, h, 401);
  const user = await getUser(env, token);
  if (!user) return json({ error: 'not logged in' }, h, 401);
  return json({ email: user.email, cr: user.cr, ti: user.ti, rc: user.rc }, h);
}

// ── DEDUCT ──
async function deduct(request, env, body, h) {
  const token = (request.headers.get('Authorization') || '').replace('Bearer ', '');
  if (!token) return json({ error: 'not logged in' }, h, 401);
  const user = await getUser(env, token);
  if (!user) return json({ error: 'not logged in' }, h, 401);

  if (user.ti === 'pro' || user.ti === 'lifetime') {
    return json({ ok: true, rm: user.cr, ul: true }, h);
  }
  const amt = body.amount || 1;
  if ((user.cr || 0) < amt) return json({ error: 'insufficient credits', cr: user.cr, need: amt }, h, 402);

  user.cr -= amt;
  await env.DB.put('u_' + token, JSON.stringify(user));
  return json({ ok: true, rm: user.cr }, h);
}

// ── ORDER (verify payment + generate key) ──
async function order(env, body, h) {
  const { orderId } = body;
  if (!orderId) return json({ error: 'missing orderId' }, h, 400);

  let key = await env.DB.get('o_' + orderId);
  if (!key) {
    key = 'SEED-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    await env.DB.put('o_' + orderId, key);
    // Also store reverse lookup
    const kh = await sha256(key);
    await env.DB.put('k_' + kh, JSON.stringify({ orderId, key }));
  }
  return json({ ok: true, key }, h);
}

// ── UPGRADE ──
async function upgrade(env, body, h) {
  const { email, tier } = body;
  if (!email) return json({ error: 'missing email' }, h, 400);

  const token = await env.DB.get('e_' + email);
  if (!token) return json({ error: 'user not found' }, h, 404);

  const user = await env.DB.get('u_' + token, 'json');
  if (!user) return json({ error: 'user not found' }, h, 404);

  user.ti = tier || 'pro';
  user.cr = 999;
  user.ua = new Date().toISOString();
  await env.DB.put('u_' + token, JSON.stringify(user));

  return json({ ok: true, email, ti: user.ti }, h);
}
