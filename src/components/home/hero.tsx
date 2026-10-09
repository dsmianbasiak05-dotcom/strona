import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { productImage, productPrice, productSize } from "@/lib/commerce";
import { formatMoney } from "@/lib/format";
import { themeStyle } from "@/lib/theme";
import { StatusBadge } from "@/components/products/coming-soon-badge";

/**
 * Home opener — one claim, one image, one action:
 * "Your hair. Your rules." → the official jar + box render at content width
 * (16:9 frame = the render's own ratio, nothing cropped) → name · size ·
 * price with the status → "Poznaj No.1".
 */
export function Hero({ product }: { product: Product }) {
  const set = productImage(product, "set");
  const price = productPrice(product);
  const size = productSize(product);
  const href = `/product/${product.slug}`;

  return (
    <section
      aria-labelledby="hero-title"
      style={themeStyle(product.theme)}
      className="container-x pt-14 pb-16 md:pt-[72px] md:pb-24"
    >
      <h1 id="hero-title" className="display pt-8 text-[15.5vw] leading-[0.86] md:pt-12 md:text-[8.6vw] lg:text-[min(8.6vw,9.5rem)]">
        <span className="sr-only">MONCRÉ — </span>
        <span className="block md:inline">Your hair. </span>
        <span className="block md:inline">Your rules.</span>
      </h1>

      {set && (
        <Link
          href={href}
          aria-label={`${product.name} — zobacz produkt`}
          className="relative mt-6 block aspect-[16/9] w-full overflow-hidden bg-product-bg md:mt-10"
        >
          <Image
            src={set.src}
            alt={set.alt}
            fill
            loading="eager"
            fetchPriority="high"
            quality={85}
            sizes="(min-width: 1440px) 1344px, calc(100vw - 2rem)"
            className="object-contain"
          />
        </Link>
      )}

      <div className="mt-5 flex flex-col gap-5 md:mt-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-[15px] font-bold tabular-nums">
            {[product.name, size, price && formatMoney(price)].filter(Boolean).join(" · ")}
          </p>
          <StatusBadge product={product} />
        </div>
        <Link
          href={href}
          className="group/cta label inline-flex h-14 items-center justify-center gap-3 bg-ink px-10 text-paper transition-colors duration-500 hover:bg-ink-700"
        >
          Poznaj {product.type}
          <span aria-hidden className="transition-transform duration-500 ease-[var(--ease-premium)] group-hover/cta:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
