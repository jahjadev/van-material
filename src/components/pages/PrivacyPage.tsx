import { JsonLd, breadcrumbLd } from "@/components/JsonLd";
import { HOME, PageHero, type Crumb } from "@/components/ProductParts";
import { company } from "@/data/company";
import type { Bi } from "@/data/products";
import type { Lang } from "@/lib/locale";

/*
 * Short PDPA-style notice for the quote request form (Task 5). Plain and
 * factual: what is collected, why, who sees it, how to exercise rights.
 * The technical-data section mirrors the code: hosting (Vercel), the
 * in-memory per-IP limiter in src/lib/rateLimit.ts (5 per 15 min, set in
 * src/app/api/rfq/route.ts), and the click-to-load map (ClickToLoadMap).
 * Change the text if any of those change. Still needs client / legal review
 * before launch.
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
      { th: "รูปแบบและจำนวนที่ต้องการ (ถ้าระบุ)", en: "The form and quantity you want, if you give them" },
      { th: "ข้อความของคุณ", en: "Your message" },
    ],
  },
  {
    h: { th: "ข้อมูลทางเทคนิคเมื่อคุณใช้เว็บไซต์", en: "Technical data when you use the site" },
    p: [
      {
        th: "เว็บไซต์นี้ให้บริการผ่านผู้ให้บริการโฮสติ้ง Vercel ซึ่งประมวลผลทุกคำขอที่เบราว์เซอร์ของคุณส่งมา รวมถึงหมายเลข IP และข้อมูลเบราว์เซอร์หรืออุปกรณ์ที่ส่งมาพร้อมคำขอ เพื่อส่งหน้าเว็บให้คุณ ตามนโยบายความเป็นส่วนตัวของ Vercel เว็บไซต์นี้ไม่ใช้คุกกี้ ไม่ใช้เครื่องมือวิเคราะห์ และไม่ใช้โฆษณาติดตามผู้ใช้",
        en: "The site is served by our hosting provider, Vercel, which processes every request your browser makes, including your IP address and the browser or device details sent with it, in order to deliver the pages, under Vercel's own privacy policy. This site sets no cookies and uses no analytics or advertising trackers.",
      },
      {
        th: "เมื่อคุณส่งแบบฟอร์มขอใบเสนอราคา เซิร์ฟเวอร์ใช้หมายเลข IP ของคุณชั่วคราวเพื่อจำกัดการส่งซ้ำ (ไม่เกิน 5 ครั้งต่อ 15 นาทีต่อ IP) และป้องกันการใช้งานในทางที่ผิด หมายเลข IP นี้อยู่ในหน่วยความจำของเซิร์ฟเวอร์เท่านั้น ใช้เฉพาะในช่วง 15 นาทีนั้น แล้วถือว่าหมดอายุและถูกล้างออกเมื่อเซิร์ฟเวอร์ทำความสะอาดหน่วยความจำหรือเริ่มทำงานใหม่ ไม่ถูกบันทึกลงฐานข้อมูลหรือบันทึกการทำงาน และไม่ถูกแนบไปกับอีเมลคำขอของคุณ",
        en: "When you send the quote form, our server uses your IP address briefly to limit repeat submissions (at most 5 per IP in 15 minutes) and prevent abuse. It is held only in the server's memory, used only for that 15-minute window, then treated as expired and cleared when the server tidies its memory or restarts. It is not written to a database or log, and it is not added to the email of your request.",
      },
    ],
  },
  {
    h: { th: "แผนที่ในหน้าติดต่อเรา", en: "The map on the contact page" },
    p: [
      {
        th: "แผนที่ Google Maps ในหน้าติดต่อเราจะไม่โหลดจนกว่าคุณจะกดปุ่ม \"แสดงแผนที่\" เมื่อกดแล้ว เบราว์เซอร์ของคุณจะโหลดแผนที่จาก Google โดยตรง และส่งหมายเลข IP และข้อมูลอุปกรณ์ของคุณให้ Google ตามนโยบายความเป็นส่วนตัวของ Google หากไม่ต้องการ ให้ใช้ที่อยู่ที่แสดงไว้ หรือลิงก์ \"เปิดใน Google Maps\" แทน",
        en: "The Google Maps map on the contact page does not load until you press \"Show map\". When you do, your browser loads the map directly from Google and shares your IP address and device information with Google under Google's privacy policy. If you prefer not to, use the address shown or the \"Open in Google Maps\" link instead.",
      },
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
        th: "ข้อมูลของคุณเข้าถึงได้เฉพาะพนักงานของเราที่ดูแลคำขอ ผู้ให้บริการโฮสติ้งเว็บไซต์ (Vercel) ซึ่งประมวลผลคำขอระหว่างทาง และผู้ให้บริการที่ส่งอีเมลให้เรา เราไม่ขาย ไม่ให้เช่า และไม่แลกเปลี่ยนข้อมูลส่วนบุคคลของคุณกับบุคคลภายนอก",
        en: "Only our staff who handle your request, our website hosting provider (Vercel), which processes the request in transit, and the service provider that delivers our email can see it. We do not sell, rent or trade your personal data to anyone.",
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
        th: `ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) คุณมีสิทธิขอเข้าถึง ขอรับหรือขอให้โอนย้ายข้อมูลของคุณ ขอแก้ไข ขอลบ ขอให้ระงับการใช้ หรือคัดค้านการใช้ข้อมูลของคุณ และถอนความยินยอมที่เคยให้ไว้ ส่งคำขอได้ที่อีเมล ${company.contact.email} หรือโทร ${company.contact.telsDisplay[0]} หากเห็นว่าเราไม่ปฏิบัติตามกฎหมาย คุณมีสิทธิร้องเรียนต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (PDPC)`,
        en: `Under Thailand's Personal Data Protection Act B.E. 2562 (2019) (PDPA) you can ask to access your data, to receive it or have it transferred to another organisation (data portability), to correct or delete it, to restrict its use, to object to its use, and to withdraw any consent you gave. Send requests to ${company.contact.email} or call ${company.contact.telsDisplay[0]}. If you believe we have not followed the law, you can complain to the Office of the Personal Data Protection Committee (PDPC).`,
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
