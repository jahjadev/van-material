# van-material — where things stand / next steps

_Last updated: 2026-10-06_

## State
- **Live on Vercel at https://www.van-material.com** (checked 2026-10-06): PR #1 merged into `main`; apex `van-material.com` 308-redirects to `www`; canonicals, hreflang, `/sitemap.xml` (74 URLs) and `/robots.txt` all point at `www`; `/api/rfq` answers (422 on an empty body, as it should).
- `main` is missing two later branch commits: `f7dcab1` (`vercel.json` pins `framework: nextjs`) and `6ef51ef` (these notes). The deploy works without them, but merge them so a future Vercel reset does not bring back the `dist` error.
- Plan: `docs/superpowers/plans/2026-10-05-van-material-nextjs-seo-launch.md`. Task 9 (domain) is done; Task 10 is open.
- Keyword research: `docs/seo/keyword-research-2026-10-05.md`. SEO/AEO house rules: `.claude/skills/seo-aeo/SKILL.md`.

## Client answers (2026-10-05)
- VAN holds MoldMAX distribution rights in Thailand (still never write "exclusive"/"sole").
- Sales / RFQ email: **van@vaninter.com**.
- Datasheets: the client has PDFs and will upload them, then add sourced property values for chrome copper, clad metal and standard alloys (cite the PDF as `source`).
- Privacy notice and article review: accepted for now.

## Open, in order
1. **Merge the leftover commits**: open a second PR from `nextjs-rebuild` into `main` (only `vercel.json` and docs change).
2. **Test the RFQ form for real.** Confirm the Vercel env vars are set (Production + Preview): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_TLS_INSECURE` (only for a self-signed mail cert); see `.env.example`. Send one RFQ from https://www.van-material.com and confirm it arrives in van@vaninter.com.
3. **Search engines:** in Google Search Console, add the domain property and submit `/sitemap.xml`; import into Bing Webmaster Tools; request indexing for `/`, `/beryllium-copper`, `/moldmax`, `/beryllium-copper/c17200`.
4. **Task 10 (VAN repo):** link vaninter.com/materials/* pages to the matching van-material family pages; keep both sites with different content.
5. **Client assets:** datasheet PDFs, a real materials logo (the current icon is cropped from the old AV wordmark), real photos, and a legal check of the privacy notice.
