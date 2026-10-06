import type { Faq } from "@/data/products";
import type { Lang } from "@/lib/locale";

/**
 * FAQ accordion. Pages build `faqPageLd` from the same `faqs` array with the
 * same `[lang]` strings, so schema text always equals rendered text. Answers
 * sit in native `<details>`: the text is in the server HTML whether a
 * reader has opened it or not, so crawlers and the audit's
 * `faq-schema-mismatch` check see every answer.
 */
export function FaqList({
  faqs,
  lang,
  className = "mt-16",
  heading,
}: {
  faqs: Faq[];
  lang: Lang;
  className?: string;
  heading?: string;
}) {
  if (faqs.length === 0) return null;
  return (
    <section aria-labelledby="faq-heading" data-reveal="0" className={`faq ${className}`}>
      <h2 id="faq-heading" className="m-0 mb-3 text-[clamp(24px,2.6vw,30px)] font-extrabold text-primary">
        {heading ?? (lang === "en" ? "Frequently asked questions" : "คำถามที่พบบ่อย")}
      </h2>
      <div className="max-w-3xl border-b border-line-strong">
        {faqs.map((f) => (
          <details key={f.q.en} className="border-t border-line-strong">
            <summary className="flex cursor-pointer items-start justify-between gap-6 py-4 text-[17px] font-semibold text-primary">
              <span>{f.q[lang]}</span>
              <span aria-hidden className="faq-icon mt-0.5 text-[22px] leading-none font-normal text-accent">
                +
              </span>
            </summary>
            <p className="m-0 mb-[18px] pr-10 text-[16px] leading-[1.7] text-body">{f.a[lang]}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
