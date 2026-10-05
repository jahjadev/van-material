import type { Article } from "./types";
import { REF } from "./sources";

/*
 * Facts: Materion's high-strength and high-conductivity CuBe pages (two
 * alloy classes, age-hardened condition, forms, corrosion resistance),
 * Materion's magnetic-properties article (nonmagnetic, unchanged by cold
 * work), and the sourced values already in beryllium-copper.ts.
 */
export const whatIsBerylliumCopper: Article = {
  slug: "what-is-beryllium-copper",
  topic: ["beryllium-copper"],
  grades: ["beryllium-copper/c17200", "beryllium-copper/c17510"],
  date: "2026-10-05",
  modified: "2026-10-05",
  image: "/images/product-cube.webp",
  title: {
    // A transliterated Thai lead ("เบริลเลียมคอปเปอร์"), not the bare
    // English head term, so this informational title doesn't collide with
    // /beryllium-copper's owned "Beryllium Copper" lead (seo-audit.mjs
    // KEYWORD_OWNERS; see task-8-report.md for the finding this fixed).
    th: "เบริลเลียมคอปเปอร์คืออะไร คุณสมบัติและการใช้งาน",
    en: "What Is Beryllium Copper? Properties and Uses",
  },
  h1: {
    th: "Beryllium Copper (ทองแดงเบริลเลียม) คืออะไร คุณสมบัติและการใช้งาน",
    en: "What Is Beryllium Copper? Properties, Grades and Uses",
  },
  description: {
    th: "Beryllium Copper (CuBe/BeCu) คือโลหะผสมทองแดงที่บ่มแข็งได้ แข็งแรงสูงและนำไฟฟ้าดี อธิบายคุณสมบัติ สองกลุ่มเกรด รูปแบบสินค้า และงานที่ใช้ พร้อมแหล่งอ้างอิง",
    en: "Beryllium copper (CuBe/BeCu) is an age-hardenable copper alloy with high strength and good conductivity. Its properties, grade classes, forms and uses, with sources.",
  },
  intro: {
    th: "Beryllium Copper (ทองแดงเบริลเลียม หรือ CuBe/BeCu) คือโลหะผสมทองแดงที่เติมเบริลเลียมแล้วทำให้แข็งด้วยการบ่มแข็ง (precipitation age hardening) ผลคือวัสดุที่แข็งแรงระดับชิ้นส่วนรับแรง แต่ยังนำไฟฟ้าและความร้อนได้สูงกว่าโลหะผสมทองแดงความแข็งแรงสูงชนิดอื่นอย่างชัดเจน บทความนี้สรุปว่าคุณสมบัติเหล่านี้มาจากไหน เกรดแบ่งอย่างไร และวิศวกรนิยมใช้ทำอะไร",
    en: "Beryllium copper (CuBe or BeCu) is a copper alloy with a beryllium addition that is hardened by precipitation age hardening, giving a material strong enough for load-bearing parts with electrical and thermal conductivity considerably greater than other high-strength copper alloys. This article covers where those properties come from, how the grades divide, and what engineers use it for.",
  },
  body: [
    { t: "h2", text: { th: "ทำไม Beryllium Copper ถึงแข็งแรงแต่ยังนำไฟฟ้าได้?", en: "Why is beryllium copper strong and still conductive?" } },
    {
      t: "p",
      text: {
        th: "เพราะความแข็งแรงมาจากการบ่มแข็ง ไม่ได้มาจากการเติมธาตุผสมปริมาณมากที่ทำให้ทองแดงนำไฟฟ้าแย่ลง ค่าคุณสมบัติที่ Materion เผยแพร่จึงระบุไว้สำหรับสภาพ \"precipitation age hardened (heat treated)\" หรือสภาพหลังอบบ่มแข็งแล้ว ก่อนบ่มแข็งวัสดุจะอ่อนกว่าและขึ้นรูปได้ง่ายกว่า ซึ่งเป็นเหตุผลที่ชิ้นงานบางแบบขึ้นรูปก่อนแล้วค่อยอบ",
        en: "Because the strength comes from age hardening rather than from heavy alloying that would drag conductivity down. Materion's published property values are stated for the \"precipitation age hardened (heat treated)\" condition. Before ageing the material is softer and easier to form, which is why some parts are formed first and heat treated afterwards.",
      },
    },
    {
      t: "p",
      text: {
        th: "Materion ระบุว่าโลหะผสม CuBe ทุกตัวให้ทั้งการนำไฟฟ้า ความแข็งแรง ความแข็ง และความต้านทานการกัดกร่อนในวัสดุเดียว ต่างกันที่สัดส่วนของคุณสมบัติแต่ละด้าน",
        en: "Materion states that all of its CuBe alloys combine conductivity, strength, hardness and corrosion resistance; the grades differ in how they balance them.",
      },
    },
    { t: "h2", text: { th: "Beryllium Copper แบ่งเป็นกี่กลุ่ม?", en: "What are the main types of beryllium copper?" } },
    {
      t: "p",
      text: {
        th: "Materion แบ่ง Beryllium Copper เป็นสองกลุ่มหลัก คือกลุ่มความแข็งแรงสูง (high strength) และกลุ่มนำไฟฟ้าสูง (high conductivity) เกรดตัวแทนของแต่ละกลุ่มคือ [C17200 (Alloy 25)](/beryllium-copper/c17200) และ [C17510 (Alloy 3)](/beryllium-copper/c17510)",
        en: "Materion divides beryllium copper into two classes: high strength and high conductivity. Representative grades are [C17200 (Alloy 25)](/beryllium-copper/c17200) and [C17510 (Alloy 3)](/beryllium-copper/c17510).",
      },
    },
    {
      t: "ul",
      items: [
        {
          th: "กลุ่มแข็งแรงสูง: C17200 ที่ Materion ระบุว่าแข็งแรงที่สุดในบรรดาโลหะผสม CuBe ที่ผลิต ความต้านทานแรงดึงสูงกว่า 1380 MPa ได้ และนำไฟฟ้า 25–30% IACS (แท่ง สภาพบ่มแข็ง)",
          en: "High strength: C17200, which Materion calls the strongest CuBe alloy it makes, with tensile strength that can exceed 1380 MPa and 25–30% IACS conductivity (rod, age-hardened).",
        },
        {
          th: "กลุ่มนำไฟฟ้าสูง: C17510 ชนิดทองแดง-นิกเกิล-เบริลเลียม นำไฟฟ้า 45–60% IACS (แถบ สภาพบ่มแข็ง) แข็งแรงปานกลาง ทนการคลายความเค้นได้ดี",
          en: "High conductivity: C17510, a copper-nickel-beryllium alloy at 45–60% IACS (strip, age-hardened), with moderate strength and good stress-relaxation resistance.",
        },
        {
          th: "เกรดแถบสำหรับคอนเนคเตอร์ เช่น [C17410 (Alloy 174)](/beryllium-copper/c17410) และ [C17460 (Alloy 390)](/beryllium-copper/c17460) อยู่ระหว่างสองขั้วนี้",
          en: "Connector strip grades such as [C17410 (Alloy 174)](/beryllium-copper/c17410) and [C17460 (Alloy 390)](/beryllium-copper/c17460) sit between the two.",
        },
      ],
    },
    {
      t: "p",
      text: {
        th: "ถ้ากำลังตัดสินใจระหว่างสองเกรดหลัก อ่านต่อที่ [เปรียบเทียบ C17200 กับ C17510](/knowledge/c17200-vs-c17510)",
        en: "If you are choosing between the two main grades, read [C17200 vs C17510 compared](/knowledge/c17200-vs-c17510).",
      },
    },
    { t: "h2", text: { th: "Beryllium Copper เป็นแม่เหล็กไหม?", en: "Is beryllium copper magnetic?" } },
    {
      t: "p",
      text: {
        th: "ไม่เป็น Materion อธิบายว่า Beryllium Copper จัดเป็นวัสดุไม่เป็นแม่เหล็ก (nonmagnetic) และสมบัติทางแม่เหล็กไม่เปลี่ยนเมื่อวัสดุถูกขึ้นรูปเย็นหรือเสียรูป ต่างจากสแตนเลสออสเทนนิติกบางชนิดที่อาจเกิดจุดเป็นแม่เหล็กหลังกลึงหรือดัด จึงนิยมใช้ในชิ้นส่วนที่ทำงานใกล้สนามแม่เหล็กหรือในเครื่องมือสำรวจ",
        en: "No. Materion describes beryllium copper as nonmagnetic, and notes that cold work or deformation does not change its magnetic behaviour, unlike some austenitic stainless steels that can develop magnetic spots after machining or bending. That is why it is specified for parts that work near magnetic fields and in survey instruments.",
      },
    },
    { t: "h2", text: { th: "Beryllium Copper ใช้ทำอะไรบ้าง?", en: "What is beryllium copper used for?" } },
    {
      t: "p",
      text: {
        th: "ใช้ในงานที่ต้องการทั้งแรงสปริงหรือความทนล้า และการนำกระแสหรือระบายความร้อนในชิ้นเดียว Materion ผลิตเป็นแท่งกลม แท่งแบน ลวด ท่อ แผ่นหนา แถบ ชิ้นงานตีขึ้นรูป และชิ้นงานรีดขึ้นรูป งานที่พบบ่อยได้แก่",
        en: "It is used wherever a part needs spring force or fatigue life together with current-carrying or heat removal. Materion makes it as rod, bar, wire, tube, plate, strip, forgings and extrusions. Common uses include:",
      },
    },
    {
      t: "ul",
      items: [
        { th: "สปริง คอนแทค และคอนเนคเตอร์ในยานยนต์ โทรคมนาคม และอิเล็กทรอนิกส์", en: "Springs, contacts and connectors in automotive, telecom and electronics" },
        { th: "บูชและแบริ่งรับโหลดสูงในอากาศยาน และอุปกรณ์ขุดเจาะน้ำมันและก๊าซ", en: "High-load bushings and bearings in aerospace, and oil and gas drilling equipment" },
        {
          th: "insert แม่พิมพ์พลาสติกที่ต้องระบายความร้อนเร็ว ในรูปของโลหะผสมสำหรับแม่พิมพ์ [MoldMAX](/moldmax)",
          en: "Plastic mold inserts that must shed heat quickly, as the [MoldMAX](/moldmax) mold alloys",
        },
      ],
    },
    { t: "h2", text: { th: "ต้องระวังอะไรเมื่อใช้ Beryllium Copper?", en: "What precautions does beryllium copper need?" } },
    {
      t: "p",
      text: {
        th: "ชิ้นงานในรูปของแข็งใช้งานได้ตามปกติ สิ่งที่ต้องควบคุมคือฝุ่น ไอ หรือละอองที่เกิดเมื่อเจียร ขัด เชื่อม หรือตัดเฉือนชิ้นงาน ซึ่งต้องจัดการตามเอกสารความปลอดภัย (SDS) ของผู้ผลิต รายละเอียดอยู่ในบทความ [ทองแดงเบริลเลียมปลอดภัยไหม](/knowledge/beryllium-copper-safety) และดูเกรดทั้งหมดได้ที่หน้า [Beryllium Copper](/beryllium-copper)",
        en: "Solid parts are handled normally. What must be controlled is dust, fume or mist produced when the material is ground, polished, welded or machined, following the producer's safety data sheet (SDS). The details are in [Is beryllium copper safe?](/knowledge/beryllium-copper-safety), and every grade is listed on the [beryllium copper](/beryllium-copper) page.",
      },
    },
  ],
  faqs: [
    {
      q: { th: "Beryllium Copper กับ CuBe และ BeCu คือวัสดุเดียวกันไหม?", en: "Are beryllium copper, CuBe and BeCu the same material?" },
      a: {
        th: "ใช่ CuBe และ BeCu เป็นชื่อย่อของ Beryllium Copper หรือทองแดงเบริลเลียม ส่วนเกรดจริงระบุด้วยหมายเลข UNS เช่น C17200 หรือ C17510",
        en: "Yes. CuBe and BeCu are short names for beryllium copper. The actual grade is identified by its UNS number, such as C17200 or C17510.",
      },
    },
    {
      q: { th: "Beryllium Copper นำไฟฟ้าได้เท่าไร?", en: "How conductive is beryllium copper?" },
      a: {
        th: "ขึ้นกับเกรด Materion ระบุ C17200 (แท่ง สภาพบ่มแข็ง) ไว้ที่ 25–30% IACS และ C17510 (แถบ สภาพบ่มแข็ง) ไว้ที่ 45–60% IACS",
        en: "It depends on the grade. Materion lists C17200 (rod, age-hardened) at 25–30% IACS and C17510 (strip, age-hardened) at 45–60% IACS.",
      },
    },
    {
      q: { th: "Beryllium Copper เป็นสนิมหรือกัดกร่อนง่ายไหม?", en: "Does beryllium copper corrode easily?" },
      a: {
        th: "Materion ระบุว่าโลหะผสม CuBe มีความต้านทานการกัดกร่อนเป็นหนึ่งในคุณสมบัติหลัก ร่วมกับความแข็งแรงและการนำไฟฟ้า ส่วนความเหมาะสมกับสภาพแวดล้อมเฉพาะควรตรวจสอบกับ datasheet ของเกรดนั้น",
        en: "Materion lists corrosion resistance among the core properties of its CuBe alloys, alongside strength and conductivity. Check suitability for a specific environment against the grade's datasheet.",
      },
    },
    {
      q: { th: "ควรเริ่มเลือกเกรด Beryllium Copper จากอะไร?", en: "How do I start choosing a beryllium copper grade?" },
      a: {
        th: "เริ่มจากคำถามว่าชิ้นงานต้องการอะไรมากที่สุด ถ้าเป็นความแข็งแรงและแรงสปริงให้ดู C17200 ถ้าเป็นการนำกระแสหรือระบายความร้อนให้ดู C17510 แล้วยืนยันรูปแบบสินค้าและ temper ในใบเสนอราคา",
        en: "Start with what the part needs most. For strength and spring force look at C17200; for carrying current or moving heat look at C17510. Then confirm the form and temper in the quotation.",
      },
    },
  ],
  refs: [REF.becuHighStrength, REF.becuHighConductivity, REF.becuMagnetic, REF.moldmax],
};
