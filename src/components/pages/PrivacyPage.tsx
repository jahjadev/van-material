import { JsonLd, breadcrumbLd } from "@/components/JsonLd";
import { HOME, PageHero, type Crumb } from "@/components/ProductParts";
import { company } from "@/data/company";
import type { Bi } from "@/data/products";
import type { Lang } from "@/lib/locale";

/*
 * Short PDPA-style notice for the quote request form (Task 5). Plain and
 * factual: what is collected, why, who sees it, how to exercise rights.
 * Flagged in the Task 4 report for client / legal review before launch.
 */

export const privacyMeta: Record<Lang, { title: string; description: string }> = {
  th: {
    title: "นโยบายความเป็นส่วนตัว (PDPA) แบบฟอร์มขอราคา",
    description:
      "นโยบายความเป็นส่วนตัวของ แวน อินเตอร์เทรด สำหรับแบบฟอร์มขอใบเสนอราคา: ข้อมูลที่เก็บ วัตถุประสงค์ การเปิดเผย และวิธีใช้สิทธิตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล",
  },
  en: {
    title: "Privacy Notice for Quote Requests",
    description:
      "How VAN INTERTRADE handles the personal data you send through the quote request form: what we collect, why, who sees it and how to use your PDPA rights.",
  },
};

export const PRIVACY_UPDATED = "2026-10-05";

type Section = { h: Bi; p: Bi[]; list?: Bi[] };

const sections = (): Section[] => [
  {
    h: { th: "ผู้ควบคุมข้อมูล", en: "Who is responsible" },
    p: [
      {
        th: `${company.legalNameTh} (${company.legalNameEn}) ${company.contact.addressTh} เป็นผู้ควบคุมข้อมูลส่วนบุคคลที่คุณส่งผ่านเว็บไซต์นี้`,
        en: `${company.legalNameEn}, ${company.contact.addressEn}, is the data controller for the personal data you send through this website.`,
      },
    ],
  },
  {
    h: { th: "ข้อมูลที่เราเก็บ", en: "What we collect" },
    p: [
      {
        th: "เมื่อคุณส่งคำขอใบเสนอราคา เราเก็บข้อมูลที่คุณกรอกเท่านั้น ได้แก่",
        en: "When you send a quote request we collect only what you enter:",
      },
    ],
    list: [
      { th: "ชื่อ", en: "Your name" },
      { th: "ชื่อบริษัท", en: "Company name" },
      { th: "อีเมล", en: "Email address" },
      { th: "หมายเลขโทรศัพท์", en: "Phone number" },
      { th: "สินค้าหรือเกรดที่สนใจ", en: "The product or grade you are interested in" },
      { th: "ข้อความของคุณ", en: "Your message" },
    ],
  },
  {
    h: { th: "วัตถุประสงค์", en: "Why we use it" },
    p: [
      {
        th: "เราใช้ข้อมูลนี้เพื่อตอบคำขอใบเสนอราคาของคุณ และติดต่อกลับเกี่ยวกับคำขอนั้น ซึ่งเป็นการดำเนินการตามคำขอของคุณก่อนเข้าทำสัญญา เราไม่ใช้ข้อมูลนี้เพื่อการตลาดอื่นโดยไม่ได้รับความยินยอมจากคุณ",
        en: "We use it to answer your quote request and to contact you about that request, which is a step you ask us to take before entering into a contract. We do not use it for other marketing without your consent.",
      },
    ],
  },
  {
    h: { th: "การเปิดเผยข้อมูล", en: "Who sees it" },
    p: [
      {
        th: "ข้อมูลของคุณเข้าถึงได้เฉพาะพนักงานของเราที่ดูแลคำขอ และผู้ให้บริการที่ส่งอีเมลให้เรา เราไม่ขาย ไม่ให้เช่า และไม่แลกเปลี่ยนข้อมูลส่วนบุคคลของคุณกับบุคคลภายนอก",
        en: "Only our staff who handle your request, and the service provider that delivers our email, can see it. We do not sell, rent or trade your personal data to anyone.",
      },
    ],
  },
  {
    h: { th: "ระยะเวลาเก็บรักษา", en: "How long we keep it" },
    p: [
      {
        th: "เราเก็บข้อมูลไว้เท่าที่จำเป็นต่อการดูแลคำขอและการติดต่อธุรกิจที่เกิดขึ้นจากคำขอนั้น หรือตามที่กฎหมายกำหนด แล้วจึงลบ",
        en: "We keep it only as long as needed to handle your request and any business that follows from it, or as the law requires, and then delete it.",
      },
    ],
  },
  {
    h: { th: "สิทธิของคุณ", en: "Your rights" },
    p: [
      {
        th: `ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) คุณมีสิทธิขอเข้าถึง ขอแก้ไข ขอลบ หรือคัดค้านการใช้ข้อมูลของคุณ และถอนความยินยอมที่เคยให้ไว้ ส่งคำขอได้ที่อีเมล ${company.contact.email} หรือโทร ${company.contact.telsDisplay[0]} หากเห็นว่าเราไม่ปฏิบัติตามกฎหมาย คุณมีสิทธิร้องเรียนต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (PDPC)`,
        en: `Under Thailand's Personal Data Protection Act B.E. 2562 (2019) (PDPA) you can ask to access, correct or delete your data, object to its use, and withdraw any consent you gave. Send requests to ${company.contact.email} or call ${company.contact.telsDisplay[0]}. If you believe we have not followed the law, you can complain to the Office of the Personal Data Protection Committee (PDPC).`,
      },
    ],
  },
];

export function PrivacyPage({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const crumbs: Crumb[] = [
    { name: HOME[lang], path: "/" },
    { name: en ? "Privacy" : "ความเป็นส่วนตัว", path: "/privacy" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs, lang)} />
      <PageHero
        lang={lang}
        crumbs={crumbs}
        eyebrow={en ? "Privacy" : "ความเป็นส่วนตัว"}
        h1={en ? "Privacy Notice for Quote Requests" : "นโยบายความเป็นส่วนตัวสำหรับการขอใบเสนอราคา"}
      >
        <p className="mt-5 text-[17px] leading-relaxed text-secondary">
          {en
            ? "This notice explains how we handle the personal data you give us when you request a quotation."
            : "ประกาศนี้อธิบายวิธีที่เราจัดการข้อมูลส่วนบุคคลที่คุณให้ไว้เมื่อขอใบเสนอราคา"}
        </p>
        <p className="mt-3 text-sm text-secondary">
          {en ? "Last updated: " : "ปรับปรุงล่าสุด: "}
          <time dateTime={PRIVACY_UPDATED}>{PRIVACY_UPDATED}</time>
        </p>
      </PageHero>

      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6 md:py-16">
        <div className="max-w-3xl space-y-10">
          {sections().map((s) => (
            <section key={s.h.en}>
              <h2 className="text-xl font-bold text-primary">{s.h[lang]}</h2>
              {s.p.map((p) => (
                <p key={p.en} className="mt-3 leading-relaxed text-secondary">{p[lang]}</p>
              ))}
              {s.list && (
                <ul className="mt-3 list-disc space-y-1.5 pl-6 text-secondary">
                  {s.list.map((li) => (
                    <li key={li.en}>{li[lang]}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
