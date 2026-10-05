import type { Article } from "./types";
import { REF } from "./sources";

/*
 * Strictly from Materion's published safety guidance, read 2026-10-05:
 *  - Materion SDS "Copper Beryllium Wrought Alloy" (A10, SDS US, version 09,
 *    revision 05-07-2025): hazard statements (section 2), the list of
 *    particulate-generating operations (section 2 supplemental), "As
 *    supplied, there is no immediate medical risk with beryllium products in
 *    article form" (section 4), "In solid form this material poses no special
 *    clean-up problems" (section 6), engineering controls / wet methods /
 *    work practices / housekeeping / PPE / respirators (section 8),
 *    Materion's recommendation to reduce airborne exposure to the lowest
 *    feasible level, susceptibility factors, and the SDS synonyms list that
 *    names C17200, C17510, C17410, C17460, MoldMAX and PROtherm.
 *  - Materion's EHS page and berylliumsafety.com (Materion-run) as the
 *    places Materion points readers to.
 * No exposure-limit numbers are restated (they differ by jurisdiction; the
 * reader is sent to the current SDS and local regulation). No medical advice
 * beyond the SDS's own "if exposed or concerned, get medical advice".
 */
export const berylliumCopperSafety: Article = {
  slug: "beryllium-copper-safety",
  topic: ["beryllium-copper", "moldmax"],
  grades: ["beryllium-copper/c17200", "beryllium-copper/c17510"],
  date: "2026-10-05",
  modified: "2026-10-05",
  image: "/images/product-cube.webp",
  title: {
    th: "ทองแดงเบริลเลียมปลอดภัยไหม การกลึงและการจัดการ",
    en: "Is Beryllium Copper Safe? Machining and Handling",
  },
  h1: {
    th: "ทองแดงเบริลเลียมปลอดภัยไหม: การกลึงและการจัดการอย่างถูกต้องตามคำแนะนำของ Materion",
    en: "Is Beryllium Copper Safe? Machining and Handling per Materion's Guidance",
  },
  description: {
    th: "SDS ของ Materion ระบุว่าทองแดงเบริลเลียมในรูปชิ้นงานตามที่จัดส่งไม่มีความเสี่ยงทางการแพทย์ทันที อันตรายมาจากฝุ่นและไอจากการกลึง เจียร เชื่อม สรุปแนวทางควบคุมจาก SDS",
    en: "Per Materion's SDS, solid beryllium copper as supplied carries no immediate medical risk; the hazard is dust and fume from processing. Controls from the SDS.",
  },
  intro: {
    th: "ตาม SDS ของ Materion ทองแดงเบริลเลียมในรูปชิ้นงานแข็งตามที่จัดส่ง \"ไม่มีความเสี่ยงทางการแพทย์ในทันที\" อันตรายมาจากอนุภาค (ฝุ่น ไอ หรือละออง) ที่เกิดจากกระบวนการผลิต โดยหลักผ่านการหายใจเข้าไป และผ่านการสัมผัสทางผิวหนังด้วย บทความนี้สรุปแนวทางจากเอกสารของ Materion เพื่อให้เห็นภาพรวม ไม่ใช่เอกสารแทน SDS ก่อนเริ่มงานจริงต้องอ่าน SDS ฉบับปัจจุบันที่ขอได้จากผู้จำหน่ายวัสดุ",
    en: "As supplied in solid form, beryllium copper carries no immediate medical risk, according to Materion's SDS: \"As supplied, there is no immediate medical risk with beryllium products in article form.\" The hazard comes from particulate (dust, fume or mist) created by processing, mainly by inhalation and also by skin contact. This article summarizes Materion's guidance as an overview. It does not replace the SDS: before starting work, read the current SDS, which you can request from your material supplier.",
  },
  body: [
    { t: "h2", text: { th: "ความเสี่ยงของทองแดงเบริลเลียมอยู่ตรงไหน?", en: "Where does the risk with beryllium copper come from?" } },
    {
      t: "p",
      text: {
        th: "ความเสี่ยงหลักมาจากอนุภาคที่เกิดจากกระบวนการผลิต ไม่ได้มาจากการใช้งานชิ้นงานแข็งตามที่จัดส่ง SDS ของ Materion ระบุว่าการสัมผัสผ่านการหายใจ การกลืน และผิวหนัง เกิดได้เมื่อหลอม หล่อ จัดการขี้ตะกรัน (dross) กัดผิวด้วยกรด (pickling) ทำความสะอาดด้วยสารเคมี อบชุบความร้อน ตัดด้วยใบตัดแบบขัด (abrasive cutting) เชื่อม เจียร ขัดกระดาษทราย ขัดเงา กัด บด หรือทำให้ผิววัสดุร้อนหรือสึกในลักษณะที่เกิดอนุภาค SDS ระบุอันตรายของวัสดุไว้ดังนี้",
        en: "The main risk comes from particulate created by processing, not from using solid parts as supplied. Materion's SDS says exposure by inhalation, ingestion and skin contact can occur when melting, casting, dross handling, pickling, chemical cleaning, heat treating, abrasive cutting, welding, grinding, sanding, polishing, milling, crushing, or otherwise heating or abrading the surface in a way that generates particulate. The SDS lists the material's hazards as:",
      },
    },
    {
      t: "ul",
      items: [
        { th: "อาจทำให้เกิดอาการแพ้ทางผิวหนัง", en: "May cause an allergic skin reaction" },
        { th: "อาจทำให้เกิดอาการแพ้ หอบหืด หรือหายใจลำบากหากหายใจเข้าไป", en: "May cause allergy or asthma symptoms or breathing difficulties if inhaled" },
        { th: "ทำลายอวัยวะ (ระบบทางเดินหายใจ) เมื่อหายใจเข้าไปเป็นเวลานานหรือซ้ำ ๆ", en: "Causes damage to organs (respiratory system) through prolonged or repeated inhalation" },
        { th: "อาจก่อให้เกิดมะเร็ง", en: "May cause cancer" },
      ],
    },
    {
      t: "p",
      text: {
        th: "SDS ยังกล่าวถึงโรคเบริลเลียมเรื้อรัง (chronic beryllium disease, CBD) ซึ่งเป็นภาวะของปอดที่เกิดได้ในบางคน และระบุว่ามีปัจจัยทางพันธุกรรมที่ทำให้บางคนไวต่อโรคนี้มากกว่า ข้อมูลทางการแพทย์ทั้งหมดอยู่ในหมวดที่ 4 และ 11 ของ SDS หากสัมผัสหรือมีข้อกังวล SDS แนะนำให้ปรึกษาแพทย์",
        en: "The SDS also covers chronic beryllium disease (CBD), a lung condition that can develop in some individuals, and notes that specific genetic factors make some people more susceptible. The medical information is in sections 4 and 11 of the SDS; if exposed or concerned, the SDS advises getting medical advice.",
      },
    },
    { t: "h2", text: { th: "กลึงหรือกัดทองแดงเบริลเลียมต้องทำอย่างไร?", en: "How should beryllium copper be machined?" } },
    {
      t: "p",
      text: {
        th: "ให้ควบคุมอนุภาคที่ต้นทาง SDS ของ Materion ระบุว่างานตัดเฉือนโดยทั่วไปทำภายใต้น้ำหล่อเย็นแบบท่วม (coolant flood) ซึ่งช่วยลดอนุภาคในอากาศ แต่อนุภาคละเอียดที่สะสมในน้ำหล่อเย็นที่วนใช้ซ้ำอาจฟุ้งขึ้นมาได้ จึงต้องมีระบบกรองน้ำหล่อเย็นและป้องกันไม่ให้กระเด็นใส่พื้นหรือเสื้อผ้า งานเจียรและขัดกระดาษทรายอาจต้องใช้ฝาครอบปิดและระบบดูดอากาศเฉพาะจุด",
        en: "Control particles at the source. Materion's SDS says machining is usually done under a liquid coolant flood, which helps reduce airborne particulate, but fine particulate building up in recirculated coolant can become airborne, so the coolant should be filtered and kept from splashing onto floors or clothing. Sanding and grinding may need complete hooded containment and local exhaust ventilation.",
      },
    },
    {
      t: "ul",
      items: [
        {
          th: "ระบบระบายอากาศ: ใช้ระบบดูดอากาศเฉพาะจุด (local exhaust ventilation) เป็นวิธีหลัก วางปากดูดให้ใกล้จุดที่เกิดอนุภาคที่สุด ไม่ให้พัดลมรบกวนทิศลม และตรวจระบบสม่ำเสมอ",
          en: "Ventilation: local exhaust ventilation is the preferred control, with the inlet as close as possible to where particles are generated, no fans disrupting the airflow, and regular checks.",
        },
        {
          th: "การทำความสะอาด: ใช้เครื่องดูดฝุ่นแบบ HEPA และการเช็ดเปียก ห้ามใช้ลมอัด ไม้กวาด หรือเครื่องดูดฝุ่นทั่วไป เพราะทำให้อนุภาคฟุ้ง",
          en: "Cleaning: use HEPA-filtered vacuums and wet methods; never compressed air, brooms or ordinary vacuum cleaners, which put particles back into the air.",
        },
        {
          th: "การปฏิบัติงาน: ทำความสะอาดอนุภาคที่ติดบนชิ้นงานระหว่างขั้นตอน เก็บชุดทำงานที่ปนเปื้อนไว้ในที่ทำงาน ล้างมือก่อนกินหรือสูบบุหรี่ และไม่กิน ดื่ม หรือสูบบุหรี่ขณะทำงาน",
          en: "Work practice: clean loose particulate off parts between steps, keep contaminated work clothing at the workplace, wash hands before eating or smoking, and do not eat, drink or smoke while working.",
        },
        {
          th: "อุปกรณ์ป้องกัน: สวมถุงมือและแว่นตานิรภัยหรือหน้ากากกันกระเด็นเมื่อมีฝุ่น ละออง หรือไอ ถ้าการระบายอากาศไม่เพียงพอต้องใช้อุปกรณ์ป้องกันระบบหายใจที่ผู้เชี่ยวชาญด้านอาชีวอนามัยกำหนด พร้อมทดสอบความกระชับและฝึกการใช้",
          en: "Protective equipment: gloves, and safety glasses or a face shield where dust, mist or fume is present. Where ventilation is inadequate, respirators specified by an industrial hygienist or other qualified professional, with fit testing and training.",
        },
      ],
    },
    { t: "h2", text: { th: "เชื่อมหรือซ่อมแม่พิมพ์ทองแดงเบริลเลียมได้ไหม?", en: "Can beryllium copper molds be welded or repaired?" } },
    {
      t: "p",
      text: {
        th: "ได้ แต่ต้องควบคุมไอเชื่อมตาม SDS เพราะงานเชื่อมเป็นหนึ่งในกระบวนการที่ SDS ระบุว่าทำให้เกิดอนุภาค Materion มีลวดเติม WeldPak และ WeldPak XL สำหรับซ่อมแม่พิมพ์ [MoldMAX](/moldmax) ที่เป็นทองแดงเบริลเลียมด้วยการเชื่อม TIG ทั้งนี้ MoldMAX HH และ PROtherm เป็นทองแดงเบริลเลียม ส่วน MoldMAX V และ MoldMAX XL ไม่ใช่",
        en: "Yes, with welding fume controlled per the SDS, since welding is one of the processes the SDS lists as generating particulate. Materion offers WeldPak and WeldPak XL filler metal for TIG repair of beryllium copper [MoldMAX](/moldmax) molds. Note that MoldMAX HH and PROtherm are beryllium copper, while MoldMAX V and MoldMAX XL are not.",
      },
    },
    { t: "h2", text: { th: "เกรดไหนบ้างที่ต้องใช้แนวทางนี้?", en: "Which grades does this guidance cover?" } },
    {
      t: "p",
      text: {
        th: "ครอบคลุมเกรดรีดขึ้นรูป (wrought) ที่ SDS ฉบับนี้ระบุ ได้แก่ [C17200](/beryllium-copper/c17200), [C17510](/beryllium-copper/c17510), C17410, C17460 และ MoldMAX/PROtherm ส่วนโลหะผสมแบบหล่อ (cast) มี SDS ของตัวเองแยกต่างหาก ให้ใช้ SDS ที่ตรงกับผลิตภัณฑ์เสมอ ดูเกรดทั้งหมดได้ที่หน้า [Beryllium Copper](/beryllium-copper)",
        en: "It covers the wrought grades this SDS lists: [C17200](/beryllium-copper/c17200), [C17510](/beryllium-copper/c17510), C17410, C17460 and MoldMAX/PROtherm. Cast alloys have their own SDS, so always use the SDS that matches the product. All grades are on the [beryllium copper](/beryllium-copper) page.",
      },
    },
    { t: "h2", text: { th: "ต้องปฏิบัติตามกฎหมายหรือค่าขีดจำกัดใด?", en: "Which rules or exposure limits apply?" } },
    {
      t: "p",
      text: {
        th: "ให้ใช้กฎหมายอาชีวอนามัยของประเทศที่ทำงานและค่าที่ระบุใน SDS ฉบับปัจจุบัน SDS ของ Materion รวบรวมค่าขีดจำกัดการสัมผัสจากหลายหน่วยงาน และ Materion แนะนำให้ผู้ใช้ลดการสัมผัสเบริลเลียมในอากาศให้ต่ำที่สุดเท่าที่ทำได้ นอกเหนือจากการปฏิบัติตามกฎหมาย Materion ให้ข้อมูลเพิ่มเติมไว้ที่หน้าสิ่งแวดล้อม สุขภาพ และความปลอดภัยของบริษัท และเว็บไซต์ berylliumsafety.com",
        en: "Follow the occupational health rules where you work and the values in the current SDS. Materion's SDS collects exposure limits from several agencies, and Materion recommends that users reduce airborne beryllium exposure to the lowest feasible level, beyond simply complying with regulation. Materion publishes more on its environmental, health and safety page and at berylliumsafety.com.",
      },
    },
    {
      t: "p",
      text: {
        th: "สรุป: ขอ SDS ฉบับปัจจุบันจากผู้จำหน่ายก่อนเริ่มงานทุกครั้ง และให้ผู้รับผิดชอบด้านความปลอดภัยของโรงงานกำหนดมาตรการตาม SDS นั้น",
        en: "In short: ask your supplier for the current SDS before any work starts, and have your plant's safety lead set the controls from it.",
      },
    },
  ],
  faqs: [
    {
      q: { th: "จับชิ้นงานทองแดงเบริลเลียมด้วยมือเปล่าอันตรายไหม?", en: "Is it dangerous to handle beryllium copper parts?" },
      a: {
        th: "SDS ของ Materion ระบุว่าผลิตภัณฑ์เบริลเลียมในรูปชิ้นงานตามที่จัดส่งไม่มีความเสี่ยงทางการแพทย์ในทันที แต่แนะนำให้สวมถุงมือเพื่อกันบาดและกันการสัมผัสอนุภาค และล้างมือหลังทำงาน",
        en: "Materion's SDS states that, as supplied, beryllium products in article form carry no immediate medical risk. It recommends gloves to prevent cuts and contact with particulate, and washing hands after handling.",
      },
    },
    {
      q: { th: "กลึงทองแดงเบริลเลียมแบบแห้งได้ไหม?", en: "Can beryllium copper be machined dry?" },
      a: {
        th: "SDS ของ Materion ไม่ได้ให้แนวทางการกลึงแบบแห้ง แต่ระบุว่างานตัดเฉือนโดยทั่วไปทำภายใต้น้ำหล่อเย็นแบบท่วมเพื่อช่วยลดอนุภาคในอากาศ ร่วมกับการระบายอากาศเฉพาะจุด การเลือกวิธีทำงานใด ๆ ต้องประเมินตาม SDS และให้ผู้รับผิดชอบด้านความปลอดภัยกำหนด",
        en: "Materion's SDS gives no guidance for dry machining; it says machining is usually done under a liquid coolant flood to help reduce airborne particulate, together with local exhaust ventilation. Any method should be assessed against the SDS and set by your safety lead.",
      },
    },
    {
      q: { th: "ทำความสะอาดเศษและฝุ่นทองแดงเบริลเลียมอย่างไร?", en: "How should beryllium copper chips and dust be cleaned up?" },
      a: {
        th: "ใช้เครื่องดูดฝุ่นแบบ HEPA และการเช็ดเปียก ห้ามใช้ลมอัด ไม้กวาด หรือเครื่องดูดฝุ่นทั่วไป ตามที่ SDS ของ Materion ระบุ",
        en: "Use HEPA-filtered vacuums and wet cleaning, never compressed air, brooms or ordinary vacuum cleaners, as Materion's SDS specifies.",
      },
    },
    {
      q: { th: "ขอ SDS ของทองแดงเบริลเลียมได้จากที่ไหน?", en: "Where do I get the SDS for beryllium copper?" },
      a: {
        th: "ขอฉบับปัจจุบันจากผู้จำหน่ายวัสดุของคุณ หรือดูได้จากหน้า Safety Data Sheets ของ Materion ควรใช้ SDS ที่ตรงกับผลิตภัณฑ์และฉบับล่าสุดเสมอ",
        en: "Ask your material supplier for the current version, or find it on Materion's Safety Data Sheets page. Always use the SDS that matches the product, in its latest revision.",
      },
    },
  ],
  refs: [REF.sds, REF.ehs, REF.berylliumSafety],
};
