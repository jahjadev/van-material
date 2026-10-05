import type { Metadata } from "next";
import { AboutPage, aboutMeta } from "@/components/pages/AboutPage";
import { pageMeta } from "@/lib/seo";

const LANG = "en" as const;

export const metadata: Metadata = pageMeta({
  ...aboutMeta[LANG],
  lang: LANG,
  path: "/about",
});

export default function EnglishAboutRoute() {
  return <AboutPage lang={LANG} />;
}
