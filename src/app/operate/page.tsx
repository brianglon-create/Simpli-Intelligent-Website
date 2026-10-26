import { ComingSoonLanding } from "@/components/marketing/ComingSoonLanding";
import { SiteFrame } from "@/components/SiteFrame";
import { pageMetadata } from "@/lib/metadata";
import { PRODUCTS } from "@/lib/site";

const product = PRODUCTS.find((item) => item.id === "operate");

export const metadata = pageMetadata({
  title: "Simpli Operate | Coming soon",
  description:
    "Simpli Operate is business operations software from Simpli Intelligent. It is in internal use and not open for customers yet. Join the list.",
  path: "/operate",
});

export default function OperatePage() {
  return (
    <SiteFrame>
      <ComingSoonLanding
        productName="Simpli Operate"
        description={
          product?.description ??
          "A practical operating platform for the day-to-day work of running a business."
        }
        interest="operate"
        page="/operate"
      />
    </SiteFrame>
  );
}
