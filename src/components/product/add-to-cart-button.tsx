"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
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
  label = "Add to cart",
}: Props) {
  const add = useCart((s) => s.add);
  const open = useCart((s) => s.open);
  const [added, setAdded] = useState(false);
  const variantToAdd = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const available = variantToAdd?.available ?? false;

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
            {!available ? "Sold out" : added ? "Added ✓" : label}
          </motion.span>
        </AnimatePresence>
      </span>
    </Button>
  );
}
