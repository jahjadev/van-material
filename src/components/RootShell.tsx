import type { ReactNode } from "react";
import { IBM_Plex_Mono, Noto_Sans_Thai } from "next/font/google";
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
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

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
      className={`${notoThai.variable} ${plexMono.variable} h-full antialiased`}
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
      </body>
    </html>
  );
}
