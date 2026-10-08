"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { AddToCartButton } from "./add-to-cart-button";
import { FavoriteButton } from "./favorite-button";
import { ProductMedia } from "./product-media";
import { WaitlistForm } from "./waitlist-form";
import { ComingSoonBadge } from "./coming-soon-badge";
import { isPurchasable } from "@/lib/commerce";

/**
 * Single-product presentation: large packshot with view switcher on the
 * left, purchase essentials on the right. Used while the catalog has one
 * product (home + shop).
 */
export function ProductSpotlight({
  product,
  headingLevel = "h3",
  priority = false,
}: {
  product: Product;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
}) {
  const [view, setView] = useState(0);
  const variant = product.variants[0];
  const onSale = isPurchasable(product);
  const Heading = headingLevel;
  const views = product.images.slice(0, 4);

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <Link
          href={`/product/${product.slug}`}
          className="group relative block aspect-[5/4] overflow-hidden bg-cream"
          aria-label={product.name}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={view}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-[12%_10%] transition-transform lg:inset-[18%_20%] duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.03]"
            >
              <ProductMedia
                product={product}
                index={view}
                priority={priority && view === 0}
                sizes="(min-width: 1024px) 36vw, 90vw"
              />
            </motion.div>
          </AnimatePresence>
        </Link>
        {views.length > 1 && (
          <div role="tablist" aria-label="Widoki produktu" className="mt-2 grid grid-cols-4 gap-2">
            {views.map((img, i) => (
              <button
                key={img.src}
                type="button"
                role="tab"
                aria-selected={i === view}
                aria-label={img.alt}
                onClick={() => setView(i)}
                className={cn(
                  "relative aspect-[4/3] bg-cream transition-opacity",
                  i === view ? "outline-2 -outline-offset-2 outline-navy-900" : "hover:bg-cream-dark",
                )}
              >
                <span className="absolute inset-[12%]">
                  <ProductMedia product={product} index={i} compact sizes="12vw" />
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:col-span-5 lg:py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="label text-navy-500">MONCRÉ</p>
            <Heading className="display mt-3 text-6xl leading-[0.9] md:text-7xl xl:text-8xl">
              <Link href={`/product/${product.slug}`}>{product.type}</Link>
            </Heading>
            <p className="mt-2 text-[15px] text-navy-500">{product.specs?.find((s) => s.label === "Rodzaj")?.value}</p>
          </div>
          <FavoriteButton productId={product.id} productName={product.name} className="shrink-0 border border-navy-900/15" />
        </div>

        <p className="mt-5 text-lg font-semibold">{product.tagline}</p>
        <p className="mt-2 max-w-[44ch] text-[15px] leading-relaxed text-navy-900/75">{product.description}</p>

        <div className="mt-6 flex items-center gap-4">
          <p className="text-3xl font-bold tabular-nums">{formatMoney(variant.price)}</p>
          {!onSale && <ComingSoonBadge />}
        </div>
        <p className="mt-1 text-xs text-navy-500">Cena brutto (zawiera VAT).</p>

        {onSale ? (
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <AddToCartButton product={product} size="lg" className="w-full" />
            <ButtonLink href={`/product/${product.slug}`} size="lg" variant="secondary" className="w-full">
              Details
            </ButtonLink>
          </div>
        ) : (
          <>
            <WaitlistForm productName={product.name} className="mt-6" />
            <Link href={`/product/${product.slug}`} className="label link-underline mt-5 self-start">
              Product details →
            </Link>
          </>
        )}

        {product.specs && product.specs.length > 0 && (
          <dl className="mt-10 grid grid-cols-2 border-t border-navy-900/15 lg:mt-auto">
            {product.specs.map((spec) => (
              <div key={spec.label} className="border-b border-navy-900/15 py-3 odd:pr-4">
                <dt className="label text-[10px] text-navy-500">{spec.label}</dt>
                <dd className="mt-1 text-[15px] font-semibold">{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
