# Seed Studio -- Final Monetization Blueprint

> **Status**: DEFINITIVE. This document supersedes all prior payment/account/credit research.
> **Constraint set**: $0 budget, static website, no ICP filing, China-primary audience, requires subscription + one-time purchase.
> **Target domain**: `seedstudio.top` (already purchased, pointing to Cloudflare Pages).

---

## 1. FINAL ARCHITECTURE

### 1.1 Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                   BROWSER (seedstudio.top)                        │
│                                                                  │
│  ┌────────────┐  ┌───────────────┐  ┌─────────────────────────┐ │
│  │ Auth UI    │  │ Credit Store  │  │ Export Engine            │ │
│  │ (login/    │  │ (localStorage │  │ (render → deduct → save)│ │
│  │  register) │  │  read-only    │  │                         │ │
│  │            │  │  mirror)      │  │                         │ │
│  └─────┬──────┘  └───────┬───────┘  └───────────┬─────────────┘ │
│        │                 │                      │               │
│        │  LeanCloud JS SDK (CDN: cdn.jsdelivr.net)              │
│        │  session_token in localStorage                          │
│        │  credit_balance read from LeanCloud (ACL: read-owner)  │
│        │  All mutations via Cloud Functions (Master Key)        │
│        └─────────────────┬────────────────────┘                 │
└──────────────────────────┼──────────────────────────────────────┘
                           │ HTTPS
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌───────────────┐  ┌──────────────┐  ┌──────────────────┐
│  LeanCloud    │  │  Cloudflare  │  │  爱发电 iframe   │
│  (国内版)     │  │  Worker      │  │  (afdian.net)    │
│               │  │  (existing)  │  │                  │
│  • User auth  │  │              │  │  • 订阅会员      │
│  • Credits    │  │  • License   │  │  • 一次性发电    │
│  • Membership │  │    verify    │  │  • 支付宝/微信   │
│  • Cloud      │  │  • Webhook   │  │  • 零代码嵌入    │
│    Functions  │  │    receiver  │  │                  │
│               │  │  • API proxy │  │                  │
│  Free tier:   │  │              │  │  Fee: 6%         │
│  30K calls/day│  │  Free tier:  │  │  Cost: ¥0        │
│  500 login/d │  │  100K req/d  │  │                  │
│  Cost: ¥0     │  │  Cost: ¥0    │  │                  │
└───────────────┘  └──────────────┘  └──────────────────┘
```

### 1.2 Component Choices (with rationale)

#### Payment Gateway: 爱发电 (afdian.net) -- PRIMARY

**Why this wins over all alternatives at $0 budget:**

| Requirement | How 爱发电 satisfies it |
|---|---|
| $0 startup cost | Free registration, no certification fees |
| Subscription (recurring) | Core feature -- monthly/annual membership tiers |
| One-time purchase | Supported via "发电帖" and digital goods |
| No ICP required | Platform holds compliance; you need nothing |
| Static site compatible | `<iframe>` embed or `<a>` link, zero backend |
| RMB transactions | Alipay + WeChat Pay, native Chinese payment |
| Security | User pays on 爱发电's page; your site touches zero payment data |
| API/Webhook | OAuth2 + Webhook + API for order query, patron list |

**The 6% fee tradeoff**: 6% (5% platform + 1% channel) is 3x the ideal 2% target, but this is the "convenience tax" for zero infrastructure. Every percentage point pays for: zero legal risk, zero运维 cost, Alipay+WeChat integration, subscription management, and patron management. At project launch, optimizing for speed-to-market beats optimizing for fee basis points.

**Fee comparison at realistic revenue levels:**

| Monthly Revenue | 爱发电 (6%) | 面包多 (2%) | Difference |
|----------------|------------|------------|------------|
| ¥100 | ¥6 | ¥2 | ¥4 |
| ¥500 | ¥30 | ¥10 | ¥20 |
| ¥1,000 | ¥60 | ¥20 | ¥40 |
| ¥5,000 | ¥300 | ¥100 | ¥200 |

At ¥1,000/month (~$140), the ¥40 difference is irrelevant compared to the engineering hours saved. At ¥5,000/month, migrate the one-time purchase flow to 支付宝当面付 (0.6%) and keep subscriptions on 爱发电.

#### Account System: LeanCloud (国内版) -- PRIMARY

**Why this wins over all alternatives at $0 budget:**

| Competitor | Why eliminated |
|---|---|
| Supabase | 700ms+ latency from China, no mainland nodes |
| Firebase | 100% blocked by GFW (Google infrastructure) |
| Appwrite | US/EU infra only, same latency problem |
| CloudBase (腾讯云) | Free tier too small (3K resource points exhausted in days) |
| Auth0 | `auth0.com` domain blocked by GFW |
| Cloudflare D1-only | Building auth from scratch = weeks of work vs. hours with BaaS |

**LeanCloud free tier limits:**

| Resource | Limit | Adequate for |
|---|---|---|
| API calls | 30,000/day | ~500 DAU at 60 calls/user |
| Data storage | 1 GB | ~500K user records |
| File storage | 10 GB | User avatars, export thumbnails |
| Daily login users | 500 | Launch through first 6 months |

**Migration trigger**: When DAU exceeds 500, upgrade to 商用版 (~¥900/month). At that point, Pro revenue covers the cost.

#### Credit Ledger: Cloudflare Workers + D1 (server-authoritative)

**Why credits are NOT in localStorage:**

Credits are monetary value. `localStorage.setItem('credits', 99999)` is trivially executed in DevTools. The client-side `credit_balance` is a **read-only mirror** of the D1 authoritative balance. Every deduction hits the Worker, which validates the JWT and atomically debits D1.

**Why D1 and not LeanCloud for credits:**

LeanCloud Cloud Functions can handle credit logic, but:
1. The project already has a Cloudflare Worker (`functions/license-verify.js`)
2. D1 is free (5 GB storage, 5M reads/month) and co-located with the Worker
3. Having credits in infrastructure you control (Workers + D1) means zero vendor lock-in for the most sensitive data
4. LeanCloud free tier (30K calls/day) is best reserved for auth calls, not credit mutations

**Dual-write architecture**: User auth + membership status lives in LeanCloud. Credit balance lives in D1. The Worker bridges them: it validates the LeanCloud session token, then operates on D1.

---

## 2. PRICING TABLE (All in RMB)

### 2.1 Credit Packages (积分包)

Credits never expire. One credit = one HD/2K export. Two credits = one 4K/A4 export.

| # | Package | Price (RMB) | Credits | Per-Credit | Positioning |
|---|---------|------------|---------|------------|-------------|
| 1 | 尝鲜包 | **¥3.99** | 5 | ¥0.80 | Impulse buy, "cheaper than a coffee" |
| 2 | 入门包 | **¥9.99** | 15 | ¥0.67 | Occasional user, weekend designer |
| 3 | 标准包 | **¥19.99** | 35 | ¥0.57 | Best value, recommended default |
| 4 | 创作者包 | **¥39.99** | 80 | ¥0.50 | Daily creator, social media manager |
| 5 | 团队包 | **¥49.99** | 120 | ¥0.42 | Bulk discount, small team/studio |

**Anchoring psychology**: The ¥3.99 impulse pack anchors "cheap." The ¥19.99 standard pack is the psychological sweet spot (under ¥20, ¥0.57/credit). The ¥49.99 bulk pack at ¥0.42/credit makes ¥19.99 look reasonable while upselling.

### 2.2 Membership Plans (会员制)

| Tier | Price | Avg/Month | Key Perk |
|------|-------|-----------|----------|
| **月度会员** | ¥19.99/月 | ¥19.99 | Unlimited exports, no watermark, commercial license |
| **年度会员** | ¥99/年 | ¥8.25 | All monthly perks + priority support + early access |
| **永久会员** | ¥199 买断 | -- | Lifetime unlimited + all future updates |

**Design rationale**:
- Monthly at ¥19.99: slightly less than the "标准包." If you export >35 times/month, membership wins.
- Annual at ¥99: 58% discount vs. monthly. Anchors the lifetime deal.
- Lifetime at ¥199: equivalent to 2 years annual or 10 months monthly. Compares favorably to typical SaaS lifetime deals at ¥299-599.

### 2.3 Where Each Tier Sits on 爱发电

| Seed Studio Tier | 爱发电 Configuration |
|---|---|
| 月度会员 ¥19.99 | Monthly membership plan, auto-renews |
| 年度会员 ¥99 | Yearly membership plan |
| 永久会员 ¥199 | One-time "发电帖" (digital goods, not recurring) |
| 尝鲜包 ¥3.99 | Digital goods listing (5 credits) |
| 入门包 ¥9.99 | Digital goods listing (15 credits) |
| 标准包 ¥19.99 | Digital goods listing (35 credits) |
| 创作者包 ¥39.99 | Digital goods listing (80 credits) |
| 团队包 ¥49.99 | Digital goods listing (120 credits) |

### 2.4 Feature Matrix

| Feature | Free | Credit User | Monthly | Annual | Lifetime |
|---------|------|-------------|---------|--------|----------|
| 5 layout engines | Yes | Yes | Yes | Yes | Yes |
| 8 color palettes | Yes | Yes | Yes | Yes | Yes |
| Export resolution max | 1200px | 4K (3840px) | 4K (3840px) | 4K (3840px) | 4K (3840px) |
| Watermark | Yes | No | No | No | No |
| Exports per day | 3 free | Unlimited (credit-gated) | Unlimited | Unlimited | Unlimited |
| Commercial license | No | Yes | Yes | Yes | Yes |
| Palette editor | Read-only | Full | Full | Full | Full |
| Settings save/load | Yes | Yes | Yes | Yes | Yes |
| Priority support | No | No | No | Yes | Yes |
| Early access features | No | No | No | Yes | Yes |
| Gift credits | Receive only | Send & receive | Send & receive | Send & receive | Send & receive |
| API access (future) | No | No | 100 req/day | 500 req/day | 1000 req/day |

### 2.5 Credit Deduction Rules

| Export Resolution | Free | Credit User | Member |
|-------------------|------|-------------|--------|
| Preview (960x540) | 0 credits | 0 credits | 0 credits |
| Standard HD (1080-1920px) | Watermarked, max 1200px | **1 credit** | 0 credits |
| 2K (2560px) | Not available | **1 credit** | 0 credits |
| 4K (3840px) | Not available | **2 credits** | 0 credits |
| A4 Print (2480x3508) | Not available | **2 credits** | 0 credits |

**Edge cases**:
- **Export fails** (browser crash, canvas error): credit is NOT deducted. Client reports failure; server only deducts on confirmed success.
- **Same seed/settings re-export within 5 minutes**: no additional charge (idempotency key deduplication).
- **Batch export** (future): 20% discount on bulk (5 posters = 4 credits if 1 credit each).

---

## 3. TECHNICAL IMPLEMENTATION

### 3.1 Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `js/seedstudio-auth.js` | **CREATE** | Auth module: LeanCloud init, register, login, logout, getCredits, getMembership |
| `js/seedstudio-credits.js` | **CREATE** | Credit module: balance cache, deduct(), purchase(), redeemGiftCode() |
| `js/seedstudio-pay.js` | **CREATE** | Payment bridge: 爱发电 webhook handler, order polling |
| `functions/api-worker.js` | **CREATE** | Unified API Worker: credit mutations, membership sync, webhook receiver |
| `functions/schema.sql` | **CREATE** | D1 database schema |
| `index.html` | **MODIFY** | Add LeanCloud CDN script, auth HTML/UI, credit display, membership badge, wire new JS modules |
| `js/seedstudio-license.js` | **MODIFY** | Add onChange callback to sync membership to LeanCloud |
| `wrangler.toml` | **CREATE** | Cloudflare Worker + D1 configuration |

### 3.2 LeanCloud Setup (30 minutes)

**Step 1**: Register at https://www.leancloud.cn (phone verification required).

**Step 2**: Create app → 开发版 (Development, free tier).

**Step 3**: In 设置 > 应用凭证, copy `AppID` and `AppKey` (JavaScript key, NOT Master Key).

**Step 4**: In 存储 > 用户, configure:
- Enable: "用户注册/更新邮箱时，发送验证邮件"
- Initially DISABLE "未验证邮箱的用户，禁止登录" (allow instant signup at launch; enable after 50 users)

**Step 5**: Create Class `Membership` with columns:
- `userId` (String) -- LeanCloud user objectId
- `tier` (String) -- 'free', 'monthly', 'annual', 'lifetime'
- `afdianOrderId` (String) -- 爱发电 order ID
- `startedAt` (Date)
- `expiresAt` (Date, null for lifetime)
- `autoRenew` (Boolean)

**Step 6**: Create Class `CreditLedger` with columns:
- `userId` (String)
- `type` (String) -- 'purchase', 'deduct', 'gift_send', 'gift_receive', 'bonus'
- `amount` (Number) -- positive = credit, negative = debit
- `balanceAfter` (Number)
- `refId` (String) -- order ID, gift code, etc.
- `metadata` (String) -- JSON blob

Set ACL on `CreditLedger`:
- Read: Owner only
- Write: **Disabled for all users** (Master Key only -- mutations via Cloud Functions)

**Step 7**: Deploy Cloud Function `consumeCredit` via 云引擎 > 在线定义函数:

```javascript
AV.Cloud.define('consumeCredit', function(request, response) {
  var user = request.currentUser;
  if (!user) return response.error('未登录 (Not logged in)');

  var amount = request.params.amount || 1;
  var idempotencyKey = request.params.idempotency_key;

  // Check idempotency -- prevent double-charge
  var dupQuery = new AV.Query('CreditLedger');
  dupQuery.equalTo('userId', user.id);
  dupQuery.equalTo('refId', idempotencyKey);
  dupQuery.first().then(function(existing) {
    if (existing) {
      return response.success({
        consumed: 0,
        balance_after: null, // caller should re-fetch balance
        deduplicated: true
      });
    }

    // Read balance from D1 via Worker (or stored on _User for simplicity)
    // For LeanCloud-only approach: store balance on _User
    var balance = user.get('credits') || 0;
    if (balance < amount) {
      return response.error('积分不足 (Insufficient credits). Need ' + amount + ', have ' + balance);
    }

    user.set('credits', balance - amount);
    return user.save(null, { useMasterKey: true });
  }).then(function() {
    // Record ledger entry
    var ledger = new AV.Object('CreditLedger');
    ledger.set('userId', user.id);
    ledger.set('type', 'deduct');
    ledger.set('amount', -amount);
    ledger.set('balanceAfter', user.get('credits'));
    ledger.set('refId', idempotencyKey);
    return ledger.save(null, { useMasterKey: true });
  }).then(function() {
    response.success({
      consumed: amount,
      balance_after: user.get('credits')
    });
  }).catch(function(err) {
    response.error(err.message);
  });
});
```

**Step 8**: Deploy Cloud Function `addCredits` (called by webhook on payment success):

```javascript
AV.Cloud.define('addCredits', function(request, response) {
  var userId = request.params.user_id;
  var amount = request.params.amount;
  var orderId = request.params.order_id;
  var secret = request.params.secret;

  // Verify webhook secret
  if (secret !== 'SEEDSTUDIO_WEBHOOK_SECRET_CHANGE_ME') {
    return response.error('Unauthorized');
  }

  var userQuery = new AV.Query('_User');
  userQuery.get(userId, { useMasterKey: true }).then(function(user) {
    var balance = user.get('credits') || 0;
    user.set('credits', balance + amount);
    return user.save(null, { useMasterKey: true });
  }).then(function(user) {
    var ledger = new AV.Object('CreditLedger');
    ledger.set('userId', userId);
    ledger.set('type', 'purchase');
    ledger.set('amount', amount);
    ledger.set('balanceAfter', user.get('credits'));
    ledger.set('refId', orderId);
    return ledger.save(null, { useMasterKey: true });
  }).then(function() {
    response.success({ added: amount });
  }).catch(function(err) {
    response.error(err.message);
  });
});
```

### 3.3 js/seedstudio-auth.js -- Full Module

```javascript
/**
 * SeedStudio Auth Module
 * Handles user registration, login, session, credits, and membership.
 * Depends on: LeanCloud SDK (av-min.js loaded via CDN)
 */
(function(global) {
  'use strict';

  var Auth = {};

  // ── Configuration ──
  var CONFIG = {
    appId: 'YOUR_LEANCLOUD_APP_ID',
    appKey: 'YOUR_LEANCLOUD_APP_KEY',
    serverURL: 'https://YOUR_APP_ID.lc-cn-n1-shared.com',
    webhookSecret: 'SEEDSTUDIO_WEBHOOK_SECRET_CHANGE_ME'
  };

  // ── Init ──
  Auth.init = function(appId, appKey, serverURL) {
    CONFIG.appId = appId || CONFIG.appId;
    CONFIG.appKey = appKey || CONFIG.appKey;
    CONFIG.serverURL = serverURL || CONFIG.serverURL;

    AV.init({
      appId: CONFIG.appId,
      appKey: CONFIG.appKey,
      serverURL: CONFIG.serverURL
    });
    return Auth;
  };

  // ── Auth: Register ──
  Auth.register = function(email, password) {
    var user = new AV.User();
    user.setEmail(email);
    user.setUsername(email);
    user.setPassword(password);
    user.set('credits', 10); // 10 free welcome credits
    user.set('membership', 'free');
    return user.signUp();
  };

  // ── Auth: Login ──
  Auth.login = function(email, password) {
    return AV.User.logIn(email, password);
  };

  // ── Auth: Logout ──
  Auth.logout = function() {
    return AV.User.logOut();
  };

  // ── Auth: Current User ──
  Auth.currentUser = function() {
    return AV.User.current();
  };

  // ── Auth: Request Password Reset ──
  Auth.requestPasswordReset = function(email) {
    return AV.User.requestPasswordReset(email);
  };

  // ── Credits: Get Balance (read from LeanCloud _User) ──
  Auth.getCredits = function() {
    var user = AV.User.current();
    if (!user) return Promise.resolve(0);

    return user.fetch().then(function(fetched) {
      var balance = fetched.get('credits') || 0;
      // Update localStorage mirror
      try {
        localStorage.setItem('seedstudio_credits_cache', JSON.stringify({
          balance: balance,
          fetched_at: Date.now()
        }));
      } catch(e) {}
      return balance;
    }).catch(function() {
      // Fallback: return cached balance if network fails
      try {
        var cache = JSON.parse(localStorage.getItem('seedstudio_credits_cache'));
        if (cache && cache.balance !== undefined) return cache.balance;
      } catch(e) {}
      return 0;
    });
  };

  // ── Credits: Deduct (calls Cloud Function) ──
  Auth.consumeCredit = function(amount, idempotencyKey) {
    var user = AV.User.current();
    if (!user) return Promise.reject(new Error('Not logged in'));

    return AV.Cloud.run('consumeCredit', {
      amount: amount,
      idempotency_key: idempotencyKey
    });
  };

  // ── Membership: Get Status ──
  Auth.getMembership = function() {
    var user = AV.User.current();
    if (!user) return 'free';

    // Check if user has membership stored on their record
    var membership = user.get('membership') || 'free';
    var expiresAt = user.get('membershipExpiresAt');

    if (membership !== 'free' && membership !== 'lifetime' && expiresAt) {
      if (new Date(expiresAt) < new Date()) {
        return 'free'; // Expired
      }
    }
    return membership;
  };

  // ── Profile ──
  Auth.getProfile = function() {
    var user = AV.User.current();
    if (!user) return null;
    return {
      email: user.getEmail(),
      username: user.getUsername(),
      membership: user.get('membership') || 'free',
      credits: user.get('credits') || 0,
      createdAt: user.createdAt
    };
  };

  // ── Check if user can export at given resolution ──
  Auth.canExport = function(resolution) {
    var user = AV.User.current();
    var membership = Auth.getMembership();

    // Members: unlimited
    if (membership !== 'free') return Promise.resolve(true);

    // Not logged in: free tier rules
    if (!user) {
      // Free exports limited to 1200px, 3/day, watermarked
      if (resolution === 'preview') return Promise.resolve(true);
      return Promise.resolve(false);
    }

    // Logged in free user: check credits
    var cost = (resolution === '4K' || resolution === 'A4') ? 2 : 1;
    return Auth.getCredits().then(function(balance) {
      return balance >= cost;
    });
  };

  // Export for global use
  global.seedstudioAuth = Auth;

})(typeof window !== 'undefined' ? window : this);
```

### 3.4 js/seedstudio-pay.js -- 爱发电 Integration Module

```javascript
/**
 * SeedStudio Payment Bridge -- 爱发电 (afdian.net) Integration
 *
 * Handles:
 *  - Embedding 爱发电 iframe for subscriptions
 *  - Generating purchase links for credit packages
 *  - Polling/Webhook for payment confirmation
 *  - Syncing membership status to LeanCloud
 */
(function(global) {
  'use strict';

  var Pay = {};

  // ── Configuration ──
  var CONFIG = {
    // Your 爱发电 user slug (from your profile URL: https://afdian.net/a/YOUR_SLUG)
    afdianSlug: 'seedstudio',

    // Cloudflare Worker URL for payment webhook receiver
    webhookWorkerUrl: 'https://api.seedstudio.top/payment-webhook',

    // Credit package definitions (maps to 爱发电 digital goods IDs)
    creditPackages: {
      pack_5:   { id: 'prod_xxx_5',   amount: 5,   price: 3.99,  name: '尝鲜包' },
      pack_15:  { id: 'prod_xxx_15',  amount: 15,  price: 9.99,  name: '入门包' },
      pack_35:  { id: 'prod_xxx_35',  amount: 35,  price: 19.99, name: '标准包' },
      pack_80:  { id: 'prod_xxx_80',  amount: 80,  price: 39.99, name: '创作者包' },
      pack_120: { id: 'prod_xxx_120', amount: 120, price: 49.99, name: '团队包' },
    },

    // Membership plan 爱发电 plan IDs
    membershipPlans: {
      monthly:  { id: 'plan_xxx_monthly',  price: 19.99, name: '月度会员' },
      annual:   { id: 'plan_xxx_annual',   price: 99,    name: '年度会员' },
      lifetime: { id: 'prod_xxx_lifetime', price: 199,   name: '永久会员' },
    }
  };

  // ── Initialize ──
  Pay.init = function(opts) {
    if (opts) {
      if (opts.afdianSlug) CONFIG.afdianSlug = opts.afdianSlug;
      if (opts.webhookWorkerUrl) CONFIG.webhookWorkerUrl = opts.webhookWorkerUrl;
    }
    return Pay;
  };

  // ── Build 爱发电 iframe embed URL ──
  // This embeds your sponsorship page directly
  Pay.getSubscriptionUrl = function(plan) {
    // 爱发电 supports URL params for pre-selecting a plan
    // Format: https://afdian.net/a/YOUR_SLUG?plan=PLAN_ID
    var planId = CONFIG.membershipPlans[plan] ? CONFIG.membershipPlans[plan].id : '';
    var url = 'https://afdian.net/a/' + CONFIG.afdianSlug;
    if (planId) url += '?plan=' + planId;
    return url;
  };

  // ── Build 爱发电 leaflet iframe (compact embed) ──
  // The leaflet is a compact sponsorship card
  Pay.getLeafletHtml = function() {
    return '<iframe src="https://ifdian.net/leaflet?slug='
      + CONFIG.afdianSlug
      + '" width="100%" height="400" frameborder="0" scrolling="no"></iframe>';
  };

  // ── Build credit purchase URL ──
  Pay.getCreditPurchaseUrl = function(packageKey) {
    var pkg = CONFIG.creditPackages[packageKey];
    if (!pkg) return '#';
    // 爱发电 digital goods link
    return 'https://afdian.net/a/' + CONFIG.afdianSlug + '/shop?sku=' + pkg.id;
  };

  // ── Open 爱发电 checkout in new tab ──
  Pay.openCheckout = function(planOrPackage, type) {
    var url;
    if (type === 'credit') {
      url = Pay.getCreditPurchaseUrl(planOrPackage);
    } else {
      url = Pay.getSubscriptionUrl(planOrPackage);
    }
    if (url && url !== '#') {
      global.open(url, '_blank');
    }
  };

  // ── Open membership modal with 爱发电 iframe embed ──
  Pay.openMembershipModal = function() {
    // Create modal with 爱发电 embed
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay show';
    overlay.innerHTML =
      '<div class="modal" style="max-width:480px;">' +
      '  <h3>🚀 升级 Seed Studio</h3>' +
      '  <p style="font-size:0.78rem;color:var(--muted);margin:8px 0;">在爱发电完成支付后，自动激活会员</p>' +
      '  <div style="background:#fff;border-radius:12px;padding:0;overflow:hidden;min-height:400px;">' +
           Pay.getLeafletHtml() +
      '  </div>' +
      '  <p style="font-size:0.65rem;color:var(--muted);margin-top:8px;">' +
      '    支付完成后刷新页面即可激活 Pro。遇到问题？联系 seedstudio@proton.me' +
      '  </p>' +
      '  <button class="close-btn" id="btnCloseAfModal">关闭</button>' +
      '</div>';

    document.body.appendChild(overlay);

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        overlay.remove();
      }
    });
    overlay.querySelector('#btnCloseAfModal').addEventListener('click', function() {
      overlay.remove();
    });
  };

  // ── Open credit purchase modal ──
  Pay.openCreditModal = function() {
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay show';

    var packagesHtml = '';
    Object.keys(CONFIG.creditPackages).forEach(function(key) {
      var p = CONFIG.creditPackages[key];
      packagesHtml +=
        '<button class="credit-pkg-btn" data-pkg="' + key + '" style="' +
        'display:block;width:100%;padding:10px;margin:4px 0;' +
        'background:var(--surface2);border:1px solid var(--border);' +
        'border-radius:8px;color:var(--text);cursor:pointer;font-family:var(--font);' +
        'text-align:left;font-size:0.78rem;">' +
        '<span style="font-weight:700;">' + p.name + '</span> ' +
        '<span style="float:right;color:var(--accent2);">¥' + p.price.toFixed(2) +
        ' / ' + p.amount + ' credits</span></button>';
    });

    overlay.innerHTML =
      '<div class="modal" style="max-width:400px;">' +
      '  <h3>🪙 购买积分</h3>' +
      '  <p style="font-size:0.72rem;color:var(--muted);">Credits never expire. 积分永不过期。</p>' +
      '  <div style="margin:12px 0;">' + packagesHtml + '</div>' +
      '  <p style="font-size:0.62rem;color:var(--muted);">点击套餐在爱发电完成支付，积分自动到账</p>' +
      '  <button class="close-btn" id="btnCloseCreditModal">关闭</button>' +
      '</div>';

    document.body.appendChild(overlay);

    // Wire package buttons
    overlay.querySelectorAll('.credit-pkg-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var pkg = btn.dataset.pkg;
        Pay.openCheckout(pkg, 'credit');
      });
    });

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) overlay.remove();
    });
    overlay.querySelector('#btnCloseCreditModal').addEventListener('click', function() {
      overlay.remove();
    });
  };

  // ── Poll for payment confirmation (called after user returns from 爱发电) ──
  // 爱发电 API can be polled to check recent orders
  Pay.pollPaymentStatus = function(userId, maxAttempts) {
    maxAttempts = maxAttempts || 10;
    var attempts = 0;

    return new Promise(function(resolve, reject) {
      var interval = setInterval(function() {
        attempts++;
        if (attempts > maxAttempts) {
          clearInterval(interval);
          return reject(new Error('Payment confirmation timed out'));
        }

        // Call worker to check 爱发电 order status
        fetch(CONFIG.webhookWorkerUrl + '/check-order?user_id=' + userId, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
        .then(function(r) { return r.json(); })
        .then(function(data) {
          if (data.confirmed) {
            clearInterval(interval);
            resolve(data);
          }
        })
        .catch(function() {
          // Keep polling on network errors
        });
      }, 3000); // Poll every 3 seconds
    });
  };

  global.seedstudioPay = Pay;

})(typeof window !== 'undefined' ? window : this);
```

### 3.5 Cloudflare Worker -- Unified API (`functions/api-worker.js`)

The existing `functions/license-verify.js` handles LemonSqueezy license verification. Instead of a separate worker, we extend it OR deploy a second worker. For simplicity, this document specifies a **separate worker** for credit/membership operations, keeping the license worker unchanged.

```javascript
/**
 * Cloudflare Worker -- Seed Studio API
 * Deploy: npx wrangler deploy functions/api-worker.js
 *
 * Routes:
 *   POST /api/payment-webhook     -- 爱发电 webhook receiver
 *   GET  /api/check-order?user_id= -- Poll payment status
 *   POST /api/sync-membership      -- Sync membership from 爱发电 to LeanCloud
 */

// ── Configuration ──
const ALLOWED_ORIGINS = [
  'https://seedstudio.top',
  'https://www.seedstudio.top',
  'https://seedstudio.pages.dev',
  'http://localhost:8080',
];

// LeanCloud credentials (set via wrangler secret)
// LEANCLOUD_MASTER_KEY
// LEANCLOUD_APP_ID

// Webhook secret for 爱发电 callbacks
// AFDIAN_WEBHOOK_SECRET

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

async function handleWebhook(request) {
  const body = await request.json();

  // Verify webhook signature (爱发电 signs with a token)
  // const signature = request.headers.get('X-Afdian-Signature');
  // const expectedSig = await sha256Hmac(JSON.stringify(body), AFDIAN_WEBHOOK_SECRET);
  // if (signature !== expectedSig) {
  //   return jsonResponse({ error: 'Invalid signature' }, 403);
  // }

  // Parse 爱发电 webhook payload
  // {
  //   "user_id": "xxx",        // 爱发电 user ID
  //   "plan_id": "plan_xxx",   // Membership plan ID
  //   "order_id": "order_xxx", // Order ID
  //   "amount": "19.99",       // Amount
  //   "status": "completed"     // Payment status
  // }

  const { user_id, plan_id, order_id, amount, status } = body;

  if (status !== 'completed') {
    return jsonResponse({ received: true, action: 'ignored' });
  }

  // Map 爱发电 plan_id to Seed Studio membership tier
  // Store order confirmation in D1 so polling endpoint can see it
  // Then call LeanCloud Cloud Function to add credits / upgrade membership

  // For now: store in D1 for polling
  const db = request.env.DB; // D1 binding
  await db.prepare(
    'INSERT OR REPLACE INTO payment_confirmations (afdian_user_id, order_id, plan_id, amount, status, created_at) VALUES (?, ?, ?, ?, ?, datetime(\'now\'))'
  ).bind(user_id, order_id, plan_id, amount, 'completed').run();

  return jsonResponse({ received: true });
}

async function handleCheckOrder(request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('user_id');

  if (!userId) {
    return jsonResponse({ error: 'Missing user_id' }, 400);
  }

  const db = request.env.DB;
  const result = await db.prepare(
    'SELECT * FROM payment_confirmations WHERE afdian_user_id = ? AND status = \'completed\' ORDER BY created_at DESC LIMIT 1'
  ).bind(userId).first();

  return jsonResponse({
    confirmed: !!result,
    order_id: result ? result.order_id : null,
    plan_id: result ? result.plan_id : null,
  });
}

async function handleSyncMembership(request) {
  const body = await request.json();
  const { leancloudUserId, tier, expiresAt } = body;

  // Call LeanCloud REST API to update user membership
  const lcResponse = await fetch(
    `https://${LEANCLOUD_APP_ID}.lc-cn-n1-shared.com/1.1/users/${leancloudUserId}`,
    {
      method: 'PUT',
      headers: {
        'X-LC-Id': LEANCLOUD_APP_ID,
        'X-LC-Key': LEANCLOUD_MASTER_KEY + ',master',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        membership: tier,
        membershipExpiresAt: expiresAt ? { __type: 'Date', iso: expiresAt } : null,
      }),
    }
  );

  const result = await lcResponse.json();
  return jsonResponse({ synced: true, result });
}

async function handleRequest(request) {
  const url = new URL(request.url);

  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  if (request.method === 'POST' && url.pathname === '/api/payment-webhook') {
    return handleWebhook(request);
  }

  if (request.method === 'GET' && url.pathname === '/api/check-order') {
    return handleCheckOrder(request);
  }

  if (request.method === 'POST' && url.pathname === '/api/sync-membership') {
    return handleSyncMembership(request);
  }

  return jsonResponse({ error: 'Not Found' }, 404);
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
```

### 3.6 D1 Database Schema (`functions/schema.sql`)

```sql
-- Payment confirmation ledger (for webhook polling)
CREATE TABLE IF NOT EXISTS payment_confirmations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  afdian_user_id TEXT NOT NULL,
  order_id TEXT NOT NULL UNIQUE,
  plan_id TEXT NOT NULL,
  amount TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  leancloud_user_id TEXT,
  synced_to_leancloud INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_payment_afdian_user ON payment_confirmations(afdian_user_id);
CREATE INDEX idx_payment_status ON payment_confirmations(status);

-- Gift codes
CREATE TABLE IF NOT EXISTS gift_codes (
  code TEXT PRIMARY KEY,
  amount INTEGER NOT NULL CHECK (amount > 0),
  created_by_leancloud_id TEXT NOT NULL,
  redeemed_by_leancloud_id TEXT,
  redeemed_at TEXT,
  message TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_gift_redeemed ON gift_codes(redeemed_by_leancloud_id);
```

### 3.7 index.html Modifications

The existing `index.html` needs the following additions (specific edits, not full rewrite):

**A. Add LeanCloud CDN in `<head>`** (alongside p5.min.js):

```html
<script src="//cdn.jsdelivr.net/npm/leancloud-storage@4.15.2/dist/av-min.js"></script>
```

**B. Add auth UI after the `#tabs` div** (before tab-content divs):

```html
<!-- Auth section -->
<div id="auth-section" style="padding: 0 24px 16px; border-bottom: 1px solid var(--border);">
  <div id="auth-logged-out">
    <div class="btn-row">
      <button id="btn-login" class="btn btn-outline" style="flex:1;">登录</button>
      <button id="btn-register" class="btn btn-primary" style="flex:1;">注册</button>
    </div>
    <div id="auth-form" style="display:none; margin-top: 10px; display:flex; flex-direction:column; gap:8px;">
      <input id="auth-email" type="email" placeholder="邮箱 Email" style="padding:8px 12px; background:var(--bg); border:1px solid var(--border); border-radius:var(--radius-sm); color:var(--text); font-family:var(--font); font-size:0.78rem; outline:none;">
      <input id="auth-password" type="password" placeholder="密码 Password (6+位字符)" style="padding:8px 12px; background:var(--bg); border:1px solid var(--border); border-radius:var(--radius-sm); color:var(--text); font-family:var(--font); font-size:0.78rem; outline:none;">
      <div class="btn-row">
        <button id="btn-auth-submit" class="btn btn-primary" style="flex:1;">登录</button>
      </div>
      <button id="btn-auth-cancel" style="background:none; border:none; color:var(--muted); cursor:pointer; font-size:0.7rem; font-family:var(--font);">取消</button>
      <div id="auth-error" style="color:var(--accent); font-size:0.72rem; display:none;"></div>
    </div>
  </div>
  <div id="auth-logged-in" style="display:none;">
    <div style="display:flex; align-items:center; justify-content:space-between;">
      <div>
        <span id="auth-display-email" style="font-size:0.78rem; font-weight:600;">user@example.com</span>
        <span id="auth-badge" style="font-size:0.58rem; padding:2px 8px; border-radius:10px; margin-left:6px;">Free</span>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <span id="auth-credits" style="font-size:0.7rem; color:var(--accent3); cursor:pointer;" title="点击购买积分">🪙 0</span>
        <button id="btn-logout" style="background:none; border:none; color:var(--muted); cursor:pointer; font-size:0.65rem;">退出</button>
      </div>
    </div>
  </div>
</div>
```

**C. Replace the upgrade box** (the hardcoded email/payment section) with a proper monetization section:

```html
<!-- Monetization section -->
<div class="section" style="background:linear-gradient(135deg,rgba(255,107,107,0.08),rgba(78,205,196,0.08));border:1px solid var(--border);border-radius:var(--radius-sm);padding:14px;" id="monetizeBox">
  <div style="display:flex;align-items:center;gap:8px;">
    <span style="font-size:1.2rem;">🚀</span>
    <div>
      <div style="font-weight:700;font-size:0.82rem;">Seed Studio Pro</div>
      <div style="font-size:0.68rem;color:var(--muted);">无水印 · 4K导出 · 商用授权 · 无限次数</div>
    </div>
  </div>
  <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap;">
    <button class="btn btn-primary" style="flex:1;font-size:0.7rem;min-width:80px;" id="btnSubscribe">🎯 ¥19.99/月</button>
    <button class="btn btn-outline" style="flex:1;font-size:0.68rem;min-width:80px;" id="btnLifetime">🔑 ¥199 永久</button>
  </div>
  <div style="margin-top:6px;display:flex;gap:6px;">
    <button class="btn btn-outline" style="flex:1;font-size:0.62rem;" id="btnBuyCredits">🪙 购买积分</button>
  </div>
  <div style="font-size:0.58rem;color:var(--muted);margin-top:6px;text-align:center;">
    支付由爱发电(afdian.net)安全处理 · 支付宝/微信支付
  </div>
</div>

<!-- License activation for existing keys -->
<div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--border);">
  <div style="font-size:0.62rem;color:var(--muted);margin-bottom:4px;">已有许可证？在此激活：</div>
  <div style="display:flex;gap:4px;">
    <input type="text" id="licenseKeyInput" placeholder="粘贴许可证密钥..." style="flex:1;padding:6px 10px;border:1px solid var(--border);border-radius:6px;background:var(--bg);color:var(--text);font-size:0.65rem;font-family:var(--font-mono);">
    <button class="btn btn-accent" style="padding:6px 12px;font-size:0.65rem;flex:0 0 auto;" id="btnActivateLicense">激活</button>
  </div>
  <div id="licenseStatus" style="font-size:0.6rem;color:var(--muted);margin-top:4px;display:none;"></div>
</div>
```

**D. Add auth JS logic** at the end of the existing `<script>` block (before the `</script>` closing tag), integrated into the existing `init()` function:

```javascript
// ── Auth integration (add inside init() function) ──

// Initialize LeanCloud
seedstudioAuth.init();

// DOM refs
var authMode = 'login';
var btnLogin = document.getElementById('btn-login');
var btnRegister = document.getElementById('btn-register');
var btnAuthSubmit = document.getElementById('btn-auth-submit');
var btnAuthCancel = document.getElementById('btn-auth-cancel');
var btnLogoutAuth = document.getElementById('btn-logout');
var authForm = document.getElementById('auth-form');
var authEmail = document.getElementById('auth-email');
var authPassword = document.getElementById('auth-password');
var authError = document.getElementById('auth-error');
var authLoggedIn = document.getElementById('auth-logged-in');
var authLoggedOut = document.getElementById('auth-logged-out');
var authDisplayEmail = document.getElementById('auth-display-email');
var authBadge = document.getElementById('auth-badge');
var authCredits = document.getElementById('auth-credits');

// Wire auth UI
if (btnLogin) btnLogin.addEventListener('click', function() {
  authMode = 'login';
  authForm.style.display = 'flex';
  btnAuthSubmit.textContent = '登录';
  authError.style.display = 'none';
});

if (btnRegister) btnRegister.addEventListener('click', function() {
  authMode = 'register';
  authForm.style.display = 'flex';
  btnAuthSubmit.textContent = '注册 (送10积分)';
  authError.style.display = 'none';
});

if (btnAuthCancel) btnAuthCancel.addEventListener('click', function() {
  authForm.style.display = 'none';
});

if (btnAuthSubmit) btnAuthSubmit.addEventListener('click', function() {
  var email = authEmail.value.trim();
  var password = authPassword.value;
  if (!email || !password) {
    authError.textContent = '请填写邮箱和密码';
    authError.style.display = 'block';
    return;
  }
  if (password.length < 6) {
    authError.textContent = '密码至少6个字符';
    authError.style.display = 'block';
    return;
  }

  var promise = authMode === 'login'
    ? seedstudioAuth.login(email, password)
    : seedstudioAuth.register(email, password);

  promise.then(function() {
    updateAuthUI();
    authForm.style.display = 'none';
    authEmail.value = '';
    authPassword.value = '';
    authError.style.display = 'none';
  }).catch(function(err) {
    authError.textContent = err.message || '操作失败，请重试';
    authError.style.display = 'block';
  });
});

if (btnLogoutAuth) btnLogoutAuth.addEventListener('click', function() {
  seedstudioAuth.logout().then(function() {
    updateAuthUI();
  });
});

if (authCredits) authCredits.addEventListener('click', function() {
  if (typeof seedstudioPay !== 'undefined') {
    seedstudioPay.openCreditModal();
  }
});

// Wire monetization buttons
var btnSubscribe = document.getElementById('btnSubscribe');
var btnLifetime = document.getElementById('btnLifetime');
var btnBuyCredits = document.getElementById('btnBuyCredits');

if (btnSubscribe) btnSubscribe.addEventListener('click', function() {
  if (typeof seedstudioPay !== 'undefined') {
    seedstudioPay.openMembershipModal();
  }
});

if (btnLifetime) btnLifetime.addEventListener('click', function() {
  if (typeof seedstudioPay !== 'undefined') {
    seedstudioPay.openCheckout('lifetime', 'membership');
  }
});

if (btnBuyCredits) btnBuyCredits.addEventListener('click', function() {
  if (typeof seedstudioPay !== 'undefined') {
    seedstudioPay.openCreditModal();
  }
});

// Update auth UI
function updateAuthUI() {
  var user = seedstudioAuth.currentUser();
  if (user) {
    if (authLoggedIn) authLoggedIn.style.display = 'block';
    if (authLoggedOut) authLoggedOut.style.display = 'none';
    if (authDisplayEmail) authDisplayEmail.textContent = user.getEmail() || user.getUsername();

    var membership = seedstudioAuth.getMembership();
    if (authBadge) {
      authBadge.textContent = membership === 'free' ? 'Free' : 'PRO';
      authBadge.style.background = membership === 'free' ? 'var(--muted)' : 'linear-gradient(135deg, var(--accent), var(--accent2))';
      authBadge.style.color = '#fff';
    }

    // Show pro badge in header
    var proBadge = document.getElementById('proBadge');
    var proPlan = document.getElementById('proPlan');
    if (proBadge && membership !== 'free') {
      proBadge.style.display = 'flex';
      if (proPlan) proPlan.textContent = membership === 'lifetime' ? 'PERMANENT' : membership.toUpperCase();
    } else if (proBadge) {
      proBadge.style.display = 'none';
    }

    // Show credits
    seedstudioAuth.getCredits().then(function(balance) {
      if (authCredits) authCredits.textContent = '🪙 ' + (balance || 0);
    });

    // Sync S.tier for export logic
    S.tier = membership === 'free' ? 'free' : 'pro';
  } else {
    if (authLoggedIn) authLoggedIn.style.display = 'none';
    if (authLoggedOut) authLoggedOut.style.display = 'block';

    var proBadge2 = document.getElementById('proBadge');
    if (proBadge2) proBadge2.style.display = 'none';

    // Check if legacy license exists (backward compat)
    if (!checkStoredLicense()) {
      S.tier = 'free';
    }
  }
}

// Modify exportPNG to gate on auth+credits
var _originalExportPNG = exportPNG;
exportPNG = function() {
  // Preview size always free
  if (S.W === 960 && S.H === 540) {
    return _originalExportPNG();
  }

  // Check auth
  var membership = seedstudioAuth.getMembership();
  if (membership !== 'free') {
    // Pro member -- proceed
    return _originalExportPNG();
  }

  // Free user -- check credits
  var user = seedstudioAuth.currentUser();
  if (!user) {
    toast('请先登录以导出高清海报。注册送10积分！');
    return;
  }

  var cost = (S.W >= 3840 || (S.W === 2480 && S.H === 3508)) ? 2 : 1;
  var idempotencyKey = 'export_' + S.seed + '_' + S.layout + '_' + S.W + 'x' + S.H + '_' + Date.now();

  seedstudioAuth.consumeCredit(cost, idempotencyKey).then(function() {
    updateAuthUI();
    _originalExportPNG();
  }).catch(function(err) {
    toast('积分不足！请购买积分或升级会员 (Not enough credits)');
  });
};

// Call on page load
updateAuthUI();
```

**E. Add new script tags** before the closing `</body>`:

```html
<script src="js/seedstudio-auth.js"></script>
<script src="js/seedstudio-pay.js"></script>
```

### 3.8 wrangler.toml

```toml
name = "seedstudio-api"
main = "functions/api-worker.js"
compatibility_date = "2025-06-08"

[[d1_databases]]
binding = "DB"
database_name = "seedstudio-db"
database_id = "your-d1-database-id"

[vars]
LEANCLOUD_APP_ID = ""  # Set via wrangler secret

[[routes]]
pattern = "api.seedstudio.top/*"
zone_name = "seedstudio.top"
```

---

## 4. USER FLOWS

### 4.1 Flow A: Sign Up -> Buy Credits -> Export -> Deduct

```
1. User visits seedstudio.top
2. User clicks "注册" in auth section
3. Enters email + password (6+ chars) -> clicks 注册
4. LeanCloud creates user with 10 welcome credits
5. Auth UI updates: shows email, badge "Free", credits "🪙 10"
6. User designs a poster (any layout, any palette, any seed)
7. User clicks "导出 PNG (2x)" with 4K resolution selected
8. Export engine:
   a. Checks S.tier -> 'free' (user not a member)
   b. Checks membership -> 'free'
   c. Cost for 4K = 2 credits
   d. Calls seedstudioAuth.consumeCredit(2, idempotencyKey)
   e. LeanCloud Cloud Function:
      - Validates user session
      - Checks balance >= 2
      - Deducts: user.set('credits', 8)
      - Records CreditLedger entry
   f. Returns success
   g. Export proceeds: canvas renders at 4K, PNG saves without watermark
9. Auth UI updates: credits now "🪙 8"
10. User exports 4 more HD posters (1 credit each) -> credits "🪙 3"
11. User exports 2 more 4K posters (2 credits each) -> tries to export, gets error
12. Toast: "积分不足！请购买积分或升级会员"
13. User clicks "🪙 购买积分" -> credit modal opens
14. User clicks "标准包 ¥19.99 / 35 credits"
15. New tab opens: 爱发电 checkout for that digital good
16. User pays via Alipay/WeChat on 爱发电
17. 爱发电 sends webhook to Worker -> Worker stores confirmation in D1
18. User returns to seedstudio.top tab
19. Client polls Worker every 3s for payment confirmation
20. Worker confirms -> calls LeanCloud Cloud Function addCredits(userId, 35)
21. User's credit balance updates to "🪙 38"
22. User can continue exporting
```

### 4.2 Flow B: Sign Up -> Subscribe -> Unlimited Exports

```
1. User visits seedstudio.top
2. User clicks "注册" -> enters email + password -> registered
3. User clicks "🎯 ¥19.99/月" in monetization section
4. Membership modal opens with 爱发电 iframe embed
5. 爱发电 page shows: 月度会员 ¥19.99/月 (Alipay/WeChat buttons)
6. User completes payment on 爱发电
7. 爱发电 sends webhook to Worker
8. Worker calls LeanCloud REST API with Master Key:
   PUT /1.1/users/{userId}
   { membership: "monthly", membershipExpiresAt: "2026-07-08T..." }
9. User clicks "关闭" on modal
10. Page refreshes auth state:
    - Membership = "monthly"
    - Badge shows "PRO"
    - Header shows "💎 PRO · MONTHLY"
    - S.tier = 'pro'
11. User exports at any resolution:
    - Export engine checks S.tier -> 'pro'
    - skip credit deduction entirely
    - PNG saves at 2x resolution, no watermark
12. Every 24h, system re-verifies LeanCloud membership status
13. If subscription expires (user canceled on 爱发电):
    - LeanCloud expiresAt passes
    - Membership reverts to 'free'
    - S.tier = 'free'
    - Watermark returns on next export
```

### 4.3 Flow C: Gift Credits

```
1. Pro User A (logged in, has 80 credits) wants to gift 10 credits to friend
2. User A opens gift dialog:
   POST /api/gift { recipient_email: "friend@example.com", amount: 10 }
3. Worker:
   a. Validates JWT
   b. Checks User A balance >= 10
   c. Deducts 10 from User A
   d. Creates gift_code record: "SEED-A1B2-C3D4" with amount=10
   e. Returns gift_code to User A
4. User A shares code "SEED-A1B2-C3D4" with friend via WeChat/email
5. User B (friend, logged in) enters gift code in redeem field
6. Worker:
   a. Validates code exists and is unredeemed
   b. Adds 10 credits to User B balance
   c. Marks code as redeemed
7. User B now has 10 extra credits
```

---

## 5. SECURITY MEASURES

### 5.1 Credit Tampering Prevention

| Threat | Mitigation | Implementation |
|--------|-----------|----------------|
| User modifies localStorage credit balance | Credits stored server-side on LeanCloud `_User.credits` field. Client only shows a read-only mirror. Every deduction calls Cloud Function. | `seedstudioAuth.getCredits()` calls `user.fetch()` from LeanCloud, not localStorage |
| User calls Cloud Function directly to add credits | `addCredits` function checks `useMasterKey: true` and requires a webhook secret parameter. Regular user sessions cannot invoke it. | Cloud Function validates `secret` param against configured webhook secret |
| User replays a successful deduction response | Idempotency key: each export generates a unique key (`export_{seed}_{layout}_{W}x{H}_{timestamp}`). Cloud Function checks `CreditLedger` for existing entry before deducting. | `dupQuery.equalTo('refId', idempotencyKey).first()` |
| User forges a session token | LeanCloud session tokens are signed server-side. The client cannot forge a valid session. | LeanCloud SDK handles this internally |
| User uses two tabs to double-spend | Cloud Function reads current balance, deducts, and saves atomically. Second concurrent call sees updated balance or hits version conflict. | LeanCloud handles concurrent saves with optimistic locking internally |
| Brute-force login attempts | LeanCloud rate-limits login attempts. Additional client-side rate limit: 5 attempts per 10 minutes per email. | LeanCloud built-in + optional client-side throttle |

### 5.2 Payment Verification

| Threat | Mitigation |
|--------|-----------|
| User fakes payment confirmation | Webhooks come from 爱发电 servers, signed. Worker validates signature before processing. |
| User replays webhook | Each 爱发电 order has a unique `order_id`. Worker checks for duplicate before processing. |
| Man-in-the-middle on webhook | HTTPS enforced. Webhook secret known only to Worker (set via `wrangler secret`). |
| Payment completes but Worker is down | 爱发电 retries webhooks. Worker stores in D1 (durable). Client-side polling as fallback. |

### 5.3 Account Security

| Threat | Mitigation |
|--------|-----------|
| Password brute-force | LeanCloud rate-limits login. Passwords hashed with bcrypt server-side. |
| Session hijacking | LeanCloud session tokens are opaque and signed. HTTPS prevents interception. |
| Email not verified | Optional enforcement: after 50 users, enable "未验证邮箱禁止登录" in LeanCloud. |
| Account enumeration | Login returns generic error ("邮箱或密码错误") regardless of whether email exists. |

### 5.4 What is NOT Protected (and why it is acceptable)

- **A user who patches `S.tier = 'pro'` in DevTools**: The canvas renders client-side. A determined user can always screenshot the full-resolution canvas or modify the JS. This is acceptable because: (1) the watermark + resolution cap are convenience restrictions, not DRM; (2) the commercial license is the primary Pro value -- using Pro features without a license leaves the user without legal commercial rights; (3) the target market values convenience and compliance over saving ¥19.
- **License key sharing**: LemonSqueezy/爱发电 limit activations. For a creative tool, casual sharing is acceptable and can drive word-of-mouth adoption.

---

## 6. IMPLEMENTATION ORDER

### Phase 1: Foundation (Week 1, ~8 hours)

**Goal**: User can register, log in, see credits, and credits gate exports.

| Step | Task | Time | File(s) |
|------|------|------|---------|
| 1.1 | Register LeanCloud account, create app, get AppID/AppKey | 30 min | LeanCloud console |
| 1.2 | Create `js/seedstudio-auth.js` with full auth module | 2 hours | `js/seedstudio-auth.js` (NEW) |
| 1.3 | Add LeanCloud CDN script to `index.html` | 5 min | `index.html` |
| 1.4 | Add auth UI HTML to `index.html` | 1 hour | `index.html` |
| 1.5 | Add auth JS logic (login/register/logout/credit display) | 2 hours | `index.html` (inline script) |
| 1.6 | Deploy `consumeCredit` Cloud Function | 30 min | LeanCloud console |
| 1.7 | Modify `exportPNG()` to gate on credits/auth | 1 hour | `index.html` (inline script) |
| 1.8 | Test full flow: register -> get 10 credits -> export (deduct) -> export (insufficient credits) | 1 hour | All |

### Phase 2: Payment Integration (Week 2, ~6 hours)

**Goal**: Users can purchase credits and subscribe via 爱发电.

| Step | Task | Time | File(s) |
|------|------|------|---------|
| 2.1 | Register 爱发电 account, create membership plans and digital goods | 1 hour | afdian.net |
| 2.2 | Create `js/seedstudio-pay.js` with 爱发电 integration | 2 hours | `js/seedstudio-pay.js` (NEW) |
| 2.3 | Replace hardcoded upgrade box with new monetization HTML | 1 hour | `index.html` |
| 2.4 | Wire monetization buttons (subscribe, lifetime, buy credits) | 30 min | `index.html` |
| 2.5 | Set up Cloudflare Worker (`functions/api-worker.js`) + D1 | 1 hour | `functions/api-worker.js` (NEW), `functions/schema.sql` (NEW) |
| 2.6 | Test: purchase credits via 爱发电 -> webhook -> credits added | 30 min | All |

### Phase 3: Membership Sync (Week 2-3, ~4 hours)

**Goal**: Membership status syncs automatically. Pro users skip credit deduction.

| Step | Task | Time | File(s) |
|------|------|------|---------|
| 3.1 | Create `Membership` class in LeanCloud | 15 min | LeanCloud console |
| 3.2 | Add membership fields to `_User` (`membership`, `membershipExpiresAt`) | 15 min | LeanCloud console |
| 3.3 | Implement `sync-membership` endpoint in Worker | 1 hour | `functions/api-worker.js` |
| 3.4 | Update `getMembership()` in auth module to check LeanCloud | 30 min | `js/seedstudio-auth.js` |
| 3.5 | Update `exportPNG()` to skip credit check for Pro members | 30 min | `index.html` |
| 3.6 | Test: subscribe -> membership activates -> export skips credits -> cancel -> watermark returns | 1.5 hours | All |

### Phase 4: Polish & Edge Cases (Week 3, ~4 hours)

**Goal**: Gift codes, idempotency, error recovery, UI polish.

| Step | Task | Time | File(s) |
|------|------|------|---------|
| 4.1 | Implement gift code system (create + redeem) | 1.5 hours | Worker + `js/seedstudio-pay.js` |
| 4.2 | Add idempotency key to credit deduction flow | 30 min | `js/seedstudio-auth.js` |
| 4.3 | Add re-verification polling (every 24h for monthly members) | 1 hour | `js/seedstudio-auth.js` |
| 4.4 | Add toast notifications for credit events | 30 min | `index.html` |
| 4.5 | Migrate existing hardcoded SHA-256 license hashes to LeanCloud membership records | 30 min | LeanCloud console (manual) |

### Phase 5: Legacy License Compatibility (Week 3, ~2 hours)

**Goal**: Existing users with hardcoded license keys still work. Eventually phase out.

| Step | Task | Time | File(s) |
|------|------|------|---------|
| 5.1 | Keep `checkStoredLicense()` as fallback in `updateAuthUI()` | 15 min | `index.html` |
| 5.2 | When legacy license detected, create LeanCloud membership record automatically | 1 hour | `index.html` |
| 5.3 | Add deprecation notice for legacy license users to migrate to 爱发电 | 30 min | `index.html` |
| 5.4 | Remove `LICENSE_HASHES` hardcoded array after all users migrated | 15 min | `index.html` |

### Phase 6: Monitoring & Optimization (Ongoing, ~2 hours/week)

| Task | When | What to check |
|------|------|--------------|
| Monitor LeanCloud API usage | Weekly | Are you approaching 30K calls/day? |
| Monitor 爱发电 fees | Monthly | Is 6% eating too much? If revenue > ¥5K/month, migrate one-time purchases to 支付宝当面付 (0.6%) |
| Review credit package pricing | Monthly | Are users buying the ¥3.99 pack but not upgrading? Adjust anchoring. |
| Review membership conversion | Monthly | Free -> Pro conversion rate. If <2%, improve onboarding or add a free trial. |

---

## APPENDIX A: Key Numbers Summary

| Metric | Value |
|--------|-------|
| Lowest price point | ¥3.99 (尝鲜包, 5 credits) |
| Most expensive non-lifetime | ¥99 (年度会员) |
| Lifetime price | ¥199 |
| Credits per HD/2K export | 1 |
| Credits per 4K/A4 export | 2 |
| Credit packages | 5 tiers |
| Membership tiers | 3 (monthly, annual, lifetime) |
| Payment fee (爱发电) | 6% |
| Account system cost | ¥0 (LeanCloud 开发版) |
| Worker cost | ¥0 (Cloudflare free tier) |
| Total infrastructure cost | ¥0/month |
| Welcome credits for new users | 10 |
| Free daily exports (no login) | 3 (preview/1200px only) |

## APPENDIX B: 5-Minute Test Checklist

After Phase 1 implementation, verify each:

- [ ] Register a new user -> 10 credits appear
- [ ] Export HD (1080p) -> credit deducted (10 -> 9)
- [ ] Export 4K -> 2 credits deducted (9 -> 7)
- [ ] Export after credits reach 0 -> error toast: "积分不足"
- [ ] Login with registered email -> credits persist
- [ ] Logout -> UI resets to logged-out state
- [ ] Legacy license key still activates Pro (backward compat)

After Phase 2:
- [ ] Click "¥19.99/月" -> 爱发电 iframe loads
- [ ] Complete test purchase on 爱发电 -> webhook received
- [ ] Credits appear after payment (polling confirms)
- [ ] Membership activates after subscription purchase

After Phase 3:
- [ ] Pro member exports 4K -> no credit deduction
- [ ] Pro member badge shows in header
- [ ] Expired membership -> reverts to free tier with watermark

## APPENDIX C: File Manifest (Final State)

```
seed-studio/
├── index.html                  # Main app (MODIFIED: auth UI, credit gating, monetization)
├── landing.html                # Marketing landing page
├── p5.min.js                   # p5.js engine
├── js/
│   ├── seedstudio-auth.js      # (NEW) Auth, credits, membership module
│   ├── seedstudio-pay.js       # (NEW) 爱发电 integration, payment bridge
│   └── seedstudio-license.js   # (MODIFIED) Legacy license manager + onChange callback
├── functions/
│   ├── license-verify.js       # (UNCHANGED) LemonSqueezy verification proxy
│   ├── api-worker.js           # (NEW) Unified API: webhooks, membership sync, gift codes
│   └── schema.sql              # (NEW) D1 database schema
├── docs/
│   ├── monetization-blueprint.md  # (THIS FILE) Definitive monetization architecture
│   ├── payment-integration.md     # Legacy LemonSqueezy setup reference
│   ├── license-verification.md    # Legacy license verification reference
│   └── copyright-license.md       # Legal terms
├── _headers                    # Cloudflare Pages headers
├── vercel.json                 # Vercel backup config
├── wrangler.toml               # (NEW) Cloudflare Worker/D1 config
├── CNAME                       # Domain: www.seedstudio.top
└── README.md
```

---

*This blueprint is the single source of truth for Seed Studio monetization. All implementation decisions should reference this document. Last updated: 2026-06-08.*
