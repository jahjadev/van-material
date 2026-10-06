import { LocaleLink } from "@/components/LocaleLink";
import { FaqList } from "@/components/FaqList";
import { PropertyTable } from "@/components/PropertyTable";
import { RelatedArticles } from "@/components/ArticlePage";
import { articlesForTopic } from "@/data/articles";
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
  /** Producer; omitted from the Product node when the family names none. */
  brand?: string;
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
        eyebrow={family.brand ? `${family.brand} · ${family.keyword}` : family.keyword}
        h1={family.h1[lang]}
        rfqHref={rfqHref}
      >
        <p>{family.summary[lang]}</p>
      </ProductHero>

      <div className="mx-auto max-w-[1240px] px-[clamp(20px,4vw,48px)] py-[clamp(48px,6vw,80px)]">
        {family.body.length > 0 && (
          <div className="max-w-3xl space-y-4 text-[17px] leading-[1.75] text-body">
            {family.body.map((p) => (
              <p key={p.en}>{p[lang]}</p>
            ))}
          </div>
        )}

        {family.grades.length > 0 && (
          <section aria-labelledby="grades-heading" data-reveal="0" className="mt-16">
            <h2 id="grades-heading" className="text-[clamp(26px,2.8vw,36px)] leading-[1.2] font-extrabold text-primary">
              {en ? `${family.keyword} grades` : `เกรด ${family.keyword}`}
            </h2>
            <ul className="mt-5 border-b border-line">
              {family.grades.map((g, i) => (
                <li key={g.slug} data-reveal={i} className="border-t border-line">
                  <LocaleLink
                    href={`/${family.slug}/${g.slug}`}
                    aria-label={en ? `View ${g.code}` : `ดู ${g.code}`}
                    className="arrow-link grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-5 gap-y-2 py-6 text-primary md:grid-cols-[minmax(140px,220px)_minmax(0,1fr)_auto]"
                  >
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[24px] font-extrabold">{g.code}</span>
                      {g.aliases.length > 0 && (
                        <span className="font-mono text-[12.5px] text-secondary">{g.aliases.slice(0, 2).join(" · ")}</span>
                      )}
                    </span>
                    <span className="col-start-1 row-start-2 text-[16px] leading-[1.6] text-body md:col-start-2 md:row-start-1">
                      {g.tagline[lang]}
                    </span>
                    <span aria-hidden className="arrow col-start-2 row-span-2 row-start-1 text-[22px] text-accent md:col-start-3 md:row-span-1">
                      →
                    </span>
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </section>
        )}

        {family.variants.length > 0 && (
          <section aria-labelledby="variants-heading" data-reveal="0" className="mt-16">
            <h2 id="variants-heading" className="text-[clamp(26px,2.8vw,36px)] leading-[1.2] font-extrabold text-primary">
              {en ? "Types and materials" : "ชนิดและวัสดุ"}
            </h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {family.variants.map((v) => (
                <div key={v.name.en} className="border-t border-line-strong pt-5 pb-2">
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
          <section aria-labelledby="industries-heading" data-reveal="0" className="mt-16">
            <h2 id="industries-heading" className="text-[clamp(26px,2.8vw,36px)] leading-[1.2] font-extrabold text-primary">
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

        <RelatedArticles items={articlesForTopic(family.slug)} lang={lang} />

        <RfqBand href={rfqHref} lang={lang} subject={family.keyword} />
      </div>
    </>
  );
}
