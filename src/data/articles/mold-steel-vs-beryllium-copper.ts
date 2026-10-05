import type { Article } from "./types";
import { REF } from "./sources";

/*
 * Comparison strictly from Materion's MoldMAX page (re-read 2026-10-05): the
 * "Compare MoldMAX alloys with other materials" table (P-20 row: Rockwell 30,
 * 17 BTU/ft·hr·°F, yield 120 ksi, tensile 140 ksi; the table states no
 * Rockwell scale), "four to six times" (MoldMAX HH), "up to ten times"
 * (MoldMAX range), and the qualitative "shorter cycle time". No cycle-time
 * percentage is published by Materion, so none is stated here.
 */
export const moldSteelVsBerylliumCopper: Article = {
  slug: "mold-steel-vs-beryllium-copper",
  topic: ["moldmax"],
  date: "2026-10-05",
  modified: "2026-10-05",
  image: "/images/product-moldmax.webp",
  title: {
    th: "เหล็กแม่พิมพ์ vs ทองแดงเบริลเลียม เปรียบเทียบ Cycle Time",
    en: "Mold Steel vs Beryllium Copper for Mold Cooling",
  },
  h1: {
    th: "เหล็กแม่พิมพ์ vs ทองแดงเบริลเลียม: เปรียบเทียบการระบายความร้อนและ Cycle Time",
    en: "Mold Steel vs Beryllium Copper: Heat Removal and Cycle Time",
  },
  description: {
    th: "เหล็กทำแม่พิมพ์ P-20 กับทองแดงเบริลเลียม MoldMAX ต่างกันอย่างไร เทียบความแข็ง การนำความร้อน และความแข็งแรงจากตารางของ Materion และผลต่อ cycle time ของแม่พิมพ์ฉีดพลาสติก",
    en: "P-20 mold steel vs MoldMAX beryllium copper: hardness, thermal conductivity and strength from Materion's table, and what it means for cycle time.",
  },
  intro: {
    th: "ทองแดงเบริลเลียมสำหรับแม่พิมพ์ระบายความร้อนได้ดีกว่าเหล็กทำแม่พิมพ์หลายเท่าโดยยังแข็งใกล้เคียงหรือแข็งกว่า ตารางของ Materion ระบุเหล็ก P-20 ที่การนำความร้อน 17 BTU/ft·hr·°F เทียบกับ 75 ของ MoldMAX HH และ 145 ของ PROtherm แม่พิมพ์จึงเย็นตัวเร็วขึ้นในจุดที่ใส่ทองแดงเบริลเลียม ซึ่ง Materion ระบุว่าช่วยให้รอบการผลิต (cycle time) สั้นลง",
    en: "Beryllium copper mold alloys remove heat several times faster than mold steel while matching or beating its hardness: Materion's table lists P-20 steel at 17 BTU/ft·hr·°F of thermal conductivity against 75 for MoldMAX HH and 145 for PROtherm. The mold cools faster wherever the copper alloy is used, which Materion says shortens the cycle time.",
  },
  body: [
    { t: "h2", text: { th: "เหล็ก P-20 กับทองแดงเบริลเลียมต่างกันแค่ไหนในตัวเลข?", en: "How far apart are P-20 steel and beryllium copper in numbers?" } },
    {
      t: "p",
      text: {
        th: "ต่างกันมากที่การนำความร้อน แต่ใกล้กันที่ความแข็งและความแข็งแรง ตารางด้านล่างคัดจากตาราง \"Compare MoldMAX alloys with other materials\" บนหน้า MoldMAX ของ Materion เฉพาะเหล็ก P-20 และสองเกรดที่เป็นทองแดงเบริลเลียม",
        en: "They are far apart on thermal conductivity and close on hardness and strength. The table below is taken from the \"Compare MoldMAX alloys with other materials\" table on Materion's MoldMAX page, showing P-20 steel and the two grades that are beryllium copper.",
      },
    },
    {
      t: "table",
      head: [
        { th: "วัสดุ", en: "Material" },
        { th: "ความแข็ง Rockwell", en: "Rockwell hardness" },
        { th: "การนำความร้อน (BTU/ft·hr·°F)", en: "Thermal conductivity (BTU/ft·hr·°F)" },
        { th: "Yield strength (ksi)", en: "Yield strength (ksi)" },
        { th: "Tensile strength (ksi)", en: "Tensile strength (ksi)" },
      ],
      rows: [
        [{ th: "เหล็กเครื่องมือ P-20", en: "P-20 tool steel" }, "30", "17", "120", "140"],
        ["MoldMAX HH", "40", "75", "145", "170"],
        ["PROtherm", "20", "145", "90", "105"],
      ],
      note: {
        th: "ค่าทั่วไปจากตารางของ Materion (materion.com, หน้า MoldMAX Alloys) ตารางไม่ได้ระบุสเกลของค่าความแข็ง Rockwell ตรวจสอบกับ datasheet ก่อนออกแบบ",
        en: "Typical values from Materion's table (materion.com, MoldMAX Alloys page). The table does not state the Rockwell scale. Confirm against the datasheet before design.",
      },
    },
    {
      t: "p",
      text: {
        th: "[MoldMAX HH](/moldmax/moldmax-hh) แข็งกว่าและแข็งแรงกว่า P-20 ในตารางนี้ และ Materion ระบุว่านำความร้อนได้สูงกว่าเหล็กเครื่องมือมาตรฐานสี่ถึงหกเท่า ส่วน [PROtherm](/moldmax/protherm) ยอมลดความแข็งลงเพื่อการนำความร้อนสูงสุดในตาราง",
        en: "[MoldMAX HH](/moldmax/moldmax-hh) is harder and stronger than P-20 in this table, and Materion states it conducts heat four to six times better than standard tool steels. [PROtherm](/moldmax/protherm) gives up hardness for the highest thermal conductivity in the table.",
      },
    },
    { t: "h2", text: { th: "ทำไมการนำความร้อนถึงมีผลกับ Cycle Time?", en: "Why does thermal conductivity affect cycle time?" } },
    {
      t: "p",
      text: {
        th: "เพราะชิ้นงานพลาสติกต้องเย็นตัวในแม่พิมพ์จนแข็งพอจะปลดออกได้ และช่วงหล่อเย็นเป็นส่วนสำคัญของรอบการฉีดแต่ละครั้ง วัสดุแม่พิมพ์ที่ส่งความร้อนจากผิวโพรงไปยังช่องน้ำได้เร็วกว่า จะทำให้ชิ้นงานถึงอุณหภูมิปลดได้เร็วกว่า Materion ระบุว่า MoldMAX ช่วยให้รอบการผลิตสั้นลงและคุณภาพชิ้นงานดีขึ้น แต่ไม่ได้ระบุตัวเลขเปอร์เซ็นต์ เพราะผลจริงขึ้นกับชิ้นงาน เรซิน และการออกแบบระบบหล่อเย็นของแต่ละแม่พิมพ์",
        en: "Because the plastic part has to cool in the mold until it is rigid enough to eject, and cooling is a major part of every shot. A mold material that moves heat from the cavity surface to the cooling channels faster lets the part reach ejection temperature sooner. Materion says MoldMAX gives a shorter cycle time and better part quality, but publishes no percentage, because the real gain depends on the part, the resin and each mold's cooling design.",
      },
    },
    {
      t: "p",
      text: {
        th: "Materion ยังระบุว่าเมื่อใส่ MoldMAX ในแม่พิมพ์เหล็ก จะช่วยดับจุดร้อน ลดหรือตัดความจำเป็นของช่องหล่อเย็นในจุดที่เจาะยาก และลดความต่างอุณหภูมิในแม่พิมพ์ ทำให้ควบคุมขนาดชิ้นงานได้แม่นขึ้น การหดตัวและบิดงอหลังขึ้นรูปน้อยลง",
        en: "Materion also says that MoldMAX inserts in steel molds cool hot spots, reduce or remove the need for cooling channels where they are hard to drill, and even out mold temperatures for tighter tolerances and less post-mold shrinkage and warping.",
      },
    },
    { t: "h2", text: { th: "ต้องเปลี่ยนทั้งแม่พิมพ์เป็นทองแดงเบริลเลียมไหม?", en: "Does the whole mold have to be beryllium copper?" } },
    {
      t: "p",
      text: {
        th: "ไม่จำเป็น วิธีที่ใช้กันทั่วไปคือคงโครงแม่พิมพ์เป็นเหล็ก แล้วใช้ทองแดงเบริลเลียมเฉพาะชิ้นที่ระบายความร้อนยาก เช่น insert แกนและโพรง insert แนวแบ่งแม่พิมพ์ สไลด์และลิฟเตอร์ หรือปลายหัวฉีด hot runner ซึ่งตรงกับงานที่ Materion ระบุไว้ อ่านเพิ่มเรื่องนี้ได้ที่ [Insert แม่พิมพ์คืออะไร](/knowledge/what-is-mold-insert)",
        en: "No. The usual approach is to keep the mold base in steel and use beryllium copper only for the parts that are hard to cool: core and cavity inserts, parting-line inserts, sliders and lifters, or hot runner tips, the applications Materion lists. More on this in [What is a mold insert?](/knowledge/what-is-mold-insert)",
      },
    },
    { t: "h2", text: { th: "ข้อควรพิจารณาเมื่อเลือกทองแดงเบริลเลียมแทนเหล็กมีอะไรบ้าง?", en: "What should you weigh before choosing beryllium copper over steel?" } },
    {
      t: "ul",
      items: [
        {
          th: "สมดุลความแข็งกับการนำความร้อน: เกรดที่นำความร้อนสูงสุดมักแข็งน้อยกว่า เลือกตามว่าจุดนั้นต้องทนสึกหรือต้องระบายความร้อนมากกว่า",
          en: "Hardness versus conductivity: the most conductive grades are usually softer, so choose by whether the spot needs wear resistance or heat removal more.",
        },
        {
          th: "ไม่ใช่ทุกเกรด MoldMAX เป็นทองแดงเบริลเลียม: MoldMAX V เป็น Cu-Ni-Si-Cr และ MoldMAX XL เป็น Cu-Ni-Sn",
          en: "Not every MoldMAX grade is beryllium copper: MoldMAX V is Cu-Ni-Si-Cr and MoldMAX XL is Cu-Ni-Sn.",
        },
        {
          th: "การซ่อม: Materion มีลวดเติม WeldPak และ WeldPak XL สำหรับซ่อม MoldMAX ที่เป็นทองแดงเบริลเลียมด้วยการเชื่อม TIG",
          en: "Repair: Materion offers WeldPak and WeldPak XL filler metal for TIG repair of the beryllium copper MoldMAX alloys.",
        },
        {
          th: "การกลึง เจียร และเชื่อม ต้องควบคุมฝุ่นและไอตาม SDS ดูรายละเอียดใน [ทองแดงเบริลเลียมปลอดภัยไหม](/knowledge/beryllium-copper-safety)",
          en: "Machining, grinding and welding need dust and fume control per the SDS; see [Is beryllium copper safe?](/knowledge/beryllium-copper-safety)",
        },
      ],
    },
    {
      t: "p",
      text: {
        th: "ดูทุกเกรดและค่าเปรียบเทียบเต็มได้ที่หน้า [MoldMAX](/moldmax)",
        en: "All grades and the full comparison are on the [MoldMAX](/moldmax) page.",
      },
    },
  ],
  faqs: [
    {
      q: { th: "ทองแดงเบริลเลียมนำความร้อนดีกว่าเหล็ก P-20 กี่เท่า?", en: "How much better does beryllium copper conduct heat than P-20?" },
      a: {
        th: "ขึ้นกับเกรด Materion ระบุว่า MoldMAX HH นำความร้อนสูงกว่าเหล็กเครื่องมือมาตรฐานสี่ถึงหกเท่า และในตารางของ Materion เหล็ก P-20 อยู่ที่ 17 BTU/ft·hr·°F เทียบกับ 75 ของ MoldMAX HH และ 145 ของ PROtherm",
        en: "It depends on the grade. Materion says MoldMAX HH conducts heat four to six times better than standard tool steels, and its table lists P-20 at 17 BTU/ft·hr·°F against 75 for MoldMAX HH and 145 for PROtherm.",
      },
    },
    {
      q: { th: "ใช้ทองแดงเบริลเลียมแล้ว cycle time ลดลงกี่เปอร์เซ็นต์?", en: "By what percentage does beryllium copper cut cycle time?" },
      a: {
        th: "Materion ไม่ได้ระบุตัวเลขเปอร์เซ็นต์ ระบุเพียงว่ารอบการผลิตสั้นลงและคุณภาพชิ้นงานดีขึ้น ผลจริงขึ้นกับชิ้นงาน เรซิน และการออกแบบระบบหล่อเย็น",
        en: "Materion publishes no percentage; it states only that cycle time is shorter and part quality better. The real result depends on the part, the resin and the cooling design.",
      },
    },
    {
      q: { th: "ทองแดงเบริลเลียมแข็งพอสำหรับแม่พิมพ์ฉีดพลาสติกไหม?", en: "Is beryllium copper hard enough for injection molds?" },
      a: {
        th: "Materion ระบุว่า MoldMAX แข็งแรงและทนสึกระดับเหล็กเครื่องมือ และในตารางของ Materion MoldMAX HH มีความแข็ง Rockwell 40 เทียบกับ 30 ของเหล็ก P-20 (ตารางไม่ได้ระบุสเกล)",
        en: "Materion says MoldMAX offers the strength and wear resistance of tool steels, and its table lists MoldMAX HH at Rockwell hardness 40 against 30 for P-20 steel (the table does not state the scale).",
      },
    },
  ],
  refs: [REF.moldmax],
};
