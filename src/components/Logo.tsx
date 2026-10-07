import { LocaleLink } from "@/components/LocaleLink";
import { cn } from "@/lib/cn";
import { pickLang, type Lang } from "@/lib/locale";

/**
 * One-line text wordmark, small enough for the 48px apple.com-style nav:
 * a semibold "VAN" followed by a tracked-out "INTERTRADE".
 *
 * Plain server component: `lang` is passed down from whichever route-group
 * root layout rendered (see src/lib/locale.ts / ruling #6), not read from a
 * client context — this component has no interactivity of its own.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline gap-1.5 leading-none text-primary", className)}>
      <span className="text-[18px] font-semibold tracking-[-.01em]">VAN</span>{" "}
      <span className="text-[10px] font-medium tracking-[.2em]">INTERTRADE</span>
    </span>
  );
}

export function Logo({ lang, className }: { lang: Lang; className?: string }) {
  return (
    <LocaleLink
      href="/"
      aria-label={pickLang(lang, "VAN INTERTRADE หน้าแรก", "VAN INTERTRADE home")}
      className={cn("shrink-0 opacity-90 transition-opacity hover:opacity-100", className)}
    >
      <Wordmark />
    </LocaleLink>
  );
}
