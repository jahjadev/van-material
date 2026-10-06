import type { ReactNode } from "react";
import { LocaleLink } from "@/components/LocaleLink";
import { FaqList } from "@/components/FaqList";
import { PropertyTable } from "@/components/PropertyTable";
import { JsonLd, articleLd, breadcrumbLd, faqPageLd } from "@/components/JsonLd";
import { HOME, PageHero, RfqBand, type Crumb } from "@/components/ProductParts";
import { articleLastmod, articles, KNOWLEDGE, knowledgeMeta, type Article, type Block } from "@/data/articles";
import { getFamily, getGrade, type Bi } from "@/data/products";
import { SITE_URL } from "@/lib/site";
import type { Lang } from "@/lib/locale";

/*
 * Knowledge article page and the /knowledge index. Articles are plain data
 * (src/data/articles); this file renders the typed body blocks, turning
 * `[label](/path)` in text into LocaleLinks so the English tree links into
 * /en. The visible FAQ and the FAQPage JSON-LD are built from the same
 * `faqs` array with the same `[lang]` strings.
 */

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Text with `[label](/path)` links → nodes. */
function rich(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    out.push(
      <LocaleLink
        key={i}
        href={m[2]}
        className="font-medium text-link hover:underline"
      >
        {m[1]}
      </LocaleLink>,
    );
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const cell = (c: string | Bi, lang: Lang) => (typeof c === "string" ? c : c[lang]);

function BodyBlock({ block: b, lang }: { block: Block; lang: Lang }) {
  switch (b.t) {
    case "h2":
      return <h2 className="pt-6 text-[clamp(22px,2.2vw,26px)] leading-[1.35] font-bold text-primary">{b.text[lang]}</h2>;
    case "p":
      return <p>{rich(b.text[lang])}</p>;
    case "ul":
      return (
        <ul className="space-y-2.5">
          {b.items.map((it) => (
            <li key={it.en} className="flex gap-3">
              <span aria-hidden className="mt-3.5 h-px w-3 shrink-0 bg-accent" />
              <span>{rich(it[lang])}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <figure>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-[15px] leading-normal">
              <thead className="text-[12px] font-semibold text-secondary">
                <tr>
                  {b.head.map((h) => (
                    <th key={h.en} scope="col" className="border-b border-line px-3 py-3 font-medium first:pl-0">
                      {h[lang]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-line align-top">
                    {row.map((c, ci) =>
                      ci === 0 ? (
                        <th key={ci} scope="row" className="py-3.5 pl-0 pr-3 font-bold text-primary">
                          {cell(c, lang)}
                        </th>
                      ) : (
                        <td key={ci} className="px-3 py-3.5 text-primary">
                          {cell(c, lang)}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <figcaption className="mt-2 text-sm text-secondary">{b.note[lang]}</figcaption>
        </figure>
      );
    case "props": {
      const rows = b.grades.flatMap(({ family, grade }) => {
        const g = getGrade(family, grade)!.grade;
        return g.properties.map((prop) => ({ grade: g.code, prop }));
      });
      return <PropertyTable rows={rows} lang={lang} heading={b.heading} note={b.note} />;
    }
  }
}

function ArticleBody({ article, lang }: { article: Article; lang: Lang }) {
  return (
    <div className="max-w-3xl space-y-5 text-[18px] leading-[1.85] text-body">
      {article.body.map((b, i) => (
        <BodyBlock key={i} block={b} lang={lang} />
      ))}
    </div>
  );
}

function formatDate(iso: string, lang: Lang) {
  // Fixed calendar for both: Thai readers of a B2B engineering page are used
  // to Gregorian dates in technical documents, and it keeps /en Thai-free.
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "th-TH-u-ca-gregory", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function articleCrumbs(a: Article, lang: Lang): Crumb[] {
  return [
    { name: HOME[lang], path: "/" },
    { name: KNOWLEDGE[lang], path: "/knowledge" },
    { name: a.title[lang], path: `/knowledge/${a.slug}` },
  ];
}

/** Row list of articles (index page, home page and "Related articles"). */
export function ArticleCards({ items, lang, headingLevel = "h3" }: { items: Article[]; lang: Lang; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ul className="mt-6 border-b border-line">
      {items.map((a, i) => (
        <li key={a.slug} data-reveal={i} className="border-t border-line">
          <LocaleLink
            href={`/knowledge/${a.slug}`}
            className="arrow-link grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 py-6 text-primary"
          >
            <span className="flex flex-col gap-1.5">
              <H className="m-0 text-[clamp(19px,1.8vw,23px)] font-bold [text-wrap:pretty]">{a.title[lang]}</H>
              <span className="text-[15.5px] text-secondary [text-wrap:pretty]">{a.description[lang]}</span>
            </span>
            <span aria-hidden className="arrow text-[22px] text-accent">›</span>
          </LocaleLink>
        </li>
      ))}
    </ul>
  );
}

/**
 * "Related articles" section for family and grade pages. Renders nothing
 * when the list is empty.
 */
export function RelatedArticles({ items, lang }: { items: Article[]; lang: Lang }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="related-articles-heading" data-reveal="0" className="mt-16">
      <h2 id="related-articles-heading" className="text-[clamp(26px,2.8vw,36px)] leading-[1.2] font-semibold text-primary">
        {lang === "en" ? "Related articles" : "บทความที่เกี่ยวข้อง"}
      </h2>
      <ArticleCards items={items} lang={lang} />
    </section>
  );
}

export function ArticlePage({ article: a, lang }: { article: Article; lang: Lang }) {
  const en = lang === "en";
  const path = `/knowledge/${a.slug}`;
  const crumbs = articleCrumbs(a, lang);
  const family = getFamily(a.topic[0])!;
  const rfqHref = `/contact?product=${family.slug}`;
  const related = articles.filter((x) => x.slug !== a.slug && x.topic.some((t) => a.topic.includes(t)));
  const lastmod = articleLastmod(a);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(crumbs, lang),
          articleLd(
            {
              title: a.h1[lang],
              description: a.description[lang],
              path,
              image: `${SITE_URL}${a.image}`,
              date: a.date,
              modified: lastmod,
            },
            lang,
          ),
          ...(a.faqs.length ? [faqPageLd(a.faqs.map((f) => ({ q: f.q[lang], a: f.a[lang] })))] : []),
        ]}
      />
      <PageHero lang={lang} crumbs={crumbs} eyebrow={KNOWLEDGE[lang]} h1={a.h1[lang]}>
        <p className="!text-[15px] text-secondary">
          {en ? "VAN INTERTRADE · Published " : "แวน อินเตอร์เทรด · เผยแพร่ "}
          <time dateTime={a.date}>{formatDate(a.date, lang)}</time>
          {lastmod !== a.date && (
            <>
              {en ? " · Updated " : " · ปรับปรุง "}
              <time dateTime={lastmod}>{formatDate(lastmod, lang)}</time>
            </>
          )}
        </p>
        <p>{a.intro[lang]}</p>
      </PageHero>

      <div className="mx-auto max-w-[1240px] px-[clamp(20px,4vw,48px)] py-[clamp(48px,6vw,80px)]">
        <article>
          <ArticleBody article={a} lang={lang} />

          <div className="max-w-3xl">
            <FaqList faqs={a.faqs} lang={lang} />

            <section aria-labelledby="refs-heading" className="mt-14">
              <h2 id="refs-heading" className="text-[clamp(26px,2.8vw,36px)] leading-[1.2] font-semibold text-primary">
                {en ? "References" : "แหล่งอ้างอิง"}
              </h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-secondary">
                {a.refs.map((r) => (
                  <li key={r.url}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-words text-link hover:underline"
                    >
                      {r.title}
                    </a>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-sm text-secondary">
                {en
                  ? "Sources read on 5 October 2026. Producer data changes; confirm values against the current datasheet before design."
                  : "อ่านแหล่งข้อมูลเมื่อ 5 ตุลาคม 2026 ข้อมูลของผู้ผลิตอาจเปลี่ยนแปลง ตรวจสอบค่ากับ datasheet ฉบับปัจจุบันก่อนออกแบบ"}
              </p>
            </section>
          </div>
        </article>

        {related.length > 0 && (
          <section aria-labelledby="more-articles-heading" className="mt-14">
            <h2 id="more-articles-heading" className="text-[clamp(26px,2.8vw,36px)] leading-[1.2] font-semibold text-primary">
              {en ? "Related articles" : "บทความที่เกี่ยวข้อง"}
            </h2>
            <ArticleCards items={related} lang={lang} />
          </section>
        )}

        <RfqBand href={rfqHref} lang={lang} subject={family.keyword} />
      </div>
    </>
  );
}

export function KnowledgeIndexPage({ lang }: { lang: Lang }) {
  const m = knowledgeMeta[lang];
  const crumbs: Crumb[] = [
    { name: HOME[lang], path: "/" },
    { name: KNOWLEDGE[lang], path: "/knowledge" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs, lang)} />
      <PageHero lang={lang} crumbs={crumbs} eyebrow={KNOWLEDGE[lang]} h1={m.h1}>
        <p>{m.intro}</p>
      </PageHero>
      <div className="mx-auto max-w-[1240px] px-[clamp(20px,4vw,48px)] py-[clamp(48px,6vw,80px)]">
        <section aria-label={lang === "en" ? "All articles" : "บทความทั้งหมด"}>
          <ArticleCards items={articles} lang={lang} headingLevel="h2" />
        </section>
        <RfqBand
          href="/contact"
          lang={lang}
          subject=""
          title={lang === "en" ? "Have a question these articles don't answer?" : "มีคำถามที่บทความเหล่านี้ยังไม่ได้ตอบ?"}
          body={
            lang === "en"
              ? "Tell us the part and what it needs to do, and we will help you pick a grade and send a quotation."
              : "แจ้งชิ้นงานและสิ่งที่ชิ้นงานต้องทำ แล้วเราจะช่วยเลือกเกรดและส่งใบเสนอราคาให้"
          }
        />
      </div>
    </>
  );
}
