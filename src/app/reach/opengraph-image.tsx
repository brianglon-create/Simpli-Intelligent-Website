import { ogImage, ogSize } from "@/lib/og-card";

export const alt = "Simpli Reach is coming soon.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage(
    "Simpli Reach is coming soon.",
    "Business growth software from Simpli Intelligent. Join the list.",
  );
}
