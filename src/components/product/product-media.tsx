import Image from "next/image";
import type { Product } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";

/**
 * Single entry point for product imagery.
 *
 * Real packshots are transparent PNGs cut from the official renders, so
 * they sit on any brand surface. They are always rendered with
 * `object-contain` — never cropped or stretched — plus a soft contact
 * shadow replacing the studio floor.
 *
 * Products without photography get a neutral typographic tile. We never
 * draw an invented pack.
 */
export function ProductMedia({
  product,
  index = 0,
  view = "front",
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority = false,
  className,
  tone = "light",
  compact = false,
}: {
  product: Product;
  index?: number;
  /** Small thumbnails (menus, cart): placeholder shows the name only. */
  compact?: boolean;
  /** "alt" = second image (used for hover swap). */
  view?: "front" | "alt";
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Surface the media sits on — tunes shadow and placeholder colours. */
  tone?: "light" | "dark";
}) {
  const image = product.images[view === "alt" ? index + 1 : index] ?? (view === "alt" ? undefined : product.images[0]);

  if (image) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        loading={priority ? "eager" : undefined}
        fetchPriority={priority ? "high" : undefined}
        className={cn(
          "object-contain",
          tone === "light"
            ? "drop-shadow-[0_22px_22px_rgba(23,25,54,0.22)]"
            : "drop-shadow-[0_28px_28px_rgba(0,0,0,0.45)]",
          className,
        )}
      />
    );
  }

  return <PackshotPlaceholder product={product} tone={tone} compact={compact} className={className} />;
}

export function hasPhoto(product: Product) {
  return product.images.length > 0;
}

/** Honest stand-in until the brand delivers a packshot. */
export function PackshotPlaceholder({
  product,
  tone = "light",
  compact = false,
  className,
}: {
  product: Product;
  tone?: "light" | "dark";
  compact?: boolean;
  className?: string;
}) {
  if (compact) {
    return (
      <div
        role="img"
        aria-label={`${product.name} — zdjęcie produktu wkrótce`}
        className={cn(
          "absolute inset-0 grid place-items-center p-1 text-center",
          tone === "light" ? "text-navy-900/70" : "text-cream/70",
          className,
        )}
      >
        <span className="display text-[13px] leading-[0.95]">{product.type.replace("Set — ", "")}</span>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${product.name} — zdjęcie produktu wkrótce`}
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-3 border text-center",
        tone === "light" ? "border-navy-900/10 text-navy-900" : "border-cream/15 text-cream",
        className,
      )}
    >
      <span className={cn("label text-[9px]", tone === "light" ? "text-navy-500" : "text-cream/50")}>MONCRÉ</span>
      <span className="display px-3 text-[clamp(1.4rem,3.4vw,2.75rem)] leading-[0.9]">
        {product.type.replace("Set — ", "Set\n").split("\n").map((l, i) => (
          <span key={i} className="block">
            {l}
          </span>
        ))}
      </span>
      <span className={cn("label text-[9px]", tone === "light" ? "text-navy-500" : "text-cream/50")}>
        Packshot coming soon
      </span>
    </div>
  );
}
