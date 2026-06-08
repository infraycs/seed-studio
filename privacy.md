# Privacy Policy — Seed Studio

**Last Updated**: June 8, 2026
**Effective Date**: June 8, 2026

Seed Studio ("Seed Studio," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website [seed.studio](https://seed.studio) or use our generative poster art application (collectively, the "Service").

**Our approach to privacy is simple:** The Service operates almost entirely in your browser. We do not have user accounts, databases, servers that store your personal data, analytics platforms, or advertising networks. We only access limited information when you make a purchase through our payment processor (LemonSqueezy). This Privacy Policy is designed to clearly explain our minimal data practices.

Please read this Privacy Policy carefully. By using the Service, you acknowledge that you have read and understood this Privacy Policy.

---

## Table of Contents

1. [Our Privacy Philosophy](#1-our-privacy-philosophy)
2. [Information We Do NOT Collect](#2-information-we-do-not-collect)
3. [Information We DO Access and Process](#3-information-we-do-access-and-process)
4. [How We Use Information](#4-how-we-use-information)
5. [Data Stored in Your Browser (localStorage)](#5-data-stored-in-your-browser-localstorage)
6. [Cookies Policy](#6-cookies-policy)
7. [Third-Party Services](#7-third-party-services)
8. [Data Sharing and Disclosure](#8-data-sharing-and-disclosure)
9. [Data Retention](#9-data-retention)
10. [Data Security](#10-data-security)
11. [International Data Transfers](#11-international-data-transfers)
12. [Your Rights and Choices](#12-your-rights-and-choices)
13. [Children's Privacy](#13-childrens-privacy)
14. [Do Not Track Signals](#14-do-not-track-signals)
15. [Changes to This Privacy Policy](#15-changes-to-this-privacy-policy)
16. [Contact Us](#16-contact-us)

---

## 1. Our Privacy Philosophy

Seed Studio is a **privacy-first** creative tool. We built the Service on the principle that you should be able to create generative artwork without compromising your privacy. Key architectural decisions that reflect this philosophy:

- **No user accounts**: There is no sign-up, login, or authentication system. No user database exists.
- **No server-side rendering or storage**: All artwork generation happens client-side in your browser using JavaScript and the HTML5 Canvas API. Your generated images, seed values, and parameter configurations never leave your device.
- **No analytics**: We do not use Google Analytics, Mixpanel, Hotjar, Facebook Pixel, or any other analytics, tracking, or session recording service. We do not track your behavior, usage patterns, or browsing history.
- **No advertising**: We do not sell advertising, display ads, or participate in ad networks. We do not build advertising profiles or engage in behavioral targeting.
- **No cookies (from us)**: Seed Studio's own domain does not set any cookies. (Third-party services essential to operation, like LemonSqueezy during checkout and Cloudflare for security, may set their own cookies as described in Section 6.)
- **No data sales**: We do not sell, rent, trade, or share your personal information with third parties for their marketing, advertising, or commercial purposes. We have never sold personal data and never will.

We believe that a creative tool should respect your creative privacy. The privacy policy is the privacy practice.

---

## 2. Information We Do NOT Collect

To be unequivocally clear, here is what we **do not** collect, store, access, or process when you use Seed Studio:

### 2.1 Account and Identity Data

- Username, display name, or profile information
- Email address (unless you make a purchase through LemonSqueezy; see Section 3)
- Password, PIN, or any authentication credentials
- Profile picture, avatar, or biographical information
- Social media account connections

### 2.2 Content and Creative Data

- Your generated images, poster art, or any visual output
- Your seed values, parameter configurations, or settings
- Your saved presets, favorites, or design drafts
- Any images or files you upload (the Service does not support file upload)
- Your creative process, workflow, or design decisions

### 2.3 Usage and Analytics Data

- Pages visited, features used, or time spent on the Service
- Click patterns, scroll depth, or mouse movements
- Browser type, version, or user agent string (we do not actively log this)
- Screen resolution, viewport size, or device type
- Referring URL or exit page
- Session duration or frequency of visits
- Any analytics or telemetry data

### 2.4 Identifiers and Fingerprints

- IP address (we do not log, store, or analyze IP addresses; Cloudflare processes IP addresses transiently for security; see Section 7.2)
- Browser fingerprint or device fingerprint
- Advertising ID (IDFA, AAID) or any device identifier
- Cookie-based identifiers (Seed Studio sets no cookies)

### 2.5 Location Data

- Precise geolocation (GPS, cell tower triangulation)
- Coarse location derived from IP address (we do not process IP addresses for location)
- Billing address (collected and stored by LemonSqueezy, not by Seed Studio; see Section 3)

### 2.6 Communication Data

- Messages, comments, or content you create on the Service (there is no messaging or commenting functionality)
- Support communications (we may retain support emails to resolve your issue; see Section 9)

---

## 3. Information We DO Access and Process

### 3.1 Purchase Information (via LemonSqueezy)

When you purchase a Pro Tier license, you interact with LemonSqueezy's checkout system. The information collected during checkout is collected by LemonSqueezy, not by Seed Studio. Here is the data flow:

**Information collected by LemonSqueezy (we never see the full payment details):**

| Data Element | Collected By | Visible to Seed Studio | Purpose |
|---|---|---|---|
| Full credit/debit card number | LemonSqueezy + Payment Processor | **No** | Payment processing |
| CVV/CVC security code | Payment Processor only | **No** | Payment authorization |
| Card expiry date | LemonSqueezy + Payment Processor | **No** | Payment processing |
| PayPal account details | LemonSqueezy + PayPal | **No** | Payment processing |
| Email address | LemonSqueezy | **Yes** (via merchant dashboard) | Receipts, license delivery, support lookups |
| Name (as entered on checkout) | LemonSqueezy | **Yes** (via merchant dashboard) | License association, support |
| Billing address | LemonSqueezy | **Yes** (via merchant dashboard) | Tax calculation and compliance |
| License Key (generated) | LemonSqueezy | **Yes** (via merchant dashboard) | License verification |
| Order ID | LemonSqueezy | **Yes** (via merchant dashboard) | Transaction reference |
| Product/Plan purchased | LemonSqueezy | **Yes** (via merchant dashboard) | License provisioning |
| License status (active/expired/refunded) | LemonSqueezy | **Yes** (via merchant dashboard) | Access control |

**Critical distinction:** Seed Studio never receives, stores, processes, or has access to your full credit card number, CVV, bank account details, or complete payment instrument information. This data is handled exclusively by LemonSqueezy and their underlying payment processors (Stripe, PayPal). Even the limited purchase data visible to us through the LemonSqueezy merchant dashboard is not downloaded, exported, or stored in any Seed Studio-controlled database. We access it on an as-needed basis within the LemonSqueezy dashboard for customer support purposes only.

### 3.2 License Verification Requests

When your browser verifies your Pro license status, it sends the License Key to the license verification API endpoint (`license.seed.studio`). The verification process:

1. Your browser sends the License Key to the endpoint
2. The endpoint forwards the License Key to LemonSqueezy's license validation API
3. LemonSqueezy returns validation result and license details
4. The endpoint passes the result back to your browser

During this process, the Cloudflare Worker handling the verification:
- Does **not log** License Keys to persistent storage
- Does **not log** IP addresses or request metadata to persistent storage
- Does **not retain** verification requests beyond Cloudflare's ephemeral execution environment
- Temporary execution logs may exist briefly within Cloudflare's Workers runtime for debugging purposes only (retained for minutes to hours, not days)

### 3.3 Support Communications

When you contact us via email (support@seed.studio, legal@seed.studio, or privacy@seed.studio), we receive and may retain:

- Your email address
- The content of your message
- Any information you voluntarily provide
- Email metadata (timestamp, subject line)

We use this information solely to respond to your inquiry and provide support. Support emails may be retained for reference and quality improvement purposes (see Section 9).

### 3.4 Network Traffic (Transient Processing)

As with any website, your browser transmits certain information as part of the HTTP/HTTPS protocol when you access the Service:

- Your device's IP address
- The URL requested
- HTTP headers (including User-Agent, Accept-Language, and Referer)
- The response status code and data volume

This information is processed transiently by Cloudflare's content delivery network as an unavoidable part of serving web traffic. We do not configure Cloudflare to log, store, analyze, or export this data beyond Cloudflare's default behavior (see Section 7.2). We do not access, download, or review access logs.

---

## 4. How We Use Information

### 4.1 Purchase Information

The limited purchase information accessible to us through the LemonSqueezy merchant dashboard is used **exclusively** for:

| Purpose | Example | Legal Basis (GDPR) |
|---|---|---|
| License provisioning and verification | Validating your License Key to activate Pro features | Performance of a contract (Art. 6(1)(b)) |
| Customer support | Looking up your order when you contact us about billing or access issues | Performance of a contract / Legitimate interests (Art. 6(1)(b), 6(1)(f)) |
| Refund processing | Identifying your purchase when you request a refund | Performance of a contract (Art. 6(1)(b)) |
| Fraud prevention | Detecting and preventing license abuse or payment fraud | Legitimate interests (Art. 6(1)(f)) |
| Legal compliance | Responding to lawful legal requests or regulatory obligations | Legal obligation (Art. 6(1)(c)) |
| Business analytics (aggregate) | Counting total Pro licenses sold, revenue totals (aggregated, non-identifiable) | Legitimate interests (Art. 6(1)(f)) |

### 4.2 What We Do NOT Do With Information

We do **not**:

- Build profiles of users or their creative behavior
- Analyze your generated content or design style
- Track you across the internet or across other services
- Use your information for automated decision-making or profiling that produces legal or similarly significant effects
- Enrich your data with information from third-party data brokers
- Conduct market research, surveys, or user testing without your explicit consent
- Use your email address for marketing (we do not send marketing emails)

### 4.3 Aggregated and De-Identified Data

We may aggregate or de-identify purchase data (e.g., total number of licenses sold, total revenue, plan distribution percentages) for business analysis and reporting. Aggregated data does not identify any individual and is not treated as personal data under this Privacy Policy.

---

## 5. Data Stored in Your Browser (localStorage)

### 5.1 What Is Stored

Seed Studio uses your browser's localStorage API to persist your preferences and license information between visits. localStorage is a client-side key-value store. **Data in localStorage never leaves your device** (with the sole exception of the License Key during verification, as described in Section 3.2).

The following data may be stored in localStorage on the seed.studio origin:

| Storage Key | Data Stored | Purpose | When Set |
|---|---|---|---|
| `seedstudio_license` | License Key, plan type, activation date, expiry date (if applicable) | Maintains your Pro Tier status across browser sessions | Upon license activation |
| `seedstudio_instance_id` | Randomly generated UUID v4 | Distinguishes browser instances for license activation tracking | First visit |
| `seedstudio_seed` | Last-used numeric seed value | Restores your last session state | After each generation |
| `seedstudio_layout` | Last-selected layout engine name | Restores your last session state | After each layout change |
| `seedstudio_palette` | Last-selected color palette name | Restores your last session state | After each palette change |
| `seedstudio_params` | Last-used parameter values (density, scale, rotation, noise) | Restores your last session state | After each parameter change |
| `seedstudio_recent_seeds` | Array of recently used seed values | Enables seed history navigation | After each generation |

### 5.2 You Control This Data

This data is stored on your device, not on any Seed Studio server. You have complete control:

| Action | How To |
|---|---|
| **View the data** | Open DevTools (F12) → Application → Storage → Local Storage → seed.studio |
| **Modify the data** | Edit values directly in DevTools (advanced users only; may cause unexpected behavior) |
| **Delete specific items** | Right-click the key → Delete in DevTools |
| **Delete all Seed Studio data** | Clear browser data for seed.studio through browser settings, or use DevTools to remove all keys |
| **Prevent any storage** | Use your browser's private/incognito mode (data is cleared when the window closes) |

### 5.3 Impact of Clearing localStorage

If you clear your browser's localStorage for seed.studio:

- Your Pro license status is removed (you will revert to Free Tier until you re-enter your License Key)
- Your saved preferences, recent seeds, and parameter values are reset to defaults
- Your instance ID is regenerated on next visit
- All previously exported Generated Content is unaffected (it exists as files on your device)

### 5.4 localStorage vs. Cookies

localStorage is fundamentally different from cookies:

- localStorage data is **never automatically transmitted to any server** with HTTP requests (unlike cookies)
- localStorage has significantly higher storage capacity than cookies (typically 5–10 MB vs. 4 KB)
- localStorage data can only be accessed by JavaScript running on the same origin that stored it
- localStorage does not expire unless you clear it or the application removes it

---

## 6. Cookies Policy

### 6.1 Seed Studio Does Not Use Cookies

**The seed.studio domain does not set, read, or use any cookies.** This includes:

- **No session cookies**: We do not track your session.
- **No persistent cookies**: We do not store preferences in cookies.
- **No authentication cookies**: We have no login system.
- **No analytics cookies**: We do not analyze your behavior.
- **No advertising cookies**: We do not serve ads or build ad profiles.
- **No social media cookies**: We have no social media integrations that set cookies.
- **No first-party cookies of any kind**: The seed.studio origin's cookie jar is intentionally empty.
- **No web beacons, tracking pixels, or clear GIFs**: We do not use any invisible tracking technology.

This is not an oversight or a technical limitation — it is a deliberate design choice reflecting our commitment to privacy.

### 6.2 Third-Party Cookies

While Seed Studio sets no cookies, essential third-party services that are part of the Service's operational infrastructure may set cookies under their own domains:

#### 6.2.1 LemonSqueezy Cookies

When you initiate a Pro Tier purchase, you are redirected to LemonSqueezy's checkout page (hosted on `*.lemonsqueezy.com`). LemonSqueezy may set cookies on their domain that are **strictly necessary** for the checkout process, such as:

- Session cookies to maintain your cart and checkout state
- Security cookies to prevent cross-site request forgery (CSRF)
- Preference cookies to remember your currency/language selection (if applicable)

These cookies are set by LemonSqueezy, governed by LemonSqueezy's [Privacy Policy](https://www.lemonsqueezy.com/privacy) and [Cookie Policy](https://www.lemonsqueezy.com/cookie-policy), and are restricted to the `lemonsqueezy.com` domain. They are not accessible to seed.studio. You are only exposed to these cookies if you choose to visit the checkout page.

If you do not make a purchase, you never encounter LemonSqueezy's checkout and therefore never receive LemonSqueezy cookies through your interaction with Seed Studio.

#### 6.2.2 Cloudflare Cookies

Cloudflare, which hosts and protects the Service through its CDN and DDoS mitigation services, may set the following cookies:

| Cookie Name | Purpose | Duration | Category |
|---|---|---|---|
| `__cf_bm` | Bot management — distinguishes between human users and automated bots to protect the site from DDoS attacks and malicious traffic | 30 minutes (after last interaction) | Strictly necessary / Security |
| `__cfruid` | Rate limiting — used when the site is under a rate-limiting rule | Session only | Strictly necessary / Security |
| `cf_clearance` | Challenge passage — stores proof that a challenge (e.g., CAPTCHA) has been passed | Per the challenge solution duration | Strictly necessary / Security |

These cookies are set by Cloudflare (domain: `.cloudflare.com` or the seed.studio domain via Cloudflare), **not** by Seed Studio's application code. They do not track you across websites, are not used for advertising or profiling, and do not collect personal data for marketing purposes. They are deployed at the infrastructure level to ensure the security and availability of the Service for all users.

These cookies fall within the "strictly necessary" exemption of the ePrivacy Directive (Article 5(3)) and GDPR consent requirements, as they are essential for network security and service operation. Cloudflare's cookie practices are governed by Cloudflare's [Privacy Policy](https://www.cloudflare.com/privacypolicy/) and [Cookie Policy](https://www.cloudflare.com/cookie-policy/).

### 6.3 No Cookie Consent Banner

Because Seed Studio itself deploys zero cookies and the only cookies involved are strictly necessary third-party cookies for security (Cloudflare) and checkout functionality (LemonSqueezy), we do not display a cookie consent banner on the Service. Under the ePrivacy Directive and GDPR, consent is not required for cookies that are strictly necessary for the provision of a service explicitly requested by the user.

If you wish to block all cookies, including strictly necessary ones, you may configure your browser to reject cookies. However, this may impact the checkout process (LemonSqueezy) and Cloudflare's security challenge responses, potentially affecting your ability to complete a purchase or access the Service during security events.

### 6.4 Managing Cookies Through Your Browser

You can control and delete cookies through your browser settings. Instructions for common browsers:

- [Google Chrome](https://support.google.com/chrome/answer/95647)
- [Mozilla Firefox](https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer)
- [Apple Safari](https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac)
- [Microsoft Edge](https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09)

---

## 7. Third-Party Services

### 7.1 LemonSqueezy — Payment Processing

**Role**: Merchant of Record and payment processor

**What they do**: LemonSqueezy handles all aspects of Pro Tier purchases, including payment collection, subscription management, tax calculation, tax collection, tax remittance, receipt generation, and refund processing.

**Data processed**: Credit/debit card details, PayPal account information, email address, name, billing address, purchase history, license keys.

**Data shared with us**: We access, through the LemonSqueezy merchant dashboard, your email address, name (as provided), License Key, order ID, product/plan purchased, and license status. We do not export or download this data to any system outside of LemonSqueezy.

**Legal documentation**:
- LemonSqueezy Terms of Service: [lemonsqueezy.com/terms](https://www.lemonsqueezy.com/terms)
- LemonSqueezy Privacy Policy: [lemonsqueezy.com/privacy](https://www.lemonsqueezy.com/privacy)
- LemonSqueezy Data Processing Agreement: Available upon request from LemonSqueezy
- LemonSqueezy is PCI DSS Level 1 compliant

**Data transfer safeguards**: LemonSqueezy participates in the EU-U.S. Data Privacy Framework (DPF) and relies on Standard Contractual Clauses (SCCs) for international data transfers, as documented in their Data Processing Agreement.

### 7.2 Cloudflare — Hosting and Security

**Role**: Content delivery network (CDN), DDoS mitigation, and web hosting platform

**What they do**: Cloudflare hosts the seed.studio static website through Cloudflare Pages, serves web assets through its global CDN, and protects the Service from malicious traffic, DDoS attacks, and other security threats.

**Data processed transiently**: IP addresses, user agent strings, requested URLs, HTTP headers, and other network traffic metadata. This data is processed in real-time to deliver web content and identify/block malicious requests.

**What Cloudflare logs and for how long**:
- By default, Cloudflare Pages access logs are available for up to 24 hours for the Free plan.
- We do not configure extended logging, log exports, or log analysis.
- We do not access, download, review, or analyze Cloudflare access logs.
- Logs are retained temporarily by Cloudflare and are automatically purged after the retention window closes.

**Legal documentation**:
- Cloudflare Privacy Policy: [cloudflare.com/privacypolicy](https://www.cloudflare.com/privacypolicy/)
- Cloudflare Data Processing Addendum: [cloudflare.com/cloudflare-customer-dpa](https://www.cloudflare.com/cloudflare-customer-dpa/)
- Cloudflare Cookie Policy: [cloudflare.com/cookie-policy](https://www.cloudflare.com/cookie-policy/)

**Data transfer safeguards**: Cloudflare participates in the EU-U.S. Data Privacy Framework (DPF) and maintains Binding Corporate Rules (BCRs) for data transfers, as documented in their Data Processing Addendum.

### 7.3 p5.js — Rendering Library

**Role**: Client-side creative coding library

Seed Studio uses p5.js for canvas-based graphic rendering. p5.js is loaded either from your local file system (when running locally) or from the [unpkg.com](https://unpkg.com) CDN as a fallback. p5.js runs entirely in your browser. No data is transmitted to the Processing Foundation, the p5.js maintainers, or the unpkg CDN as a result of your use of Seed Studio's generative features. The unpkg CDN may log the request for the p5.js library file itself, as is standard for any CDN resource request.

### 7.4 No Other Third-Party Services

To be clear, the Service does **not** integrate with or use:

- Analytics services (Google Analytics, Mixpanel, Plausible, Fathom, etc.)
- Advertising networks or ad exchanges
- Social media platforms or social sharing widgets
- Customer relationship management (CRM) systems
- Email marketing or newsletter services
- Push notification services
- Affiliate marketing networks
- User testing or session recording tools
- Error tracking or crash reporting services (e.g., Sentry, Bugsnag)
- Feature flag or A/B testing platforms
- Data brokers, data enrichment services, or identity resolution platforms
- Artificial intelligence or machine learning APIs
- Cloud storage or file hosting services for user content
- Any other service that processes user data

---

## 8. Data Sharing and Disclosure

### 8.1 We Do NOT Sell Your Data

**We do not sell, rent, trade, license, or share your personal information with third parties for their marketing, advertising, or commercial purposes.** This statement applies to all users, including those accessing the Free Tier. We have never sold personal information and we never will. We do not share personal information for cross-context behavioral advertising.

### 8.2 Service Providers

We share the minimal necessary data with service providers solely to enable them to perform their functions on our behalf. All service providers are contractually bound to process data only as instructed by us and in compliance with this Privacy Policy and applicable data protection laws.

| Service Provider | Data Category | Purpose | Location of Processing |
|---|---|---|---|
| LemonSqueezy (Lemon Squeezy, LLC) | Payment and purchase data | Payment processing, subscription management, tax handling | United States (global infrastructure) |
| Cloudflare, Inc. | Network traffic metadata (transient) | Website hosting, CDN delivery, DDoS protection, DNS resolution | Global edge network |

### 8.3 Legal Disclosures

We may disclose information if we have a good-faith belief that such disclosure is necessary to:

1. **Comply with applicable law, regulation, or legal process**: Including responding to a valid subpoena, court order, search warrant, or similar governmental demand. We will notify you of such disclosure if permitted by law and reasonably possible.
2. **Protect rights and safety**: Protect and defend the rights, property, or safety of Seed Studio, our users, or the public, including to detect, prevent, or address fraud, security, or technical issues.
3. **Enforce our Terms**: Investigate potential violations of our Terms of Service and enforce our legal rights.
4. **Prevent harm**: Act in urgent circumstances to protect the personal safety of users or the public.

### 8.4 Business Transfers

If Seed Studio is involved in a merger, acquisition, reorganization, sale of assets, bankruptcy, or similar corporate event, your information (limited to purchase data accessible through LemonSqueezy) may be transferred as part of that transaction. We will provide notice before your information is transferred and becomes subject to a different privacy policy.

### 8.5 Aggregated, De-Identified Data

We may share aggregated, anonymized, or de-identified data that cannot reasonably be used to identify you with third parties for business purposes (e.g., total user counts, plan distribution, revenue metrics).

### 8.6 With Your Consent

We may share your information for purposes not described in this Privacy Policy if you provide your explicit consent.

---

## 9. Data Retention

Seed Studio's data retention is minimal by design. Here is how long different categories of data are retained:

| Data Category | Retention Period | Location | Deletion Method |
|---|---|---|---|
| **localStorage data** (license, settings, seeds) | Until you clear it | Your browser | Clear browser data for seed.studio |
| **License verification requests** | Ephemeral (execution only) | Cloudflare Workers runtime | Auto-purged after execution |
| **Cloudflare access logs** | Up to 24 hours (Free plan default) | Cloudflare infrastructure | Auto-purged per Cloudflare retention policy |
| **LemonSqueezy purchase records** | Per LemonSqueezy's data retention policy | LemonSqueezy servers | Contact LemonSqueezy or us for deletion |
| **Support emails** | Duration of the support matter + reasonable archival period for reference | Email system (Gmail/Google Workspace or equivalent) | Deleted upon request or when no longer needed |
| **License validation status** | As long as the license is active, plus a reasonable post-expiry period | LemonSqueezy database | Auto-expires per LemonSqueezy's schedule |

### 9.1 Data Minimization in Practice

Because we store essentially no user data on our own infrastructure, there is very little for us to retain or delete. The data we do access (purchase information through LemonSqueezy) is retained by our payment processor in accordance with their policies and applicable financial regulations (which may require retention of transaction records for tax and accounting purposes).

### 9.2 Requesting Deletion

To request deletion of personal data associated with your Pro purchase, contact us at **privacy@seed.studio**. We will:

1. Identify your purchase records in the LemonSqueezy system
2. Request or facilitate deletion in accordance with LemonSqueezy's data handling procedures
3. Confirm completion within 30 days (subject to legal retention obligations)

Note: Deleting purchase-related data from LemonSqueezy may deactivate your Pro license. We will inform you before proceeding.

---

## 10. Data Security

### 10.1 Our Security Measures

We implement appropriate technical and organizational security measures to protect the limited data we access and process:

**Website security:**
- HTTPS exclusively (HTTP Strict Transport Security / HSTS enforced)
- Content Security Policy (CSP) headers to prevent XSS attacks
- X-Frame-Options: DENY to prevent clickjacking
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy headers to limit browser feature access
- Subresource Integrity (SRI) hashes for external scripts where applicable

**Infrastructure security:**
- No backend server or database to breach (the Service is a static website with no server-side code beyond the license verification Worker)
- License verification API runs as a Cloudflare Worker with the LemonSqueezy API key stored as an encrypted environment variable
- Worker endpoint is CORS-restricted to seed.studio and its subdomains
- No user data stored on any Seed Studio-managed server, database, or file system

**Payment security:**
- All payment processing handled by LemonSqueezy, which is PCI DSS Level 1 certified
- Seed Studio never handles, stores, or transmits credit card data

### 10.2 The Security Advantage of No Data

Our strongest security measure is architectural: we do not collect or store user data in the first place. There is no central repository of user accounts, passwords, payment details, or generated content to breach. This dramatically reduces the potential attack surface and limits what could be exposed in the event of any security incident.

### 10.3 Your Role in Security

You share responsibility for the security of data stored in your browser:
- Keep your browser updated to the latest version.
- Be cautious about browser extensions that may access localStorage data.
- Clear your browser data before using the Service on shared or public computers.
- Safeguard your License Key and LemonSqueezy order confirmation.

### 10.4 Security Breach Notification

In the unlikely event of a security breach affecting personal data, we will notify affected users and relevant authorities in accordance with applicable data protection laws (including GDPR Articles 33 and 34, where applicable). Given our minimal data collection, the scope of such notification would be inherently limited.

---

## 11. International Data Transfers

### 11.1 Where We Operate

Seed Studio is operated from the United States. The Service is hosted on Cloudflare's global infrastructure. Our payment processor (LemonSqueezy) is based in the United States with global infrastructure.

### 11.2 Data Transfer Mechanisms

If you access the Service from outside the United States, the limited personal data described in Section 3 may be transferred to, stored, or processed in the United States or other countries where our service providers operate. These jurisdictions may have data protection laws that differ from those in your country of residence.

We rely on the following transfer mechanisms to ensure adequate protection of personal data transferred internationally:

| Service Provider | Transfer Safeguards |
|---|---|
| LemonSqueezy | EU-U.S. Data Privacy Framework (DPF); UK Extension to the DPF; Swiss-U.S. DPF; Standard Contractual Clauses (SCCs); Binding Corporate Rules |
| Cloudflare | EU-U.S. Data Privacy Framework (DPF); UK Extension to the DPF; Swiss-U.S. DPF; Binding Corporate Rules; Standard Contractual Clauses (SCCs) |

### 11.3 Users in the EEA, UK, and Switzerland

By using the Service, you understand that the limited personal data accessible to us (as described in Section 3) may be transferred to and processed in the United States. The transfer is conducted in compliance with GDPR Chapter V requirements through the Data Privacy Framework certifications and Standard Contractual Clauses of our service providers.

### 11.4 Users in China (PIPL)

Under the Personal Information Protection Law of the People's Republic of China (PIPL), cross-border transfer of personal information requires compliance with specific conditions. Given that Seed Studio collects essentially no personal information (only purchase-related data through LemonSqueezy), the scope of cross-border transfer is minimal. For any personal information that is transferred:
- We rely on our service providers' compliance mechanisms.
- You may exercise your PIPL rights as described in Section 12.3.
- For PIPL-specific inquiries, contact **privacy@seed.studio**.

---

## 12. Your Rights and Choices

### 12.1 GDPR Rights (EEA, UK, Switzerland Users)

If you are located in the European Economic Area (EEA), the United Kingdom, or Switzerland, you have the following rights under the General Data Protection Regulation (GDPR) and its UK/Swiss equivalents:

| Right | Description | How to Exercise |
|---|---|---|
| **Right of Access** (Art. 15) | Obtain confirmation of whether we process your personal data and receive a copy of that data | Email privacy@seed.studio |
| **Right to Rectification** (Art. 16) | Correct inaccurate or incomplete personal data | Email privacy@seed.studio |
| **Right to Erasure** (Art. 17) | Request deletion of your personal data ("right to be forgotten") | Email privacy@seed.studio; clear browser localStorage |
| **Right to Restriction** (Art. 18) | Request restriction of processing of your personal data | Email privacy@seed.studio |
| **Right to Data Portability** (Art. 20) | Receive your personal data in a structured, commonly used, machine-readable format | Email privacy@seed.studio |
| **Right to Object** (Art. 21) | Object to processing based on legitimate interests or for direct marketing | Email privacy@seed.studio (note: we do not engage in direct marketing) |
| **Right to Withdraw Consent** (Art. 7(3)) | Withdraw consent where processing is based on consent | Email privacy@seed.studio |
| **Rights re: Automated Decision-Making** (Art. 22) | Not be subject to decisions based solely on automated processing that produce legal effects | N/A — we do not engage in such processing |

**How to exercise your rights:**
- Email **privacy@seed.studio** with your specific request.
- Include sufficient information to identify you (the email address associated with your purchase, if applicable).
- We will respond within thirty (30) calendar days. This period may be extended by up to two months for complex or numerous requests, in which case we will notify you of the extension within the initial 30-day period.
- We may need to verify your identity before processing your request. Given our minimal data collection, verification may involve confirming your access to the email address associated with any purchase.

**No fee usually required:** Exercising your rights is free of charge. However, we may charge a reasonable fee if your request is manifestly unfounded, excessive, or repetitive. Alternatively, we may refuse to comply with such requests.

**Practical note:** Because most data associated with your use of Seed Studio resides in your browser's localStorage, you can exercise several of these rights directly without our involvement:
- **Access**: View stored data via DevTools (F12 → Application → Local Storage → seed.studio)
- **Erasure**: Clear browser data for seed.studio
- **Portability**: Export localStorage data using browser DevTools

### 12.2 CCPA/CPRA Rights (California Users)

If you are a California resident, the California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA), grants you the following rights:

| Right | Description |
|---|---|
| **Right to Know** | Request disclosure of: (a) categories and specific pieces of personal information we have collected about you; (b) categories of sources from which personal information is collected; (c) business or commercial purpose for collecting, selling, or sharing personal information; (d) categories of third parties with whom we share personal information |
| **Right to Delete** | Request deletion of personal information we have collected from you, subject to certain exceptions |
| **Right to Correct** | Request correction of inaccurate personal information we maintain about you |
| **Right to Opt-Out** | Opt out of the sale or sharing of personal information for cross-context behavioral advertising (note: we do not sell or share personal information) |
| **Right to Limit Use and Disclosure of Sensitive Personal Information** | Limit use and disclosure of sensitive personal information (note: we do not collect sensitive personal information) |
| **Right to Non-Discrimination** | Not receive discriminatory treatment for exercising your CCPA/CPRA rights |

**California "Shine the Light" Law:** Under California Civil Code Section 1798.83, California residents may request information regarding our disclosure of personal information to third parties for their direct marketing purposes. We do not disclose personal information to third parties for their direct marketing purposes.

**How to exercise your CCPA/CPRA rights:**
- Email **privacy@seed.studio** with the subject line "CCPA Request."
- Include sufficient information to verify your identity.
- We will respond within forty-five (45) calendar days (subject to a 45-day extension if reasonably necessary, with notice provided).
- Authorized agents may submit requests on your behalf with proof of authorization.

### 12.3 PIPL Rights (China Users)

If you are located in the People's Republic of China, you have the following rights under the Personal Information Protection Law (PIPL):

| Right | Description |
|---|---|
| Right to know and decide | Know about and make decisions regarding the processing of your personal information (Art. 44) |
| Right to access and copy | Access and obtain a copy of your personal information (Art. 45) |
| Right to correction and deletion | Request correction or deletion of your personal information (Arts. 46, 47) |
| Right to explanation | Request explanation of our personal information processing rules (Art. 48) |
| Right to withdraw consent | Withdraw consent previously given for processing (Art. 15) |
| Right to data portability | Transfer your personal information to another processor where conditions are met (Art. 45) |
| Right to decedent data | Near relatives may exercise rights over a deceased person's data (Art. 49) |

To exercise your PIPL rights, contact **privacy@seed.studio**. We will respond within the legally required timeframe.

### 12.4 Other Jurisdictions

If your jurisdiction provides rights not specifically described above, please contact us at **privacy@seed.studio**. We are committed to respecting the privacy rights of all users to the extent applicable, and will make reasonable efforts to accommodate requests consistent with applicable law.

### 12.5 Complaints to Supervisory Authorities

If you believe our processing of your personal data violates applicable data protection law, you have the right to lodge a complaint with the relevant supervisory authority:

- **EEA**: Your local Data Protection Authority ([list here](https://edpb.europa.eu/about-edpb/about-edpb/members_en))
- **UK**: Information Commissioner's Office ([ico.org.uk](https://ico.org.uk))
- **Switzerland**: Federal Data Protection and Information Commissioner ([edoeb.admin.ch](https://www.edoeb.admin.ch))
- **California**: California Privacy Protection Agency ([cppa.ca.gov](https://cppa.ca.gov))
- **China**: Cyberspace Administration of China ([cac.gov.cn](https://www.cac.gov.cn))

We encourage you to contact us first so that we may attempt to resolve your concerns directly before escalating to a supervisory authority.

---

## 13. Children's Privacy

### 13.1 Age Limitation

Seed Studio is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. The Service is a creative tool suitable for all ages, but its payment features (Pro Tier purchases) are only available to individuals with the legal capacity to enter into binding contracts.

### 13.2 Parental Controls

If you are a parent or legal guardian and you believe your child under the age of 13 has provided us with personal information (e.g., by making a purchase), please contact us immediately at **privacy@seed.studio**. We will take prompt steps to:

1. Identify and remove any such information from our records
2. Refund any unauthorized purchases
3. Terminate any associated Pro license

### 13.3 Educational Use

Educators and institutions using Seed Studio as part of educational activities are responsible for obtaining appropriate parental consent where required by applicable law (including, in the U.S., the Children's Online Privacy Protection Act / COPPA, and the Family Educational Rights and Privacy Act / FERPA).

---

## 14. Do Not Track Signals

### 14.1 Our Response to DNT

"Do Not Track" (DNT) is a web browser setting that requests that a web application disable its tracking of an individual user. The Service responds to DNT signals in a straightforward manner: **because we do not track users at all**, enabling DNT has no practical effect — you are not tracked whether DNT is on or off.

### 14.2 Global Privacy Control (GPC)

The Global Privacy Control (GPC) is a browser setting that signals a user's preference to opt out of the sale or sharing of personal information. Seed Studio honors GPC signals to the extent applicable. Since we do not sell personal information or share it for cross-context behavioral advertising, GPC has no practical effect — you are already opted out by default.

---

## 15. Changes to This Privacy Policy

### 15.1 Updates and Modifications

We may update this Privacy Policy from time to time to reflect changes in our practices, the Service's functionality, or applicable law. When we update this Privacy Policy, we will:

1. Update the "Last Updated" date at the top of this page.
2. For material changes, we will provide additional notice:
   - A prominent notice on the seed.studio website (displayed for a minimum of 30 calendar days)
   - An in-application notice (where technically feasible)
   - For Pro Users, email notification to the email address associated with their LemonSqueezy purchase

### 15.2 What Constitutes a Material Change

Material changes include, but are not limited to:
- Changes to what personal data we collect
- Changes to how we use or share personal data
- Changes to the third-party services we engage
- Changes that affect your rights or choices regarding your data
- Changes in our data retention practices

Changes that are editorial, clarifying, or formatting in nature (and do not affect the substance of our privacy practices) may be made without specific notice.

### 15.3 Acceptance of Changes

Your continued use of the Service after the effective date of any changes constitutes your acceptance of the updated Privacy Policy. If you do not agree with the revised policy, you must discontinue use of the Service and, for Pro Users, cancel your subscription.

### 15.4 Archived Versions

We maintain an archive of previous versions of this Privacy Policy. To request a copy of a prior version, contact **privacy@seed.studio**.

---

## 16. Contact Us

### 16.1 Contact Information

For questions, concerns, requests, or complaints regarding this Privacy Policy or our data practices:

| Purpose | Contact |
|---|---|
| Privacy and data protection inquiries | **privacy@seed.studio** |
| Exercise of data subject rights (GDPR, CCPA, PIPL, etc.) | **privacy@seed.studio** |
| Data deletion requests | **privacy@seed.studio** |
| General support | **support@seed.studio** |
| Legal matters | **legal@seed.studio** |
| Website | [seed.studio](https://seed.studio) |

### 16.2 Response Times

- **General privacy inquiries**: We aim to respond within 3–5 business days.
- **Data subject rights requests**: We will respond within the legally required timeframe (30 calendar days under GDPR, extendable to 90 days for complex requests; 45 calendar days under CCPA/CPRA, extendable to 90 days).
- **Urgent matters**: Mark your email subject with "URGENT" and we will prioritize accordingly.

### 16.3 Data Protection Officer / Representative

Given the limited nature of our personal data processing activities, we are not legally required to designate a formal Data Protection Officer under GDPR Article 37. We do not yet have an appointed representative in the EU/EEA or UK for GDPR purposes (Article 27). Contact us at **privacy@seed.studio** for details on representative arrangements, which are in progress.

### 16.4 Verifying Your Identity

When you contact us to exercise your data rights, we may need to verify your identity to prevent unauthorized access to personal data. Verification may involve:
- Confirming your access to the email address associated with any Pro purchase
- Providing your License Key or Order ID (if applicable)
- Additional verification if the request involves sensitive or high-risk data (which, given our minimal data collection, is unlikely)

We will not process requests where we cannot reasonably verify your identity and authority over the data in question.

---

## Summary

| Question | Answer |
|---|---|
| Do you create user accounts? | **No.** No sign-up, login, or user database exists. |
| Do you store my generated images? | **No.** All generation happens in your browser. Images never leave your device. |
| Do you use cookies? | **No.** Seed Studio sets zero cookies. (LemonSqueezy and Cloudflare may set strictly necessary cookies; see Section 6.) |
| Do you use analytics? | **No.** No Google Analytics, no tracking scripts, no analytics of any kind. |
| Do you serve ads? | **No.** No advertising, no ad networks, no behavioral targeting. |
| Do you sell my data? | **No.** We have never sold personal data and never will. |
| What data do you have? | Purchase-related data accessible through LemonSqueezy (email, name, license key, order ID, plan) when you buy a Pro license. That's it. |
| How do I delete my data? | Clear your browser's localStorage for seed.studio. For purchase data, email privacy@seed.studio. |
| Is my payment data safe? | Yes. Payments are handled by LemonSqueezy (PCI DSS Level 1). We never see your card number. |

---

*This Privacy Policy was drafted specifically for Seed Studio's privacy-first architecture: a static web application with no user accounts, no databases, no analytics, no advertising, and no server-side storage of personal data. The privacy policy accurately reflects the actual privacy practice — minimal data collection, maximum user control, and radical transparency.*
