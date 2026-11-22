import { isConfiguredUrl, showDraftCheckoutNote } from "@/lib/checkout";

export function CheckoutLink({
  href,
  className,
  children,
  pendingHref = "#checkout-not-connected",
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  pendingHref?: string;
}) {
  const ready = isConfiguredUrl(href);
  return (
    <a
      href={ready ? href : pendingHref}
      className={className}
      data-checkout={ready ? "configured" : "placeholder"}
    >
      {children}
    </a>
  );
}

export function CheckoutPlaceholderNote({ id }: { id?: string }) {
  if (!showDraftCheckoutNote()) return null;
  return (
    <p id={id} className="max-w-2xl text-sm leading-relaxed text-muted">
      Checkout is not connected on this draft. Buy buttons use placeholder links,
      and a purchase cannot be completed here.
    </p>
  );
}
