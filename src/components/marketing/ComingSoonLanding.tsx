import { Lockup } from "@/components/brand/Lockup";
import { LeadForm } from "@/components/LeadForm";
import { Section } from "@/components/Section";
import type { Interest } from "@/lib/leads/types";

export function ComingSoonLanding({
  productName,
  description,
  interest,
  page,
}: {
  productName: string;
  description: string;
  interest: Extract<Interest, "operate" | "reach">;
  page: string;
}) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
          <Lockup product={interest} surface="light" size="lg" />
          <h1 className="font-display mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-navy sm:text-5xl">
            {productName} is coming soon.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            It is not open for customers yet. Join the list and we will write when
            there is a public next step. This form does not charge a card.
          </p>
        </div>
      </section>
      <Section id="join-list" title={`Join the ${productName} list`} tone="white" accent={interest}>
        <LeadForm
          page={page}
          interests={[interest]}
          defaultInterest={interest}
          lockInterest
        />
      </Section>
    </>
  );
}
