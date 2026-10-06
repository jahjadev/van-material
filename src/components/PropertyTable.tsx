import type { Bi, Property } from "@/data/products";
import type { Lang } from "@/lib/locale";

export type PropertyRow = { grade?: string; prop: Property };

/** "materion.com" from a source URL, for the source column's link text. */
function sourceLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * Sourced property values. Renders NOTHING when there are no rows — no
 * empty table, no "—" placeholders (ruling R7: an unsourced value is not
 * published at all). Pass `grade` on rows to get a grade column (family
 * comparison); consecutive rows of the same grade share one grade cell.
 */
export function PropertyTable({
  rows,
  lang,
  heading,
  note,
}: {
  rows: PropertyRow[];
  lang: Lang;
  heading: Bi;
  note?: Bi;
}) {
  if (rows.length === 0) return null;
  const en = lang === "en";
  const withGrade = rows.some((r) => r.grade);

  // rowSpan for each run of the same grade.
  const spans = rows.map((r, i) => {
    if (!withGrade || (i > 0 && rows[i - 1].grade === r.grade)) return 0;
    let n = 1;
    while (rows[i + n]?.grade === r.grade) n++;
    return n;
  });

  return (
    <section aria-labelledby="properties-heading" data-reveal="0" className="mt-16">
      <h2 id="properties-heading" className="text-[clamp(26px,2.8vw,36px)] leading-[1.2] font-semibold text-primary">
        {heading[lang]}
      </h2>
      {note && <p className="mt-2 max-w-3xl text-sm text-secondary">{note[lang]}</p>}
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
          <thead className="text-[12px] font-semibold text-secondary">
            <tr>
              {withGrade && <th scope="col" className="border-b border-line px-3 py-3 font-medium">{en ? "Grade" : "เกรด"}</th>}
              <th scope="col" className="border-b border-line px-3 py-3 font-medium">{en ? "Property" : "คุณสมบัติ"}</th>
              <th scope="col" className="border-b border-line px-3 py-3 font-medium">{en ? "Value" : "ค่า"}</th>
              <th scope="col" className="border-b border-line px-3 py-3 font-medium">{en ? "Source" : "แหล่งข้อมูล"}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={`${r.grade ?? ""}-${r.prop.label.en}`} className="border-b border-line align-top">
                {withGrade && spans[i] > 0 && (
                  <th scope="row" rowSpan={spans[i]} className="py-4 pl-0 pr-3 text-[17px] font-bold text-primary">
                    {r.grade}
                  </th>
                )}
                <td className="px-3 py-4 text-secondary">{r.prop.label[lang]}</td>
                <td className="px-3 py-4 font-semibold whitespace-nowrap text-primary">
                  {r.prop.value}
                  {r.prop.unit ? ` ${r.prop.unit}` : ""}
                </td>
                <td className="px-3 py-4 text-[14px]">
                  <a
                    href={r.prop.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link hover:underline"
                  >
                    {sourceLabel(r.prop.source)}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
