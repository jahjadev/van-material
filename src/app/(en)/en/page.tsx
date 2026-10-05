import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { JsonLd, organizationLd, websiteLd } from "@/components/JsonLd";

export const metadata: Metadata = pageMeta({
  title: "Materion Distributor Thailand",
  description:
    "VAN INTERTRADE is a Materion distributor in Thailand, supplying beryllium copper, MoldMAX, and ToughMet alloys for mold and industrial manufacturing since 1986.",
  lang: "en",
  path: "/",
});

export default function EnglishHomePage() {
  return (
    <>
      <JsonLd data={[organizationLd("en"), websiteLd("en")]} />
      <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-6 md:py-24">
        <h1 className="text-3xl font-bold text-primary md:text-4xl">
          VAN INTERTRADE — Beryllium Copper, MoldMAX, ToughMet
        </h1>
        <p className="mt-4 max-w-2xl text-secondary">
          Distributor of high-performance copper and mold alloys for Thai
          industry since 1986. The full home page lands in a later task.
        </p>
      </div>
    </>
  );
}
