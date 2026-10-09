import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/format";
import { productPrice, productSize } from "@/lib/commerce";
import { themeStyle } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { ProductMedia } from "./product-media";
import { StatusBadge } from "./coming-soon-badge";

/**
 * Catalogue tile: image, status, name, price, category · size. Everything
 * comes from the product record; the palette is scoped to the card, so any
 * future product renders with its own accent. The whole card leads to the
 * product page — buying happens there.
 */
export function ProductCard({
  product,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, 50vw",
  className,
}: {
  product: Product;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const price = productPrice(product);
  const size = productSize(product);
  const href = `/product/${product.slug}`;

  return (
    <article style={themeStyle(product.theme)} className={cn("group relative flex h-full flex-col", className)}>
      <div className="relative aspect-square overflow-hidden bg-product-bg">
        <Link href={href} className="absolute inset-0 block" aria-label={product.name} tabIndex={-1}>
          <div className="absolute inset-0 transition-transform duration-[900ms] ease-[var(--ease-premium)] group-hover:scale-[1.035]">
            <ProductMedia product={product} role="front" priority={priority} sizes={sizes} />
          </div>
        </Link>
        <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-product" />
        <div className="pointer-events-none absolute top-3 left-3">
          <StatusBadge product={product} />
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="display min-w-0 text-[1.6rem] leading-[0.95] md:text-3xl">
            <Link href={href} className="link-underline">
              {product.name}
            </Link>
          </h3>
          {price && (
            <p className="shrink-0 text-[15px] font-bold tabular-nums">
              {product.variants.length > 1 && <span className="mr-1 text-xs font-normal text-graphite">od</span>}
              {formatMoney(price)}
            </p>
          )}
        </div>
        <p className="mt-2 text-[13px] leading-snug text-graphite">
          {product.categoryLabel}
          {size && <> · {size}</>}
        </p>
        {product.demo && (
          <p className="mt-3 border-t border-ink/15 pt-3 text-xs leading-relaxed text-graphite">
            Wizualizacja systemu kolorów — nie jest produktem MONCRÉ ani nie jest w sprzedaży.
          </p>
        )}
      </div>
    </article>
  );
}
