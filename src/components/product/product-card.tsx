import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/format";
import { isPurchasable, lowestPrice } from "@/lib/commerce";
import { ComingSoonBadge } from "./coming-soon-badge";
import { cn } from "@/lib/utils";
import { ProductMedia } from "./product-media";
import { FavoriteButton } from "./favorite-button";
import { AddToCartButton } from "./add-to-cart-button";

const categoryLabel: Record<Product["category"], string> = {
  clay: "Clay",
  pomade: "Pomade",
  powder: "Powder",
  spray: "Spray",
  sets: "Set",
};

export function ProductCard({
  product,
  priority = false,
  showDescription = false,
  className,
  sizes,
}: {
  product: Product;
  priority?: boolean;
  showDescription?: boolean;
  className?: string;
  sizes?: string;
}) {
  const multiPrice = product.variants.length > 1;
  const hasAlt = product.images.length > 1;

  return (
    <article className={cn("group relative flex h-full flex-col", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0 block"
          aria-label={product.name}
          tabIndex={-1}
        >
          {/* Primary image */}
          <div
            className={cn(
              "absolute inset-[10%_8%] transition-[transform,opacity] duration-[900ms] ease-[var(--ease-premium)] group-hover:scale-[1.04]",
              hasAlt && "md:group-hover:opacity-0",
            )}
          >
            <ProductMedia product={product} priority={priority} sizes={sizes} />
          </div>
          {/* Hover image: second official view (e.g. the box) on the same surface */}
          {hasAlt && (
            <div className="absolute inset-[10%_8%] hidden scale-[0.96] opacity-0 transition-[transform,opacity] duration-[900ms] ease-[var(--ease-premium)] group-hover:scale-100 group-hover:opacity-100 md:block">
              <ProductMedia product={product} view="alt" sizes={sizes} />
            </div>
          )}
        </Link>

        {isPurchasable(product) ? (
          <span className="label pointer-events-none absolute top-4 left-4 text-[10px] text-navy-900/70">
            {categoryLabel[product.category]}
          </span>
        ) : (
          <ComingSoonBadge className="pointer-events-none absolute top-3 left-3" />
        )}
        <FavoriteButton
          productId={product.id}
          productName={product.name}
          className="absolute top-2 right-2"
        />

        {/* Quick add — slides in on hover (desktop), always reachable via keyboard */}
        <div className="absolute inset-x-3 bottom-3 hidden translate-y-[calc(100%+1rem)] transition-transform duration-700 ease-[var(--ease-premium)] group-focus-within:translate-y-0 group-hover:translate-y-0 md:block">
          <AddToCartButton product={product} className="w-full" label="Quick add" />
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[15px] leading-snug font-bold tracking-tight md:text-base">
            <Link href={`/product/${product.slug}`} className="link-underline">
              {product.name.replace("MONCRÉ ", "")}
            </Link>
          </h3>
          <p className="shrink-0 text-[15px] font-semibold tabular-nums md:text-base">
            {multiPrice && <span className="mr-1 text-xs font-medium text-navy-500">od</span>}
            {formatMoney(lowestPrice(product))}
          </p>
        </div>
        <p className="mt-1 text-[13px] text-navy-500">
          {product.variants.length > 1 ? product.variants.map((v) => v.title).join(" · ") : product.tagline}
        </p>
        {showDescription && (
          <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-navy-900/75">{product.tagline}</p>
        )}
        {/* Mobile: explicit add button (no hover on touch) */}
        <div className="mt-auto pt-4 md:hidden">
          <AddToCartButton product={product} size="sm" variant="secondary" className="w-full" label="Add to cart" />
        </div>
      </div>
    </article>
  );
}
