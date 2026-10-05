import type { Metadata } from "next";
import { ContactPage, contactMeta } from "@/components/pages/ContactPage";
import { pageMeta } from "@/lib/seo";

const LANG = "en" as const;

export const metadata: Metadata = pageMeta({
  ...contactMeta[LANG],
  lang: LANG,
  path: "/contact",
});

export default function EnglishContactRoute() {
  return <ContactPage lang={LANG} />;
}
