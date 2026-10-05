import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";
import { SITE_URL } from "@/lib/site";

/**
 * Thai root layout. Thai is served at the bare paths (`/`, `/about`) because
 * those are expected to be the canonical, primary-language URLs — see
 * src/lib/locale.ts. The English mirror lives in the sibling `(en)/en` tree.
 *
 * `metadataBase` resolves every relative URL a page's metadata emits (e.g.
 * OpenGraph images) against `SITE_URL`. `title` here is only the fallback
 * for a route that doesn't call `pageMeta()` (src/lib/seo.ts) — that
 * helper builds each page's full "<title> | VAN INTERTRADE" string itself
 * rather than relying on Next's title-template inheritance, which doesn't
 * reliably span two independent root layouts (see seo.ts).
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "แวน อินเตอร์เทรด | VAN INTERTRADE",
};

export default function ThaiRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="th">{children}</RootShell>;
}
