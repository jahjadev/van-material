import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Allow all crawlers, including the major AI answer-engine bots — AEO
 * (being cited by ChatGPT/Perplexity/Claude) is a stated goal here, so
 * nothing blocks them. `/api/` stays disallowed; it's server routes, not
 * content.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
