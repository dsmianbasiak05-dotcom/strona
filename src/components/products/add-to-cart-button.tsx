"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/store/cart";
import { Button, ButtonLink } from "@/components/ui/button";
import { isPurchasable } from "@/lib/commerce";
import type { Product } from "@/lib/commerce/types";

interface Props {
  product: Product;
  variantId?: string;
  quantity?: number;
  openDrawer?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "light";
  label?: string;
}

export function AddToCartButton({
  product,
  variantId,
  quantity = 1,
  openDrawer = true,
  className,
  size = "md",
  variant = "primary",
  label = "Dodaj do koszyka",
}: Props) {
  const add = useCart((s) => s.add);
  const open = useCart((s) => s.open);
  const [added, setAdded] = useState(false);
  const variantToAdd = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const available = variantToAdd?.available ?? false;

  // Demo/concept entries have no purchase or waitlist action at all.
  if (product.demo) return null;

  // Not on sale yet: every "add" entry point becomes a waitlist CTA.
  if (!isPurchasable(product)) {
    return (
      <ButtonLink
        href={`/product/${product.slug}#waitlist`}
        size={size}
        variant={variant}
        className={className}
        onClick={(e) => e.stopPropagation()}
      >
        Zapisz się na listę
      </ButtonLink>
    );
  }

  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      className={className}
      disabled={!available}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!variantToAdd) return;
        add(product.id, variantToAdd.id, quantity);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
        if (openDrawer) open();
      }}
    >
      <span className="relative block overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={added ? "added" : "idle"}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {!available ? "Wyprzedane" : added ? "Dodano ✓" : label}
          </motion.span>
        </AnimatePresence>
      </span>
    </Button>
  );
}
