"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/prefs";
import { localizePath, splitLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

/**
 * TH | EN language control.
 *
 * Rendered as two real `<a>` links, not buttons: language is part of the
 * URL now (`/about` vs `/en/about`), so switching means navigating to the
 * same page in the other language. Real anchors also mean crawlers can
 * follow them — that's how the two trees get discovered in the first
 * place; a button that swapped React state would be invisible to them.
 *
 * `usePathname` is used directly (not `LocaleLink`) because these hrefs
 * must be built for the *other* language, not the current one.
 */
export function LangSwitch({ className }: { className?: string }) {
  const { lang } = useLang();
  const pathname = usePathname();

  const { path } = splitLocale(pathname ?? "/");
  const thHref = localizePath(path, "th");
  const enHref = localizePath(path, "en");

  const link = (active: boolean) =>
    cn(
      "inline-flex min-h-9 items-center px-1 font-semibold transition-colors",
      active ? "text-primary" : "text-muted hover:text-primary",
    );

  return (
    <div
      className={cn("flex items-center gap-1.5 font-mono text-[12px] tracking-[.08em]", className)}
      role="group"
      aria-label={lang === "en" ? "Change language" : "เปลี่ยนภาษา"}
    >
      <NextLink href={thHref} hrefLang="th" className={link(lang === "th")} aria-current={lang === "th" ? "true" : undefined}>
        TH
      </NextLink>
      <span aria-hidden className="text-[#C5CBD6]">
        |
      </span>
      <NextLink href={enHref} hrefLang="en" className={link(lang === "en")} aria-current={lang === "en" ? "true" : undefined}>
        EN
      </NextLink>
    </div>
  );
}
