"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Product } from "@/lib/commerce/types";
import { productImage, productPrice, productSize } from "@/lib/commerce";
import { formatMoney } from "@/lib/format";
import { themeStyle } from "@/lib/theme";
import { StatusBadge } from "@/components/products/coming-soon-badge";

const ease = [0.22, 1, 0.36, 1] as const;
const LINES = ["Your hair.", "Your rules."];

/**
 * Home opener in two parts:
 * 1. Brand (dark, the first screen): the claim in cream on the ink surface
 *    with film grain, the lid's round M monogram under it — clipped to its
 *    circular edge, the render itself untouched.
 * 2. Product, directly below on cream: the official jar + box render at
 *    content width (16:9 frame = the render's own ratio, nothing cropped),
 *    then name, size · price, status and one action.
 */
export function Hero({ product }: { product: Product }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const lid = productImage(product, "lid");
  const hasLid = lid?.role === "lid";
  const set = productImage(product, "set");
  const price = productPrice(product);
  const size = productSize(product);
  const href = `/product/${product.slug}`;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 24]);

  return (
    <>
      <section
        ref={ref}
        aria-labelledby="hero-title"
        className="grain grain-light relative overflow-hidden bg-ink pt-14 text-bone md:pt-[72px]"
      >
        <div className="container-x flex flex-col items-center pt-10 pb-12 text-center md:pt-12 md:pb-16">
          <p className="label text-bone/55">MONCRÉ — stylizacja męskich włosów</p>

          <h1 id="hero-title" className="display mt-5 text-[15.5vw] leading-[0.86] md:mt-6 md:text-[8.6vw] lg:text-[min(8.6vw,9.5rem)]">
            <span className="sr-only">Your hair. Your rules. MONCRÉ — kosmetyki do stylizacji męskich włosów</span>
            <span aria-hidden className="block">
              {LINES.map((line, i) => (
                <span
                  key={line}
                  className="-mt-[0.14em] block overflow-hidden pt-[0.14em] pb-[0.02em] md:inline-block md:px-[0.13em]"
                >
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

          {hasLid && lid && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease, delay: 0.35 }}
              className="mt-6 w-[58vw] max-w-[300px] md:mt-8 md:w-[26vw]"
            >
              <motion.div style={{ rotate }} className="relative aspect-square">
                <Image
                  src={lid.src}
                  alt={lid.alt}
                  fill
                  loading="eager"
                  sizes="(min-width: 768px) 26vw, 58vw"
                  quality={85}
                  className="object-cover [clip-path:circle(37.3%_at_50%_50%)]"
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      <section
        aria-labelledby="hero-product-title"
        style={themeStyle(product.theme)}
        className="container-x pt-6 pb-16 md:pt-10 md:pb-24"
      >
        {set && (
          <Link
            href={href}
            aria-label={`${product.name} — zobacz produkt`}
            className="relative block aspect-[16/9] w-full overflow-hidden bg-product-bg"
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

        <div className="mt-5 flex flex-col gap-5 md:mt-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="hero-product-title" className="display text-4xl leading-none md:text-5xl">
              {product.name}
            </h2>
            {(size || price) && (
              <p className="mt-2 text-[15px] font-bold tabular-nums">
                {[size, price && formatMoney(price)].filter(Boolean).join(" · ")}
              </p>
            )}
            <StatusBadge product={product} className="mt-3" />
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
    </>
  );
}
