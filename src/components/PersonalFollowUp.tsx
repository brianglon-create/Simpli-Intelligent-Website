import { FOUNDER_FOLLOW_UP } from "@/lib/offer-copy";
import { SITE } from "@/lib/site";

export function PersonalFollowUp() {
  return (
    <div className="mt-8 max-w-3xl space-y-2 text-base leading-relaxed">
      <p className="font-medium text-navy">{FOUNDER_FOLLOW_UP}</p>
      <p className="text-muted">
        Prefer to talk? Reply to the confirmation email or email{" "}
        <a
          href={`mailto:${SITE.contactEmail}`}
          className="font-medium text-navy underline-offset-2 hover:underline"
        >
          {SITE.contactEmail}
        </a>
        .
      </p>
    </div>
  );
}
