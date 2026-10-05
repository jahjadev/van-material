import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";

/**
 * Thai root layout. Thai is served at the bare paths (`/`, `/about`) because
 * those are expected to be the canonical, primary-language URLs — see
 * src/lib/locale.ts. The English mirror lives in the sibling `(en)/en` tree.
 *
 * Metadata here is intentionally minimal — Task 2 builds the shared
 * `pageMeta()` helper that every page uses for its own title/description.
 */
export const metadata: Metadata = {
  title: "แวน อินเตอร์เทรด | VAN INTERTRADE",
};

export default function ThaiRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="th">{children}</RootShell>;
}
