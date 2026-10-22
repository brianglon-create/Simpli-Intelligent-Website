import { FoundingOffer } from "@/components/FoundingOffer";
import { LeadForm } from "@/components/LeadForm";
import { Section } from "@/components/Section";
import { primaryButtonClass, secondaryButtonClass } from "@/components/classes";
import type { FoundingSnapshot } from "@/lib/leads/types";
import { CHECK_PERKS } from "@/lib/offers";
import { SITE } from "@/lib/site";

export function CheckLanding({
  status,
  bookingUrl,
}: {
  status: FoundingSnapshot;
  bookingUrl: string | null;
}) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-blue">
            SIMPLI CHECK
          </p>
          <h1 className="font-display mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-navy sm:text-5xl">
            Inspection software built by an inspector, not a sales team.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Simpli Check is inspection software in development, shaped by years
            of inspections at {SITE.inspectionBusiness}. Join the waitlist for
            early access and founding-member pricing.
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
      <Section id="check-features" title="What we will say when it's confirmed" tone="white">
        {/* TODO(check-features): Brian must confirm Simpli Check capabilities before launch.
            Do not publish AI behavior, report speed, voice or wording control, offline
            capture, or a feature list. The draft line "faster reports with your findings
            and your wording" is intentionally omitted. */}
        <div className="max-w-3xl border border-border bg-neutral p-6">
          <p className="text-base leading-relaxed text-muted">
            What Simpli Check will do is still being confirmed. This page does not
            list features, and it does not describe how any assistant or automation
            will behave.
          </p>
        </div>
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
          bookingUrl={bookingUrl}
          interests={["check", "archive", "both"]}
          defaultInterest="check"
        />
      </Section>
    </>
  );
}
