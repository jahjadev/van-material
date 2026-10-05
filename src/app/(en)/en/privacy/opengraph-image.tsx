import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogCard";
import { privacyMeta } from "@/components/pages/PrivacyPage";
import { SITE_NAME_TH, SITE_NAME_EN } from "@/lib/site";

const LANG = "en" as const;

export const alt = `${privacyMeta[LANG].title} — VAN INTERTRADE`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    eyebrowTh: SITE_NAME_TH,
    eyebrowEn: SITE_NAME_EN,
    title: privacyMeta[LANG].title,
    subtitle: privacyMeta[LANG].description,
  });
}
