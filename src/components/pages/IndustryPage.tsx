import { ArrowRight } from "lucide-react";
import { LocaleLink } from "@/components/LocaleLink";
import { FaqList } from "@/components/FaqList";
import { PropertyTable } from "@/components/PropertyTable";
import { JsonLd, breadcrumbLd, faqPageLd } from "@/components/JsonLd";
import { BulletSection, HOME, PageHero, RfqBand, type Crumb } from "@/components/ProductParts";
import { getFamily } from "@/data/products";
import type { Industry } from "@/data/industries";
import type { Lang } from "@/lib/locale";

export function industryCrumbs(ind: Industry, lang: Lang): Crumb[] {
  return [
    { name: HOME[lang], path: "/" },
    { name: ind.name[lang], path: `/industries/${ind.slug}` },
  ];
}

/** Hostname-only link text for a cited source URL. */
const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");

export function IndustryPage({ industry: ind, lang }: { industry: Industry; lang: Lang }) {
  const en = lang === "en";
  const crumbs = industryCrumbs(ind, lang);
  const firstFamily = ind.fits[0]?.family;
  const rfqHref = firstFamily ? `/contact?product=${firstFamily}` : "/contact";

  const compareFamily = ind.compare ? getFamily(ind.compare.family) : undefined;
  const compareRows =
    ind.compare && compareFamily
      ? compareFamily.grades.flatMap((g) =>
          g.properties
            .filter((p) => ind.compare!.labels.includes(p.label.en))
            .map((prop) => ({ grade: g.code, prop })),
        )
      : [];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(crumbs, lang),
          ...(ind.faqs.length ? [faqPageLd(ind.faqs.map((f) => ({ q: f.q[lang], a: f.a[lang] })))] : []),
        ]}
      />
      <PageHero
        lang={lang}
        crumbs={crumbs}
        eyebrow={en ? `Industries · ${ind.name.en}` : `อุตสาหกรรม · ${ind.name.th}`}
        h1={ind.h1[lang]}
        rfqHref={rfqHref}
        image={ind.image}
      >
        <p className="mt-5 text-[17px] leading-relaxed text-secondary">{ind.summary[lang]}</p>
      </PageHero>

      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6 md:py-16">
        <div className="max-w-3xl space-y-12">
          {ind.sections.map((s) => (
            <section key={s.heading.en}>
              <h2 className="text-xl font-bold text-primary md:text-2xl">{s.heading[lang]}</h2>
              <div className="mt-4 space-y-4 leading-relaxed text-secondary">
                {s.paras.map((p) => (
                  <p key={p.en}>{p[lang]}</p>
                ))}
              </div>
              {s.bullets && (
                <div className="mt-5">
                  <BulletSection title={s.bullets.title} items={s.bullets.items} lang={lang} />
                </div>
              )}
            </section>
          ))}
        </div>

        <section aria-labelledby="fits-heading" className="mt-14">
          <h2 id="fits-heading" className="text-xl font-bold text-primary md:text-2xl">
            {en ? `Materials for ${ind.name.en.toLowerCase()}` : `วัสดุสำหรับงาน${ind.name.th}`}
          </h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {ind.fits.map((fit) => {
              const fam = getFamily(fit.family)!;
              return (
                <li key={fit.family} className="flex flex-col rounded-xl border border-line bg-surface p-5">
                  <LocaleLink
                    href={`/${fam.slug}`}
                    className="inline-flex items-center gap-1.5 text-lg font-bold text-primary hover:text-accent"
                  >
                    {fam.name[lang]}
                    <ArrowRight className="size-4" aria-hidden />
                  </LocaleLink>
                  <p className="mt-2 leading-relaxed text-secondary">{fit.why[lang]}</p>
                  {fit.grades.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {fit.grades.map((gs) => {
                        const g = fam.grades.find((x) => x.slug === gs)!;
                        return (
                          <li key={gs}>
                            <LocaleLink
                              href={`/${fam.slug}/${g.slug}`}
                              className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm font-medium text-primary hover:border-accent hover:text-accent"
                            >
                              {g.code}
                            </LocaleLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        {ind.compare && (
          <PropertyTable rows={compareRows} lang={lang} heading={ind.compare.heading} note={ind.compare.note} />
        )}

        {ind.sources.length > 0 && (
          <p className="mt-10 text-sm text-secondary">
            {en ? "Sources: " : "แหล่งอ้างอิง: "}
            {ind.sources.map((u, i) => (
              <span key={u}>
                {i > 0 && " · "}
                <a href={u} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-accent">
                  {host(u)}
                  {new URL(u).pathname.split("/").filter(Boolean).slice(-1).map((seg) => ` (${seg})`)}
                </a>
              </span>
            ))}
          </p>
        )}

        <FaqList faqs={ind.faqs} lang={lang} />

        <RfqBand
          href={rfqHref}
          lang={lang}
          subject={ind.name[lang]}
          title={en ? `Choosing a material for ${ind.name.en.toLowerCase()}?` : `กำลังเลือกวัสดุสำหรับงาน${ind.name.th}?`}
          body={
            en
              ? "Tell us the part, the grade or form you have in mind, the size and the quantity, and we will send a quotation."
              : "แจ้งชิ้นงาน เกรดหรือรูปแบบที่ต้องการ ขนาด และจำนวน แล้วเราจะส่งใบเสนอราคาให้"
          }
        />
      </div>
    </>
  );
}
