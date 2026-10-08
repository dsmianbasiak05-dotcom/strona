"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCartDetails } from "@/hooks/use-cart-details";
import { ButtonLink } from "@/components/ui/button";
import { CartLineItem } from "@/components/product/cart-line-item";
import { PageIntro } from "@/components/ui/page-intro";
import { SummaryRows } from "./order-summary";

export function CartView() {
  const { lines, subtotal, count, mounted } = useCartDetails();

  return (
    <>
      <PageIntro size="sm" eyebrow={mounted ? `${count} items` : "Your bag"} lines={["Your cart"]} />
      <div className="container-x pb-24 md:pb-32">
        {mounted && lines.length === 0 ? (
          <div className="border-t border-navy-900/15 py-20 text-center">
            <p className="display text-6xl md:text-8xl">Nothing here yet.</p>
            <p className="mt-4 text-navy-500">Twój koszyk jest pusty.</p>
            <ButtonLink href="/shop" size="lg" className="mt-8" arrow>
              Shop products
            </ButtonLink>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <ul className="divide-y divide-navy-900/15 self-start border-y border-navy-900/15 lg:col-span-8">
              <AnimatePresence initial={false}>
                {lines.map((line) => (
                  <motion.li key={line.variantId} layout exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4 }}>
                    <CartLineItem line={line} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            <aside className="lg:col-span-4">
              <div className="bg-cream p-6 md:p-8 lg:sticky lg:top-24">
                <h2 className="display text-4xl">Summary</h2>
                <div className="mt-8">
                  <SummaryRows subtotal={subtotal} shipping={null} />
                </div>
                <ButtonLink href="/checkout" size="lg" className="mt-8 w-full" arrow>
                  Checkout
                </ButtonLink>
              </div>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
