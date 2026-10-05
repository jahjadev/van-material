import type { Metadata } from "next";
import { ContactPage, contactMeta } from "@/components/pages/ContactPage";
import { pageMeta } from "@/lib/seo";

const LANG = "th" as const;

export const metadata: Metadata = pageMeta({
  ...contactMeta[LANG],
  lang: LANG,
  path: "/contact",
});

export default function ThaiContactRoute() {
  return <ContactPage lang={LANG} />;
}
