import { CheckoutLink } from "@/components/CheckoutLink";
import { primaryButtonClass } from "@/components/classes";
import { CHECK_ORDER_PATH, CHECKOUT } from "@/lib/checkout";
import { PRODUCTS } from "@/lib/site";

const categoryInk = {
  check: "text-check-ink",
  operate: "text-operate-ink",
  archive: "text-archive-ink",
  reach: "text-reach-ink",
} as const;

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
            Simpli Check and Simpli Archive are available now. Simpli Operate and
            Simpli Reach are coming soon.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {PRODUCTS.map((product) => (
            <li
              key={product.id}
              className="flex flex-col border border-border bg-white p-6 sm:p-7"
            >
              <div className="flex items-start justify-between gap-3">
                <p className={`text-xs font-semibold uppercase tracking-[0.12em] ${categoryInk[product.id]}`}>
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
              <div className="mt-6 flex flex-col gap-3">
                {product.id === "check" ? (
                  <CheckoutLink
                    href={CHECK_ORDER_PATH}
                    className={`${primaryButtonClass} w-full justify-center`}
                  >
                    Get Simpli Check
                  </CheckoutLink>
                ) : null}
                {product.id === "archive" ? (
                  <CheckoutLink
                    href={CHECKOUT.archiveStandaloneUrl}
                    className={`${primaryButtonClass} w-full justify-center`}
                  >
                    Get Simpli Archive
                  </CheckoutLink>
                ) : null}
                <a
                  href={product.href}
                  className="inline-flex text-sm font-semibold text-blue hover:text-navy"
                >
                  View {product.name}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
