"use client";

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
import { ButtonLink } from "@/components/ui/button";
import { RevealLines } from "@/components/ui/reveal";
import { ProductVisual } from "@/components/product/product-visual";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Scroll parallax: type drifts slower than the product panel.
  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const productY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const productScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.92]);

  // Pointer parallax on the floating product (desktop only).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotate = useTransform(sx, [-1, 1], [-3, 3]);
  const tx = useTransform(sx, [-1, 1], [-14, 14]);
  const ty = useTransform(sy, [-1, 1], [-10, 10]);

  return (
    <section
      ref={ref}
      aria-label="MONCRÉ"
      className="relative overflow-hidden pt-16 md:pt-20"
    >
      <div className="container-x relative grid min-h-[calc(100svh-4rem)] grid-cols-1 gap-y-8 pt-6 pb-10 md:min-h-[calc(100svh-5rem)] md:pb-14 lg:grid-cols-12 lg:gap-x-8 lg:pt-10">
        {/* Copy column */}
        <motion.div style={{ y: typeY }} className="relative z-10 flex flex-col lg:col-span-7 lg:justify-between">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="label flex items-center gap-3 text-navy-500"
          >
            <span className="inline-block h-px w-8 bg-current" aria-hidden />
            Men&apos;s hair styling — Vol. 01
          </motion.p>

          <RevealLines
            as="h1"
            animateOnMount
            delay={0.15}
            className="display mt-5 text-[19.5vw] text-navy-900 sm:text-[16vw] lg:mt-0 lg:text-[min(11.6vw,15.5rem)]"
            lines={["Your hair.", "Your rules."]}
            srLabel="Your hair. Your rules. MONCRÉ — kosmetyki do stylizacji męskich włosów"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.7 }}
            className="mt-6 flex flex-col gap-6 md:mt-10 lg:mt-0 lg:flex-row lg:items-end lg:justify-between"
          >
            <p className="max-w-[30ch] text-[15px] leading-relaxed text-navy-900/80 md:text-lg">
              Professional styling products for everyday control.
            </p>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
              <ButtonLink href="/shop" size="lg" className="px-4 sm:px-9" arrow>
                Shop products
              </ButtonLink>
              <ButtonLink href="/about" size="lg" variant="secondary" className="px-4 sm:px-9">
                Discover MONCRÉ
              </ButtonLink>
            </div>
          </motion.div>
        </motion.div>

        {/* Product panel */}
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.3, ease, delay: 0.1 }}
          className="grain grain-light relative aspect-[4/5] overflow-hidden bg-navy-900 text-cream sm:aspect-[4/3] lg:col-span-5 lg:aspect-auto lg:min-h-[560px]"
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
          {/* Spotlight disc — gives the product a stage */}
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-800"
          />
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/10"
          />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-7">
            <p className="label text-cream/70">Matte Clay</p>
            <p className="label text-cream/70 tabular-nums">01 / 04</p>
          </div>

          <motion.div
            style={{ y: productY, scale: productScale }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              style={{ x: tx, y: ty, rotate }}
              className="relative h-[80%] w-[80%]"
            >
              <motion.div
                className="h-full w-full"
                animate={reduce ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <ProductVisual shape="jar" label="Matte Clay" size="100 ml" className="-translate-y-[4%] scale-[1.28] drop-shadow-[0_40px_40px_rgba(0,0,0,0.35)]" shadow={false} />
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-7">
            <p className="label text-cream/50">Styling essentials</p>
            <Link href="/product/matte-clay" className="label link-underline text-cream">
              View product →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
