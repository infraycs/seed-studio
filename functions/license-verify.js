/**
 * Cloudflare Worker — License Verification Proxy
 *
 * Deploy: npx wrangler deploy functions/license-verify.js
 * Secret:  npx wrangler secret put LEMONSQUEEZY_API_KEY
 *
 * Routes POST /api/verify-license to LemonSqueezy's license validation API
 * while keeping the API key server-side (never exposed to browser).
 *
 * CORS is restricted to seed.studio and *.pages.dev origins.
 * Rate limited to 10 requests per minute per IP.
 */

// ──────────────────────────────────────────────
// CONFIGURATION
// ──────────────────────────────────────────────

// Replace with your actual seed.studio domain
const ALLOWED_ORIGINS = [
  'https://seed.studio',
  'https://www.seed.studio',
  'https://seedstudio.pages.dev',
  'http://localhost:8080',
  'http://localhost:3000',
  'http://127.0.0.1:8080',
  'http://127.0.0.1:3000',
];

// Rate limiting: max requests per minute per IP
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_SEC = 60;

// Simple in-memory rate limit store
// (resets on Worker cold start; use KV for production if needed)
const rateLimitMap = new Map();

// ──────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────

function isOriginAllowed(origin) {
  if (!origin) return false;
  return ALLOWED_ORIGINS.some(function (allowed) {
    // Exact match or wildcard match (*.pages.dev)
    if (allowed === origin) return true;
    if (allowed.indexOf('*') !== -1) {
      var pattern = allowed.replace(/\*/g, '.*');
      return new RegExp('^' + pattern + '$').test(origin);
    }
    return false;
  });
}

function rateLimitExceeded(ip) {
  var now = Math.floor(Date.now() / 1000);
  var windowStart = now - RATE_LIMIT_WINDOW_SEC;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  var timestamps = rateLimitMap.get(ip).filter(function (ts) {
    return ts > windowStart;
  });

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);

  // Clean up old entries periodically (every ~100 requests to this IP)
  if (timestamps.length > 100) {
    rateLimitMap.set(ip, timestamps.slice(-50));
  }

  return timestamps.length > RATE_LIMIT_MAX;
}

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Will be tightened per-request
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

function errorResponse(message, status, origin) {
  return new Response(JSON.stringify({ error: message }), {
    status: status || 400,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// ──────────────────────────────────────────────
// LICENSE KEY FORMAT VALIDATION
// ──────────────────────────────────────────────

function isValidLicenseKeyFormat(key) {
  if (!key || typeof key !== 'string') return false;
  // LemonSqueezy license keys are UUID-like:
  // xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (36 chars with dashes)
  // or 32 hex chars without dashes
  var cleaned = key.replace(/-/g, '');
  return /^[0-9a-f]{32}$/i.test(cleaned) || /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(key);
}

// ──────────────────────────────────────────────
// LEMONSQUEEZY API CALL
// ──────────────────────────────────────────────

async function verifyWithLemonSqueezy(licenseKey, instanceId) {
  var apiKey = LEMONSQUEEZY_API_KEY;
  if (!apiKey) {
    throw new Error('LEMONSQUEEZY_API_KEY not configured');
  }

  var body = {
    license_key: licenseKey,
    instance_id: instanceId || 'seedstudio-web',
  };

  var response = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('LemonSqueezy API returned HTTP ' + response.status);
  }

  return response.json();
}

// ──────────────────────────────────────────────
// RESPONSE SANITIZATION
// ──────────────────────────────────────────────

function sanitizeResponse(lsResponse) {
  // Extract only what the client needs — strip PII and sensitive data
  var data = lsResponse.data || lsResponse;

  var license = data.license_key || data;
  var meta = data.meta || {};

  return {
    valid: license.status === 'active' || license.status_formatted === 'Active',
    plan: (license.variant_name || meta.variant_name || '').toLowerCase(),
    status: license.status || 'unknown',
    expires_at: license.expires_at || null,
    // Only include email if present (for display, not verification)
    customer_email: license.customer_email || meta.customer_email || null,
  };
}

// ──────────────────────────────────────────────
// REQUEST HANDLER
// ──────────────────────────────────────────────

async function handleRequest(request) {
  var url = new URL(request.url);
  var origin = request.headers.get('Origin') || '';
  var clientIp = request.headers.get('CF-Connecting-IP') || 'unknown';

  // ── CORS Preflight ──
  if (request.method === 'OPTIONS') {
    var allowOrigin = isOriginAllowed(origin) ? origin : ALLOWED_ORIGINS[0];
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': allowOrigin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // ── Health Check ──
  if (request.method === 'GET' && url.pathname === '/api/health') {
    return jsonResponse({ status: 'ok', timestamp: new Date().toISOString() });
  }

  // ── Route: POST /api/verify-license ──
  if (request.method === 'POST' && url.pathname === '/api/verify-license') {
    // CORS check
    if (!isOriginAllowed(origin)) {
      return errorResponse('Origin not allowed', 403, origin);
    }

    // Rate limit
    if (rateLimitExceeded(clientIp)) {
      return errorResponse('Rate limit exceeded. Try again later.', 429, origin);
    }

    // Parse body
    var body;
    try {
      body = await request.json();
    } catch (e) {
      return errorResponse('Invalid JSON body', 400, origin);
    }

    var licenseKey = body.license_key;
    var instanceId = body.instance_id || 'seedstudio-web';

    // Validate input format
    if (!licenseKey || !isValidLicenseKeyFormat(licenseKey)) {
      return jsonResponse({
        valid: false,
        reason: 'invalid_license_key_format',
      }, 200, origin);
    }

    // Call LemonSqueezy API
    try {
      var lsResponse = await verifyWithLemonSqueezy(licenseKey, instanceId);
      var sanitized = sanitizeResponse(lsResponse);
      sanitized.verified_at = new Date().toISOString();

      var resp = jsonResponse(sanitized, 200);
      resp.headers.set('Access-Control-Allow-Origin', origin);
      return resp;
    } catch (err) {
      console.error('LemonSqueezy API error:', err.message);
      // Return a "grace" error — client should keep cached status
      var resp = jsonResponse({
        valid: null,
        reason: 'verification_service_unavailable',
        error: 'Unable to verify license at this time. Cached status will be used.',
      }, 502);
      resp.headers.set('Access-Control-Allow-Origin', origin);
      return resp;
    }
  }

  // ── 404 ──
  return errorResponse('Not Found', 404, origin);
}

// ──────────────────────────────────────────────
// EVENT LISTENER
// ──────────────────────────────────────────────

addEventListener('fetch', function (event) {
  event.respondWith(handleRequest(event.request));
});

// ──────────────────────────────────────────────
// PERIODIC CLEANUP (runs on cron trigger)
// ──────────────────────────────────────────────

addEventListener('scheduled', function (event) {
  if (event.cron === '*/30 * * * *') {
    // Clean up rate limit map every 30 minutes to prevent memory leaks
    var now = Math.floor(Date.now() / 1000);
    var cutoff = now - RATE_LIMIT_WINDOW_SEC * 2;

    rateLimitMap.forEach(function (timestamps, ip) {
      var fresh = timestamps.filter(function (ts) { return ts > cutoff; });
      if (fresh.length === 0) {
        rateLimitMap.delete(ip);
      } else {
        rateLimitMap.set(ip, fresh);
      }
    });
  }
});
