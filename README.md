# 🌱 Seed Studio · 种子画室

> "One seed. Infinite posters." / "一粒种子，无限海报。"

A generative poster art studio built with p5.js. Five algorithmic layout engines, eight curated color palettes, and a deterministic seed system — change one number, generate an entirely unique poster. Export as high-resolution PNG for print, social, or wallpapers.

---

## 🎨 Features

| Feature | Free | Pro |
|---------|------|-----|
| 5 generative layouts | ✅ | ✅ |
| 8 color palettes | ✅ | ✅ |
| 5 shape types | ✅ | ✅ |
| 6 adjustable parameters | ✅ | ✅ |
| Seed-based reproducibility | ✅ | ✅ |
| URL sharing | ✅ | ✅ |
| PNG export | ✅ (watermark, max 1200px) | ✅ (4K, no watermark) |
| Commercial license | ❌ | ✅ |
| API access | ❌ | ✅ |
| Priority support | ❌ | ✅ |

## 🎨 Layout Engines

| # | Layout | Algorithm | Best For |
|---|--------|-----------|----------|
| 🌀 | Vortex | Logarithmic spirals + particle trails | Hypnotic vortex, cosmic spirals |
| 🔷 | Mondrian | Recursive rectangle subdivision (De Stijl) | Gallery walls, geometric art |
| 🌌 | Galaxy | Gravity simulation + particle orbits | Nebula, star clusters |
| 💠 | Kaleidoscope | N-fold rotational symmetry | Mandalas, sacred geometry |
| 🌊 | Fluid | Multi-layer Perlin noise flow field | Smoke, liquid, atmospheric |

## 🚀 Quick Start

```bash
# Local preview
open index.html

# Or with live-server
npx serve .
```

## 🌐 Deployment

### Option A: Cloudflare Pages (Recommended)

1. Push to GitHub: `git push origin main`
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages
3. Connect your GitHub repo
4. Set build command: *(none — static site)*
5. Set output directory: `.` (root)
6. Deploy

Custom domain: Add your domain in Cloudflare → DNS, point CNAME to `*.pages.dev`.

### Option B: Vercel (Backup)

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Deploy — zero config needed

### Option C: Tencent Cloud (China CDN)

1. Upload all files to COS bucket
2. Enable CDN acceleration
3. Set custom domain (requires ICP filing)

## 💰 Monetization

Seed Studio uses a **freemium** model:

- **Free**: All layouts, watermarked exports, max 1200px
- **Pro** ($14.99/mo): No watermark, 4K exports, commercial license, API access
- **Lifetime** ($99 one-time): Permanent Pro access

Payment processing via [LemonSqueezy](https://lemonsqueezy.com) — handles global tax/VAT, supports Alipay/WeChat Pay.

## 📁 File Structure

```
seed-studio/
├── index.html      # Complete app (HTML + CSS + JS)
├── p5.min.js       # p5.js v1.9.4 (local, no CDN needed)
├── _headers        # Cloudflare Pages headers config
├── vercel.json     # Vercel backup config
├── .gitignore
└── README.md
```

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `R` | Randomize all parameters |
| `E` | Export PNG |
| `Ctrl+Z` | Undo last change |
| `1`-`5` | Switch layout |
| `Space` | Fullscreen preview |

## 📋 Tech Stack

- **p5.js** 1.9.4 — Creative coding engine
- **Mulberry32** PRNG — Deterministic randomness
- **Vanilla JS** — Zero dependencies, zero build step
- **Canvas 2D API** — Gradient backgrounds, vignettes, grain
- **URLSearchParams** — Shareable state

## 📄 License

Code: MIT. Generated artworks: Pro users get full commercial rights. Free users: personal use only.

---

Built with ❤️ by the Seed Studio team. [seed.studio](https://seed.studio)
