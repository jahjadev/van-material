## Rebuild van-material as a static bilingual Next.js site (SEO/AEO-ready)

Replaces the client-side Vite SPA (search engines and AI crawlers received an empty page titled "Van Material New") with a prerendered Next.js 16 site for www.van-material.com.

### What's in it
- **Thai at `/`, English at `/en`**: one language per URL, correct `<html lang>`, reciprocal hreflang.
- **Pages:** 7 product families, 13 grade pages (C17200, C17410, C17510, C17460, MoldMAX HH/V/XL, PROtherm, ToughMet 3/2, C5191/C5210/C1100), 6 industry pages, home, about, contact, privacy, `/knowledge` with 6 articles.
- **Facts:** every technical number cites the Materion (or other) page it came from. Unsourced legacy claims were removed.
- **SEO/AEO:** per-page metadata, JSON-LD (one Organization shared with vaninter.com, WebSite, Product without offers, FAQPage matching visible text, Article, Breadcrumb), sitemap, robots (AI crawlers allowed), llms.txt, per-route OG/Twitter cards with Thai fonts.
- **Quote form:** posts to `/api/rfq` and emails via SMTP to van@vaninter.com. It never reports "sent" unless the API confirms delivery. Honeypot plus per-IP and global rate limits.
- **Security/perf:** nonce-free CSP and security headers; the map loads on click. Lighthouse (local, mobile, median of 3 runs): Perf 92, SEO 100, A11y 100, BP 100, CLS 0.
- **Quality gate:** `npm run seo:audit` (rendered-HTML audit: titles, descriptions, canonical, hreflang, JSON-LD, keyword ownership, orphans, no Thai on /en, …) and `npm run test:rfq` (47 cases), both run in CI.

### Verification
`npm run lint`, `npx tsc --noEmit`, `npm run build` (all content pages static), `npm run seo:audit --strict` (74 URLs, 0 failures, 0 warnings) and `npm run test:rfq` (47/47) all pass locally.

### Before launch
- Set SMTP_HOST/PORT/USER/PASS (and SMTP_TLS_INSECURE if the mail host still uses a self-signed cert) plus NEXT_PUBLIC_SITE_URL in Vercel.
- www.van-material.com currently points to another nginx server, and the apex has no DNS. Confirm nothing is needed there before repointing to Vercel.
- Legal review of the privacy notice; technical review of the articles; real logo and photos; datasheet PDFs to fill the chrome copper, clad metal and standard alloy pages.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
