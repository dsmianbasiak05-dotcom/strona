import type { CSSProperties } from "react";
import type { Product } from "@/lib/commerce/types";
import { productSize } from "@/lib/commerce";
import { RevealLines } from "@/components/ui/reveal";
import { Marquee } from "@/components/brand/marquee";

/**
 * Product-page band in the product's own colours (theme scope set by the
 * page). Same component for every product — the palette changes, the
 * layout does not. The name is sized from its longest word so any future
 * product name fits (Anton ≈ 0.5em per glyph).
 */
export function ProductBand({ product }: { product: Product }) {
  const words = product.type.split(" ");
  const longest = Math.max(...words.map((w) => w.length));
  const fit = {
    "--band-sm": `min(38vw, ${(184 / longest).toFixed(1)}vw)`,
    "--band-md": `min(24vw, ${(118 / longest).toFixed(1)}vw)`,
    "--band-lg": `min(22rem, ${(112 / longest).toFixed(1)}vw)`,
  } as CSSProperties;
  const marker = product.demo ? "Demo" : `No.${product.number}`;
  const size = productSize(product);

  return (
    <section aria-label={`${product.name} — ${product.tagline}`} className="mt-20 bg-product text-product-secondary md:mt-28">
      <div className="container-x section-y grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8" style={fit}>
          <p className="label text-product-secondary/65">MONCRÉ · {marker}</p>
          <RevealLines
            lines={words}
            className="display mt-4 text-[length:var(--band-sm)] leading-[0.8] md:text-[length:var(--band-md)] lg:text-[length:var(--band-lg)]"
          />
        </div>
        <div className="md:col-span-4 md:pb-4">
          <p className="display text-4xl leading-none md:text-5xl">{product.tagline}</p>
          <p className="mt-4 text-[15px] text-product-secondary/75">
            {product.categoryLabel}
            {size && <> · {size}</>}
          </p>
        </div>
      </div>
      <Marquee
        items={["MONCRÉ", marker, product.tagline.replace(/\.$/, "")]}
        duration={34}
        className="display border-t border-product-secondary/15 py-4 text-4xl leading-none md:py-5 md:text-6xl"
      />
    </section>
  );
}
