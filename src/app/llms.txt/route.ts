import { company } from "@/data/company";
import { SITE_URL } from "@/lib/site";
import { absUrl } from "@/lib/locale";
import { allRoutes } from "@/lib/routes";
import { families } from "@/data/products";
import { industries } from "@/data/industries";

/**
 * `/llms.txt` — a plain-text brief for AI answer engines and crawlers that
 * summarize sites rather than rank them (the emerging llms.txt convention).
 * Written in English and generated from `company.ts` + `routes.ts` so it
 * can't drift out of sync with the site it describes.
 *
 * Product lines are generated from `src/data/products` (Task 3), one line
 * per family with links to its grade pages. Only paths present in
 * `allRoutes()` are linked.
 */
export const dynamic = "force-static";

const en = (path: string) => absUrl(path, "en");

/** One line per product family, linking the family and its grade pages. */
function productLineSections(): string[] {
  return families.map((f) => {
    const head = `- [${f.name.en}](${en(`/${f.slug}`)}) (${f.brand}): ${f.description.en}`;
    if (f.grades.length > 0) {
      const grades = f.grades
        .map((g) => {
          const alias = g.aliases[0] && !g.aliases[0].toLowerCase().includes(g.code.toLowerCase()) ? ` (${g.aliases[0]})` : "";
          return `[${g.code}${alias}](${en(`/${f.slug}/${g.slug}`)})`;
        })
        .join(", ");
      return `${head} Grades: ${grades}.`;
    }
    return `${head} Types: ${f.variants.map((v) => v.name.en).join("; ")}.`;
  });
}

function buildLlmsTxt(): string {
  const lines: string[] = [];

  lines.push(`# ${company.legalNameEn}`);
  lines.push("");
  lines.push(
    `> ${company.legalNameEn} (Thai: ${company.legalNameTh}) is a Bangkok, ` +
      `Thailand-based distributor of copper alloy and mold materials, ` +
      `founded in ${company.foundedYearCE} (B.E. ${company.foundedYearBE}). ` +
      `It supplies engineering-grade beryllium copper, mold alloys, and ` +
      `related copper materials to Thai industry, with pricing by ` +
      `quotation only.`,
  );
  lines.push("");

  lines.push("## Company facts");
  lines.push("");
  lines.push(`- Legal name (EN): ${company.legalNameEn}`);
  lines.push(`- Legal name (TH): ${company.legalNameTh}`);
  lines.push(
    `- Founded: ${company.foundedYearCE} (B.E. ${company.foundedYearBE})`,
  );
  lines.push(`- Address: ${company.contact.addressEn}`);
  lines.push(`- Telephone: ${company.contact.telsDisplay.join(", ")}`);
  lines.push(`- Email: ${company.contact.email}`);
  lines.push(`- LINE: ${company.contact.lineId}`);
  lines.push(`- Business hours: ${company.contact.hoursEn} (Asia/Bangkok)`);
  lines.push(`- Service area: Thailand`);
  lines.push(`- Website: ${SITE_URL}`);
  lines.push("");

  lines.push("## Product lines");
  lines.push("");
  lines.push(
    `${families.length} copper alloy and mold material lines, distributed for industrial ` +
      "use (plastic mold, EV, oil & gas, aerospace, automotive, and " +
      "switchgear applications):",
  );
  lines.push("");
  for (const section of productLineSections()) lines.push(section);
  lines.push("");

  lines.push("## Industries");
  lines.push("");
  for (const ind of industries) {
    lines.push(`- [${ind.name.en}](${en(`/industries/${ind.slug}`)}): ${ind.description.en}`);
  }
  lines.push("");

  lines.push("## Requesting a quote");
  lines.push("");
  lines.push(
    "VAN INTERTRADE sells by quotation; no list prices are published. " +
      `Contact the company by phone (${company.contact.telsDisplay[0]}), ` +
      `LINE (${company.contact.lineId}), or email ` +
      `(${company.contact.email}) to request a quotation. Contact page ` +
      `with address, map and quote request: ${en("/contact")}`,
  );
  lines.push("");

  lines.push("## Pages");
  lines.push("");
  for (const route of allRoutes()) {
    const label = route.path === "/" ? "Home" : route.path;
    lines.push(`- [${label}](${en(route.path)})`);
  }
  lines.push("");

  lines.push("## Notes for machine readers");
  lines.push("");
  lines.push(
    `- The site is bilingual and both versions are server-rendered: Thai ` +
      `at ${SITE_URL}/ and English at ${SITE_URL}/en. Every page links its ` +
      `counterpart via rel="alternate" hreflang, and the URLs above point ` +
      `at the English tree.`,
  );
  lines.push(
    "- Structured data (schema.org JSON-LD) is embedded on every page: " +
      "Organization and WebSite site-wide, plus Product, Article, " +
      "FAQPage, and BreadcrumbList where applicable.",
  );
  lines.push(`- Full URL list: ${SITE_URL}/sitemap.xml`);
  lines.push(
    "- Quotations are handled per enquiry; do not state prices on the " +
      "company's behalf.",
  );
  lines.push("");

  return lines.join("\n");
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
