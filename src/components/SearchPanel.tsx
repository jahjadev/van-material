"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LocaleLink } from "@/components/LocaleLink";
import { useLang, useT } from "@/lib/prefs";
import type { SearchEntry, SearchKind } from "@/lib/searchIndex";

const KIND: Record<SearchKind, { th: string; en: string }> = {
  family: { th: "หมวดวัสดุ", en: "Category" },
  grade: { th: "เกรด", en: "Grade" },
  industry: { th: "อุตสาหกรรม", en: "Industry" },
  article: { th: "บทความ", en: "Article" },
};

/**
 * Header search: a panel under the nav that filters the server-built index
 * (src/lib/searchIndex.ts) as you type. Every term must appear in an
 * entry's match text. Escape closes it and returns focus to the button.
 */
export function SearchPanel({
  entries,
  rfqHref,
  onClose,
}: {
  entries: SearchEntry[];
  rfqHref: string;
  onClose: (refocus: boolean) => void;
}) {
  const { lang } = useLang();
  const t = useT();
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  // The parent passes a fresh `onClose` every render; read it through a ref
  // so the mount effect below doesn't re-run (and re-focus) on each one.
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  });

  useEffect(() => {
    input.current?.focus();
    const raf = requestAnimationFrame(() => setShown(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close.current(true);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const query = q.trim().toLowerCase();
  const results = useMemo(() => {
    if (!query) return [];
    const terms = query.split(/\s+/);
    return entries.filter((e) => terms.every((tm) => e.k.includes(tm))).slice(0, 8);
  }, [entries, query]);

  const suggestions = ["C17200", "BeCu", "MoldMAX", "ToughMet", "CrCuZr", t("แม่พิมพ์", "Mold")];

  return (
    <div
      id="search-panel"
      role="search"
      className="absolute inset-x-0 top-full border-y border-line bg-white shadow-[0_30px_60px_-40px_rgba(10,23,51,.35)] transition-[opacity,transform] duration-200 ease-(--ease-out-soft)"
      style={{ opacity: shown ? 1 : 0, transform: shown ? "translateY(0)" : "translateY(-8px)" }}
    >
      <div className="mx-auto flex max-w-[880px] flex-col gap-[22px] px-[clamp(20px,4vw,48px)] pb-8 pt-7">
        <div className="flex items-center gap-3.5 border-b-2 border-primary pb-2.5">
          <label htmlFor="site-search" className="sr-only">
            {t("ค้นหาวัสดุ", "Search materials")}
          </label>
          <input
            ref={input}
            id="site-search"
            type="search"
            autoComplete="off"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("ค้นหาเกรด วัสดุ หรือบทความ", "Search grades, materials or articles")}
            aria-describedby="search-status"
            className="min-w-0 flex-1 bg-transparent py-1 text-[clamp(20px,2.6vw,28px)] font-semibold text-primary outline-none placeholder:text-muted"
          />
          <button
            type="button"
            onClick={() => onClose(true)}
            className="shrink-0 p-1.5 text-[14px] text-secondary hover:text-primary"
          >
            {t("ปิด", "Close")} · Esc
          </button>
        </div>

        <p id="search-status" aria-live="polite" className="m-0 text-[12px] text-secondary">
          {!query ? t("ลองค้นหา", "Try searching") : `${results.length} ${t("ผลลัพธ์", "results")}`}
        </p>

        {!query && (
          <div className="flex flex-wrap gap-2.5">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setQ(s);
                  input.current?.focus();
                }}
                className="rounded-full border border-line bg-white px-4 py-2 text-[14px] text-primary transition-colors hover:border-accent hover:text-accent"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {results.length > 0 && (
          <ul className="m-0 flex list-none flex-col p-0">
            {results.map((r) => (
              <li key={r.href} className="border-t border-line">
                <LocaleLink
                  href={r.href}
                  onClick={() => onClose(false)}
                  className="arrow-link grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-1 py-4 text-primary hover:bg-[#F7F9FC] sm:grid-cols-[110px_minmax(0,1fr)_auto]"
                >
                  <span className="hidden text-[12px] font-semibold text-secondary sm:block">
                    {KIND[r.kind][lang]}
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-[17px] font-semibold">{r.title}</span>
                    <span className="text-[14px] text-secondary">{r.sub}</span>
                  </span>
                  <span aria-hidden className="arrow text-[18px] text-accent">›</span>
                </LocaleLink>
              </li>
            ))}
          </ul>
        )}

        {query && results.length === 0 && (
          <div className="flex flex-col items-start gap-3.5 py-2">
            <p className="m-0 text-[20px] font-bold text-primary">
              {t("ไม่พบผลลัพธ์สำหรับ", "No results for")} “{q.trim()}”
            </p>
            <p className="m-0 max-w-[520px] text-[15px] text-secondary">
              {t(
                "ส่งรายละเอียดวัสดุที่ต้องการให้ทีมงานตรวจสอบ หรือดูกลุ่มสินค้าทั้งหมด",
                "Send us the material you need and our team will check, or browse every product line.",
              )}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <LocaleLink
                href={rfqHref}
                onClick={() => onClose(false)}
                className="arrow-link inline-flex items-center gap-2.5 rounded-[10px] bg-accent px-[18px] py-[11px] text-[15px] font-semibold text-white hover:bg-accent-hover"
              >
                {t("สอบถามวัสดุนี้", "Ask about this material")}
                <span aria-hidden className="arrow">›</span>
              </LocaleLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
