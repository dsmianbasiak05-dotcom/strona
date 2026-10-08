import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { isPurchasable, productSize } from "@/lib/commerce";
import { formatMoney } from "@/lib/format";
import { themeStyle } from "@/lib/theme";
import { Reveal } from "@/components/ui/reveal";
import { ProductMedia } from "./product-media";

/**
 * A product presented in its own colours: render on the product surface,
 * facts on a block of the product's primary colour. Every colour comes
 * from `product.theme`, so No.2 in a different palette needs no new code.
 */
export function FeaturedProduct({ product }: { product: Product }) {
  const onSale = isPurchasable(product);
  const href = `/product/${product.slug}`;
  const rows = [...(product.highlights ?? []), { label: "Price", value: formatMoney(product.variants[0].price) }];

  return (
    <article style={themeStyle(product.theme)} className="grid md:grid-cols-12">
      <Reveal className="relative md:col-span-7">
        <Link
          href={href}
          aria-label={product.name}
          className="group relative block aspect-[4/3] overflow-hidden bg-product-bg md:aspect-auto md:h-full md:min-h-[560px]"
        >
          <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[var(--ease-premium)] group-hover:scale-[1.03]">
            <ProductMedia product={product} role="front" sizes="(min-width: 768px) 58vw, 100vw" />
          </div>
        </Link>
      </Reveal>

      <Reveal delay={0.08} className="bg-product text-product-secondary md:col-span-5">
        <div className="flex h-full flex-col p-6 md:p-10 xl:p-14">
          <div className="flex items-start justify-between gap-4">
            <p className="label text-product-secondary/70">MONCRÉ · No.{product.number}</p>
            {!onSale && (
              <span className="label inline-flex h-7 items-center bg-product-secondary px-3 text-[10px] text-product">
                Coming soon
              </span>
            )}
          </div>

          <h3 className="display mt-6 text-[26vw] leading-[0.82] md:text-[12vw] lg:text-[min(11vw,11rem)]">
            <Link href={href}>{product.type}</Link>
          </h3>
          <p className="mt-3 text-[15px] text-product-secondary/80">{product.tagline}</p>

          <dl className="mt-8 border-t border-product-secondary/20 md:mt-10">
            {rows.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-6 border-b border-product-secondary/20 py-3.5">
                <dt className="label text-product-secondary/60">{row.label}</dt>
                <dd className="text-right text-[15px] font-bold tabular-nums md:text-base">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 grid gap-2 sm:grid-cols-2 md:mt-auto md:pt-10">
            <Link
              href={onSale ? href : "#waitlist"}
              className="label inline-flex h-14 items-center justify-center bg-product-secondary px-6 text-product transition-opacity duration-500 hover:opacity-85"
            >
              {onSale ? `Shop ${product.type}` : "Join the waitlist"}
            </Link>
            <Link
              href={href}
              className="label inline-flex h-14 items-center justify-center border border-product-secondary/50 px-6 transition-colors duration-500 hover:bg-product-secondary hover:text-product"
            >
              Discover {product.type}
            </Link>
          </div>
          <p className="mt-4 text-xs text-product-secondary/60">
            {product.categoryLabel} · {productSize(product)} · cena brutto
          </p>
        </div>
      </Reveal>
    </article>
  );
}
