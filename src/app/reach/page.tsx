import { ComingSoonLanding } from "@/components/marketing/ComingSoonLanding";
import { SiteFrame } from "@/components/SiteFrame";
import { pageMetadata } from "@/lib/metadata";
import { PRODUCTS } from "@/lib/site";

const product = PRODUCTS.find((item) => item.id === "reach");

export const metadata = pageMetadata({
  title: "Simpli Reach | Coming soon",
  description:
    "Simpli Reach is business growth software from Simpli Intelligent. It is in development. Join the list.",
  path: "/reach",
});

export default function ReachPage() {
  return (
    <SiteFrame>
      <ComingSoonLanding
        productName="Simpli Reach"
        description={
          product?.description ??
          "A marketing and growth workspace for owner-operated businesses."
        }
        interest="reach"
        page="/reach"
      />
    </SiteFrame>
  );
}
