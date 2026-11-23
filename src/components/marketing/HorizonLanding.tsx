import { CheckoutLink, CheckoutPlaceholderNote } from "@/components/CheckoutLink";
import { Countdown } from "@/components/Countdown";
import { EmailUpdatesForm } from "@/components/forms/EmailUpdatesForm";
import { MigrationHelpForm } from "@/components/forms/MigrationHelpForm";
import { FaqList } from "@/components/FaqList";
import { Lockup } from "@/components/brand/Lockup";
import { PersonalFollowUp } from "@/components/PersonalFollowUp";
import { Section } from "@/components/Section";
import { primaryButtonClass, secondaryButtonClass } from "@/components/classes";
import { CHECKOUT } from "@/lib/checkout";
import {
  CHECK_HEADLINE,
  CHECK_PRICE_LINE,
  INSPECTOR_BYLINE,
} from "@/lib/offer-copy";
import {
  ARCHIVE_BULLETS,
  EXPORT_STEPS,
  HORIZON_FAQS,
  MIGRATION_EXCLUDED,
  MIGRATION_INCLUDED,
  SHUTDOWN_LABEL,
  TIMELINE,
  usd,
  ARCHIVE_MONTHLY_USD,
  ARCHIVE_SETUP_USD,
} from "@/lib/offers";
import { SITE } from "@/lib/site";

const lede = "max-w-3xl text-lg leading-relaxed text-muted";
const buyClass = `${primaryButtonClass} w-full justify-center sm:w-auto`;
const secondaryClass = `${secondaryButtonClass} w-full justify-center sm:w-auto`;

function ProductButtons({
  archiveLabel = "Simpli Archive keeps your history",
  checkLabel = "Simpli Check is where you write next",
}: {
  archiveLabel?: string;
  checkLabel?: string;
}) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <CheckoutLink href={CHECKOUT.archiveStandaloneUrl} className={buyClass}>
        {archiveLabel}
      </CheckoutLink>
      <CheckoutLink href={CHECKOUT.simpliCheckUrl} className={secondaryClass}>
        {checkLabel}
      </CheckoutLink>
    </div>
  );
}

export function HorizonLanding() {
  return (
    <>
      <section aria-labelledby="horizon-hero-heading" className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
          <Lockup product="intelligent" surface="light" size="md" />
          <p className="font-display mt-6 text-xs font-semibold tracking-[0.18em] text-blue">
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
            switch. Simpli Archive keeps that history. Simpli Check is where you write
            the next report. {CHECK_HEADLINE}
          </p>
          <Countdown />
          <ProductButtons />
          <div className="mt-4">
            <CheckoutPlaceholderNote />
          </div>
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
        <ProductButtons archiveLabel="Get Simpli Archive" checkLabel="Get Simpli Check" />
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
        <ProductButtons archiveLabel="Get Simpli Archive" checkLabel="Get Simpli Check" />
      </Section>

      <Section id="archive-offer" title="Simpli Archive keeps the history" eyebrow="Simpli Archive" accent="archive">
        <p className={lede}>
          Whatever software you switch to, your Horizon report history does not
          come with you. Simpli Archive keeps every past report searchable for the
          day a client, agent, insurer, or attorney comes asking.
        </p>
        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {ARCHIVE_BULLETS.map((bullet) => (
            <li key={bullet.title} className="border border-border bg-white p-6">
              <h3 className="font-display text-lg font-semibold text-navy">{bullet.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{bullet.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="border border-border bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-archive-ink">
              Standalone
            </p>
            <p className="font-display mt-4 text-4xl font-semibold text-navy">
              {usd(ARCHIVE_SETUP_USD)}
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">
              First month, covering setup and the initial file transfer, then {usd(ARCHIVE_MONTHLY_USD)} per month.
            </p>
            <CheckoutLink href={CHECKOUT.archiveStandaloneUrl} className={`${buyClass} mt-6`}>
              Get Simpli Archive
            </CheckoutLink>
          </div>
          <div className="border border-border bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-archive-ink">
              Simpli Check add-on
            </p>
            <p className="font-display mt-4 text-4xl font-semibold text-navy">
              {usd(ARCHIVE_MONTHLY_USD)}
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Per month for Simpli Check customers. No setup fee.
            </p>
            <CheckoutLink href={CHECKOUT.archiveAddonUrl} className={`${buyClass} mt-6`}>
              Add Simpli Archive
            </CheckoutLink>
          </div>
        </div>
      </Section>

      <Section
        id="check-offer"
        title={CHECK_HEADLINE}
        tone="white"
        eyebrow="Simpli Check"
        accent="check"
      >
        <div className={`${lede} space-y-4`}>
          <p>{CHECK_PRICE_LINE} Simpli Assist is included.</p>
          <p>
            <a href="/check#narratives" className="font-semibold text-navy underline-offset-2 hover:underline">
              See how switching works
            </a>
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CheckoutLink href={CHECKOUT.simpliCheckUrl} className={buyClass}>
            Get Simpli Check
          </CheckoutLink>
          <a href="/check" className={secondaryClass}>
            Read the Simpli Check page
          </a>
        </div>
      </Section>

      <Section id="together" title="Simpli Archive and Simpli Check, under one platform" tone="navy" eyebrow={SITE.wordmark}>
        <div className="max-w-3xl space-y-4 text-lg leading-relaxed">
          <p>
            Simpli Intelligent is the platform. Simpli Archive and Simpli Check are
            two products on it. Simpli Archive keeps the history. Simpli Check is
            where you write the next report.
          </p>
          <p>
            The long-term aim is for Simpli products to share data into one
            intelligence engine. That shared engine is the direction. It is not
            something you can use today.
          </p>
        </div>
        <div className="mt-8">
          <CheckoutLink
            href={CHECKOUT.simpliCheckUrl}
            className="inline-flex w-full items-center justify-center rounded-md bg-white px-6 py-3.5 text-base font-semibold text-navy sm:w-auto"
          >
            Get Simpli Check
          </CheckoutLink>
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
      </Section>

      <Section id="faq" title="Questions inspectors ask" tone="white">
        <FaqList items={HORIZON_FAQS} />
      </Section>

      <Section id="founder" title="Built by an inspector" eyebrow="Who's behind this">
        <div className={`${lede} space-y-4`}>
          <p>{INSPECTOR_BYLINE}</p>
          <p>
            Old reports get pulled for claims, disputes, and repeat clients.
            Simpli Archive is for that moment. Simpli Check is the inspection
            product for inspectors who want software shaped by the same work.
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

      <Section id="updates" title="Send me launch updates" tone="white">
        <EmailUpdatesForm page="/horizon" product="both" />
      </Section>

      <Section id="migration-help" title="Help me bring my narratives">
        <p className={`${lede} mb-8`}>
          Tell us about your narratives and your Horizon reports. We&apos;ll reply by email.
        </p>
        <PersonalFollowUp />
        <div className="mt-8">
          <MigrationHelpForm page="/horizon" product="both" />
        </div>
      </Section>
    </>
  );
}
