import { ProductShot } from "@/components/marketing/ProductShot";
import { CHECK_SHOTS } from "@/lib/check-shots";

export function CheckWalkthrough() {
  return (
    <div>
      <p className="max-w-3xl text-base leading-relaxed text-muted">
        From the dashboard to a report your client can open. Select a screenshot to see it larger.
      </p>
      <ol className="mt-8 space-y-5">
        {CHECK_SHOTS.map((shot, index) => {
          const step = `Step ${index + 1}`;
          if (shot.featured) {
            return (
              <li key={shot.id} className="border-2 border-check-ink bg-white p-5 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-check-ink">
                  {step} · {shot.title}
                </p>
                <h3 className="font-display mt-3 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                  No typing required.
                </h3>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-navy sm:text-lg">
                  {shot.caption}
                </p>
                <div className="mt-6">
                  <ProductShot shot={shot} sizes="(min-width: 1024px) 960px, 100vw" />
                </div>
              </li>
            );
          }

          const place = CHECK_SHOTS.slice(0, index).filter((item) => !item.featured).length;
          const flip = place % 2 === 1;
          return (
            <li
              key={shot.id}
              className="grid items-center gap-5 border border-border bg-white p-4 sm:p-6 lg:grid-cols-2 lg:gap-8"
            >
              <div className={flip ? "lg:order-2" : undefined}>
                <ProductShot shot={shot} />
              </div>
              <div className={flip ? "lg:order-1" : undefined}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-check-ink">{step}</p>
                <h3 className="font-display mt-2 text-2xl font-semibold text-navy">{shot.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{shot.caption}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
