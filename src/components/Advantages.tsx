import {
  ADVANTAGE_FAST_START,
  ADVANTAGE_FAST_START_MORE,
  ADVANTAGE_INSPECTOR,
  ADVANTAGE_PRICE,
  ADVANTAGE_PRICE_NOTE,
  ADVANTAGE_TIME,
} from "@/lib/offer-copy";

const items = [
  {
    label: "Price",
    body: ADVANTAGE_PRICE,
    note: "1",
  },
  {
    label: "Fast start",
    body: ADVANTAGE_FAST_START,
    more: ADVANTAGE_FAST_START_MORE,
  },
  {
    label: "Built by an inspector",
    body: ADVANTAGE_INSPECTOR,
  },
  {
    label: "Time saved",
    body: ADVANTAGE_TIME,
  },
] as const;

export function Advantages() {
  return (
    <div className="mt-5">
      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <li key={item.label} className="border border-border bg-white p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-check-ink">
              {item.label}
            </p>
            <p className="mt-1 text-sm font-medium leading-snug text-navy">
              {item.body}
              {"note" in item ? <sup className="ml-0.5 text-[0.7em]">{item.note}</sup> : null}
            </p>
            {"more" in item ? (
              <p className="mt-1 text-sm leading-snug text-muted">{item.more}</p>
            ) : null}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs leading-snug text-muted">
        <sup>1</sup> {ADVANTAGE_PRICE_NOTE}
      </p>
    </div>
  );
}
