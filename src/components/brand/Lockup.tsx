import { Mark } from "@/components/brand/Mark";
import { productLineColor, PRODUCT_LINE, type BrandProduct } from "@/lib/brand";

const sizeClass = {
  sm: {
    mark: "h-8 w-8",
    word: "text-[15px] tracking-[0.04em]",
    line: "mt-1 text-[8px] tracking-[0.22em]",
    gap: "gap-2",
  },
  md: {
    mark: "h-12 w-12",
    word: "text-[22px] tracking-[0.04em]",
    line: "mt-1.5 text-[10px] tracking-[0.26em]",
    gap: "gap-2.5",
  },
  lg: {
    mark: "h-16 w-16",
    word: "text-3xl tracking-[0.04em]",
    line: "mt-2 text-xs tracking-[0.28em]",
    gap: "gap-3",
  },
} as const;

export function Lockup({
  product = "intelligent",
  surface = "light",
  size = "md",
}: {
  product?: BrandProduct;
  surface?: "dark" | "light";
  size?: keyof typeof sizeClass;
}) {
  const box = sizeClass[size];
  const word = surface === "dark" ? "text-white" : "text-navy";
  return (
    <span className={`inline-flex items-center ${box.gap}`}>
      <Mark product={product} surface={surface} className={box.mark} />
      <span className="flex flex-col leading-none">
        <span className={`font-display font-extrabold ${box.word} ${word}`}>SIMPLI</span>
        <span
          className={`font-display font-bold ${box.line}`}
          style={{ color: productLineColor(product, surface) }}
        >
          {PRODUCT_LINE[product]}
        </span>
      </span>
    </span>
  );
}
