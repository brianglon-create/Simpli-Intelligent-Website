import { Advantages } from "@/components/Advantages";
import { CheckHeadline } from "@/components/CheckHeadline";
import { CheckoutLink, CheckoutPlaceholderNote } from "@/components/CheckoutLink";
import { EmailUpdatesForm } from "@/components/forms/EmailUpdatesForm";
import { MigrationHelpForm } from "@/components/forms/MigrationHelpForm";
import { CheckWalkthrough } from "@/components/marketing/CheckWalkthrough";
import { ProductShot } from "@/components/marketing/ProductShot";
import { Section } from "@/components/Section";
import { FaqList } from "@/components/FaqList";
import { Lockup } from "@/components/brand/Lockup";
import { primaryButtonClass, secondaryButtonClass } from "@/components/classes";
import { CHECK_ORDER_PATH, CHECKOUT } from "@/lib/checkout";
import {
  CHECK_HEADLINE,
  CHECK_PRICE_LINE,
  CHECK_PRICE_SHORT,
  CHECK_SUBHEAD,
  DIFFERENTIATOR_BODY,
  EVERY_USER_PAID,
  FOUNDER_ONBOARDING,
  NARRATIVE_MIGRATION_BODY,
  NARRATIVE_MIGRATION_HEADLINE,
  SWITCHING_STEPS,
} from "@/lib/offer-copy";
import {
  ARCHIVE_ADDON_PRICE,
  CHECK_BENEFITS,
  CHECK_COMING_SOON,
  CHECK_FAQS,
  CHECK_OBJECTIONS,
  CHECK_STEPS,
} from "@/lib/offers";
import { checkShot } from "@/lib/check-shots";
import { SITE } from "@/lib/site";

const buyClass = `${primaryButtonClass} w-full justify-center sm:w-auto`;
const secondaryClass = `${secondaryButtonClass} w-full justify-center sm:w-auto`;
const onNavyClass =
  "inline-flex w-full items-center justify-center rounded-md bg-white px-6 py-3.5 text-base font-semibold text-navy transition-colors hover:bg-blue-soft sm:w-auto";

export function CheckLanding() {
  return (
    <>
      <section aria-labelledby="check-hero-heading" className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-8 sm:px-8 sm:pt-10">
          <Lockup product="check" surface="light" size="md" />
          <p className="font-display mt-4 text-xs font-semibold tracking-[0.18em] text-check-ink">
            SIMPLI CHECK · HOME INSPECTION SOFTWARE
          </p>
          <CheckHeadline id="check-hero-heading" className="mt-3 max-w-none" />
          <Advantages />
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{CHECK_SUBHEAD}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CheckoutLink href={CHECK_ORDER_PATH} className={buyClass}>
              Get Simpli Check
            </CheckoutLink>
            <a href="#see-how" className={secondaryClass}>
              See how it works
            </a>
          </div>
          <p className="mt-4 text-base font-medium text-navy">{CHECK_PRICE_LINE}</p>
          <div className="mt-3">
            <CheckoutPlaceholderNote />
          </div>
          <figure className="mx-auto mt-8 max-w-3xl">
            <ProductShot shot={checkShot("03")} sizes="(min-width: 768px) 720px, 100vw" />
            <figcaption className="mt-3 text-sm leading-relaxed text-muted">
              {checkShot("03").caption}
            </figcaption>
          </figure>
        </div>
      </section>

      <Section
        id="narratives"
        title={NARRATIVE_MIGRATION_HEADLINE}
        eyebrow="Your narratives"
        accent="check"
        tone="white"
      >
        <p className="max-w-3xl text-lg leading-relaxed text-muted">{NARRATIVE_MIGRATION_BODY}</p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {SWITCHING_STEPS.map((step, index) => (
            <li key={step.title} className="border border-border bg-neutral p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-check-ink">
                Step {index + 1}
              </p>
              <h3 className="font-display mt-2 text-lg font-semibold text-navy">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <a href="#switching" className={`${secondaryClass} mt-8`}>
          Help me bring my narratives
        </a>
        <figure className="mx-auto mt-8 max-w-3xl">
          <ProductShot shot={checkShot("06")} sizes="(min-width: 768px) 720px, 100vw" />
          <figcaption className="mt-3 text-sm leading-relaxed text-muted">
            {checkShot("06").preview}
          </figcaption>
        </figure>
      </Section>

      <Section id="price" title="Early Adopter pricing" eyebrow="Price" accent="check">
        <p className="max-w-3xl text-lg leading-relaxed text-navy">
          {CHECK_PRICE_LINE} Simpli Assist is included. {FOUNDER_ONBOARDING}
        </p>
      </Section>

      <Section id="benefits" title="Built for the way you already write" tone="white" accent="check">
        <ul className="grid gap-4 lg:grid-cols-2">
          {CHECK_BENEFITS.map((benefit) => (
            <li key={benefit.title} className="border border-border bg-neutral p-6">
              <h3 className="font-display text-lg font-semibold text-navy">{benefit.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{benefit.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="how-it-works" title="How it works" eyebrow="Simpli Check" accent="check">
        <ol className="grid gap-4 lg:grid-cols-2">
          {CHECK_STEPS.map((step, index) => (
            <li key={step.title} className="border border-border bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-check-ink">
                Step {index + 1}
              </p>
              <h3 className="font-display mt-3 text-xl font-semibold text-navy">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted">
          Simpli Check can read equipment data plates from a photo.
        </p>
      </Section>

      <Section
        id="see-how"
        title="See how Simpli Check works"
        eyebrow="Walkthrough"
        accent="check"
        tone="white"
      >
        <CheckWalkthrough />
      </Section>

      <Section
        id="assist"
        title="Simpli Assist suggests. You decide."
        tone="white"
        eyebrow="Simpli Assist"
        accent="check"
      >
        <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-muted">
          <p>
            Add a photo or a few notes. Simpli Assist drafts a Simpli-generated narrative
            in plain report language, shaped by your saved wording. Read it, edit it, or
            toss it. Nothing goes in the report until you approve it. Your license, your
            call, your words.
          </p>
          <p>
            Snap a photo, add a note, and Simpli Assist suggests what to write. You
            approve the wording.
          </p>
        </div>
      </Section>

      <Section
        id="switching"
        title="Questions about switching"
        eyebrow="Switching"
        accent="check"
      >
        <dl className="max-w-3xl space-y-8">
          {CHECK_OBJECTIONS.map((item) => (
            <div key={item.question}>
              <dt className="font-display text-xl font-semibold text-navy">{item.question}</dt>
              <dd className="mt-3 text-base leading-relaxed text-muted">{item.answer}</dd>
            </div>
          ))}
        </dl>
        <h3 className="font-display mt-12 text-2xl font-semibold text-navy">
          Help me bring my narratives
        </h3>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
          Tell us about the narratives you want to bring. We&apos;ll reply by email.
        </p>
        <div className="mt-6">
          <MigrationHelpForm page="/check" product="check" />
        </div>
      </Section>

      <Section
        id="pricing"
        title="Simpli Check — Early Adopter pricing"
        tone="white"
        eyebrow="Pricing"
        accent="check"
      >
        <div className="max-w-xl border border-border bg-neutral p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-check-ink">
            Early Adopter pricing — limited time
          </p>
          <p className="font-display mt-4 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            $49
          </p>
          <p className="mt-2 text-base text-navy">per user / month</p>
          <p className="mt-3 text-base leading-relaxed text-navy">{EVERY_USER_PAID}</p>
          <p className="mt-3 text-base leading-relaxed text-muted">{DIFFERENTIATOR_BODY}</p>
          <ul className="mt-6 space-y-2 text-base leading-relaxed text-muted">
            <li>Simpli Assist</li>
            <li>Report writer, saved narratives, and narrative migration</li>
            <li>Work orders, dashboard, photo tools, preview, and publishing</li>
            <li>{FOUNDER_ONBOARDING}</li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-navy">
            Add Simpli Archive: {ARCHIVE_ADDON_PRICE}
          </p>
          <p className="mt-4 text-sm text-muted">
            <a href={CHECKOUT.termsUrl} className="font-medium text-navy underline-offset-2 hover:underline">
              See Terms & Conditions.
            </a>
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <CheckoutLink href={CHECK_ORDER_PATH} className={buyClass}>
              Get Simpli Check
            </CheckoutLink>
            <CheckoutLink href={CHECKOUT.archiveAddonUrl} className={secondaryClass}>
              Add Simpli Archive
            </CheckoutLink>
          </div>
          <div className="mt-4">
            <CheckoutPlaceholderNote id="checkout-note-pricing" />
          </div>
          <p className="mt-4 text-sm text-muted">
            <a href="/welcome" className="font-medium text-navy underline-offset-2 hover:underline">
              See what happens after purchase
            </a>
          </p>
        </div>
      </Section>

      <Section id="faq" title="Questions inspectors ask" accent="check">
        <FaqList items={CHECK_FAQS} />
      </Section>

      <Section id="coming-soon" title="Coming soon to Simpli Check" accent="check">
        <p className="max-w-3xl text-base leading-relaxed text-muted">
          What we&apos;re building next, shaped by inspectors who use Simpli Check every day.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {CHECK_COMING_SOON.map((item) => (
            <li key={item.title} className="border border-border bg-white p-4">
              <h3 className="font-display text-lg font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-snug text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
          Features in development. Availability and timing may change. You always review and confirm
          what goes in your report.
        </p>
      </Section>

      <Section id="get-check" title={CHECK_HEADLINE} tone="navy" accent="check">
        <p className="max-w-3xl text-lg leading-relaxed">
          {CHECK_PRICE_SHORT}, Early Adopter pricing for a limited time.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <CheckoutLink href={CHECK_ORDER_PATH} className={onNavyClass}>
            Get Simpli Check
          </CheckoutLink>
          <a href={`mailto:${SITE.contactEmail}`} className="text-base font-semibold text-white underline-offset-2 hover:underline">
            Questions? {SITE.contactEmail}
          </a>
        </div>
      </Section>

      <Section id="updates" title="Send me launch updates" tone="white" accent="check">
        <p className="mb-8 max-w-xl text-base leading-relaxed text-muted">
          Email only. We&apos;ll send a link to this page. No calendar booking.
        </p>
        <EmailUpdatesForm page="/check" product="check" />
      </Section>
    </>
  );
}
