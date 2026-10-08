"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Product } from "@/lib/commerce/types";
import { lowestPrice } from "@/lib/commerce";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { RevealLines } from "@/components/ui/reveal";
import { ProductVisual } from "@/components/product/product-visual";

const ease = [0.22, 1, 0.36, 1] as const;
const SLIDE_MS = 5200;

const shortName: Record<Product["category"], string> = {
  clay: "Clay",
  powder: "Powder",
  pomade: "Pomade",
  spray: "Spray",
  sets: "Set",
};

/**
 * First screen of the brand. Left: the statement. Right: the line-up —
 * an auto-advancing product stage, so within seconds the visitor sees
 * what MONCRÉ sells (clay, powder, pomade, spray) and what it costs.
 */
export function Hero({ products }: { products: Product[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const product = products[active];

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-14%"]);
  const productY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);

  // Pointer parallax on the floating product (mouse only).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotate = useTransform(sx, [-1, 1], [-3, 3]);
  const tx = useTransform(sx, [-1, 1], [-14, 14]);
  const ty = useTransform(sy, [-1, 1], [-10, 10]);

  const next = () => setActive((i) => (i + 1) % products.length);

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

        {/* Product stage */}
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.3, ease, delay: 0.1 }}
          className="grain grain-light relative flex aspect-[4/5] flex-col overflow-hidden bg-navy-900 text-cream sm:aspect-[4/3] lg:col-span-5 lg:aspect-auto lg:min-h-[600px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            mx.set(0);
            my.set(0);
          }}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onPointerMove={(e) => {
            if (reduce || e.pointerType !== "mouse") return;
            const r = e.currentTarget.getBoundingClientRect();
            mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
            my.set(((e.clientY - r.top) / r.height) * 2 - 1);
          }}
        >
          {/* Stage */}
          <div aria-hidden className="absolute top-[46%] left-1/2 aspect-square w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-800" />
          <div aria-hidden className="absolute top-[46%] left-1/2 aspect-square w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/10" />

          <div className="relative flex items-start justify-between p-5 md:p-7">
            <div className="h-4 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={product.id}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.6, ease }}
                  className="label text-cream/75"
                >
                  {product.type}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="label text-cream/75 tabular-nums">
              0{active + 1} / 0{products.length}
            </p>
          </div>

          <motion.div style={{ y: productY }} className="relative flex-1">
            <motion.div style={{ x: tx, y: ty, rotate }} className="absolute inset-[6%_14%]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 0.96 }}
                  transition={{ duration: 0.9, ease }}
                  className="absolute inset-0"
                >
                  <Link href={`/product/${product.slug}`} tabIndex={-1} aria-hidden className="block h-full w-full">
                    <ProductVisual
                      shape={product.packaging}
                      label={product.type}
                      size={product.variants[0].title}
                      shadow={false}
                      className="drop-shadow-[0_40px_40px_rgba(0,0,0,0.38)]"
                    />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>

          <div className="relative flex items-end justify-between gap-4 px-5 pb-4 md:px-7 md:pb-5">
            <p className="text-sm text-cream/70">
              od <span className="font-semibold text-cream tabular-nums">{formatMoney(lowestPrice(product))}</span>
            </p>
            <Link href={`/product/${product.slug}`} className="label link-underline text-cream">
              View product →
            </Link>
          </div>

          {/* Line-up tabs with progress */}
          <div role="tablist" aria-label="Produkty MONCRÉ" className="relative grid grid-cols-4 border-t border-cream/12">
            {products.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={p.name}
                  onClick={() => setActive(i)}
                  className={cn(
                    "label relative h-12 text-[10px] transition-colors md:h-14 md:text-[11px]",
                    isActive ? "text-cream" : "text-cream/45 hover:text-cream/80",
                    i > 0 && "border-l border-cream/12",
                  )}
                >
                  {shortName[p.category]}
                  <span className="absolute inset-x-0 top-0 h-[2px] bg-cream/10" aria-hidden>
                    {isActive && (
                      <span
                        key={`${active}-${reduce}`}
                        onAnimationEnd={next}
                        className="block h-full origin-left bg-cream"
                        style={
                          reduce
                            ? undefined
                            : {
                                animation: `hero-progress ${SLIDE_MS}ms linear forwards`,
                                animationPlayState: paused ? "paused" : "running",
                              }
                        }
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
