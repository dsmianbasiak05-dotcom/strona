import type { Product } from "@/lib/commerce/types";
import { themeStyle } from "@/lib/theme";
import { Reveal } from "@/components/ui/reveal";

/**
 * The supporting line, printed on every pack, as a band in the product's
 * navy — plus a small "ATTENTION!" note drawn after the bordered warning
 * panel on the back of the jar.
 */
export function ChaosBand({ product }: { product: Product }) {
  return (
    <section
      aria-labelledby="chaos-title"
      style={themeStyle(product.theme)}
      className="grain grain-light relative overflow-hidden bg-product py-16 text-product-secondary md:py-24"
    >
      <div className="container-x">
        <h2 id="chaos-title" className="display text-[23vw] leading-[0.82] md:text-[12.5vw] lg:text-[min(11.4vw,12.5rem)]">
          <span className="block md:inline">For daily </span>
          <span className="block md:inline">chaos.</span>
        </h2>

        <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
          <p className="label flex items-center gap-3 text-product-secondary/60">
            <span className="inline-block h-px w-8 bg-current" aria-hidden />
            Hasło z opakowania MONCRÉ {product.type}
          </p>

          <Reveal className="w-full max-w-[22rem] -rotate-2 self-end md:self-auto">
            <div lang="en" className="border-2 border-product-secondary p-1.5">
              <div className="border border-product-secondary/50 px-5 py-4">
                <p className="display text-4xl leading-none">Attention!</p>
                <p className="mt-2 text-[15px] leading-snug font-bold">Your hair might turn heads.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
