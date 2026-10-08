import Image from "next/image";
import type { Product } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";
import { products as catalog } from "@/data/products";
import { ProductVisual, type SetItem } from "./product-visual";

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
  shadow,
}: {
  product: Product;
  index?: number;
  view?: "front" | "detail";
  sizes?: string;
  priority?: boolean;
  className?: string;
  shadow?: boolean;
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

  const items: SetItem[] | undefined = product.includes
    ?.map((slug) => catalog.find((p) => p.slug === slug))
    .filter((p) => p !== undefined && p.packaging !== "set")
    .map((p) => ({ shape: p!.packaging as SetItem["shape"], label: p!.type, size: p!.variants[0]?.title }));

  return (
    <ProductVisual
      items={items}
      shape={product.packaging}
      label={product.type.split("—")[0].trim()}
      size={product.variants[0]?.title}
      view={view}
      shadow={shadow}
      className={className}
    />
  );
}
