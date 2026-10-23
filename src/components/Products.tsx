import { PRODUCTS } from "@/lib/site";

export function Products() {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="scroll-mt-24 border-t border-border/70"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <h2
            id="products-heading"
            className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl"
          >
            Our products
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Simpli Intelligent is the platform. Each product does one job. Open
            one to see where it stands and join its list.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {PRODUCTS.map((product) => (
            <li
              key={product.id}
              className="flex flex-col border border-border bg-white p-6 sm:p-7"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue">
                  {product.category}
                </p>
                <span className="shrink-0 rounded-sm bg-blue-soft px-2.5 py-1 text-xs font-medium text-navy-mid">
                  {product.status}
                </span>
              </div>
              <h3 className="font-display mt-4 text-xl font-semibold tracking-wide text-navy">
                {product.name}
              </h3>
              <p className="mt-4 flex-1 text-base leading-relaxed text-muted">
                {product.description}
              </p>
              <a
                href={product.href}
                className="mt-6 inline-flex text-sm font-semibold text-blue hover:text-navy"
              >
                View {product.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
