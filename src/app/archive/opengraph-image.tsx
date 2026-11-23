import { ogImage, ogSize } from "@/lib/og-card";
import { ARCHIVE_STANDALONE_PRICE } from "@/lib/offers";

export const alt = "Simpli Archive keeps inspection reports searchable.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage(
    "Horizon exports end December 15, 2026.",
    ARCHIVE_STANDALONE_PRICE,
  );
}