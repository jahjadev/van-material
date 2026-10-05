import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Allow all crawlers, including the major AI answer-engine bots — AEO
 * (being cited by ChatGPT/Perplexity/Claude) is a stated goal here, so
 * nothing blocks them. `/api/` stays disallowed; it's server routes, not
 * content. A crawler obeys only the most specific group that names it and
 * ignores `*`, so the disallow is repeated in every named bot group.
 */
const AI_BOTS = ["GPTBot", "OAI-SearchBot", "PerplexityBot", "ClaudeBot", "Google-Extended"];
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
