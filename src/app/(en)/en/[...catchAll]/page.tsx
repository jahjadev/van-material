import { notFound } from "next/navigation";

/**
 * Catch-all for any English-tree path that doesn't match a real page, so
 * `notFound()` resolves to this group's `not-found.tsx`. See the sibling
 * `(th)/[...catchAll]/page.tsx` for what is actually served: HTTP 404 +
 * `noindex` in Next's `__next_error__` HTML shell, with the localized
 * not-found body delivered in the RSC payload rather than the static HTML.
 */
export default function EnglishCatchAll() {
  notFound();
}
