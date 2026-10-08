"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Product } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/format";
import { ButtonLink } from "@/components/ui/button";
import { RevealLines } from "@/components/ui/reveal";
import { AddToCartButton } from "@/components/product/add-to-cart-button";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * First screen of the brand. Left: the statement. Right: a campaign still
 * of No.1 Matte Clay built from the official packshots — box behind, jar
 * in front, each on its own parallax depth.
 */
export function Hero({ product }: { product: Product }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [jar, box] = product.images;
  const variant = product.variants[0];

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-14%"]);
  const stageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "10%"]);

  // Pointer parallax — two depths (mouse only).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const jarX = useTransform(sx, [-1, 1], [-16, 16]);
  const jarY = useTransform(sy, [-1, 1], [-10, 10]);
  const boxX = useTransform(sx, [-1, 1], [8, -8]);
  const boxY = useTransform(sy, [-1, 1], [5, -5]);

  return (
    <section ref={ref} aria-label="MONCRÉ — men's hair styling" className="relative overflow-hidden pt-16 md:pt-20">
      <div className="container-x relative grid grid-cols-1 gap-y-7 pt-5 pb-10 md:pb-14 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-12 lg:gap-x-10 lg:pt-8">
        {/* Copy column */}
        <motion.div style={{ y: typeY }} className="relative z-10 flex flex-col lg:col-span-7 lg:justify-between lg:py-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="label flex items-center gap-3 text-navy-500"
          >
            <span className="inline-block h-px w-8 bg-current" aria-hidden />
            Men&apos;s hair styling products
          </motion.p>

          <div className="lg:mt-auto">
            <RevealLines
              as="h1"
              animateOnMount
              delay={0.15}
              className="display mt-4 text-[19vw] text-navy-900 sm:text-[16vw] lg:mt-0 lg:text-[min(11.4vw,15.5rem)]"
              lines={["Your hair.", "Your rules."]}
              srLabel="Your hair. Your rules. MONCRÉ — kosmetyki do stylizacji męskich włosów"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.7 }}
            className="mt-6 md:mt-10 lg:mt-12"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
              <div>
                <p className="max-w-[30ch] text-base leading-snug font-medium text-navy-900 md:text-lg">
                  Professional styling products for everyday control.
                </p>
                <p className="label mt-3 whitespace-nowrap text-navy-500">Clay · Powder · Pomade · Spray</p>
              </div>
              <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:gap-3">
                <ButtonLink href="/shop" size="lg" className="px-4 sm:px-9" arrow>
                  Shop products
                </ButtonLink>
                <ButtonLink href="/about" size="lg" variant="secondary" className="px-4 sm:px-9">
                  Discover MONCRÉ
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Campaign stage — official packshots */}
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.3, ease, delay: 0.1 }}
          className="grain relative flex aspect-[4/5] flex-col overflow-hidden bg-stone sm:aspect-[4/3] lg:col-span-5 lg:aspect-auto lg:min-h-[600px]"
          onPointerMove={(e) => {
            if (reduce || e.pointerType !== "mouse") return;
            const r = e.currentTarget.getBoundingClientRect();
            mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
            my.set(((e.clientY - r.top) / r.height) * 2 - 1);
          }}
          onPointerLeave={() => {
            mx.set(0);
            my.set(0);
          }}
        >
          <div className="relative z-10 flex items-start justify-between p-5 md:p-7">
            <p className="label text-navy-900">{product.type}</p>
            <p className="label text-navy-900/60">{variant.title}</p>
          </div>

          <motion.div style={{ y: stageY }} className="relative flex-1">
            {box && (
              <motion.div
                style={{ x: boxX, y: boxY }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease, delay: 0.5 }}
                className="absolute top-[2%] right-[4%] h-[52%] w-[62%]"
              >
                <Image
                  src={box.src}
                  alt={box.alt}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 26vw, 60vw"
                  className="object-contain drop-shadow-[0_24px_24px_rgba(23,25,54,0.25)]"
                />
              </motion.div>
            )}
            {jar && (
              <motion.div
                style={{ x: jarX, y: jarY }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease, delay: 0.35 }}
                className="absolute bottom-[4%] left-[4%] h-[62%] w-[78%]"
              >
                <Link href={`/product/${product.slug}`} tabIndex={-1} aria-hidden className="relative block h-full w-full">
                  <Image
                    src={jar.src}
                    alt={jar.alt}
                    fill
                    loading="eager"
                    fetchPriority="high"
                    sizes="(min-width: 1024px) 34vw, 80vw"
                    className="object-contain drop-shadow-[0_34px_30px_rgba(23,25,54,0.35)]"
                  />
                </Link>
              </motion.div>
            )}
          </motion.div>

          <div className="relative z-10 flex items-end justify-between gap-4 border-t border-navy-900/10 p-5 md:p-7">
            <div>
              <p className="display text-3xl leading-none text-navy-900 md:text-4xl">For daily chaos.</p>
              <p className="mt-2 text-sm text-navy-900/70">
                {variant.title} · <span className="font-semibold text-navy-900 tabular-nums">{formatMoney(variant.price)}</span>
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-3">
              <AddToCartButton product={product} size="sm" label="Add to cart" className="hidden sm:inline-flex" />
              <Link href={`/product/${product.slug}`} className="label link-underline text-navy-900">
                View product →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
