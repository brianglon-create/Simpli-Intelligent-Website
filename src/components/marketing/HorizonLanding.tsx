import { ArchivePricing } from "@/components/ArchivePricing";
import { CheckPillars } from "@/components/CheckPillars";
import { Countdown } from "@/components/Countdown";
import { FaqList } from "@/components/FaqList";
import { FoundingOffer } from "@/components/FoundingOffer";
import { LeadForm } from "@/components/LeadForm";
import { PersonalFollowUp } from "@/components/PersonalFollowUp";
import { Section } from "@/components/Section";
import { SignupLinks } from "@/components/SignupLinks";
import { primaryButtonClass } from "@/components/classes";
import type { FoundingSnapshot } from "@/lib/leads/types";
import {
  ARCHIVE_BULLETS,
  CHECK_PERKS,
  EXPORT_STEPS,
  HORIZON_FAQS,
  MIGRATION_EXCLUDED,
  MIGRATION_INCLUDED,
  SHUTDOWN_LABEL,
  TIMELINE,
} from "@/lib/offers";
import {
  CHECK_FEATURES_INTRO,
  CHECK_WAITLIST_STATUS,
  INSPECTOR_BYLINE,
} from "@/lib/offer-copy";
import { SITE } from "@/lib/site";

const lede = "max-w-3xl text-lg leading-relaxed text-muted";

export function HorizonLanding({ status }: { status: FoundingSnapshot }) {
  return (
    <>
      <section aria-labelledby="horizon-hero-heading" className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-blue">
            FOR HORIZON INSPECTORS
          </p>
          <h1
            id="horizon-hero-heading"
            className="font-display mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-navy sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]"
          >
            Horizon shuts down {SHUTDOWN_LABEL}. Here&apos;s what doesn&apos;t move with you.
          </h1>
          <p className={`${lede} mt-6`}>
            Historical reports, PDFs, photos, and work orders stay behind when you
            switch. Simpli Archive keeps that history. Simpli Check is inspection
            software designed around how inspectors actually work. {CHECK_WAITLIST_STATUS}
          </p>
          <Countdown />
          <SignupLinks />
          <p className="mt-4 text-sm text-muted">This page does not charge a card.</p>
        </div>
      </section>

      <Section id="shutdown" title="What December 15 takes with it" tone="white" eyebrow="The shutdown">
        <p className="font-display max-w-3xl text-xl font-medium leading-snug text-navy sm:text-2xl">
          After {SHUTDOWN_LABEL}, Horizon has said the data will no longer be
          accessible, and Carson Dunlop deletes it.
        </p>
        <div className={`${lede} mt-6 space-y-4`}>
          <p>
            Carson Dunlop is retiring Horizon on {SHUTDOWN_LABEL}. Export tools
            stop that day. Anything still only inside Horizon is gone after the
            export window.
          </p>
          <p>
            That includes the report history clients, agents, insurers, and
            attorneys ask for years later. Export a full copy before the tools
            shut off, whatever you decide about your next software.
          </p>
        </div>
        <SignupLinks primary="Get on the list before the deadline" secondary="See the export checklist" secondaryHref="#export-checklist" />
      </Section>

      <Section id="migration" title="What a one-click migration does not carry" eyebrow="Spectora">
        <div className={`${lede} space-y-4`}>
          <p>
            Carson Dunlop recommends Spectora. Spectora&apos;s migration FAQ says
            the one-click move brings comments, presets, contacts, team, and
            branding. It tells inspectors to export and keep records for
            regulatory, insurance, legal, or business purposes.
          </p>
          <p>It does not bring:</p>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {MIGRATION_EXCLUDED.map((item) => (
            <li key={item} className="border border-border bg-white px-4 py-3 text-base text-navy">
              {item}
            </li>
          ))}
        </ul>
        <p className={`${lede} mt-6`}>The one-click move does include:</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {MIGRATION_INCLUDED.map((item) => (
            <li key={item} className="rounded-sm bg-blue-soft px-3 py-1 text-sm font-medium text-navy-mid">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-sm text-muted">
          Source: Carson Dunlop&apos;s Horizon shutdown notice, and Spectora&apos;s
          public migration FAQ.
        </p>
        <SignupLinks secondary="See your options" secondaryHref="#timeline" />
      </Section>

      <Section id="timeline" title="Export now. Store it. Switch when you choose." tone="white" eyebrow="Your options">
        <ol className="grid gap-4 lg:grid-cols-3">
          {TIMELINE.map((step, index) => (
            <li key={step.title} className="border border-border bg-neutral p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue">
                Step {index + 1}
              </p>
              <h3 className="font-display mt-3 text-xl font-semibold text-navy">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <SignupLinks />
      </Section>

      <Section id="archive-offer" title="Simpli Archive keeps the history" eyebrow="Simpli Archive">
        <p className={lede}>
          Whatever software you switch to, your Horizon report history does not
          come with you. Simpli Archive is being built to keep every past report
          searchable and ready when a client, agent, insurer, or attorney comes
          asking.
        </p>
        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {ARCHIVE_BULLETS.map((bullet) => (
            <li key={bullet.title} className="border border-border bg-white p-6">
              <h3 className="font-display text-lg font-semibold text-navy">{bullet.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{bullet.body}</p>
            </li>
          ))}
        </ul>
        <div className={`${lede} mt-8 space-y-4`}>
          <p>How it works, once Simpli Archive is open:</p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Export your Horizon history before {SHUTDOWN_LABEL}.</li>
            <li>Tell us what you exported. We confirm how those files come into Simpli Archive before you pay.</li>
            <li>Find a past report later without digging through a folder.</li>
          </ol>
        </div>
        <ArchivePricing status={status} showCta />
      </Section>

      <Section id="check-offer" title="Simpli Check cuts the time you spend writing the report" tone="white" eyebrow="Simpli Check">
        <p className={lede}>{CHECK_FEATURES_INTRO}</p>
        <CheckPillars />
        <ul className="mt-8 max-w-3xl space-y-3 text-base leading-relaxed text-muted">
          {CHECK_PERKS.map((perk) => (
            <li key={perk}>{perk}</li>
          ))}
        </ul>
        <FoundingOffer status={status} showCta />
      </Section>

      <Section id="together" title="Simpli Archive and Simpli Check, under one platform" tone="navy" eyebrow={SITE.wordmark}>
        <div className="max-w-3xl space-y-4 text-lg leading-relaxed">
          <p>
            Simpli Intelligent is the platform. Simpli Archive and Simpli Check are
            two products on it. Simpli Archive is the history problem every switcher
            has, whichever software they choose next. Simpli Check is the inspection
            product built to cut the time a working inspector spends writing the
            report. {CHECK_WAITLIST_STATUS}
          </p>
          <p>
            The long-term aim is for Simpli products to share data into one
            intelligence engine. That shared engine is the direction. It is not
            something you can use today.
          </p>
        </div>
        <div className="mt-8">
          <a href="#signup" className={primaryButtonClass}>
            Join the list
          </a>
        </div>
      </Section>

      <Section id="export-checklist" title="Export checklist" eyebrow="Before December 15">
        <p className={lede}>
          Follow this sequence before {SHUTDOWN_LABEL}. It is not a tour of
          Horizon&apos;s screens.
        </p>
        <ol className="mt-8 grid gap-4">
          {EXPORT_STEPS.map((step, index) => (
            <li key={step.title} className="border border-border bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue">
                Step {index + 1}
              </p>
              <h3 className="font-display mt-3 text-xl font-semibold text-navy">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <SignupLinks primary="Send me a reminder" secondary="Read the FAQ" secondaryHref="#faq" />
      </Section>

      <Section id="faq" title="Questions inspectors ask" tone="white">
        <FaqList items={HORIZON_FAQS} />
      </Section>

      <Section id="founder" title="Built by an inspector" eyebrow="Who's behind this">
        <div className={`${lede} space-y-4`}>
          <p>{INSPECTOR_BYLINE}</p>
          <p>
            Old reports get pulled for claims, disputes, and repeat clients.
            Simpli Archive is being built for that moment. Simpli Check is the
            inspection product for inspectors who want software shaped by the same
            work.
          </p>
          <p>
            {SITE.name} is not affiliated with Carson Dunlop, Horizon, Spectora, or
            Mach One.
          </p>
        </div>
        <p className="mt-8 text-base leading-relaxed text-navy">
          <span className="block font-medium">— The founder</span>
          <span className="mt-1 block text-muted">{SITE.name}</span>
        </p>
      </Section>

      <Section id="join" title="Tell us what you need" tone="white">
        <p className={`${lede} mb-8`}>
          One form. Choose Simpli Archive, Simpli Check, or both.
        </p>
        <PersonalFollowUp />
        <LeadForm
          page="/horizon"
          interests={["archive", "check", "both"]}
          defaultInterest="both"
        />
      </Section>
    </>
  );
}
