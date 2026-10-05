import type { Metadata } from "next";
import { AboutPage, aboutMeta } from "@/components/pages/AboutPage";
import { pageMeta } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const LANG = "th" as const;

export const metadata: Metadata = pageMeta({
  ...aboutMeta[LANG],
  lang: LANG,
  path: "/about",
  image: `${SITE_URL}/images/about-hero.webp`,
});

export default function ThaiAboutRoute() {
  return <AboutPage lang={LANG} />;
}
