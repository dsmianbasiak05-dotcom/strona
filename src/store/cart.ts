"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartLine } from "@/lib/commerce/types";

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  /** Incremented on every add — drives the cart icon micro-animation. */
  pulse: number;
  add: (productId: string, variantId: string, quantity?: number) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  remove: (variantId: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

const MAX_QTY = 10;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      pulse: 0,
      add: (productId, variantId, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((l) => l.variantId === variantId);
          const lines = existing
            ? state.lines.map((l) =>
                l.variantId === variantId
                  ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + quantity) }
                  : l,
              )
            : [...state.lines, { productId, variantId, quantity: Math.min(MAX_QTY, quantity) }];
          return { lines, pulse: state.pulse + 1 };
        }),
      setQuantity: (variantId, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => l.variantId !== variantId)
              : state.lines.map((l) =>
                  l.variantId === variantId ? { ...l, quantity: Math.min(MAX_QTY, quantity) } : l,
                ),
        })),
      remove: (variantId) =>
        set((state) => ({ lines: state.lines.filter((l) => l.variantId !== variantId) })),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: "moncre-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
);

export const CART_MAX_QTY = MAX_QTY;
