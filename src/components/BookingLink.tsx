import { primaryButtonClass } from "@/components/classes";

export function BookingLink({ bookingUrl }: { bookingUrl: string | null }) {
  if (!bookingUrl) return null;

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
