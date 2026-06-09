# 🌱 Seed Studio · 种子画室

> "One seed. Infinite posters." / "一粒种子，无限海报。"

A generative poster art studio built with p5.js. Six algorithmic layout engines, twenty curated color palettes, and a deterministic seed system — change one number, generate an entirely unique poster. Export as high-resolution PNG for print, social, or wallpapers.

🔗 **[www.seedstudio.top](https://www.seedstudio.top)**

---

## 🎨 Features

| Feature | Free | Pro |
|---------|------|-----|
| 6 generative layouts | ✅ | ✅ |
| 20 color palettes | ✅ | ✅ |
| 8 shape types | ✅ | ✅ |
| 6 adjustable parameters | ✅ | ✅ |
| Seed-based reproducibility | ✅ | ✅ |
| URL sharing | ✅ | ✅ |
| PNG export | ✅ (watermark, max 1200px) | ✅ (4K, no watermark) |
| Commercial license | ❌ | ✅ |
| Credits | 3 free, 1 per export | Unlimited |

## 🎨 Layout Engines

| # | Layout | Algorithm | Best For |
|---|--------|-----------|----------|
| 🌀 | Vortex | Logarithmic spirals with particle trails | Hypnotic vortex, cosmic spirals |
| ◼ | Geometric | Bold Swiss-design composition, 50% negative space | Gallery walls, modern posters |
| 🌊 | Flowfield | Perlin noise particle flow accumulation | Impressionist textures, atmosphere |
| 💠 | Kaleidoscope | N-fold rotational symmetry with organic perturbation | Mandalas, sacred geometry |
| 🔬 | Cells | Voronoi biological cell structures | Organic, microscope-like patterns |
| 🫧 | Layers | Overlapping transparent organic shapes | Watercolor-style depth |

## 🎨 Palettes (20 Total)

**16 Dark:** midnight, aurora, ember, forest, sakura, ocean, neon, mono, coral, sunset, matcha, ink, candy, retro, arctic, terracotta

**4 Light:** cream, paper, sky, blush

Light/dark adaptive rendering — backgrounds, vignettes, and watermarks adjust automatically based on palette brightness.

## 🚀 Quick Start

```bash
# Local preview — just open either file in a browser
open index.html    # Landing page
open app.html      # The generative poster app

# Or with a local server
npx serve .
```

## 🌐 Deployment

Deployed on **GitHub Pages** at [www.seedstudio.top](https://www.seedstudio.top).

### Deploy updates

```bash
git add . && git commit -m "update" && git push origin main
```

GitHub Pages serves from the main branch. Custom domain configured via `CNAME` file.

## 💰 Monetization

Seed Studio uses a **freemium** model:

- **Free**: All layouts, watermarked exports, max 1200px, 3 credits on registration, 1 credit per export
- **Pro** (¥6/month or ¥39/year via 爱发电): No watermark, 4K exports, unlimited credits, commercial license

Payment processing via [爱发电 (afdian.com/a/seedstudio)](https://afdian.com/a/seedstudio). Pro activation via master license keys (`SEED-PRO-MONTHLY` / `SEED-PRO-YEARLY`) or individually issued keys.

## 📁 File Structure

```
seed-studio/
├── index.html                  # Marketing landing page
├── app.html                    # Main generative poster application
├── p5.min.js                   # p5.js v1.9.4 (local, no CDN needed)
├── js/
│   ├── seedstudio-account.js   # Account system (CloudBase API)
│   └── seedstudio-license.js   # License manager (legacy/LemonSqueezy)
├── functions/
│   ├── cloudbase-func/         # CloudBase cloud function (active backend)
│   │   ├── index.js            # API: reg, login, deduct, upgrade, lookup
│   │   └── package.json
│   └── license-verify.js       # Cloudflare Worker (license verification proxy)
├── docs/
│   ├── monetization-blueprint.md
│   ├── payment-integration.md
│   ├── license-verification.md
│   └── copyright-license.md
├── sitemap.xml
├── robots.txt
├── _headers                    # Cloudflare Pages headers
├── vercel.json                 # Vercel fallback config
├── CNAME                       # www.seedstudio.top
└── README.md
```

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `R` | Randomize all parameters |
| `E` | Export PNG |
| `Ctrl+Z` | Undo last change |
| `1`-`6` | Switch layout |
| `Space` | Fullscreen preview |

## 📋 Tech Stack

- **p5.js** 1.9.4 — Creative coding engine
- **Mulberry32** PRNG — Deterministic randomness (same seed = same poster, every device)
- **Vanilla JS** — Zero dependencies, zero build step
- **Canvas 2D API** — Gradient backgrounds, vignettes, grain, bloom effects
- **URLSearchParams** — Shareable state (all parameters encoded in URL)
- **CloudBase** (Tencent) — Backend for user accounts, credits, license activation
- **GitHub Pages** — Static hosting

## 📄 License

Code: MIT. Generated artworks: Pro users get full commercial rights. Free users: personal use only. See [docs/copyright-license.md](docs/copyright-license.md) for full terms.

---

Built with ❤️ by the Seed Studio team. [www.seedstudio.top](https://www.seedstudio.top)
