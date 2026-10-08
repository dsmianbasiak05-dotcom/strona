import type { Product } from "@/lib/commerce/types";
import { SectionHeading } from "@/components/brand/section-heading";
import { FeaturedProduct } from "@/components/products/featured-product";
import { ProductLineup } from "@/components/products/product-lineup";

/**
 * Home line-up: the featured product in its own colours, then the rest of
 * the catalogue as standard cards (renders nothing extra with one product).
 */
export function LineupSection({ featured, products }: { featured: Product; products: Product[] }) {
  const others = products.filter((p) => p.id !== featured.id);
  return (
    <section id="line-up" aria-labelledby="lineup-title" className="section-y scroll-mt-20">
      <div className="container-x">
        <SectionHeading id="lineup-title" index="01" eyebrow="MONCRÉ" lines={["The line-up."]} />
        <div className="mt-10 md:mt-14">
          <FeaturedProduct product={featured} />
        </div>
        {others.length > 0 && (
          <div className="mt-16 md:mt-20">
            <ProductLineup products={others} leadFirst={false} />
          </div>
        )}
      </div>
    </section>
  );
}
