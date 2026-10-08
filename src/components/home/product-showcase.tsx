"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { Product } from "@/lib/commerce/types";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { ButtonLink } from "@/components/ui/button";
import { formatMoney } from "@/lib/format";

function Step({
  progress,
  range,
  index,
  text,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  index: number;
  text: string;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [24, 0]);
  return (
    <motion.li style={{ opacity, y }}>
      <span className="label text-navy-900/50 tabular-nums">Step 0{index + 1}</span>
      <p className="mt-2 max-w-[22ch] text-[15px] leading-snug text-navy-900 md:text-base">{text}</p>
    </motion.li>
  );
}

/**
 * Campaign-style scroll scene on a studio-grey stage (echoing the official
 * renders): the jar grows while oversized type slides behind it and the
 * usage steps from the pack reveal one by one.
 */
export function ProductShowcase({ product }: { product: Product }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const textX = useTransform(scrollYProgress, [0, 1], ["6%", "-62%"]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.8, 1, 0.96]);
  const rotate = useTransform(scrollYProgress, [0, 0.45], [-4, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.78, 0.92], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.78, 0.92], [20, 0]);

  // Source renders carry ~360px of real detail — the stage is capped so the
  // packshot never upscales into visible aliasing.
  const image = product.images[0];
  const variant = product.variants[0];
  const title = product.type;
  const steps = product.howToUse.slice(0, 3);
  if (!image) return null;

  const packshot = (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes="(min-width: 768px) 540px, 84vw"
      className="object-contain drop-shadow-[0_40px_36px_rgba(23,25,54,0.35)]"
    />
  );

  if (reduce) {
    return (
      <section aria-labelledby="showcase-title" className="bg-stone py-24 text-navy-900">
        <div className="container-x grid items-center gap-10 md:grid-cols-2">
          <div className="relative mx-auto aspect-[5/4] w-full max-w-xl">{packshot}</div>
          <div>
            <h2 id="showcase-title" className="display text-7xl">{title}</h2>
            <ol className="mt-8 space-y-4">
              {steps.map((s, i) => (
                <li key={i}>
                  <span className="label text-navy-900/50">Step 0{i + 1}</span>
                  <p className="mt-1">{s}</p>
                </li>
              ))}
            </ol>
            <ButtonLink href={`/product/${product.slug}`} className="mt-10" arrow>
              Shop {title}
            </ButtonLink>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-labelledby="showcase-title" className="relative h-[220vh] bg-stone text-navy-900 md:h-[300vh]">
      <div className="grain sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="container-x flex items-start justify-between pt-20 md:pt-28">
          <p className="label flex items-center gap-3 text-navy-900/60">
            <span className="tabular-nums">04</span>
            <span className="inline-block h-px w-8 bg-current" aria-hidden />
            In focus
          </p>
          <p className="label text-navy-900/60">{variant.title}</p>
        </div>

        {/* Oversized sliding type behind the product */}
        <motion.p
          aria-hidden
          style={{ x: textX }}
          className="display pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 text-[44vw] leading-none whitespace-nowrap text-paper/70 md:text-[30vw]"
        >
          For daily chaos — For daily chaos
        </motion.p>

        <motion.div
          style={{ scale, rotate }}
          className="absolute inset-x-0 top-[24%] bottom-[36%] mx-auto w-[84vw] max-w-[540px] md:top-[20%] md:bottom-[22%]"
        >
          {packshot}
        </motion.div>

        <h2
          id="showcase-title"
          className="display container-x relative mt-4 text-[14vw] md:absolute md:bottom-10 md:left-0 md:mt-0 md:text-[8vw] xl:text-[8rem]"
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
            <AddToCartButton
              product={product}
              size="md"
              className="md:h-16 md:px-10"
              label={`Add ${variant.title} — ${formatMoney(variant.price)}`}
            />
            <ButtonLink href={`/product/${product.slug}`} variant="secondary" size="md" className="md:h-16 md:px-10">
              Details
            </ButtonLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
