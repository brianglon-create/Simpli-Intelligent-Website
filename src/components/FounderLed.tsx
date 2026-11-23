import { DIFFERENTIATOR_BODY, DIFFERENTIATOR_HEADING } from "@/lib/offer-copy";

export function FounderLed() {
  return (
    <section
      id="founder-led"
      aria-labelledby="founder-led-heading"
      className="scroll-mt-24 border-t border-border/70 bg-white"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-3xl">
          <h2
            id="founder-led-heading"
            className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl"
          >
            {DIFFERENTIATOR_HEADING}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">{DIFFERENTIATOR_BODY}</p>
        </div>
      </div>
    </section>
  );
}
