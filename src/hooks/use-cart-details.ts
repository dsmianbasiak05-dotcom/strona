"use client";

import { useMemo } from "react";
import { getProductById, isPurchasable } from "@/lib/commerce";
import { useCart } from "@/store/cart";
import { useMounted } from "./use-mounted";

/** Resolves cart lines against the catalog and computes totals. */
export function useCartDetails() {
  const mounted = useMounted();
  const rawLines = useCart((s) => s.lines);

  return useMemo(() => {
    const lines = (mounted ? rawLines : [])
      .map((line) => {
        const product = getProductById(line.productId);
        const variant = product?.variants.find((v) => v.id === line.variantId);
        // Drop anything that is not (or no longer) on sale.
        if (!product || !variant || !isPurchasable(product) || !variant.available) return null;
        return { ...line, product, variant, total: variant.price.amount * line.quantity };
      })
      .filter((l): l is NonNullable<typeof l> => l !== null);

    const subtotal = lines.reduce((sum, l) => sum + l.total, 0);
    const count = lines.reduce((sum, l) => sum + l.quantity, 0);
    return { lines, subtotal, count, mounted };
  }, [rawLines, mounted]);
}
