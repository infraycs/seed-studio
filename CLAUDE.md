# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Seed Studio / 种子画室 — a commercial generative poster SaaS product. Static site (no build step) deployed on GitHub Pages at `www.seedstudio.top`. Users design posters via p5.js generative art engines, export as PNG, and can purchase Pro licenses via 爱发电.

## Entry points

- **`index.html`** — Marketing landing page (hero, features, pricing, footer). Public-facing homepage.
- **`app.html`** — The actual generative poster application (~1000 lines). Contains all p5.js rendering, UI, and account integration. Originally named `index.html`; renamed so the landing page could be the homepage.

## Key architecture

### Rendering (app.html)
- **p5.js 1.9.4** (local file `p5.min.js`, no CDN)
- **Mulberry32 PRNG** for deterministic random generation from a single `seed` integer
- **6 layouts**: vortex, geometric, flowfield, kaleidoscope, cells, layers — each a separate `drawX()` function
- **20 palettes** in `PALETTES` object (16 dark + 4 light: cream, paper, sky, blush)
- **8 shapes**: circles, lines, rects, triangles, hexagons, stars, dots, mixed
- Light/dark adaptive rendering via `isLight(pal)` detecting hex brightness of first palette color
- Free tier gets tiled diagonal watermark + bottom bar; Pro tier gets no watermark
- Central state object `S` holds all parameters; `snap()` creates a serializable snapshot for URL sharing, history, and settings save/load
- URL sharing via `URLSearchParams` — seed, layout, palette, shape, density, scale, rotation, noise, dimensions

### Account & licensing (active system)
- **`js/seedstudio-account.js`** — Talks to CloudBase HTTP API at `seedstudio-d6gcgy3nwa8b4e1ca.service.tcloudbase.com/api`
- Exports global `SS` object with: `init`, `register`, `login`, `logout`, `deduct`, `lookupKey`, `activateLicense`, plus getters `loggedIn`, `cr` (credits), `ti` (tier), `exp` (expiry)
- Session persisted in localStorage (`ss_id`, `ss_cr`, `ss_ti`, `ss_exp`, `ss_em`, `ss_pw`)
- On init, if API returns `'invalid'`, auto-cleans stale localStorage accounts
- Two master license keys defined server-side: `SEED-PRO-MONTHLY` (30 days) and `SEED-PRO-YEARLY` (365 days)
- Free users get 3 credits on registration; Pro users get 999 credits and `ti='pro'`
- Expired Pro accounts auto-downgrade to free on login/deduct

### Backend (CloudBase cloud function)
- **`functions/cloudbase-func/index.js`** — CloudBase cloud function, deployed via HTTP access service
- Actions: `ping`, `reg`, `login`, `deduct`, `upgrade`, `lookup`
- Uses `@cloudbase/node-sdk` to talk to CloudBase database
- Upgrade flow: checks master keys first, then falls back to `keys` collection for individually issued keys
- Lookup checks `keys` collection by order ID, with fallback to 爱发电 API (may fail due to DNS)
- CORS handled via `Access-Control-Allow-Origin: *` and OPTIONS preflight

### Legacy/planned systems (not actively used)
- **`js/seedstudio-license.js`** — LemonSqueezy-based license manager with Cloudflare Worker verification. Not wired into app.html.
- **`functions/license-verify.js`** — Cloudflare Worker for LemonSqueezy license validation proxy. Not deployed/active.
- **`docs/monetization-blueprint.md`** — Planned LeanCloud + 爱发电 architecture. Differs significantly from what's actually deployed (CloudBase + master keys).
- **`docs/payment-integration.md`** — LemonSqueezy setup docs. Not the active payment path.
- **`functions/bmob-deductCredit.js`** and **`functions/bmob-upgradeUser.js`** — Bmob backend alternatives, not in use.

### Payment
- **爱发电** (afdian.com/a/seedstudio) — the live payment link
- ¥6/month or ¥39/year via 爱发电 memberships
- Users pay on 爱发电, receive a license key in auto-reply, activate in the app

## Deployment

- **GitHub Pages** from repo `infraycs/seed-studio`
- Domain: `www.seedstudio.top` (CNAME file at root)
- Static files, no build step — push HTML/JS directly
- `dist/` directory mirrors deployable files
- `_headers` and `vercel.json` for Cloudflare Pages / Vercel fallback

## Important relationships

- `app.html` loads `js/seedstudio-account.js` (active) but NOT `js/seedstudio-license.js` (legacy)
- The `exportPNG()` function in app.html gates resolution and watermark on `S.tier`, which is set by the account system (`SS.ti`)
- For logged-in free users, export deducts 1 credit via `SS.deduct()`
- The landing page (`index.html`) links to `app.html` for the app and to 爱发电 for payment
- Documentation files in `docs/` describe ideal/planned architecture and may differ from what's deployed

## No build/dev commands

This is a pure static site. To preview locally, open `index.html` or `app.html` directly in a browser, or run `npx serve .`. There are no tests, no linters, no build pipeline.
