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
    <div className="mx-auto flex max-w-[880px] flex-col items-start gap-[18px] px-[clamp(20px,4vw,48px)] py-[120px]">
      <h1 className="m-0 text-[48px] font-semibold text-primary">ไม่พบหน้านี้</h1>
      <p className="m-0 text-[17px] text-secondary">
        ขออภัย ไม่พบหน้าที่คุณค้นหา กรุณาตรวจสอบลิงก์ หรือกลับไปหน้าแรก
      </p>
      <LocaleLink
        href="/"
        className="inline-flex items-center gap-2.5 rounded-[10px] bg-accent px-6 py-3.5 text-[16px] font-semibold text-white hover:bg-accent-hover"
      >
        กลับหน้าแรก
      </LocaleLink>
    </div>
  );
}
