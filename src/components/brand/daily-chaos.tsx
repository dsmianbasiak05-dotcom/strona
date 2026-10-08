"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Product } from "@/lib/commerce/types";
import { productImage } from "@/lib/commerce";
import { RevealLines } from "@/components/ui/reveal";

/**
 * "For daily chaos." — the line printed on MONCRÉ packs, used as a BRAND
 * statement on the brand's ink surface. If the given product has a `lid`
 * render it is shown masked to its circular edge (studio background
 * clipped, render untouched) and turns slightly with scroll.
 */
export function DailyChaos({ product }: { product?: Product }) {
  const lid = product ? productImage(product, "lid") : undefined;
  const hasLid = lid?.role === "lid";
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -18, reduce ? 0 : 18]);

  return (
    <section
      ref={ref}
      aria-labelledby="chaos-title"
      className="section-y grain grain-light relative overflow-hidden bg-ink text-bone"
    >
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="label flex items-center gap-3 text-bone/55">
            <span className="tabular-nums">04</span>
            <span className="inline-block h-px w-8 bg-current" aria-hidden />
            MONCRÉ
          </p>
          <div id="chaos-title" className="mt-6">
            <RevealLines
              lines={["For", "daily", "chaos."]}
              srLabel="For daily chaos."
              className="display text-[27vw] leading-[0.82] md:text-[17vw] lg:text-[min(12.5vw,13.5rem)]"
            />
          </div>
        </div>
        {hasLid && lid && (
        <div className="mx-auto w-[72%] max-w-[520px] lg:col-span-5 lg:w-full">
          <motion.div style={{ rotate }} className="relative aspect-square">
            <Image
              src={lid.src}
              alt={lid.alt}
              fill
              sizes="(min-width: 1024px) 36vw, 72vw"
              quality={85}
              className="object-cover [clip-path:circle(37.3%_at_50%_50%)]"
            />
          </motion.div>
        </div>
        )}
      </div>
    </section>
  );
}
