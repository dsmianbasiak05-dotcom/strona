import type { Product } from "@/lib/commerce/types";
import { isPurchasable } from "@/lib/commerce";
import { formatMoney } from "@/lib/format";
import { RevealLines, Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { WaitlistForm } from "@/components/products/waitlist-form";

/** Closing call to action — waitlist while No.1 is not on sale. */
export function WaitlistSection({ product }: { product: Product }) {
  const onSale = isPurchasable(product);

  return (
    <section id="waitlist" aria-labelledby="waitlist-title" className="section-y scroll-mt-20 bg-bone">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-7">
          <p className="label flex items-center gap-3 text-graphite">
            <span className="tabular-nums">05</span>
            <span className="inline-block h-px w-8 bg-current" aria-hidden />
            MONCRÉ {product.type}
          </p>
          <div id="waitlist-title" className="mt-6">
            <RevealLines
              lines={onSale ? ["Już", "dostępne."] : ["Coming", "soon."]}
              className="display text-[24vw] leading-[0.84] md:text-[15vw] lg:text-[min(11vw,11.5rem)]"
            />
          </div>
        </div>
        <Reveal delay={0.1} className="lg:col-span-5 lg:pb-3">
          <p className="text-lg leading-snug font-medium md:text-xl">
            MONCRÉ {product.type} — {product.categoryLabel.toLowerCase()}, 75 ml, {formatMoney(product.variants[0].price)}.
          </p>
          {onSale ? (
            <ButtonLink href={`/product/${product.slug}`} size="lg" className="mt-6 w-full" arrow>
              Kup {product.type}
            </ButtonLink>
          ) : (
            <>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
                Bądź na liście. Dowiedz się o premierze jako pierwszy.
              </p>
              <WaitlistForm productName={product.name} className="mt-6" />
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
