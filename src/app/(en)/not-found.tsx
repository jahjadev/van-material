import type { Metadata } from "next";
import { LocaleLink } from "@/components/LocaleLink";

// Covers both a direct 404 render and the `[...catchAll]` route's
// `notFound()` call — without this, the layout's default metadata would
// otherwise let a 404 page be indexed.
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

// Sits in the (en) group so a `notFound()` inside the English tree renders
// in English, inside the English root layout, with links that stay under
// `/en`.
export default function EnglishNotFound() {
  return (
    <div className="mx-auto flex max-w-[880px] flex-col items-start gap-[18px] px-[clamp(20px,4vw,48px)] py-[120px]">
      <h1 className="m-0 text-[48px] font-semibold text-primary">Page not found</h1>
      <p className="m-0 text-[17px] text-secondary">
        Sorry, we couldn&apos;t find that page. Check the link or head back
        to the home page.
      </p>
      <LocaleLink
        href="/"
        className="inline-flex items-center gap-2.5 rounded-[10px] bg-accent px-6 py-3.5 text-[16px] font-semibold text-white hover:bg-accent-hover"
      >
        Back to home
      </LocaleLink>
    </div>
  );
}
