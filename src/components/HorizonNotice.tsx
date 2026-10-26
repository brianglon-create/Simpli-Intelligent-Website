export function HorizonNotice() {
  return (
    <aside aria-label="Horizon shutdown" className="border-b border-white/10 bg-navy text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-sm leading-relaxed sm:text-base">
          Horizon shuts down December 15, 2026. Report history does not come along
          in a one-click migration.
        </p>
        <a
          href="/horizon"
          className="inline-flex shrink-0 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-navy hover:bg-blue-soft"
        >
          See what to do
        </a>
      </div>
    </aside>
  );
}
