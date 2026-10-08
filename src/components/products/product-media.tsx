import Image from "next/image";
import type { ImageRole, Product } from "@/lib/commerce/types";
import { productImage } from "@/lib/commerce";
import { cn } from "@/lib/utils";

/**
 * Single entry point for product imagery.
 *
 * Images are official renders on a studio surface; they fill their frame
 * (`object-cover`) and are framed by each image's `focus`, so the pack is
 * never cut or distorted. Wrap in a frame with `bg-product-bg` so the
 * surface matches the render while it loads.
 *
 * Products without photography get a neutral typographic tile — never an
 * invented pack.
 */
export function ProductMedia({
  product,
  role = "front",
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority = false,
  className,
  compact = false,
}: {
  product: Product;
  role?: ImageRole;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Small thumbnails (menus, cart): placeholder shows the name only. */
  compact?: boolean;
}) {
  const image = productImage(product, role);

  if (image) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        quality={85}
        loading={priority ? "eager" : undefined}
        fetchPriority={priority ? "high" : undefined}
        className={cn("object-cover", className)}
        style={{ objectPosition: image.focus ?? "50% 50%" }}
      />
    );
  }

  return <PackshotPlaceholder product={product} compact={compact} className={className} />;
}

/** Honest stand-in until the brand delivers imagery. */
export function PackshotPlaceholder({
  product,
  compact = false,
  className,
}: {
  product: Product;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${product.name} — zdjęcie produktu wkrótce`}
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-product-bg text-center text-ink",
        className,
      )}
    >
      <span className={cn("display leading-[0.9]", compact ? "text-[13px]" : "text-[clamp(1.6rem,4vw,3rem)]")}>
        {product.type}
      </span>
      {!compact && <span className="label text-[10px] text-graphite">Zdjęcie wkrótce</span>}
    </div>
  );
}
