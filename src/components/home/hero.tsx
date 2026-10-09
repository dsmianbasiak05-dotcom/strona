"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Product } from "@/lib/commerce/types";
import { isPurchasable, productImage, productPrice, productSize } from "@/lib/commerce";
import { formatMoney } from "@/lib/format";
import { themeStyle } from "@/lib/theme";

const ease = [0.22, 1, 0.36, 1] as const;
const LINES = ["Your hair.", "Your rules."];

/**
 * Home opener in two parts:
 * 1. Brand: the claim in cream on the ink surface (film grain), with the
 *    lid's round M monogram under it — clipped to its circular edge, the
 *    render itself untouched. "For daily chaos." stays a supporting line.
 * 2. Product, directly below: the official jar + box render at content
 *    width (16:9 frame = the render's own ratio, so nothing is cropped),
 *    then name · size · price, status and the way to the product page.
 */
export function Hero({ product }: { product: Product }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const lid = productImage(product, "lid");
  const hasLid = lid?.role === "lid";
  const set = productImage(product, "set");
  const price = productPrice(product);
  const size = productSize(product);
  const onSale = isPurchasable(product);
  const href = `/product/${product.slug}`;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 24]);

  return (
    <>
      <section
        ref={ref}
        aria-label="MONCRÉ — your hair, your rules"
        className="grain grain-light relative overflow-hidden bg-ink pt-14 text-bone md:pt-[72px]"
      >
        <div className="container-x flex flex-col items-center pt-10 pb-12 text-center md:pt-12 md:pb-14">
          <p className="label text-bone/55">MONCRÉ — stylizacja męskich włosów</p>

          <h1 className="display mt-5 text-[15.5vw] leading-[0.86] md:mt-6 md:text-[8.6vw] lg:text-[min(8.6vw,9.5rem)]">
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
              className="mt-6 w-[58vw] max-w-[300px] md:mt-7 md:w-[26vw]"
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

          <p className="label mt-4 text-bone/55 md:mt-5">For daily chaos.</p>
        </div>
      </section>

      <section
        aria-labelledby="hero-product-title"
        style={themeStyle(product.theme)}
        className="container-x pt-6 pb-12 md:pt-10 md:pb-16"
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

        <div className="mt-5 flex flex-col gap-3 md:mt-6 md:flex-row md:items-center md:justify-between md:gap-6">
          <h2 id="hero-product-title" className="label flex items-center justify-center gap-2 text-[13px] text-ink md:justify-start">
            <span aria-hidden className="inline-block size-2.5 bg-product" />
            {["MONCRÉ " + product.type, size, price && formatMoney(price)].filter(Boolean).join(" · ")}
          </h2>

          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            {!onSale && (
              <p className="label inline-flex h-12 items-center justify-center border border-ink/25 px-6 text-ink/70">
                Wkrótce w sprzedaży
              </p>
            )}
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
        </div>
      </section>
    </>
  );
}
