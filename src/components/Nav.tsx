"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LocaleLink } from "@/components/LocaleLink";
import { LangSwitch } from "@/components/LangSwitch";
import { Logo } from "@/components/Logo";
import { ScrollProgress } from "@/components/Motion";
import { SearchPanel } from "@/components/SearchPanel";
import { mainNav } from "@/data/nav";
import { useLang, useT } from "@/lib/prefs";
import type { SearchEntry } from "@/lib/searchIndex";
import { cn } from "@/lib/cn";

const RFQ_HREF = "/contact#rfq";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      aria-hidden
      className={cn("transition-transform duration-200", open && "rotate-180")}
    >
      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" aria-hidden>
      <circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11 11l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Nav({ search }: { search: SearchEntry[] }) {
  const pathname = usePathname();
  const { lang } = useLang();
  const t = useT();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  const searchBtn = useRef<HTMLButtonElement>(null);

  // Close everything when the route changes.
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
    setSearchOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const desktopNavRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    const onDown = (e: MouseEvent) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [openMenu]);

  const label = (item: { label: string; labelEn: string }) => (lang === "en" ? item.labelEn : item.label);

  const closeSearch = (refocus: boolean) => {
    setSearchOpen(false);
    if (refocus) searchBtn.current?.focus();
  };

  return (
    <header
      className={cn(
        "sticky inset-x-0 top-0 z-50 border-b bg-white/95 backdrop-blur-md backdrop-saturate-150 transition-colors duration-200",
        scrolled || searchOpen || mobileOpen ? "border-line" : "border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[200] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2.5 focus:font-semibold focus:text-white"
      >
        {t("ข้ามไปยังเนื้อหา", "Skip to content")}
      </a>
      <ScrollProgress />

      <nav
        aria-label={t("เมนูหลัก", "Main navigation")}
        className="mx-auto flex h-[72px] max-w-[1240px] items-center gap-6 px-[clamp(20px,4vw,48px)]"
      >
        <Logo lang={lang} />

        <ul
          ref={desktopNavRef}
          className="hidden flex-1 items-center justify-center gap-[clamp(18px,2.4vw,40px)] lg:flex"
        >
          {mainNav.map((group) =>
            group.children ? (
              <li
                key={group.labelEn}
                className="relative"
                onMouseEnter={() => setOpenMenu(group.labelEn)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  className="flex items-center gap-2 py-2 text-[15px] font-medium text-primary transition-colors hover:text-accent"
                  aria-expanded={openMenu === group.labelEn}
                  aria-controls={`nav-menu-${group.labelEn}`}
                  onClick={() => setOpenMenu(openMenu === group.labelEn ? null : group.labelEn)}
                >
                  {label(group)}
                  <Chevron open={openMenu === group.labelEn} />
                </button>
                {openMenu === group.labelEn && (
                  <div id={`nav-menu-${group.labelEn}`} className="absolute -left-4 top-full pt-2.5">
                    <ul className="flex min-w-[280px] flex-col rounded-xl border border-line bg-white p-2 shadow-[0_18px_40px_-20px_rgba(10,23,51,.25)]">
                      {group.children.map((c) => (
                        <li key={c.href}>
                          <LocaleLink
                            href={c.href}
                            className="arrow-link flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[15px] text-primary hover:bg-tint"
                          >
                            <span>{label(c)}</span>
                            <span aria-hidden className="arrow text-accent">→</span>
                          </LocaleLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ) : (
              <li key={group.labelEn}>
                <LocaleLink
                  href={group.href!}
                  aria-current={pathname?.endsWith(group.href!) ? "page" : undefined}
                  className="py-2 text-[15px] font-medium text-primary transition-colors hover:text-accent aria-[current=page]:text-accent"
                >
                  {label(group)}
                </LocaleLink>
              </li>
            ),
          )}
        </ul>

        <div className="ml-auto flex items-center gap-3.5">
          <LangSwitch />
          <button
            ref={searchBtn}
            type="button"
            aria-label={t("ค้นหาวัสดุ", "Search materials")}
            aria-expanded={searchOpen}
            aria-controls="search-panel"
            onClick={() => {
              setMobileOpen(false);
              setOpenMenu(null);
              if (searchOpen) closeSearch(false);
              else setSearchOpen(true);
            }}
            className="flex size-[42px] items-center justify-center rounded-full border border-line bg-white text-primary transition-colors duration-200 hover:border-accent hover:bg-accent-tint"
          >
            <SearchIcon />
          </button>
          <LocaleLink
            href={RFQ_HREF}
            className="arrow-link hidden items-center gap-2.5 rounded-[10px] bg-accent px-[18px] py-[11px] text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-accent-hover lg:inline-flex"
          >
            {t("ขอใบเสนอราคา", "Request a quote")}
            <span aria-hidden className="arrow">→</span>
          </LocaleLink>
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => {
              setSearchOpen(false);
              setMobileOpen((v) => !v);
            }}
            className="h-[42px] rounded-full border border-line bg-white px-4 text-[14px] font-semibold text-primary lg:hidden"
          >
            {mobileOpen ? t("ปิด", "Close") : t("เมนู", "Menu")}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-white px-[clamp(20px,4vw,48px)] pb-6 pt-2 lg:hidden"
        >
          {mainNav.map((group) =>
            group.children ? (
              <details key={group.labelEn} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-[17px] font-medium text-primary [&::-webkit-details-marker]:hidden">
                  {label(group)}
                  <span className="text-accent transition-transform group-open:rotate-180">
                    <Chevron open={false} />
                  </span>
                </summary>
                <ul className="pb-3">
                  {group.children.map((c) => (
                    <li key={c.href}>
                      <LocaleLink
                        href={c.href}
                        className="arrow-link flex items-center justify-between py-2.5 pl-3 text-[15px] text-secondary hover:text-primary"
                      >
                        {label(c)}
                        <span aria-hidden className="arrow text-accent">→</span>
                      </LocaleLink>
                    </li>
                  ))}
                </ul>
              </details>
            ) : (
              <LocaleLink
                key={group.labelEn}
                href={group.href!}
                className="arrow-link flex items-center justify-between border-b border-line py-3.5 text-[17px] font-medium text-primary"
              >
                {label(group)}
                <span aria-hidden className="arrow text-accent">→</span>
              </LocaleLink>
            ),
          )}
          <LocaleLink
            href={RFQ_HREF}
            className="mt-5 flex items-center justify-center gap-2.5 rounded-[10px] bg-accent px-[18px] py-3.5 text-[16px] font-semibold text-white hover:bg-accent-hover"
          >
            {t("ขอใบเสนอราคา", "Request a quote")} <span aria-hidden>→</span>
          </LocaleLink>
        </div>
      )}

      {searchOpen && <SearchPanel entries={search} rfqHref={RFQ_HREF} onClose={closeSearch} />}
    </header>
  );
}
