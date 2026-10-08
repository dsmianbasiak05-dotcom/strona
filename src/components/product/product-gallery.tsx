"use client";

import { useRef, useState } from "react";
import type { Product } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";
import { ProductMedia } from "./product-media";
import { ProductVisual } from "./product-visual";

/**
 * Desktop: vertical editorial stack. Mobile: swipeable snap carousel.
 * Frames are placeholders until `product.images` is filled.
 */
export function ProductGallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const railRef = useRef<HTMLUListElement>(null);

  const frames = [
    { key: "front", bg: "bg-cream", node: <ProductMedia product={product} priority sizes="(min-width: 1024px) 58vw, 100vw" /> },
    { key: "detail", bg: "bg-stone", node: <ProductMedia product={product} view="detail" sizes="(min-width: 1024px) 58vw, 100vw" /> },
    {
      key: "campaign",
      bg: "bg-navy-900 grain grain-light",
      node: (
        <div className="relative h-full w-full">
          <div className="absolute top-1/2 left-1/2 aspect-square w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-800" />
          <ProductVisual
            shape={product.packaging}
            label={product.type.split("—")[0].trim()}
            size={product.variants[0]?.title}
            shadow={false}
            className="relative drop-shadow-[0_40px_40px_rgba(0,0,0,0.4)]"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <ul
        ref={railRef}
        aria-label="Galeria produktu"
        onScroll={(e) => {
          const el = e.currentTarget;
          setIndex(Math.round(el.scrollLeft / el.clientWidth));
        }}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto lg:grid lg:snap-none lg:grid-cols-2 lg:gap-3 lg:overflow-visible"
      >
        {frames.map((f, i) => (
          <li
            key={f.key}
            className={cn(
              "relative aspect-[4/5] w-full shrink-0 snap-center overflow-hidden",
              f.bg,
              i === 0 && "lg:col-span-2 lg:aspect-[5/4]",
            )}
          >
            <div className={cn("absolute inset-0", i === 0 ? "p-[6%] lg:p-[8%]" : "p-[6%]")}>{f.node}</div>
          </li>
        ))}
      </ul>

      {/* Mobile pager */}
      <div className="container-x mt-3 flex items-center justify-between lg:hidden">
        <div className="flex gap-1.5" aria-hidden>
          {frames.map((f, i) => (
            <span
              key={f.key}
              className={cn("h-[2px] w-6 transition-colors", i === index ? "bg-navy-900" : "bg-navy-900/20")}
            />
          ))}
        </div>
        <span className="label text-navy-500 tabular-nums">
          {index + 1} / {frames.length}
        </span>
      </div>
    </div>
  );
}
