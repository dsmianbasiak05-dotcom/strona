import Image from "next/image";
import type { Product } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";
import { ProductVisual } from "./product-visual";

/**
 * Single entry point for product imagery.
 * Uses real photography when `product.images` is populated, otherwise
 * the illustrated packaging placeholder.
 */
export function ProductMedia({
  product,
  index = 0,
  view = "front",
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority = false,
  className,
}: {
  product: Product;
  index?: number;
  view?: "front" | "detail";
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const image = product.images[view === "detail" ? index + 1 : index] ?? product.images[index];

  if (image) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <ProductVisual
      shape={product.packaging}
      label={product.type.split("—")[0].trim()}
      size={product.variants[0]?.title}
      view={view}
      className={className}
    />
  );
}
