import type { Product } from "@/lib/commerce/types";
import { ProductSpotlight } from "@/components/product/product-spotlight";
import { SectionHeading } from "./section-heading";

export function Essentials({ product }: { product: Product }) {
  return (
    <section id="product" aria-labelledby="product-title" className="scroll-mt-20 py-20 md:py-32">
      <div className="container-x">
        <SectionHeading id="product-title" index="01" eyebrow="The product" lines={["Meet No.1"]} />
        <div className="mt-10 md:mt-16">
          <ProductSpotlight product={product} />
        </div>
      </div>
    </section>
  );
}
