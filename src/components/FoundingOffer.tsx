import { primaryButtonClass } from "@/components/classes";
import {
  FOUNDING_CAP,
  FOUNDING_PRICE_49,
  FOUNDING_PRICE_69,
  TIER_49_CAP,
  TIER_69_CAP,
} from "@/lib/leads/founding";
import type { FoundingSnapshot } from "@/lib/leads/types";
import { ARCHIVE_FIRST_MONTH_USD, ARCHIVE_MONTHLY_USD } from "@/lib/offers";

export function FoundingOffer({
  status,
  showCta = false,
}: {
  status: FoundingSnapshot;
  showCta?: boolean;
}) {
  if (status.configured && status.closed) {
    return (
      <div className="mt-8 max-w-3xl border border-border bg-white p-6 sm:p-8">
        <h3 className="font-display text-2xl font-semibold text-navy">
          Founding-member pricing is closed
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted">
          The first {FOUNDING_CAP} founding spots are taken. The ${FOUNDING_PRICE_49}{" "}
          and ${FOUNDING_PRICE_69} founding tiers are no longer offered. You can
          still join the Simpli Check waitlist. Simpli Archive remains $
          {ARCHIVE_FIRST_MONTH_USD} for the first month, then ${ARCHIVE_MONTHLY_USD}
          /month.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {status.configured ? (
        <p className="text-base font-medium text-navy">Founding spots are available.</p>
      ) : null}
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        <li className="border border-border bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue">
            First {TIER_49_CAP} inspectors
          </p>
          <p className="font-display mt-4 text-4xl font-semibold tracking-tight text-navy">
            ${FOUNDING_PRICE_49}/month
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Locked at this rate for the first 50 Check signups.
          </p>
        </li>
        <li className="border border-border bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue">
            Next {TIER_69_CAP} inspectors
          </p>
          <p className="font-display mt-4 text-4xl font-semibold tracking-tight text-navy">
            ${FOUNDING_PRICE_69}/month
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Locked at this rate for the following 50 Check signups.
          </p>
        </li>
      </ul>
      <ul className="mt-6 max-w-3xl space-y-2 text-base leading-relaxed text-muted">
        <li>Personal support from Brian.</li>
        <li>First access to new products and features at discounted rates.</li>
        <li>
          Simpli Archive is included. If you leave Simpli Check, Archive storage
          resumes at ${ARCHIVE_MONTHLY_USD}/month.
        </li>
      </ul>
      {showCta ? (
        <a href="#signup" className={`${primaryButtonClass} mt-8`}>
          Join the Simpli Check waitlist
        </a>
      ) : null}
    </div>
  );
}
