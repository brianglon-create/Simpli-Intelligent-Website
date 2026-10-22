import { primaryButtonClass } from "@/components/classes";
import { SITE } from "@/lib/site";

export function BookingLink({ bookingUrl }: { bookingUrl: string | null }) {
  if (bookingUrl) {
    return (
      <a
        href={bookingUrl}
        className={primaryButtonClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        Book 15 minutes with Brian
      </a>
    );
  }

  const href = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent("15 minutes with Brian")}`;
  return (
    <a href={href} className={primaryButtonClass}>
      Book 15 minutes with Brian
    </a>
  );
}
