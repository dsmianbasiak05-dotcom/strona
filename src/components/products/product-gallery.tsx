"use client";

import { useState } from "react";
import type { ImageRole, Product } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";
import { ProductMedia } from "./product-media";

/** Gallery sequence by image job. Roles a product lacks are skipped. */
const ORDER: ImageRole[] = ["front", "packaging", "back", "set"];

/**
 * Studio surface of the square renders, continued past the image edges so
 * the lead render can sit smaller than its frame without a visible seam.
 * Stops follow the render's own vignette (image = 77.5cqw wide).
 */
const STUDIO =
  "radial-gradient(circle at 50% 50%, rgb(238 237 233) 27cqw, rgb(228 228 224) 33cqw, rgb(222 221 217) 38.8cqw, rgb(218 217 214) 44.6cqw, rgb(211 210 206) 50.4cqw, rgb(207 206 202) 54.6cqw, rgb(198 197 193) 70cqw)";

/**
 * Desktop: editorial grid — lead image wide, details in pairs, the
 * landscape set render full width. Mobile: swipeable 4:3 carousel.
 * The lead render is inset (77.5% of the frame width, side edges feathered
 * into the studio surface) so the whole jar — lid to base — has air.
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
          const inset = i === 0 && role !== null;
          const media = (
            <ProductMedia
              product={product}
              role={role ?? "front"}
              priority={i === 0}
              sizes={
                inset
                  ? "(min-width: 1024px) 45vw, 78vw"
                  : wide
                    ? "(min-width: 1024px) 58vw, 100vw"
                    : "(min-width: 1024px) 29vw, 100vw"
              }
            />
          );
          return (
            <li
              key={role ?? "placeholder"}
              className={cn(
                "relative aspect-[4/3] w-full shrink-0 snap-center overflow-hidden bg-product-bg",
                wide && "lg:col-span-2",
                i === 0 && "lg:aspect-[16/10]",
                role === "set" && "lg:aspect-[16/9]",
              )}
              style={inset ? { containerType: "inline-size" } : undefined}
            >
              {inset ? (
                <>
                  <div aria-hidden className="absolute inset-0" style={{ backgroundImage: STUDIO }} />
                  <div className="absolute top-1/2 left-1/2 aspect-square w-[77.5%] -translate-x-1/2 -translate-y-1/2 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)] lg:-translate-y-[52%]">
                    {media}
                  </div>
                </>
              ) : (
                media
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
