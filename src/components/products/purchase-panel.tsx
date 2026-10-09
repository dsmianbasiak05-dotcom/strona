"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/commerce/types";
import { useCart, CART_MAX_QTY } from "@/store/cart";
import { formatMoney } from "@/lib/format";
import { SHIPPING_TBA } from "@/config/site";
import { isPurchasable } from "@/lib/commerce";
import { WaitlistForm } from "./waitlist-form";
import { ComingSoonBadge } from "./coming-soon-badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { AddToCartButton } from "./add-to-cart-button";
import { FavoriteButton } from "./favorite-button";
import { Accordion } from "./accordion";

export function PurchasePanel({ product }: { product: Product }) {
  const router = useRouter();
  const add = useCart((s) => s.add);
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const onSale = isPurchasable(product);

  // Show the mobile sticky bar once the main CTA scrolls out of view.
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const buyNow = () => {
    add(product.id, variant.id, quantity);
    router.push("/checkout");
  };

  return (
    <div className="lg:sticky lg:top-24">
      <nav aria-label="Ścieżka nawigacji" className="label text-[10px] text-graphite">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-ink">Strona główna</Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href={`/shop?category=${product.category}`} className="hover:text-ink">
              {product.categoryLabel}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-ink">
            {product.type}
          </li>
        </ol>
      </nav>

      <div className="mt-5 flex items-start justify-between gap-4">
        <h1 className="display text-[15vw] leading-[0.9] sm:text-7xl xl:text-[5.75rem]">
          <span className="label mb-3 block text-graphite">MONCRÉ</span>
          {product.name.replace("MONCRÉ ", "")}
        </h1>
        <FavoriteButton productId={product.id} productName={product.name} className="mt-1 shrink-0 border border-ink/15" />
      </div>

      {/* Brand copy; the facts (type, effect, hold…) live in the specs grid below. */}
      <p className="display mt-6 text-4xl leading-[0.9] md:text-5xl">{product.tagline}</p>
      {product.lead && <p className="mt-3 text-lg font-semibold">{product.lead}</p>}
      <p className="mt-2 max-w-[48ch] text-[15px] leading-relaxed text-ink/75">{product.description}</p>

      <div className="mt-6 flex items-center gap-4">
        <p className="text-2xl font-bold tabular-nums" aria-live="polite">
          {formatMoney(variant.price)}
        </p>
        {!onSale && <ComingSoonBadge />}
      </div>
      <p className="mt-1 text-xs text-graphite">Cena brutto (zawiera VAT).</p>

      {product.specs && product.specs.length > 0 && (
        <dl className="mt-7 grid grid-cols-2 border-t border-ink/15">
          {product.specs.map((spec) => (
            <div key={spec.label} className="border-b border-ink/15 py-3 odd:pr-4">
              <dt className="label text-[10px] text-graphite">{spec.label}</dt>
              <dd className="mt-1 text-[15px] font-semibold">{spec.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {product.variants.length > 1 && (
        <fieldset className="mt-7">
          <legend className="label mb-3">Wariant</legend>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <label
                key={v.id}
                className={cn(
                  "label flex h-12 min-w-20 cursor-pointer items-center justify-center border px-5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2",
                  v.id === variantId ? "border-ink bg-ink text-bone" : "border-ink/20 hover:border-ink",
                  !v.available && "pointer-events-none opacity-40 line-through",
                )}
              >
                <input
                  type="radio"
                  name="variant"
                  value={v.id}
                  checked={v.id === variantId}
                  onChange={() => setVariantId(v.id)}
                  disabled={!v.available}
                  className="sr-only"
                />
                {v.title}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {onSale ? (
        <div ref={ctaRef} className="mt-7 grid grid-cols-[auto_1fr] gap-2">
          <QuantityStepper value={quantity} onChange={setQuantity} max={CART_MAX_QTY} label="Ilość" />
          <AddToCartButton product={product} variantId={variant.id} quantity={quantity} className="h-12 w-full" />
          <Button variant="secondary" className="col-span-2 h-12 w-full" onClick={buyNow} disabled={!variant.available}>
            Kup teraz
          </Button>
        </div>
      ) : (
        <div ref={ctaRef} className="mt-7 bg-product p-5 text-product-secondary md:p-6">
          <p className="display text-4xl leading-none md:text-5xl">Coming soon.</p>
          <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-product-secondary/80">
            Bądź na liście. Dowiedz się o premierze jako pierwszy.
          </p>
          <WaitlistForm id="waitlist" productName={product.name} tone="product" className="mt-5" />
        </div>
      )}

      <div className="mt-10">
        <Accordion
          items={[
            // Specs grid above already lists the product facts; avoid repeating them.
            ...(product.specs?.length
              ? []
              : [
            {
                    title: "Szczegóły produktu",
                    content: (
                      <ul className="list-inside list-disc space-y-1">
                        {product.details.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    ),
                  },
                ]),
            // Only shown once the brand provides usage instructions.
            ...(product.howToUse.length
              ? [
                  {
                    title: "Sposób użycia",
                    content: (
                      <ol className="space-y-2">
                        {product.howToUse.map((step, i) => (
                          <li key={step} className="flex gap-3">
                            <span className="label pt-1 text-graphite tabular-nums">0{i + 1}</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    ),
                  },
                ]
              : []),
            {
              title: "Skład",
              content: product.ingredients ?? (
                <p>Informacja w przygotowaniu.</p>
              ),
            },
            {
              title: "Dostawa",
              content: <p>{SHIPPING_TBA}</p>,
            },
          ]}
        />
      </div>

      {/* Mobile sticky purchase bar */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{product.name.replace("MONCRÉ ", "")}</p>
                <p className="text-sm text-graphite tabular-nums">
                  {product.variants.length > 1 && `${variant.title} · `}
                  {formatMoney(variant.price)}
                </p>
              </div>
              <AddToCartButton product={product} variantId={variant.id} quantity={quantity} className="h-12 px-6" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
