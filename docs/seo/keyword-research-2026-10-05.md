# van-material — Keyword research (2026-10-05)

Source: Google Keyword Planner (via AdWhispr), geo = Thailand, Search network,
pulled 2026-10-05. Thai-language and English-language runs. Volumes are
average monthly searches. Keyword Planner reports anything small as 10 or 0.

## 1. What the numbers say

This is a **low-volume, high-value B2B niche**. Almost every product term
reads 10–70/month. That is normal for engineering alloys: a buyer searches a
grade code a handful of times, then sends an RFQ worth thousands of dollars.
Two signals matter more than volume:

- **CPC**: `beryllium copper` / `cu beryllium` / `copper and beryllium` bid
  **$1.04–$3.29**, `c17200 beryllium copper` up to **$3.48**. Advertisers pay
  that because the clicks convert.
- **Language**: buyers search the **English name and the grade code**
  (`beryllium copper` 70, `c17200`, `c17510`, `moldmax hh`, `crcuzr`), not the
  Thai translation (`ทองแดงเบริลเลียม` 0, `ทองแดงโครเมียมเซอร์โคเนียม` 0).
  Thai pages must therefore lead with the English term + grade, with Thai beside it.

Strategy that follows from this:
1. **One page per product family and per grade.** That is how you catch the
   long tail of `c17200`, `c17510`, `moldmax hh`, `toughmet 3`, `c5191`…
   A single catalogue page cannot rank for 30 grade codes.
2. **AEO over volume.** Engineers increasingly ask ChatGPT/Perplexity/Google
   AI Overviews "what is beryllium copper", "C17200 vs C17510", "best copper
   for mold inserts". Answer engines quote pages that state the answer in the
   first sentence under a question heading, with tables of properties.
   That needs server-rendered HTML; the current Vite SPA serves an empty `<div>`.
3. **Informational mold content** captures the larger adjacent pool
   (แม่พิมพ์ฉีดพลาสติก 210) and routes it to MoldMAX.

## 2. Product-term volumes (Thailand)

| Keyword | /mo | Comp. | CPC (USD) | Owning page |
|---|---:|---|---|---|
| beryllium copper | 70 | Med | 1.04–3.29 | `/beryllium-copper` |
| cu beryllium / copper and beryllium | 70 / 70 | Med | 1.04–3.29 | `/beryllium-copper` |
| beryllium copper คือ | 30 | Low | — | article: เบริลเลียมคอปเปอร์คืออะไร |
| เบริลเลียมคอปเปอร์ | 20 | Low | — | `/beryllium-copper` |
| c17200 / c17200 beryllium copper | 10 / 10 | Low / High | — / 0.46–3.48 | `/beryllium-copper/c17200` |
| c17510 / c17500 / c17300 | 10 each | — | — | grade pages |
| beryllium copper c17200 data sheet / suppliers | 10 / 10 | — | — | `/beryllium-copper/c17200` |
| beryllium copper price | 10 | Med | — | FAQ on hub (no prices published → "by quotation, why") |
| berylco 25 / becu 25 / alloy c17200 / uns c17200 | 10 each | — | — | synonyms on `/c17200` |
| beryllium copper springs / tube / sheets | 10 each | — | — | product-form section on hub |
| moldmax / moldmax hh / moldmax beryllium copper | 10 each | Low–Med | — | `/moldmax` |
| mold max material | 10 | Low | — | `/moldmax` |
| toughmet / toughmet material / toughmet at110 | 10 each | — | — | `/toughmet` |
| crcuzr | 10 | Low | — | `/chrome-copper` |
| chrome copper | 10 | Low | — | `/chrome-copper` |
| c5191 / material c5191 | 20 / 20 | Low | — | `/standard-copper-alloys` |
| clad metal / clad metals | 70 / 70 | Med | — | `/clad-metal` |
| หน้าสัมผัสไฟฟ้า | 20 | Med | — | `/electrical-contacts` |
| silver contact rivet | 10 | — | — | `/electrical-contacts` |

## 3. Adjacent pools (bigger, partly relevant)

| Keyword | /mo | Fit | Use |
|---|---:|---|---|
| แม่พิมพ์ฉีดพลาสติก | 210 | Info, mold-maker audience | article → `/moldmax` |
| mold แม่พิมพ์พลาสติก / โมลฉีดพลาสติก / โมลด์ฉีดพลาสติก | 70 / 70 / 50 | Info | same article |
| เหล็กทำแม่พิมพ์ / เกรดเหล็กทำแม่พิมพ์ | 30 / 20 | Comparison | article: เหล็กแม่พิมพ์ vs ทองแดงเบริลเลียม |
| mold insert / insert mold คือ | 30 / 20 | Strong fit | article: insert แม่พิมพ์คืออะไร |
| ระบบหล่อเย็นแม่พิมพ์ | 10 | Strong fit (MoldMAX's pitch) | section on `/moldmax` |
| แม่พิมพ์เป่าพลาสติก | 20 | Fit (blow-mold BeCu) | `/industries/plastic-mold` |
| หน้าคอนแทค / หน้าคอนแทครีเลย์ / หน้าสัมผัสแมกเนติก | 480 / 140 / 140 | Mostly maintenance buyers of *finished* contacts | **client question**: do you sell replacement contacts? If not, target only via one explainer article |
| แผ่นทองแดง / ทองแดงแท่ง / แท่งทองแดง | 720 / 390 / 320 | Commodity pure copper (ground rods, crafts) | **client question**: do you sell C1100 sheet/rod to walk-in buyers? If not, skip. Wrong traffic hurts. |
| บูชทองเหลือง | 720 | Brass bushings, not ToughMet's buyer | skip, or one comparison article "ToughMet vs บูชทองเหลือง" |

## 4. Zero-volume terms to keep anyway

ทองแดงเบริลเลียม, ทองแดงทำแม่พิมพ์, วัสดุแม่พิมพ์ฉีดพลาสติก,
ทองแดงโครเมียมเซอร์โคเนียม, ทองแดงเชื่อมจุด, หัวเชื่อมจุด, อิเล็กโทรดทองแดง:
all **0** in Planner. Use them as Thai secondary text beside the English
term (they cost nothing and match Thai voice and AI queries). Never lead a title with them.

## 5. Competitive note

The company's main site `vaninter.com/materials/*` already ranks pages for
the same six product lines. Decision (2026-10-05): **keep both, different content**.
van-material holds the deep technical pages (grades, properties, forms,
applications, datasheet-style tables). vaninter.com keeps short summaries that
link out. Each page is self-canonical. Titles must not copy each other.
