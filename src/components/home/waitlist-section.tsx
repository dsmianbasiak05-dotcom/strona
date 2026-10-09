import type { Product } from "@/lib/commerce/types";
import { isPurchasable } from "@/lib/commerce";
import { WaitlistForm } from "@/components/products/waitlist-form";

/** Waitlist while the product is not on sale; nothing once sales open. */
export function WaitlistSection({ product }: { product: Product }) {
  if (isPurchasable(product)) return null;

  return (
    <section id="waitlist" aria-labelledby="waitlist-title" className="section-y scroll-mt-20">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-7">
          <p className="label flex items-center gap-3 text-graphite">
            <span className="tabular-nums">03</span>
            <span className="inline-block h-px w-8 bg-current" aria-hidden />
            Premiera MONCRÉ {product.type}
          </p>
          <h2 id="waitlist-title" className="display mt-6 text-[12vw] leading-[1.22] whitespace-nowrap md:text-[10vw] lg:text-[min(8.2vw,8.75rem)]">
            Bądź na liście.
          </h2>
          <p className="mt-6 text-lg leading-relaxed md:text-xl">Dowiedz się o premierze jako pierwszy.</p>
        </div>
        <div className="border-t border-ink pt-6 lg:col-span-5">
          <WaitlistForm productName={product.name} />
        </div>
      </div>
    </section>
  );
}
