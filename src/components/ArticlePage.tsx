import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
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
        className="font-medium text-accent underline underline-offset-2 hover:text-primary"
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
      return <h2 className="pt-6 text-xl font-bold text-primary md:text-2xl">{b.text[lang]}</h2>;
    case "p":
      return <p>{rich(b.text[lang])}</p>;
    case "ul":
      return (
        <ul className="space-y-2.5">
          {b.items.map((it) => (
            <li key={it.en} className="flex gap-3">
              <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
              <span>{rich(it[lang])}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <figure>
          <div className="overflow-x-auto rounded-xl border border-line bg-surface">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead className="bg-background text-xs uppercase tracking-wide text-secondary">
                <tr>
                  {b.head.map((h) => (
                    <th key={h.en} scope="col" className="px-4 py-3 font-semibold">
                      {h[lang]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, ri) => (
                  <tr key={ri} className="border-t border-line align-top">
                    {row.map((c, ci) =>
                      ci === 0 ? (
                        <th key={ci} scope="row" className="px-4 py-3 font-semibold text-primary">
                          {cell(c, lang)}
                        </th>
                      ) : (
                        <td key={ci} className="px-4 py-3 text-primary">
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
    <div className="max-w-3xl space-y-4 leading-relaxed text-secondary">
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

/** Card list of articles (index page and "Related articles"). */
export function ArticleCards({ items, lang, headingLevel = "h3" }: { items: Article[]; lang: Lang; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ul className="mt-5 grid gap-4 md:grid-cols-2">
      {items.map((a) => (
        <li key={a.slug}>
          <LocaleLink
            href={`/knowledge/${a.slug}`}
            className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent"
          >
            <H className="text-lg leading-snug font-bold text-primary group-hover:text-accent">{a.title[lang]}</H>
            <span className="mt-2 leading-relaxed text-secondary">{a.description[lang]}</span>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              {lang === "en" ? "Read the article" : "อ่านบทความ"}
              <ArrowRight className="size-4" aria-hidden />
            </span>
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
    <section aria-labelledby="related-articles-heading" className="mt-14">
      <h2 id="related-articles-heading" className="text-xl font-bold text-primary md:text-2xl">
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
        <p className="mt-3 text-sm text-secondary">
          {en ? "VAN INTERTRADE · Published " : "แวน อินเตอร์เทรด · เผยแพร่ "}
          <time dateTime={a.date}>{formatDate(a.date, lang)}</time>
          {lastmod !== a.date && (
            <>
              {en ? " · Updated " : " · ปรับปรุง "}
              <time dateTime={lastmod}>{formatDate(lastmod, lang)}</time>
            </>
          )}
        </p>
        <p className="mt-5 text-[17px] leading-relaxed text-secondary">{a.intro[lang]}</p>
      </PageHero>

      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6 md:py-16">
        <article>
          <ArticleBody article={a} lang={lang} />

          <div className="max-w-3xl">
            <FaqList faqs={a.faqs} lang={lang} />

            <section aria-labelledby="refs-heading" className="mt-14">
              <h2 id="refs-heading" className="text-xl font-bold text-primary md:text-2xl">
                {en ? "References" : "แหล่งอ้างอิง"}
              </h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-secondary">
                {a.refs.map((r) => (
                  <li key={r.url}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-words text-accent underline underline-offset-2 hover:text-primary"
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
            <h2 id="more-articles-heading" className="text-xl font-bold text-primary md:text-2xl">
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
        <p className="mt-5 text-[17px] leading-relaxed text-secondary">{m.intro}</p>
      </PageHero>
      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6 md:py-16">
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
