export function ScreenshotSlot({
  shot,
  title,
  fileName,
}: {
  shot: string;
  title: string;
  fileName: string;
}) {
  return (
    <figure className="mt-8" aria-label={`Screenshot ${shot}: ${title}`}>
      <div className="flex aspect-video min-h-56 w-full flex-col items-center justify-center gap-3 border-2 border-dashed border-navy/30 bg-white px-5 py-8 text-center sm:px-8">
        <p className="font-display text-xs font-semibold tracking-[0.16em] text-blue">
          SCREENSHOT {shot}
        </p>
        <p className="font-display max-w-xl text-xl font-semibold text-navy sm:text-2xl">
          {title}
        </p>
        <p className="max-w-md text-sm leading-relaxed text-muted">
          Empty slot for a real Simpli Check screenshot. File name {fileName}.
        </p>
      </div>
      <figcaption className="mt-3 text-sm text-muted">
        {title}. Placeholder sized for the product screenshot.
      </figcaption>
    </figure>
  );
}
