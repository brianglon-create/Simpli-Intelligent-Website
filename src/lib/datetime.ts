const INDIANAPOLIS = "America/Indiana/Indianapolis";

/** e.g. Oct 22, 2026, 3:32 PM ET. Invalid values stay out of the raw ISO form. */
export function formatIndianapolis(value: string | Date | null | undefined): string {
  const date = value instanceof Date ? value : value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "(unknown time)";
  const formatted = new Intl.DateTimeFormat("en-US", {
    timeZone: INDIANAPOLIS,
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return `${formatted} ET`;
}
