"use client";

import { useState } from "react";
import type { Product } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";
import { ProductMedia } from "./product-media";

/**
 * Desktop: editorial grid (first view large). Mobile: swipeable carousel.
 * Every frame uses the same cream surface so the official packshots read
 * as one consistent shoot.
 */
export function ProductGallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const count = Math.max(1, product.images.length);
  const frames = Array.from({ length: count }, (_, i) => i);

  return (
    <div>
      <ul
        aria-label="Galeria produktu"
        onScroll={(e) => {
          const el = e.currentTarget;
          setIndex(Math.round(el.scrollLeft / el.clientWidth));
        }}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto lg:grid lg:snap-none lg:grid-cols-2 lg:gap-3 lg:overflow-visible"
      >
        {frames.map((i) => (
          <li
            key={i}
            className={cn(
              "relative aspect-square w-full shrink-0 snap-center overflow-hidden bg-cream",
              i === 0 && "lg:col-span-2 lg:aspect-[16/11]",
              count % 2 === 0 && i === count - 1 && "lg:col-span-2 lg:aspect-[16/9]",
            )}
          >
            <div className={cn("absolute", i === 0 ? "inset-[10%_8%] lg:inset-[12%_14%]" : "inset-[12%_10%]")}>
              <ProductMedia
                product={product}
                index={i}
                priority={i === 0}
                sizes={i === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 29vw, 100vw"}
              />
            </div>
          </li>
        ))}
      </ul>

      {count > 1 && (
        <div className="container-x mt-3 flex items-center justify-between lg:hidden">
          <div className="flex gap-1.5" aria-hidden>
            {frames.map((i) => (
              <span key={i} className={cn("h-[2px] w-6 transition-colors", i === index ? "bg-navy-900" : "bg-navy-900/20")} />
            ))}
          </div>
          <span className="label text-navy-500 tabular-nums">
            {index + 1} / {count}
          </span>
        </div>
      )}
    </div>
  );
}
