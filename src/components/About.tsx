export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 border-t border-border/70 bg-white"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <h2
            id="about-heading"
            className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl"
          >
            Why We Built Simpli
          </h2>

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
            <p>Running a small business is one of the most rewarding things you can do.</p>
            <p>It&apos;s also one of the hardest.</p>
            <p>
              I&apos;ve experienced the long days, late nights, and constant
              pressure of trying to serve customers while somehow finding time
              to market the business, stay organized, manage paperwork, and
              continue growing.
            </p>
            <p>
              Too often, software made those problems worse instead of better.
              It became expensive, complicated, and built for companies with
              departments instead of owners wearing every hat.
            </p>
            <p>That&apos;s why I started Simpli Intelligent.</p>
            <p>Our mission is simple:</p>
            <p className="font-display text-xl font-medium leading-snug text-navy sm:text-2xl">
              Build practical business tools that save time, reduce stress, and
              help small business owners make better decisions.
            </p>
            <p>
              We build the tools we wished we had while running our own
              business.
            </p>
            <p>Because we believe running a business is hard enough.</p>
            <p className="font-display text-xl font-medium leading-snug text-navy sm:text-2xl">
              Your software shouldn&apos;t make it harder.
            </p>
            <p>
              We&apos;re building Simpli one product at a time, guided by real
              business owners, real-world experience, and a commitment to
              making every product genuinely useful.
            </p>
            <p>Thank you for being part of the journey.</p>
          </div>

          <p className="mt-10 text-base leading-relaxed text-navy">
            <span className="block font-medium">— Brian Glon</span>
            <span className="mt-1 block text-muted">
              Founder, Simpli Intelligent
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
