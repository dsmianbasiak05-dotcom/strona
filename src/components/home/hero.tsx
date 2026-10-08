"use client";

import Link from "next/link";
import { getImageProps } from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Product } from "@/lib/commerce/types";
import { isPurchasable } from "@/lib/commerce";
import { formatMoney } from "@/lib/format";
import { renders } from "@/data/media";
import { ButtonLink } from "@/components/ui/button";
import { ComingSoonBadge } from "@/components/product/coming-soon-badge";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Campaign opener. One-line headline across the full width on desktop,
 * then the jar + box render at its native 16:9. Phones get a dedicated
 * crop of the jar (art direction via <picture>, only one file loads).
 */
export function Hero({ product }: { product: Product }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const onSale = isPurchasable(product);
  const price = formatMoney(product.variants[0].price);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.06]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "6%"]);

  const common = { alt: renders.set.alt, sizes: "(min-width: 1024px) 66vw, 100vw" };
  const {
    props: { srcSet: setSrcSet },
  } = getImageProps({ ...common, src: renders.set.src, width: renders.set.width, height: renders.set.height, quality: 85 });
  const {
    props: { srcSet: jarSrcSet, ...imgProps },
  } = getImageProps({
    ...common,
    alt: renders.jarFront.alt,
    src: renders.jarFront.src,
    width: renders.jarFront.width,
    height: renders.jarFront.height,
    quality: 85,
    loading: "eager",
    fetchPriority: "high",
  });

  const lines = ["Your hair.", "Your rules."];

  return (
    <section ref={ref} aria-label="MONCRÉ — men's hair styling" className="relative overflow-hidden pt-14 md:pt-[72px]">
      <div className="container-x pt-6 pb-12 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20">
        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex items-center justify-between gap-4"
        >
          <p className="label flex items-center gap-3 text-navy-500">
            <span className="inline-block h-px w-6 bg-current md:w-8" aria-hidden />
            Men&apos;s hair styling
          </p>
          <p className="label flex items-center gap-3 text-navy-900">
            <span className="hidden sm:inline">MONCRÉ {product.type}</span>
            {!onSale && <ComingSoonBadge />}
          </p>
        </motion.div>

        {/* Headline — two lines on phone/tablet, one line from lg */}
        <h1 className="display mt-5 text-[19.2vw] leading-[0.84] text-navy-900 md:mt-6 md:text-[15.4vw] lg:mt-8 lg:text-[min(10.1vw,10.7rem)] lg:whitespace-nowrap">
          <span className="sr-only">Your hair. Your rules. MONCRÉ — kosmetyki do stylizacji męskich włosów</span>
          <span aria-hidden className="block">
            {lines.map((line, i) => (
              <span key={line} className="-mt-[0.14em] block overflow-hidden pt-[0.14em] pb-[0.03em] lg:inline-block lg:pr-[0.28em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.05, ease, delay: 0.15 + i * 0.09 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-6 grid gap-6 md:mt-8 lg:mt-10 lg:grid-cols-12 lg:gap-10">
          {/* Campaign image */}
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 1.3, ease, delay: 0.25 }}
            className="relative order-1 aspect-[5/4] overflow-hidden bg-[#e3e2de] md:aspect-[16/9] lg:order-2 lg:col-span-8"
          >
            <Link href={`/product/${product.slug}`} aria-label={`${product.name} — zobacz produkt`} className="block h-full w-full">
              <motion.div style={{ scale: imageScale, y: imageY }} className="h-full w-full">
                <picture>
                  <source media="(min-width: 768px)" srcSet={setSrcSet} />
                  <img
                    {...imgProps}
                    alt="MONCRÉ No.1 — opakowanie: słoik i pudełko"
                    srcSet={jarSrcSet}
                    className="h-full w-full object-cover object-[50%_52%]"
                    style={{ width: "100%", height: "100%" }}
                  />
                </picture>
              </motion.div>
            </Link>
          </motion.div>

          {/* Copy + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.6 }}
            className="order-2 flex flex-col justify-end gap-6 md:flex-row md:items-end md:justify-between lg:order-1 lg:col-span-4 lg:flex-col lg:items-stretch lg:justify-between lg:gap-8"
          >
            <div className="max-w-[34ch]">
              <p className="text-[17px] leading-snug font-medium text-navy-900 md:text-lg">
                Professional styling products for everyday control.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-navy-900/70">
                MONCRÉ {product.type} — matte clay, 75 ml, {price}.{" "}
                {!onSale && <span className="font-semibold whitespace-nowrap text-navy-900">Coming soon.</span>}
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 md:w-auto md:min-w-[420px] lg:min-w-0 lg:grid-cols-1">
              <ButtonLink href={`/product/${product.slug}`} size="lg" className="w-full" arrow>
                Discover No.1
              </ButtonLink>
              <ButtonLink href="/about" size="lg" variant="secondary" className="w-full">
                Discover MONCRÉ
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
