import Image from "next/image";
import Link from "next/link";
import type { ImageRole, Product } from "@/lib/commerce/types";
import { productImage, productPrice, productSize } from "@/lib/commerce";
import { formatMoney } from "@/lib/format";
import { themeStyle } from "@/lib/theme";
import { Reveal } from "@/components/ui/reveal";
import { ProductMedia } from "@/components/products/product-media";
import { StatusBadge } from "@/components/products/coming-soon-badge";

/** Other official angles — square renders in square tiles, shown whole. */
const ANGLES: { role: ImageRole; caption: string }[] = [
  { role: "packaging", caption: "Pudełko" },
  { role: "back", caption: "Tył słoika" },
  { role: "lid", caption: "Wieczko" },
];

/**
 * MONCRÉ No.1 on a light surface: the jar + box render whole (16:9 frame
 * = its own ratio), three other official angles under it, the facts in a
 * column beside it. Name, size, price and status come from the product
 * record; the descriptor and the copy are confirmed brand text.
 */
export function ProductShowcase({ product }: { product: Product }) {
  const set = productImage(product, "set");
  const price = productPrice(product);
  const size = productSize(product);
  const href = `/product/${product.slug}`;
  const angles = ANGLES.filter((a) => product.images.some((img) => img.role === a.role));

  return (
    <section aria-labelledby="showcase-title" style={themeStyle(product.theme)} className="section-y bg-bone">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          {set && (
            <Reveal>
              <Link href={href} aria-label={`${product.name} — zobacz produkt`} className="relative block aspect-[16/9] overflow-hidden bg-product-bg">
                <Image src={set.src} alt={set.alt} fill quality={85} sizes="(min-width: 1024px) 56vw, 100vw" className="object-contain" />
              </Link>
            </Reveal>
          )}
          {angles.length > 0 && (
            <ul className="mt-3 grid grid-cols-3 gap-3">
              {angles.map((a, i) => (
                <li key={a.role}>
                  <Reveal delay={0.06 * (i + 1)}>
                    <figure>
                      <div className="relative aspect-square overflow-hidden bg-product-bg">
                        <ProductMedia product={product} role={a.role} sizes="(min-width: 1024px) 18vw, 32vw" />
                      </div>
                      <figcaption className="label mt-2 text-[10px] text-graphite">{a.caption}</figcaption>
                    </figure>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Reveal delay={0.1} className="lg:col-span-5 lg:pt-2">
          <div className="lg:sticky lg:top-28">
            <p className="label flex items-center gap-3 text-graphite">
              <span className="tabular-nums">02</span>
              <span className="inline-block h-px w-8 bg-current" aria-hidden />
              Produkt
            </p>
            <h2 id="showcase-title" className="display mt-6 text-[17vw] leading-[0.86] md:text-8xl xl:text-[8.5rem]">
              <span className="block text-[0.32em] leading-none text-graphite">MONCRÉ</span>
              {product.type}
            </h2>
            <p className="label mt-5 text-[13px] text-product">Glinka matująca</p>
            <p className="mt-6 max-w-[40ch] text-[17px] leading-relaxed text-ink/80">
              Matowe wykończenie, wyraźna tekstura i średnie do mocnego utrwalenie. Dla tych, którzy chcą podkreślić
              własny styl.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-ink/15 pt-6">
              {(size || price) && (
                <p className="text-2xl font-bold tabular-nums">{[size, price && formatMoney(price)].filter(Boolean).join(" · ")}</p>
              )}
              <StatusBadge product={product} />
            </div>

            <Link
              href={href}
              className="group/cta label mt-8 inline-flex h-14 w-full items-center justify-center gap-3 bg-ink px-10 text-paper transition-colors duration-500 hover:bg-ink-700 sm:w-auto"
            >
              Poznaj produkt
              <span aria-hidden className="transition-transform duration-500 ease-[var(--ease-premium)] group-hover/cta:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
