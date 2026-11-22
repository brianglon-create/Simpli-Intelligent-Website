import { SiteFrame } from "@/components/SiteFrame";
import { LEGAL_DOCS, readLegalFile, type LegalDoc } from "@/lib/legal/docs";
import { parseLegal } from "@/lib/legal/parse";

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  const blocks = parseLegal(readLegalFile(doc.file));
  const title = blocks.find((block) => block.type === "title");

  return (
    <SiteFrame>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-sm font-medium text-navy">
          <a href="/legal" className="underline-offset-2 hover:underline">
            All legal documents
          </a>
        </p>
        {title?.type === "title" ? (
          <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            {title.text}
          </h1>
        ) : null}
        <div className="mt-8 space-y-4 text-base leading-relaxed text-muted">
          {blocks.map((block, index) => {
            if (block.type === "title") return null;
            if (block.type === "heading") {
              return (
                <h2 key={index} className="font-display pt-4 text-2xl font-semibold text-navy">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "table") {
              const [header, ...rows] = block.rows;
              return (
                <div key={index} className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm text-navy">
                    <thead>
                      <tr>
                        {header.map((cell, cellIndex) => (
                          <th key={`${cellIndex}-${cell}`} className="border border-border bg-neutral px-3 py-2 font-semibold">
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => (
                        <tr key={row.join("|")}>
                          {row.map((cell, cellIndex) => (
                            <td key={`${cellIndex}-${cell}`} className="border border-border px-3 py-2 align-top">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
            return <p key={index}>{block.text}</p>;
          })}
        </div>
        <nav aria-label="Other legal documents" className="mt-12 border-t border-border pt-6">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_DOCS.filter((item) => item.href !== doc.href).map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm font-medium text-navy hover:text-blue">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </article>
    </SiteFrame>
  );
}
