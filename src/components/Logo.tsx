import { LocaleLink } from "@/components/LocaleLink";
import { cn } from "@/lib/cn";
import { pickLang, type Lang } from "@/lib/locale";

/**
 * Text wordmark — VAN (copper accent) INTERTRADE (ink).
 *
 * Plain server component: `lang` is passed down from whichever route-group
 * root layout rendered (see src/lib/locale.ts / ruling #6), not read from a
 * client context — this component has no interactivity of its own.
 */
export function Logo({ lang, className }: { lang: Lang; className?: string }) {
  return (
    <LocaleLink
      href="/"
      aria-label={pickLang(lang, "แวน อินเตอร์เทรด หน้าแรก", "VAN INTERTRADE home")}
      className={cn("inline-flex items-baseline gap-1.5 font-bold", className)}
    >
      <span className="text-[20px] tracking-tight text-accent">VAN</span>
      <span className="text-[15px] tracking-tight text-primary">
        INTERTRADE
      </span>
    </LocaleLink>
  );
}
