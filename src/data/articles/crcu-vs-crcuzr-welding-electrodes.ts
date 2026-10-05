import type { Article } from "./types";
import { REF } from "./sources";

/*
 * The chrome-copper family has no datasheet or numeric data of its own, so
 * every CrCu/CrCuZr distinction here is sourced from pages fetched
 * 2026-10-05:
 *  - ALCAVIL C18200 page: UNS C18200 = copper chromium, RWMA Class 2 per
 *    AWS J1.3, Class 2 minimums ≥ 80 % IACS and ≥ 75 HRB; C18150 has
 *    "higher softening resistance", suits MFDC welders and high-strength
 *    galvanized steels; C18200 "more economical"; Class 2 not for projection
 *    welding of nuts/studs.
 *  - ALCAVIL C18150 page: UNS C18150 = CuCrZr, Class 2 variant of C18200
 *    with added zirconium; "practically interchangeable" for most Class 2 work.
 *  - AMPCO METAL Academy: CuCrZr hardened by solution annealing + ageing
 *    (chromium precipitates); reference material for RWMA Class 2 electrodes;
 *    pure copper caps mushroom, CuCrZr caps hold hardness far longer.
 * Softening temperatures are NOT stated: the fetched sources disagree
 * (ALCAVIL lists the same figure for both alloys), so the copy stays
 * qualitative on that point.
 */
export const crcuVsCrcuzr: Article = {
  slug: "crcu-vs-crcuzr-welding-electrodes",
  topic: ["chrome-copper"],
  date: "2026-10-05",
  modified: "2026-10-05",
  image: "/images/hero-rod-light.webp",
  title: {
    th: "CrCu กับ CrCuZr ต่างกันอย่างไร สำหรับหัวเชื่อมจุด",
    en: "CrCu vs CrCuZr for Spot-Welding Electrodes",
  },
  h1: {
    th: "CrCu กับ CrCuZr ต่างกันอย่างไร: เลือกทองแดงโครเมียมสำหรับหัวเชื่อมจุด",
    en: "CrCu vs CrCuZr: Choosing Chrome Copper for Spot-Welding Electrodes",
  },
  description: {
    th: "CrCu (C18200) และ CrCuZr (C18150) เป็นทองแดงโครเมียม RWMA Class 2 สำหรับหัวเชื่อมจุด ต่างกันที่เซอร์โคเนียมซึ่งช่วยต้านการอ่อนตัวเมื่อร้อน ดูวิธีเลือกและสิ่งที่ต้องยืนยัน",
    en: "CrCu (C18200) and CrCuZr (C18150) are RWMA Class 2 chrome coppers for spot-welding electrodes; zirconium adds softening resistance. How to choose.",
  },
  intro: {
    th: "CrCu กับ CrCuZr ต่างกันที่ CrCuZr เติมเซอร์โคเนียมเพิ่ม ซึ่งทำให้ต้านการอ่อนตัวเมื่อร้อนได้ดีกว่า ส่วนการนำไฟฟ้าและความแข็งอยู่ในเกณฑ์เดียวกัน ทั้งสองเป็นวัสดุหัวเชื่อมจุด RWMA Class 2: CrCu คือ UNS C18200 และ CrCuZr คือ UNS C18150 ในงาน Class 2 ส่วนใหญ่ใช้แทนกันได้ ส่วน CrCuZr เหมาะกว่ากับเครื่องเชื่อม MFDC และงานเชื่อมเหล็กชุบสังกะสีความแข็งแรงสูง",
    en: "CrCu and CrCuZr differ in that CrCuZr adds zirconium, which gives it better resistance to softening at temperature, while conductivity and hardness sit in the same class. Both are RWMA Class 2 electrode materials: CrCu is UNS C18200 and CrCuZr is UNS C18150. For most Class 2 work they are interchangeable; CrCuZr is the better fit for MFDC welders and high-strength galvanized steel.",
  },
  body: [
    { t: "h2", text: { th: "CrCu และ CrCuZr คืออะไร?", en: "What are CrCu and CrCuZr?" } },
    {
      t: "p",
      text: {
        th: "ทั้งสองเป็นทองแดงที่เติมโครเมียมเล็กน้อยแล้วทำให้แข็งด้วยความร้อน AMPCO METAL อธิบายกระบวนการของ CuCrZr ว่าอบละลาย (solution annealing) ให้โครเมียมละลายเข้าไปในเนื้อทองแดง แล้วบ่มที่อุณหภูมิต่ำกว่าให้เกิดอนุภาคโครเมียมละเอียดกระจายตัว ผลคือวัสดุที่แข็งกว่าทองแดงบริสุทธิ์มากแต่ยังนำไฟฟ้าได้ดี ซึ่งเป็นคุณสมบัติที่หัวเชื่อมต้องมี ดูรายละเอียดสินค้าได้ที่หน้า [Chrome Copper](/chrome-copper)",
        en: "Both are copper with a small chromium addition, hardened by heat treatment. AMPCO METAL describes the process for CuCrZr as solution annealing, so the chromium dissolves into the copper, then ageing at a lower temperature so fine chromium precipitates form. The result is far harder than pure copper while still conducting well, which is what an electrode needs. Product details are on the [chrome copper](/chrome-copper) page.",
      },
    },
    { t: "h2", text: { th: "ทำไมหัวเชื่อมจุดไม่ใช้ทองแดงบริสุทธิ์?", en: "Why aren't spot-welding electrodes pure copper?" } },
    {
      t: "p",
      text: {
        th: "เพราะทองแดงบริสุทธิ์อ่อนเกินไปสำหรับแรงกดและความร้อนซ้ำ ๆ AMPCO METAL อธิบายว่าแคปหัวเชื่อมทองแดงบริสุทธิ์จะบานออก (mushroom) หลังเชื่อมไปไม่นาน ขณะที่แคป CuCrZr คงความแข็งได้นานกว่ามาก เมื่อหน้าหัวเชื่อมบานออก พื้นที่สัมผัสจะกว้างขึ้นและความหนาแน่นกระแสลดลง จุดเชื่อมจึงเล็กลง ต้องแต่งหัวหรือเปลี่ยนบ่อยขึ้น",
        en: "Because pure copper is too soft for repeated force and heat. AMPCO METAL notes that a pure copper electrode cap mushrooms quickly, while CuCrZr caps hold their hardness over far longer runs. As the face mushrooms the contact area grows and current density falls, so welds get smaller and the tip must be dressed or replaced more often.",
      },
    },
    { t: "h2", text: { th: "เซอร์โคเนียมใน CrCuZr ช่วยอะไร?", en: "What does the zirconium in CrCuZr do?" } },
    {
      t: "p",
      text: {
        th: "เซอร์โคเนียมช่วยให้วัสดุต้านการอ่อนตัวเมื่อร้อนได้ดีขึ้น ALCAVIL ผู้ผลิตวัสดุหัวเชื่อม ระบุว่า C18150 (CuCrZr) มีความต้านทานการอ่อนตัว (softening resistance) สูงกว่า C18200 และเหมาะกับเครื่องเชื่อม MFDC และงานเชื่อมเหล็กชุบสังกะสีความแข็งแรงสูง ส่วน C18200 (CrCu) ประหยัดกว่าสำหรับงานทั่วไป",
        en: "Zirconium improves resistance to softening at temperature. ALCAVIL, an electrode-materials producer, states that C18150 (CuCrZr) has higher softening resistance than C18200 and suits MFDC welders and high-strength galvanized steels, while C18200 (CrCu) is the more economical choice for general work.",
      },
    },
    {
      t: "table",
      head: [
        { th: "หัวข้อ", en: "Point" },
        { th: "CrCu", en: "CrCu" },
        { th: "CrCuZr", en: "CrCuZr" },
      ],
      rows: [
        [{ th: "หมายเลข UNS", en: "UNS number" }, "C18200", "C18150"],
        [{ th: "คลาส RWMA", en: "RWMA class" }, "Class 2", "Class 2"],
        [
          { th: "ค่าขั้นต่ำ Class 2 ตาม AWS J1.3", en: "Class 2 minimums (AWS J1.3)" },
          "≥ 80 % IACS, ≥ 75 HRB",
          "≥ 80 % IACS, ≥ 75 HRB",
        ],
        [
          { th: "การต้านการอ่อนตัวเมื่อร้อน", en: "Softening resistance" },
          { th: "มาตรฐาน Class 2", en: "Standard for Class 2" },
          { th: "สูงกว่า", en: "Higher" },
        ],
        [
          { th: "งานที่เหมาะ", en: "Typical fit" },
          { th: "เหล็กคาร์บอนต่ำ เหล็กชุบสังกะสี งานผลิตจำนวนมาก", en: "Low-carbon and galvanized steel, high-volume production" },
          { th: "เครื่อง MFDC เหล็กชุบสังกะสีความแข็งแรงสูง", en: "MFDC welders, high-strength galvanized steel" },
        ],
      ],
      note: {
        th: "ข้อมูลจากหน้าเทคนิคของ ALCAVIL (alcavil.com.mx) สำหรับ C18200 และ C18150 ค่าขั้นต่ำเป็นเกณฑ์ของ RWMA Class 2 ตาม AWS J1.3 ไม่ใช่ค่ารับรองของสินค้าที่เราจัดหา ซึ่งต้องยืนยันจากใบรับรองวัสดุในแต่ละคำสั่งซื้อ",
        en: "From ALCAVIL's technical pages (alcavil.com.mx) for C18200 and C18150. The minimums are the RWMA Class 2 criteria under AWS J1.3, not certified values for material we supply; those are confirmed by the material certificate for each order.",
      },
    },
    { t: "h2", text: { th: "ควรเลือก CrCu หรือ CrCuZr?", en: "Should you choose CrCu or CrCuZr?" } },
    {
      t: "p",
      text: {
        th: "เลือก CrCu เมื่อเป็นงานเชื่อมจุดทั่วไปที่ต้องการความคุ้มค่า และเลือก CrCuZr เมื่อใช้เครื่องเชื่อม MFDC หรือเชื่อมเหล็กชุบสังกะสีความแข็งแรงสูง ALCAVIL ระบุว่าสองเกรดนี้ใช้แทนกันได้ในงาน Class 2 ส่วนใหญ่ ถ้าหัวเชื่อมเดิมเสื่อมเร็วเพราะอ่อนตัว ความต้านทานการอ่อนตัวที่สูงกว่าของ CrCuZr คือเหตุผลที่ควรพิจารณา",
        en: "Choose CrCu for general spot welding where value matters, and CrCuZr for MFDC welders or high-strength galvanized steel. ALCAVIL says the two are interchangeable for most Class 2 work. If your current electrodes wear out early by softening, CrCuZr's higher softening resistance is the reason to consider it.",
      },
    },
    {
      t: "p",
      text: {
        th: "ALCAVIL ยังระบุว่าวัสดุ Class 2 เหมาะกับการเชื่อมจุดแผ่นกับแผ่น แต่ไม่เหมาะกับการเชื่อมแบบ projection ของน็อตหรือสตัด ซึ่งต้องใช้วัสดุคลาสอื่น หากงานเป็นแบบนั้นให้แจ้งในใบขอราคา",
        en: "ALCAVIL also notes that Class 2 suits sheet-to-sheet spot welding but not projection welding of nuts or studs, which needs a different electrode class. If that is your job, say so in your quote request.",
      },
    },
    { t: "h2", text: { th: "ต้องยืนยันอะไรกับผู้จำหน่ายก่อนสั่ง?", en: "What should you confirm with the supplier before ordering?" } },
    {
      t: "ul",
      items: [
        { th: "เกรดและมาตรฐานที่อ้างอิง (เช่น UNS C18200 หรือ C18150, RWMA Class 2)", en: "The grade and the standard it is made to (for example UNS C18200 or C18150, RWMA Class 2)" },
        { th: "ค่าความแข็งและการนำไฟฟ้าที่รับรองในใบรับรองวัสดุ (mill certificate)", en: "Hardness and conductivity as certified on the mill certificate" },
        { th: "รูปแบบและขนาด: แท่งกลม แท่งเหลี่ยม แผ่น หรือชิ้นงานกลึงสำเร็จ", en: "Form and size: round bar, square bar, plate or finished machined parts" },
        { th: "ลักษณะงาน: วัสดุที่เชื่อม ชนิดเครื่องเชื่อม และอัตราการเชื่อม เพื่อยืนยันว่าเกรดเหมาะกับงาน", en: "The job: material being welded, welder type and weld rate, so the grade can be checked against it" },
      ],
    },
    {
      t: "p",
      text: {
        th: "แวน อินเตอร์เทรด จัดหาทั้ง CrCu และ CrCuZr ส่งรายละเอียดข้างต้นผ่านหน้า [Chrome Copper](/chrome-copper) หรือ [ขอใบเสนอราคา](/contact?product=chrome-copper)",
        en: "VAN INTERTRADE supplies both CrCu and CrCuZr. Send the details above from the [chrome copper](/chrome-copper) page or [request a quote](/contact?product=chrome-copper).",
      },
    },
  ],
  faqs: [
    {
      q: { th: "CrCuZr คืออะไร?", en: "What is CrCuZr?" },
      a: {
        th: "CrCuZr คือทองแดงโครเมียมเซอร์โคเนียม (UNS C18150) โลหะผสมทองแดงที่ทำให้แข็งด้วยการบ่มแข็ง ใช้ทำหัวเชื่อมจุด RWMA Class 2 โดยเซอร์โคเนียมช่วยให้ต้านการอ่อนตัวเมื่อร้อนได้ดีกว่า CrCu",
        en: "CrCuZr is copper-chromium-zirconium (UNS C18150), an age-hardened copper alloy used for RWMA Class 2 spot-welding electrodes. The zirconium gives it better softening resistance than CrCu.",
      },
    },
    {
      q: { th: "CrCu กับ CrCuZr ใช้แทนกันได้ไหม?", en: "Can CrCu and CrCuZr be used interchangeably?" },
      a: {
        th: "ในงาน Class 2 ส่วนใหญ่ใช้แทนกันได้ ตามที่ ALCAVIL ระบุ แต่สำหรับเครื่องเชื่อม MFDC หรืองานเชื่อมเหล็กชุบสังกะสีความแข็งแรงสูง ALCAVIL ระบุว่า CrCuZr เหมาะกว่า",
        en: "For most Class 2 work, yes, according to ALCAVIL. For MFDC welders or high-strength galvanized steel, ALCAVIL names CrCuZr as the better fit.",
      },
    },
    {
      q: { th: "หัวเชื่อม RWMA Class 2 ต้องนำไฟฟ้าและแข็งเท่าไร?", en: "What conductivity and hardness does RWMA Class 2 require?" },
      a: {
        th: "ALCAVIL ระบุค่าขั้นต่ำของ Class 2 ตาม AWS J1.3 ไว้ที่ 80% IACS และ 75 HRB ค่าจริงของวัสดุที่ซื้อควรดูจากใบรับรองวัสดุของแต่ละล็อต",
        en: "ALCAVIL gives the AWS J1.3 Class 2 minimums as 80% IACS and 75 HRB. The actual values of material you buy should be read from the certificate for each lot.",
      },
    },
  ],
  refs: [REF.alcavilC18200, REF.alcavilC18150, REF.ampcoCuCrZr],
};
