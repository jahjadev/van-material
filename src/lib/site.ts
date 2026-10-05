/**
 * Site-wide constants. `SITE_URL` is the ONLY place a hostname may appear —
 * every other file that needs the domain imports it from here (see
 * "Global Constraints" in docs/superpowers/plans/2026-10-05-van-material-nextjs-seo-launch.md).
 *
 * The fallback domain was confirmed by the controller as van-material.com
 * (overriding the task brief's placeholder "example-pending" fallback).
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.van-material.com"
).replace(/\/$/, "");

export const SITE_NAME_TH = "แวน อินเตอร์เทรด";
export const SITE_NAME_EN = "VAN INTERTRADE";
