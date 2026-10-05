import { notFound } from "next/navigation";

/**
 * Catch-all for any English-tree path that doesn't match a real page. See
 * the sibling `(th)/[...catchAll]/page.tsx` for why this is needed: without
 * it, an unmatched `/en/...` URL falls back to Next's generic built-in 404
 * instead of this group's localized `not-found.tsx`.
 */
export default function EnglishCatchAll() {
  notFound();
}
