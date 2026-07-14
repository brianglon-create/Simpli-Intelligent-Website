"use client";

import { useEffect, useId, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

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
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a
          href="#top"
          className="font-display text-sm font-semibold tracking-[0.14em] text-navy sm:text-base"
        >
          {SITE.wordmark}
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-navy"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-border bg-white px-3 py-2 text-sm font-medium text-navy md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close menu" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav
          id={menuId}
          aria-label="Mobile"
          className="border-t border-border bg-white px-5 py-4 md:hidden"
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
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
