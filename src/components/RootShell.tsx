import type { ReactNode } from "react";
import { Noto_Sans_Thai } from "next/font/google";
import Script from "next/script";
import "@/app/globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Motion";
import { JsonLd, organizationLd, websiteLd } from "@/components/JsonLd";
import { LangProvider } from "@/lib/prefs";
import type { Lang } from "@/lib/locale";
import { searchIndex } from "@/lib/searchIndex";

/**
 * The document shell shared by both root layouts.
 *
 * `src/app` has no `layout.tsx`: Thai (`(th)`) and English (`(en)/en`) are
 * separate route groups, each with its own root layout, because that is the
 * only way to emit a correct `<html lang>` per locale — a nested layout
 * cannot change the `<html>` element. Everything below the `lang` attribute
 * is identical between them, so it lives here instead of being copy-pasted
 * twice.
 */

const notoThai = Noto_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Google Analytics 4 measurement ID (the "VAN-MATERIAL" web stream). */
const GA_ID = "G-4X6TQ9T0LB";

export function RootShell({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  return (
    <html
      lang={lang}
      className={`${notoThai.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        {/* Site-wide entity graph: the one Organization (ORG_ID, shared with
            vaninter.com) and this domain's WebSite. Page-level nodes
            (Product, Article, BreadcrumbList…) reference these by @id. */}
        <JsonLd data={[organizationLd(lang), websiteLd()]} />
        <LangProvider lang={lang}>
          <Nav search={searchIndex(lang)} />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Reveal />
          <Footer lang={lang} />
        </LangProvider>
        {/* GA4, loaded only once the page has finished loading and the
            browser is idle. @next/third-parties' GoogleAnalytics fetched the
            175 KB gtag.js at high priority right after the HTML, and on slow
            phones it sometimes ran before first paint (Lighthouse mobile
            swung 96 → 73, LCP 2.8 s → 5.3 s). Page views on client-side
            navigation are still recorded by GA4's enhanced measurement
            (history changes). Origins are allowlisted in next.config.ts. */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
        <Script id="ga4" strategy="lazyOnload">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
