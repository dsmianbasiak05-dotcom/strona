import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/format";
import { productPrice, productSize } from "@/lib/commerce";
import { themeStyle } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { ProductMedia } from "./product-media";
import { FavoriteButton } from "./favorite-button";
import { AddToCartButton } from "./add-to-cart-button";
import { StatusBadge } from "./coming-soon-badge";

/**
 * Reusable product card. Everything comes from the product record —
 * name, category, price, size, status, images (by role), theme and the
 * demo flag. The product palette is scoped to the card; no colours are
 * hard-coded, so any future product renders with its own accent.
 *
 * - `grid`: catalogue tile (shop, related products, favorites).
 * - `feature`: wide layout for a lone product.
 */
export function ProductCard({
  product,
  variant = "grid",
  priority = false,
  sizes,
  className,
}: {
  product: Product;
  variant?: "grid" | "feature";
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const demo = product.demo === true;
  const price = productPrice(product);
  const size = productSize(product);
  const multiPrice = product.variants.length > 1;
  const href = `/product/${product.slug}`;
  const feature = variant === "feature";

  const media = (
    <div className={cn("relative overflow-hidden bg-product-bg", feature ? "aspect-[5/4] lg:col-span-7" : "aspect-[4/5]")}>
      {/* One opaque image per card — no cross-fade layering (avoids ghosting). */}
      <Link href={href} className="absolute inset-0 block" aria-label={product.name} tabIndex={-1}>
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-[var(--ease-premium)] group-hover:scale-[1.035]">
          <ProductMedia
            product={product}
            role="front"
            priority={priority}
            sizes={sizes ?? (feature ? "(min-width: 1024px) 56vw, 100vw" : "(min-width: 1024px) 33vw, 50vw")}
          />
        </div>
      </Link>

      {/* Product accent: a hairline in the product's own colour */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-product" />

      <div className="pointer-events-none absolute top-3 left-3">
        <StatusBadge product={product} />
      </div>
      {!demo && (
        <FavoriteButton productId={product.id} productName={product.name} className="absolute top-2 right-2 bg-paper/70 backdrop-blur" />
      )}

      {!feature && !demo && (
        <div className="absolute inset-x-3 bottom-4 hidden translate-y-[calc(100%+1.25rem)] transition-transform duration-700 ease-[var(--ease-premium)] group-focus-within:translate-y-0 group-hover:translate-y-0 md:block">
          <AddToCartButton product={product} className="w-full" label="Szybko dodaj" />
        </div>
      )}
    </div>
  );

  const meta = (
    <p className="flex items-start gap-2 text-[13px] leading-snug text-graphite">
      <span aria-hidden className="mt-[3px] inline-block size-2.5 shrink-0 bg-product" />
      <span>
        {product.categoryLabel}
        {size && <> · {size}</>}
      </span>
    </p>
  );

  const priceEl = price ? (
    <p className="shrink-0 text-[15px] font-bold tabular-nums">
      {multiPrice && <span className="mr-1 text-xs font-normal text-graphite">od</span>}
      {formatMoney(price)}
    </p>
  ) : null;

  if (feature) {
    return (
      <article style={themeStyle(product.theme)} className={cn("group grid gap-6 lg:grid-cols-12 lg:gap-12", className)}>
        {media}
        <div className="flex flex-col lg:col-span-5 lg:py-2">
          <p className="label text-graphite">MONCRÉ</p>
          <h2 className="display mt-3 text-[18vw] leading-[0.86] md:text-8xl xl:text-9xl">
            <Link href={href}>{product.type}</Link>
          </h2>
          <div className="mt-4">{meta}</div>
          {product.specs && (
            <dl className="mt-8 border-t border-ink/15">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex items-baseline justify-between gap-6 border-b border-ink/15 py-3">
                  <dt className="label text-graphite">{spec.label}</dt>
                  <dd className="text-right text-[15px] font-bold">{spec.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {price && (
            <div className="mt-6 flex items-center gap-3">
              <p className="text-2xl font-bold tabular-nums">{formatMoney(price)}</p>
              <StatusBadge product={product} />
            </div>
          )}
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:mt-auto lg:pt-8">
            <AddToCartButton product={product} size="lg" className="w-full" />
            <Link
              href={href}
              className="label inline-flex h-14 items-center justify-center border border-ink px-6 transition-colors duration-500 hover:bg-ink hover:text-paper md:h-16"
            >
              Poznaj {product.type}
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article style={themeStyle(product.theme)} className={cn("group relative flex h-full flex-col", className)}>
      {media}
      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="display min-w-0 text-[1.6rem] leading-[0.95] md:text-3xl">
            <Link href={href} className="link-underline">
              {product.name}
            </Link>
          </h3>
          {priceEl}
        </div>
        <div className="mt-2">{meta}</div>
        {demo && (
          <p className="mt-3 border-t border-ink/15 pt-3 text-xs leading-relaxed text-graphite">
            Wizualizacja systemu kolorów — nie jest produktem MONCRÉ ani nie jest w sprzedaży.
          </p>
        )}
        {!demo && (
          <div className="mt-auto pt-4 md:hidden">
            <AddToCartButton product={product} size="sm" variant="secondary" className="w-full" />
          </div>
        )}
      </div>
    </article>
  );
}
