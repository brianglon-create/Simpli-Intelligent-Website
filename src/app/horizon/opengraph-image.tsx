import { ogImage, ogSize } from "@/lib/og-card";

export const alt = "Horizon shuts down December 15. Keep your inspection history.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage(
    "Horizon shuts down December 15.",
    "Simpli Archive keeps report history. Join the waitlist for our expected November launch.",
  );
}
