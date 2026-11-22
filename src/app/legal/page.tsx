import { SiteFrame } from "@/components/SiteFrame";
import { LEGAL_DOCS, readLegalFile } from "@/lib/legal/docs";
import { parseLegal } from "@/lib/legal/parse";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Legal documents | Simpli Intelligent",
  description:
    "Master SaaS Terms, product schedules, privacy policy, and related policies for Simpli Check and Simpli Archive. Version v1.1, effective November 22, 2026.",
  path: "/legal",
});

export default function LegalIndexPage() {
  return (
    <SiteFrame>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="font-display text-xs font-semibold tracking-[0.18em] text-blue">LEGAL</p>
        <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-navy">
          Legal documents
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Version v1.1. Effective November 22, 2026.
        </p>
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {LEGAL_DOCS.map((doc) => {
            const blocks = parseLegal(readLegalFile(doc.file));
            const version = blocks.find(
              (block) => block.type === "paragraph" && block.text.startsWith("Version:"),
            );
            return (
              <li key={doc.href} className="py-5">
                <a href={doc.href} className="font-display text-xl font-semibold text-navy hover:text-blue">
                  {doc.label}
                </a>
                {version?.type === "paragraph" ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted">{version.text}</p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </article>
    </SiteFrame>
  );
}
