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
          <a
            href={mailtoHref}
            className="mt-8 inline-flex items-center justify-center rounded-md bg-blue px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-navy"
          >
            Contact Simpli Intelligent
          </a>
        </div>
      </div>
    </section>
  );
}
