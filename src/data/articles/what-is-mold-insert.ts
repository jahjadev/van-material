import type { Article } from "./types";
import { REF } from "./sources";

/*
 * What an insert is: general, well-established mold-making knowledge (no
 * numbers). Why beryllium copper: Materion's MoldMAX page (applications
 * list, hot-spot cooling, cooling channels, tolerances, machinability,
 * polishability, galling, weld repair, "four to six times" for MoldMAX HH).
 */
export const whatIsMoldInsert: Article = {
  slug: "what-is-mold-insert",
  topic: ["moldmax"],
  date: "2026-10-05",
  modified: "2026-10-05",
  image: "/images/product-moldmax.webp",
  title: {
    th: "Insert แม่พิมพ์คืออะไร ทำไมใช้ทองแดงเบริลเลียม",
    en: "What Is a Mold Insert? Why Beryllium Copper",
  },
  h1: {
    th: "Insert แม่พิมพ์ (Mold Insert) คืออะไร และทำไมนิยมใช้ทองแดงเบริลเลียม",
    en: "What Is a Mold Insert, and Why Use Beryllium Copper for It?",
  },
  description: {
    th: "Insert แม่พิมพ์ (mold insert) คือชิ้นที่ประกอบเข้าไปในแม่พิมพ์เพื่อขึ้นรูปบางส่วนของชิ้นงาน อธิบายชนิดของ insert และเหตุผลที่ใช้ทองแดงเบริลเลียม MoldMAX ในจุดร้อน",
    en: "A mold insert is a separate piece fitted into a mold to form part of the cavity or core. The common types, and why beryllium copper MoldMAX is used at hot spots.",
  },
  intro: {
    th: "Insert แม่พิมพ์ (mold insert) คือชิ้นส่วนที่ทำแยกแล้วประกอบเข้าไปในแผ่นแม่พิมพ์ เพื่อขึ้นรูปบางส่วนของโพรงหรือแกนของชิ้นงาน แทนที่จะกัดทุกอย่างจากเหล็กก้อนเดียว การแยกเป็น insert ทำให้เปลี่ยนชิ้นที่สึกได้โดยไม่ต้องทำแม่พิมพ์ใหม่ทั้งชุด และเลือกวัสดุต่างจากโครงแม่พิมพ์ได้ในจุดที่ต้องการ เช่นใช้ทองแดงเบริลเลียมในจุดที่ร้อนที่สุด",
    en: "A mold insert is a separately made piece fitted into a mold plate to form part of the cavity or core, instead of machining everything from one steel block. Splitting it out lets you replace a worn piece without rebuilding the mold, and lets you use a different material from the mold base exactly where it is needed, such as beryllium copper at the hottest spots.",
  },
  body: [
    { t: "h2", text: { th: "Insert แม่พิมพ์มีกี่แบบ?", en: "What kinds of mold insert are there?" } },
    {
      t: "p",
      text: {
        th: "แบ่งตามตำแหน่งและหน้าที่ในแม่พิมพ์ ชนิดที่ Materion ระบุว่าเป็นงานหลักของโลหะผสม MoldMAX ได้แก่",
        en: "They are named by where they sit and what they do. The types Materion lists as main uses for its MoldMAX alloys are:",
      },
    },
    {
      t: "ul",
      items: [
        { th: "insert แกนและโพรง (core & cavity insert): ขึ้นรูปผิวด้านในและด้านนอกของชิ้นงาน", en: "Core and cavity inserts: form the inside and outside surfaces of the part" },
        { th: "insert แนวแบ่งแม่พิมพ์ (parting line insert): อยู่ตรงแนวที่แม่พิมพ์สองฝั่งประกบกัน", en: "Parting-line inserts: sit where the two mold halves meet" },
        { th: "สไลด์และลิฟเตอร์ (slider & lifter): ชิ้นเคลื่อนที่สำหรับขึ้นรูปส่วนเว้าหรือรูด้านข้าง", en: "Sliders and lifters: moving pieces that form undercuts and side holes" },
        { th: "ปลายหัวฉีด hot runner (hot runner tip): จุดที่พลาสติกร้อนไหลเข้าโพรง", en: "Hot runner tips: where hot plastic enters the cavity" },
      ],
    },
    { t: "h2", text: { th: "ทำไม insert บางจุดถึงร้อนกว่าส่วนอื่น?", en: "Why do some inserts run hotter than the rest of the mold?" } },
    {
      t: "p",
      text: {
        th: "เพราะบางจุดเจาะช่องน้ำหล่อเย็นเข้าไปไม่ได้หรือเข้าได้ไม่ใกล้พอ เช่น แกนเรียวยาว ซี่บาง หรือมุมลึก ความร้อนจากพลาสติกจึงสะสมอยู่ตรงนั้น ทำให้ชิ้นงานส่วนนั้นเย็นตัวช้ากว่าส่วนอื่น รอบการฉีดทั้งรอบจึงต้องรอจุดที่ช้าที่สุด และความต่างของอุณหภูมิยังทำให้ชิ้นงานหดตัวไม่เท่ากันหรือบิดงอ",
        en: "Because some spots cannot take a cooling channel, or not close enough: long slender cores, thin ribs, deep corners. Heat from the plastic builds up there, that region of the part cools more slowly, and the whole cycle has to wait for the slowest spot. The temperature difference also makes the part shrink unevenly or warp.",
      },
    },
    { t: "h2", text: { th: "ทำไมใช้ทองแดงเบริลเลียมทำ insert?", en: "Why make inserts from beryllium copper?" } },
    {
      t: "p",
      text: {
        th: "เพราะทองแดงเบริลเลียมสำหรับแม่พิมพ์ดึงความร้อนออกจากจุดเหล่านี้ได้เร็วกว่าเหล็กมาก โดยยังแข็งพอใช้งาน Materion ระบุว่า [MoldMAX HH](/moldmax/moldmax-hh) แข็งและแข็งแรงเทียบเท่าเหล็กเครื่องมือมาตรฐานแต่นำความร้อนได้สูงกว่าสี่ถึงหกเท่า และเมื่อใส่ MoldMAX ในแม่พิมพ์เหล็กจะช่วยดับจุดร้อน ลดหรือตัดความจำเป็นของช่องหล่อเย็นในจุดนั้น และลดความต่างอุณหภูมิในแม่พิมพ์ ทำให้ได้ขนาดชิ้นงานแม่นขึ้น การหดตัวและบิดงอหลังขึ้นรูปน้อยลง",
        en: "Because beryllium copper mold alloys pull heat out of these spots much faster than steel while staying hard enough for service. Materion says [MoldMAX HH](/moldmax/moldmax-hh) matches standard tool steels in hardness and strength while conducting heat four to six times better, and that MoldMAX inserts in steel molds cool hot spots, reduce or remove the need for cooling channels there, and even out mold temperatures for tighter tolerances and less post-mold shrinkage and warping.",
      },
    },
    {
      t: "p",
      text: {
        th: "สำหรับจุดที่ร้อนที่สุด [PROtherm](/moldmax/protherm) เป็นตัวเลือกที่ Materion ระบุว่านำความร้อนสูงที่สุดในบรรดาโลหะผสมที่มีความต้านทานแรงดึงเกิน 100,000 psi",
        en: "For the very hottest spots, [PROtherm](/moldmax/protherm) is the option Materion describes as having the highest conductivity of any alloy with tensile strength above 100,000 psi.",
      },
    },
    { t: "h2", text: { th: "นอกจากระบายความร้อนแล้ว ทองแดงเบริลเลียมมีข้อดีอะไรกับงาน insert?", en: "Besides cooling, what else suits beryllium copper to inserts?" } },
    {
      t: "ul",
      items: [
        { th: "กลึงง่ายและทนแรงกระแทกสูง (ตาม Materion) จึงทำ insert รูปทรงซับซ้อนได้สะดวก", en: "Excellent machinability and high impact strength (per Materion), so complex inserts are easy to make" },
        { th: "ขัดเงาได้ดี เหมาะกับผิวโพรงที่ต้องการความเรียบ", en: "Good polishability for cavity surfaces that must be smooth" },
        { th: "ต้านการติดกัด (galling) และทนสึกจากการฉีดพลาสติก", en: "Galling resistance and wear resistance in plastic injection service" },
        { th: "ซ่อมด้วยการเชื่อม TIG ได้ โดยใช้ลวดเติม WeldPak หรือ WeldPak XL ของ Materion", en: "TIG weld repair with Materion's WeldPak or WeldPak XL filler metal" },
      ],
    },
    {
      t: "p",
      text: {
        th: "เปรียบเทียบตัวเลขกับเหล็ก P-20 ได้ใน [เหล็กแม่พิมพ์ vs ทองแดงเบริลเลียม](/knowledge/mold-steel-vs-beryllium-copper) และดูทุกเกรดได้ที่หน้า [MoldMAX](/moldmax)",
        en: "For the numbers against P-20 steel see [Mold steel vs beryllium copper](/knowledge/mold-steel-vs-beryllium-copper), and every grade is on the [MoldMAX](/moldmax) page.",
      },
    },
    { t: "h2", text: { th: "เลือกวัสดุ insert อย่างไร?", en: "How do you choose the insert material?" } },
    {
      t: "p",
      text: {
        th: "เลือกจากสิ่งที่จุดนั้นต้องการมากที่สุด ถ้าต้องทนสึกและรับแรงด้วยให้เริ่มที่ MoldMAX HH ถ้าระบายความร้อนสำคัญที่สุดให้ดู PROtherm ถ้าต้องการโลหะผสมทองแดงที่ไม่มีเบริลเลียมมี [MoldMAX V](/moldmax/moldmax-v) (Cu-Ni-Si-Cr) และ MoldMAX XL (Cu-Ni-Sn) แจ้งขนาด insert และเรซินที่ใช้ในใบขอราคา เพื่อยืนยันเกรดและขนาดที่จัดหาได้",
        en: "Choose by what that spot needs most. If it must resist wear and take load as well, start with MoldMAX HH; if heat removal comes first, look at PROtherm; for a copper alloy without beryllium there are [MoldMAX V](/moldmax/moldmax-v) (Cu-Ni-Si-Cr) and MoldMAX XL (Cu-Ni-Sn). Give the insert size and resin in your quote request so the grade and available sizes can be confirmed.",
      },
    },
  ],
  faqs: [
    {
      q: { th: "Insert แม่พิมพ์ต่างจาก core และ cavity อย่างไร?", en: "How is a mold insert different from the core and cavity?" },
      a: {
        th: "core และ cavity คือส่วนที่ขึ้นรูปผิวด้านในและด้านนอกของชิ้นงาน ส่วน insert คือวิธีทำส่วนเหล่านั้นเป็นชิ้นแยกที่ประกอบเข้าไปในแผ่นแม่พิมพ์ จึงเปลี่ยนหรือใช้วัสดุต่างจากโครงแม่พิมพ์ได้",
        en: "The core and cavity are the parts that form the inside and outside of the plastic part. An insert is a way of making those parts as separate pieces fitted into the mold plate, so they can be replaced or made from a different material.",
      },
    },
    {
      q: { th: "ใส่ insert ทองแดงเบริลเลียมในแม่พิมพ์เหล็กเดิมได้ไหม?", en: "Can beryllium copper inserts go into an existing steel mold?" },
      a: {
        th: "ได้ Materion ระบุว่าการใช้ MoldMAX ในแม่พิมพ์เหล็กช่วยดับจุดร้อนและลดความจำเป็นของช่องหล่อเย็นในจุดที่เจาะยาก ส่วนการออกแบบการประกอบควรให้ผู้ออกแบบแม่พิมพ์ตรวจสอบ",
        en: "Yes. Materion says MoldMAX used in steel molds cools hot spots and reduces the need for cooling channels where they are hard to drill. The fit and assembly design should be checked by the mold designer.",
      },
    },
    {
      q: { th: "Insert ทองแดงเบริลเลียมสึกแล้วซ่อมได้ไหม?", en: "Can a worn beryllium copper insert be repaired?" },
      a: {
        th: "ได้ Materion มีลวดเติม WeldPak และ WeldPak XL สำหรับซ่อม MoldMAX ที่เป็นทองแดงเบริลเลียมด้วยการเชื่อม TIG และต้องควบคุมไอเชื่อมตาม SDS",
        en: "Yes. Materion offers WeldPak and WeldPak XL filler metal for TIG repair of beryllium copper MoldMAX alloys, with welding fume controlled as the SDS requires.",
      },
    },
    {
      q: { th: "MoldMAX ทุกเกรดมีเบริลเลียมไหม?", en: "Does every MoldMAX grade contain beryllium?" },
      a: {
        th: "ไม่ MoldMAX HH และ PROtherm เป็นทองแดงเบริลเลียม ส่วน MoldMAX V เป็น Cu-Ni-Si-Cr และ MoldMAX XL เป็น Cu-Ni-Sn",
        en: "No. MoldMAX HH and PROtherm are beryllium copper; MoldMAX V is Cu-Ni-Si-Cr and MoldMAX XL is Cu-Ni-Sn.",
      },
    },
  ],
  refs: [REF.moldmax],
};
