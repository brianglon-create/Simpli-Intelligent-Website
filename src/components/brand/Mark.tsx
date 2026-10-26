import { useId } from "react";
import {
  BRAND,
  MARK_LOWER,
  MARK_STROKE,
  MARK_UPPER,
  MARK_VIEWBOX,
  productAccent,
  type BrandProduct,
} from "@/lib/brand";

export function Mark({
  product = "intelligent",
  surface = "light",
  className = "h-10 w-10",
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
  const upper = onDark ? BRAND.white : BRAND.navy;
  const lowerSolid = onDark || product === "intelligent";
  const lower = onDark ? accent : BRAND.navy;

  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {lowerSolid ? null : (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={BRAND.navy} />
            <stop offset="0.42" stopColor={BRAND.navy} />
            <stop offset="1" stopColor={accent} />
          </linearGradient>
        </defs>
      )}
      <path
        d={MARK_UPPER}
        fill="none"
        stroke={upper}
        strokeWidth={MARK_STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={MARK_LOWER}
        fill="none"
        stroke={lowerSolid ? lower : `url(#${gradientId})`}
        strokeWidth={MARK_STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
