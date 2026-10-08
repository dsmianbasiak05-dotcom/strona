import type { Product } from "@/lib/commerce/types";
import { productSize } from "@/lib/commerce";
import { RevealLines } from "@/components/ui/reveal";
import { Marquee } from "@/components/brand/marquee";

/**
 * Product-page band in the product's own colours (theme scope set by the
 * page). Same component for every product — the palette changes, the
 * layout does not.
 */
export function ProductBand({ product }: { product: Product }) {
  return (
    <section aria-label={`${product.name} — ${product.tagline}`} className="mt-20 bg-product text-product-secondary md:mt-28">
      <div className="container-x section-y grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="label text-product-secondary/65">MONCRÉ · No.{product.number}</p>
          <RevealLines
            lines={[product.type]}
            className="display mt-4 text-[38vw] leading-[0.8] md:text-[24vw] lg:text-[min(22vw,22rem)]"
          />
        </div>
        <div className="md:col-span-4 md:pb-4">
          <p className="display text-4xl leading-none md:text-5xl">{product.tagline}</p>
          <p className="mt-4 text-[15px] text-product-secondary/75">
            {product.categoryLabel} · {productSize(product)}
          </p>
        </div>
      </div>
      <Marquee
        items={["MONCRÉ", `No.${product.number}`, product.tagline.replace(/\.$/, "")]}
        duration={34}
        className="display border-t border-product-secondary/15 py-4 text-4xl leading-none md:py-5 md:text-6xl"
      />
    </section>
  );
}
