import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <p className="font-display text-sm font-semibold tracking-[0.12em] text-navy">
          {SITE.wordmark}
        </p>
        <p className="mt-4 text-sm text-muted">
          © {SITE.copyrightYear} {SITE.name}
        </p>
        <p className="mt-1 text-sm text-muted">
          Operated by {SITE.legalEntity}
        </p>
        <p className="mt-1 text-sm text-muted">{SITE.location}</p>
      </div>
    </footer>
  );
}
