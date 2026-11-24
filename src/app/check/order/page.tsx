import { CheckOrderForm } from "@/components/check/CheckOrderForm";
import { SiteFrame } from "@/components/SiteFrame";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Order Simpli Check | Simpli Intelligent",
  description: "Start a Simpli Check order. Early Adopter pricing is $49 per inspector per month.",
  path: "/check/order",
  index: false,
});

export default function CheckOrderPage() {
  return (
    <SiteFrame>
      <article className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="font-display text-xs font-semibold tracking-[0.18em] text-check-ink">
          SIMPLI CHECK
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
          Order Simpli Check
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Early Adopter pricing is $49 per inspector per month. The next step is the Simpli Check
          agreement, then payment.
        </p>
        <div className="mt-10">
          <CheckOrderForm />
        </div>
      </article>
    </SiteFrame>
  );
}
