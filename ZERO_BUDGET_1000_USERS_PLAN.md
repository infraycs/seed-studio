# 🌱 Seed Studio / 种子画室 — Zero-Budget Plan to First 1000 Users

> URL: https://infraycs.github.io/seed-studio
> Pricing: Free (watermark + 1200px) / Pro ¥99 终身
> Core loop: Create poster → Copy seed link → Share → Recipient opens → Recipient creates → Shares their link

---

## Pre-Flight Checklist (Do These Before Anything Else)

Before spending one minute on marketing, fix these product issues — every visitor you drive will bounce otherwise:

1. **Fix the URL.** `infraycs.github.io/seed-studio` is a hard sell. Buy a domain: `seed.studio` (available via Porkbun, ~$12/year — the one exception to "$0 budget"). If truly zero budget, at minimum set up a custom subdomain via Cloudflare that looks clean. A GitHub Pages URL signals "side project," not "SaaS worth ¥99."

2. **OG image.** The landing page needs `og:image` so when someone shares a seed link on WeChat/Twitter/Discord, a beautiful poster preview appears — not a blank card. Generate your best poster, save it as 1200x630, add `<meta property="og:image" content="...">`.

3. **WeChat share card.** In `_headers`, add the WeChat-specific meta. WeChat uses its own crawler and needs explicit `wx:image` tags.

4. **Add a "Share" button.** Currently there's a copy-seed button. Add a prominent "分享到微信 / Share to Twitter" button that generates a card image with the poster + seed number + QR code to the site. This is your viral engine.

5. **Add analytics.** Plausible (privacy-friendly, free self-host tier) or a simple Cloudflare Analytics. You cannot improve what you don't measure.

---

## 1. 中国市场 (Chinese Market)

The Chinese market IS your primary market. Your UI is bilingual, your payment is in RMB, your pricing is China-friendly. Lean into this.

### 1.1 小红书 (Xiaohongshu / RED) — Your #1 Channel

Xiaohongshu is a visual discovery platform. Algorithmic posters are inherently visual. This is your strongest channel by far.

**Account setup:**
- Name: 种子画室SeedStudio (or 种子画室)
- Bio: 🌱 一键生成独一无二的算法海报｜5种生成式版式｜8套精选配色｜输入种子数字，生成无限可能｜免费使用👇
- Link in bio: infraycs.github.io/seed-studio (or your custom domain)
- Category: 艺术/设计

**Post Template 1 — The Hook (首发帖)**

标题: 这个免费网站，输入一个数字就能生成绝美海报…我玩了一下午

正文:
发现了一个超酷的生成艺术网站 — 种子画室 Seed Studio！

🎨 5种算法版式：漩涡🌀｜蒙德里安🔷｜星系🌌｜万花筒💠｜流体🌊
🎨 8套精选配色：极光、余烬、森林、樱、海洋、霓虹、黑白、陶土
🎨 6个可调参数：密度、缩放、旋转、噪点、形状、色板
🎨 最厉害的是「种子系统」—— 每张海报都由一个数字生成，复制链接发给朋友，对方打开能看到完全一模一样的海报！

完全免费，不用注册，打开网页就能玩。
导出带一个小水印，但不影响欣赏。想商用或导出4K无水印才需要Pro（¥99终身）。

截图是我随机生成的几张，每张都绝美…根本停不下来。

#生成艺术 #海报设计 #免费工具 #设计灵感 #算法艺术 #种子画室 #数字艺术 #壁纸分享 #视觉设计 #独立开发者

**How to post on Xiaohongshu (format):**
1. Cover image: Your single BEST poster, full-frame, no UI chrome. Add text overlay "输入数字 → 生成海报" in white on a subtle dark gradient at the bottom.
2. Images 2-5: Four different posters, one per layout engine (Vortex, Mondrian, Galaxy, Kaleidoscope). Each labeled with the layout name and seed number.
3. Image 6: Screenshot of the app interface with the seed number highlighted with a red circle. Show the "randomize" button.
4. Image 7: The exported poster with the "Made with Seed Studio" watermark visible — this is your social proof AND passive ad.
5. Caption: The text above.

**Post Template 2 — Tutorial Style (教程帖)**

标题: 30秒生成一张专属海报｜种子画室使用教程

正文:
手把手教你用种子画室生成海报，不用会设计，不用会代码👇

Step 1: 打开网站 infraycs.github.io/seed-studio
Step 2: 点「随机生成」按钮
Step 3: 不满意就继续点，满意了就点「导出PNG」
Step 4: 复制链接发给朋友，他们能看到你生成的同一张海报✨

小技巧💡：
- 按键盘 R 键 = 随机生成
- 按 E 键 = 导出
- 按 1-5 = 切换版式
- 按空格 = 全屏预览

Pro版（¥99永久）可以导出4K无水印海报，商用也行。

#教程 #海报制作 #设计工具 #免费设计 #种子画室

**Post Template 3 — Aesthetic Collection (审美合集帖)**

标题: 用同一个种子数字，在不同版式下生成的4张海报…

正文:
同一个种子数字 888888888，在种子画室选了4种不同版式，生成的海报风格天差地别👇

🌀 漩涡 — 像在深海里旋转
🔷 蒙德里安 — 现代艺术画廊风
🌌 星系 — 宇宙星云
💠 万花筒 — 对称曼陀罗

这个工具的神奇之处：每一个数字都是一个「平行宇宙」，换个数字就是完全不同的画面。

你想试试你的生日数字会生成什么吗？
评论区告诉我你的生日（月日四位数），我帮你生成贴出来！

#审美积累 #海报灵感 #生成艺术 #视觉设计 #种子画室

**Posting cadence on Xiaohongshu:**
- Week 1: Post daily (7 posts in 7 days) — establish presence
- Week 2-4: 3-4 posts/week
- Best posting times: 12:00-13:00, 18:00-19:00, 21:00-22:00 (China time)
- Use location tag: 上海/北京/深圳 (your city) for algorithmic exposure
- Interact with 设计/插画/壁纸 hashtags daily — comment genuinely on others' posts, do NOT spam your link

### 1.2 抖音/快手 (Douyin/Kuaishou)

Short-form video is essential. The product demo IS the content.

**Video Script 1 — "3 Posters in 15 Seconds" (15s)**

```
[画面: 网站打开，手指点击「随机生成」]
音效: 清脆的点击音效
[海报1生成 — 鲜艳的霓虹配色漩涡]
文字叠加: "随机"
[手指再次点击]
[海报2生成 — 完全不同风格]
文字叠加: "再随机"
[手指再次点击]
[海报3生成 — 绝美]
文字叠加: "再随机…这张绝了"
[画面切到导出按钮，点导出]
文字叠加: "导出PNG，就是你的专属海报"
[画面切到复制链接按钮]
文字叠加: "复制链接，发给朋友"
结束画面: Logo + "种子画室 · 免费使用"
```

**Video Script 2 — "生日数字挑战" (30s)**

```
[口播] "输入你的生日数字，看AI能生成什么海报？"
[画面: 在种子画室输入0428（或其他日期）]
[画面: 海报生成过程加速播放 2x]
[画面: 最终海报全屏展示 3秒]
[口播] "这就是4月28日生日的专属海报！"
[口播] "评论区留下你的生日，我帮你生成！"
[画面: 二维码/网址]
```

**Video Script 3 — "5种版式对比" (45s)**

```
[分屏画面: 同一种子数字，5种版式并排展示]
[左: 漩涡 | 中: 蒙德里安 | 右: 星系]
[然后切换: 万花筒 | 流体]
[口播] "同一个数字，5种算法，5种完全不同的海报"
[口播] "漩涡=深海螺旋，蒙德里安=几何画廊，星系=宇宙星云，万花筒=曼陀罗，流体=烟雾大气"
[口播] "完全免费，浏览器打开就能玩。链接在主页。"
```

**Douyin/Kuaishou posting tips:**
- First 3 seconds must hook — show the most stunning poster immediately
- Use trending background music (check Douyin hot music list weekly)
- Always include the link in your bio, not in comments (douyin filters links)
- Cross-post the same video to both platforms
- Hashtags: #生成艺术 #海报 #设计 #神奇网站 #免费工具 #种子画室 #视觉设计

### 1.3 知乎 (Zhihu)

Zhihu is for authority-building and long-tail SEO. Your content here gets indexed by Baidu.

**Question 1: "有哪些让你一眼相中的免费设计工具？"**

回答:
作为一个独立开发者，我必须推荐我自己做的 — 种子画室 (Seed Studio)。

它是一个纯浏览器的生成艺术海报工具，不需要下载、不需要注册、不需要会设计。

核心功能：
1. 输入一个「种子数字」，算法生成一张独一无二的海报
2. 5种算法版式（漩涡、蒙德里安、星系、万花筒、流体）+ 8套配色
3. 调整密度、缩放、旋转角度等参数实时预览
4. 导出PNG，复制链接分享给朋友

免费的，用着玩的。做壁纸、做海报都行。
Pro版¥99终身，解锁4K无水印导出+商用授权。

地址：infraycs.github.io/seed-studio

[插入3-4张示例海报截图]

---

**Question 2: "程序员有哪些有意思的副业/开源项目？"**

回答:
我做了一个叫「种子画室」的生成艺术工具，技术栈是 p5.js + 纯前端。

技术上有几个有意思的点：
- 用 mulberry32 伪随机数算法实现确定性生成：同一个种子数字，在任何设备上生成完全相同的海报
- URL 即状态：所有参数编码在 URLSearchParams 里，分享链接=分享完整创作
- 单个 HTML 文件，零构建步骤，部署在 GitHub Pages

目前免费使用，Pro ¥99 终身。算是「build in public」的一次尝试，欢迎体验和 star。

GitHub：[你的GitHub链接]

---

**Question 3: "有哪些适合打印成海报挂在墙上的生成艺术作品？"**

回答:
推荐用「种子画室」自己生成…（介绍工具，展示A4/16:9导出功能，插入几张适合打印的海报截图）

---

**Question 4: "如何零基础入门生成艺术/generative art？"**

回答:
（写一篇完整的入门文章，介绍什么是生成艺术，p5.js基础，种子系统的概念，最后推荐种子画室作为「不需要写代码就能体验生成艺术」的入口）

---

**Zhihu strategy:**
- Answer 2-3 existing high-traffic questions per week (don't just post your own articles)
- Write 1 original article per week on your Zhihu column
- Every answer should include 2-3 poster images — Zhihu's feed algorithm favors image-rich answers
- Cross-link to your other answers and articles
- Use the 「种子画室」topic tag when available

### 1.4 B站 (Bilibili)

**Video Concept: "10分钟带你做一个生成艺术海报网站"**

This is a coding tutorial that secretly markets your product.

大纲:
00:00-00:30 — 展示种子画室的成品效果（3-4张海报快速切换）
00:30-02:00 — 介绍生成艺术的概念，什么是种子随机数
02:00-05:00 — p5.js 基础教学：setup, draw, random, noise
05:00-08:00 — 实现一个简单的漩涡版式（简化版代码教学）
08:00-09:30 — 进阶：如何用 URL 参数分享作品
09:30-10:00 — 完整版在种子画室可以体验，链接在简介

标题：一口气学会生成艺术！p5.js + 种子系统 = 无限海报｜编程入门
标签：p5.js, 生成艺术, 创意编程, 前端开发, 海报生成, 种子画室

**Second video concept: "这个免费网站让我戒掉了刷短视频"**
- 纯体验向视频，展示不断随机生成海报的快感
- BGM: lofi hiphop
- 标题党友好，适合B站推荐算法

### 1.5 即刻 (Jike) — Creative/Design Circles

即刻是设计师和独立开发者的聚集地，圈子文化很强。

**加入的圈子:**
- 「设计杂货铺」
- 「独立开发者」
- 「生成艺术」
- 「创意编程」

**发帖模板 (短动态):**

```
做了个小工具：输入一个数字，生成一张独一无二的算法海报。

🌱 种子画室 Seed Studio
→ 5种算法版式，8套配色，实时调参
→ 同一个种子数字 = 同一张海报（可分享，可复现）
→ 免费，浏览器打开即用

链接在评论区👇
[附4张不同风格的海报]
```

**发帖模板 (互动向):**

```
给我一个数字，我给你生成一张专属海报🌱

评论区留下任意数字（生日、纪念日、幸运数字都可以），我截图回复你生成的海报！

#种子画室 #生成艺术
```

**即刻策略:**
- 每天发1条动态，不要硬广
- 50%的内容是分享你生成的海报（不加链接，纯分享审美）
- 30%是互动向（让用户给数字你帮生成）
- 20%是工具推荐向（带链接）
- 多评论别人的帖子，尤其是设计圈和独立开发者圈

### 1.6 微信朋友圈/微信群 (WeChat)

**朋友圈发布策略:**

Day 1 朋友圈:
```
做了一个小东西🌱

种子画室 — 输入一个数字，生成一张海报。
同一个数字永远生成同一张海报。
换一个数字，就是全新的画面。

完全免费，浏览器打开就能玩。
（做了整整一周，终于能见人了）
[配4张海报九宫格 + 小程序码/二维码]
```

Day 3 朋友圈:
```
朋友们反馈说种子画室玩上瘾了…我自己也是，每天随机生成几张当壁纸。

有人问能不能商用？免费的带个小水印，个人用完全够。
想商用/去水印/4K导出的话，¥99永久，就当请我喝几杯咖啡☕

[配新的3张海报]
```

Day 5 朋友圈:
```
分享一下种子画室的「种子系统」是怎么工作的：

你用某个数字（比如888888888）生成了一张海报 → 复制链接发给朋友 → 朋友打开链接 → 看到和你一模一样的那张海报 → 他点「随机」 → 生成他自己的 → 复制他的链接…

每个人都是一个「种子」，链接是传播的根。

某种意义上，这是一个永不停歇的海报生成树🌳

[配流程图]
```

**微信群策略:**
- 设计/插画/手账群：分享海报截图 + "用这个工具生成的，免费的，链接发下面👇"
- 独立开发者/程序员群：分享技术实现 + "纯前端，p5.js，单HTML文件，开源"
- 壁纸/头像分享群：生成一批精美壁纸直接发群里，有人问就说工具名
- **关键动作**: 在每个群里，确保发的是你的 seed link（例如 `infraycs.github.io/seed-studio/?s=888888888&l=vortex&c=neon`），而不是首页链接。这样收到的人打开看到的是你生成的那张海报，好奇心会驱使Ta点「随机生成」。

---

## 2. Global Market ($0 Budget)

### 2.1 Product Hunt — Launch Strategy

Product Hunt is your highest-leverage global launch channel. One good launch = 500-2000 new users in 24 hours.

**Pre-launch checklist (do 1 week before):**
- [ ] Create maker profile with real photo, bio, Twitter link
- [ ] Prepare 5 high-quality screenshots (at least one should be a GIF showing the seed-change-poster cycle)
- [ ] Prepare a 30-60 second demo GIF (the app in action, randomize → poster changes)
- [ ] Choose launch day: **Tuesday** (highest traffic day on PH)
- [ ] Schedule launch for 12:01 AM PT (so you have the full 24 hours)
- [ ] Line up 5-10 friends to upvote and comment in the first hour
- [ ] Prepare first comment (see below) — post it within 60 seconds of going live
- [ ] Create a launch discount code: PH2026 for 30% off Pro (or make it PHFREE for a free Pro month)

**Listing Copy:**

**Tagline:** "One seed. Infinite posters. A generative art studio in your browser."

**Description:**
Seed Studio turns a single number into an infinite gallery of algorithmic poster art. Five mathematically distinct layout engines (Vortex, Mondrian, Galaxy, Kaleidoscope, Fluid), eight curated color palettes, and a deterministic seed system — change one number, generate an entirely unique poster. Export as high-resolution PNG for print, social media, or wallpapers.

No signup. No install. No build step. Just open the page and create.

**Why I built this:** Generative art tools are either too technical (Processing, shaders, CLI) or too limited (template-based poster makers). Seed Studio sits in the sweet spot: instant feedback, real algorithmic depth, and a seed system that makes every poster shareable like a Spotify link for visual art.

**First Comment (post within 60 seconds of going live):**

```
Hey Product Hunt! 👋 Maker here.

This started as a weekend project and turned into a 2-month obsession. I wanted a tool where I could just... make pretty things. Hit a button. See something beautiful. Share it.

**How it works:**
→ A single number (the "seed") deterministically generates an entire poster
→ Same seed = same poster, on any device, forever
→ Share the URL = share the exact artwork
→ Change the seed = infinite unique posters

**5 layout engines:**
🌀 Vortex – logarithmic spirals
🔷 Mondrian – De Stijl geometric subdivision
🌌 Galaxy – gravity-simulated particle orbits
💠 Kaleidoscope – N-fold rotational symmetry
🌊 Fluid – Perlin noise flow fields

**Tech:** Pure frontend – p5.js + vanilla JS. The entire app is a single HTML file. Deployed on GitHub Pages.

**Free vs Pro:**
- Free: all layouts, all palettes, watermarked export (1200px), personal use
- Pro (¥99 lifetime): 4K export, no watermark, commercial license

**Use code PH2026 for 30% off Pro** 🎉

Would love feedback on:
1. Which layout produces the best results?
2. What features would make you upgrade?
3. Any bugs on mobile/tablet?

Thanks for checking it out! 🌱
```

**Product Hunt Day-of Strategy:**
- 12:01 AM PT: Listing goes live. Immediately post first comment.
- First 4 hours are critical — respond to EVERY comment within 15 minutes. PH's algorithm heavily weights early engagement.
- Share your PH listing on Twitter, Reddit, Discord — drive external votes.
- 8 AM PT: Most PH users wake up. Post a second comment with "morning update" — share a particularly beautiful seed you discovered overnight.
- 12 PM PT: Mid-day check-in comment. Share stats if they're good.
- 8 PM PT: Final push. Thank the community, share final stats, tease what's next.
- End of day: Compile stats, screenshot your ranking. Even if you don't hit #1, top 5 is a massive win.

### 2.2 Reddit — Post Templates

**r/generative (1.2M members) — Post first**

Title: I built a browser-based generative poster tool with deterministic seeds — Seed Studio

Body:
```
Been lurking here for years. Finally built something worth sharing.

Seed Studio is a generative poster art tool that runs in your browser. Five layout algorithms, eight palettes, all deterministic from a single seed number.

The layouts:
- Vortex — logarithmic spirals with particle trails
- Mondrian — recursive BSP subdivision (De Stijl style)
- Galaxy — gravity simulation with orbit trails  
- Kaleidoscope — N-fold rotational symmetry
- Fluid — multi-octave Perlin noise flow fields

The key feature: every poster is deterministically generated from a seed number using mulberry32 PRNG. Same seed = same poster on any device. Share a URL and anyone sees exactly what you see.

Tech: p5.js, vanilla JS, one HTML file. Free to use (watermarked export). Pro is $15 lifetime (currently ¥99 for China market).

Would love this community's feedback:
1. Which layout produces the best compositions?
2. What generative techniques should I add next? (L-systems? Reaction-diffusion? Strange attractors?)
3. Are the parameter ranges providing enough control?

Link: https://infraycs.github.io/seed-studio
```

**r/webdev (2.3M members)**

Title: Show r/webdev: A single-HTML-file generative art app — URL as state, deterministic PRNG, zero build step

Body:
```
Built a side project I think this sub will appreciate from a technical angle.

Seed Studio – browser-based generative poster art.

Technical highlights:
- Single HTML file – no webpack, no npm, no build. Just open it.
- URL as state – all parameters encoded in URLSearchParams. Share the link = share the exact state.
- Deterministic PRNG – mulberry32. Given same seed, produces identical sequence of pseudo-random numbers every time. This is the key to reproducibility.
- Canvas 2D compositing – radial gradients, vignettes, Perlin noise grain, bloom effects. All standard Canvas API, no WebGL.
- Debounced redraw – 120ms debounce during slider drags. UI stays responsive.

Deployed on GitHub Pages. Free. Pro ¥99 lifetime.

View source (it's one file). Happy to answer technical questions.

Link: https://infraycs.github.io/seed-studio
GitHub: [your GitHub link]
```

**r/SideProject (200K members)**

Title: Launched my generative poster tool — got first Pro sale within 24 hours. What I learned.

(Adapt this AFTER you have some actual metrics. If launching fresh, use the r/webdev or r/generative template instead.)

**r/InternetIsBeautiful (17M members)**

Title: This website generates a unique, beautiful poster from a single number. Every link creates something no one has ever seen.

Body:
```
https://infraycs.github.io/seed-studio

Change the seed number → completely different poster. Same seed = same poster, on any computer, forever. Share a link, the recipient sees exactly what you created.

All in your browser. No download. No signup.

My favorite thing: open it, hit Randomize 10 times, screenshot your favorite, send the link to a friend. Watching them open it and go "wait, how does it know what to make?" never gets old.
```

**r/design (2.5M members)**

Title: Built a free tool that generates unique poster art from a number — useful for backgrounds, print, social

(Use the template from the existing MARKETING_LAUNCH_PLAN.md — it's solid.)

**Reddit posting rules (CRITICAL):**
- NEVER post the same content across subreddits on the same day. Space them 2-3 days apart.
- Read each subreddit's rules before posting. r/InternetIsBeautiful requires direct links. r/webdev prefers self-posts.
- Post at optimal times: 7-9 AM ET on weekdays for US-heavy subs. Check each sub's traffic stats on subredditstats.com.
- Respond to EVERY comment on your posts for the first 24 hours.
- Do NOT ask for upvotes. Reddit detects this and shadowbans.

### 2.3 Twitter/X — 10 Ready-to-Post Tweets

**Tweet 1 (Hook — post first):**
```
🌱 I built a generative poster art tool that runs in your browser.

One number → one unique poster. Change the number → infinite variations.

No signup. No install. Just open and create.

It's called Seed Studio.
https://infraycs.github.io/seed-studio
```
[attach 4-poster collage image]

**Tweet 2 (Layout comparison):**
```
4 posters. Same seed. 4 different layout engines.

🌀 Vortex — logarithmic spirals
🔷 Mondrian — De Stijl geometry
🌌 Galaxy — gravity simulation
💠 Kaleidoscope — N-fold symmetry

The ONLY difference is the algorithm.
https://infraycs.github.io/seed-studio
```
[attach comparison image]

**Tweet 3 (Seed system):**
```
The coolest feature of Seed Studio? The seed system.

Every poster is deterministically generated from a single number.

Share a URL → anyone can regenerate the EXACT same poster.

It's a Spotify link for visual art.
```

**Tweet 4 (For developers):**
```
Devs: Seed Studio is a single HTML file.

Zero build step.
Zero dependencies (beyond p5.js).
All state encoded in the URL.
Deterministic PRNG (mulberry32).

Great example of:
• Procedural generation
• URL-based state management
• Canvas 2D compositing
• Freemium architecture (zero backend)

View source 👇
```

**Tweet 5 (For designers):**
```
Designers: need a unique background/poster in 30 seconds?

Seed Studio:
→ Pick a layout (5 algorithms)
→ Hit "Randomize"
→ Export as PNG

Every output is deterministic. No stock photo vibes. Ever.

Free to use.
```

**Tweet 6 (Monetization transparency):**
```
Building in public: Seed Studio monetization.

Free: all layouts, all palettes, watermarked export (1200px)
Pro (¥99 lifetime): 4K, no watermark, commercial license

No VC. No ads. No tracking. No AI-generated slop.

Just math. Beautiful, deterministic math.
```

**Tweet 7 (Challenge):**
```
🎲 Seed Studio challenge:

1. Go to the site
2. Hit Randomize 5 times
3. Screenshot your favorite
4. Reply with your seed number

Best composition gets a free Pro license.

I'll go first 👇
```

**Tweet 8 (Tech deep dive):**
```
How Seed Studio generates infinite unique posters:

🧮 mulberry32 PRNG — deterministic, fast, uniform distribution
🎨 Perlin noise flow fields — 3-octave for the Fluid layout
🌀 Logarithmic spirals — 2-8 interleaved arms (Vortex)
🔷 Recursive BSP subdivision — De Stijl style (Mondrian)
🌌 N-body gravity simulation — orbit trails (Galaxy)
💠 N-fold rotational symmetry — mandalas (Kaleidoscope)

Zero AI. Pure math.
```

**Tweet 9 (Cross-promotion):**
```
If you like:
• @p5xjs creative coding
• generative art
• minimal JS tools
• indie SaaS

You'll probably enjoy what I built.

Seed Studio — generative poster art, in your browser 🌱
```

**Tweet 10 (48-hour recap):**
```
48 hours since launch. Some early numbers:

→ [X] posters generated
→ [X] seed links shared
→ Most popular layout: [which one]
→ [X] Pro upgrades

Generative art isn't niche. People just needed an accessible tool.

Try it: [link]
```
[fill in actual numbers before posting]

**Twitter posting schedule:**
- Tweet 1: Launch day, 8 AM ET
- Tweet 2: Launch day, 2 PM ET
- Tweet 3: Day 2, 10 AM ET
- Tweet 4: Day 2, 4 PM ET
- Tweet 5: Day 3, 9 AM ET
- Tweet 6: Day 3, 3 PM ET
- Tweet 7: Day 4, 11 AM ET (Saturday — people have time to participate)
- Tweet 8: Day 5, 12 PM ET (Sunday — long-form reading day)
- Tweet 9: Day 6, 10 AM ET
- Tweet 10: Day 7, 10 AM ET

### 2.4 Hacker News — "Show HN" Post

**Title:** Show HN: Seed Studio — generative poster art from a single number (p5.js + deterministic PRNG)

**Body:**
```
I built a browser-based generative poster art tool. Here's what's interesting about it technically:

1. Every poster is deterministically generated from a single numeric "seed" using mulberry32 PRNG. Same seed = exact same poster, on any device, forever. This is the key design decision — it makes the art shareable, reproducible, and collaborative in a way that random generative art isn't.

2. All state is encoded in URLSearchParams. Share a link and the recipient sees the exact poster you created, with all parameters preserved. No account, no server, no database.

3. Five distinct generative algorithms:
   - Vortex: interleaved logarithmic spirals with particle accretion
   - Mondrian: recursive BSP rectangle subdivision (De Stijl)
   - Galaxy: N-body gravity simulation with orbit trails
   - Kaleidoscope: N-fold rotational symmetry (mandalas)
   - Fluid: multi-octave Perlin noise flow fields

4. The entire app is one HTML file. p5.js is the only dependency. Zero build step, zero framework, zero backend. Deployed on GitHub Pages.

5. Canvas 2D compositing for all visual effects: radial gradients, Perlin noise grain overlay, vignettes, bloom/glow via alpha compositing. No WebGL (keeps it simple and compatible).

It's free to use. Pro tier (¥99 lifetime) unlocks 4K export and removes the watermark. I chose a lifetime pricing model because I hate subscriptions.

Code is view-source. Happy to answer questions about the implementation — especially the PRNG, the flow field, or the URL-state architecture.

Link: https://infraycs.github.io/seed-studio
```

**HN posting tips:**
- Post on a weekday morning (Tue-Thu, 8-10 AM ET) for maximum visibility
- Saturday posts face less competition (fewer submissions = easier to hit front page) but also fewer readers
- If your post gets traction, stay active in the comments for the first 4 hours
- Have a friend upvote within the first 15 minutes (but don't coordinate a voting ring)
- HN loves technical detail — emphasize the algorithms, the PRNG, and the architecture

### 2.5 Discord — Servers to Join

| Server | Why | What to Do |
|--------|-----|------------|
| **The Coding Train** | p5.js community by Daniel Shiffman | Share in #share-your-work. "Built a generative poster tool with p5.js, would love feedback!" |
| **Creative Coding** | Generative art community | Share your best posters in #gallery. Ask for feedback on composition. |
| **GenArt** | Generative art focused | Seed links work great here — share a seed and challenge others to remix. |
| **Indie Hackers** | Solo founder community | Share in #building-in-public. Document your launch journey. |
| **p5.js Discord** | Official p5.js community | Share in #showcase. Good for technical feedback. |
| **Design Systems** | Design community | Share posters, ask how they'd use them in design work. |
| **Side Project** | Builder community | Share your launch, ask for feedback on the monetization model. |

**Discord etiquette:**
- Spend 2-3 days lurking and contributing before posting your own work
- Always share a specific seed link, not just the homepage — "Check out this poster I generated: [seed link]" works 10x better than "Check out my tool: [homepage]"
- Offer to help others before asking for anything

### 2.6 GitHub — Make the Repo Appealing

**README improvements (current README is already good, add these):**

1. **Add a GIF demo at the top** — the first thing people see should be the poster-generating animation, not text.

2. **Add a "Gallery" section** with 6-8 beautiful poster examples, each linked via seed URL so people can open them live.

3. **Add star-worthy badges:**
```
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]
[![Made with p5.js](https://img.shields.io/badge/Made%20with-p5.js-ED225D)]
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]
```

4. **Add "Live Demo" button at the very top:**
```
### 🚀 [Try it live →](https://infraycs.github.io/seed-studio)
```

5. **Pin the repo** to your GitHub profile.

6. **Add to GitHub topics:** `generative-art`, `p5js`, `poster-generator`, `creative-coding`, `algorithmic-art`, `procedural-generation`, `seed-based`, `freemium`, `static-site`

7. **Add a CONTRIBUTING.md** inviting contributions (new layouts, new palettes, translations).

8. **Add a "Stargazers over time" section** — use star-history.com badge. Social proof compounds.

---

## 3. Growth Loops (Built Into Product)

These are features you need to ADD to the product to make the loop work:

### Loop 1: Seed Sharing (The Core Loop)

```
User creates poster → Copies seed link → Shares on social/DM →
Recipient opens link → Sees exact same poster → "Cool, what if I change the number?" →
Hits Randomize → Creates their own → Shares their link → [loop continues]
```

**What to build now:**
- [ ] "Share" button next to the seed display that generates a card image (poster preview + seed number + QR code to the site + "Made with Seed Studio" footer). This makes sharing on WeChat/Twitter/Instagram frictionless.
- [ ] When sharing to WeChat, the shared card should include a QR code pointing to the site.
- [ ] Add `og:image` dynamically — when someone shares a seed link on social media, the preview card should show the actual poster, not a generic logo.

### Loop 2: Watermark as Advertising

Every free-tier export includes "Made with Seed Studio · 种子画室" in the corner.

**Optimize the watermark:**
- Make it small enough to not ruin the experience, but readable enough to be web-searchable.
- Add the URL "seed.studio" in the watermark (when you get a domain).
- Position it in the bottom-right corner consistently.
- Every poster shared on social media, used as a wallpaper, printed on a wall — is a billboard for Seed Studio.

### Loop 3: Template Gallery (Public Seeds)

**What to build:**
- A `/gallery` page that shows curated "posters of the day" / "community favorites."
- Each entry: poster thumbnail + seed number + creator attribution (optional) + "Remix This" button.
- Users can submit their seeds to the gallery (moderation optional at your scale).
- This page becomes an SEO landing page + social proof hub.

### Loop 4: "Remix This" Button

When a recipient opens a shared seed link, show a prominent "🎲 Remix This" button that:
- Keeps the same layout and palette
- Randomizes only the seed number
- Generates a related but different poster
- Shows subtle attribution: "Remixed from @original-creator's poster"

This creates a visible chain and incentivizes sharing.

### Loop 5: "Your Poster of the Day"

If you add a cookie/localStorage:
- On first visit each day, the page loads with a globally curated "Poster of the Day" seed.
- All users see the same thing.
- Creates a shared experience: "What's today's poster?"
- Tweet-worthy: "Today's Seed Studio poster is incredible 🔥"

---

## 4. SEO Strategy

### 4.1 Keywords to Target

**English Keywords (target landing page):**

| Keyword | Est. Volume | Difficulty | What to Optimize |
|---------|------------|------------|------------------|
| generative art maker | 2,400/mo | Medium | Homepage title + H1 |
| free poster maker | 22,000/mo | High | Blog post + landing page section |
| algorithmic art generator | 880/mo | Low | Homepage meta description |
| random art generator | 4,400/mo | Medium | Features section |
| p5.js poster generator | 210/mo | Very Low | Blog post |
| AI poster generator | 18,000/mo | High | Comparison blog (Seed Studio vs AI tools) |
| 4K wallpaper generator | 1,600/mo | Low-Med | Export feature page |
| abstract art generator | 3,600/mo | Medium | Gallery page |
| seed-based art tool | 50/mo | Very Low | About/How it works page |

**Chinese Keywords (target Chinese pages/Baidu SEO):**

| Keyword | Est. Volume | What to Optimize |
|---------|------------|------------------|
| 生成艺术工具 | 210/mo | 首页标题 |
| 免费海报生成器 | 3,600/mo | 落地页 |
| 算法艺术 | 590/mo | 博客文章 |
| 在线海报制作 | 8,800/mo | 功能页 |
| 随机艺术生成 | 70/mo | 介绍页 |
| 种子画室 | Brand | 所有页面 |
| p5.js教程 | 320/mo | B站视频 + 博客 |
| 编程生成海报 | 90/mo | 技术文章 |

### 4.2 On-Page SEO Fixes (Do Today)

**landing.html title tag:**
```html
<title>Seed Studio · 种子画室 — Free Generative Poster Art Maker | Algorithmic Art Online</title>
```

**landing.html meta description:**
```html
<meta name="description" content="Create unique generative poster art in your browser. 5 algorithmic layouts, 8 color palettes, deterministic seed system. Export high-res PNGs. Free to use, no signup.">
```

**index.html (the app):**
```html
<title>Seed Studio · 种子画室 — Generative Poster Art Studio</title>
<meta name="description" content="Generate unique algorithmic posters from a single number. 5 layout engines, 8 palettes. Free, no signup. Export PNG.">
```

### 4.3 Content for Organic Traffic

**Blog post 1: "What Is Generative Art? A Beginner's Guide (With Examples)"**
- Target keyword: generative art for beginners
- Include 5-6 Seed Studio poster examples
- Explain deterministic seeds in simple terms
- Link to the tool: "Try it yourself without writing code"

**Blog post 2: "How to Make Posters Without Design Skills (Free Tools 2026)"**
- Target keyword: free poster maker
- List 5 tools, position Seed Studio prominently
- Honest comparison including limitations

**Blog post 3: "The Mathematics Behind Beautiful Algorithmic Art"**
- Target keywords: algorithmic art, procedural generation art
- Deep dive into each of the 5 layout algorithms
- Accessible explanations with visuals

**Blog post 4: "Seed Studio vs Midjourney: When Algorithms Beat AI for Poster Design"**
- Target keyword: AI poster generator alternative
- Honest comparison: AI is better at realistic imagery, Seed Studio at deterministic abstract geometry
- "Both have their place" framing

### 4.4 How to Get Backlinks ($0)

1. **GitHub stars** — every star is a backlink on GitHub's search/explore.
2. **Reddit posts** that stay up — these generate dofollow backlinks from high-DA domains.
3. **Hacker News** front page — links from HN are high-authority.
4. **Dev.to / Hashnode** — cross-post your blog articles. Include canonical link back to your site.
5. **Side project directories** — submit to:
   - AlternativeTo.net
   - SaaSHub.com
   - Toolify.ai
   - There's An AI For That (even though it's not AI, the audience overlaps)
   - Betalist.com
   - StartupBase.io
   - TinyStartups
   - IndieHackers.com/products
6. **Create a free tool page** on your site (e.g., "Free Poster Maker") — these get linked naturally.
7. **Guest post** on one p5.js/creative coding blog — offer to write a tutorial in exchange for a link.
8. **Answer Quora/Zhihu questions** about generative art, poster design, free design tools — include your link naturally.

---

## 5. First 7-Day Action Plan

This is the "execution engine" — do these actions in order, exactly as written.

### Day 1: Foundation (Monday)

**Morning (2 hours):**
- [ ] Fix the product issues listed in the Pre-Flight Checklist at the top of this document
- [ ] Create all social media accounts: Xiaohongshu, Douyin, Zhihu, Bilibili, Jike, Twitter/X
- [ ] Set up profile pictures and bios on all platforms (use the seed emoji 🌱 as profile pic — consistent branding)
- [ ] Set up a link-in-bio page (use bio.link or linktr.ee free tier) pointing to your site + social links

**Afternoon (2 hours):**
- [ ] Generate and save 20 beautiful posters (various layouts, various palettes). These are your content assets for the entire week. Name them by seed number so you can regenerate if needed.
- [ ] Create a "swipeable" carousel image: 4 posters (one per layout) in a single 1080x1920 vertical image for Xiaohongshu/Douyin
- [ ] Record a 15-second screen recording of you hitting Randomize 5 times (for Douyin)

**Evening (1 hour):**
- [ ] Post on Xiaohongshu: Post Template 1 (The Hook). Your first post. Post at 21:00 China time.
- [ ] Post on Jike: Short intro post with 4 posters
- [ ] Share on WeChat Moments: Day 1 post about "made a thing"

### Day 2: Xiaohongshu + Reddit (Tuesday)

**Morning (1.5 hours):**
- [ ] Post on Xiaohongshu: Post Template 2 (Tutorial) at 8:00 China time
- [ ] Interact with 20 posts under #海报设计 #生成艺术 hashtags. Genuine comments, no link dropping.
- [ ] Check Day 1 Xiaohongshu post — reply to all comments within 1 hour

**Afternoon (1.5 hours):**
- [ ] Post on r/generative (Reddit) — use template from Section 2.2. Post at 10 AM ET (which is 10 PM China time — schedule it or stay up).
- [ ] Post Tweet 1 on Twitter/X at 8 PM ET (schedule if needed)

**Evening (1 hour):**
- [ ] Record Douyin video: Video Script 1 ("3 Posters in 15 Seconds"). Post at 20:00 China time.
- [ ] Respond to Reddit comments as they come in

### Day 3: Community Engagement (Wednesday)

**Morning (1.5 hours):**
- [ ] Post on Xiaohongshu: Post Template 3 (Aesthetic Collection) at 12:00 China time
- [ ] Zhihu: Find and answer Question 1 ("免费设计工具") — use template from Section 1.3
- [ ] Interact with 15 more Xiaohongshu posts

**Afternoon (1.5 hours):**
- [ ] Post on r/webdev (Reddit) using template. Post at 11 AM ET.
- [ ] Post Tweet 2 + Tweet 3 on Twitter/X
- [ ] Join 5 Discord servers from the list in Section 2.5. Introduce yourself. Don't share your link yet — just participate genuinely.

**Evening (1 hour):**
- [ ] Post on Jike: "给我一个数字，我给你生成一张海报" interaction post
- [ ] Generate and reply with posters for every comment
- [ ] WeChat Moments: Day 3 post update

### Day 4: Content Creation (Thursday)

**Morning (2 hours):**
- [ ] Zhihu: Answer Question 2 ("程序员副业") and Question 3 ("适合打印的海报")
- [ ] Write and publish first blog post on your Dev.to account: "What Is Generative Art? A Beginner's Guide" — cross-post from the content plan in Section 4.3
- [ ] Cross-post the same article to Hashnode

**Afternoon (1.5 hours):**
- [ ] Post Tweet 4 + Tweet 5 on Twitter/X
- [ ] Submit to 5 side project directories (AlternativeTo, SaaSHub, etc.) — list in Section 4.4
- [ ] Share your best seed links in the Discord servers you joined yesterday

**Evening (1 hour):**
- [ ] Post on Xiaohongshu: 4th post — share a user's birthday-generated poster from Jike comments (with their permission)
- [ ] Record and post Douyin video 2 ("生日数字挑战")

### Day 5: Bilibili + Product Hunt Prep (Friday)

**Morning (2 hours):**
- [ ] Record Bilibili tutorial video: "10分钟教你做生成艺术海报" (script in Section 1.4). Record the screen + voiceover. Edit simply (just cut, no fancy effects needed).
- [ ] Upload to Bilibili at 12:00 China time

**Afternoon (2 hours):**
- [ ] Product Hunt prep: Create maker profile, upload screenshots, record demo GIF (30s of the app in action)
- [ ] Schedule Product Hunt launch for NEXT Tuesday 12:01 AM PT (not today — you need lead time for PH)
- [ ] Post on r/SideProject (Reddit) if you have any early metrics to share
- [ ] Post Tweet 6 + Tweet 7 on Twitter/X

**Evening (1 hour):**
- [ ] Engage on Jike, respond to all comment threads
- [ ] WeChat Moments: Day 5 post (the "seed tree" concept post)

### Day 6: Amplify + Engage (Saturday)

**Morning (1.5 hours):**
- [ ] Xiaohongshu: Post 5th post — weekend aesthetic vibes (people browse more on weekends)
- [ ] Zhihu: Write and publish original article (not just Q&A) — "什么是生成艺术？一篇就够了"
- [ ] Read and respond to all Reddit comment threads from the week

**Afternoon (1.5 hours):**
- [ ] Hacker News: Post "Show HN" (Saturday = less competition for front page) using template from Section 2.4
- [ ] Post Tweet 8 + Tweet 9 on Twitter/X
- [ ] Record and post Douyin video 3 ("5种版式对比")

**Evening (1 hour):**
- [ ] Curate the best user-generated posters from your week of "give me a number" interactions
- [ ] Prepare a Xiaohongshu post for Sunday showcasing community creations

### Day 7: Analyze + Iterate (Sunday)

**Morning (2 hours):**
- [ ] Compile Week 1 metrics:
  - Total unique visitors (from Cloudflare Analytics or Plausible)
  - Posters generated (if you're tracking events)
  - Seed links shared
  - Pro upgrades (revenue)
  - Social media followers gained per platform
  - Best performing Reddit post (upvotes + comments)
  - Best performing Xiaohongshu post (likes + saves + comments)
  - Best performing Douyin video (views + likes)

- [ ] Identify top 3 traffic sources. These are your focus areas for Week 2.

**Afternoon (1.5 hours):**
- [ ] Post tweet 10 (48-hour recap adapted to 7-day actual numbers)
- [ ] Xiaohongshu: Post 6th post — "第一周总结：我做的免费海报工具被XXX人用了"
- [ ] Write down your Week 2 plan based on what worked:
  - Double down on the top-performing Reddit sub (write a follow-up post)
  - Create more of the Xiaohongshu content style that performed best
  - If Douyin got traction, invest more in short video
  - If Zhihu answers got views, answer 5 more questions next week

**Evening (1 hour):**
- [ ] Email your first users (if you have any way to contact Pro buyers) — thank them, ask what they'd improve
- [ ] Post on Jike: weekly reflection on building in public
- [ ] Plan the Product Hunt launch for Tuesday (3 days from now) — rally your new followers for support

---

## 6. Week 2-4 Playbook (Quick Reference)

**Week 2 focus: Product Hunt launch + sustain content cadence**

| Day | Action |
|-----|--------|
| Monday | PH final prep: screenshot check, first comment ready, line up 10 upvoters. Xiaohongshu post #7. |
| **Tuesday** | **🚀 PRODUCT HUNT LAUNCH DAY.** All energy here. Respond to every comment. Share PH link on all social channels. |
| Wednesday | PH post-mortem (share stats). Reddit post on r/InternetIsBeautiful. |
| Thursday | Bilibili video #2 (the "戒掉短视频" concept). Zhihu answer 2 more questions. |
| Friday | Blog post #3 on Dev.to. Jike interaction post #3. |
| Saturday | Reddit follow-up post. Twitter threads. |
| Sunday | Week 2 analytics review. Plan Week 3. |

**Week 3 focus: Content engine + community**

- Publish 2 blog posts (cross-posted to Dev.to + Hashnode)
- Answer 3 Zhihu questions
- Xiaohongshu 4 posts
- Douyin 2 videos
- Join 3 more Discord servers, participate actively
- Submit to remaining 10 directories from Section 4.4

**Week 4 focus: Optimization + feature launch**

- Implement the top-requested feature from user feedback
- A/B test landing page (if you have enough traffic)
- Launch "Poster of the Day" feature (Growth Loop 5)
- Reach out to 5 design/creative coding blogs for backlinks
- End-of-month retrospective: full metrics, revenue, top channels

---

## 7. Realistic Targets (First 30 Days)

Given zero budget and one person executing:

| Metric | Conservative | Achievable | Ambitious |
|--------|-------------|------------|-----------|
| Total unique visitors | 1,500 | 5,000 | 12,000 |
| Posters generated | 5,000 | 15,000 | 40,000 |
| Seed links shared | 200 | 800 | 2,000 |
| Pro upgrades (¥99) | 5 | 20 | 50 |
| Revenue | ¥495 | ¥1,980 | ¥4,950 |
| Xiaohongshu followers | 100 | 500 | 2,000 |
| Twitter/X followers | 50 | 200 | 800 |
| Reddit total upvotes | 100 | 500 | 2,000 |
| Discord members | 20 | 100 | 300 |
| GitHub stars | 20 | 80 | 250 |
| Blog organic traffic | 0 | 50/mo | 200/mo |

**The realistic path to 1,000 users:**

- Product Hunt launch (Day 8-9): 500-800 visitors → assume 700
- Reddit posts (4-5 posts over 30 days): 100-300 visitors per successful post → assume 500 total
- Xiaohongshu organic (15-20 posts): 30-100 visitors per post → assume 800 total (Chinese market converts slower but compounds)
- Twitter/X organic (10+ tweets): 50-200 visitors total → assume 100
- Hacker News: if front page, 500-2,000 visitors. If not, ~50. → assume 100 (conservative)
- Direct share virality (seed links): the multiplier. Each user who shares brings 3-5 new users. → assume 300 from viral loop
- Discord + word of mouth: 100
- Search + directory listings (late-month): 100

**Conservative total: ~2,700 unique visitors. At a 2-5% Pro conversion rate = 54-135 Pro upgrades over time. That's more than 1,000 users and sustainable revenue to reinvest.**

---

## 8. Critical Don't-Dos (Anti-Patterns to Avoid)

1. **Don't spam links in WeChat groups without context.** Share a poster first, link second. Chinese users are hyper-sensitive to aggressive marketing.
2. **Don't post the same content across all Reddit subs on the same day.** You'll get flagged as a spammer.
3. **Don't buy followers/likes/upvotes.** Platforms detect this. Organic growth is slower but sustainable.
4. **Don't ignore comments.** The first 100 users are your most valuable — they give feedback, they share, they become evangelists.
5. **Don't launch on Product Hunt without preparation.** A bad PH launch (no upvotes, no comments) is worse than no launch — it signals "nobody wants this."
6. **Don't compare yourself to funded startups.** You are a solo indie maker. Your advantage is speed, authenticity, and direct connection with users. Lean into being the underdog.
7. **Don't add a paywall too early.** The free tier IS your marketing. Every free user is a potential referrer. Don't choke the top of the funnel.
8. **Don't forget the Chinese market.** Most English-language marketing advice ignores China. Your bilingual product is a competitive advantage — few generative art tools serve both markets.

---

## 9. Quick-Reference: URLs to Copy-Paste

```
Product:   https://infraycs.github.io/seed-studio
GitHub:    [your GitHub repo URL]
Xiaohongshu: [your RED profile URL after creating]
Douyin:    [your Douyin profile after creating]
Bilibili:  [your Bilibili channel after creating]
Jike:      [your Jike profile after creating]
Twitter/X: [your Twitter profile]
Discord:   [your Discord server — create one at discord.com]
```

---

*This plan was built for a solo indie maker with zero budget targeting both Chinese and global markets. Execute the first 7 days exactly as written, then iterate based on data. The single most important metric: seed links shared per day. If that number grows, everything else follows.*
