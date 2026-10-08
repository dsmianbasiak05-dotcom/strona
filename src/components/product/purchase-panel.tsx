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
      <nav aria-label="Breadcrumb" className="label text-[10px] text-navy-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-navy-900">Home</Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href={`/shop?category=${product.category}`} className="hover:text-navy-900">
              {product.category}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-navy-900">
            {product.type}
          </li>
        </ol>
      </nav>

      <div className="mt-5 flex items-start justify-between gap-4">
        <h1 className="display text-[15vw] leading-[0.9] sm:text-7xl xl:text-[5.75rem]">
          <span className="label mb-3 block text-navy-500">MONCRÉ</span>
          {product.name.replace("MONCRÉ ", "")}
        </h1>
        <FavoriteButton productId={product.id} productName={product.name} className="mt-1 shrink-0 border border-navy-900/15" />
      </div>

      {product.specs?.find((sp) => sp.label === "Rodzaj") && (
        <p className="mt-3 text-[15px] text-navy-500">{product.specs.find((sp) => sp.label === "Rodzaj")?.value}</p>
      )}
      <p className="mt-5 text-lg font-semibold">{product.tagline}</p>
      <p className="mt-2 max-w-[48ch] text-[15px] leading-relaxed text-navy-900/75">{product.description}</p>

      <div className="mt-6 flex items-center gap-4">
        <p className="text-2xl font-bold tabular-nums" aria-live="polite">
          {formatMoney(variant.price)}
        </p>
        {!onSale && <ComingSoonBadge />}
      </div>
      <p className="mt-1 text-xs text-navy-500">Cena brutto (zawiera VAT).</p>

      {product.specs && product.specs.length > 0 && (
        <dl className="mt-7 grid grid-cols-2 border-t border-navy-900/15">
          {product.specs.map((spec) => (
            <div key={spec.label} className="border-b border-navy-900/15 py-3 odd:pr-4">
              <dt className="label text-[10px] text-navy-500">{spec.label}</dt>
              <dd className="mt-1 text-[15px] font-semibold">{spec.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {product.variants.length > 1 && (
        <fieldset className="mt-7">
          <legend className="label mb-3">Size</legend>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <label
                key={v.id}
                className={cn(
                  "label flex h-12 min-w-20 cursor-pointer items-center justify-center border px-5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2",
                  v.id === variantId ? "border-navy-900 bg-navy-900 text-cream" : "border-navy-900/20 hover:border-navy-900",
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
            Buy now
          </Button>
        </div>
      ) : (
        <div ref={ctaRef} className="mt-7 bg-cream p-5 md:p-6">
          <p className="display text-4xl leading-none md:text-5xl">Coming soon.</p>
          <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-navy-900/80">
            {product.name} nie jest jeszcze dostępny w sprzedaży. Zapisz się na listę — damy znać jako pierwszym.
          </p>
          <WaitlistForm id="waitlist" productName={product.name} className="mt-5" />
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
                    title: "Product details",
                    content: (
                      <ul className="list-inside list-disc space-y-1">
                        {product.details.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    ),
                  },
                ]),
            {
              title: "How to use",
              content: (
                <ol className="space-y-2">
                  {product.howToUse.map((step, i) => (
                    <li key={step} className="flex gap-3">
                      <span className="label pt-1 text-navy-500 tabular-nums">0{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              ),
            },
            {
              title: "Ingredients",
              content: product.ingredients ?? (
                <p>Pełny skład (INCI) zostanie uzupełniony przed startem sprzedaży.</p>
              ),
            },
            {
              title: "Shipping",
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
            className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-900/10 bg-paper/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{product.name.replace("MONCRÉ ", "")}</p>
                <p className="text-sm text-navy-500 tabular-nums">
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
