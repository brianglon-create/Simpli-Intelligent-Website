export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      <div className="mx-auto flex max-w-6xl flex-col px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:pt-28">
        <p className="font-display mb-6 text-xs font-semibold tracking-[0.18em] text-blue sm:text-sm">
          SIMPLI INTELLIGENT
        </p>
        <h1
          id="hero-heading"
          className="font-display max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-navy sm:text-5xl lg:text-[3.35rem] lg:leading-[1.12]"
        >
          Built for Small Business. Built by Small Business.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          We&apos;re creating a connected family of business applications that
          help owner-operated businesses grow, organize, and operate with
          confidence.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Simpli Intelligent is the platform behind Simpli Check, Operate,
          Archive, and Reach.
        </p>
        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
          <a
            href="#products"
            className="inline-flex items-center justify-center rounded-md bg-navy px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-navy-mid"
          >
            Explore Our Products
          </a>
          <p className="text-sm font-medium tracking-wide text-muted sm:text-base">
            Simple to understand. Simple to use. Wildly effective.
          </p>
        </div>
      </div>
    </section>
  );
}
