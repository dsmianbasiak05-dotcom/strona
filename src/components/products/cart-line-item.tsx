"use client";

import Link from "next/link";
import type { Product, ProductVariant } from "@/lib/commerce/types";
import { useCart, CART_MAX_QTY } from "@/store/cart";
import { formatMoney } from "@/lib/format";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { ProductMedia } from "./product-media";
import { themeStyle } from "@/lib/theme";

export interface ResolvedLine {
  variantId: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
  total: number;
}

export function CartLineItem({ line, onNavigate }: { line: ResolvedLine; onNavigate?: () => void }) {
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);

  return (
    <div className="flex gap-4 py-5">
      <Link
        href={`/product/${line.product.slug}`}
        onClick={onNavigate}
        style={themeStyle(line.product.theme)}
        className="relative aspect-square w-24 shrink-0 overflow-hidden bg-product-bg md:w-28"
        tabIndex={-1}
        aria-hidden
      >
        <div className="absolute inset-0">
          <ProductMedia product={line.product} compact sizes="112px" />
        </div>
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/product/${line.product.slug}`}
              onClick={onNavigate}
              className="link-underline text-[15px] leading-snug font-bold"
            >
              {line.product.name.replace("MONCRÉ ", "")}
            </Link>
            <p className="mt-0.5 text-[13px] text-graphite tabular-nums">
              {line.product.variants.length > 1 ? `${line.variant.title} · ` : ""}
              {formatMoney(line.variant.price)} / szt.
            </p>
          </div>
          <p className="shrink-0 text-[15px] font-semibold tabular-nums">{formatMoney(line.total)}</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantityStepper
            size="sm"
            value={line.quantity}
            min={1}
            max={CART_MAX_QTY}
            onChange={(q) => setQuantity(line.variantId, q)}
            label={`Ilość: ${line.product.name}`}
          />
          <button
            type="button"
            onClick={() => remove(line.variantId)}
            className="label link-underline py-2 text-[10px] text-graphite hover:text-ink"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
