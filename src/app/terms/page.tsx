import { SiteFrame } from "@/components/SiteFrame";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms & Conditions | Simpli Intelligent",
  description: "Placeholder for the Simpli Intelligent Terms & Conditions link.",
  path: "/terms",
  index: false,
});

export default function TermsPage() {
  return (
    <SiteFrame>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="font-display text-xs font-semibold tracking-[0.18em] text-blue">
          TERMS
        </p>
        <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-navy">
          Terms & Conditions
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          This is a placeholder page. The legal Terms & Conditions are not written
          here. Footer and pricing links use TERMS_URL in the checkout config, which
          points at this page until a real URL replaces it.
        </p>
      </article>
    </SiteFrame>
  );
}
