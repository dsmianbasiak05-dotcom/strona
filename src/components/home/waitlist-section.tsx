import type { Product } from "@/lib/commerce/types";
import { isPurchasable } from "@/lib/commerce";
import { WaitlistForm } from "@/components/products/waitlist-form";

/** Waitlist while the product is not on sale; nothing once sales open. */
export function WaitlistSection({ product }: { product: Product }) {
  if (isPurchasable(product)) return null;

  return (
    <section id="waitlist" aria-labelledby="waitlist-title" className="section-y scroll-mt-20 bg-bone">
      <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-6">
          <h2 id="waitlist-title" className="display text-[12vw] leading-[0.9] md:text-7xl">
            Lista oczekujących
          </h2>
          <p className="mt-4 text-lg leading-relaxed">Bądź na liście. Dowiedz się o premierze jako pierwszy.</p>
        </div>
        <WaitlistForm productName={product.name} className="lg:col-span-6" />
      </div>
    </section>
  );
}
