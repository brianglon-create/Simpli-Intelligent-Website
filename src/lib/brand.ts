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

export const MARK_PATH =
  "M70 20C70 8 52 2 34 4C14 6 4 18 6 34C8 48 22 54 42 56C62 58 76 66 74 82C72 98 54 106 34 104C14 102 4 90 10 78";

export const MARK_VIEWBOX = "-10 -8 100 128";

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
