import { ArrowLeft, ArrowRight } from "lucide-react";
import { LocaleLink } from "@/components/LocaleLink";
import { FaqList } from "@/components/FaqList";
import { PropertyTable } from "@/components/PropertyTable";
import { JsonLd } from "@/components/JsonLd";
import {
  FormsAndApplications,
  ProductHero,
  RfqBand,
  type Crumb,
} from "@/components/ProductParts";
import { familyCrumbs, productPageLd } from "@/components/ProductFamilyPage";
import type { Grade, ProductFamily } from "@/data/products";
import type { Lang } from "@/lib/locale";

export function GradePage({
  family,
  grade,
  lang,
}: {
  family: ProductFamily;
  grade: Grade;
  lang: Lang;
}) {
  const en = lang === "en";
  const path = `/${family.slug}/${grade.slug}`;
  const crumbs: Crumb[] = [...familyCrumbs(family, lang), { name: grade.code, path }];
  const rfqHref = `/contact?product=${family.slug}&grade=${encodeURIComponent(grade.code)}`;
  const siblings = family.grades.filter((g) => g.slug !== grade.slug);

  return (
    <>
      <JsonLd
        data={productPageLd({
          crumbs,
          lang,
          name: grade.h1[lang],
          description: grade.description[lang],
          path,
          image: family.image.src,
          brand: family.brand,
          sku: grade.code,
          faqs: grade.faqs,
        })}
      />
      <ProductHero
        family={family}
        lang={lang}
        crumbs={crumbs}
        eyebrow={family.brand === "VAN INTERTRADE" ? family.keyword : `${family.brand} · ${family.keyword}`}
        h1={grade.h1[lang]}
        rfqHref={rfqHref}
      >
        {grade.aliases.length > 0 && (
          <p className="mt-3 text-sm text-secondary">
            {en ? "Also known as " : "ชื่อเรียกอื่น: "}
            <span className="font-medium text-primary">{grade.aliases.join(", ")}</span>
          </p>
        )}
        <p className="mt-5 text-[17px] leading-relaxed text-secondary">{grade.summary[lang]}</p>
      </ProductHero>

      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6 md:py-16">
        <PropertyTable
          rows={grade.properties.map((prop) => ({ prop }))}
          lang={lang}
          heading={{ th: `ค่าทางเทคนิคของ ${grade.code}`, en: `${grade.code} properties` }}
          note={grade.propertiesNote}
        />

        <FormsAndApplications forms={grade.forms} applications={grade.applications} lang={lang} />

        <section aria-labelledby="related-heading" className="mt-14">
          <h2 id="related-heading" className="text-xl font-bold text-primary md:text-2xl">
            {en ? `Other ${family.keyword} grades` : `เกรด ${family.keyword} อื่น ๆ`}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {siblings.map((g) => (
              <li key={g.slug}>
                <LocaleLink
                  href={`/${family.slug}/${g.slug}`}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line bg-surface px-4 text-sm font-medium text-primary hover:border-accent hover:text-accent"
                >
                  {g.code}
                  <ArrowRight className="size-3.5" aria-hidden />
                </LocaleLink>
              </li>
            ))}
          </ul>
          <LocaleLink
            href={`/${family.slug}`}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {en ? `All ${family.name.en}` : `${family.name.th} ทั้งหมด`}
          </LocaleLink>
        </section>

        <FaqList faqs={grade.faqs} lang={lang} />

        <RfqBand href={rfqHref} lang={lang} subject={grade.code} />
      </div>
    </>
  );
}
