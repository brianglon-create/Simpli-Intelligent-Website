import { BookingLink } from "@/components/BookingLink";
import { thankYouCopy } from "@/lib/leads/thank-you";
import type { SuccessBody } from "@/lib/leads/types";
import { SHUTDOWN_LABEL } from "@/lib/offers";

export function ThankYou({
  result,
  bookingUrl,
}: {
  result: SuccessBody | null;
  bookingUrl: string | null;
}) {
  const copy = result
    ? thankYouCopy(result)
    : {
        title: "Thanks for your interest.",
        paragraphs: [
          "If you just signed up, you're on the list. We'll write from Simpli Intelligent.",
          `Horizon's export tools stop on ${SHUTDOWN_LABEL}. Please export your full history before then if you still have it in Horizon.`,
        ],
      };

  return (
    <div className="max-w-2xl border border-border bg-white p-6 sm:p-8" role="status">
      <h3 className="font-display text-2xl font-semibold text-navy">{copy.title}</h3>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
        {copy.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {bookingUrl ? (
        <>
          <p className="mt-8 text-base font-medium text-navy">Prefer to talk?</p>
          <div className="mt-4">
            <BookingLink bookingUrl={bookingUrl} />
          </div>
        </>
      ) : null}
      <p className="mt-6 text-sm text-muted">
        <a href="/privacy" className="font-medium text-navy underline-offset-2 hover:underline">
          Privacy policy
        </a>
      </p>
    </div>
  );
}
