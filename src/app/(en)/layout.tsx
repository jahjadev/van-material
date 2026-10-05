import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";
import { SITE_URL } from "@/lib/site";

/**
 * English root layout, serving the `/en` tree (pages live under `./en/...`).
 *
 * A second root layout (rather than a nested one under the Thai layout) so
 * this tree can emit `<html lang="en">` — a nested layout cannot change the
 * `<html>` element, and shipping `lang="th"` on English pages would
 * misreport the language to search engines, screen readers, and browser
 * translation.
 *
 * See the Thai layout for why `title` here is just a plain fallback string
 * rather than a `template`.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "VAN INTERTRADE | Copper & Mold Alloy Distributor",
};

export default function EnglishRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="en">{children}</RootShell>;
}
