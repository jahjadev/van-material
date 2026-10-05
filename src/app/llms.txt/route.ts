import { company } from "@/data/company";
import { SITE_URL } from "@/lib/site";
import { absUrl } from "@/lib/locale";
import { allRoutes } from "@/lib/routes";

/**
 * `/llms.txt` — a plain-text brief for AI answer engines and crawlers that
 * summarize sites rather than rank them (the emerging llms.txt convention).
 * Written in English and generated from `company.ts` + `routes.ts` so it
 * can't drift out of sync with the site it describes.
 *
 * No product/grade/industry data modules exist yet (those land in Task 3+),
 * so the product lines below are prose describing the *planned* range from
 * ia.md — deliberately without links, since linking a URL that 404s is
 * worse for an answer engine than not mentioning it. Only paths present in
 * `allRoutes()` are linked.
 */
export const dynamic = "force-static";

const en = (path: string) => absUrl(path, "en");

/**
 * Registration point for Task 3: once product-family/grade data modules
 * exist, append their sections here (and extend `allRoutes()` in
 * `src/lib/routes.ts` so the same pages show up in the sitemap too).
 *
 *   function productLineSections(): string[] {
 *     return materialFamilies.map((f) => `- [${f.nameEn}](${en(`/${f.slug}`)}): ...`);
 *   }
 */
function productLineSections(): string[] {
  // Prose only — no links yet, see module comment above.
  return [
    "- Beryllium Copper (Cu-Be alloys): rod, bar, plate, strip, wire, and " +
      "tube stock, including grades C17200 (Alloy 25), C17300 (Alloy M25), " +
      "C17510 (Alloy 3), and C17500 (Alloy 10).",
    "- MoldMAX (mold-grade beryllium copper): high-conductivity inserts and " +
      "cooling components for plastic injection and blow molds, including " +
      "MoldMAX HH, MoldMAX XL, and Protherm grades.",
    "- ToughMet (copper-nickel-tin alloy): high-strength, anti-galling " +
      "bushings and wear components, including ToughMet 3 and ToughMet " +
      "AT110.",
    "- Chrome Copper (CrCu / CrCuZr): high-conductivity electrode material " +
      "for resistance welding.",
    "- Standard Copper Alloys: C5191, C5210, and C1100 phosphor bronze and " +
      "commercial copper stock.",
    "- Clad Metal and Silver Electrical Contacts: copper/aluminum/copper " +
      "clad metal, and silver electrical contact rivets (AgNi, AgSnO2, " +
      "bi-metal/tri-metal rivets).",
  ];
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
    "Six copper alloy and mold material lines, distributed for industrial " +
      "use (plastic mold, EV, oil & gas, aerospace, automotive, and " +
      "switchgear applications):",
  );
  lines.push("");
  for (const section of productLineSections()) lines.push(section);
  lines.push("");

  lines.push("## Requesting a quote");
  lines.push("");
  lines.push(
    "VAN INTERTRADE sells by quotation; no list prices are published. " +
      `Contact the company by phone (${company.contact.telsDisplay[0]}), ` +
      `LINE (${company.contact.lineId}), or email ` +
      `(${company.contact.email}) to request a quotation.`,
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
