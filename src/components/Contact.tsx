import { EmailUpdatesForm } from "@/components/forms/EmailUpdatesForm";
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
            Get updates.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Send your email for updates about Simpli Check and Simpli Archive.
          </p>
          <div className="mt-8">
            <EmailUpdatesForm page="/" product="both" id="contact-form" />
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
