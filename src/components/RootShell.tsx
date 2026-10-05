import type { ReactNode } from "react";
import { Inter, IBM_Plex_Sans_Thai } from "next/font/google";
import "@/app/globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LangProvider } from "@/lib/prefs";
import type { Lang } from "@/lib/locale";

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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexThai = IBM_Plex_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
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
      className={`${inter.variable} ${plexThai.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <LangProvider lang={lang}>
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer lang={lang} />
        </LangProvider>
      </body>
    </html>
  );
}
