import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/format";
import { isPurchasable, lowestPrice, productSize } from "@/lib/commerce";
import { themeStyle } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { ProductMedia } from "./product-media";
import { FavoriteButton } from "./favorite-button";
import { AddToCartButton } from "./add-to-cart-button";
import { ComingSoonBadge } from "./coming-soon-badge";

/**
 * Reusable product card. Everything comes from the product record —
 * name, category, price, size, status, images (by role) and theme.
 * The product palette is scoped to the card; nothing is hard-coded.
 *
 * - `grid`: catalogue tile (shop grid, related products, favorites).
 * - `feature`: wide layout for a lone product (catalogue of one).
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
  const onSale = isPurchasable(product);
  const multiPrice = product.variants.length > 1;
  const hasAlt = product.images.some((i) => i.role === "packaging");
  const href = `/product/${product.slug}`;
  const feature = variant === "feature";

  const media = (
    <div
      className={cn(
        "relative overflow-hidden bg-product-bg",
        feature ? "aspect-[5/4] lg:col-span-7" : "aspect-[4/5]",
      )}
    >
      <Link href={href} className="absolute inset-0 block" aria-label={product.name} tabIndex={-1}>
        <div
          className={cn(
            "absolute inset-0 transition-[transform,opacity] duration-[900ms] ease-[var(--ease-premium)] group-hover:scale-[1.035]",
            hasAlt && "md:group-hover:opacity-0",
          )}
        >
          <ProductMedia product={product} role="front" priority={priority} sizes={sizes ?? (feature ? "(min-width: 1024px) 56vw, 100vw" : "(min-width: 1024px) 25vw, 50vw")} />
        </div>
        {hasAlt && (
          <div className="absolute inset-0 hidden scale-[1.04] opacity-0 transition-[transform,opacity] duration-[900ms] ease-[var(--ease-premium)] group-hover:scale-100 group-hover:opacity-100 md:block">
            <ProductMedia product={product} role="packaging" sizes={sizes ?? "(min-width: 1024px) 25vw, 50vw"} />
          </div>
        )}
      </Link>

      {/* Product accent: a hairline in the product's own colour */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-product" />

      <div className="pointer-events-none absolute top-3 left-3 flex items-center gap-2">
        {!onSale && <ComingSoonBadge />}
      </div>
      <FavoriteButton productId={product.id} productName={product.name} className="absolute top-2 right-2 bg-paper/70 backdrop-blur" />

      {!feature && (
        <div className="absolute inset-x-3 bottom-4 hidden translate-y-[calc(100%+1.25rem)] transition-transform duration-700 ease-[var(--ease-premium)] group-focus-within:translate-y-0 group-hover:translate-y-0 md:block">
          <AddToCartButton product={product} className="w-full" label="Quick add" />
        </div>
      )}
    </div>
  );

  const meta = (
    <p className="flex items-center gap-2 text-[13px] text-graphite">
      <span aria-hidden className="inline-block size-2.5 shrink-0 bg-product" />
      {product.categoryLabel} · {productSize(product)}
    </p>
  );

  if (feature) {
    return (
      <article style={themeStyle(product.theme)} className={cn("group grid gap-6 lg:grid-cols-12 lg:gap-12", className)}>
        {media}
        <div className="flex flex-col lg:col-span-5 lg:py-2">
          <p className="label text-graphite">MONCRÉ No.{product.number}</p>
          <h2 className="display mt-3 text-[18vw] leading-[0.86] md:text-8xl xl:text-9xl">
            <Link href={href}>{product.type}</Link>
          </h2>
          <div className="mt-4">{meta}</div>
          <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-ink/80">{product.description}</p>
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
          <div className="mt-6 flex items-center gap-3">
            <p className="text-2xl font-bold tabular-nums">{formatMoney(lowestPrice(product))}</p>
            {!onSale && <ComingSoonBadge />}
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:mt-auto lg:pt-8">
            <AddToCartButton product={product} size="lg" className="w-full" />
            <Link
              href={href}
              className="label inline-flex h-14 items-center justify-center border border-ink px-6 transition-colors duration-500 hover:bg-ink hover:text-paper md:h-16"
            >
              Discover {product.type}
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
          <h3 className="display text-2xl leading-none md:text-3xl">
            <Link href={href} className="link-underline">
              {product.name}
            </Link>
          </h3>
          <p className="shrink-0 pt-1 text-[15px] font-bold tabular-nums">
            {multiPrice && <span className="mr-1 text-xs font-normal text-graphite">od</span>}
            {formatMoney(lowestPrice(product))}
          </p>
        </div>
        <div className="mt-2">{meta}</div>
        <div className="mt-auto pt-4 md:hidden">
          <AddToCartButton product={product} size="sm" variant="secondary" className="w-full" />
        </div>
      </div>
    </article>
  );
}
