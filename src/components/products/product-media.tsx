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

/**
 * Studio surface of the square renders as a function of the rendered image
 * width (in cqw). Stops follow the render's own vignette — measured from
 * the official files, radius in source px of a 2000 px render — so the
 * surface continues past the image edges without a seam.
 */
const VIGNETTE: [number, string][] = [
  [700, "rgb(238 237 233)"],
  [850, "rgb(228 228 224)"],
  [1000, "rgb(222 221 217)"],
  [1150, "rgb(218 217 214)"],
  [1300, "rgb(211 210 206)"],
  [1410, "rgb(207 206 202)"],
  [1800, "rgb(198 197 193)"],
];

function studioSurface(imageCqw: number) {
  const stops = VIGNETTE.map(([r, color]) => `${color} ${((r / 2000) * imageCqw).toFixed(1)}cqw`);
  return `radial-gradient(circle at 50% 50%, ${stops.join(", ")})`;
}

/** Edges feathered on all four sides; the pack stays inside the opaque core. */
const FEATHER =
  "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)";

/**
 * A square render shown whole and smaller than its frame: the image sits
 * centred at `scale` × frame width, its edges feathered into the studio
 * surface. Fill the frame (`absolute inset-0`); no crop, no distortion.
 */
export function InsetRender({
  product,
  role = "front",
  scale,
  sizes,
  priority = false,
  className,
}: {
  product: Product;
  role?: ImageRole;
  /** Image width as a fraction of the frame width. */
  scale: number;
  sizes?: string;
  priority?: boolean;
  /** Extra classes for the image box (e.g. a vertical offset). */
  className?: string;
}) {
  if (!productImage(product, role)) return <ProductMedia product={product} role={role} sizes={sizes} />;
  const width = scale * 100;
  return (
    <div className="absolute inset-0" style={{ containerType: "inline-size" }}>
      <div aria-hidden className="absolute inset-0" style={{ backgroundImage: studioSurface(width) }} />
      <div
        className={cn("absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2", className)}
        style={{ width: `${width}%`, maskImage: FEATHER, maskComposite: "intersect" }}
      >
        <ProductMedia product={product} role={role} sizes={sizes} priority={priority} />
      </div>
    </div>
  );
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
