/**
 * Canonical company facts. Edit here — every page reads from this file.
 * Values copied verbatim from VAN INTERTRADE's verified source of truth
 * (the sibling VAN repo's `src/data/company.ts`, itself sourced from
 * vaninter.com). Do not invent additions — see the "Global Constraints"
 * section of docs/superpowers/plans/2026-10-05-van-material-nextjs-seo-launch.md
 * and .claude/skills/seo-aeo/SKILL.md §5.
 */

export const company = {
  legalNameTh: "บริษัท แวน อินเตอร์เทรด จำกัด",
  legalNameEn: "VAN INTERTRADE Co., Ltd.",
  shortNameTh: "แวน อินเตอร์เทรด",
  shortNameEn: "VAN INTERTRADE",

  foundedYearBE: 2529,
  foundedYearCE: 1986,
  foundedMonthTh: "สิงหาคม",

  url: "https://www.vaninter.com",

  contact: {
    addressTh:
      "59/349-51 ซอยรามคำแหง 140 ถนนรามคำแหง แขวงสะพานสูง เขตสะพานสูง กรุงเทพฯ 10240",
    addressEn:
      "59/349-51 Soi Ramkhamhaeng 140, Ramkhamhaeng Rd., Saphan Sung, Bangkok 10240",
    addressLinesTh: [
      "59/349-51 ซอยรามคำแหง 140 ถนนรามคำแหง",
      "แขวงสะพานสูง เขตสะพานสูง",
      "กรุงเทพฯ 10240",
    ],
    addressLinesEn: [
      "59/349-51 Soi Ramkhamhaeng 140, Ramkhamhaeng Rd.",
      "Saphan Sung Sub-district, Saphan Sung District",
      "Bangkok 10240",
    ],
    /**
     * The same address split into schema.org PostalAddress fields (used by
     * the Organization JSON-LD). Same facts as the lines above, not new ones.
     */
    postal: {
      streetTh: "59/349-51 ซอยรามคำแหง 140 ถนนรามคำแหง",
      streetEn: "59/349-51 Soi Ramkhamhaeng 140, Ramkhamhaeng Rd.",
      localityTh: "แขวงสะพานสูง เขตสะพานสูง",
      localityEn: "Saphan Sung Sub-district, Saphan Sung District",
      regionTh: "กรุงเทพมหานคร",
      regionEn: "Bangkok",
      postalCode: "10240",
      country: "TH",
    },
    tels: ["+6627280150", "+66863038051"],
    telsDisplay: ["02-728-0150", "086-303-8051"],
    fax: "+6627280160",
    faxDisplay: "02-728-0160",
    // Sales/RFQ inbox, confirmed by the client 2026-10-05.
    email: "van@vaninter.com",
    lineId: "@vanintertrade",
    lineUrl: "https://line.me/ti/p/%40vanintertrade",
    hoursTh: "จันทร์–ศุกร์ 08.30–17.30 น.",
    hoursEn: "Mon–Fri 08.30–17.30",
    /** The same hours, structured for schema.org openingHoursSpecification. */
    hoursSpec: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "17:30",
    },
    geo: { lat: 13.784706, lng: 100.686849 },
    mapsPlace: "VAN Intertrade Co., Ltd.",
  },

  /**
   * Year VAN became an authorized Materion distributor. Client to confirm —
   * render only once this is set to a real year; until then, leave any
   * "authorized since <year>" copy out rather than guessing.
   */
  materion: { since: null as number | null },
} as const;
