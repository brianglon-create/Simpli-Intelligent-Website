export function Section({
  id,
  title,
  eyebrow,
  tone = "plain",
  accent = "brand",
  children,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  tone?: "plain" | "white" | "navy";
  accent?: "brand" | "check" | "operate" | "archive" | "reach";
  children: React.ReactNode;
}) {
  const headingId = `${id}-heading`;
  const toneClass =
    tone === "white" ? "bg-white" : tone === "navy" ? "border-navy bg-navy text-white" : "";
  const titleClass = tone === "navy" ? "text-white" : "text-navy";
  const onLight = {
    brand: "text-blue",
    check: "text-check-ink",
    operate: "text-operate-ink",
    archive: "text-archive-ink",
    reach: "text-reach-ink",
  } as const;
  const onNavy = {
    brand: "text-blue-soft",
    check: "text-check",
    operate: "text-operate",
    archive: "text-archive",
    reach: "text-reach",
  } as const;
  const eyebrowClass = tone === "navy" ? onNavy[accent] : onLight[accent];

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-24 border-t border-border/70 ${toneClass}`}
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        {eyebrow ? (
          <p className={`font-display text-xs font-semibold tracking-[0.18em] ${eyebrowClass}`}>
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={headingId}
          className={`font-display max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl ${eyebrow ? "mt-4" : ""} ${titleClass}`}
        >
          {title}
        </h2>
        <div className={tone === "navy" ? "mt-6 text-white/85" : "mt-6"}>{children}</div>
      </div>
    </section>
  );
}
