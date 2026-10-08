import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { ProductCard } from "@/components/product/product-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "./section-heading";

export function Essentials({ products }: { products: Product[] }) {
  return (
    <section id="essentials" aria-labelledby="essentials-title" className="scroll-mt-20 py-20 md:py-32">
      <div className="container-x">
        <SectionHeading
          id="essentials-title"
          index="01"
          eyebrow="Bestsellers"
          lines={["The essentials"]}
          aside={
            <Link href="/shop" className="label link-underline self-start md:self-auto">
              View all products →
            </Link>
          }
        />
      </div>

      {/* Mobile: swipeable rail. Desktop: 4-col grid. */}
      <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 md:mt-16 md:grid md:snap-none md:grid-cols-2 md:gap-x-6 md:gap-y-12 md:overflow-visible md:px-8 lg:grid-cols-4 xl:px-12 mx-auto max-w-[1680px]">
        {products.map((product, i) => (
          <li key={product.id} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] md:w-auto">
            <Reveal delay={i * 0.08}>
              <ProductCard
                product={product}
                showDescription
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 78vw"
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
