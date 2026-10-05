# van-material — where things stand / next steps

_Last updated: 2026-10-05_

## State
- Site rebuilt as a static bilingual Next.js 16 site (Thai `/`, English `/en`) on branch **`nextjs-rebuild`**, pushed to GitHub (`jahjadev/van-material`). **Not merged into `main`, not live.**
- Plan: `docs/superpowers/plans/2026-10-05-van-material-nextjs-seo-launch.md` (Tasks 0–8 done and reviewed; 9–10 open).
- Keyword research: `docs/seo/keyword-research-2026-10-05.md`. SEO/AEO house rules: `.claude/skills/seo-aeo/SKILL.md`.
- Last local checks: lint, tsc and build pass; `npm run seo:audit --strict` passes on 74 URLs; `npm run test:rfq` passes 47/47.

## Client answers (2026-10-05)
- VAN holds MoldMAX distribution rights in Thailand (still never write "exclusive"/"sole").
- Sales / RFQ email: **van@vaninter.com**.
- Datasheets: the client has PDFs and will upload them, then add sourced property values for chrome copper, clad metal and standard alloys (cite the PDF as `source`).
- Privacy notice and article review: accepted for now.

## Open, in order
1. **Open the pull request**: https://github.com/jahjadev/van-material/pull/new/nextjs-rebuild (base `main`). PR text ready to paste: `docs/pr-description.md`.
2. **Fix the Vercel build.** The first deploy failed with "No Output Directory named dist" because the project was created for the old Vite app. `vercel.json` now pins `framework: nextjs` (commit f7dcab1), but also do this in Vercel → Settings → Build and Deployment:
   - Framework Preset: Next.js
   - Turn off the Build Command, Output Directory (`dist`) and Install Command overrides
   - Node 22.x
   - Redeploy
3. **Vercel env vars** (Production + Preview): `NEXT_PUBLIC_SITE_URL=https://www.van-material.com`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_TLS_INSECURE` (only if the mail host still serves a self-signed cert). See `.env.example`. Then send one real RFQ and confirm it arrives in van@vaninter.com.
4. **Domain (Task 9).** `www.van-material.com` currently answers from an unknown nginx server, and the apex `van-material.com` has no DNS record. Find out what that server is before repointing to Vercel. Note: `van-material.vercel.app` belongs to someone else.
5. **After launch:** in Google Search Console, add the domain property and submit `/sitemap.xml`; import into Bing Webmaster Tools; request indexing for `/`, `/beryllium-copper`, `/moldmax`, `/beryllium-copper/c17200`.
6. **Task 10 (VAN repo):** link vaninter.com/materials/* pages to the matching van-material family pages; keep both sites with different content.
7. **Client assets:** datasheet PDFs, a real materials logo (the current icon is cropped from the old AV wordmark), real photos, and a legal check of the privacy notice.
