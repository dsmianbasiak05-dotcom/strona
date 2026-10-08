import type { ImageRole, Product } from "@/lib/commerce/types";
import { themeStyle } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/brand/section-heading";
import { ProductMedia } from "@/components/products/product-media";

interface Frame {
  role: ImageRole;
  caption: string;
  frame: string;
  layout: string;
  sizes: string;
}

/** Each render has one job: the box reads as the object, the back as detail. */
const FRAMES: Frame[] = [
  { role: "packaging", caption: "Pudełko", frame: "aspect-[5/4]", layout: "lg:col-span-7", sizes: "(min-width: 1024px) 56vw, 100vw" },
  { role: "back", caption: "Tył słoika", frame: "aspect-[4/5]", layout: "lg:col-span-5 lg:mt-32", sizes: "(min-width: 1024px) 40vw, 100vw" },
];

/** Editorial pair of a product's detail renders — deliberately not a full gallery. */
export function ProductVisuals({ product }: { product: Product }) {
  const frames = FRAMES.filter((f) => product.images.some((img) => img.role === f.role));
  if (frames.length === 0) return null;

  return (
    <section style={themeStyle(product.theme)} aria-labelledby="visuals-title" className="section-y">
      <div className="container-x">
        <SectionHeading id="visuals-title" index="03" eyebrow={`MONCRÉ ${product.type}`} lines={["Opakowanie."]} />
        <div className="mt-10 grid gap-10 md:mt-16 lg:grid-cols-12 lg:gap-8">
          {frames.map((f, i) => (
            <Reveal key={f.role} delay={i * 0.1} className={f.layout}>
              <figure className="group">
                <div className={cn("relative overflow-hidden bg-product-bg", f.frame)}>
                  <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[var(--ease-premium)] group-hover:scale-[1.03]">
                    <ProductMedia product={product} role={f.role} sizes={f.sizes} />
                  </div>
                </div>
                <figcaption className="label mt-4 flex items-center gap-3 text-graphite">
                  <span aria-hidden className="inline-block size-2.5 bg-product" />
                  {product.type} — {f.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
