# Seed Studio / 种子画室 -- Execution Plan: Domain + Day 1-7 Traffic

This document synthesizes the domain research and zero-budget marketing plan into one actionable sequence. Read top to bottom. Do each step in order.

---

## 1. DOMAIN DECISION: Winner

### Chosen: 西部数码 .cn -- 1 yuan first year, ~10-12 yuan renewal

| Item | Detail |
|------|--------|
| **Registrar** | 西部数码 (west.cn) |
| **TLD** | .cn |
| **First year price** | **1 yuan** (new-user promo) |
| **Renewal price** | **10-12 yuan/year** (lowest among all sub-¥10 options) |
| **5-year total cost** | ~45 yuan |
| **Purchase URL** | `https://www.west.cn/active/ymh/` |

**Why this wins over AliCloud .top (1 yuan / 25-39 renewal) and Tencent .cn (8.8 yuan / ~30 renewal):** lowest 5-year total cost. The .cn TLD also carries more legitimacy in China than .top for a tool that may eventually need Baidu SEO.

**Suggested domain name:** `seedstudio.cn` (check availability first). If taken, try: `zhongzihuashi.cn` (种子画室 pinyin), `seed-art.cn`, or `seedposter.cn`.

### Fallback: If west.cn .cn promo is unavailable

| Rank | Registrar | TLD | First Year | Renewal |
|------|-----------|-----|------------|---------|
| 2 | 阿里云 (aliyun.com) | .top | 1 yuan | 25-39 yuan |
| 3 | 腾讯云 (cloud.tencent.com) | .cn | 8.8 yuan | ~30 yuan |

**WARNING: Never buy .top on Tencent Cloud.** Renewal is **450 yuan/year** there. Only buy .top on AliCloud.

---

### Exact Purchase Steps

**Step 1:** Go to `https://www.west.cn/` and register an account.

**Step 2:** Complete real-name verification (实名认证). Upload your 身份证 (Chinese ID card), front and back. Takes 1-2 business days. This is REQUIRED -- without it, DNS resolution won't activate.

**Step 3:** Once verified, go to `https://www.west.cn/active/ymh/` and search for `seedstudio.cn` (or your preferred name).

**Step 4:** Add to cart. Verify the price shows 1 yuan (or the new-user promo price). Pay.

**Step 5:** After payment, go to the DNS management console (域名管理 > DNS解析).

---

### DNS Settings: Point to GitHub Pages

You need to add two DNS records. Here are the exact values:

**Record 1 (CNAME -- www subdomain):**

| Field | Value |
|-------|-------|
| Type | CNAME |
| Host/Name | `www` |
| Value/Points to | `infraycs.github.io` |
| TTL | 600 (default) |

**Record 2 (A records -- root domain / apex):**

GitHub Pages requires A records for the root domain (no "www"). Add these four A records:

| Type | Host/Name | Value |
|------|-----------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

*(These four IPs are GitHub Pages' current apex IPs. Verify at https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site if the IPs have changed.)*

**Alternative (simpler):** If you only want `www.seedstudio.cn` to work (and not the bare `seedstudio.cn`), you only need Record 1 (CNAME). This is simpler and perfectly fine for a project like this.

---

### GitHub Pages Setting

**Step 6:** Go to your GitHub repo > Settings > Pages > Custom domain.

Enter: `www.seedstudio.cn` (or `seedstudio.cn` if you set up A records).

Check "Enforce HTTPS" (may take a few minutes to become available after DNS propagates).

**Step 7:** Verify. Wait 5-30 minutes for DNS propagation. Then visit `https://www.seedstudio.cn`. It should load your site.

---

### ICP Filing: What You Need to Know

| Question | Answer |
|----------|--------|
| **Do I need ICP备案 for a .cn domain pointing to GitHub Pages?** | **Technically no.** ICP备案 is required for servers hosted in mainland China. GitHub Pages servers are in the US. |
| **Do I need real-name verification (实名认证)?** | **Yes, required.** Every Chinese registrar demands it before enabling DNS. This is separate from ICP备案. |
| **Is this a legal gray area?** | Yes. Chinese registrars may send warnings if a .cn domain resolves to a foreign IP without ICP备案. For a personal portfolio/tool website, enforcement risk is low. |
| **What about Baidu SEO?** | .cn domains without ICP备案 may not rank well on Baidu. Accept this tradeoff for now. Your traffic will come from social media, not search. |
| **If I get warned?** | Apply for ICP备案 through your registrar. It's free but takes 2-4 weeks and requires a Chinese hosting provider. For now, proceed without it. |

---

## 2. TRAFFIC PLAN: Day 1-7

### TODAY (Day 1 -- Start Immediately)

These are the actions you can do RIGHT NOW, in this exact order. Total time: ~4 hours.

#### Block 1: Buy the domain (20 minutes)

Go to `https://www.west.cn/active/ymh/`, register, start real-name verification. While waiting for verification (1-2 days), continue with the rest.

#### Block 2: Generate content assets (1 hour)

Open `https://www.seedstudio.top`. Do this:

1. Generate and save **20 beautiful posters**. Vary layouts (use all 5: Vortex, Mondrian, Galaxy, Kaleidoscope, Fluid) and palettes. Hit Randomize until you get a stunning one, then export. Name files by seed number (e.g., `seed-888888888.png`) so you can regenerate if needed.

2. Pick your **absolute best 4 posters** (one per layout engine). These will be your hero images everywhere.

3. Create a **vertical carousel image** (1080x1920): stack 4 posters vertically with a title overlay at the top: "输入一个数字, 生成独一无二的海报 | 种子画室". Use any free image editor (Canva, 美图秀秀, Figma).

4. Record a **15-second screen recording** of you hitting Randomize 5 times. Captures the "wow" moment of instant poster generation. Save as MP4.

#### Block 3: Create social accounts (30 minutes)

Create accounts on these platforms. Use the same handle everywhere: `seedstudio_cn` or `zhongzihuashi`.

| Platform | URL to create account | Profile pic | Bio |
|----------|----------------------|-------------|-----|
| 小红书 | `https://www.xiaohongshu.com` | Use your best poster as avatar | 🌱 一键生成独一无二的算法海报 \| 5种生成式版式 \| 输入种子数字,生成无限可能 \| 免费使用👇 |
| 即刻 | Download Jike app | Same poster | 种子画室 Seed Studio -- 输入一个数字,生成一张算法海报。5种版式,8套配色,免费。 |
| Twitter/X | `https://twitter.com` | Same poster | 🌱 Seed Studio -- generative poster art in your browser. One number = infinite posters. Free. |
| 知乎 | `https://www.zhihu.com` | Same poster | 独立开发者 \| 种子画室创建者 \| 生成艺术 & 创意编程 |
| B站 | `https://www.bilibili.com` | Same poster | 种子画室 \| 生成艺术 \| p5.js创意编程 |

#### Block 4: First post -- Xiaohongshu (RIGHT NOW, 30 minutes)

This is your **highest-leverage first action**. Xiaohongshu's algorithm favors new accounts that post immediately.

**Post immediately after account creation:**

**Title:** 这个免费网站,输入一个数字就能生成绝美海报...我玩了一下午

**Body (copy-paste):**

发现了一个超酷的生成艺术网站 -- 种子画室 Seed Studio!

🎨 5种算法版式: 漩涡🌀｜蒙德里安🔷｜星系🌌｜万花筒💠｜流体🌊
🎨 8套精选配色: 极光、余烬、森林、樱、海洋、霓虹、黑白、陶土
🎨 6个可调参数: 密度、缩放、旋转、噪点、形状、色板
🎨 最厉害的是「种子系统」-- 每张海报都由一个数字生成,复制链接发给朋友,对方打开能看到完全一模一样的海报!

完全免费,不用注册,打开网页就能玩。
导出带一个小水印,但不影响欣赏。想商用或导出4K无水印才需要Pro(¥99终身)。

截图是我随机生成的几张,每张都绝美...根本停不下来。

#生成艺术 #海报设计 #免费工具 #设计灵感 #算法艺术 #种子画室 #数字艺术 #壁纸分享 #视觉设计 #独立开发者

**Images to attach:**
1. Cover: Your single BEST poster, full-frame, no UI. Text overlay at bottom: "输入数字 → 生成海报"
2. Images 2-5: One poster per layout engine, each labeled with layout name and seed number
3. Image 6: Screenshot of the app interface with the seed number highlighted with a red circle
4. Image 7: An exported poster showing the "Made with Seed Studio" watermark

**Post time:** Right now (or if it's late, schedule for tomorrow at 12:00 or 21:00 China time).

#### Block 5: Jike post (10 minutes)

**Post on Jike (short dynamic):**

做了个小工具: 输入一个数字,生成一张独一无二的算法海报。

🌱 种子画室 Seed Studio
→ 5种算法版式,8套配色,实时调参
→ 同一个种子数字 = 同一张海报(可分享,可复现)
→ 免费,浏览器打开即用

链接在评论区👇
[附4张不同风格的海报]

Join these Jike circles: 「设计杂货铺」「独立开发者」「生成艺术」「创意编程」

#### Block 6: WeChat Moments (5 minutes)

**Post on 朋友圈:**

做了一个小东西🌱

种子画室 -- 输入一个数字,生成一张海报。
同一个数字永远生成同一张海报。
换一个数字,就是全新的画面。

完全免费,浏览器打开就能玩。
(做了整整一周,终于能见人了)
[配4张海报九宫格]

---

### Day 2 (Tuesday) -- Reddit + Douyin + Xiaohongshu

**Morning (1 hour):**
- Post on Xiaohongshu: Tutorial post (Post Template 2 from the full plan). Post at 8:00 or 12:00 China time.
- Interact with 20 posts under #海报设计 and #生成艺术 hashtags. Genuine comments ONLY -- no link dropping.

**Afternoon (1.5 hours):**
- Post on r/generative (Reddit): Use the template below. Post at 10 AM ET.
- Post Tweet 1 on Twitter/X.

**Reddit r/generative post (copy-paste):**

Title: I built a browser-based generative poster tool with deterministic seeds -- Seed Studio

Body:
```
Been lurking here for years. Finally built something worth sharing.

Seed Studio is a generative poster art tool that runs in your browser. Five layout algorithms, eight palettes, all deterministic from a single seed number.

The layouts:
- Vortex -- logarithmic spirals with particle trails
- Mondrian -- recursive BSP subdivision (De Stijl style)
- Galaxy -- gravity simulation with orbit trails  
- Kaleidoscope -- N-fold rotational symmetry
- Fluid -- multi-octave Perlin noise flow fields

The key feature: every poster is deterministically generated from a seed number using mulberry32 PRNG. Same seed = same poster on any device. Share a URL and anyone sees exactly what you see.

Tech: p5.js, vanilla JS, one HTML file. Free to use (watermarked export). Pro is ¥99 lifetime.

Would love this community's feedback on which layout produces the best compositions and what generative techniques I should add next.

Link: https://www.seedstudio.top
```

**Twitter/X tweet 1 (copy-paste):**

🌱 I built a generative poster art tool that runs in your browser.

One number → one unique poster. Change the number → infinite variations.

No signup. No install. Just open and create.

It's called Seed Studio.
https://www.seedstudio.top

[attach 4-poster collage image]

**Evening (1 hour):**
- Record and post Douyin video: "3 Posters in 15 Seconds" (see full plan for exact script). Post at 20:00 China time.
- Respond to Reddit comments as they come in.

---

### Day 3 (Wednesday) -- Community Engagement

**Morning (1.5 hours):**
- Xiaohongshu: Post Template 3 -- "用同一个种子数字,在不同版式下生成的4张海报..." at 12:00 China time.
- Zhihu: Find the question "有哪些让你一眼相中的免费设计工具?" and post the answer from the full plan. Include 3-4 poster images.
- Interact with 15 more Xiaohongshu posts.

**Afternoon (1.5 hours):**
- Reddit r/webdev post (use template from full plan). Post at 11 AM ET.
- Twitter/X tweets 2 + 3.
- Join 5 Discord servers: The Coding Train, Creative Coding, GenArt, Indie Hackers, p5.js Discord. Introduce yourself. Do NOT share your link yet -- participate genuinely for 2-3 days first.

**Evening (1 hour):**
- Jike interaction post: "给我一个数字,我给你生成一张海报🌱 评论区留下任意数字(生日、纪念日、幸运数字都可以),我截图回复你生成的海报!"
- Generate and reply with posters for every comment.
- WeChat Moments Day 3 update: "朋友们反馈说种子画室玩上瘾了..."

---

### Day 4 (Thursday) -- Content Creation

**Morning (2 hours):**
- Zhihu: Answer "程序员有哪些有意思的副业/开源项目?" and "有哪些适合打印成海报挂在墙上的生成艺术作品?" (see full plan).
- Write and publish first blog post on Dev.to: "What Is Generative Art? A Beginner's Guide (With Examples)". Cross-post to Hashnode.

**Afternoon (1.5 hours):**
- Twitter/X tweets 4 + 5.
- Submit to 5 side project directories: AlternativeTo.net, SaaSHub.com, Toolify.ai, Betalist.com, IndieHackers.com/products.
- Share your best seed links in the Discord servers you joined yesterday.

**Evening (1 hour):**
- Xiaohongshu 4th post: Share a user's birthday-generated poster from Jike comments (with their permission).
- Record and post Douyin video: "生日数字挑战" (see full plan).

---

### Day 5 (Friday) -- Bilibili + Product Hunt Prep

**Morning (2 hours):**
- Record Bilibili tutorial: "10分钟教你做生成艺术海报" (full script in the marketing plan). Record screen + voiceover. Upload at 12:00 China time.
- Title: 一口气学会生成艺术! p5.js + 种子系统 = 无限海报 | 编程入门

**Afternoon (2 hours):**
- Product Hunt prep: Create maker profile at producthunt.com. Upload screenshots (at least one GIF showing seed-change-poster cycle). Record 30-60 second demo GIF. Schedule launch for NEXT Tuesday 12:01 AM PT.
- Reddit r/SideProject post (if you have any early metrics).
- Twitter/X tweets 6 + 7.

**Evening (1 hour):**
- Engage on Jike, respond to all comment threads.
- WeChat Moments Day 5 post: The "seed tree" concept ("每个人都是一个'种子',链接是传播的根...").

---

### Day 6 (Saturday) -- Amplify

**Morning (1.5 hours):**
- Xiaohongshu 5th post: Weekend aesthetic vibes.
- Zhihu: Write and publish original article (not just Q&A) -- "什么是生成艺术?一篇就够了".
- Read and respond to all Reddit comment threads from the week.

**Afternoon (1.5 hours):**
- Hacker News "Show HN" post (Saturday = less competition). Use template from full plan.
- Twitter/X tweets 8 + 9.
- Record and post Douyin video: "5种版式对比" (see full plan).

**Evening (1 hour):**
- Curate the best user-generated posters from your "give me a number" interactions.
- Prepare a Xiaohongshu post for Sunday showcasing community creations.

---

### Day 7 (Sunday) -- Analyze + Iterate

**Morning (2 hours):**
- Compile Week 1 metrics: visitors, posters generated, seed links shared, Pro upgrades, social followers, best-performing posts on each platform.
- Identify top 3 traffic sources. Double down on these in Week 2.

**Afternoon (1.5 hours):**
- Twitter/X tweet 10 with actual week 1 numbers.
- Xiaohongshu 6th post: "第一周总结: 我做的免费海报工具被XXX人用了".
- Write Week 2 plan based on data.

**Evening (1 hour):**
- Email/thank Pro buyers, ask for feedback.
- Jike weekly reflection post.
- Finalize Product Hunt launch for Tuesday.

---

## 3. IMMEDIATE ACTIONS (Do These Right Now)

### Top 3 things to do in this conversation

1. **Buy the domain.** Go to `https://www.west.cn/active/ymh/` right now. Register, submit real-name verification. Search for `seedstudio.cn`. If available, buy it for 1 yuan. If not, try `seed-art.cn`, `zhongzihuashi.cn`, or fall back to AliCloud for `seedstudio.top` at 1 yuan (`https://wanwang.aliyun.com/`).

2. **Set up DNS.** Once the domain is purchased and verified, add the CNAME record (`www` → `infraycs.github.io`) and configure the custom domain in your GitHub repo's Pages settings. Then update `index.html` and `landing.html` to use the new domain in all links, og:image URLs, and share buttons.

3. **Post on Xiaohongshu.** This is your #1 channel. Create the account and post immediately using the exact text from Section 2, Block 4 above. The first 2 hours after posting determine whether the algorithm picks you up. Post at 12:00, 18:00, or 21:00 China time.

### What the user needs to do on their phone

1. **Download and install Xiaohongshu (小红书).** Create account. Use your best poster as the profile picture. Write the bio: "🌱 一键生成独一无二的算法海报 | 5种生成式版式 | 输入种子数字,生成无限可能 | 免费使用👇". Post immediately using Template 1 (The Hook) from above.

2. **Download and install Jike (即刻).** Join circles: 设计杂货铺, 独立开发者, 生成艺术, 创意编程. Post the short intro with 4 posters.

3. **Post on WeChat Moments (微信朋友圈).** Use the Day 1 post from above. Include 4 poster images. This is your immediate warm audience -- friends, former colleagues, classmates. Many will try the tool just to support you. Some will share.

---

## Quick Reference: Key URLs

| What | URL |
|------|-----|
| **Your product** | `https://www.seedstudio.top` |
| **Domain purchase (west.cn)** | `https://www.west.cn/active/ymh/` |
| **Domain fallback (AliCloud)** | `https://wanwang.aliyun.com/` |
| **Domain fallback 2 (Tencent)** | `https://cloud.tencent.com/act/pro/domain` |
| **GitHub Pages custom domain docs** | `https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site` |
| **Xiaohongshu** | `https://www.xiaohongshu.com` |
| **Product Hunt (prep)** | `https://www.producthunt.com` |
| **Dev.to (blog posts)** | `https://dev.to` |
| **AlternativeTo (directory)** | `https://alternativeto.net` |
| **SaaSHub (directory)** | `https://www.saashub.com` |
| **Betalist (directory)** | `https://betalist.com` |
| **Indie Hackers (directory)** | `https://www.indiehackers.com/products` |

---

## Pre-Flight Product Fixes (Do This Week)

Before you drive significant traffic, fix these 5 issues on your site:

1. **Add `og:image` meta tag** to `index.html` and `landing.html`. Generate your best poster at 1200x630, save it in the repo, add: `<meta property="og:image" content="https://YOUR_DOMAIN/og-image.png">`. This ensures beautiful preview cards when links are shared on social media.

2. **Add WeChat share tags** to `_headers` or `<head>`: WeChat uses `wx:image` and `wx:title` meta tags. Without these, WeChat shares show a blank card instead of a poster preview.

3. **Add a prominent "Share" button** next to the seed display. It should generate a card image (poster preview + seed number + QR code + "Made with Seed Studio") for frictionless sharing on WeChat/Twitter.

4. **Add analytics.** Set up a free Plausible self-host instance or use Cloudflare Analytics. You need to know which traffic sources convert.

5. **Update all internal links** to use the new domain once purchased. This includes the landing page CTA, the Pro checkout link, and any "share" URLs.

---

*Execute Day 1 today. Post on Xiaohongshu within the next 2 hours. Buy the domain this evening. Everything else follows from these two actions.*
