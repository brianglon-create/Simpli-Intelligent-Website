import { ogImage, ogSize } from "@/lib/og-card";

export const alt = "Simpli Operate is coming soon.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage(
    "Simpli Operate is coming soon.",
    "Business operations software from Simpli Intelligent. Join the list.",
  );
}
