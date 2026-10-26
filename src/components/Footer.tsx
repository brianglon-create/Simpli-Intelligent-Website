import { Mark } from "@/components/brand/Mark";
import { FOOTER_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <p className="flex items-center gap-2.5 font-display text-sm font-semibold tracking-[0.12em] text-navy">
          <Mark product="intelligent" surface="light" className="h-7 w-7" />
          {SITE.wordmark}
        </p>
        <nav aria-label="Footer" className="mt-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-navy hover:text-blue"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-6 text-sm text-muted">
          © {SITE.copyrightYear} {SITE.name}
        </p>
        <p className="mt-1 text-sm text-muted">
          {SITE.brandLine}
        </p>
        <p className="mt-1 text-sm text-muted">{SITE.location}</p>
      </div>
    </footer>
  );
}
