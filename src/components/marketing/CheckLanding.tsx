import { CheckPillars } from "@/components/CheckPillars";
import { FoundingOffer } from "@/components/FoundingOffer";
import { LeadForm } from "@/components/LeadForm";
import { Section } from "@/components/Section";
import { primaryButtonClass, secondaryButtonClass } from "@/components/classes";
import type { FoundingSnapshot } from "@/lib/leads/types";
import { INSPECTOR_BYLINE, OFFER_INSPECTORS } from "@/lib/offer-copy";
import { CHECK_PERKS } from "@/lib/offers";

export function CheckLanding({ status }: { status: FoundingSnapshot }) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-blue">
            SIMPLI CHECK
          </p>
          <h1 className="font-display mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-navy sm:text-5xl">
            Cut the time you spend writing the report.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {INSPECTOR_BYLINE} Simpli Check is inspection software from that work,
            not a sales team. It is on the waitlist. Photo recognition, report
            narratives, and client defect notes are coming to {OFFER_INSPECTORS} as
            Check launches.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#signup" className={primaryButtonClass}>
              Join the Simpli Check waitlist
            </a>
            <a href="/horizon" className={secondaryButtonClass}>
              Coming from Horizon?
            </a>
          </div>
        </div>
      </section>
      <Section id="check-features" title={`Coming to ${OFFER_INSPECTORS}`} tone="white">
        <p className="max-w-3xl text-lg leading-relaxed text-muted">
          The writing is what eats the evening. These are coming to {OFFER_INSPECTORS}{" "}
          as Check launches. They are not available to use today.
        </p>
        <CheckPillars />
        <ul className="mt-8 max-w-3xl space-y-3 text-base leading-relaxed text-muted">
          {CHECK_PERKS.map((perk) => (
            <li key={perk}>{perk}</li>
          ))}
        </ul>
        <FoundingOffer status={status} />
      </Section>
      <Section id="check-join" title="Join the Simpli Check waitlist">
        <LeadForm
          page="/check"
          interests={["check", "archive", "both"]}
          defaultInterest="check"
        />
      </Section>
    </>
  );
}
