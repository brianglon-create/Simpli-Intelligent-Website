import { useId } from "react";
import { BRAND, MARK_PATH, MARK_VIEWBOX, productAccent, type BrandProduct } from "@/lib/brand";

export function Mark({
  product = "intelligent",
  surface = "light",
  className = "h-10 w-8",
  title,
}: {
  product?: BrandProduct;
  surface?: "dark" | "light";
  className?: string;
  title?: string;
}) {
  const gradientId = `mark-${useId().replace(/:/g, "")}`;
  const accent = productAccent(product);
  const onDark = surface === "dark";

  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          {onDark ? (
            <>
              <stop offset="0" stopColor={BRAND.white} />
              <stop offset="0.47" stopColor={BRAND.white} />
              <stop offset="0.54" stopColor={BRAND.navy} />
              <stop offset="0.74" stopColor={accent} />
              <stop offset="1" stopColor={accent} />
            </>
          ) : product === "intelligent" ? (
            <>
              <stop offset="0" stopColor={BRAND.navy} />
              <stop offset="1" stopColor={BRAND.navy} />
            </>
          ) : (
            <>
              <stop offset="0" stopColor={BRAND.navy} />
              <stop offset="0.42" stopColor={BRAND.navy} />
              <stop offset="1" stopColor={accent} />
            </>
          )}
        </linearGradient>
      </defs>
      <path
        d={MARK_PATH}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
