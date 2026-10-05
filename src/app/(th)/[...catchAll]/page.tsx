import { notFound } from "next/navigation";

/**
 * Catch-all for any Thai-tree path that doesn't match a real page.
 *
 * With two root layouts and no top-level `app/not-found.tsx`, an unmatched
 * URL (e.g. `/nope`) can't be resolved to either route group on its own.
 * This file forces the match into the `(th)` tree so `notFound()` resolves
 * to this group's `not-found.tsx`.
 *
 * What a crawler actually gets (checked against `next start`, Next 16.3):
 * HTTP 404 and `<meta name="robots" content="noindex">` — both correct, and
 * all that matters for SEO. The HTML document itself is Next's error shell
 * (`<html id="__next_error__">`, no `lang`, no Nav/Footer markup); the
 * localized not-found page (Thai copy, Nav/Footer) is in the RSC payload and
 * is rendered by the client. Don't rely on the 404's static HTML for content.
 */
export default function ThaiCatchAll() {
  notFound();
}
