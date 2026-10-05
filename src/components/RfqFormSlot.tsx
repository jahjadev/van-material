import { Mail, MessageCircle, Phone } from "lucide-react";
import { LocaleLink } from "@/components/LocaleLink";
import { company } from "@/data/company";
import type { Lang } from "@/lib/locale";

/**
 * PLACEHOLDER for the RFQ form — Task 5 replaces this component with the
 * real `RfqForm` (which reads `?product=&grade=` from the URL, as sent by the
 * "Request a quote" buttons on product pages). Until then it offers the
 * direct channels from company.ts. Rendered inside `<section id="rfq">` on
 * the contact page; keep that anchor when swapping in the form.
 */
export function RfqFormSlot({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const c = company.contact;
  const btn =
    "inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 text-sm font-semibold text-primary hover:border-accent";

  return (
    <div data-rfq-slot="placeholder" className="rounded-2xl border border-line bg-surface p-6 md:p-8">
      <p className="leading-relaxed text-secondary">
        {en
          ? "To request a quotation, send us the product and grade, the form (rod, plate, strip and so on), the size and the quantity by phone, LINE or email. We reply during business hours."
          : "ขอใบเสนอราคาโดยแจ้งสินค้าและเกรด รูปแบบ (เช่น แท่ง แผ่น แถบ) ขนาด และจำนวนที่ต้องการ ทางโทรศัพท์ LINE หรืออีเมล ทีมงานจะตอบกลับในเวลาทำการ"}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={`tel:${c.tels[0]}`} className={btn}>
          <Phone className="size-4" aria-hidden />
          {c.telsDisplay[0]}
        </a>
        <a href={c.lineUrl} target="_blank" rel="noopener noreferrer" className={btn}>
          <MessageCircle className="size-4" aria-hidden />
          LINE {c.lineId}
        </a>
        <a href={`mailto:${c.email}`} className={btn}>
          <Mail className="size-4" aria-hidden />
          {c.email}
        </a>
      </div>
      <p className="mt-6 text-sm text-secondary">
        {en ? "How we handle the details you send: " : "การจัดการข้อมูลที่คุณส่งมา: "}
        <LocaleLink href="/privacy" className="font-medium text-accent underline underline-offset-2 hover:text-primary">
          {en ? "privacy notice" : "นโยบายความเป็นส่วนตัว"}
        </LocaleLink>
      </p>
    </div>
  );
}
