import { ogImage, ogSize } from "@/lib/og-card";

export const alt = "Simpli Archive keeps Horizon inspection reports searchable.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage(
    "Don't let December 15 erase your inspection history.",
    "Simpli Archive is $19 the first month, then $9/month.",
  );
}
