"use client";

import { useMemo } from "react";
import { getProductById } from "@/lib/commerce";
import { useCart } from "@/store/cart";
import { useMounted } from "./use-mounted";
import { siteConfig } from "@/config/site";

/** Resolves cart lines against the catalog and computes totals. */
export function useCartDetails() {
  const mounted = useMounted();
  const rawLines = useCart((s) => s.lines);

  return useMemo(() => {
    const lines = (mounted ? rawLines : [])
      .map((line) => {
        const product = getProductById(line.productId);
        const variant = product?.variants.find((v) => v.id === line.variantId);
        if (!product || !variant) return null;
        return { ...line, product, variant, total: variant.price.amount * line.quantity };
      })
      .filter((l): l is NonNullable<typeof l> => l !== null);

    const subtotal = lines.reduce((sum, l) => sum + l.total, 0);
    const count = lines.reduce((sum, l) => sum + l.quantity, 0);
    const freeShippingRemaining = Math.max(0, siteConfig.shipping.freeThreshold - subtotal);

    return { lines, subtotal, count, freeShippingRemaining, mounted };
  }, [rawLines, mounted]);
}
