"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { renders } from "@/data/media";
import { RevealLines } from "@/components/ui/reveal";

/**
 * The line printed on the pack, used as a brand statement. The lid render
 * is masked to its circular edge (the studio background is clipped, the
 * render itself is untouched) and turns slightly with scroll.
 */
export function DailyChaos() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -18, reduce ? 0 : 18]);

  return (
    <section
      ref={ref}
      aria-labelledby="chaos-title"
      className="grain grain-light relative overflow-hidden bg-navy-900 py-20 text-cream md:py-28 lg:py-36"
    >
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="label flex items-center gap-3 text-cream/55">
            <span className="tabular-nums">04</span>
            <span className="inline-block h-px w-8 bg-current" aria-hidden />
            Printed on the pack
          </p>
          <div id="chaos-title" className="mt-6">
            <RevealLines
              lines={["For", "daily", "chaos."]}
              srLabel="For daily chaos."
              className="display text-[27vw] leading-[0.82] md:text-[17vw] lg:text-[min(12.5vw,13.5rem)]"
            />
          </div>
        </div>
        <div className="mx-auto w-[72%] max-w-[520px] lg:col-span-5 lg:w-full">
          <motion.div style={{ rotate }} className="relative aspect-square">
            <Image
              src={renders.lid.src}
              alt={renders.lid.alt}
              fill
              sizes="(min-width: 1024px) 36vw, 72vw"
              quality={85}
              className="object-cover [clip-path:circle(37.3%_at_50%_50%)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
