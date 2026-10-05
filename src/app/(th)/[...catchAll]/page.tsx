import { notFound } from "next/navigation";

/**
 * Catch-all for any Thai-tree path that doesn't match a real page.
 *
 * Without this, a completely unmatched URL (e.g. `/nope`) can't be resolved
 * to either route group's layout at all — with two root layouts and no
 * top-level `app/not-found.tsx`, Next falls back to its generic built-in 404
 * (no `<html lang>`, none of our chrome). This file forces the match into
 * the `(th)` layout tree so `notFound()` renders this group's
 * `not-found.tsx` — Thai content, `<html lang="th">`, our Nav/Footer.
 */
export default function ThaiCatchAll() {
  notFound();
}
