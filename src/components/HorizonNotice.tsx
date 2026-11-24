import { CheckoutLink } from "@/components/CheckoutLink";
import { CHECK_ORDER_PATH } from "@/lib/checkout";

export function HorizonNotice() {
  return (
    <aside aria-label="Products available" className="border-b border-white/10 bg-navy text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-sm leading-relaxed sm:text-base">
          Simpli Check and Simpli Archive are available now. Horizon exports end
          December 15, 2026.
        </p>
        <CheckoutLink
          href={CHECK_ORDER_PATH}
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-navy hover:bg-blue-soft"
        >
          Get Simpli Check
        </CheckoutLink>
      </div>
    </aside>
  );
}
