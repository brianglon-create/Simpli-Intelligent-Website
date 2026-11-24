"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lockup } from "@/components/brand/Lockup";
import { CheckoutLink } from "@/components/CheckoutLink";
import { primaryButtonClass } from "@/components/classes";
import { CHECK_ORDER_PATH, CHECKOUT } from "@/lib/checkout";
import { NAV_LINKS } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2 sm:px-8 lg:py-4">
        <Link href="/" aria-label="Simpli Intelligent" className="shrink-0">
          <span className="lg:hidden">
            <Lockup product="intelligent" surface="light" size="xs" />
          </span>
          <span className="hidden lg:inline-flex">
            <Lockup product="intelligent" surface="light" size="sm" />
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = link.href === pathname;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium transition-colors hover:text-navy ${active ? "text-navy" : "text-muted"}`}
              >
                {link.label}
              </a>
            );
          })}
          <CheckoutLink
            href={CHECKOUT.loginUrl}
            pendingHref="#login-not-connected"
            className="text-sm font-medium text-navy hover:text-blue"
          >
            Sign in
          </CheckoutLink>
          <CheckoutLink
            href={CHECK_ORDER_PATH}
            className={`${primaryButtonClass} px-4 py-2 text-sm`}
          >
            Get Simpli Check
          </CheckoutLink>
        </nav>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <CheckoutLink
            href={CHECK_ORDER_PATH}
            className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-md bg-navy px-2.5 text-sm font-semibold text-white"
          >
            Get Simpli Check
          </CheckoutLink>
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-md border border-border bg-white px-2.5 text-sm font-medium text-navy"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id={menuId}
          aria-label="Mobile"
          className="border-t border-border bg-white px-5 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-md px-3 py-3 text-base font-medium text-navy hover:bg-blue-soft"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <CheckoutLink
                href={CHECKOUT.loginUrl}
                pendingHref="#login-not-connected"
                className="block rounded-md px-3 py-3 text-base font-medium text-navy hover:bg-blue-soft"
              >
                Sign in
              </CheckoutLink>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
