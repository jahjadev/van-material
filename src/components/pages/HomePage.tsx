import Image from "next/image";
import { LocaleLink } from "@/components/LocaleLink";
import { FaqList } from "@/components/FaqList";
import { ArticleCards } from "@/components/ArticlePage";
import { HeroScroll } from "@/components/Motion";
import { JsonLd, faqPageLd } from "@/components/JsonLd";
import { Arrow, RfqBand, btnPrimary, linkArrow, wrap } from "@/components/ProductParts";
import { articles } from "@/data/articles";
import { company } from "@/data/company";
import { industries } from "@/data/industries";
import { families, getFamily, type Bi, type Faq } from "@/data/products";
import type { Lang } from "@/lib/locale";

/*
 * Home page. "Materion distributor" wording follows the client's own legacy
 * copy ("ตัวแทนจำหน่ายอย่างเป็นทางการของ Materion ในประเทศไทย"); no
 * "exclusive/only/sole" claim and no partnership year (company.materion.since
 * is null). FAQ answers are generated from company.ts and product data so
 * they cannot drift from what the rest of the site states.
 */

export const homeMeta: Record<Lang, { title: string; description: string }> = {
  th: {
    title: "ตัวแทนจำหน่าย Materion ประเทศไทย โลหะผสมทองแดง",
    description:
      `แวน อินเตอร์เทรด (ก่อตั้ง พ.ศ. ${company.foundedYearBE}) ตัวแทนจำหน่าย Materion ในประเทศไทย: Beryllium Copper, MoldMAX และ ToughMet สำหรับแม่พิมพ์และอุตสาหกรรม ขอใบเสนอราคาได้`,
  },
  en: {
    title: "Materion Distributor Thailand: Copper Alloys",
    description:
      `VAN INTERTRADE (est. ${company.foundedYearCE}), a Materion distributor in Thailand: beryllium copper, MoldMAX and ToughMet for molds and industry, plus contacts and clad metal.`,
  },
};

const t = company.contact;

/** "a, b and c" / "a, b และ c" */
function joinList(items: string[], lang: Lang): string {
  if (items.length <= 1) return items.join("");
  const and = lang === "en" ? " and " : " และ ";
  return `${items.slice(0, -1).join(", ")}${and}${items[items.length - 1]}`;
}

function homeFaqs(): Faq[] {
  const materion = families.filter((f) => f.brand === "Materion");
  const materionList = (lang: Lang) =>
    joinList(
      materion.map((f) => `${f.keyword} (${f.grades.map((g) => g.code).join(", ")})`),
      lang,
    );

  const becu = getFamily("beryllium-copper")!;
  const tm = getFamily("toughmet")!;
  const forms = (items: Bi[], lang: Lang) =>
    joinList(items.map((f) => (lang === "en" ? f.en.toLowerCase() : f.th)), lang);

  return [
    {
      q: { th: "แวน อินเตอร์เทรด คือใคร?", en: "Who is VAN INTERTRADE?" },
      a: {
        th: `${company.legalNameTh} (${company.legalNameEn}) เป็นบริษัทในกรุงเทพฯ ก่อตั้งเมื่อ พ.ศ. ${company.foundedYearBE} และเป็นตัวแทนจำหน่าย Materion ในประเทศไทย จัดหาโลหะผสมทองแดงและวัสดุแม่พิมพ์ให้อุตสาหกรรมไทย`,
        en: `${company.legalNameEn} is a Bangkok company founded in ${company.foundedYearCE} and a Materion distributor in Thailand, supplying copper alloys and mold materials to Thai industry.`,
      },
    },
    {
      q: {
        th: "แวน อินเตอร์เทรด จำหน่ายสินค้า Materion อะไรบ้าง?",
        en: "Which Materion products does VAN INTERTRADE supply?",
      },
      a: {
        th: `${materionList("th")} นอกจากนี้ยังมีหน้าสัมผัสไฟฟ้าของ Longsun ทองแดงโครเมียม โลหะประกบ และโลหะผสมทองแดงมาตรฐาน`,
        en: `${materionList("en")}. VAN INTERTRADE also supplies Longsun electrical contacts, chrome copper, clad metal and standard copper alloys.`,
      },
    },
    {
      q: { th: "มีวัสดุในรูปแบบใดบ้าง?", en: "In what forms are the materials available?" },
      a: {
        th: `Materion ผลิต Beryllium Copper เป็น${forms(becu.forms, "th")} และผลิต ToughMet เป็น${forms(tm.forms, "th")} ขนาดและรูปแบบที่จัดหาได้ยืนยันในใบเสนอราคา`,
        en: `Materion produces beryllium copper as ${forms(becu.forms, "en")}, and ToughMet as ${forms(tm.forms, "en")}. Available sizes and forms are confirmed in your quotation.`,
      },
    },
    {
      q: { th: "ขอใบเสนอราคาได้อย่างไร?", en: "How do I get a quote?" },
      a: {
        th: `แจ้งเกรด รูปแบบ ขนาด และจำนวนที่ต้องการผ่านแบบฟอร์มขอใบเสนอราคาในหน้าติดต่อเรา โทร ${t.telsDisplay[0]} LINE ${t.lineId} หรืออีเมล ${t.email} ราคาเสนอเป็นใบเสนอราคาต่อครั้ง`,
        en: `Send the grade, form, size and quantity through the quote request form on the contact page, call ${t.telsDisplay[0]}, message LINE ${t.lineId} or email ${t.email}. Prices are quoted per enquiry.`,
      },
    },
  ];
}

/*
 * Copy below follows the Claude Design prototype ("VAN Intertrade",
 * 2026-10-06). Its two headline categories are Beryllium Copper and Mold
 * Materials (MoldMAX); the other product lines are listed under them so
 * every family page is still one click from home.
 */
const L = {
  h1: { th: ["ความแม่นยำ", "เริ่มที่วัสดุ"], en: ["Precision", "starts with material"] },
  sub: { th: "ทองแดงอัลลอยและวัสดุแม่พิมพ์ สำหรับงานอุตสาหกรรม", en: "Copper alloys and mold materials for industrial work" },
  heroAlt: { th: "แผ่น บล็อก และแท่งทองแดงอัลลอย", en: "Copper alloy plate, block and rod" },
  statement: { th: ["ตัวแทนจำหน่าย Materion", "ในประเทศไทย"], en: ["Materion distributor", "in Thailand"] },
  choose: { th: ["เลือกวัสดุ", "ให้ตรงกับงาน"], en: ["Choose the material", "that fits the job"] },
  chooseSub: {
    th: "ทองแดงอัลลอยและวัสดุแม่พิมพ์ ที่ตอบโจทย์งานอุตสาหกรรมของคุณ",
    en: "Copper alloys and mold materials for your industrial applications.",
  },
  more: { th: "โลหะผสมทองแดงอื่น ๆ", en: "More copper alloys" },
} satisfies Record<string, Bi | { th: string[]; en: string[] }>;

const featured: { slug: string; img: string; eyebrow: string; name: Bi; alt: Bi }[] = [
  {
    slug: "beryllium-copper",
    img: "/images/design/becu-rods.png",
    eyebrow: "BERYLLIUM COPPER",
    name: { th: "ทองแดงเบริลเลียม", en: "Beryllium Copper" },
    alt: { th: "แท่งทองแดงเบริลเลียม", en: "Beryllium copper rods" },
  },
  {
    slug: "moldmax",
    img: "/images/design/mold-plate.png",
    eyebrow: "MOLD MATERIALS",
    name: { th: "วัสดุแม่พิมพ์", en: "Mold Materials" },
    alt: { th: "แผ่นแม่พิมพ์ทองแดงที่ผ่านการกัดขึ้นรูป", en: "Machined copper mold plate" },
  },
];

const strip: { t: Bi; s: Bi; href: string }[] = [
  {
    t: { th: "วัสดุและเกรด", en: "Materials & grades" },
    s: { th: "เลือกวัสดุที่เหมาะกับงานของคุณ", en: "Find the material for your job" },
    href: "/#materials",
  },
  {
    t: { th: "การใช้งาน", en: "Applications" },
    s: { th: "แนวทางการใช้งานในอุตสาหกรรม", en: "Industrial use guidance" },
    href: "/#applications",
  },
  {
    t: { th: "ความรู้ด้านวัสดุ", en: "Material knowledge" },
    s: { th: "บทความและข้อมูลที่คุณควรรู้", en: "Articles worth reading" },
    href: "/knowledge",
  },
];

export function HomePage({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const faqs = homeFaqs();
  const others = families.filter((f) => !featured.some((x) => x.slug === f.slug));

  return (
    <>
      <JsonLd
        // Organization + WebSite are emitted site-wide by RootShell.
        data={[faqPageLd(faqs.map((f) => ({ q: f.q[lang], a: f.a[lang] })))]}
      />

      {/* Hero: scroll-driven video (prototype v2 + Apple-style scrubbing). */}
      <HeroScroll
        alt={L.heroAlt[lang]}
        intro={
          <div className="flex max-w-[620px] flex-col gap-[22px]">
            <p className="m-0 font-mono text-[12px] tracking-[.32em] text-body">VAN MATERIALS</p>
            <h1
              id="hero-h"
              className="m-0 text-[clamp(52px,7.4vw,112px)] leading-[1.14] font-extrabold tracking-[-.01em] text-primary"
            >
              <span className="block">{L.h1[lang][0]}</span>
              <span className="block">{L.h1[lang][1]}</span>
            </h1>
            <p className="m-0 max-w-[480px] text-[clamp(18px,1.7vw,22px)] leading-[1.6] text-body [text-wrap:pretty]">
              {L.sub[lang]}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-7 gap-y-3.5">
              <LocaleLink href="/contact#rfq" className={btnPrimary}>
                {en ? "Request a quote" : "ขอใบเสนอราคา"}
                <Arrow />
              </LocaleLink>
              <a href="#materials" className={`${linkArrow} py-3.5`}>
                {en ? "Explore materials" : "สำรวจวัสดุ"}
                <Arrow />
              </a>
            </div>
          </div>
        }
        statement={
          <div className="flex max-w-[640px] flex-col gap-5">
            <p className="m-0 font-mono text-[12px] tracking-[.32em] text-body">MATERION DISTRIBUTOR THAILAND</p>
            <p className="m-0 text-[clamp(40px,5.4vw,80px)] leading-[1.15] font-extrabold tracking-[-.01em] text-primary">
              <span className="block">{L.statement[lang][0]}</span>
              <span className="block">{L.statement[lang][1]}</span>
            </p>
            <p className="m-0 font-mono text-[13px] tracking-[.14em] text-body">BERYLLIUM COPPER · MOLDMAX · TOUGHMET</p>
          </div>
        }
        captions={
          <div className={`${wrap} flex items-center justify-between gap-4 font-mono text-[11px] tracking-[.28em] text-body`}>
            <span className="flex items-center gap-3">
              <span className="h-7 w-px bg-primary opacity-50" />
              SCROLL
            </span>
            <span>COPPER ALLOYS · PRECISION MATERIALS</span>
          </div>
        }
      />

      {/* Choose the material */}
      <section id="materials" aria-labelledby="choose-h" className="scroll-mt-20 border-y border-line bg-tint">
        <div
          className={`${wrap} grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-end gap-[clamp(28px,3vw,40px)] pt-[clamp(48px,6vw,80px)]`}
        >
          <div data-reveal="0" className="flex flex-col gap-[18px] self-center">
            <h2 id="choose-h" className="m-0 text-[clamp(36px,4.2vw,56px)] leading-[1.2] font-extrabold text-primary">
              <span className="block">{L.choose[lang][0]}</span>
              <span className="block">{L.choose[lang][1]}</span>
            </h2>
            <p className="m-0 max-w-[380px] text-[18px] leading-[1.65] text-secondary [text-wrap:pretty]">{L.chooseSub[lang]}</p>
          </div>
          {featured.map((c, i) => (
            <LocaleLink
              key={c.slug}
              href={`/${c.slug}`}
              data-reveal={i + 1}
              className="zoom-card arrow-link flex flex-col gap-3.5 text-primary hover:text-primary"
            >
              <span className="reveal-frame block aspect-[314/191] overflow-hidden rounded-[4px] bg-[#E4E8EE]">
                <Image
                  src={c.img}
                  width={314}
                  height={191}
                  alt={c.alt[lang]}
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="zoom size-full object-cover"
                />
              </span>
              <span className="font-mono text-[11.5px] tracking-[.24em]">{c.eyebrow}</span>
              <span className="-mt-1.5 flex items-center gap-3.5 text-[22px] font-bold">
                {c.name[lang]}
                <span aria-hidden className="arrow text-accent">→</span>
              </span>
            </LocaleLink>
          ))}
        </div>

        <div className={`${wrap} pb-[clamp(48px,6vw,80px)] pt-12`}>
          <p className="eyebrow m-0 mb-3">{L.more[lang]}</p>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-8 p-0">
            {others.map((f, i) => (
              <li key={f.slug} data-reveal={i % 3} className="border-t border-line-strong">
                <LocaleLink
                  href={`/${f.slug}`}
                  className="arrow-link flex items-center justify-between gap-3 py-[18px] text-primary hover:text-primary"
                >
                  <span className="flex flex-col">
                    <span className="text-[19px] font-bold">{f.name[lang]}</span>
                    <span className="font-mono text-[12px] text-secondary">
                      {f.brand ? `${f.brand} · ${f.keyword}` : f.keyword}
                    </span>
                  </span>
                  <span aria-hidden className="arrow text-accent">→</span>
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quick links */}
      <nav aria-label={en ? "Main navigation" : "เมนูหลัก"} className={`${wrap} py-[clamp(28px,3vw,40px)]`}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] [clip-path:inset(0_0_0_1px)]">
          {strip.map((it, i) => (
            <LocaleLink
              key={it.href}
              href={it.href}
              data-reveal={i}
              className="arrow-link flex items-center justify-between gap-4 border-l border-line px-[clamp(16px,2.6vw,36px)] py-5 text-primary hover:text-primary"
            >
              <span className="flex flex-col gap-1">
                <span className="text-[20px] font-bold">{it.t[lang]}</span>
                <span className="text-[14.5px] text-secondary">{it.s[lang]}</span>
              </span>
              <span aria-hidden className="arrow text-[22px] text-accent">→</span>
            </LocaleLink>
          ))}
        </div>
      </nav>

      {/* Applications */}
      <section id="applications" aria-labelledby="apps-h" className="scroll-mt-20 border-t border-line">
        <div
          className={`${wrap} grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-[clamp(28px,5vw,72px)] py-[clamp(56px,7vw,96px)]`}
        >
          <div data-reveal="0" className="flex flex-col gap-3.5">
            <p className="eyebrow m-0">APPLICATIONS</p>
            <h2 id="apps-h" className="m-0 text-[clamp(32px,3.6vw,48px)] leading-[1.2] font-extrabold text-primary">
              {en ? "Applications" : "การใช้งาน"}
            </h2>
            <p className="m-0 max-w-[420px] text-[17px] leading-[1.65] text-secondary [text-wrap:pretty]">
              {en
                ? "Industries that use beryllium copper and mold materials, and the grades to ask about."
                : "อุตสาหกรรมที่ใช้ทองแดงเบริลเลียมและวัสดุแม่พิมพ์ และเกรดที่ควรสอบถาม"}
            </p>
          </div>
          <ul className="m-0 list-none border-b border-line p-0">
            {industries.map((ind, i) => (
              <li key={ind.slug} data-reveal={i} className="border-t border-line">
                <LocaleLink
                  href={`/industries/${ind.slug}`}
                  className="arrow-link flex items-center justify-between gap-4 py-5 text-primary hover:text-primary"
                >
                  <span className="text-[18px] font-semibold">{ind.name[lang]}</span>
                  <span className="flex items-center gap-3 whitespace-nowrap text-[14px] text-secondary">
                    <span className="hidden sm:inline">
                      {ind.fits
                        .slice(0, 2)
                        .map((fit) => getFamily(fit.family)?.keyword)
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                    <span aria-hidden className="arrow text-accent">→</span>
                  </span>
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Supplier + FAQ */}
      <section aria-labelledby="seo-h" className="border-y border-line bg-tint">
        <div
          className={`${wrap} grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-[clamp(32px,5vw,72px)] py-[clamp(56px,7vw,96px)]`}
        >
          <div data-reveal="0" className="flex flex-col gap-5">
            <p className="eyebrow m-0">BERYLLIUM COPPER SUPPLIER THAILAND</p>
            <h2 id="seo-h" className="m-0 text-[clamp(30px,3.4vw,44px)] leading-[1.25] font-extrabold text-primary [text-wrap:balance]">
              {en
                ? "Beryllium copper (BeCu) supplier in Thailand"
                : "ขาย Beryllium Copper (BeCu) สำหรับงานอุตสาหกรรมในประเทศไทย"}
            </h2>
            <p className="m-0 text-[17px] leading-[1.75] text-body [text-wrap:pretty]">
              {en
                ? "VAN INTERTRADE sells beryllium copper and copper alloy materials for molds and industrial components. Browse BeCu grades such as C17200 and C17510, then send your job details for a quotation."
                : "แวน อินเตอร์เทรด ขาย Beryllium Copper และวัสดุทองแดงอัลลอยสำหรับงานแม่พิมพ์และชิ้นส่วนอุตสาหกรรม ดูเกรด BeCu เช่น C17200 และ C17510 แล้วส่งรายละเอียดงานเพื่อขอใบเสนอราคา"}
            </p>
            <p className="m-0 text-[17px] leading-[1.75] text-body [text-wrap:pretty]">
              {en
                ? "Beryllium copper price depends on grade, form, dimensions and quantity. We quote based on the details you send."
                : "ราคา Beryllium Copper ขึ้นอยู่กับเกรด รูปทรง ขนาด และจำนวนที่ต้องการ ทีมงานจะเสนอราคาตามข้อมูลที่คุณส่งมา"}
            </p>
            <div className="flex flex-col gap-1.5 border-t border-line-strong pt-[18px]">
              <h3 className="m-0 text-[18px] font-bold text-primary">{en ? "Materion distributor" : "ตัวแทนจำหน่าย Materion"}</h3>
              <p className="m-0 text-[16px] leading-[1.7] text-body [text-wrap:pretty]">
                {en
                  ? `VAN INTERTRADE, a Bangkok company founded in ${company.foundedYearCE}, is a Materion distributor in Thailand for beryllium copper, MoldMAX and ToughMet. It also supplies chrome copper, clad metal, Longsun electrical contacts and standard copper alloys.`
                  : `แวน อินเตอร์เทรด บริษัทในกรุงเทพฯ ก่อตั้งเมื่อ พ.ศ. ${company.foundedYearBE} เป็นตัวแทนจำหน่าย Materion ในประเทศไทย สำหรับ Beryllium Copper, MoldMAX และ ToughMet และยังจัดหาทองแดงโครเมียม โลหะประกบ หน้าสัมผัสไฟฟ้า Longsun และโลหะผสมทองแดงมาตรฐาน`}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-7 gap-y-2">
              <LocaleLink href="/beryllium-copper" className={linkArrow}>
                {en ? "View beryllium copper grades" : "ดูเกรดทองแดงเบริลเลียม"}
                <Arrow />
              </LocaleLink>
              <LocaleLink href="/about" className={linkArrow}>
                {en ? "About VAN INTERTRADE" : "เกี่ยวกับเรา"}
                <Arrow />
              </LocaleLink>
            </div>
          </div>
          <FaqList faqs={faqs} lang={lang} className="" heading={en ? "FAQ" : "คำถามที่พบบ่อย"} />
        </div>
      </section>

      {/* Knowledge */}
      <section aria-labelledby="art-h" className={`${wrap} pt-[clamp(56px,7vw,96px)]`}>
        <div data-reveal="0" className="flex flex-wrap items-end justify-between gap-5">
          <h2 id="art-h" className="m-0 text-[clamp(32px,3.6vw,48px)] leading-[1.2] font-extrabold text-primary">
            {en ? "Material knowledge" : "ความรู้ด้านวัสดุ"}
          </h2>
          <LocaleLink href="/knowledge" className={linkArrow}>
            {en ? "All articles" : "บทความทั้งหมด"}
            <Arrow />
          </LocaleLink>
        </div>
        <ArticleCards items={articles.slice(0, 3)} lang={lang} />
      </section>

      <div className={`${wrap} pb-[clamp(56px,7vw,96px)]`}>
        <RfqBand
          href="/contact#rfq"
          lang={lang}
          subject=""
          title={en ? "Ready for your next job" : "พร้อมสำหรับงานถัดไปของคุณ"}
          body={en ? "Let us help you choose the right material." : "ให้เราช่วยแนะนำวัสดุที่เหมาะสมกับงานของคุณ"}
        />
      </div>
    </>
  );
}
