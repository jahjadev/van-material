import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { JsonLd, organizationLd, websiteLd } from "@/components/JsonLd";

export const metadata: Metadata = pageMeta({
  title: "Materion ตัวแทนจำหน่ายไทย",
  description:
    "แวน อินเตอร์เทรด ตัวแทนจำหน่าย Materion ในไทย จำหน่ายทองแดงเบริลเลียม MoldMAX และ ToughMet สำหรับอุตสาหกรรมแม่พิมพ์และการผลิต ตั้งแต่ พ.ศ. 2529",
  lang: "th",
  path: "/",
});

export default function ThaiHomePage() {
  return (
    <>
      <JsonLd data={[organizationLd("th"), websiteLd("th")]} />
      <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-6 md:py-24">
        <h1 className="text-3xl font-bold text-primary md:text-4xl">
          แวน อินเตอร์เทรด — ทองแดงเบริลเลียม, MoldMAX, ToughMet
        </h1>
        <p className="mt-4 max-w-2xl text-secondary">
          ผู้จัดจำหน่ายโลหะผสมทองแดงและวัสดุแม่พิมพ์ประสิทธิภาพสูงสำหรับอุตสาหกรรมไทย
          ตั้งแต่ พ.ศ. 2529 เนื้อหาหน้าแรกฉบับสมบูรณ์จะตามมาในขั้นถัดไป
        </p>
      </div>
    </>
  );
}
