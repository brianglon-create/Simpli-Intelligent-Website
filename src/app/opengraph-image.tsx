import { SITE } from "@/lib/site";
import { ogImage, ogSize } from "@/lib/og-card";

export const alt = SITE.name;
export const size = ogSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return ogImage(
    "Built for Small Business. Built by Small Business.",
    "A connected family of business applications that help owner-operated businesses grow, organize, and operate with confidence.",
  );
}
