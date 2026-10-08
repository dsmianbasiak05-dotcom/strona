"use client";

import Link from "next/link";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "@/store/cart";
import { useCartDetails } from "@/hooks/use-cart-details";
import { useDialog } from "@/hooks/use-dialog";
import { formatMoney } from "@/lib/format";
import { ButtonLink } from "@/components/ui/button";
import { CartLineItem } from "@/components/products/cart-line-item";

const ease = [0.22, 1, 0.36, 1] as const;

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const { lines, subtotal, count } = useCartDetails();
  const panelRef = useRef<HTMLDivElement>(null);
  useDialog(isOpen, close, panelRef);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70]">
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={close}
            aria-hidden
          />
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Koszyk"
            className="absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col bg-paper shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="flex h-16 items-center justify-between border-b border-ink/10 px-5 md:h-20 md:px-8">
              <p className="display text-3xl">
                Cart <span className="align-top text-base text-graphite">({count})</span>
              </p>
              <button
                type="button"
                onClick={close}
                className="-mr-2 grid size-10 place-items-center rounded-full hover:bg-ink/6"
                aria-label="Zamknij koszyk"
              >
                <X className="size-5" strokeWidth={1.6} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
                <p className="display text-5xl leading-[0.9]">
                  Nothing
                  <br />
                  here yet.
                </p>
                <p className="max-w-[28ch] text-sm text-graphite">Twój koszyk jest pusty. Zacznij od naszych essentials.</p>
                <ButtonLink href="/shop" onClick={close} arrow>
                  Shop products
                </ButtonLink>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-5 md:px-8">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li
                        key={line.variantId}
                        layout
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 24, height: 0 }}
                        transition={{ duration: 0.45, ease }}
                      >
                        <CartLineItem line={line} onNavigate={close} />
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <div className="border-t border-ink/10 px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:px-8 md:pb-8">
                  <div className="flex items-baseline justify-between">
                    <span className="label">Subtotal</span>
                    <span className="text-lg font-bold tabular-nums">{formatMoney(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-graphite">Koszt dostawy: do ustalenia.</p>
                  <div className="mt-5 grid gap-2">
                    <ButtonLink href="/checkout" onClick={close} size="lg" className="w-full" arrow>
                      Checkout
                    </ButtonLink>
                    <Link
                      href="/cart"
                      onClick={close}
                      className="label link-underline mx-auto py-3 text-ink/80"
                    >
                      View cart
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
