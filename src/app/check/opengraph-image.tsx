import { ogImage, ogSize } from "@/lib/og-card";

export const alt = "Simpli Check waitlist for home inspectors.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage(
    "Cut the time you spend writing the report.",
    "Coming to founding members. Built by a working home inspector.",
  );
}
