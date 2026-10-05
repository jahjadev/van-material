import { ArrowRight } from "lucide-react";
import { LocaleLink } from "@/components/LocaleLink";
import { FaqList } from "@/components/FaqList";
import { PropertyTable } from "@/components/PropertyTable";
import {
  JsonLd,
  breadcrumbLd,
  faqPageLd,
  productLd,
} from "@/components/JsonLd";
import {
  FormsAndApplications,
  HOME,
  ProductHero,
  RfqBand,
  type Crumb,
} from "@/components/ProductParts";
import {
  industryLabels,
  type Faq,
  type ProductFamily,
} from "@/data/products";
import { SITE_URL } from "@/lib/site";
import type { Lang } from "@/lib/locale";

/* Shared page parts (hero, breadcrumbs, RFQ band…) live in ProductParts.tsx. */

/** Build the page's JSON-LD: BreadcrumbList + Product (+ FAQPage). */
export function productPageLd({
  crumbs,
  lang,
  name,
  description,
  path,
  image,
  brand,
  sku,
  faqs,
}: {
  crumbs: Crumb[];
  lang: Lang;
  name: string;
  description: string;
  path: string;
  image: string;
  brand: string;
  sku?: string;
  faqs: Faq[];
}) {
  return [
    breadcrumbLd(crumbs, lang),
    productLd({ name, description, path, image: `${SITE_URL}${image}`, brand, sku }, lang),
    ...(faqs.length
      ? [faqPageLd(faqs.map((f) => ({ q: f.q[lang], a: f.a[lang] })))]
      : []),
  ];
}

/* ------------------------------------------------------------------ */
/* Family page                                                         */
/* ------------------------------------------------------------------ */

export function familyCrumbs(family: ProductFamily, lang: Lang): Crumb[] {
  return [
    { name: HOME[lang], path: "/" },
    { name: family.name[lang], path: `/${family.slug}` },
  ];
}

export function ProductFamilyPage({ family, lang }: { family: ProductFamily; lang: Lang }) {
  const en = lang === "en";
  const crumbs = familyCrumbs(family, lang);
  const rfqHref = `/contact?product=${family.slug}`;
  const propertyRows = family.grades.flatMap((g) =>
    g.properties.map((prop) => ({ grade: g.code, prop })),
  );

  return (
    <>
      <JsonLd
        data={productPageLd({
          crumbs,
          lang,
          name: family.h1[lang],
          description: family.description[lang],
          path: `/${family.slug}`,
          image: family.image.src,
          brand: family.brand,
          faqs: family.faqs,
        })}
      />
      <ProductHero
        family={family}
        lang={lang}
        crumbs={crumbs}
        eyebrow={family.brand === "VAN INTERTRADE" ? family.keyword : `${family.brand} · ${family.keyword}`}
        h1={family.h1[lang]}
        rfqHref={rfqHref}
      >
        <p className="mt-5 text-[17px] leading-relaxed text-secondary">{family.summary[lang]}</p>
      </ProductHero>

      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6 md:py-16">
        {family.body.length > 0 && (
          <div className="max-w-3xl space-y-4 leading-relaxed text-secondary">
            {family.body.map((p) => (
              <p key={p.en}>{p[lang]}</p>
            ))}
          </div>
        )}

        {family.grades.length > 0 && (
          <section aria-labelledby="grades-heading" className="mt-14">
            <h2 id="grades-heading" className="text-xl font-bold text-primary md:text-2xl">
              {en ? `${family.keyword} grades` : `เกรด ${family.keyword}`}
            </h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {family.grades.map((g) => (
                <li key={g.slug}>
                  <LocaleLink
                    href={`/${family.slug}/${g.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent"
                  >
                    <span className="text-lg font-bold text-primary group-hover:text-accent">{g.code}</span>
                    {g.aliases.length > 0 && (
                      <span className="mt-0.5 text-[13px] text-secondary">{g.aliases.slice(0, 2).join(" · ")}</span>
                    )}
                    <span className="mt-3 leading-relaxed text-secondary">{g.tagline[lang]}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      {en ? `View ${g.code}` : `ดู ${g.code}`}
                      <ArrowRight className="size-4" aria-hidden />
                    </span>
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </section>
        )}

        {family.variants.length > 0 && (
          <section aria-labelledby="variants-heading" className="mt-14">
            <h2 id="variants-heading" className="text-xl font-bold text-primary md:text-2xl">
              {en ? "Types and materials" : "ชนิดและวัสดุ"}
            </h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {family.variants.map((v) => (
                <div key={v.name.en} className="rounded-xl border border-line bg-surface p-5">
                  <dt className="font-semibold text-primary">{v.name[lang]}</dt>
                  <dd className="mt-2 leading-relaxed text-secondary">{v.desc[lang]}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <PropertyTable
          rows={propertyRows}
          lang={lang}
          heading={{ th: "เปรียบเทียบค่าทางเทคนิคตามที่ผู้ผลิตเผยแพร่", en: "Published properties by grade" }}
          note={{
            th: "ค่าทั่วไปตามที่ผู้ผลิตเผยแพร่ ระบุแหล่งที่มาทุกค่า ดูเงื่อนไข (temper, รูปแบบ) ในหน้าของแต่ละเกรด",
            en: "Typical values as published by the producer, each with its source. See each grade's page for the temper and form they apply to.",
          }}
        />

        <FormsAndApplications forms={family.forms} applications={family.applications} lang={lang} />

        {family.industries.length > 0 && (
          <section aria-labelledby="industries-heading" className="mt-14">
            <h2 id="industries-heading" className="text-xl font-bold text-primary md:text-2xl">
              {en ? "Industries" : "อุตสาหกรรมที่ใช้"}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {family.industries.map((slug) => (
                <li key={slug}>
                  <LocaleLink
                    href={`/industries/${slug}`}
                    className="inline-flex min-h-10 items-center rounded-full border border-line bg-surface px-4 text-sm text-primary hover:border-accent hover:text-accent"
                  >
                    {industryLabels[slug]?.[lang] ?? slug}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </section>
        )}

        <FaqList faqs={family.faqs} lang={lang} />

        <RfqBand href={rfqHref} lang={lang} subject={family.keyword} />
      </div>
    </>
  );
}
