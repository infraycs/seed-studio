# Static-Site License Verification — Seed Studio

> **Challenge**: Verify LemonSqueezy purchases on a fully static site with no backend server.
> **Solution**: Overlay SDK for initial activation + Cloudflare Worker as lightweight CORS proxy for re-verification.

---

## 1. The Core Problem

LemonSqueezy's license verification API (`POST /v1/licenses/validate`) requires an API key and cannot be called directly from a browser due to CORS restrictions. A static site has no backend to proxy this request.

### Attack Vectors We Defend Against

| Threat | Severity | Mitigation |
|--------|----------|------------|
| User manually sets `localStorage` to fake Pro | Medium | Re-verify via Worker on app load; invalid keys fail |
| User shares license key publicly | Medium | LemonSqueezy limits activation count per key |
| Expired/canceled subscription still showing Pro | High | Monthly/Yearly keys re-verified every 24h |
| Worker endpoint abused as open proxy | Low | Rate limiting + only proxies to LemonSqueezy API |
| Refunded purchase still showing Pro | Medium | Re-verification catches invalidated keys |

---

## 2. Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     STATIC SITE (seed.studio)             │
│                                                          │
│  ┌─────────────────┐     ┌─────────────────────────────┐ │
│  │  Checkout Flow   │     │     App Bootstrap            │ │
│  │                  │     │                              │ │
│  │  LemonSqueezy    │     │  1. Read localStorage        │ │
│  │  Overlay SDK ────┼────→│  2. If license_key exists:   │ │
│  │  lemonsqueezy.js │     │     ├─ Lifetime: skip verify │ │
│  │                  │     │     ├─ Monthly: verify if    │ │
│  │  onSuccess() →   │     │     │  last check > 24h ago  │ │
│  │    save to       │     │     └─ Yearly: verify if     │ │
│  │    localStorage  │     │        last check > 24h ago  │ │
│  └─────────────────┘     │  3. Set S.tier = 'pro'|'free'│ │
│                           └──────────┬──────────────────┘ │
│                                      │                    │
└──────────────────────────────────────┼────────────────────┘
                                       │ HTTPS
                                       ▼
┌──────────────────────────────────────────────────────────┐
│           CLOUDFLARE WORKER (license.seed.studio)         │
│                                                          │
│  POST /api/verify-license                                │
│  Body: { license_key: "xxxx-xxxx", instance_id: "..." }  │
│                                                          │
│  1. Validate input (rate limit, format check)            │
│  2. Forward to LemonSqueezy:                             │
│     POST https://api.lemonsqueezy.com/v1/licenses/        │
│          validate                                        │
│     Headers: Authorization: Bearer {API_KEY}             │
│     Body: { license_key, instance_id }                   │
│  3. Return sanitized response to browser:               │
│     { valid, plan, expires_at, status }                  │
│                                                          │
│  Never exposes the API key to the client.                │
└──────────────────────────────────────────────────────────┘
```

---

## 3. localStorage Schema

Key: `seedstudio_license`

```json
{
  "version": 1,
  "license_key": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "tier": "pro",
  "plan": "monthly",
  "activated_at": "2026-06-08T14:30:00.000Z",
  "expires_at": "2026-07-08T14:30:00.000Z",
  "verified_at": "2026-06-08T14:30:00.000Z",
  "instance_id": "seedstudio-browser-{random-32-hex}",
  "customer_email": "user@example.com",
  "order_id": 123456
}
```

### Field Details

| Field | Source | Notes |
|-------|--------|-------|
| `license_key` | From `onSuccess` callback | The actual LemonSqueezy license key |
| `tier` | Derived from variant | Always `"pro"` for paying users |
| `plan` | Derived from variant | `"monthly"`, `"yearly"`, or `"lifetime"` |
| `activated_at` | `Date.now()` at purchase | When the user completed checkout |
| `expires_at` | From verify response | When subscription ends (null for lifetime) |
| `verified_at` | `Date.now()` at last verify | Used to determine if re-verification needed |
| `instance_id` | Generated once per browser | Sent to LemonSqueezy's instance tracking |
| `customer_email` | From `onSuccess` | For display purposes only |
| `order_id` | From `onSuccess` | For support reference |

### Instance ID

Generated once per browser profile, persisted alongside the license:
```js
function getInstanceId() {
  let id = localStorage.getItem('seedstudio_instance_id');
  if (!id) {
    id = 'seedstudio-' + crypto.randomUUID();
    localStorage.setItem('seedstudio_instance_id', id);
  }
  return id;
}
```

This is sent to LemonSqueezy's license validation endpoint so they can track distinct installations per license. LemonSqueezy allows up to 10 activations per license by default.

---

## 4. Verification Flow (Detailed)

### 4.1 Initial Activation (Checkout Complete)

```
User completes LemonSqueezy checkout
         │
         ▼
LemonSqueezy overlay fires onSuccess({
  order: { id, identifier, ... },
  license_key: { key, status, ... },
  product: { name, variant_name, ... },
  customer: { email, name, ... }
})
         │
         ▼
seedstudioLicense.activate(payload):
  1. Determine plan from variant_name:
     - contains "monthly" → plan = "monthly"
     - contains "yearly"  → plan = "yearly"
     - contains "lifetime" → plan = "lifetime"
  2. Call Worker /api/verify-license to validate key
  3. If valid, compute expires_at from verify response
  4. Write full license object to localStorage
  5. Call onLicenseChange() callback
  6. Set S.tier = 'pro'
  7. Show toast: "Pro activated! 🚀"
```

### 4.2 App Bootstrap (Every Page Load)

```
DOMContentLoaded
         │
         ▼
seedstudioLicense.init():
  1. Read localStorage 'seedstudio_license'
  2. If no license → S.tier = 'free', return
  3. If plan === 'lifetime':
     - S.tier = 'pro' (no re-verification needed)
     - return
  4. If plan === 'monthly' || 'yearly':
     - If (now - verified_at) > 24 hours:
       - Call Worker /api/verify-license
       - If valid:
         - Update expires_at, verified_at
         - S.tier = 'pro'
       - If invalid (expired/canceled):
         - Clear license from localStorage
         - S.tier = 'free'
         - Show toast: "Pro subscription expired"
     - Else:
       - S.tier = 'pro' (cached verification still fresh)
```

### 4.3 Periodic Re-verification

For monthly/yearly plans, re-verify every 24 hours while the app is in use:
```js
// In the license manager
setInterval(() => {
  if (plan === 'monthly' || plan === 'yearly') {
    verifyLicense().then(valid => {
      if (!valid) revokeLicense();
    });
  }
}, 24 * 60 * 60 * 1000);
```

---

## 5. Cloudflare Worker Implementation

### Deployment

```bash
# From project root
npx wrangler deploy functions/license-verify.js
```

Or deploy via Cloudflare Dashboard → Workers & Pages → Create Worker.

### Worker Code

See `functions/license-verify.js` for the full implementation. Key design decisions:

- **Rate limiting**: Max 10 requests per minute per IP (prevents abuse as open proxy)
- **CORS**: Only allows requests from `https://seed.studio` and `https://*.pages.dev`
- **Input validation**: Checks that `license_key` matches expected UUID format
- **Response sanitization**: Strips sensitive data (customer PII, full order details) before returning to client
- **Environment variable**: `LEMONSQUEEZY_API_KEY` set via `wrangler secret put`

### Worker Routes

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/verify-license` | Validate a license key |
| `GET` | `/api/health` | Health check (returns OK) |
| `OPTIONS` | `*` | CORS preflight |

---

## 6. Security Considerations

### What This System Protects Against
- Casual tampering with localStorage
- Using expired/canceled license keys
- License key sharing across many users (instance limit)

### What It Does NOT Protect Against
- A determined user who modifies the site's JavaScript (all client-side checks can be bypassed)
- A user who patches `S.tier = 'pro'` directly in devtools

**This is acceptable** because:
1. The watermark + resolution cap are cosmetic restrictions. A technically proficient user could screenshot the canvas at full res anyway.
2. The commercial license is the primary Pro value proposition. Using Pro features without a license still leaves the user without legal commercial rights.
3. The target market (designers, creators) values convenience and legal compliance over saving $15.

### If Stronger DRM Is Needed Later
- Move rendering to a server-side API (requires backend)
- Sign exports with a cryptographic watermark
- Require license key for server-side 4K rendering

---

## 7. Fallback & Error Handling

| Scenario | Behavior |
|----------|----------|
| Worker is down / unreachable | Use cached verification for up to 7 days, then revert to free |
| LemonSqueezy API is down | Retry 3 times with exponential backoff, keep cached status |
| User clears localStorage | Reverts to free tier, can re-activate with same license key |
| License key revoked (refund) | Next re-verification clears Pro status |
| Invalid license key format | Rejected before API call (client-side validation) |
