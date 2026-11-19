import { ogImage, ogSize } from "@/lib/og-card";
import { CHECK_HEADLINE, CHECK_PRICE_LINE } from "@/lib/offer-copy";

export const alt = "Simpli Check home inspection software.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage(CHECK_HEADLINE, CHECK_PRICE_LINE);
}
