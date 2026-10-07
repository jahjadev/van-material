import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy.
 *
 * Deliberately **nonce-free**, and that is the whole design decision. Next only
 * injects a nonce while server-side rendering, so a nonce-based CSP forces every
 * page dynamic — it disables static generation, ISR and CDN caching (see
 * node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md).
 * Every page here is prerendered, and that is what holds mobile LCP low for a
 * site read mostly from Thailand, where TTFB already dominates. Trading that
 * for the policy below would be a bad bargain. Model: `VAN/next.config.ts`
 * (sibling production site), adjusted for this site's actual external
 * origins — no Cloudflare Turnstile here, but the contact page embeds a
 * Google Maps iframe.
 *
 * Consequence, stated plainly: `script-src` has to allow `'unsafe-inline'`,
 * because the App Router streams its RSC payload through bare inline
 * `<script>` blocks per page whose contents change every build — unhashable
 * and un-noncible while static. So this CSP is **not an XSS backstop**. What
 * it does buy is real but narrower: no plugins (`object-src`), no `<base>`
 * hijack (`base-uri`), no exfiltration by retargeting a form (`form-action`),
 * no framing by third parties, and a closed allowlist of the only external
 * origins the site talks to — Google Analytics 4 (gtag.js, loaded from
 * RootShell) and the Google Maps embed on `/contact`.
 *
 * DO NOT add a hash or nonce to `script-src` alongside `'unsafe-inline'`:
 * browsers ignore `'unsafe-inline'` as soon as either is present, which would
 * block Next's own bootstrap and white-screen the site.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  // Matches the X-Frame-Options: SAMEORIGIN below rather than contradicting it.
  "frame-ancestors 'self'",
  "form-action 'self'",
  // 'unsafe-eval' is React's dev-only error-stack reconstruction; never shipped.
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${isDev ? " 'unsafe-eval'" : ""}`,
  // next/font injects an inline <style>, and React style={{…}} props are style
  // attributes; both need 'unsafe-inline'. Stylesheets themselves are 'self'.
  "style-src 'self' 'unsafe-inline'",
  // data: covers inline SVG/blur placeholders; blob: covers the OG card
  // ImageResponse pipeline. All site bitmaps are same-origin (next.config
  // declares no remote image patterns); the two Google origins are GA4's
  // fallback pixel hits.
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com",
  // next/font/google self-hosts at build time, so no Google Fonts origin.
  "font-src 'self'",
  // GA4 sends its hits here (Google's documented CSP for gtag.js).
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  // The contact-page Google Maps embed is the only iframe on the site.
  "frame-src https://www.google.com",
  "upgrade-insecure-requests",
].join("; ");

/**
 * Baseline security response headers applied to every route.
 */
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Enforce HTTPS on repeat visits (safe once the site is served over TLS).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  /**
   * The OpenGraph cards read their Thai TTF with
   * `readFile(join(process.cwd(), "src/assets/fonts/…"))` (see src/lib/ogCard.tsx).
   * Next's file tracer can't follow a runtime-built `process.cwd()` path, so the
   * font would be missing from the serverless bundle for any card that renders
   * on demand — working locally and 500-ing in production. Every card route is
   * prerendered today, which makes this belt-and-braces; keep it so adding a
   * dynamic card later can't quietly break font loading.
   */
  outputFileTracingIncludes: {
    "/**/opengraph-image": ["./src/assets/fonts/**"],
    "/**/twitter-image": ["./src/assets/fonts/**"],
  },
};

export default nextConfig;
