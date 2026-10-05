import type { Faq } from "@/data/products";
import type { Lang } from "@/lib/locale";

/**
 * Visible FAQ list. Pages build `faqPageLd` from the same `faqs` array with
 * the same `[lang]` strings, so schema text always equals rendered text.
 * Answers are rendered open (not behind a toggle) so the text is plainly
 * visible to readers and crawlers alike.
 */
export function FaqList({ faqs, lang }: { faqs: Faq[]; lang: Lang }) {
  if (faqs.length === 0) return null;
  return (
    <section aria-labelledby="faq-heading" className="mt-14">
      <h2 id="faq-heading" className="text-xl font-bold text-primary md:text-2xl">
        {lang === "en" ? "Frequently asked questions" : "คำถามที่พบบ่อย"}
      </h2>
      <dl className="mt-5 divide-y divide-line rounded-xl border border-line bg-surface">
        {faqs.map((f) => (
          <div key={f.q.en} className="px-5 py-5">
            <dt className="font-semibold text-primary">{f.q[lang]}</dt>
            <dd className="mt-2 leading-relaxed text-secondary">{f.a[lang]}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
