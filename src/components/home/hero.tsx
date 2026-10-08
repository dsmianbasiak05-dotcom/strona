"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Product } from "@/lib/commerce/types";
import { isPurchasable, productImage, productPrice, productSize } from "@/lib/commerce";
import { formatMoney } from "@/lib/format";
import { themeStyle } from "@/lib/theme";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
const LINES = ["Your hair.", "Your rules."];

/**
 * Brand campaign opener built around the featured product's landscape
 * render (`set`: jar + box). One clean, opaque image — no masks, no
 * layering — framed per breakpoint so the pack is never cut:
 * - phone: label → 2-line headline → 4:3 render → product line → CTA
 * - tablet: one-line headline → 16:9 render → product line + CTAs
 * - desktop: full-bleed 16:9 stage, headline on the render's empty top
 *   band, product line + CTAs on its bottom band.
 */
export function Hero({ product }: { product: Product }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const image = productImage(product, "set");
  const price = productPrice(product);
  const size = productSize(product);
  const onSale = isPurchasable(product);
  const href = `/product/${product.slug}`;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "8%"]);

  const headline = (
    <h1 className="display text-ink">
      <span className="sr-only">Your hair. Your rules. MONCRÉ — kosmetyki do stylizacji męskich włosów</span>
      <span aria-hidden className="block">
        {LINES.map((line, i) => (
          <span key={line} className="-mt-[0.14em] block overflow-hidden pt-[0.14em] pb-[0.02em] md:inline-block md:pr-[0.26em]">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease, delay: 0.15 + i * 0.08 }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    </h1>
  );

  const eyebrow = <p className="label text-ink/65">MONCRÉ — stylizacja męskich włosów</p>;

  const productLine = (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <p className="label flex items-center gap-2 text-ink">
        <span aria-hidden className="inline-block size-2.5 bg-product" />
        MONCRÉ {product.type}
      </p>
      {(size || price) && (
        <p className="label text-ink/70 tabular-nums">
          {[size, price && formatMoney(price)].filter(Boolean).join(" · ")}
        </p>
      )}
      {!onSale && (
        <span className="label inline-flex h-7 items-center bg-ink px-3 text-[10px] text-paper">Wkrótce w sprzedaży</span>
      )}
    </div>
  );

  const primary = (
    <Link
      href={href}
      className="group/cta label inline-flex h-14 w-full items-center justify-center gap-3 bg-ink px-8 text-paper transition-colors duration-500 hover:bg-ink-700 md:w-auto"
    >
      Poznaj {product.type}
      <span aria-hidden className="transition-transform duration-500 ease-[var(--ease-premium)] group-hover/cta:translate-x-1">
        →
      </span>
    </Link>
  );

  const secondary = (
    <Link href="/about" className="label link-underline py-2 text-ink">
      Poznaj MONCRÉ
    </Link>
  );

  const render = image && (
    <motion.div style={{ y: imageY }} className="absolute inset-0">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        loading="eager"
        fetchPriority="high"
        quality={85}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: image.focus ?? "50% 50%" }}
      />
    </motion.div>
  );

  return (
    <section
      ref={ref}
      style={themeStyle(product.theme)}
      aria-label="MONCRÉ — your hair, your rules"
      className="relative overflow-hidden pt-14 md:pt-[72px]"
    >
      {/* Phone + tablet: type above the render */}
      <div className="container-x pt-5 pb-4 md:pt-8 md:pb-6 lg:hidden">
        {eyebrow}
        <div className="mt-3 text-[12.6vw] leading-[0.86] md:mt-4 md:text-[8.4vw]">{headline}</div>
      </div>

      {/* Stage: one opaque render on its own studio surface */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease }}
        className={cn(
          "relative w-full overflow-hidden bg-product-bg",
          "aspect-[4/3] md:aspect-[16/9]",
          "lg:max-h-[calc(100svh-72px)] lg:min-h-[540px]",
        )}
      >
        <Link href={href} aria-label={`${product.name} — zobacz produkt`} className="absolute inset-0 block">
          {render}
        </Link>

        {/* Desktop overlay: headline on the top band, actions on the bottom band */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <div className="container-x flex h-full flex-col justify-between pt-8 pb-8 xl:pt-10 xl:pb-10">
            <div className="pointer-events-auto">
              {eyebrow}
              <div className="mt-4 text-[min(7.2vw,8.75rem)] leading-[0.84] whitespace-nowrap">{headline}</div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.5 }}
              className="pointer-events-auto flex items-end justify-between gap-8"
            >
              <div className="flex items-center gap-6">
                {primary}
                {secondary}
              </div>
              {productLine}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Phone + tablet: product line and actions under the render */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.4 }}
        className="container-x pt-5 pb-10 md:pt-6 md:pb-14 lg:hidden"
      >
        <div className="md:flex md:items-center md:justify-between md:gap-6">
          {productLine}
          <div className="mt-5 flex flex-col items-center gap-3 md:mt-0 md:flex-row md:gap-6">
            {primary}
            {secondary}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
