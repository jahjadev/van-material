import { LocaleLink } from "@/components/LocaleLink";

// Sits in the (en) group so a `notFound()` inside the English tree renders
// in English, inside the English root layout, with links that stay under
// `/en`.
export default function EnglishNotFound() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-24 text-center md:px-6">
      <h1 className="text-3xl font-bold text-primary">Page not found</h1>
      <p className="mt-4 text-secondary">
        Sorry, we couldn&apos;t find that page. Check the link or head back
        to the home page.
      </p>
      <LocaleLink
        href="/"
        className="mt-6 inline-flex rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white"
      >
        Back to home
      </LocaleLink>
    </div>
  );
}
