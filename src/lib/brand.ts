/** Approved palette, October 23, 2026. */
export const BRAND = {
  navy: "#0D1B2A",
  blue: "#2563EB",
  blueLight: "#DBEAFF",
  gray: "#6B7280",
  soft: "#F1F5F9",
  white: "#FFFFFF",
  /** Cool gray darkened just enough for 4.5:1 on Soft Gray. */
  grayInk: "#69707D",
  check: "#22E06B",
  operate: "#6366F1",
  archive: "#FB923C",
  reach: "#06B6D4",
  /** Small-text shades. Bright green, orange, and teal fail AA on white. */
  checkInk: "#13853F",
  operateInk: "#4F46E5",
  archiveInk: "#BD5704",
  reachInk: "#047F94",
  /** Operate indigo fails AA as small text on navy. */
  operateOnNavy: "#7174F2",
} as const;

/** Interlocking dual-ribbon S. Upper bowl, then a separate lower bowl with a gap in the spine. */
export const MARK_VIEWBOX = "0 0 90 86";
export const MARK_STROKE = 17;
export const MARK_UPPER =
  "M63.5 16.6C42.1 13.1 26.5 14.6 17.1 26.1C12 42.5 26 50.5 33.6 42.1";
export const MARK_LOWER =
  "M56 43.4C73 31 76.2 45.9 73 55.5C66.9 71 42.1 68.9 26 67.6";

export type BrandProduct = "intelligent" | "check" | "operate" | "archive" | "reach";

export const PRODUCT_LINE: Record<BrandProduct, string> = {
  intelligent: "INTELLIGENT",
  check: "CHECK",
  operate: "OPERATE",
  archive: "ARCHIVE",
  reach: "REACH",
};

export function productAccent(product: BrandProduct): string {
  if (product === "check") return BRAND.check;
  if (product === "operate") return BRAND.operate;
  if (product === "archive") return BRAND.archive;
  if (product === "reach") return BRAND.reach;
  return BRAND.blue;
}

export function productLineColor(product: BrandProduct, surface: "dark" | "light"): string {
  if (surface === "dark") {
    if (product === "intelligent") return BRAND.blueLight;
    if (product === "operate") return BRAND.operateOnNavy;
    return productAccent(product);
  }
  if (product === "check") return BRAND.checkInk;
  if (product === "operate") return BRAND.operateInk;
  if (product === "archive") return BRAND.archiveInk;
  if (product === "reach") return BRAND.reachInk;
  return BRAND.blue;
}
