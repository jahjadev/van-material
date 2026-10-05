import type { Metadata } from "next";
import { PrivacyPage, privacyMeta } from "@/components/pages/PrivacyPage";
import { pageMeta } from "@/lib/seo";

const LANG = "en" as const;

export const metadata: Metadata = pageMeta({
  ...privacyMeta[LANG],
  lang: LANG,
  path: "/privacy",
});

export default function EnglishPrivacyRoute() {
  return <PrivacyPage lang={LANG} />;
}
