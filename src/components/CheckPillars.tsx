import { CHECK_PILLARS } from "@/lib/offers";

export function CheckPillars() {
  return (
    <ul className="mt-8 grid gap-4 lg:grid-cols-3">
      {CHECK_PILLARS.map((pillar) => (
        <li key={pillar.title} className="border border-border bg-neutral p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue">
            Launching November
          </p>
          <h3 className="font-display mt-3 text-lg font-semibold text-navy">{pillar.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-muted">{pillar.body}</p>
        </li>
      ))}
    </ul>
  );
}
