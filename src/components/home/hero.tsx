"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Product } from "@/lib/commerce/types";
import { productImage } from "@/lib/commerce";
import { themeStyle } from "@/lib/theme";
import { ProductMedia } from "@/components/products/product-media";

const ease = [0.22, 1, 0.36, 1] as const;
const LINES = ["Your hair.", "Your rules."];

/** Printer's crop marks around the product plate — a print/campaign cue. */
function CropMarks() {
  const mark = "absolute size-5 border-bone/45 md:size-7";
  return (
    <span aria-hidden className="pointer-events-none absolute -inset-3 md:-inset-5">
      <span className={`${mark} top-0 left-0 border-t border-l`} />
      <span className={`${mark} top-0 right-0 border-t border-r`} />
      <span className={`${mark} bottom-0 left-0 border-b border-l`} />
      <span className={`${mark} right-0 bottom-0 border-r border-b`} />
    </span>
  );
}

/**
 * Campaign opener on ink: the claim set large on the left, the official
 * No.1 jar render on its own studio plate on the right (square frame =
 * the render's own ratio, nothing cropped), the lid's M monogram as a
 * seal on the plate's corner. Film grain, crop marks — no extra slogans.
 */
export function Hero({ product }: { product: Product }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const lid = productImage(product, "lid");
  const hasLid = lid?.role === "lid";
  const href = `/product/${product.slug}`;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      style={themeStyle(product.theme)}
      className="grain grain-light relative overflow-hidden bg-ink pt-14 text-bone md:pt-[72px]"
    >
      <div className="container-x grid items-center gap-12 pt-10 pb-16 md:pt-14 md:pb-20 lg:grid-cols-12 lg:gap-8 lg:pt-12 lg:pb-24">
        <div className="lg:col-span-7">
          <p className="label flex items-center gap-3 text-bone/55">
            <span className="inline-block h-px w-8 bg-current" aria-hidden />
            MONCRÉ — stylizacja męskich włosów
          </p>

          <h1 id="hero-title" className="display mt-6 text-[17vw] leading-[0.9] md:text-[13vw] lg:text-[min(9.4vw,10rem)]">
            <span className="sr-only">Your hair. Your rules.</span>
            <span aria-hidden className="block">
              {LINES.map((line, i) => (
                <span key={line} className="-mt-[0.14em] block overflow-hidden pt-[0.14em] pb-[0.02em]">
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

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.45 }}
            className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between lg:max-w-[40rem]"
          >
            <p className="max-w-[30ch] text-lg leading-relaxed text-bone/80 md:text-xl">
              Stylizacja dla tych, którzy nie układają się w ramy.
            </p>
            <Link
              href={href}
              className="group/cta label inline-flex h-14 shrink-0 items-center justify-center gap-3 bg-bone px-9 text-ink transition-colors duration-500 hover:bg-paper"
            >
              Poznaj {product.type}
              <span aria-hidden className="transition-transform duration-500 ease-[var(--ease-premium)] group-hover/cta:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.25 }}
          className="relative mx-3 md:mx-5 lg:col-span-5 lg:mx-0 lg:mr-5"
        >
          <CropMarks />
          <Link href={href} aria-label={`${product.name} — zobacz produkt`} className="relative block aspect-square overflow-hidden bg-product-bg">
            <ProductMedia product={product} role="front" priority sizes="(min-width: 1024px) 38vw, 90vw" />
          </Link>

          {hasLid && lid && (
            <motion.div
              style={{ rotate }}
              className="absolute -bottom-8 -left-6 w-24 md:-bottom-12 md:-left-10 md:w-36"
              aria-hidden
            >
              <div className="relative aspect-square">
                <Image
                  src={lid.src}
                  alt=""
                  fill
                  sizes="144px"
                  quality={85}
                  className="object-cover [clip-path:circle(37.3%_at_50%_50%)]"
                />
              </div>
            </motion.div>
          )}

          <figcaption className="label mt-4 flex justify-end gap-3 text-[10px] text-bone/55">
            MONCRÉ {product.type}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
