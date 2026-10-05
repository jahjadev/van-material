# VAN-MATERIAL

Bilingual (Thai / English) marketing site for VAN INTERTRADE Co., Ltd. — a
Bangkok-based Materion distributor of beryllium copper, MoldMAX, ToughMet,
chrome copper, clad metal, standard copper alloys, and silver electrical
contacts. Thai is served at the bare path (`/`, `/beryllium-copper`, ...),
English under `/en` (`/en`, `/en/beryllium-copper`, ...).

## Stack

- [Next.js 16](https://nextjs.org/) (App Router), React 19, TypeScript
- Tailwind CSS 4
- `react-hook-form` + `zod` for the RFQ ("request a quote") form
- `nodemailer` to deliver RFQ submissions by SMTP
- No database, no third-party analytics, no CAPTCHA (see `/privacy`)

## Development

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build and run

```bash
npm run build
npm run start         # serves the production build
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run seo:audit` | SEO/AEO/i18n audit over the **rendered** site — run after `build && start`. See `.claude/skills/seo-aeo/SKILL.md`. |
| `npm run test:rfq` | End-to-end test of the `/api/rfq` route against a real built server |

`npx tsc --noEmit` type-checks without building; CI runs it separately from
`next build` for a clearer failure location.

## Environment variables

See `.env.example` for the full list and explanation of each. Copy it to
`.env.local` for local development (git-ignored; never commit it):

```bash
cp .env.example .env.local
```

The RFQ form works with no SMTP configured — submissions are still
accepted, the API answers `{ok:true, delivered:false}`, and the form tells
the visitor to call or use LINE instead of promising a callback that won't
arrive. Set `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` (and read the note on
`SMTP_TLS_INSECURE`) to actually deliver mail.

## Deployment

Deployed on [Vercel](https://vercel.com/), domain
`www.van-material.com` (`NEXT_PUBLIC_SITE_URL`, with the same value as the
fallback in `src/lib/site.ts` — that file is the only place a hostname may
be hardcoded). Set the SMTP variables above in the Vercel project's
environment settings; never commit `.env.local`.

## CI

`.github/workflows/ci.yml` runs on every push/PR to `main`: install → lint
→ type-check → build → dependency audit (separate job) → the SEO/AEO/i18n
audit and the RFQ API test against a real built server.

## More

- `.claude/skills/seo-aeo/SKILL.md` — keyword ownership, bilingual rules,
  the audit, adding a product/grade/industry/article, page-speed rules,
  and the currently open client questions.
- `docs/seo/vaninter-material-titles.txt` — titles from the sibling
  vaninter.com site, used by the audit's cross-domain duplicate-title check.
