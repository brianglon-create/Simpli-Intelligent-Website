import { ogImage, ogSize } from "@/lib/og-card";
import { OFFER_INSPECTORS } from "@/lib/offer-copy";

export const alt = "Simpli Check waitlist for home inspectors.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage(
    "Cut the time you spend writing the report.",
    `Coming to ${OFFER_INSPECTORS}. Built by a home inspector.`,
  );
}
