# van-material: Next.js Rebuild, SEO/AEO, Vercel Launch — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the client-side Vite app with a statically generated Next.js site that ranks and gets quoted for VAN INTERTRADE's copper and mold materials (Materion BeCu, MoldMAX, ToughMet, CrCu/CrCuZr, standard alloys, clad metal, electrical contacts), then launch it on Vercel.

**Architecture:** Next.js App Router, every page prerendered (SSG). Content lives in typed data modules under `src/data/`; templates render product family → grade → industry → article pages from them. Thai at bare paths, English mirrored under `/en`, via two root-layout route groups `(th)` and `(en)` so each URL has one language and a correct `<html lang>`. SEO plumbing: `pageMeta()`, JSON-LD helpers, `sitemap.ts`, `robots.ts`, `/llms.txt`, OG images. It is gated by a Node audit script that reads rendered HTML. The same pattern runs `vaninter.com` in production (`C:\Users\mello\OneDrive\Documents\VAN`); copy *code patterns* from there, never page copy.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, lucide-react, motion, zod + react-hook-form (RFQ form), nodemailer (SMTP to the company mail server).

**Spec / evidence:**
- Keyword research: `docs/seo/keyword-research-2026-10-05.md`
- Decisions (user, 2026-10-05): rebuild in Next.js. Scope = all six lines. **Keep vaninter.com/materials, give this site different (deeper) content.** Domain = a new domain (name pending, see Global Constraints).
- Reference implementation: `C:\Users\mello\OneDrive\Documents\VAN` (`src/lib/seo.ts`, `src/components/JsonLd.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/llms.txt/route.ts`, `src/lib/ogCard.tsx`, `scripts/seo-audit.mjs`, `.claude/skills/seo-aeo/SKILL.md`).

## Findings: current state of `jahjadev/van-material` (audited 2026-10-05)

| # | Problem | Impact |
|---|---|---|
| 1 | Vite SPA: server returns `<div id="root"></div>` with `<title>Van Material New</title>` for every URL | AI crawlers (GPTBot, PerplexityBot, ClaudeBot) don't run JS, so they see nothing. Google renders late and unreliably. **Blocks all SEO/AEO.** |
| 2 | Language is React state (`useState('th')`), so there are no `/en` URLs | English content is never indexable, and no hreflang is possible |
| 3 | All products on one `/products` page | Cannot rank for grade codes (`c17200`, `moldmax hh`, `c5191`…), which is where the searches are |
| 4 | Placeholder facts in schema/meta: phone `+66-2-123-4567`, `02-XXX-XXXX`, `sales@vanintertrade.com`, logo URL `vanintertrade.com/logo.png` | Wrong NAP (name/address/phone) data, a trust and local-SEO problem |
| 5 | Facts conflict with vaninter.com: "founded 2000 / over 20 years" vs **1986 (พ.ศ. 2529)** on vaninter.com | Contradictory entity facts confuse Google's knowledge graph and answer engines |
| 6 | Unverified superlatives: "ผู้นำเข้าหนึ่งเดียวในไทย", "world's highest strength", "up to 50% cycle time", "140 ksi" | Legal/trust risk unless sourced (Materion datasheets) |
| 7 | `og:image` = `/src/assets/logo-van.png` | 404 in production build |
| 8 | `<meta keywords>` stuffed with 40 terms | Ignored by Google. Noise. |
| 9 | Static `sitemap.xml`/`robots.txt` hardcoded to `vanintertrade.com`, which doesn't resolve | Points crawlers at a dead domain |
| 10 | Contact form has no backend | Leads are lost |
| 11 | Stray committed folder `cosatronthai/.vite/`, empty `NavbarV2.jsx`, template README | Housekeeping |
| 12 | `van-material.vercel.app` belongs to an unrelated project ("Size Monitor") | The Vercel project needs a different name. Don't assume that URL. |

## Global Constraints

- **Domain:** read from one place, `SITE_URL` in `src/lib/site.ts` (env `NEXT_PUBLIC_SITE_URL` with a hardcoded fallback). Nothing else may contain a hostname. **The domain name is still pending from the user. Ask before Task 9.**
- **Company facts come from `src/data/company.ts` only**, seeded from vaninter.com's verified data: legal names บริษัท แวน อินเตอร์เทรด จำกัด / VAN INTERTRADE Co., Ltd., founded **1986 (พ.ศ. 2529)**, phone **02-728-0150**, LINE **@vanintertrade**, email per client (current site shows `van@vaninter.com`; vaninter.com's form goes to `info@vaninter.com`, so confirm). Copy the address and opening hours from `VAN/src/data/company.ts`.
- **No invented technical numbers.** Every property value (hardness, conductivity %IACS, tensile strength) must cite a Materion/Longsun datasheet the client provides or the public Materion datasheet URL, noted in a `source` field. A value with no source is not published.
- **Different content from vaninter.com/materials.** No paragraph copied from `VAN/src/data/materialDetails.ts` or `materials.ts`. Facts may match; wording may not. Titles must differ.
- One head term → one page (`KEYWORD_OWNERS` in the audit). Thai titles lead with the **English term + grade**, Thai beside it (buyers search English; see research §1).
- `<title>` ≤ 65 visible chars incl. brand suffix. Meta description 70–165 chars. Exactly one `<h1>` per page.
- Every Thai string has an English sibling. `/en` pages contain no visible Thai.
- Schema must match visible text. FAQ JSON-LD only from FAQs rendered on the page.
- Every page prerendered. No nonce CSP (it forces dynamic rendering; see `VAN/next.config.ts` comment for why).
- Before writing Next code, read the relevant guide in `node_modules/next/dist/docs/`. Next 16 differs from older docs (e.g. `middleware` → `proxy.ts`, `priority` → `preload`/`fetchPriority`).

## Information architecture (URL → owned head term)

Thai at the path shown; English at `/en` + path.

| Path | Owns (title leads with) | Also targets |
|---|---|---|
| `/` | Materion distributor Thailand / ตัวแทนจำหน่าย Materion | โลหะผสมทองแดงสำหรับแม่พิมพ์และอุตสาหกรรม |
| `/beryllium-copper` | **Beryllium Copper** (เบริลเลียมคอปเปอร์) | cu beryllium, copper and beryllium, ทองแดงเบริลเลียม, forms: rod/bar/plate/strip/wire/tube |
| `/beryllium-copper/c17200` | **C17200** (Alloy 25) | berylco 25, becu 25, uns c17200, c17200 data sheet |
| `/beryllium-copper/c17300` | **C17300** (Alloy M25) | free-machining BeCu |
| `/beryllium-copper/c17510` | **C17510** (Alloy 3) | high-conductivity BeCu |
| `/beryllium-copper/c17500` | **C17500** (Alloy 10) | — *(only if the client stocks it)* |
| `/moldmax` | **MoldMAX** (ทองแดงเบริลเลียมสำหรับแม่พิมพ์) | moldmax hh, moldmax xl, mold max material, ระบบหล่อเย็นแม่พิมพ์, mold insert |
| `/moldmax/moldmax-hh`, `/moldmax/moldmax-xl`, `/moldmax/protherm` | the grade name | — |
| `/toughmet` | **ToughMet** (Cu-Ni-Sn) | toughmet 3, toughmet at110, anti-galling bushing |
| `/chrome-copper` | **CrCu / CrCuZr** (ทองแดงโครเมียม) | crcuzr, chrome copper, หัวเชื่อมจุด, electrode |
| `/standard-copper-alloys` | **C5191 / C5210 / C1100** | material c5191, phosphor bronze |
| `/clad-metal` | **Clad Metal** (โลหะประกบ) | clad metals, Cu/Al/Cu |
| `/electrical-contacts` | **Silver Electrical Contacts** (หน้าสัมผัสไฟฟ้า) | silver contact rivet, AgNi, AgSnO2, bi-metal/tri-metal rivet |
| `/industries/plastic-mold` | Copper alloys for plastic molds | แม่พิมพ์เป่าพลาสติก, injection mold cooling |
| `/industries/ev`, `/industries/oil-gas`, `/industries/aerospace`, `/industries/automotive`, `/industries/switchgear` | the industry + "copper alloy" | from the current Solutions copy |
| `/knowledge` + 6 articles (Task 7) | informational, never "จำหน่าย…" | AEO questions |
| `/about`, `/contact` (RFQ), `/privacy` | brand | — |

## Review Focus

1. **Thai/English leakage:** an `/en` page renders Thai (a component hardcodes a string) → reads as duplicate content. The audit must fail on visible Thai in `/en` (Task 8).
2. **Grade page with no sourced data:** a grade listed by the client but with no datasheet values → the page must still render (applications, forms, RFQ CTA) and show no empty property table rows. Never "—" for an unknown value; omit the row.
3. **Home path normalisation in the sitemap:** `""` vs `"/"` dropping `/en` from the English home URL (this happened on vaninter.com). Sitemap test asserts `/en` is present.
4. **RFQ form failure:** SMTP down or misconfigured → the visitor must be told the request did NOT go through and shown phone + LINE, with their input kept. Never a fake "sent".
5. **Cross-domain cannibalization:** a van-material title identical to a vaninter.com/materials title. Task 8's audit compares against a checked-in list of vaninter.com material titles.

---

### Task 0: Branch, scaffold Next.js, remove the Vite app

**Files:**
- Delete: `index.html`, `vite.config.js`, `eslint.config.js`, `postcss.config.js`, `tailwind.config.js`, `vercel.json`, `src/main.jsx`, `src/App.jsx`, `src/App.css`, `src/pages/*`, `src/components/*`, `src/contexts/*`, `src/lib/utils.js`, `cosatronthai/`, `public/sitemap.xml`, `public/robots.txt`, `public/vite.svg`, `src/assets/react.svg`
- Keep: `src/assets/*.png` (move to `public/images/` in Task 3), and copy `src/contexts/LanguageContext.jsx` to `docs/legacy-copy.jsx` first. It holds the existing TH/EN copy to mine.
- Create: Next.js app files (below)

- [ ] **Step 1:** `git checkout -b nextjs-rebuild`
- [ ] **Step 2:** `cp src/contexts/LanguageContext.jsx docs/legacy-copy.jsx`
- [ ] **Step 3:** Scaffold into a temp dir and move in (create-next-app refuses a non-empty dir):

```bash
npx create-next-app@latest ../vm-scaffold --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack
```
Delete the Vite files listed above, copy `../vm-scaffold/*` (incl. dotfiles, excluding `.git`) into the repo, `npm install`, `npm i lucide-react motion clsx tailwind-merge zod react-hook-form @hookform/resolvers nodemailer && npm i -D @types/nodemailer`.

- [ ] **Step 4:** `.gitignore` must contain `.env*`, `!.env.example`, `.vercel`, `/.next/`, `*.tsbuildinfo`, `next-env.d.ts`.
- [ ] **Step 5: Verify** `npm run build`. Expected: success.
- [ ] **Step 6: Commit** `git add -A && git commit -m "Replace the Vite SPA with a Next.js app shell"`

---

### Task 1: Site config, company facts, bilingual routing

**Files:**
- Create: `src/lib/site.ts`, `src/lib/locale.ts`, `src/data/company.ts`
- Create: `src/app/(th)/layout.tsx`, `src/app/(en)/en/layout.tsx`, `src/components/RootShell.tsx`, `src/components/LocaleLink.tsx`, `src/components/LangSwitch.tsx`
- Delete: `src/app/layout.tsx` (two root layouts replace it; one root layout can't vary `<html lang>`)

**Interfaces (produces):**
```ts
// src/lib/site.ts
export const SITE_URL: string;            // no trailing slash
export const SITE_NAME_TH = "แวน อินเตอร์เทรด";
export const SITE_NAME_EN = "VAN INTERTRADE";
// src/lib/locale.ts
export type Lang = "th" | "en";
export function localizePath(path: string, lang: Lang): string; // "/x" → "/en/x"; "/" → "/en"
export function pickLang<T>(lang: Lang, th: T, en: T): T;
export function absUrl(path: string, lang: Lang): string;      // SITE_URL + localizePath
```

- [ ] **Step 1:** `src/lib/site.ts`

```ts
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example-pending.com").replace(/\/$/, "");
export const SITE_NAME_TH = "แวน อินเตอร์เทรด";
export const SITE_NAME_EN = "VAN INTERTRADE";
```
(The fallback is deliberately obviously-wrong so a missing env var is caught by Task 8's audit, which fails on `example-pending`.)

- [ ] **Step 2:** `src/lib/locale.ts`

```ts
import { SITE_URL } from "./site";
export type Lang = "th" | "en";
export function localizePath(path: string, lang: Lang): string {
  const p = path === "" ? "/" : path;
  if (lang === "th" || !p.startsWith("/")) return p;
  return p === "/" ? "/en" : `/en${p}`;
}
export const pickLang = <T,>(lang: Lang, th: T, en: T): T => (lang === "en" ? en : th);
export const absUrl = (path: string, lang: Lang) => `${SITE_URL}${localizePath(path, lang)}`;
```

- [ ] **Step 3:** `src/data/company.ts`: copy the shape and values from `VAN/src/data/company.ts` (legal names, founded 1986/2529, phone, LINE, address, hours, geo). Add `email` = **pending client confirmation** (`van@vaninter.com` until confirmed). Add `materion: { since: <client to confirm; legacy copy says 2010> }`, and render it only once confirmed.
- [ ] **Step 4:** Route-group layouts. `(th)/layout.tsx` renders `<RootShell lang="th">`, `(en)/en/layout.tsx` renders `<RootShell lang="en">`. `RootShell` outputs `<html lang={lang}>`, fonts (`next/font`: Inter + IBM Plex Sans Thai), Nav, Footer. Follow `VAN/src/components/RootShell.tsx`.
- [ ] **Step 5:** `LocaleLink` wraps `next/link` and prefixes `/en` from a `LangContext` set by `RootShell`. `LangSwitch` renders two real `<a>` links (`/x` ↔ `/en/x`) so crawlers can follow them.
- [ ] **Step 6: Verify** `npm run build && npm run start`. Then `curl -s localhost:3000/ | grep -o '<html lang="[a-z]*"'` should give `th`. For `/en` it should give `en`. (ASCII paths only. Never curl Thai paths from Git Bash.)
- [ ] **Step 7: Commit** `git commit -am "Serve Thai at / and English at /en, one language per URL"`

---

### Task 2: SEO plumbing: metadata, JSON-LD, sitemap, robots, llms.txt

**Files:**
- Create: `src/lib/seo.ts`, `src/components/JsonLd.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/llms.txt/route.ts`, `src/lib/routes.ts`

**Interfaces (produces):**
```ts
// src/lib/seo.ts
export function pageMeta(o: { title: string; description: string; lang: Lang; path: string; image?: string }): Metadata;
// src/lib/routes.ts — single list every consumer reads (sitemap, llms.txt, audit)
export type RouteEntry = { path: string; lastmod?: string };
export function allRoutes(): RouteEntry[];
// src/components/JsonLd.tsx
export function JsonLd({ data }: { data: object | object[] }): JSX.Element;
export const organizationLd: (lang: Lang) => object;     // Organization + @id SITE_URL/#organization
export const websiteLd: (lang: Lang) => object;
export const breadcrumbLd: (items: { name: string; path: string }[], lang: Lang) => object;
export const productLd: (p: { name: string; description: string; path: string; image: string; brand: string; sku?: string }, lang: Lang) => object;
export const faqPageLd: (faqs: { q: string; a: string }[]) => object;
export const articleLd: (a: { title: string; description: string; path: string; image: string; date: string; modified?: string }, lang: Lang) => object;
```

- [ ] **Step 1: `pageMeta`**: title template `"{title} | VAN INTERTRADE"`, `alternates.canonical = absUrl(path, lang)`, `alternates.languages = { th: absUrl(path,"th"), en: absUrl(path,"en"), "x-default": absUrl(path,"th") }`, OpenGraph (`locale` th_TH/en_US, `url`, `siteName`), Twitter `summary_large_image`. **No `keywords` meta.** Model it on `VAN/src/lib/seo.ts`.
- [ ] **Step 2: JSON-LD helpers.** `JsonLd` must escape `<` as `\u003c` inside the script. `organizationLd` uses `company.ts` facts only: `name`, `alternateName` (Thai), `url`, `logo`, `telephone` `+66-2-728-0150`, `address`, `foundingDate: "1986"`, `sameAs` = only profiles the client confirms exist (the legacy Facebook/LinkedIn URLs are unverified, so drop them until confirmed). `productLd` uses `brand: { "@type": "Brand", name: "Materion" }` (or Longsun for contacts) and **no `offers`** (no published prices; Google flags a Product with fake offers).
- [ ] **Step 3: `routes.ts`**: build from data modules: static pages + every product family + every grade + every industry + every article. Articles carry `lastmod = modified ?? date`. Others omit lastmod (a build-time date makes Google ignore lastmod site-wide).
- [ ] **Step 4: `sitemap.ts`**: for each route emit Thai URL with `alternates.languages` {th, en}. Assert in a quick script (Task 8) that `${SITE_URL}/en` is present.
- [ ] **Step 5: `robots.ts`**: `allow: "/"`, `sitemap: ${SITE_URL}/sitemap.xml`. Explicitly **allow** `GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended` (AEO is a goal, so don't block answer engines).
- [ ] **Step 6: `/llms.txt`** (`dynamic = "force-static"`): an English brief generated from data: who VAN is, the six product lines with one-line descriptions, grades, industries, and how to request a quote, each linking the `/en` URL. Model it on `VAN/src/app/llms.txt/route.ts`.
- [ ] **Step 7: Verify** `npm run build`. Then `curl -s localhost:3000/sitemap.xml | grep -c "<url>"` > 0, `curl -s localhost:3000/robots.txt`, `curl -s localhost:3000/llms.txt | head`.
- [ ] **Step 8: Commit** `git commit -am "Add metadata, JSON-LD, sitemap, robots and llms.txt from one route list"`

---

### Task 3: Product data model + family and grade pages

**Files:**
- Create: `src/data/products/types.ts`, `src/data/products/beryllium-copper.ts`, `moldmax.ts`, `toughmet.ts`, `chrome-copper.ts`, `standard-copper-alloys.ts`, `clad-metal.ts`, `electrical-contacts.ts`, `src/data/products/index.ts`
- Create: `src/components/ProductFamilyPage.tsx`, `src/components/GradePage.tsx`, `src/components/PropertyTable.tsx`, `src/components/FaqList.tsx`
- Create routes: `src/app/(th)/[family]/page.tsx`, `src/app/(th)/[family]/[grade]/page.tsx`, and the same under `(en)/en/`
- Move: `src/assets/*.png` → `public/images/` (convert to WebP via `sharp`, ≤ 200 KB each, real `alt` TH+EN)

**Interfaces (produces):**
```ts
// src/data/products/types.ts
export type Bi = { th: string; en: string };
export type Property = { label: Bi; value: string; unit?: string; source: string }; // source = datasheet URL/file
export type Faq = { q: Bi; a: Bi };
export type Grade = {
  slug: string;            // "c17200"
  code: string;            // "C17200"
  aliases: string[];       // ["Alloy 25", "Berylco 25", "UNS C17200"]
  title: Bi;               // SERP title, ≤ 48 chars before suffix, leads with code
  h1: Bi;
  summary: Bi;             // first paragraph: answers "what is C17200" in sentence one
  description: Bi;         // meta description 70–165
  properties: Property[];  // only sourced values; may be empty
  forms: Bi[];             // rod, plate, strip…
  applications: Bi[];
  faqs: Faq[];
};
export type ProductFamily = {
  slug: string;            // "beryllium-copper"
  brand: "Materion" | "Longsun" | "VAN INTERTRADE";
  keyword: string;         // owned head term, e.g. "Beryllium Copper"
  title: Bi; h1: Bi; summary: Bi; description: Bi;
  image: { src: string; alt: Bi };
  grades: Grade[];
  forms: Bi[]; applications: Bi[]; industries: string[]; // industry slugs
  faqs: Faq[];
};
// src/data/products/index.ts
export const families: ProductFamily[];
export function getFamily(slug: string): ProductFamily | undefined;
export function getGrade(family: string, grade: string): { family: ProductFamily; grade: Grade } | undefined;
```

- [ ] **Step 1: Write the data for `beryllium-copper.ts` first** (it carries the highest-value terms). Example of the expected shape, with copy to be finalised against datasheets:

```ts
export const berylliumCopper: ProductFamily = {
  slug: "beryllium-copper",
  brand: "Materion",
  keyword: "Beryllium Copper",
  title: { th: "Beryllium Copper เบริลเลียมคอปเปอร์ Materion", en: "Beryllium Copper Alloys from Materion, Thailand" },
  h1: { th: "Beryllium Copper (เบริลเลียมคอปเปอร์) จาก Materion", en: "Beryllium Copper Alloys" },
  summary: {
    th: "Beryllium Copper (ทองแดงเบริลเลียม, CuBe) คือโลหะผสมทองแดงที่มีเบริลเลียมราว 0.2–2% ซึ่งหลังผ่านการบ่มแข็งจะแข็งแรงที่สุดในกลุ่มโลหะผสมทองแดง ขณะที่ยังนำไฟฟ้าและความร้อนได้ดี …",
    en: "Beryllium copper (CuBe) is a copper alloy with roughly 0.2–2% beryllium that, once age-hardened, is the strongest copper alloy while still conducting heat and electricity well. …",
  },
  // …grades: c17200, c17300, c17510 (+ c17500 only if stocked)
};
```
(The 0.2–2% range must be checked against the Materion source the client provides before publishing. If it can't be sourced, cut the number.)

- [ ] **Step 2:** Fill the other six families from `docs/legacy-copy.jsx` facts + client datasheets. Grades per the legacy copy: BeCu Alloy 25/174/3/390; MoldMAX HH/V/XL/PROTHERM; ToughMet 3/2; C5191/C5210/C1100; Cu/Al/Cu, Ag/Cu; contacts AgNi/AgSnO2/AgCdO/AgW/CuW, rivets/buttons/wire. **Remove the unsourced superlatives** (finding #6) unless the datasheet states them.
- [ ] **Step 3: `ProductFamilyPage`**: `<h1>`, summary (first sentence = direct answer), "Grades" cards linking each grade page, forms, applications, industries (links), `PropertyTable` (comparison across grades, only sourced rows), `FaqList`, RFQ CTA. JSON-LD: `breadcrumbLd` + `productLd` + `faqPageLd` (if faqs).
- [ ] **Step 4: `GradePage`**: `<h1>` leading with the code, aliases line ("Also known as Alloy 25, Berylco 25, UNS C17200"), summary, `PropertyTable`, forms, applications, sibling-grade links, link up to the family, FAQ, RFQ CTA prefilled `?grade=C17200`.
- [ ] **Step 5: Routes** with `generateStaticParams` from `families`, `generateMetadata` via `pageMeta`, `dynamicParams = false` (unknown slugs → 404, not a render).
- [ ] **Step 6: Verify** `npm run build`. The build output should list every family and grade as `●` (SSG). Then `curl -s localhost:3000/beryllium-copper/c17200 | grep -c "<h1"` should print `1`.
- [ ] **Step 7: Commit** `git commit -am "Add product family and grade pages from typed, sourced data"`

---

### Task 4: Home, industries, about, contact

**Files:**
- Create: `src/data/industries.ts` (+ pages `src/app/(th)/industries/[slug]/page.tsx` and `/en` twin), `src/components/pages/HomePage.tsx`, `AboutPage.tsx`, `ContactPage.tsx`, `src/app/(th)/page.tsx`, `about/page.tsx`, `contact/page.tsx`, `privacy/page.tsx` + `/en` twins

- [ ] **Step 1: Home**: `<h1>` "ตัวแทนจำหน่าย Materion ในประเทศไทย: Beryllium Copper, MoldMAX, ToughMet" (EN equivalent), product family grid (links), industries row, "why VAN" with **only confirmed facts** (since 1986, Materion authorised distributor), FAQ (4 Qs: who is the Materion distributor in Thailand / do you supply small quantities / what forms / how to get a quote; answers from client), RFQ CTA. JSON-LD: `organizationLd` + `websiteLd` + `faqPageLd`.
- [ ] **Step 2: Industries**: split the legacy Solutions page into `/industries/{plastic-mold,ev,oil-gas,aerospace,automotive,switchgear}`. Each page has an h1 naming the industry, the problem, which alloy solves it (links to family/grade), and an FAQ. `plastic-mold` is the priority (largest adjacent pool, แม่พิมพ์ฉีดพลาสติก 210): cooling, cycle time, inserts, blow molds. Any cycle-time claim cites its source.
- [ ] **Step 3: About**: history from `company.ts` (1986), Materion/Longsun partnership (years only once confirmed), team or warehouse photos when supplied.
- [ ] **Step 4: Contact**: NAP block from `company.ts`, map embed, `RfqForm` (Task 5). `LocalBusiness` JSON-LD (address, geo, hours, phone).
- [ ] **Step 5: Verify** `npm run build && npm run start`. Then click through every nav link in both languages.
- [ ] **Step 6: Commit** `git commit -am "Add home, industry, about and contact pages"`

---

### Task 5: RFQ form → email (no lost leads)

**Files:**
- Create: `src/components/RfqForm.tsx` (client), `src/app/api/rfq/route.ts`, `src/lib/rfqSchema.ts`, `.env.example`

**Interfaces:**
```ts
// src/lib/rfqSchema.ts
export const rfqSchema: z.ZodObject<{ name; company; email; phone; product; grade?; form?; quantity?; message; website /* honeypot */ }>;
// POST /api/rfq → 200 {ok:true, delivered:true} | 200 {ok:true, delivered:false} | 422 {ok:false, field} | 429
```

- [ ] **Step 1:** Port `VAN/src/app/api/quote/route.ts`: zod validation, CR/LF rejected in `name`, silent honeypot, per-IP rate limit (5/15 min), SMTP via nodemailer with `SMTP_HOST/PORT/USER/PASS` and optional `SMTP_TLS_INSECURE` (the company mail host currently serves a self-signed cert; see VAN `.env.example`). `To` = `RFQ_TO_EMAIL` (default per company.ts email).
- [ ] **Step 2:** Form fields: product (select from `families`), grade (dependent select), form, quantity, message. Prefill from `?product=&grade=`.
- [ ] **Step 3:** On `delivered:false` or a network error, show "Your request was NOT sent. Please call 02-728-0150 or LINE @vanintertrade", keep the inputs (Review Focus 4).
- [ ] **Step 4: Verify** with SMTP unset: submit → the NOT-sent message, inputs kept. With `.env.local` SMTP set: submit → mail arrives in the inbox (check the inbox, not just the 200).
- [ ] **Step 5: Commit** `git commit -am "Send RFQs by email and never pretend a failed send worked"`

---

### Task 6: Images, OG cards, performance, accessibility

- [ ] **Step 1:** `next/image` for all images, one `fetchPriority="high"` image per page (the hero), real `sizes`. Nothing above the fold starts at `opacity: 0` (Chrome won't count it as LCP).
- [ ] **Step 2:** Per-page OG image via `opengraph-image.tsx` with a committed Thai TTF (IBM Plex Sans Thai, OFL). Satori can't render Thai without it. No positive `letterSpacing` on Thai text. Model on `VAN/src/lib/ogCard.tsx`.
- [ ] **Step 3:** Security headers in `next.config.ts` (copy `VAN/next.config.ts`'s nonce-free CSP and header set, adjusting `frame-src` for the map).
- [ ] **Step 4: Verify** Lighthouse mobile ×3 runs on `/`, `/beryllium-copper`, `/beryllium-copper/c17200` against `npm run start`. Medians: Perf ≥ 90, SEO 100, A11y ≥ 95, CLS < 0.1.
- [ ] **Step 5: Commit** `git commit -am "Optimise images, add share cards and security headers"`

---

### Task 7: Knowledge base: six AEO articles

**Files:**
- Create: `src/data/articles/<slug>.ts` ×6, `src/data/articles/index.ts`, `src/components/ArticlePage.tsx`, routes `src/app/(th)/knowledge/page.tsx`, `knowledge/[slug]/page.tsx` + `/en` twins

Every article: opening paragraph answers the title in sentence one. h2s are questions. Inline FAQ (3–5 pairs) → `FAQPage` schema. ≥ 2 in-text links to family/grade pages. Title informational (คืออะไร / เปรียบเทียบ / วิธีเลือก). `articleLd` with `datePublished`/`dateModified`.

| Slug | Title (TH) | Targets → links to |
|---|---|---|
| `what-is-beryllium-copper` | Beryllium Copper คืออะไร คุณสมบัติและการใช้งาน | beryllium copper คือ (30) → `/beryllium-copper` |
| `c17200-vs-c17510` | เปรียบเทียบ C17200 กับ C17510 เลือกเกรดไหนดี | grade codes → both grade pages |
| `mold-steel-vs-beryllium-copper` | เหล็กแม่พิมพ์ vs ทองแดงเบริลเลียม: ระบายความร้อนและ Cycle Time | เหล็กทำแม่พิมพ์ (30), แม่พิมพ์ฉีดพลาสติก (210) → `/moldmax` |
| `what-is-mold-insert` | Insert แม่พิมพ์คืออะไร ทำไมใช้ทองแดงเบริลเลียม | mold insert (30), insert mold คือ (20) → `/moldmax` |
| `crcu-vs-crcuzr-welding-electrodes` | CrCu กับ CrCuZr ต่างกันอย่างไร สำหรับหัวเชื่อมจุด | crcuzr → `/chrome-copper` |
| `beryllium-copper-safety` | ทองแดงเบริลเลียมปลอดภัยไหม การกลึงและการจัดการอย่างถูกต้อง | trust/AEO, the question every buyer asks → `/beryllium-copper` (content strictly from Materion's published safety guidance) |

- [ ] **Step 1:** Collect sources per article (datasheets, Materion safety guidance). List them at the bottom of each article as visible references.
- [ ] **Step 2:** Write each article TH + EN in its own file.
- [ ] **Step 3:** `/knowledge` index lists all articles in HTML (no client-only pagination: every article must be linked from rendered HTML, or it's an orphan).
- [ ] **Step 4:** Each family page renders "Related articles" from a `topic` field on the article (two-way cluster).
- [ ] **Step 5: Verify** `npm run build`, then audit (Task 8).
- [ ] **Step 6: Commit** `git commit -am "Add six knowledge articles that answer buyers' questions"`

---

### Task 8: SEO/AEO audit gate + CI

**Files:**
- Create: `scripts/seo-audit.mjs` (port of `VAN/scripts/seo-audit.mjs`), `docs/seo/vaninter-material-titles.txt`, `.github/workflows/ci.yml`, `.claude/skills/seo-aeo/SKILL.md` (adapted)

- [ ] **Step 1:** Port the audit. It walks `sitemap.xml` on `--base` (default `http://localhost:3000`) and checks rendered HTML: 200, one h1, title present ≤ 65 visible chars, description 70–165, self-canonical, reciprocal hreflang th/en/x-default, ≥ 1 parseable JSON-LD block, no visible Thai on `/en`, `<html lang>` correct, no orphans, no article without a commercial link, `SITE_URL` not `example-pending`, `/en` home in sitemap. `KEYWORD_OWNERS`:

```js
const KEYWORD_OWNERS = {
  "Beryllium Copper": ["/beryllium-copper"],
  "C17200": ["/beryllium-copper/c17200"],
  "C17300": ["/beryllium-copper/c17300"],
  "C17510": ["/beryllium-copper/c17510"],
  "MoldMAX": ["/moldmax", "/moldmax/moldmax-hh", "/moldmax/moldmax-xl"],
  "ToughMet": ["/toughmet"],
  "CrCuZr": ["/chrome-copper"],
  "C5191": ["/standard-copper-alloys"],
  "Clad Metal": ["/clad-metal"],
  "Silver Electrical Contacts": ["/electrical-contacts"],
};
```
(Grade pages legitimately contain their family name, so match the **longest** owned term first, as VAN's audit does. Articles may mention terms in the body but not lead their `<title>` with a commercial phrase such as "จำหน่าย".)

- [ ] **Step 2:** Cross-domain check: fail if any `<title>` exactly equals a line in `docs/seo/vaninter-material-titles.txt` (fetch the six vaninter.com material titles once with Node and commit them).
- [ ] **Step 3:** CI: `npm ci` → `npm run lint` → `npm run build` → `npm audit --omit=dev --audit-level=high`.
- [ ] **Step 4: Verify** `npm run build && npm run start`, then `npm run seo:audit`. Expected: PASS, 0 fails. Fix until true. Don't weaken checks.
- [ ] **Step 5: Commit** `git commit -am "Gate SEO, AEO and i18n on an audit of the rendered site"`

---

### Task 9: Vercel launch (needs the domain name first)

- [ ] **Step 1: Ask the user for the domain** and set `NEXT_PUBLIC_SITE_URL=https://www.<domain>`.
- [ ] **Step 2: Merge** `nextjs-rebuild` → `main` after review. `git push origin main`.
- [ ] **Step 3: Vercel → Add New Project → import `jahjadev/van-material`.** Framework auto-detects Next.js. Name it something other than `van-material` (that subdomain is taken). Env vars (Production + Preview): `NEXT_PUBLIC_SITE_URL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_TLS_INSECURE`, `RFQ_TO_EMAIL`.
- [ ] **Step 4: Domains:** add `www.<domain>` as primary and `<domain>` → 308 to www. Set the DNS records Vercel shows at the registrar. Wait for the certificate.
- [ ] **Step 5: Verify production:**

```bash
node scripts/seo-audit.mjs --base https://www.<domain>
```
Expected: PASS. Also submit a real RFQ and confirm it lands in the inbox.

- [ ] **Step 6: Search engines:** Google Search Console → add Domain property (DNS TXT) → submit `/sitemap.xml` → URL Inspection → request indexing for `/`, `/beryllium-copper`, `/moldmax`, `/beryllium-copper/c17200`. Bing Webmaster Tools → import from GSC (Bing feeds ChatGPT search and Copilot). Google Business Profile: make sure it lists the new site under the company's existing profile, or as a products link.
- [ ] **Step 7: Reminder 2026-11-02:** GSC Performance check: impressions on grade codes, `beryllium copper`, `moldmax`.

---

### Task 10 (separate repo, after launch): link vaninter.com/materials → van-material

In `C:\Users\mello\OneDrive\Documents\VAN`. Keep-both decision: vaninter.com keeps its six material pages as summaries and links each to the matching van-material family page with a descriptive anchor ("ข้อมูลเกรดและคุณสมบัติทางเทคนิค Beryllium Copper"). van-material's About/footer links back to vaninter.com. Both keep self-canonicals. Follow that repo's `.claude/skills/seo-aeo/SKILL.md` and its audit (`/materials` links must stay non-dead-end). Plan it in that repo when Task 9 is done.

---

## Open client questions (collect before Tasks 3–4 copy is final)

1. Domain name for this site.
2. Sales email for RFQs: `van@vaninter.com` or `info@vaninter.com`?
3. Year appointed Materion distributor (legacy copy says 2010) and Longsun relationship. Can we say "authorised/exclusive"? ("ผู้นำเข้าหนึ่งเดียวในไทย" needs proof or must go.)
4. Datasheets (PDF) for every grade you stock, plus which grades are actually stocked (C17500? Alloy 174, 390?).
5. Do you sell pure copper sheet/rod (C1100) to general buyers? (แผ่นทองแดง 720/mo, ทองแดงแท่ง 390/mo.)
6. Do you sell replacement contactor/relay contacts? (หน้าคอนแทค 480/mo.)
7. Real photos: warehouse, cut stock, machined parts, team.
8. Official Facebook / LinkedIn / LINE OA URLs for `sameAs`.
