"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { Product } from "@/lib/commerce/types";
import { ProductVisual } from "@/components/product/product-visual";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { ButtonLink } from "@/components/ui/button";
import { formatMoney } from "@/lib/format";

function Step({
  progress,
  range,
  index,
  text,
  className,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  index: number;
  text: string;
  className?: string;
}) {
  const opacity = useTransform(progress, [range[0], range[1]], [0, 1]);
  const y = useTransform(progress, [range[0], range[1]], [24, 0]);
  return (
    <motion.li style={{ opacity, y }} className={className}>
      <span className="label text-cream/50 tabular-nums">Step 0{index + 1}</span>
      <p className="mt-2 max-w-[22ch] text-[15px] leading-snug text-cream md:text-base">{text}</p>
    </motion.li>
  );
}

/**
 * Campaign-style scroll scene: the product grows on a sticky stage while
 * oversized type slides behind it and usage steps reveal one by one.
 */
export function ProductShowcase({ product }: { product: Product }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const textX = useTransform(scrollYProgress, [0, 1], ["8%", "-58%"]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.72, 1.05, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.45], [-6, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.78, 0.92], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.78, 0.92], [20, 0]);

  const title = product.type;
  const steps = product.howToUse.slice(0, 3);

  if (reduce) {
    return (
      <section aria-labelledby="showcase-title" className="bg-navy-900 py-24 text-cream">
        <div className="container-x grid items-center gap-10 md:grid-cols-2">
          <div className="mx-auto aspect-[4/5] w-full max-w-md">
            <ProductVisual shape={product.packaging} label={title} size={product.variants[0].title} shadow={false} />
          </div>
          <div>
            <h2 id="showcase-title" className="display text-7xl">{title}</h2>
            <ol className="mt-8 space-y-4">
              {steps.map((s, i) => (
                <li key={i}>
                  <span className="label text-cream/50">Step 0{i + 1}</span>
                  <p className="mt-1">{s}</p>
                </li>
              ))}
            </ol>
            <ButtonLink href={`/product/${product.slug}`} variant="light" className="mt-10" arrow>
              Shop {title}
            </ButtonLink>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-labelledby="showcase-title" className="relative h-[220vh] bg-navy-900 text-cream md:h-[300vh]">
      <div className="grain grain-light sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="container-x flex items-start justify-between pt-20 md:pt-28">
          <p className="label flex items-center gap-3 text-cream/55">
            <span className="tabular-nums">04</span>
            <span className="inline-block h-px w-8 bg-current" aria-hidden />
            In focus
          </p>
          <p className="label text-cream/55">{product.variants[0].title}</p>
        </div>

        {/* Oversized sliding type behind the product */}
        <motion.p
          aria-hidden
          style={{ x: textX }}
          className="display pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 text-[44vw] leading-none whitespace-nowrap text-navy-800 md:text-[30vw]"
        >
          {title} — {title}
        </motion.p>

        <motion.div
          style={{ scale, rotate }}
          className="absolute inset-x-0 top-[14%] bottom-[22%] mx-auto w-[86vw] max-w-[640px] md:top-[10%] md:bottom-[8%]"
        >
          <ProductVisual
            shape={product.packaging}
            label={title}
            size={product.variants[0].title}
            shadow={false}
            className="drop-shadow-[0_50px_50px_rgba(0,0,0,0.45)]"
          />
        </motion.div>

        <h2
          id="showcase-title"
          className="display container-x relative mt-4 text-[16vw] md:absolute md:bottom-10 md:left-0 md:mt-0 md:text-[9vw] xl:text-[8.5rem]"
        >
          {title}
        </h2>

        <ol className="container-x absolute inset-x-0 bottom-24 grid grid-cols-3 gap-3 md:top-1/2 md:right-0 md:bottom-auto md:left-auto md:w-auto md:-translate-y-1/2 md:grid-cols-1 md:gap-10">
          {steps.map((s, i) => (
            <Step key={i} progress={scrollYProgress} range={[0.18 + i * 0.16, 0.3 + i * 0.16]} index={i} text={s} />
          ))}
        </ol>

        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute inset-x-4 bottom-6 md:inset-x-auto md:right-12 md:bottom-12"
        >
          <div className="grid grid-cols-[1fr_auto] items-center gap-2 md:flex md:gap-3">
            <AddToCartButton product={product} variant="light" size="md" className="md:h-16 md:px-10" label={`Add ${product.variants[0].title} — ${formatMoney(product.variants[0].price)}`} />
            <ButtonLink href={`/product/${product.slug}`} variant="outline-light" size="md" className="md:h-16 md:px-10">
              Details
            </ButtonLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
