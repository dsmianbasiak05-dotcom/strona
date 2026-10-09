import type { Product } from "@/lib/commerce/types";
import { isPurchasable, productPrice, productSize } from "@/lib/commerce";
import { formatMoney } from "@/lib/format";
import { Reveal } from "@/components/ui/reveal";

/**
 * Pack-style warning, after the "ATTENTION!" panel printed on the jar:
 * product navy, cream type, thin rules. A brand joke, not product info —
 * only size · price · status under it, no claims.
 */
export function ProductAttention({ product }: { product: Product }) {
  const size = productSize(product);
  const price = productPrice(product);
  const line = [size, price && formatMoney(price), !isPurchasable(product) && "Coming soon"].filter(Boolean).join(" · ");

  return (
    <section aria-labelledby="attention-title" className="container-x mt-20 md:mt-28">
      <Reveal className="bg-product p-3 text-product-secondary md:p-4">
        <div className="grid gap-6 border border-product-secondary/35 px-5 py-8 md:px-10 md:py-12 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h2 id="attention-title" className="display text-[19vw] leading-[0.85] md:text-[11vw] lg:col-span-7 lg:text-[min(8.5vw,8.5rem)]">
            Attention!
          </h2>
          <div className="lg:col-span-5 lg:pb-2">
            <p lang="en" className="text-2xl leading-snug font-bold md:text-3xl">
              Your hair might turn heads.
            </p>
            {line && (
              <p className="mt-6 border-t border-product-secondary/35 pt-4 text-[13px] font-bold tracking-[0.04em] text-product-secondary/75 tabular-nums">
                {line}
              </p>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
