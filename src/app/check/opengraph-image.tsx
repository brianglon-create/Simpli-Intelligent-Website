import { ogImage, ogSize } from "@/lib/og-card";

export const alt = "Simpli Check waitlist for home inspectors.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage(
    "Inspection software built by an inspector.",
    "Join the Simpli Check waitlist for founding-member pricing.",
  );
}
