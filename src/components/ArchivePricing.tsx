import { primaryButtonClass } from "@/components/classes";
import type { FoundingSnapshot } from "@/lib/leads/types";
import { OFFER_INSPECTOR, OFFER_INSPECTORS, OFFER_NAME } from "@/lib/offer-copy";
import { ARCHIVE_FIRST_MONTH_USD, ARCHIVE_MONTHLY_USD } from "@/lib/offers";

export function ArchivePricing({
  status,
  showCta = false,
}: {
  status?: FoundingSnapshot;
  showCta?: boolean;
}) {
  const closed = Boolean(status?.configured && status.closed);
  return (
    <div className="mt-8">
      <ul className="grid gap-4 md:grid-cols-2">
        <li className="border border-border bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue">
            First month
          </p>
          <p className="font-display mt-4 text-4xl font-semibold tracking-tight text-navy">
            ${ARCHIVE_FIRST_MONTH_USD}
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Then ${ARCHIVE_MONTHLY_USD}/month.
          </p>
        </li>
        <li className="border border-border bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue">
            After the first month
          </p>
          <p className="font-display mt-4 text-4xl font-semibold tracking-tight text-navy">
            ${ARCHIVE_MONTHLY_USD}/month
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted">
            {closed
              ? `${OFFER_NAME} Archive inclusion is closed with the ${OFFER_NAME} tiers.`
              : `Included for Simpli Check ${OFFER_INSPECTORS}. If an ${OFFER_INSPECTOR} leaves Check, storage resumes at this rate.`}
          </p>
        </li>
      </ul>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted">
        This form reserves your place. It does not charge a card.
      </p>
      {showCta ? (
        <a href="#signup" className={`${primaryButtonClass} mt-8`}>
          Protect my report history
        </a>
      ) : null}
    </div>
  );
}
