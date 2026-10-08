import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { isPurchasable } from "@/lib/commerce";
import { formatMoney } from "@/lib/format";
import { renders } from "@/data/media";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ComingSoonBadge } from "@/components/product/coming-soon-badge";

/**
 * The product, stated plainly: name, the brand-provided facts, price and
 * status. Facts come from `product.highlights` — nothing else is added.
 */
export function No1Section({ product }: { product: Product }) {
  const onSale = isPurchasable(product);
  const rows = [
    ...(product.highlights ?? []),
    { label: "Price", value: formatMoney(product.variants[0].price) },
  ];

  return (
    <section id="no-1" aria-labelledby="no1-title" className="scroll-mt-20 py-20 md:py-28 lg:py-36">
      <div className="container-x grid gap-10 md:grid-cols-12 md:items-center md:gap-8 lg:gap-12">
        <Reveal className="hidden md:col-span-6 md:block lg:col-span-7">
          <Link
            href={`/product/${product.slug}`}
            className="group relative block aspect-[5/4] overflow-hidden bg-[#e3e2de]"
            aria-label={`${product.name} — zobacz produkt`}
          >
            <Image
              src={renders.jarFront.src}
              alt={renders.jarFront.alt}
              fill
              sizes="(min-width: 1024px) 56vw, 50vw"
              quality={85}
              className="object-cover object-[50%_52%] transition-transform duration-[1400ms] ease-[var(--ease-premium)] group-hover:scale-[1.03]"
            />
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-6 lg:col-span-5">
          <p className="label flex items-center gap-3 text-navy-500">
            <span className="tabular-nums">01</span>
            <span className="inline-block h-px w-8 bg-current" aria-hidden />
            The product
          </p>
          <h2 id="no1-title" className="display mt-5 text-[22vw] leading-[0.84] md:text-[11vw] lg:text-[min(9vw,9.5rem)]">
            <span className="block text-[0.3em] leading-none tracking-[0.02em] text-navy-500">MONCRÉ</span>
            {product.type}
          </h2>

          <dl className="mt-8 border-t border-navy-900/15 md:mt-10">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-6 border-b border-navy-900/15 py-4 md:py-5"
              >
                <dt className="label text-navy-500">{row.label}</dt>
                <dd className="text-right text-lg font-semibold tabular-nums md:text-xl">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex items-center gap-3">
            {!onSale && <ComingSoonBadge />}
            <p className="text-sm text-navy-500">Cena brutto.</p>
          </div>

          <div className="mt-8 grid gap-2 sm:grid-cols-2">
            {onSale ? (
              <ButtonLink href={`/product/${product.slug}`} size="lg" className="w-full" arrow>
                Shop No.1
              </ButtonLink>
            ) : (
              <ButtonLink href="#waitlist" size="lg" className="w-full" arrow>
                Join the waitlist
              </ButtonLink>
            )}
            <ButtonLink href={`/product/${product.slug}`} size="lg" variant="secondary" className="w-full">
              Discover No.1
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
