/**
 * Industry pages (`/industries/<slug>`), split from the legacy Solutions
 * page. Each page names the engineering problem, then the product families
 * that answer it. Which families appear is DERIVED from product data — the
 * families whose `industries` list contains the slug — and `fits` only adds
 * the industry-specific reason and the grades to link. A module-level check
 * below fails the build if the two drift apart or a grade slug is wrong.
 *
 * Facts and numbers: only what the product data already states, each
 * attributed to the Materion page it came from (`SRC.*`, fetched in Task 3;
 * the MoldMAX blow-molding and cycle-time statements re-read on 2026-10-05).
 * No cycle-time percentage is published — Materion's MoldMAX page states
 * "faster cycle time" without a figure, so the copy stays qualitative.
 * Legacy claims "up to 50% cycle time" and "up to 85% IACS" are NOT used.
 */

import { families, getFamily, industryLabels, type Bi, type Faq, type ProductFamily } from "@/data/products";
import { SRC } from "@/data/products/shared";
import { INDUSTRY_NAV_SLUGS } from "@/data/nav";

export type IndustrySection = { heading: Bi; paras: Bi[]; bullets?: { title: Bi; items: Bi[] } };

/** Why a product family fits this industry, and which of its grades to link. */
export type IndustryFit = { family: string; grades: string[]; why: Bi };

export type Industry = {
  slug: string;
  name: Bi;
  /** SERP title, ≤ 48 chars before the brand suffix; never a family/grade title. */
  title: Bi;
  h1: Bi;
  /** Meta description, 70–165 chars. */
  description: Bi;
  summary: Bi;
  image: { src: string; width: number; height: number; alt: Bi };
  /** First section is the engineering problem. */
  sections: IndustrySection[];
  fits: IndustryFit[];
  /** Optional property comparison: these labels (English text) from the family's grades. */
  compare?: { family: string; labels: string[]; heading: Bi; note: Bi };
  /** Public pages the section copy cites. */
  sources: string[];
  faqs: Faq[];
};

const img = (slug: string, alt: Bi) => ({
  src: `/images/industry-${slug}.webp`,
  width: 1024,
  height: 768,
  alt,
});

const plasticMold: Industry = {
  slug: "plastic-mold",
  name: industryLabels["plastic-mold"],
  title: {
    th: "Copper Alloys แม่พิมพ์ฉีดและแม่พิมพ์เป่าพลาสติก",
    en: "Copper Alloys for Plastic Injection & Blow Molds",
  },
  h1: {
    th: "Copper Alloys สำหรับแม่พิมพ์ฉีดพลาสติกและแม่พิมพ์เป่าพลาสติก: MoldMAX และ Beryllium Copper",
    en: "Copper Alloys for Plastic Injection Molds: MoldMAX & Beryllium Copper",
  },
  description: {
    th: "insert ทองแดงสำหรับแม่พิมพ์ฉีดพลาสติกและแม่พิมพ์เป่า ดับจุดร้อน ช่วยระบบหล่อเย็นแม่พิมพ์ และลดรอบการผลิต เลือกเกรด MoldMAX และขอใบเสนอราคา",
    en: "Copper alloy mold inserts for plastic injection and blow molds: cool hot spots, even out mold temperature and shorten cycles. Compare MoldMAX grades and get a quote.",
  },
  summary: {
    th: "ในแม่พิมพ์ฉีดพลาสติก ความร้อนที่ระบายออกไม่ทันคือสิ่งที่ทำให้รอบการผลิตยาวและชิ้นงานบิดงอ insert ที่ทำจากโลหะผสมทองแดง (mold insert) ช่วยดึงความร้อนออกจากจุดที่เหล็กทำแม่พิมพ์ระบายไม่ทัน แวน อินเตอร์เทรด จำหน่าย MoldMAX ซึ่งเป็นโลหะผสมทองแดงสำหรับแม่พิมพ์ของ Materion รวมถึงเกรดทองแดงเบริลเลียม (Beryllium Copper) ในกลุ่มนี้ สำหรับแม่พิมพ์ฉีดและแม่พิมพ์เป่าพลาสติก",
    en: "In a plastic injection mold, heat that cannot leave fast enough is what stretches the cycle and warps the part. A copper alloy mold insert pulls heat out of the spots tool steel cannot cool in time. VAN INTERTRADE supplies MoldMAX, Materion's copper mold alloys, including its beryllium copper grades, for injection and blow molds.",
  },
  image: img("plastic-mold", {
    th: "แม่พิมพ์ฉีดพลาสติกเหล็กเปิดสองซีก มีแผ่น insert สีทองแดงรอบโพรงแม่พิมพ์",
    en: "Open two-half steel injection mold with copper-coloured inserts framing the cavities",
  }),
  sections: [
    {
      heading: { th: "ทำไมความร้อนจึงกำหนดรอบการฉีด", en: "Why heat sets the injection cycle" },
      paras: [
        {
          th: "ชิ้นงานพลาสติกจะปลดออกจากแม่พิมพ์ได้ก็ต่อเมื่อเย็นตัวพอจะคงรูป เวลาที่ใช้ดึงความร้อนออกจากแม่พิมพ์จึงเป็นส่วนสำคัญของรอบการผลิต เหล็กทำแม่พิมพ์นำความร้อนได้ค่อนข้างช้า ตรงจุดที่ช่องน้ำหล่อเย็นเข้าไม่ถึง เช่น แกน (core) ที่บาง ครีบลึก พินเรียว หรือบริเวณใกล้ทางเข้า (gate) ความร้อนจะสะสมเป็นจุดร้อน (hot spot)",
          en: "A plastic part can only be ejected once it has cooled enough to hold its shape, so the time spent removing heat from the mold makes up much of the cycle. Tool steel conducts heat fairly slowly. Where cooling channels cannot reach — thin cores, deep ribs, slender pins, the area around the gate — heat builds up into hot spots.",
        },
        {
          th: "จุดร้อนเพียงจุดเดียวทำให้ทั้งรอบต้องรอ และทำให้อุณหภูมิในชิ้นงานไม่สม่ำเสมอ ผลที่ตามมาคือการหดตัวไม่เท่ากัน การบิดงอ และขนาดชิ้นงานที่คุมได้ยาก",
          en: "One hot spot makes the whole cycle wait for it, and leaves temperature differences across the part that show up as uneven shrinkage, warping and dimensions that are hard to hold.",
        },
      ],
    },
    {
      heading: {
        th: "insert ทองแดงกับระบบหล่อเย็นแม่พิมพ์",
        en: "Copper alloy inserts and mold cooling",
      },
      paras: [
        {
          th: "Materion ระบุว่า MoldMAX แข็งแรงและทนสึกได้ระดับเหล็กเครื่องมือ แต่นำความร้อนได้ดีกว่าสูงสุดถึงสิบเท่า เมื่อใส่เป็น insert ในแม่พิมพ์เหล็ก MoldMAX จะดับจุดร้อน และลดหรือตัดความจำเป็นของช่องน้ำหล่อเย็นในจุดนั้น",
          en: "Materion states that MoldMAX alloys offer the strength and wear resistance of tool steels with thermal conductivity up to ten times greater. Used as inserts in steel molds, they cool hot spots and reduce or eliminate the need for cooling channels there.",
        },
        {
          th: "Materion ระบุด้วยว่าการลดความต่างอุณหภูมิของชิ้นส่วนแม่พิมพ์ทำให้ควบคุมขนาดชิ้นงานได้แม่นขึ้น การหดตัวและการบิดงอหลังขึ้นรูปน้อยลง และรอบการผลิตเร็วขึ้นพร้อมคุณภาพชิ้นงานที่ดีขึ้น (Materion ไม่ได้ระบุตัวเลขว่าลดรอบได้เท่าไร ซึ่งขึ้นกับชิ้นงานและแม่พิมพ์แต่ละชุด)",
          en: "By minimizing temperature differences across mold parts, Materion adds, MoldMAX gives tighter molded tolerances, less post-mold shrinking or warping, and faster cycles with better part quality. (Materion gives no cycle-time figure; the gain depends on the part and the mold.)",
        },
      ],
      bullets: {
        title: { th: "ตำแหน่งที่ใช้ insert MoldMAX (ตาม Materion)", en: "Where MoldMAX inserts are used (per Materion)" },
        items: [
        { th: "insert แกนและโพรงแม่พิมพ์ (core & cavity insert)", en: "Core and cavity inserts" },
        { th: "insert แนวแบ่งแม่พิมพ์ (parting line)", en: "Parting-line inserts" },
        { th: "สไลด์และลิฟเตอร์", en: "Sliders and lifters" },
        { th: "ปลายหัวฉีด hot runner", en: "Hot runner tips" },
        ],
      },
    },
    {
      heading: { th: "แม่พิมพ์เป่าพลาสติก (blow mold)", en: "Blow molds" },
      paras: [
        {
          th: "Materion ระบุว่า MoldMAX ช่วยให้ดูแลแนวแบ่งแม่พิมพ์ (parting line) ในงานเป่าพลาสติกได้ดีขึ้น และมีอายุใช้งานยาวกว่าเมื่อใช้เป็นชิ้นส่วนและ insert ในแม่พิมพ์เป่าอะลูมิเนียม",
          en: "Materion states that MoldMAX alloys improve parting-line maintenance in blow molding and offer longer service life when used for components and inserts in aluminium blow molds.",
        },
      ],
    },
  ],
  fits: [
    {
      family: "moldmax",
      grades: ["moldmax-hh", "protherm", "moldmax-v", "moldmax-xl"],
      why: {
        th: "MoldMAX HH เมื่อ insert ต้องแข็งระดับเหล็กเครื่องมือและทนสึก PROtherm เมื่อการระบายความร้อนสำคัญที่สุด MoldMAX V เมื่อต้องการนำความร้อนสูงโดยไม่มีเบริลเลียม และ MoldMAX XL เมื่อต้องการความแข็งใกล้เคียงเหล็ก P-20 แต่นำความร้อนได้ดีกว่า",
        en: "MoldMAX HH where an insert needs tool-steel hardness and wear resistance, PROtherm where heat removal matters most, MoldMAX V for high conductivity without beryllium, and MoldMAX XL for P-20-class hardness with better conductivity.",
      },
    },
  ],
  compare: {
    family: "moldmax",
    labels: ["Rockwell hardness", "Thermal conductivity"],
    heading: {
      th: "เทียบความแข็งกับการนำความร้อนของแต่ละเกรด",
      en: "Hardness against thermal conductivity, by grade",
    },
    note: {
      th: "ค่าทั่วไปจากตารางเปรียบเทียบของ Materion ซึ่งระบุเหล็ก P-20 ไว้ที่ความแข็ง Rockwell 30 และการนำความร้อน 17 BTU/ft·hr·°F ตารางไม่ได้ระบุสเกลของค่าความแข็ง",
      en: "Typical values from Materion's comparison table, which lists P-20 tool steel at Rockwell hardness 30 and 17 BTU/ft·hr·°F. The table does not state the Rockwell scale.",
    },
  },
  sources: [SRC.moldmax],
  faqs: [
    {
      q: {
        th: "ทำไมต้องใช้โลหะผสมทองแดงในแม่พิมพ์ฉีดพลาสติก?",
        en: "Why use a copper alloy in a plastic injection mold?",
      },
      a: {
        th: "เพราะนำความร้อนได้เร็วกว่าเหล็กทำแม่พิมพ์มาก Materion ระบุว่า MoldMAX แข็งแรงและทนสึกระดับเหล็กเครื่องมือ แต่นำความร้อนได้ดีกว่าสูงสุดถึงสิบเท่า insert ทองแดงจึงดับจุดร้อน ทำให้อุณหภูมิแม่พิมพ์สม่ำเสมอ และช่วยให้รอบการผลิตสั้นลง",
        en: "Because it moves heat much faster than tool steel. Materion states that MoldMAX alloys have the strength and wear resistance of tool steels with thermal conductivity up to ten times greater, so a copper insert cools hot spots, evens out mold temperature and helps shorten the cycle.",
      },
    },
    {
      q: {
        th: "MoldMAX เกรดไหนเหมาะกับ mold insert?",
        en: "Which MoldMAX grade suits a mold insert?",
      },
      a: {
        th: "ขึ้นกับว่างานเน้นความแข็งหรือการระบายความร้อน ในตารางของ Materion MoldMAX HH มีความแข็ง Rockwell 40 และนำความร้อน 75 BTU/ft·hr·°F, PROtherm 20 และ 145, MoldMAX V 28 และ 92, MoldMAX XL 30 และ 40 เทียบกับเหล็ก P-20 ที่ 30 และ 17",
        en: "It depends on whether hardness or heat removal matters more. In Materion's comparison table MoldMAX HH has a Rockwell hardness of 40 and a thermal conductivity of 75 BTU/ft·hr·°F, PROtherm 20 and 145, MoldMAX V 28 and 92, and MoldMAX XL 30 and 40, against 30 and 17 for P-20 tool steel.",
      },
    },
    {
      q: {
        th: "insert ทองแดงทำให้ไม่ต้องมีช่องน้ำหล่อเย็นเลยหรือไม่?",
        en: "Does a copper insert remove the need for cooling channels?",
      },
      a: {
        th: "ไม่เสมอไป Materion ระบุว่า insert MoldMAX ในแม่พิมพ์เหล็กช่วยลดหรือตัดความจำเป็นของช่องน้ำหล่อเย็นในจุดร้อนนั้น แต่ความร้อนยังต้องมีทางออกจาก insert จึงต้องวาง insert ให้ถ่ายความร้อนไปยังส่วนของแม่พิมพ์ที่มีการหล่อเย็น",
        en: "Not always. Materion says MoldMAX inserts in steel molds reduce or eliminate the need for cooling channels at the hot spot. The heat still has to leave the insert, so it is placed where it can pass heat to a cooled part of the mold.",
      },
    },
    {
      q: {
        th: "ใช้โลหะผสมทองแดงในแม่พิมพ์เป่าพลาสติกได้ไหม?",
        en: "Can copper alloys be used in blow molds?",
      },
      a: {
        th: "ได้ Materion ระบุว่า MoldMAX ช่วยให้ดูแลแนวแบ่งแม่พิมพ์ในงานเป่าพลาสติกได้ดีขึ้น และมีอายุใช้งานยาวกว่าเมื่อใช้เป็นชิ้นส่วนและ insert ในแม่พิมพ์เป่าอะลูมิเนียม",
        en: "Yes. Materion states that MoldMAX alloys improve parting-line maintenance in blow molding and offer longer service life as components and inserts in aluminium blow molds.",
      },
    },
  ],
};

const ev: Industry = {
  slug: "ev",
  name: industryLabels.ev,
  title: {
    th: "Copper Alloys คอนเนคเตอร์และบัสบาร์ยานยนต์ไฟฟ้า",
    en: "Copper Alloys for EV Connectors & Busbars",
  },
  h1: {
    th: "Copper Alloys สำหรับยานยนต์ไฟฟ้า (EV): คอนเนคเตอร์ หน้าสัมผัส และบัสบาร์",
    en: "Copper Alloys for Electric Vehicles: Connectors, Contacts and Busbars",
  },
  description: {
    th: "โลหะผสมทองแดงสำหรับ EV: Beryllium Copper สำหรับสปริงคอนเนคเตอร์ และ Clad Metal Cu/Al/Cu สำหรับบัสบาร์และขั้วต่อแบตเตอรี่ เลือกเกรดและขอใบเสนอราคา",
    en: "Copper alloys for electric vehicles: beryllium copper for connector springs and Cu/Al/Cu clad metal for busbars and battery connectors. Request a quote.",
  },
  summary: {
    th: "ยานยนต์ไฟฟ้าส่งกระแสสูงผ่านคอนเนคเตอร์ ขั้วต่อแบตเตอรี่ และบัสบาร์ ที่ต้องเย็น เบา และเชื่อถือได้ภายใต้การสั่นสะเทือน แวน อินเตอร์เทรด จำหน่าย Beryllium Copper ของ Materion สำหรับสปริงคอนเนคเตอร์ และ Clad Metal เช่น Cu/Al/Cu สำหรับบัสบาร์และขั้วต่อแบตเตอรี่",
    en: "Electric vehicles push high currents through connectors, battery interconnects and busbars that must stay cool, light and reliable under vibration. VAN INTERTRADE supplies Materion beryllium copper for connector springs and clad metal such as Cu/Al/Cu for busbars and battery connectors.",
  },
  image: img("ev", {
    th: "ชุดแบตเตอรี่รถยนต์ไฟฟ้าที่เชื่อมเซลล์ด้วยบัสบาร์ทองแดงและสายถักทองแดง",
    en: "Electric vehicle battery pack with cells linked by copper busbars and braided copper connectors",
  }),
  sections: [
    {
      heading: { th: "โจทย์ของตัวนำไฟฟ้าใน EV", en: "What EV conductors have to handle" },
      paras: [
        {
          th: "หน้าสัมผัสในคอนเนคเตอร์ต้องรักษาแรงกดไว้ตลอดอายุรถ ขณะที่นำกระแสและร้อนขึ้น ถ้าสปริงคลายแรง ความต้านทานหน้าสัมผัสจะสูงขึ้นและจุดต่อจะร้อนขึ้นอีก ส่วนบัสบาร์และขั้วต่อแบตเตอรี่ก็นำกระแสสูงเช่นกัน แต่ต้องคำนึงถึงน้ำหนักและต้นทุนทองแดงไม่น้อยกว่าการนำไฟฟ้า",
          en: "A connector contact has to keep its contact force for the life of the vehicle while it carries current and heats up. If the spring relaxes, contact resistance rises and the joint runs hotter still. Busbars and battery interconnects carry high current too, but there weight and copper cost count as much as conductivity.",
        },
      ],
    },
    {
      heading: { th: "เลือกระหว่างความแข็งแรงกับการนำไฟฟ้า", en: "Trading strength against conductivity" },
      paras: [
        {
          th: "เกรด Beryllium Copper แลกกันระหว่างความแข็งแรงกับการนำไฟฟ้า Materion ระบุการนำไฟฟ้าในสภาพบ่มแข็งของ C17200 (Alloy 25) ไว้ที่ 25–30% IACS และ C17510 (Alloy 3) ที่ 45–60% IACS และออกแบบ C17460 (Alloy 390) ให้นำไฟฟ้าได้ระดับ Alloy 3 หรือ Alloy 174 พร้อมความแข็งแรงระดับ Alloy 25 และต้านการคลายแรงสปริง (stress relaxation) ได้ดี",
          en: "Beryllium copper grades trade strength against conductivity. In the age-hardened condition Materion lists C17200 (Alloy 25) at 25–30% IACS and C17510 (Alloy 3) at 45–60% IACS, and designed C17460 (Alloy 390) to give the conductivity of Alloy 3 or Alloy 174 with the strength of Alloy 25, plus good stress-relaxation resistance.",
        },
      ],
    },
  ],
  fits: [
    {
      family: "beryllium-copper",
      grades: ["c17410", "c17460", "c17510"],
      why: {
        th: "สปริงคอนเนคเตอร์และหน้าสัมผัส: แถบ C17410 ที่ Materion ระบุว่านำไฟฟ้าได้ราวสองเท่าของทองเหลืองและทนการเสียบถอดซ้ำได้มาก, แถบบ่มแข็งจากโรงงาน C17460 สำหรับหน้าสัมผัสขนาดเล็กที่ต้องเชื่อถือได้สูง และ C17510 เมื่อการนำไฟฟ้าสำคัญที่สุด",
        en: "Connector springs and contacts: C17410 strip, which Materion says conducts about twice as well as brass and survives many mating cycles; C17460 mill-hardened strip for small, high-reliability contacts; and C17510 where conductivity comes first.",
      },
    },
    {
      family: "clad-metal",
      grades: [],
      why: {
        th: "Cu/Al/Cu สำหรับบัสบาร์และขั้วต่อแบตเตอรี่: แกนอะลูมิเนียมทำให้ชิ้นงานเบาลงและใช้ทองแดงน้อยลง ขณะที่ผิวทองแดงยังต่อและบัดกรีได้เหมือนทองแดง",
        en: "Cu/Al/Cu for busbars and battery connectors: the aluminium core makes the part lighter and uses less copper, while the copper faces still join and solder like copper.",
      },
    },
  ],
  sources: [SRC.becuHighStrength, SRC.becuHighConductivity],
  faqs: [
    {
      q: {
        th: "Beryllium Copper เกรดไหนเหมาะกับคอนเนคเตอร์ EV?",
        en: "Which beryllium copper grade suits EV connectors?",
      },
      a: {
        th: "สำหรับแถบสปริงคอนเนคเตอร์ เริ่มที่ C17410 (Alloy 174) ซึ่ง Materion ออกแบบมาแต่แรกสำหรับคอนเนคเตอร์ยานยนต์และโทรคมนาคม ถ้าต้องการนำไฟฟ้ามากขึ้นให้ดู C17510 (Alloy 3) ที่ 45–60% IACS และถ้าต้องการทั้งนำไฟฟ้าและแข็งแรงสูงให้ดู C17460 (Alloy 390)",
        en: "For spring connector strip, start with C17410 (Alloy 174), which Materion originally designed for automotive and telecom connectors. For more conductivity look at C17510 (Alloy 3), listed at 45–60% IACS, and for conductivity together with high strength, C17460 (Alloy 390).",
      },
    },
    {
      q: {
        th: "ทำไมใช้ Clad Metal Cu/Al/Cu ทำบัสบาร์?",
        en: "Why use Cu/Al/Cu clad metal for busbars?",
      },
      a: {
        th: "แกนอะลูมิเนียมทำให้บัสบาร์เบาลงและใช้ทองแดงน้อยลง ขณะที่ผิวทองแดงยังต่อและบัดกรีได้เหมือนเดิม",
        en: "The aluminium core makes the busbar lighter and uses less copper, while the copper faces still join and solder as before.",
      },
    },
    {
      q: {
        th: "สั่ง Clad Metal ตามแบบได้ไหม?",
        en: "Can clad metal be made to my drawing?",
      },
      a: {
        th: "ได้ กำหนดชนิดโลหะ ลำดับชั้น และสัดส่วนความหนาตามแบบงาน แล้วส่งรายละเอียดเพื่อประเมินความเป็นไปได้และเสนอราคา",
        en: "Yes. Metals, layer order and thickness ratio can be set to your drawing; send the details for a feasibility check and quotation.",
      },
    },
  ],
};

const oilGas: Industry = {
  slug: "oil-gas",
  name: industryLabels["oil-gas"],
  title: {
    th: "Copper Alloys เครื่องมือขุดเจาะน้ำมันและก๊าซ",
    en: "Copper Alloys for Oil & Gas Drilling Tools",
  },
  h1: {
    th: "Copper Alloys สำหรับงานน้ำมันและก๊าซ: บูชและแบริ่งเครื่องมือขุดเจาะ",
    en: "Copper Alloys for Oil & Gas: Drilling-Tool Bushings and Bearings",
  },
  description: {
    th: "โลหะผสมทองแดงสำหรับเครื่องมือขุดเจาะน้ำมันและก๊าซ: ToughMet ต้านการติดกัน ทนกัดกร่อน ไม่เป็นแม่เหล็ก และ Beryllium Copper จาก Materion ขอใบเสนอราคา",
    en: "Copper alloys for oil & gas drilling tools: anti-galling, corrosion-resistant, non-magnetic ToughMet and beryllium copper from Materion. Request a quote.",
  },
  summary: {
    th: "เครื่องมือขุดเจาะใต้ดินทำงานภายใต้โหลดหนักในของเหลวที่กัดกร่อน และมักอยู่ใกล้อุปกรณ์วัดที่ต้องใช้ชิ้นส่วนไม่เป็นแม่เหล็ก แวน อินเตอร์เทรด จำหน่าย ToughMet และ Beryllium Copper ของ Materion สำหรับบูช แบริ่ง และชิ้นส่วนเครื่องมือขุดเจาะ",
    en: "Downhole drilling tools run under heavy load in corrosive fluids, often next to instruments that call for non-magnetic parts. VAN INTERTRADE supplies Materion ToughMet and beryllium copper for drilling-tool bushings, bearings and components.",
  },
  image: img("oil-gas", {
    th: "แท่นขุดเจาะน้ำมันกลางทะเลพร้อมเครนในช่วงพระอาทิตย์ตก",
    en: "Offshore oil drilling platform with cranes at sunset",
  }),
  sections: [
    {
      heading: { th: "สิ่งที่ชิ้นส่วนใต้หลุมเจาะต้องเผชิญ", en: "What downhole parts face" },
      paras: [
        {
          th: "บูชและแบริ่งในเครื่องมือ MWD/LWD (การวัดและบันทึกข้อมูลขณะเจาะ) และเครื่องมือเจาะแบบกำหนดทิศทาง ต้องเลื่อนไถลภายใต้โหลดหนักโดยแทบไม่มีที่ให้สารหล่อลื่น ในของเหลวที่อาจมีน้ำทะเล คลอไรด์ และซัลไฟด์ ความเสียหายที่พบบ่อยคือการติดกัน (galling) การสึกหรอ และการแตกร้าวจากความเค้นร่วมกับการกัดกร่อน และเครื่องมือที่มีเซนเซอร์วัดมักกำหนดให้ใช้วัสดุไม่เป็นแม่เหล็ก",
          en: "Bushings and bearings in measurement-while-drilling (MWD), logging-while-drilling (LWD) and directional drilling tools slide under heavy load with little room for lubrication, in fluids that can carry seawater, chlorides and sulfides. Galling, wear and stress-corrosion cracking are the usual ways they fail, and tools that carry measurement sensors are often specified with non-magnetic materials.",
        },
      ],
    },
    {
      heading: { th: "โลหะผสมที่ตอบโจทย์", en: "How the alloys answer it" },
      paras: [
        {
          th: "Materion ระบุว่า ToughMet ต้านการติดกัน ทนการสึกหรอภายใต้โหลดหนัก ทนการกัดกร่อนและการแตกร้าวจากความเค้นในน้ำทะเล คลอไรด์ และซัลไฟด์ และไม่เป็นแม่เหล็ก ToughMet 3 ใน temper AT มีความต้านทานแรงดึงสูงสุดถึง 140 ksi ตามข้อมูล Materion ส่วน Beryllium Copper นั้น Materion ระบุว่าไม่เป็นแม่เหล็ก และ C17200 (Alloy 25) ใช้ในอุปกรณ์ขุดเจาะน้ำมันและก๊าซ",
          en: "Materion states that ToughMet resists galling, wear under heavy load, and corrosion and stress-corrosion cracking in seawater, chlorides and sulfides, and that it is non-magnetic. Per Materion, ToughMet 3 in the AT temper reaches up to 140 ksi tensile strength. Materion also describes beryllium copper as nonmagnetic and C17200 (Alloy 25) is used in oil & gas drilling equipment.",
        },
      ],
    },
  ],
  fits: [
    {
      family: "toughmet",
      grades: ["toughmet-3"],
      why: {
        th: "เครื่องมือ MWD/LWD เครื่องมือเจาะแบบกำหนดทิศทาง และแบริ่งดอกสว่าน ซึ่งเป็นงานทั่วไปของ ToughMet 3",
        en: "MWD/LWD and directional drilling tools and drill-bit bearings, among ToughMet 3's typical uses.",
      },
    },
    {
      family: "beryllium-copper",
      grades: ["c17200"],
      why: {
        th: "อุปกรณ์ขุดเจาะที่ต้องการเกรดทองแดงเบริลเลียมที่แข็งแรงที่สุด และต้องไม่เป็นแม่เหล็ก",
        en: "Drilling equipment that needs the highest-strength beryllium copper grade in a non-magnetic material.",
      },
    },
  ],
  sources: [SRC.toughmet, SRC.becuHighStrength, SRC.becuMagnetic],
  faqs: [
    {
      q: {
        th: "ทำไมเครื่องมือขุดเจาะใช้ ToughMet?",
        en: "Why is ToughMet used in drilling tools?",
      },
      a: {
        th: "เพราะ Materion ระบุว่า ToughMet ต้านการติดกัน ทนการสึกหรอภายใต้โหลดหนัก ทนการกัดกร่อนและการแตกร้าวจากความเค้นในน้ำทะเล คลอไรด์ และซัลไฟด์ และไม่เป็นแม่เหล็ก",
        en: "Because Materion states that ToughMet resists galling, wear under heavy load, and corrosion and stress-corrosion cracking in seawater, chlorides and sulfides, and is non-magnetic.",
      },
    },
    {
      q: {
        th: "ToughMet 3 AT แข็งแรงแค่ไหน?",
        en: "How strong is ToughMet 3 AT?",
      },
      a: {
        th: "Materion ระบุว่า ToughMet 3 AT มีความต้านทานแรงดึงสูงสุดถึง 140 ksi และคงความแข็งแรงได้ที่อุณหภูมิสูง",
        en: "Materion states that ToughMet 3 AT reaches up to 140 ksi tensile strength and keeps its strength at elevated temperature.",
      },
    },
    {
      q: {
        th: "ToughMet มีเบริลเลียมไหม?",
        en: "Does ToughMet contain beryllium?",
      },
      a: {
        th: "ไม่มี Materion ระบุว่า ToughMet ปราศจากทั้งตะกั่วและเบริลเลียม",
        en: "No. Materion states that ToughMet alloys are lead- and beryllium-free.",
      },
    },
  ],
};

const aerospace: Industry = {
  slug: "aerospace",
  name: industryLabels.aerospace,
  title: {
    th: "Copper Alloys บูชและแบริ่งอากาศยาน",
    en: "Copper Alloys for Aerospace Bushings & Bearings",
  },
  h1: {
    th: "Copper Alloys สำหรับอากาศยาน: บูชและแบริ่งฐานล้อ ล้อ และเบรก",
    en: "Copper Alloys for Aerospace: Landing Gear, Wheel and Brake Bushings",
  },
  description: {
    th: "โลหะผสมทองแดงสำหรับบูชและแบริ่งอากาศยาน: ToughMet ที่ใช้ในฐานล้อ ล้อ และเบรก และ Beryllium Copper แข็งแรงสูงจาก Materion ขอใบเสนอราคา",
    en: "Copper alloys for aerospace bushings and bearings: ToughMet for landing gear, wheels and brakes, and high-strength beryllium copper from Materion. Request a quote.",
  },
  summary: {
    th: "บูชในฐานล้อ ล้อ และเบรกของอากาศยานรับโหลดหนักแบบแกว่งไปมา และต้องทำงานต่อได้แม้สารหล่อลื่นขาดหาย แวน อินเตอร์เทรด จำหน่าย ToughMet และ Beryllium Copper ของ Materion สำหรับบูช แบริ่ง และชิ้นส่วนอากาศยาน",
    en: "Landing gear, wheel and brake bushings take heavy, oscillating loads and must keep working if lubrication fails. VAN INTERTRADE supplies Materion ToughMet and beryllium copper for aerospace bushings, bearings and components.",
  },
  image: img("aerospace", {
    th: "บูชโลหะผสมทองแดงขนาดใหญ่วางบนโต๊ะสแตนเลส ข้างใบกังหันและเฟืองเครื่องยนต์อากาศยาน",
    en: "Large copper alloy bushing on a steel bench beside turbine blades and aircraft engine gears",
  }),
  sections: [
    {
      heading: { th: "โจทย์ของบูชและแบริ่งอากาศยาน", en: "What aircraft bushings have to do" },
      paras: [
        {
          th: "บูชและแบริ่งในอากาศยานรับโหลดสูงที่ความเร็วไถลต่ำ ผ่านช่วงอุณหภูมิกว้าง และต้องเปลี่ยนตามรอบการบำรุงรักษา วัสดุที่ติดกันหรือสึกเร็วจึงเพิ่มต้นทุนการบำรุงรักษาโดยตรง และชิ้นส่วนยังต้องทำงานได้อย่างปลอดภัยหากจาระบีขาดหาย",
          en: "Aircraft bushings and bearings carry high loads at low sliding speeds, see wide temperature swings and are replaced on maintenance schedules, so a material that galls or wears quickly adds directly to maintenance cost. The part must also keep running safely if its grease is lost.",
        },
      ],
    },
    {
      heading: { th: "โลหะผสมที่ตอบโจทย์", en: "How the alloys answer it" },
      paras: [
        {
          th: "Materion ระบุว่า ToughMet 3 ใช้อยู่ในเครื่องบินพาณิชย์หลักทุกรุ่นในปัจจุบัน และในอากาศยาน ToughMet ทำงานได้ต่อเนื่องอย่างปลอดภัยเป็นเวลานานแม้สารหล่อลื่นขาดหาย ส่วน C17200 (Alloy 25) ซึ่ง Materion ระบุว่าเป็นเกรดทองแดงเบริลเลียมที่แข็งแรงที่สุดที่ผลิต ใช้ทำบูชและแบริ่งในอากาศยาน",
          en: "Materion states that ToughMet 3 is used on all models of mainline commercial aircraft today, and that in aircraft ToughMet can run safely for extended periods if lubrication fails. C17200 (Alloy 25), which Materion describes as the highest-strength copper beryllium it makes, is used for aerospace bushings and bearings.",
        },
      ],
    },
  ],
  fits: [
    {
      family: "toughmet",
      grades: ["toughmet-3"],
      why: {
        th: "บูชและแบริ่งฐานล้อ ล้อ และเบรกอากาศยาน",
        en: "Aircraft landing gear, wheel and brake bushings and bearings.",
      },
    },
    {
      family: "beryllium-copper",
      grades: ["c17200"],
      why: {
        th: "บูช แบริ่ง และชิ้นส่วนอากาศยานที่ต้องการทองแดงเบริลเลียมเกรดที่แข็งแรงที่สุด",
        en: "Aerospace bushings, bearings and components that need the highest-strength beryllium copper grade.",
      },
    },
  ],
  sources: [SRC.toughmet, SRC.becuHighStrength],
  faqs: [
    {
      q: {
        th: "บูชฐานล้ออากาศยานใช้โลหะผสมทองแดงอะไร?",
        en: "Which copper alloy is used for landing gear bushings?",
      },
      a: {
        th: "ToughMet 3 ใช้ทำบูชและแบริ่งฐานล้อ ล้อ และเบรกอากาศยาน และ Materion ระบุว่า ToughMet 3 ใช้อยู่ในเครื่องบินพาณิชย์หลักทุกรุ่นในปัจจุบัน",
        en: "ToughMet 3 is used for aircraft landing gear, wheel and brake bushings and bearings, and Materion states that it is used on all models of mainline commercial aircraft today.",
      },
    },
    {
      q: {
        th: "ถ้าสารหล่อลื่นขาดหาย บูช ToughMet จะเป็นอย่างไร?",
        en: "What happens to a ToughMet bushing if lubrication fails?",
      },
      a: {
        th: "Materion ระบุว่าในอากาศยาน ToughMet ทำงานได้ต่อเนื่องอย่างปลอดภัยเป็นเวลานานแม้สารหล่อลื่นขาดหาย เพราะมีคุณสมบัติลื่นในตัว",
        en: "Materion states that in aircraft ToughMet can run safely for extended periods if lubrication fails, thanks to its natural lubricity.",
      },
    },
  ],
};

const automotive: Industry = {
  slug: "automotive",
  name: industryLabels.automotive,
  title: {
    th: "Copper Alloys ชิ้นส่วนยานยนต์และหัวเชื่อมจุด",
    en: "Copper Alloys for Automotive Parts & Welding",
  },
  h1: {
    th: "Copper Alloys สำหรับยานยนต์: ขั้วต่อ แหวนกันรุน และหัวเชื่อมจุด",
    en: "Copper Alloys for Automotive: Terminals, Thrust Washers and Welding Electrodes",
  },
  description: {
    th: "โลหะผสมทองแดงสำหรับยานยนต์: Beryllium Copper และฟอสเฟอร์บรอนซ์สำหรับขั้วต่อ ToughMet สำหรับแหวนกันรุน และ CrCuZr สำหรับหัวเชื่อมจุด ขอใบเสนอราคา",
    en: "Copper alloys for automotive: beryllium copper and phosphor bronze for terminals, ToughMet thrust washers and CrCuZr spot-welding electrodes. Request a quote.",
  },
  summary: {
    th: "รถยนต์ใช้โลหะผสมทองแดงทั้งในคอนเนคเตอร์และขั้วต่อ ในแหวนกันรุนของเกียร์ และในหัวเชื่อมจุดที่ใช้ประกอบตัวถัง แวน อินเตอร์เทรด จำหน่าย Beryllium Copper, ToughMet, ทองแดงโครเมียม และโลหะผสมทองแดงมาตรฐาน JIS สำหรับชิ้นส่วนเหล่านี้",
    en: "Cars use copper alloys in connectors and terminals, in gearbox thrust washers and in the electrodes that spot-weld the body. VAN INTERTRADE supplies beryllium copper, ToughMet, chrome copper and standard JIS copper alloys for these parts.",
  },
  image: img("automotive", {
    th: "โครงตัวถังรถยนต์สีทองแดงบนสายการผลิต ล้อมด้วยหุ่นยนต์อุตสาหกรรม",
    en: "Copper-coloured car body frame on an assembly line surrounded by industrial robots",
  }),
  sections: [
    {
      heading: { th: "โจทย์ของชิ้นส่วนยานยนต์", en: "What automotive parts face" },
      paras: [
        {
          th: "ชิ้นส่วนยานยนต์ต้องทนความร้อน การสั่นสะเทือน และอายุใช้งานยาวในการผลิตจำนวนมาก ขั้วต่อต้องรักษาแรงกดในห้องเครื่อง แหวนกันรุนสึกภายใต้โหลด และหัวเชื่อมจุดในสายประกอบตัวถังอ่อนตัวและบานออกเมื่อความร้อนสะสม แต่ละงานจึงต้องการสมดุลระหว่างความแข็งแรง การนำไฟฟ้า และต้นทุนที่ต่างกัน",
          en: "Automotive parts face heat, vibration and long service lives at high volume. Terminals must hold contact force under the hood, thrust washers wear under load, and body-shop welding electrodes soften and mushroom as heat builds up, so each part needs a different balance of strength, conductivity and cost.",
        },
      ],
    },
  ],
  fits: [
    {
      family: "beryllium-copper",
      grades: ["c17410", "c17510"],
      why: {
        th: "สปริงคอนเนคเตอร์และขั้วต่อ: Materion ออกแบบ C17410 มาแต่แรกสำหรับคอนเนคเตอร์ยานยนต์และโทรคมนาคม ส่วน C17510 เหมาะกับขั้วต่อยานยนต์ที่ต้องการความน่าเชื่อถือสูง",
        en: "Connector springs and terminals: Materion originally designed C17410 for automotive and telecom connectors, while C17510 suits high-reliability automotive terminals.",
      },
    },
    {
      family: "toughmet",
      grades: [],
      why: {
        th: "Materion ระบุการใช้ ToughMet ในชิ้นส่วนระบบส่งกำลัง ได้แก่ ปลอกนำวาล์ว (valve guide) และแบริ่งในเครื่องยนต์สันดาปภายใน และแบริ่งกับแหวนกันรุน (thrust washer) ในชุดเกียร์ทดรอบและเฟืองท้ายของรถยนต์ไฟฟ้าและไฮบริด",
        en: "Materion lists ToughMet for powertrain parts: valve guides and bearings in internal combustion engines, and plain bearings and thrust washers in electric and hybrid vehicle gear reducers and differentials.",
      },
    },
    {
      family: "chrome-copper",
      grades: [],
      why: {
        th: "หัวเชื่อมจุดและแคปหัวเชื่อม: CrCuZr ต้านการอ่อนตัวเมื่อร้อนได้ดีกว่า เหมาะกับงานเชื่อมรอบสูงหรือเชื่อมเหล็กเคลือบผิว",
        en: "Spot-welding electrodes and caps: CrCuZr resists softening better at temperature, for high-rate welding or welding coated steel.",
      },
    },
    {
      family: "standard-copper-alloys",
      grades: ["c5191", "c5210", "c1100"],
      why: {
        th: "ฟอสเฟอร์บรอนซ์ C5191 และ C5210 สำหรับขั้วต่อและคอนเนคเตอร์ที่ไม่ต้องการสมรรถนะระดับ Beryllium Copper และ C1100 สำหรับบัสบาร์และตัวนำไฟฟ้า",
        en: "C5191 and C5210 phosphor bronze for terminals and connectors that don't need beryllium copper performance, and C1100 for busbars and conductors.",
      },
    },
  ],
  sources: [SRC.becuHighConductivity, SRC.toughmet],
  faqs: [
    {
      q: {
        th: "หัวเชื่อมจุดทำจากวัสดุอะไร?",
        en: "What are spot-welding electrodes made of?",
      },
      a: {
        th: "โดยทั่วไปใช้ทองแดงโครเมียม CrCu หรือ CrCuZr ซึ่งแข็งกว่าทองแดงบริสุทธิ์มากแต่ยังนำไฟฟ้าได้ดี CrCuZr ต้านการอ่อนตัวเมื่อร้อนได้ดีกว่า จึงนิยมในงานเชื่อมรอบสูงหรือเชื่อมเหล็กเคลือบผิว",
        en: "Usually CrCu or CrCuZr chrome copper, which is much harder than pure copper while still conducting well. CrCuZr resists softening at temperature better, so it is preferred for high-rate welding or welding coated steel.",
      },
    },
    {
      q: {
        th: "เมื่อไรฟอสเฟอร์บรอนซ์จึงพอสำหรับขั้วต่อยานยนต์?",
        en: "When is phosphor bronze enough for an automotive terminal?",
      },
      a: {
        th: "เมื่อขั้วต่อไม่ต้องการแรงสปริงหรือความแข็งแรงสูงกว่าที่ฟอสเฟอร์บรอนซ์ให้ได้ และไม่ต้องการทั้งความแข็งแรงและการนำไฟฟ้าสูงพร้อมกัน ถ้าต้องการ ให้ขยับไปใช้ Beryllium Copper",
        en: "When the terminal needs no more spring force or strength than phosphor bronze can give, and doesn't need high strength and high conductivity at the same time. If it does, step up to beryllium copper.",
      },
    },
  ],
};

const switchgear: Industry = {
  slug: "switchgear",
  name: industryLabels.switchgear,
  title: {
    th: "Contact Materials สวิตช์เกียร์ รีเลย์ เบรกเกอร์",
    en: "Copper & Silver Materials for Switchgear",
  },
  h1: {
    th: "Contact Materials สำหรับสวิตช์เกียร์: หน้าสัมผัสเงิน โลหะประกบ และทองแดง",
    en: "Contact Materials for Switchgear: Silver Contacts, Clad Metal and Copper",
  },
  description: {
    th: "วัสดุสำหรับสวิตช์เกียร์ รีเลย์ คอนแทคเตอร์ และเบรกเกอร์: หน้าสัมผัสเงิน Longsun, Clad Metal Ag/Cu และทองแดง C1100 สำหรับบัสบาร์ ขอใบเสนอราคา",
    en: "Materials for switchgear, relays, contactors and breakers: Longsun silver contacts, Ag/Cu clad metal and C1100 copper for busbars. Request a quote.",
  },
  summary: {
    th: "รีเลย์ คอนแทคเตอร์ สวิตช์ และเบรกเกอร์ ต้องใช้วัสดุหน้าสัมผัสที่ทนอาร์กและไม่เชื่อมติด รวมถึงตัวนำและสปริงรอบ ๆ แวน อินเตอร์เทรด จำหน่ายหน้าสัมผัสไฟฟ้าฐานเงินของ Longsun โลหะประกบ และโลหะผสมทองแดงมาตรฐานสำหรับสวิตช์เกียร์",
    en: "Relays, contactors, switches and circuit breakers depend on contact materials that resist arcing and welding, plus the conductors and springs around them. VAN INTERTRADE supplies Longsun silver electrical contacts, clad metal and standard copper alloys for switchgear.",
  },
  image: img("switchgear", {
    th: "หมุดคอนแทคหัวเงินบนฐานทองแดงติดอยู่บนแผ่นวงจร พร้อมสปริงขนาดเล็ก",
    en: "Silver-headed contact rivets on copper bases mounted on a board, with small springs",
  }),
  sections: [
    {
      heading: { th: "โจทย์ของหน้าสัมผัสในสวิตช์เกียร์", en: "What switching contacts face" },
      paras: [
        {
          th: "ทุกครั้งที่หน้าสัมผัสเปิดหรือปิดขณะมีโหลดจะเกิดอาร์ก เมื่อทำงานซ้ำหลายครั้ง อาร์กจะกัดกร่อนผิวหน้าสัมผัส อาจทำให้หน้าสัมผัสเชื่อมติดกัน และทำให้ความต้านทานหน้าสัมผัสสูงขึ้น เงินเป็นฐานของวัสดุหน้าสัมผัสส่วนใหญ่แต่มีราคาสูง จึงต้องเลือกวัสดุและโครงสร้างของหน้าสัมผัสไปพร้อมกัน",
          en: "Every time a contact opens or closes under load, an arc forms. Over many operations the arc erodes the contact face, can weld the contacts together and raises contact resistance. Silver is the base of most contact materials but it is expensive, so the material and the structure of the contact are chosen together.",
        },
      ],
    },
  ],
  fits: [
    {
      family: "electrical-contacts",
      grades: [],
      why: {
        th: "หมุดคอนแทคแบบตัน สองโลหะ และสามโลหะ ปุ่ม และลวด ในวัสดุ AgNi, AgSnO2, AgCdO รวมถึง AgW และ CuW สำหรับงานตัดต่อกำลังสูง",
        en: "Solid, bi-metal and tri-metal rivets, buttons and wire in AgNi, AgSnO2 and AgCdO, plus AgW and CuW for high-power switching.",
      },
    },
    {
      family: "clad-metal",
      grades: [],
      why: {
        th: "Ag/Cu ใช้เงินเฉพาะผิวหน้าสัมผัสบนฐานทองแดง ลดปริมาณเงินในชิ้นงาน",
        en: "Ag/Cu puts silver only on the contact surface over a copper base, cutting the silver content of the part.",
      },
    },
    {
      family: "standard-copper-alloys",
      grades: ["c5210", "c1100"],
      why: {
        th: "ฟอสเฟอร์บรอนซ์ C5210 สำหรับสปริงและคอนแทคในสวิตช์และรีเลย์ และ C1100 สำหรับบัสบาร์และตัวนำในตู้ไฟฟ้า",
        en: "C5210 phosphor bronze for springs and switch and relay contacts, and C1100 for busbars and switchboard conductors.",
      },
    },
  ],
  sources: [],
  faqs: [
    {
      q: {
        th: "งานตัดต่อกำลังสูงควรใช้วัสดุหน้าสัมผัสอะไร?",
        en: "Which contact material suits high-power switching?",
      },
      a: {
        th: "AgW และ CuW ซึ่งเป็นวัสดุโลหะผงที่มีทังสเตน ทนอาร์กและการสึกกร่อนสูง ใช้กับเบรกเกอร์และงานตัดต่อกำลังสูง",
        en: "AgW and CuW, powder-metallurgy tungsten composites with high arc and erosion resistance, used for breakers and high-power switching.",
      },
    },
    {
      q: {
        th: "มีทางเลือกที่ไม่มีแคดเมียมแทน AgCdO ไหม?",
        en: "Is there a cadmium-free alternative to AgCdO?",
      },
      a: {
        th: "มี AgSnO2 ต้านการเชื่อมติดและการสึกกร่อนจากอาร์กได้ดี และเป็นทางเลือกที่ไม่มีแคดเมียมที่ใช้กันทั่วไป ควรตรวจสอบข้อกำหนดของตลาดปลายทางก่อนเลือก",
        en: "Yes. AgSnO2 has good resistance to welding and arc erosion and is the usual cadmium-free alternative. Check your destination market's rules before choosing.",
      },
    },
    {
      q: {
        th: "จะลดปริมาณเงินในหน้าสัมผัสได้อย่างไร?",
        en: "How can I use less silver in a contact?",
      },
      a: {
        th: "เลือกหมุดสองโลหะหรือสามโลหะ ซึ่งใช้วัสดุฐานเงินเฉพาะหน้าสัมผัสบนแกนทองแดง หรือใช้โลหะประกบ Ag/Cu ที่มีชั้นเงินเฉพาะผิวหน้าสัมผัส",
        en: "Choose a bi-metal or tri-metal rivet, which puts the silver alloy only on the contact face over a copper body, or Ag/Cu clad metal, which carries silver only on the contact surface.",
      },
    },
  ],
};

/** In nav/priority order — plastic-mold first. */
export const industries: Industry[] = [plasticMold, ev, oilGas, aerospace, automotive, switchgear];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

/** Families whose product data lists this industry (the source of truth). */
export function familiesFor(slug: string): ProductFamily[] {
  return families.filter((f) => f.industries.includes(slug));
}

/*
 * Build-time consistency check: every derived family has a `fit`, every fit
 * names a derived family, and every linked grade exists. Throws during
 * `next build` (module evaluation) rather than shipping a broken link.
 */
// The nav/footer "Industries" menu is a slug list (nav.ts, kept light for
// the client bundle); it must list exactly these pages, in this order.
if (INDUSTRY_NAV_SLUGS.join(",") !== industries.map((i) => i.slug).join(",")) {
  throw new Error(
    `nav.ts INDUSTRY_NAV_SLUGS (${INDUSTRY_NAV_SLUGS.join(",")}) must match industries.ts (${industries.map((i) => i.slug).join(",")})`,
  );
}

for (const ind of industries) {
  const derived = new Set(familiesFor(ind.slug).map((f) => f.slug));
  const fitted = new Set(ind.fits.map((f) => f.family));
  for (const d of derived) {
    if (!fitted.has(d)) throw new Error(`industries.ts: ${ind.slug} lacks a fit for family ${d}`);
  }
  for (const fit of ind.fits) {
    if (!derived.has(fit.family)) {
      throw new Error(`industries.ts: ${ind.slug} fit ${fit.family} is not tagged with this industry in product data`);
    }
    const fam = getFamily(fit.family)!;
    for (const g of fit.grades) {
      if (!fam.grades.some((x) => x.slug === g)) {
        throw new Error(`industries.ts: ${ind.slug} links unknown grade ${fit.family}/${g}`);
      }
    }
  }
}
