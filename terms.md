# Terms of Service — Seed Studio

**Last Updated**: June 8, 2026
**Effective Date**: June 8, 2026

These Terms of Service ("Terms") constitute a legally binding agreement between you ("you," "your," or "User") and Seed Studio ("Seed Studio," "we," "us," or "our") governing your access to and use of the Seed Studio website, application, and services (collectively, the "Service"). The Service is a browser-based generative poster art tool that creates algorithmic artwork using deterministic random number generation and procedural layout engines.

By accessing or using the Service, you confirm that you have read, understood, and agree to be bound by these Terms in their entirety. If you do not agree to these Terms, you must not access or use the Service.

---

## Table of Contents

1. [Definitions](#1-definitions)
2. [Eligibility](#2-eligibility)
3. [Description of the Service](#3-description-of-the-service)
4. [Free Tier and Pro Tier](#4-free-tier-and-pro-tier)
5. [Payments, Subscriptions, and Billing](#5-payments-subscriptions-and-billing)
6. [Refund Policy](#6-refund-policy)
7. [Intellectual Property Rights](#7-intellectual-property-rights)
8. [Generated Content Ownership and Licensing](#8-generated-content-ownership-and-licensing)
9. [Acceptable Use Policy](#9-acceptable-use-policy)
10. [Third-Party Services](#10-third-party-services)
11. [Disclaimer of Warranties](#11-disclaimer-of-warranties)
12. [Limitation of Liability](#12-limitation-of-liability)
13. [Indemnification](#13-indemnification)
14. [Termination](#14-termination)
15. [GDPR and Data Protection](#15-gdpr-and-data-protection)
16. [Cookie Policy](#16-cookie-policy)
17. [Governing Law and Dispute Resolution](#17-governing-law-and-dispute-resolution)
18. [Changes to These Terms](#18-changes-to-these-terms)
19. [General Provisions](#19-general-provisions)
20. [Contact Information](#20-contact-information)

---

## 1. Definitions

For the purposes of these Terms, the following definitions apply:

- **"Service"** means the Seed Studio website (seed.studio), the generative poster art application, all related subdomains, the license verification API, and any associated features, tools, or content made available by Seed Studio.
- **"User," "you," or "your"** means any individual or entity that accesses or uses the Service.
- **"Generated Content"** means any image, artwork, graphic, design, or visual output produced by the Service's procedural generation algorithms, including but not limited to poster art exported from the Service.
- **"Seed"** means a numeric or alphanumeric value used as input to the Service's deterministic random number generator to produce a specific Generated Content output.
- **"Free Tier"** means the unpaid, limited-access version of the Service as described in Section 4.1.
- **"Pro Tier"** means the paid-access version of the Service with enhanced features as described in Section 4.2, available via monthly subscription, annual subscription, or one-time lifetime purchase.
- **"Pro User"** means a User who has purchased and maintains an active Pro Tier license.
- **"Free User"** means a User accessing the Service via the Free Tier.
- **"License Key"** means the unique alphanumeric identifier issued to a Pro User upon purchase, used to verify Pro Tier access.
- **"LemonSqueezy"** means Lemon Squeezy, LLC, the third-party Merchant of Record and payment processor used by Seed Studio to handle all purchases, subscriptions, billing, and payment-related transactions.
- **"localStorage"** means the browser-based client-side storage mechanism used by the Service to persist user preferences, license information, and session state locally on the User's device.
- **"Merchant of Record"** means the legal entity responsible for processing payments, collecting applicable taxes, managing refunds, and handling payment disputes.

---

## 2. Eligibility

### 2.1 Minimum Age

You must be at least 13 years of age to use the Service. If you are between 13 and 18 years of age (or the age of legal majority in your jurisdiction, whichever is older), you represent and warrant that you have obtained the consent of your parent or legal guardian to use the Service, and that your parent or legal guardian has read and agreed to these Terms on your behalf.

### 2.2 Legal Capacity

By using the Service, you represent and warrant that you have the full legal capacity to enter into a binding contract under the laws of your jurisdiction. Access to the Service is void where prohibited by applicable law.

### 2.3 Entity Use

If you are using the Service on behalf of a company, organization, or other legal entity, you represent and warrant that you have the authority to bind that entity to these Terms. In such case, "you" and "your" shall refer to both you individually and the entity you represent.

### 2.4 Prohibited Jurisdictions

The Service is not intended for use in jurisdictions where its operation or your use would violate any applicable law, regulation, or sanction. You are solely responsible for ensuring that your use of the Service complies with all local laws and regulations.

---

## 3. Description of the Service

### 3.1 What Seed Studio Is

Seed Studio is a browser-based generative poster art application. The Service uses deterministic pseudo-random number generation and procedural layout algorithms to create visual artwork. Users configure parameters including speed/seed values, layout engine selection, color palettes, shape types, density, scale, rotation, and noise to generate unique poster designs. Generated Content is rendered client-side using p5.js and the HTML5 Canvas API. No images are uploaded to any server during generation; all rendering occurs locally in the User's web browser.

### 3.2 What Seed Studio Is Not

Seed Studio is not an artificial intelligence (AI), machine learning (ML), or large language model (LLM) based tool. The Service does not use neural networks, diffusion models, generative adversarial networks (GANs), or training datasets of third-party artwork. All Generated Content is produced exclusively through deterministic mathematical algorithms operating on numeric seed inputs and user-configured parameters. This distinction is material to the intellectual property provisions in Section 8.

### 3.3 Technical Requirements

Use of the Service requires a modern web browser with HTML5 Canvas and JavaScript support. Recommended browsers include the latest two major versions of Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge. The Service is provided as a static web application; no software installation is required. Performance and rendering fidelity may vary based on your device's CPU, GPU, and available memory.

### 3.4 No Warranty of Output Consistency

While seed values are designed to produce deterministic outputs, we do not guarantee that the same seed value and parameter configuration will produce identical Generated Content across different browser versions, p5.js library versions, operating systems, or hardware configurations. The Service is a creative tool, not a precision instrument.

---

## 4. Free Tier and Pro Tier

### 4.1 Free Tier

The Free Tier provides access to the Service at no monetary cost, subject to the following limitations:

| Feature | Free Tier Limitation |
|---|---|
| Layout engines | All 5 engines available |
| Color palettes | All 8 palettes available |
| Shape types | All 5 shape types available |
| Adjustable parameters | All parameters (speed/seed, density, scale, rotation, noise) |
| PNG export resolution | Maximum 1200 pixels on longest edge |
| Watermark | Mandatory "Seed Studio" watermark on all exports |
| Commercial use | Not permitted |
| Support | Community / documentation only |

Free Tier access is provided on an "as-is" and "as-available" basis. We reserve the right to modify, suspend, or discontinue the Free Tier (in whole or in part) at any time without prior notice or liability.

### 4.2 Pro Tier

The Pro Tier provides enhanced access to the Service upon purchase of a valid license. Pro Tier features include:

| Feature | Pro Tier Access |
|---|---|
| Layout engines | All 5 engines available |
| PNG export resolution | Up to 4K (3840x2160 pixels) |
| Watermark | Removed from all exports |
| Commercial use license | Full worldwide commercial license |
| License verification | Cloudflare Worker API |
| Priority support | Email support with 2-business-day response target |
| API access | License key-based API endpoint for programmatic generation |

### 4.3 License Verification

Pro Tier status is verified client-side by sending your License Key to the license verification API endpoint. The verification process:

1. Your browser sends the License Key to `license.seed.studio`
2. The endpoint forwards the License Key to LemonSqueezy's license validation API
3. On successful validation, your Pro status is confirmed and stored in localStorage
4. Pro status persists across browser sessions until the license expires, is revoked, or localStorage is cleared

You are responsible for maintaining a record of your License Key and LemonSqueezy order confirmation. If you clear your browser data, switch devices, or otherwise lose your locally stored Pro status, you may re-activate your license by re-entering your License Key, subject to activation limits.

### 4.4 License Activation Limits

To prevent abuse, License Keys are subject to reasonable activation frequency limits. If you encounter activation issues due to legitimate multi-device or reinstallation scenarios, contact support for assistance.

---

## 5. Payments, Subscriptions, and Billing

### 5.1 Pricing

All prices are listed in United States Dollars (USD). Unless otherwise stated, all prices are exclusive of any applicable value-added tax (VAT), goods and services tax (GST), sales tax, or similar taxes, which shall be calculated and collected by LemonSqueezy at checkout based on your billing location.

**Current pricing** (subject to change per Section 5.2):

| Plan | Price | Billing Cycle |
|---|---|---|
| Pro Monthly | $14.99 | Recurring monthly |
| Pro Yearly | $119.99 | Recurring annually |
| Pro Lifetime | $99.00 | One-time payment |

### 5.2 Price Changes

We reserve the right to change pricing at any time. Pricing changes shall take effect as follows:

- **New Users**: Pricing displayed at checkout at the time of purchase applies.
- **Existing Monthly/Yearly Subscribers**: We will notify you of any price increase at least 30 days before your next renewal date. Your continued subscription after the notice period constitutes acceptance of the new price.
- **Lifetime Purchases**: Lifetime license pricing applies only at the time of original purchase and is not subject to future changes for that license.

### 5.3 Payment Processing

All payments are processed by **LemonSqueezy** (Lemon Squeezy, LLC), which acts as the Merchant of Record for all transactions.

**What this means for you:**

- LemonSqueezy handles all payment collection, tax calculation, tax remittance, and payment-related compliance.
- Your payment method is charged by LemonSqueezy, not by Seed Studio directly.
- Your payment relationship is governed by LemonSqueezy's Terms of Service ([lemonsqueezy.com/terms](https://www.lemonsqueezy.com/terms)) and Privacy Policy ([lemonsqueezy.com/privacy](https://www.lemonsqueezy.com/privacy)).
- Seed Studio does not receive, store, process, or have access to your full credit card number, CVV, bank account details, or complete payment instrument information.
- Information we receive from LemonSqueezy is limited to: email address, name (as provided), License Key, order ID, product/plan purchased, and license status (active/expired/refunded). This information is accessed exclusively through the LemonSqueezy merchant dashboard for customer support purposes.

### 5.4 Automatic Renewal

Monthly and annual Pro subscriptions renew automatically at the end of each billing period unless canceled. By purchasing a recurring subscription, you authorize us (through LemonSqueezy) to charge your payment method at each renewal interval until you cancel.

### 5.5 Cancellation

You may cancel your subscription at any time:

- **Self-service**: Use the cancellation link provided in your LemonSqueezy order confirmation and receipt emails.
- **Contact support**: Email support with your order details, and we will assist in processing the cancellation.

Upon cancellation:

- Your Pro Tier access remains active until the end of the current (already paid) billing period.
- No further charges will be made after cancellation takes effect.
- At the end of the billing period, your account reverts to Free Tier status with all associated limitations, including watermark restoration and resolution cap on future exports.
- Previously exported Generated Content under the Pro Tier retains its commercial license status (see Section 8).

Cancellation does not entitle you to a refund for the current billing period, except as provided in Section 6.

### 5.6 Failed Payments

If a recurring payment fails (e.g., due to expired card, insufficient funds), we may retry the charge. If payment remains unsuccessful, your Pro Tier access will be suspended until a valid payment method is provided and successfully charged. We will attempt to notify you via the email address associated with your LemonSqueezy purchase.

### 5.7 Chargebacks and Payment Disputes

If you initiate a chargeback or payment dispute with your bank or payment provider without first contacting us to resolve the issue:

- We reserve the right to immediately suspend or terminate your Pro Tier access.
- Your License Key may be permanently revoked.
- You may be banned from future purchases.
- You remain liable for any outstanding amounts owed.

We encourage you to contact us first if you have any payment concerns. Most issues can be resolved quickly and amicably without the need for formal disputes.

---

## 6. Refund Policy

### 6.1 7-Day Money-Back Guarantee

We offer a **7-day money-back guarantee** on all Pro Tier purchases. If you are not satisfied with the Service for any reason, you may request a full refund within 7 calendar days of your initial purchase date.

### 6.2 Refund Window by Plan Type

| Plan | Refund Window | Conditions |
|---|---|---|
| Pro Monthly | 7 days from initial purchase date | First-time purchase only; renewals not eligible unless renewal was not authorized |
| Pro Yearly | 7 days from initial purchase date | First-time purchase only; renewals not eligible unless renewal was not authorized |
| Pro Lifetime | 7 days from purchase date | Full refund available within window |

### 6.3 Renewal Refunds

Subscription renewals are generally non-refundable. Exceptions may be made at our reasonable discretion if:

- The renewal charge was unauthorized (you believed you had canceled).
- A technical error on our or LemonSqueezy's part caused an incorrect charge.

### 6.4 How to Request a Refund

To request a refund, contact us at **support@seed.studio** or use the self-service refund option in your LemonSqueezy order management portal (if available). Include:

- Your License Key or Order ID
- The email address used for purchase
- A brief reason for the refund request

### 6.5 Refund Processing

- Refunds are processed back to the original payment method.
- Processing time depends on your payment provider and typically takes 5–10 business days to appear in your account.
- Upon refund approval, your License Key is immediately deactivated and your access reverts to the Free Tier.
- Refunds are processed by LemonSqueezy as the Merchant of Record.

### 6.6 Abuse of Refund Policy

We reserve the right to deny refund requests if we detect abuse (e.g., serial refunds across multiple accounts, repeated purchase-and-refund patterns). We track refund activity to protect the integrity of the Service.

---

## 7. Intellectual Property Rights

### 7.1 Seed Studio IP

All right, title, and interest in and to the Service, including but not limited to:

- The Seed Studio source code (licensed under the MIT License; see our public repository)
- The user interface, design, layout, graphics, logos, and branding
- The procedural generation algorithms, layout engine implementations, and parameter processing logic
- All documentation, text, images, and other content provided on the seed.studio website (excluding Generated Content)
- The "Seed Studio" name, logo, domain name, and associated trademarks and trade dress

are and shall remain the exclusive property of Seed Studio and its licensors. Nothing in these Terms grants you any right, title, or interest in the above except for the limited right to use the Service as expressly set forth herein.

### 7.2 Trademarks

"Seed Studio," the Seed Studio logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Seed Studio or its affiliates. You may not use such marks without our prior written permission.

### 7.3 Feedback

If you provide us with any suggestions, ideas, bug reports, feature requests, or other feedback regarding the Service ("Feedback"), you grant us an irrevocable, perpetual, worldwide, royalty-free, fully sublicensable license to use, modify, incorporate, and exploit that Feedback in the Service or any other product or service without compensation, attribution, or restriction.

### 7.4 p5.js and Third-Party Libraries

The Service incorporates p5.js, which is licensed under the GNU Lesser General Public License v2.1 (LGPL-2.1). The p5.js library is loaded either from your local file system or from a CDN (unpkg.com) as a fallback. Use of p5.js within the Service does not impose any additional obligations on Generated Content under the LGPL-2.1 license; the procedural generation code that calls p5.js APIs is our original work, and Generated Content is data output, not a derivative work of p5.js itself.

---

## 8. Generated Content Ownership and Licensing

**This section is critical. Please read it carefully. It governs your rights to the images and artwork you create using Seed Studio.**

### 8.1 You Own Your Generated Content

All Generated Content produced by you through your use of the Service — the images, artworks, designs, and visual outputs — is owned **by you**. Seed Studio makes no claim of ownership over any Generated Content produced by any User, whether Free or Pro Tier.

This ownership position is grounded in the following facts:

1. The Service is a tool, not an author. The algorithms are deterministic mathematical functions; they produce output only in response to your creative inputs (seed selection, parameter configuration, layout choices).
2. The Service does not "create" content autonomously. Human authorship is provided by you through your selection, arrangement, and configuration of the generation parameters.
3. The Service does not use AI/ML models trained on third-party data that could create competing ownership claims or derivative work complications.

### 8.2 Free Tier License

If you generate content while using the Free Tier, you own the Generated Content, but your right to use it is limited to **personal, non-commercial purposes only**.

**Personal, non-commercial use includes:**

- Personal social media posts (non-monetized)
- Personal blog or portfolio display
- Personal desktop or mobile wallpaper
- Printing for personal use and display in your home
- Sharing with friends and family
- Use in personal, non-monetized creative projects

**Personal, non-commercial use EXCLUDES (this list is illustrative, not exhaustive):**

- Selling Generated Content as prints, digital downloads, merchandise, NFTs, or any other commercial product
- Incorporating Generated Content into products or services you sell or charge for
- Using Generated Content in client work, freelance projects, or commissioned designs
- Using Generated Content in commercial advertising, marketing materials, or promotional campaigns
- Using Generated Content in branding, logos, packaging, or corporate identity materials for any business
- Sub-licensing, reselling, or distributing Generated Content for any commercial purpose
- Using Generated Content in publications, broadcasts, or media for which you receive compensation
- Using Generated Content in any revenue-generating context, directly or indirectly

**Watermark requirement (Free Tier):** Free Tier exports include a "Seed Studio" watermark. You may not crop, edit, blur, stamp, or otherwise remove or obscure this watermark. Doing so constitutes a material breach of these Terms.

**Attribution:** While not required, attribution to Seed Studio is appreciated for Free Tier use (e.g., "Created with Seed Studio").

### 8.3 Pro Tier Commercial License

If you generate content while the Pro Tier is active on your account, you are granted a **worldwide, perpetual, irrevocable, royalty-free, non-exclusive, fully paid-up commercial license** to use the Generated Content for any purpose whatsoever, including but not limited to:

**Commercial use -- you may:**

- Sell Generated Content as prints, posters, canvases, or other physical merchandise
- Sell Generated Content as digital downloads, NFTs, stock assets, or digital products
- Incorporate Generated Content into commercial products (apparel, accessories, home goods, stationery, etc.)
- Use Generated Content in client deliverables, freelance projects, and commissioned work
- Use Generated Content in commercial advertising, marketing campaigns, and promotional materials
- Use Generated Content as part of branding, logos, packaging, or corporate identity (subject to trademark availability)
- Use Generated Content in publications, books, magazines, album art, and media (whether or not you receive compensation)
- Use Generated Content in websites, apps, and software products (commercial or otherwise)
- Use Generated Content in broadcast, film, video, and streaming content
- Sub-license Generated Content to your own clients and customers as part of your deliverables
- Modify, transform, adapt, and create derivative works from Generated Content

**No attribution required:** Pro Tier Generated Content does not require attribution to Seed Studio (though it is always appreciated).

**No royalties:** You owe Seed Studio no ongoing royalties, licensing fees, or revenue share for any commercial use of Pro Tier Generated Content.

### 8.4 License Conditions and Limitations

The Pro Tier commercial license is subject to the following conditions:

**(a) Active Pro Status:** The commercial license applies to Generated Content produced while your Pro Tier is active. If your Pro Tier expires or is terminated, previously exported Generated Content retains its commercial license. However, any new Generated Content produced after reversion to the Free Tier is subject to Free Tier limitations.

**(b) No Trademark on "Seed Studio":** While you own the Generated Content, you may not claim or register trademark rights over the term "Seed Studio," the Seed Studio logo, or any confusingly similar marks.

**(c) No Claim to Ownership of the Service:** Your ownership of Generated Content does not extend to the Service itself, its algorithms, its source code, or any part thereof.

**(d) Third-Party Rights:** You are solely responsible for ensuring that your use of Generated Content does not infringe on the intellectual property, publicity, or other rights of any third party. While Seed Studio's procedural algorithms are designed to produce original abstract compositions, you bear responsibility for verifying that specific Generated Content does not inadvertently resemble or reproduce a protected work.

**(e) Trademark Clearance:** Generated Content used as a logo, brand mark, or commercial identifier requires independent trademark clearance. Seed Studio does not warrant that any particular Generated Content is suitable for trademark use or that it is free from conflicting prior trademark registrations.

### 8.5 Seed Values and Parameter Data

Numeric seed values, parameter configurations, presets, and settings are factual data that are not subject to copyright protection under U.S. law (see Feist Publications, Inc. v. Rural Telephone Service Co., 499 U.S. 340 (1991)). You are free to share, publish, and exchange seed values and parameter configurations without restriction.

---

## 9. Acceptable Use Policy

You agree not to, and agree not to assist, encourage, or enable others to:

### 9.1 Prohibited Content

Use the Service to generate, export, or distribute any content that:

1. Is unlawful, illegal, or promotes illegal activity in any jurisdiction
2. Is defamatory, libelous, or violative of any person's privacy or publicity rights
3. Is harassing, abusive, threatening, or intended to intimidate or harm others
4. Is hate speech or promotes discrimination based on race, ethnicity, national origin, religion, gender, sexual orientation, disability, or any other protected characteristic
5. Infringes or violates the intellectual property rights, copyrights, trademarks, trade secrets, or proprietary rights of any third party
6. Contains malware, viruses, worms, Trojan horses, or other harmful or malicious code
7. Is fraudulent, deceptive, or misleading (including phishing or impersonation)
8. Depicts or exploits minors in any harmful or inappropriate manner
9. Violates any applicable local, state, national, or international law or regulation

### 9.2 Prohibited Conduct

1. Circumvent, disable, or attempt to circumvent license verification mechanisms, watermarking, or resolution restrictions
2. Reverse engineer, decompile, disassemble, or extract the layout engine algorithms, except as expressly permitted by the MIT License covering the Service's source code
3. Use any automated means (scripts, bots, crawlers, scrapers) to access, query, or interact with the Service in a manner that imposes unreasonable load on our infrastructure
4. Redistribute, resell, sublicense, or otherwise commercialize access to the Service itself (as opposed to Generated Content, which is governed by Section 8)
5. Access the Service for the purpose of building a competing product or service
6. Interfere with or disrupt the integrity, performance, or security of the Service
7. Probe, scan, or test the vulnerability of the Service's systems or networks
8. Use the Service in any manner that could reasonably be expected to damage, disable, overburden, or impair the Service or interfere with any other party's use of the Service
9. Attempt to gain unauthorized access to the Service, other user accounts, or any related systems or networks
10. Use the Service to violate the privacy or infringe the rights of others

### 9.3 Enforcement

We reserve the right, in our sole discretion, to:

- Investigate any suspected violation of this Acceptable Use Policy
- Remove or disable access to any Generated Content or user material that violates these Terms
- Suspend or terminate your access to the Service (including Pro Tier access) for violations
- Block IP addresses or IP ranges at the CDN level to prevent abuse
- Report illegal activity to appropriate law enforcement authorities
- Cooperate with law enforcement in the investigation and prosecution of illegal conduct

Enforcement actions may be taken without prior notice. We shall not be liable for any loss or damage resulting from enforcement actions taken in good faith.

---

## 10. Third-Party Services

### 10.1 LemonSqueezy — Payment Processing

Payments are processed by **Lemon Squeezy, LLC** (LemonSqueezy), a Delaware limited liability company, which serves as the Merchant of Record for all transactions related to Pro Tier purchases. By purchasing a Pro Tier license, you acknowledge and agree that:

- Your payment information is collected, stored, and processed by LemonSqueezy, not by Seed Studio.
- LemonSqueezy's Terms of Service ([lemonsqueezy.com/terms](https://www.lemonsqueezy.com/terms)) and Privacy Policy ([lemonsqueezy.com/privacy](https://www.lemonsqueezy.com/privacy)) govern your payment transactions.
- LemonSqueezy is responsible for all payment-related regulatory compliance, including PCI DSS compliance, tax calculation, tax collection, and tax remittance.
- Disputes related to billing, payments, or payment processing are subject to LemonSqueezy's dispute resolution procedures.
- Seed Studio is not a party to the payment processing relationship between you and LemonSqueezy and disclaims all liability arising from LemonSqueezy's services, except as expressly provided in these Terms (e.g., refund facilitation).

### 10.2 Cloudflare — Website Hosting

The Service is hosted on **Cloudflare Pages** and protected by Cloudflare's global content delivery network (CDN) and DDoS mitigation services. By accessing the Service, traffic passes through Cloudflare's infrastructure. Cloudflare's processing of network traffic is governed by Cloudflare's Privacy Policy ([cloudflare.com/privacypolicy](https://www.cloudflare.com/privacypolicy/)) and Cloudflare's Data Processing Addendum.

### 10.3 p5.js — Rendering Library

The Service uses p5.js, an open-source JavaScript library for creative coding, licensed under the LGPL-2.1. p5.js is maintained by the Processing Foundation. p5.js is loaded client-side; no data is transmitted to the Processing Foundation or p5.js maintainers through your use of Seed Studio.

### 10.4 No Endorsement

Reference to any third-party product, service, process, or website does not constitute endorsement, sponsorship, or recommendation by Seed Studio. We are not responsible for the content, policies, or practices of third-party services.

---

## 11. Disclaimer of Warranties

**PLEASE READ THIS SECTION CAREFULLY. IT LIMITS OUR LIABILITY AND DISCLAIMS WARRANTIES TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW.**

### 11.1 "AS IS" and "AS AVAILABLE"

**THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTY OR REPRESENTATION OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.**

**TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SEED STUDIO EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:**

- Implied warranties of merchantability, fitness for a particular purpose, and non-infringement
- Warranties that the Service will be uninterrupted, timely, secure, error-free, or virus-free
- Warranties that Generated Content will meet your specific aesthetic, commercial, or technical requirements
- Warranties that defects or errors in the Service will be corrected
- Warranties that the Service will be compatible with all devices, browsers, or operating systems
- Warranties that seeds will produce identical output across different browsers, p5.js versions, or hardware configurations
- Warranties arising from course of dealing, course of performance, usage of trade, or otherwise

### 11.2 No Professional Advice

The Service is a creative tool, not a professional design service. No Generated Content constitutes professional graphic design, legal, financial, or other professional advice. You bear sole responsibility for evaluating whether Generated Content is suitable for your intended use.

### 11.3 Browser-Based Nature

You acknowledge that the Service operates entirely in your web browser using client-side technologies (JavaScript, HTML5 Canvas, localStorage). As such, the availability, performance, and functionality of the Service may be affected by factors outside our control, including but not limited to: your browser version and settings, available device memory and processing power, browser extensions or add-ons, and your internet connection.

### 11.4 Jurisdictional Limitations

Some jurisdictions do not allow the exclusion of implied warranties or limitations on applicable statutory rights. In such jurisdictions, the above exclusions and limitations apply to the greatest extent permitted by law, and your statutory rights remain unaffected.

---

## 12. Limitation of Liability

**PLEASE READ THIS SECTION CAREFULLY. IT SIGNIFICANTLY LIMITS OUR LIABILITY TO YOU.**

### 12.1 Exclusion of Certain Damages

**TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL SEED STUDIO, ITS AFFILIATES, DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, CONTRACTORS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES OF ANY KIND, INCLUDING BUT NOT LIMITED TO:**

- Loss of profits, revenue, income, or anticipated savings
- Loss of business, contracts, or business opportunities
- Loss of or damage to goodwill or reputation
- Loss of data (including settings, seeds, preferences, or Generated Content stored in browser localStorage)
- Cost of procurement of substitute goods or services
- Any damages arising from your inability to use the Service or access Generated Content
- Damages arising from unauthorized access to or alteration of your transmissions or data
- Any other intangible losses

**HOWSOEVER CAUSED, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, STATUTE, OR ANY OTHER LEGAL THEORY, EVEN IF SEED STUDIO HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND EVEN IF A REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.**

### 12.2 Monetary Cap on Liability

**TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SEED STUDIO'S TOTAL AGGREGATE LIABILITY TO YOU FOR ANY AND ALL CLAIMS ARISING FROM OR RELATING TO THESE TERMS OR THE SERVICE, WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR OTHERWISE, SHALL NOT EXCEED THE GREATER OF:**

- **The total amount paid by you to Seed Studio (through LemonSqueezy) during the twelve (12) month period immediately preceding the event giving rise to the claim; OR**
- **Fifty United States Dollars ($50.00 USD), if you have not made any payments to Seed Studio.**

**THE FOREGOING LIMITATION IS AN ESSENTIAL BASIS OF THE BARGAIN BETWEEN YOU AND SEED STUDIO. THE SERVICE WOULD NOT BE PROVIDED WITHOUT SUCH LIMITATION.**

### 12.3 Basis of the Bargain

You acknowledge and agree that Seed Studio has offered the Service, set its prices, and entered into these Terms in reliance upon the warranty disclaimers and liability limitations set forth herein, that these disclaimers and limitations reflect a reasonable and fair allocation of risk between you and Seed Studio, and that these disclaimers and limitations form an essential basis of the bargain between the parties.

### 12.4 Jurisdictional Limitations

Some jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages, or the limitation of implied warranties. In such jurisdictions, the above limitations apply to the maximum extent permitted by law. Nothing in these Terms limits or excludes liability for death or personal injury caused by negligence, or for fraud or fraudulent misrepresentation, to the extent such limitation or exclusion is prohibited by applicable law.

---

## 13. Indemnification

You agree to defend, indemnify, and hold harmless Seed Studio, its affiliates, and their respective directors, officers, employees, contractors, and agents from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees and legal costs) arising out of or relating to:

1. Your use of the Service, including any Generated Content you produce
2. Your violation of these Terms, including the Acceptable Use Policy
3. Your violation of any third-party right, including any intellectual property, privacy, or publicity right
4. Your violation of any applicable law, rule, or regulation
5. Any claim that your Generated Content caused damage, loss, or harm to a third party
6. Any dispute between you and a third party related to your use of the Service

We reserve the right, at our own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which case you agree to cooperate with our defense of such claim.

---

## 14. Termination

### 14.1 Termination by You

You may terminate these Terms at any time by:

- **Free Users**: Ceasing all use of the Service.
- **Pro Users**: Canceling your subscription (per Section 5.5) and ceasing all use of the Service.

Upon termination:
- Your right to access and use the Service immediately ceases.
- Pro Tier access continues through the end of the current paid billing period.
- The commercial license for previously exported Generated Content survives termination.

### 14.2 Termination by Us

We may terminate or suspend your access to the Service, in whole or in part, immediately and without prior notice or liability:

1. If you breach any provision of these Terms
2. If we reasonably believe you have violated the Acceptable Use Policy
3. If required to do so by law or legal process
4. If we discontinue the Service (in whole or in part), in which case we will provide reasonable advance notice to Pro Users

For Pro Users, termination for breach may result in loss of Pro Tier access without refund, at our sole discretion, depending on the nature and severity of the breach. For material, willful breaches, no refund shall be provided. For other breaches, a pro-rata refund for the unused portion of the current billing period may be provided at our discretion.

### 14.3 Effect of Termination

Upon termination of these Terms for any reason:

1. All rights and licenses granted to you under these Terms immediately cease.
2. You must cease all use of the Service.
3. Sections that by their nature should survive termination shall survive, including but not limited to: Section 7 (Intellectual Property Rights), Section 8 (Generated Content Ownership and Licensing), Section 11 (Disclaimer of Warranties), Section 12 (Limitation of Liability), Section 13 (Indemnification), this Section 14 (Termination), and Section 17 (Governing Law and Dispute Resolution).

### 14.4 Data Upon Termination

Upon termination, your locally stored data (license key, settings, preferences) remains on your device in browser localStorage until you clear it. No server-side data exists to delete.

---

## 15. GDPR and Data Protection

### 15.1 Data Processing Overview

Seed Studio's data processing architecture is intentionally minimal. The core Service operates entirely client-side in your browser. We do not operate user databases, server-side session stores, or analytics platforms that collect personal data. For full details, please see our [Privacy Policy](privacy.md), which is incorporated into these Terms by reference.

### 15.2 GDPR Compliance Statement

For Users in the European Economic Area (EEA), the United Kingdom, and Switzerland:

- **Data Controller**: Seed Studio acts as a Data Controller for the limited personal data we receive, specifically purchase-related data accessible through LemonSqueezy's merchant dashboard (email, name, license key, order ID, plan information).
- **Legal Basis for Processing**: The limited personal data we access is processed on the basis of (a) performance of a contract (your Pro Tier purchase), (b) our legitimate interests in providing customer support and preventing fraud, and (c) legal obligations where applicable.
- **Data Minimization**: We adhere strictly to the principle of data minimization. We do not collect any personal data that is not strictly necessary for the operation of the Service and handling of Pro Tier purchases.
- **No Automated Decision-Making**: The Service does not engage in automated decision-making or profiling that produces legal effects concerning you or similarly significantly affects you.
- **No Data Sales**: We do not sell, rent, or trade personal data.
- **Data Processing Agreement**: Where we engage third-party processors (LemonSqueezy for payments, Cloudflare for hosting), we rely on their respective GDPR-compliant data processing terms and standard contractual clauses.

### 15.3 Your GDPR Rights

Under the GDPR, you have the following rights:

| Right | Description | How to Exercise |
|---|---|---|
| Right of Access | Obtain confirmation of whether we process your personal data and a copy of that data | Email privacy@seed.studio |
| Right to Rectification | Correct inaccurate or incomplete personal data | Email privacy@seed.studio |
| Right to Erasure | Request deletion of your personal data ("right to be forgotten") | Email privacy@seed.studio; also clear browser localStorage |
| Right to Restriction | Request restriction of processing of your personal data | Email privacy@seed.studio |
| Right to Data Portability | Receive your personal data in a structured, machine-readable format | Email privacy@seed.studio |
| Right to Object | Object to processing based on legitimate interests | Email privacy@seed.studio |
| Right to Withdraw Consent | Withdraw consent where processing is based on consent | Email privacy@seed.studio |

To exercise any of these rights, contact us at **privacy@seed.studio**. We will respond within 30 calendar days (subject to extension in complex cases, per GDPR Article 12.3). We may need to verify your identity before processing your request.

**Note**: Because we hold minimal personal data (limited to purchase information via LemonSqueezy), many rights can be exercised directly by you:
- Clear your browser localStorage to erase all locally stored data (license key, settings, preferences).
- Use LemonSqueezy's self-service tools to manage your purchase data.

### 15.4 Right to Lodge a Complaint

If you believe our processing of your personal data violates the GDPR, you have the right to lodge a complaint with the supervisory authority in your EU member state of residence, your place of work, or the place of the alleged infringement. We encourage you to contact us first so that we may attempt to resolve your concerns directly.

### 15.5 Data Protection Officer

Given the limited nature of our data processing activities, we are not required to designate a formal Data Protection Officer under GDPR Article 37. For data protection inquiries, contact **privacy@seed.studio**.

---

## 16. Cookie Policy

### 16.1 Seed Studio Does Not Use Cookies

**The Seed Studio website itself does not set, use, or store any cookies.** Specifically, we do not use:

- Session cookies
- Persistent cookies
- Authentication cookies
- Preference cookies
- Analytics or tracking cookies
- Advertising or targeting cookies
- Third-party cookies (placed by us)
- First-party cookies of any kind
- Local shared objects or flash cookies
- Web beacons, tracking pixels, or clear GIFs

The Service stores user preferences, session state, and license information exclusively in your browser's localStorage, which is a client-side key-value store that is not transmitted to our servers and operates entirely within your control.

### 16.2 Third-Party Cookies

While Seed Studio sets no cookies, third-party services that are part of the Service's operational infrastructure may set cookies:

**LemonSqueezy Checkout:** When you click through to the LemonSqueezy checkout page to purchase a Pro license, LemonSqueezy may set session cookies on their domain (`*.lemonsqueezy.com`) necessary for the operation of the checkout process. These are first-party cookies of LemonSqueezy, not of Seed Studio, and are governed by LemonSqueezy's Cookie Policy and Privacy Policy, available at [lemonsqueezy.com/privacy](https://www.lemonsqueezy.com/privacy).

**Cloudflare:** Cloudflare may set the `__cf_bm` cookie for bot management and DDoS protection purposes. This cookie is set by Cloudflare, not by Seed Studio, and is necessary for Cloudflare to distinguish between legitimate users and malicious bots. This cookie does not track you across sites and does not collect personal data for marketing or advertising. It is governed by Cloudflare's Privacy Policy.

### 16.3 No Cookie Consent Banner Required

Because Seed Studio itself does not deploy any cookies and does not engage in tracking or profiling, no cookie consent banner is required under the ePrivacy Directive or GDPR for the use of the Service. Any cookies set by third-party services (LemonSqueezy, Cloudflare) are strictly necessary for service operation and fall within the "strictly necessary" exception to consent requirements.

---

## 17. Governing Law and Dispute Resolution

### 17.1 Governing Law

These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States of America, without regard to its conflict of law principles. The United Nations Convention on Contracts for the International Sale of Goods (CISG) shall not apply.

### 17.2 Geographic Application

The Service is controlled and operated from the United States. We make no representation that the Service is appropriate or available for use in all locations. Access to the Service from jurisdictions where the Service or its content is illegal is prohibited. If you access the Service from outside the United States, you do so on your own initiative and are responsible for compliance with all local laws.

### 17.3 Informal Dispute Resolution

Before initiating any formal legal proceeding, you agree to first contact us at **legal@seed.studio** and attempt to resolve the dispute informally. Both parties agree to negotiate in good faith for a period of at least thirty (30) calendar days. This informal resolution requirement is a condition precedent to filing any arbitration demand or lawsuit.

The notice of dispute must include: (a) your name and contact information, (b) a detailed description of the nature and basis of the dispute, (c) the specific relief sought, and (d) if applicable, the License Key and email associated with your account.

### 17.4 Binding Arbitration

Any dispute, claim, or controversy arising out of or relating to these Terms or the Service that is not resolved through informal negotiation within the thirty-day period shall be settled by binding arbitration administered by the American Arbitration Association ("AAA") in accordance with its Consumer Arbitration Rules (the "Rules"), as modified by these Terms.

**Arbitration specifics:**

- The arbitration shall be conducted by a single arbitrator mutually agreed upon by the parties, or if the parties cannot agree, appointed by the AAA in accordance with the Rules.
- The arbitration shall take place in Wilmington, Delaware, or via videoconference at your election.
- The arbitrator shall apply Delaware law, without regard to conflict of law principles.
- The arbitrator shall issue a reasoned written decision sufficient to explain the essential findings and conclusions on which the award is based.
- The arbitrator's award shall be final and binding, and judgment on the award may be entered in any court having jurisdiction.
- Each party shall bear its own attorneys' fees and costs, unless the arbitrator determines that a party's claim or defense was frivolous or brought in bad faith, in which case the arbitrator may award reasonable fees and costs to the prevailing party.

### 17.5 Small Claims Court Exception

Notwithstanding the arbitration requirement, either party may elect to bring an individual action in small claims court in lieu of arbitration, provided that: (a) the claim is within the small claims court's jurisdictional limits, (b) the action proceeds on an individual basis only (not as part of a class or representative action), and (c) the small claims court is located in or has jurisdiction over you.

### 17.6 Class Action and Jury Trial Waiver

**IMPORTANT: PLEASE READ CAREFULLY.**

**YOU AND SEED STUDIO AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, COLLECTIVE, CONSOLIDATED, OR REPRESENTATIVE PROCEEDING.**

Unless both you and Seed Studio agree otherwise in writing, the arbitrator may not consolidate more than one person's claims and may not otherwise preside over any form of a representative, consolidated, or class proceeding.

**YOU HEREBY WAIVE ANY RIGHT TO A JURY TRIAL** for any dispute, claim, or controversy arising out of or relating to these Terms or the Service. This waiver applies to any claims brought in court, including small claims court.

### 17.7 Opt-Out of Arbitration

You may opt out of the arbitration and class action waiver provisions within thirty (30) calendar days of first accepting these Terms by sending a written notice to **legal@seed.studio** with the subject line "ARBITRATION OPT-OUT." The notice must include your full name, the email address associated with any Seed Studio license (if applicable), and a clear statement that you are opting out of the arbitration clause. Opting out of arbitration does not affect any other part of these Terms.

### 17.8 Statute of Limitations

Any claim or cause of action arising out of or relating to these Terms or the Service must be filed within one (1) year after the claim or cause of action arose, or the earliest date on which you knew or reasonably should have known of the facts giving rise to the claim. Failure to file within this period results in the claim being permanently barred.

---

## 18. Changes to These Terms

### 18.1 Right to Modify

We reserve the right to modify, update, or replace these Terms at any time in our sole discretion. Changes may be made for legal, regulatory, operational, or business reasons.

### 18.2 Notice of Changes

For material changes, we will provide notice through one or more of the following methods:

- A prominent notice on the seed.studio website (displayed for a minimum of 30 calendar days)
- Email notification to Pro Users (using the email address associated with their LemonSqueezy purchase)
- An in-application notice or banner

For non-material changes (such as typographical corrections, formatting, or clarifications that do not alter substantive rights or obligations), we may update these Terms without specific notice.

### 18.3 Effective Date

Changes take effect immediately upon posting unless a later effective date is specified. The "Last Updated" date at the top of this document indicates when the Terms were last revised.

### 18.4 Acceptance of Changes

Your continued use of the Service after any changes become effective constitutes your acceptance of the revised Terms. If you do not agree to the revised Terms, you must stop using the Service and, for Pro Users, cancel your subscription.

### 18.5 Archived Versions

We maintain an archive of previous versions of these Terms. To request a copy of a prior version, contact **legal@seed.studio**.

---

## 19. General Provisions

### 19.1 Entire Agreement

These Terms, together with the [Privacy Policy](privacy.md) and any other policies or agreements expressly referenced herein, constitute the entire agreement between you and Seed Studio regarding the Service and supersede all prior and contemporaneous understandings, agreements, representations, and warranties, whether written or oral.

### 19.2 Severability

If any provision of these Terms is held by a court of competent jurisdiction to be invalid, illegal, or unenforceable, that provision shall be modified to the minimum extent necessary to make it enforceable while preserving the original intent, or if modification is not possible, shall be severed. The remaining provisions shall continue in full force and effect, and the validity, legality, and enforceability of the remaining provisions shall not be affected or impaired.

### 19.3 No Waiver

Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. No waiver of any term, provision, or condition of these Terms shall be effective unless made in writing and signed by an authorized representative of Seed Studio. A waiver of any breach or default shall not constitute a waiver of any subsequent breach or default.

### 19.4 Assignment

**By You:** You may not assign, transfer, delegate, or sublicense any of your rights or obligations under these Terms without our prior written consent. Any attempted assignment in violation of this provision shall be null and void.

**By Us:** We may assign, transfer, or delegate our rights and obligations under these Terms in whole or in part without your consent: (a) to an affiliate; (b) in connection with a merger, acquisition, reorganization, or sale of all or substantially all of our assets; or (c) to any other entity as part of a corporate restructuring. These Terms shall be binding upon and inure to the benefit of the parties and their respective permitted successors and assigns.

### 19.5 Relationship of the Parties

Nothing in these Terms creates a partnership, joint venture, agency, fiduciary, or employment relationship between you and Seed Studio. You have no authority to bind Seed Studio in any respect.

### 19.6 Force Majeure

Seed Studio shall not be liable for any delay or failure to perform resulting from causes beyond our reasonable control, including but not limited to: acts of God; natural disasters; war (declared or undeclared); terrorism; civil unrest; riots; embargoes; strikes or labor disputes; epidemics or pandemics; internet, network, or telecommunications failures; power outages; actions of government authorities; or any other event of force majeure.

### 19.7 Notices

**To You:** We may provide notices to you via: (a) the email address associated with your Pro license purchase; (b) prominent posting on the seed.studio website; or (c) in-application messaging. Notice shall be deemed received: for email, 24 hours after sending; for website posting, upon posting.

**To Us:** Legal notices must be sent via email to **legal@seed.studio**. Notices must include sufficient detail to identify the sender, the nature of the notice, and any relevant account or license information.

### 19.8 Electronic Communications

By using the Service, you consent to receive electronic communications from us, including legal notices, policy updates, and (for Pro Users) account-related messages. You agree that all agreements, notices, disclosures, and other communications provided to you electronically satisfy any legal requirement that such communications be in writing.

### 19.9 Third-Party Beneficiaries

These Terms are for the sole benefit of the parties hereto and their respective successors and permitted assigns. Nothing in these Terms, express or implied, is intended to or shall confer upon any third party any legal or equitable right, benefit, or remedy of any nature whatsoever.

### 19.10 Interpretation

For purposes of these Terms: (a) headings are for convenience only and do not affect interpretation; (b) the word "including" means "including without limitation"; (c) "or" is not exclusive (unless stated otherwise); (d) "shall," "must," and "will" are mandatory; (e) "may" is permissive; and (f) unless context requires otherwise, the singular includes the plural and vice versa.

### 19.11 English Language

These Terms were drafted in English. Any translation is provided for convenience only. In the event of any conflict between the English version and a translated version, the English version shall prevail.

### 19.12 No Survival of Representations

You acknowledge that you have not relied on any representation, warranty, or statement not expressly set out in these Terms.

---

## 20. Contact Information

For questions, concerns, or notices regarding these Terms of Service:

| Purpose | Contact |
|---|---|
| Legal matters, DMCA notices, terms inquiries | **legal@seed.studio** |
| Customer support, billing, refunds | **support@seed.studio** |
| Privacy and data protection | **privacy@seed.studio** |
| Website | [seed.studio](https://seed.studio) |

**Response time**: We aim to respond to all inquiries within 2–3 business days. Legal notices may require additional processing time.

---

*These Terms of Service are drafted specifically for Seed Studio's architecture as a browser-based procedural generation tool with no user accounts, no server-side data storage, no AI/ML models, and LemonSqueezy-integrated payment processing. They are designed to be enforceable, transparent, and proportionate to the nature and scale of the Service.*
