"use client";

import { useState } from "react";
import type { ImageRole, Product } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";
import { InsetRender, ProductMedia } from "./product-media";

/** Gallery sequence by image job. Roles a product lacks are skipped. */
const ORDER: ImageRole[] = ["front", "packaging", "back", "set"];

/**
 * Desktop: editorial grid — lead image wide, details in pairs, the
 * landscape set render full width. Mobile: swipeable 4:3 carousel.
 * The lead render is inset (77.5% of the frame width, edges feathered into
 * the studio surface) so the whole jar — lid to base — has air.
 * Frame surface comes from the product theme (`bg-product-bg`).
 */
export function ProductGallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const frames = ORDER.filter((role) => product.images.some((img) => img.role === role));
  const list: (ImageRole | null)[] = frames.length ? frames : [null];

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
        {list.map((role, i) => {
          const wide = i === 0 || role === "set";
          return (
            <li
              key={role ?? "placeholder"}
              className={cn(
                "relative aspect-[4/3] w-full shrink-0 snap-center overflow-hidden bg-product-bg",
                wide && "lg:col-span-2",
                i === 0 && "lg:aspect-[16/10]",
                role === "set" && "lg:aspect-[16/9]",
              )}
            >
              {i === 0 && role ? (
                <InsetRender
                  product={product}
                  role={role}
                  scale={0.775}
                  priority
                  sizes="(min-width: 1024px) 45vw, 78vw"
                  className="lg:-translate-y-[52%]"
                />
              ) : (
                <ProductMedia
                  product={product}
                  role={role ?? "front"}
                  priority={i === 0}
                  sizes={wide ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 29vw, 100vw"}
                />
              )}
            </li>
          );
        })}
      </ul>

      {list.length > 1 && (
        <div className="container-x mt-3 flex items-center justify-between lg:hidden">
          <div className="flex gap-1.5" aria-hidden>
            {list.map((role, i) => (
              <span key={role} className={cn("h-[2px] w-6 transition-colors", i === index ? "bg-ink" : "bg-ink/20")} />
            ))}
          </div>
          <span className="label text-graphite tabular-nums">
            {index + 1} / {list.length}
          </span>
        </div>
      )}
    </div>
  );
}
