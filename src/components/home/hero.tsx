"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Product } from "@/lib/commerce/types";
import { productImage } from "@/lib/commerce";
import { themeStyle } from "@/lib/theme";
import { InsetRender } from "@/components/products/product-media";

const ease = [0.22, 1, 0.36, 1] as const;
const LINES = ["Your hair.", "Your rules."];

/** Printer's crop marks around the product plate — a print/campaign cue. */
function CropMarks() {
  const mark = "absolute size-5 border-stone-dark/70 md:size-7";
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
 * Campaign opener on ink. Type and product are one composition: the claim
 * on the left, the jar render's studio plate rising beside it on desktop
 * and hanging over the section edge into the cream section below. The
 * render is shown whole at full plate width (on desktop the 4:5 plate
 * continues the render's studio surface above and below it); crop marks
 * frame it and the lid's M monogram seals its corner.
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
      className="grain grain-light relative z-10 bg-ink pt-14 text-bone md:pt-[72px]"
    >
      <div className="container-x pt-8 md:pt-12 lg:pt-10">
        <p className="label flex items-center gap-3 text-bone/55">
          <span className="inline-block h-px w-8 bg-current" aria-hidden />
          MONCRÉ — stylizacja męskich włosów
        </p>

        <div className="relative mt-5 md:mt-6">
          {/* Claim — the plate rises beside it on desktop */}
          <h1
            id="hero-title"
            className="display relative z-20 text-[17.5vw] leading-[0.88] text-bone md:text-[12.5vw] lg:text-[min(10.6vw,12rem)]"
          >
            <span className="sr-only">Your hair. Your rules.</span>
            <span aria-hidden className="block">
              {LINES.map((line, i) => (
                <span
                  key={line}
                  className={`-mt-[0.12em] block overflow-hidden pt-[0.12em] pb-[0.02em] ${i === 1 ? "lg:pl-[4%]" : ""}`}
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

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Product plate — beside the claim, hangs below the section */}
            <motion.figure
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease, delay: 0.25 }}
              className="relative z-10 mx-3 mt-4 -mb-20 md:mx-5 md:-mb-28 lg:order-2 lg:col-span-5 lg:col-start-8 lg:mx-0 lg:-mt-[min(18.6vw,21rem)] lg:mr-5 lg:-mb-32"
            >
              <CropMarks />
              <Link
                href={href}
                aria-label={`${product.name} — zobacz produkt`}
                className="relative block aspect-square overflow-hidden bg-product-bg shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] lg:aspect-[4/5]"
              >
                {/* Whole render, full width; the studio surface continues above and below it */}
                <InsetRender product={product} role="front" scale={1} priority sizes="(min-width: 1024px) 38vw, 92vw" />
              </Link>

              {hasLid && lid && (
                <motion.div style={{ rotate }} className="absolute -bottom-7 -left-5 w-24 md:-bottom-12 md:-left-10 md:w-36" aria-hidden>
                  <div className="relative aspect-square">
                    <Image src={lid.src} alt="" fill sizes="144px" quality={85} className="object-cover [clip-path:circle(37.3%_at_50%_50%)]" />
                  </div>
                </motion.div>
              )}

              <figcaption className="label absolute top-full right-0 mt-4 text-[10px] text-ink/60">
                MONCRÉ {product.type} — render opakowania
              </figcaption>
            </motion.figure>

            {/* Line + action — bottom-left, aligned to the grid */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.45 }}
              className="order-first flex flex-col gap-7 pt-6 pb-2 lg:order-1 lg:col-span-6 lg:pt-12 lg:pb-16"
            >
              <p className="max-w-[26ch] text-lg leading-relaxed text-bone/80 md:text-2xl md:leading-snug">
                Stylizacja dla tych, którzy nie układają się w ramy.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href={href}
                  className="group/cta label inline-flex h-14 w-full items-center justify-center gap-3 bg-bone px-9 text-ink transition-colors duration-500 hover:bg-paper sm:w-auto"
                >
                  Poznaj {product.type}
                  <span aria-hidden className="transition-transform duration-500 ease-[var(--ease-premium)] group-hover/cta:translate-x-1">
                    →
                  </span>
                </Link>
                <span aria-hidden className="hidden h-px flex-1 bg-bone/25 lg:block" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
