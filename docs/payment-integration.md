# Seed Studio Payment Integration — LemonSqueezy Setup

> **Architecture**: Static HTML site (no backend) using LemonSqueezy hosted checkout with JavaScript overlay SDK. License verification via Cloudflare Worker CORS proxy.

---

## 1. Product Configuration in LemonSqueezy

Log into [LemonSqueezy Dashboard](https://app.lemonsqueezy.com) and create three products under one store.

### Product 1: Pro Monthly

| Field | Value |
|-------|-------|
| Name | Seed Studio Pro — Monthly |
| Description | Full access to all 5 layout engines, 4K export, no watermark, commercial license. Cancel anytime. |
| Price | **$14.99 USD** |
| Interval | Monthly |
| Variant ID (auto) | _Save this — used in checkout URL_ |

### Product 2: Pro Yearly

| Field | Value |
|-------|-------|
| Name | Seed Studio Pro — Yearly |
| Description | Same as Pro Monthly, billed annually. Save 33% vs monthly. |
| Price | **$119.99 USD** (equivalent to $9.99/month) |
| Interval | Yearly |
| Variant ID (auto) | _Save this — used in checkout URL_ |

### Product 3: Lifetime

| Field | Value |
|-------|-------|
| Name | Seed Studio — Lifetime License |
| Description | One-time payment for permanent Pro access. All future updates included. |
| Price | **$99.00 USD** |
| Interval | One-time / Lifetime |
| Variant ID (auto) | _Save this — used in checkout URL_ |

### Tax & Compliance

LemonSqueezy automatically handles:
- Global sales tax / VAT calculation (Merchant of Record)
- EU VAT (OSS), UK VAT, AU GST, etc.
- Invoice generation
- Refund processing
- Chargeback handling

No additional setup needed. Seed Studio receives net payout after LemonSqueezy fees.

---

## 2. Checkout Integration Architecture

```
User clicks "Upgrade" button
         │
         ▼
┌──────────────────────────┐
│  LemonSqueezy Overlay    │  ←  Modal stays on seed.studio
│  (lemonsqueezy.js SDK)   │
│                          │
│  • Credit Card           │
│  • PayPal                │
│  • Alipay / WeChat Pay   │
│  • Apple Pay / Google Pay│
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  Overlay `onSuccess`     │
│  callback fires          │
│                          │
│  Receives:               │
│  • order_id              │
│  • license_key           │
│  • product_name          │
│  • variant_name          │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Store in localStorage       │
│  {                           │
│    license_key: "xxxx-...",  │
│    tier: "pro",              │
│    plan: "monthly|yearly|    │
│           lifetime",         │
│    activated_at: "ISO8601",  │
│    verified_at: "ISO8601"    │
│  }                           │
└──────────┬───────────────────┘
           │
           ▼
     UI updates to "Pro"
     Unlock: 4K export, no watermark
```

---

## 3. Checkout URLs

### Direct Checkout Links (Redirect Mode — Fallback)

```
Pro Monthly:
https://seedstudio.lemonsqueezy.com/checkout/buy/{store-id}?checkout[variant_id]={variant-id}

Pro Yearly:
https://seedstudio.lemonsqueezy.com/checkout/buy/{store-id}?checkout[variant_id]={variant-id}

Lifetime:
https://seedstudio.lemonsqueezy.com/checkout/buy/{store-id}?checkout[variant_id]={variant-id}
```

Add these optional query string parameters to customize:
- `checkout[embed]=true` — Embed mode (no redirect)
- `checkout[redirect_url]=https://seed.studio/thank-you` — Where to send after purchase
- `checkout[desc]=Seed%20Studio%20Pro%20Monthly` — Custom description
- `checkout[media]=true` — Show product image
- `checkout[logo]=false` — Hide LemonSqueezy logo
- `checkout[discount_code]=LAUNCH20` — Pre-apply discount code
- `checkout[button_color]=#ff6b6b` — Match Seed Studio accent color

### Overlay Mode (Recommended for Static Site)

Instead of redirecting, open the checkout inside an overlay/modal on your site. This is handled by the `lemonsqueezy.js` SDK (see `js/seedstudio-license.js`).

---

## 4. Discount Codes

Create these in LemonSqueezy dashboard (optional):

| Code | Type | Amount | Notes |
|------|------|--------|-------|
| `LAUNCH20` | Percentage | 20% off | Launch week promotion |
| `STUDENT50` | Percentage | 50% off | Student discount (manual verification) |
| `BLACKFRIDAY` | Percentage | 30% off | Seasonal sale |
| `NEWSLETTER10` | Percentage | 10% off | Newsletter sign-up incentive |

---

## 5. Payout Configuration

In LemonSqueezy → Settings → Payouts:
- Connect bank account (Stripe Express or PayPal Payouts)
- Set payout schedule: Weekly or Monthly
- Minimum payout threshold: $50 (default)

LemonSqueezy takes **5% + $0.50** per transaction (plus standard Stripe/PayPal payment processing fees). This is already factored into the pricing.

---

## 6. Testing

LemonSqueezy provides a **Test Mode** store:

1. Create a separate test store at `https://app.lemonsqueezy.com/settings/stores`
2. Use test card: `4242 4242 4242 4242` (any future expiry, any CVC)
3. Test purchases do not charge real money
4. Switch to live mode by updating the store slug in your code

In `js/seedstudio-license.js`, toggle test mode:
```js
const LS_STORE = 'seedstudio-test';  // Test store
const LS_STORE = 'seedstudio';       // Live store
```

---

## 7. Related Files

| File | Purpose |
|------|---------|
| `js/seedstudio-license.js` | Client-side license management + LemonSqueezy SDK wrapper |
| `functions/license-verify.js` | Cloudflare Worker — CORS proxy for license verification API |
| `index.html` | Main app with integrated license gating |
| `docs/license-verification.md` | Deep dive on static-site verification strategy |
