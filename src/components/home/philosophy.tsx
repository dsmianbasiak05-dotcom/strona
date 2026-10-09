import Image from "next/image";
import type { Product } from "@/lib/commerce/types";
import { productImage } from "@/lib/commerce";
import { themeStyle } from "@/lib/theme";
import { Reveal } from "@/components/ui/reveal";

/**
 * Brand philosophy, editorial: the line set large across the grid (second
 * line indented), the copy in a narrow column, and a close-up of the real
 * jar render — the ribbed lid and the pack print — as the image. The
 * close-up only crops and enlarges the official render; nothing is drawn.
 */
export function Philosophy({ product }: { product: Product }) {
  const front = productImage(product, "front");

  return (
    <section aria-labelledby="philosophy-title" style={themeStyle(product.theme)} className="section-y relative overflow-hidden">
      <div className="container-x">
        <p className="label flex items-center gap-3 text-graphite">
          <span className="tabular-nums">01</span>
          <span className="inline-block h-px w-8 bg-current" aria-hidden />
          Filozofia
        </p>

        <h2 id="philosophy-title" className="display mt-8 text-[14.5vw] leading-[1.32] md:leading-[1.22] md:text-[10.5vw] lg:text-[min(8.6vw,9.5rem)]">
          <span className="block">Nie układaj się.</span>
          <span className="block md:pl-[12%] lg:pl-[25%]">
            Układaj <span className="text-product">włosy.</span>
          </span>
        </h2>

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:items-center lg:gap-8">
          {front && (
            <Reveal className="lg:col-span-5">
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden bg-product-bg">
                  <Image
                    src={front.src}
                    alt="MONCRÉ No.1 — zbliżenie: żebrowane wieczko i nadruk na słoiku"
                    fill
                    quality={85}
                    sizes="(min-width: 1024px) 70vw, 200vw"
                    className="origin-[22%_32%] scale-[2] object-cover"
                  />
                </div>
                <figcaption className="label mt-3 flex items-center gap-2 text-[10px] text-graphite">
                  <span aria-hidden className="inline-block size-2 bg-product" />
                  {product.type} — detal
                </figcaption>
              </figure>
            </Reveal>
          )}

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <div className="border-t border-ink pt-6">
              <p className="max-w-[34ch] text-xl leading-relaxed md:text-2xl md:leading-relaxed">
                MONCRÉ to stylizacja dla tych, którzy mają własny kierunek. Liczy się charakter, swoboda i fryzura, która
                pasuje do Ciebie. Bez zbędnych zasad.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
