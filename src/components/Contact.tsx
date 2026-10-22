import { LeadForm } from "@/components/LeadForm";
import { SITE } from "@/lib/site";

export function Contact() {
  const mailtoHref = `mailto:${SITE.contactEmail}`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 border-t border-border/70"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <h2
            id="contact-heading"
            className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl"
          >
            Follow the journey.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Simpli Intelligent is currently developing and internally testing
            its first products.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Leave your name if you want to hear about one of them. This form
            reserves your place. It does not charge a card.
          </p>
          <div className="mt-8">
            <LeadForm page="/" id="contact-form" />
          </div>
          <p className="mt-8 text-base text-muted">
            Or email{" "}
            <a href={mailtoHref} className="font-medium text-navy">
              {SITE.contactEmail}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
