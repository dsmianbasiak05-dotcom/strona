import Image from "next/image";
import type { Product } from "@/lib/commerce/types";
import { productImage } from "@/lib/commerce";
import { themeStyle } from "@/lib/theme";
import { Reveal } from "@/components/ui/reveal";

/**
 * Brand philosophy as an editorial spread on cream: the first line in ink,
 * the answer reversed out of an ink bar, the copy in a ruled column, and a
 * close-up of the real jar render (ribbed lid + pack print) — the official
 * render cropped and enlarged, nothing drawn on it. Top padding leaves room
 * for the hero plate hanging into this section.
 */
export function Philosophy({ product }: { product: Product }) {
  const front = productImage(product, "front");

  return (
    <section
      aria-labelledby="philosophy-title"
      style={themeStyle(product.theme)}
      className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-28 lg:pt-56 lg:pb-32"
    >
      <div className="container-x">
        <p className="label flex items-center gap-3 text-graphite">
          <span className="tabular-nums">01</span>
          <span className="inline-block h-px w-8 bg-current" aria-hidden />
          Filozofia
        </p>

        <h2 id="philosophy-title" className="display mt-8 text-[14.5vw] md:text-[10.5vw] lg:text-[min(8.6vw,9.5rem)]">
          <span className="block leading-[0.95]">Nie układaj się.</span>
          <span className="mt-[0.45em] inline-block bg-ink px-[0.18em] pt-[0.1em] pb-[0.06em] leading-[0.95] text-paper md:ml-[12%] lg:ml-[22%]">
            Układaj włosy.
          </span>
        </h2>

        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:items-center lg:gap-8">
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
                  {product.type} — detal opakowania
                </figcaption>
              </figure>
            </Reveal>
          )}

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <div className="relative border-t-2 border-ink pt-8">
              <span aria-hidden className="display absolute -top-[0.62em] right-0 bg-paper pl-3 text-5xl leading-none text-product md:text-6xl">
                “
              </span>
              <p className="max-w-[32ch] text-xl leading-relaxed md:text-[1.6rem] md:leading-[1.5]">
                MONCRÉ to stylizacja dla tych, którzy mają własny kierunek. Liczy się charakter, swoboda i fryzura, która
                pasuje do Ciebie. Bez zbędnych zasad.
              </p>
              <p className="label mt-8 flex items-center gap-3 text-graphite">
                <span className="inline-block h-px w-8 bg-current" aria-hidden />
                MONCRÉ
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
