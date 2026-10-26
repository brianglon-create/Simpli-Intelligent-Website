import { Lockup } from "@/components/brand/Lockup";
import { ArchivePricing } from "@/components/ArchivePricing";
import { LeadForm } from "@/components/LeadForm";
import { Section } from "@/components/Section";
import { primaryButtonClass, secondaryButtonClass } from "@/components/classes";
import type { FoundingSnapshot } from "@/lib/leads/types";
import { ARCHIVE_BULLETS, SHUTDOWN_LABEL } from "@/lib/offers";

export function ArchiveLanding({ status }: { status: FoundingSnapshot }) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
          <Lockup product="archive" surface="light" size="lg" />
          <h1 className="font-display mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-navy sm:text-5xl">
            Don&apos;t let {SHUTDOWN_LABEL} erase your inspection history.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Export your Horizon reports. Simpli Archive is being built to keep
            every past report searchable when a client, agent, insurer, or
            attorney comes asking, no matter which software you use next.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#signup" className={primaryButtonClass}>
              Protect my report history
            </a>
            <a href="/horizon" className={secondaryButtonClass}>
              Read the full Horizon briefing
            </a>
          </div>
        </div>
      </section>
      <Section id="archive-details" title="What Simpli Archive is for" tone="white" accent="archive">
        <ul className="grid gap-4 lg:grid-cols-3">
          {ARCHIVE_BULLETS.map((bullet) => (
            <li key={bullet.title} className="border border-border bg-neutral p-6">
              <h3 className="font-display text-lg font-semibold text-navy">{bullet.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{bullet.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted">
          The full shutdown briefing, including what Spectora&apos;s migration leaves
          behind, is on the Horizon page.
        </p>
        <ArchivePricing status={status} />
      </Section>
      <Section id="archive-join" title="Reserve Simpli Archive" accent="archive">
        <LeadForm
          page="/archive"
          interests={["archive", "check", "both"]}
          defaultInterest="archive"
        />
      </Section>
    </>
  );
}
