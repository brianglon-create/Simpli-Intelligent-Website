import { CheckoutLink, CheckoutPlaceholderNote } from "@/components/CheckoutLink";
import { Countdown } from "@/components/Countdown";
import { EmailUpdatesForm } from "@/components/forms/EmailUpdatesForm";
import { FaqList } from "@/components/FaqList";
import { Lockup } from "@/components/brand/Lockup";
import { Section } from "@/components/Section";
import { primaryButtonClass, secondaryButtonClass } from "@/components/classes";
import { CHECKOUT } from "@/lib/checkout";
import {
  ARCHIVE_ADDON_PRICE,
  ARCHIVE_BULLETS,
  ARCHIVE_FAQS,
  ARCHIVE_STANDALONE_PRICE,
  ARCHIVE_STEPS,
  SHUTDOWN_LABEL,
  usd,
  ARCHIVE_MONTHLY_USD,
  ARCHIVE_SETUP_USD,
} from "@/lib/offers";

const buyClass = `${primaryButtonClass} w-full justify-center sm:w-auto`;
const secondaryClass = `${secondaryButtonClass} w-full justify-center sm:w-auto`;

export function ArchiveLanding() {
  return (
    <>
      <section aria-labelledby="archive-hero-heading" className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
          <Lockup product="archive" surface="light" size="lg" />
          <h1
            id="archive-hero-heading"
            className="font-display mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-navy sm:text-5xl"
          >
            Horizon exports end {SHUTDOWN_LABEL}. Keep your inspection history.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Simpli Archive keeps every past report searchable for the day a client,
            agent, insurer, or attorney comes asking, whatever software you use next.
          </p>
          <Countdown />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CheckoutLink href={CHECKOUT.archiveStandaloneUrl} className={buyClass}>
              Get Simpli Archive
            </CheckoutLink>
            <a href="/horizon#export-checklist" className={secondaryClass}>
              How to export from Horizon
            </a>
          </div>
          <p className="mt-4 text-base font-medium text-navy">{ARCHIVE_STANDALONE_PRICE}</p>
          <div className="mt-3">
            <CheckoutPlaceholderNote />
          </div>
        </div>
      </section>

      <Section id="archive-does" title="What Simpli Archive does" tone="white" accent="archive">
        <ul className="grid gap-4 lg:grid-cols-3">
          {ARCHIVE_BULLETS.map((bullet) => (
            <li key={bullet.title} className="border border-border bg-neutral p-6">
              <h3 className="font-display text-lg font-semibold text-navy">{bullet.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{bullet.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="archive-how" title="How it works" eyebrow="Simpli Archive" accent="archive">
        <ol className="grid gap-4">
          {ARCHIVE_STEPS.map((step, index) => (
            <li key={step.title} className="border border-border bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-archive-ink">
                Step {index + 1}
              </p>
              <h3 className="font-display mt-3 text-xl font-semibold text-navy">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="pricing" title="Simpli Archive pricing" tone="white" eyebrow="Pricing" accent="archive">
        <ul className="grid gap-4 lg:grid-cols-2">
          <li className="border border-border bg-neutral p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-archive-ink">
              Simpli Archive
            </p>
            <p className="font-display mt-4 text-4xl font-semibold tracking-tight text-navy">
              {usd(ARCHIVE_SETUP_USD)}
            </p>
            <p className="mt-2 text-base text-navy">setup fee, then {usd(ARCHIVE_MONTHLY_USD)} per month</p>
            <CheckoutLink href={CHECKOUT.archiveStandaloneUrl} className={`${buyClass} mt-8`}>
              Get Simpli Archive
            </CheckoutLink>
          </li>
          <li className="border border-border bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-archive-ink">
              Add-on with Simpli Check
            </p>
            <p className="font-display mt-4 text-4xl font-semibold tracking-tight text-navy">
              {usd(ARCHIVE_MONTHLY_USD)}
            </p>
            <p className="mt-2 text-base text-navy">per month. No setup fee.</p>
            <p className="mt-3 text-base leading-relaxed text-muted">{ARCHIVE_ADDON_PRICE}</p>
            <CheckoutLink href={CHECKOUT.archiveAddonUrl} className={`${buyClass} mt-8`}>
              Add Simpli Archive
            </CheckoutLink>
          </li>
        </ul>
        <p className="mt-6 text-sm text-muted">
          <a href={CHECKOUT.termsUrl} className="font-medium text-navy underline-offset-2 hover:underline">
            See Terms & Conditions.
          </a>
        </p>
        <div className="mt-4">
          <CheckoutPlaceholderNote id="checkout-note-archive" />
        </div>
      </Section>

      <Section id="faq" title="Questions inspectors ask" accent="archive">
        <FaqList items={ARCHIVE_FAQS} />
      </Section>

      <Section id="updates" title="Send me launch updates" tone="white" accent="archive">
        <p className="mb-8 max-w-xl text-base leading-relaxed text-muted">
          Email only. No calendar booking.
        </p>
        <EmailUpdatesForm page="/archive" product="archive" />
      </Section>
    </>
  );
}
