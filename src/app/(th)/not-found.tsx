import type { Metadata } from "next";
import { LocaleLink } from "@/components/LocaleLink";

// Covers both a direct 404 render and the `[...catchAll]` route's
// `notFound()` call — without this, the layout's default metadata would
// otherwise let a 404 page be indexed.
export const metadata: Metadata = {
  title: "ไม่พบหน้านี้",
  robots: { index: false, follow: true },
};

export default function ThaiNotFound() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-24 text-center md:px-6">
      <h1 className="text-3xl font-bold text-primary">ไม่พบหน้านี้</h1>
      <p className="mt-4 text-secondary">
        ขออภัย ไม่พบหน้าที่คุณค้นหา กรุณาตรวจสอบลิงก์ หรือกลับไปหน้าแรก
      </p>
      <LocaleLink
        href="/"
        className="mt-6 inline-flex rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white"
      >
        กลับหน้าแรก
      </LocaleLink>
    </div>
  );
}
