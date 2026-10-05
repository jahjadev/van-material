import type { Metadata } from "next";
import { HomePage, homeMeta } from "@/components/pages/HomePage";
import { pageMeta } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const LANG = "th" as const;

export const metadata: Metadata = pageMeta({
  ...homeMeta[LANG],
  lang: LANG,
  path: "/",
  image: `${SITE_URL}/images/home-hero.webp`,
});

export default function ThaiHomePage() {
  return <HomePage lang={LANG} />;
}
