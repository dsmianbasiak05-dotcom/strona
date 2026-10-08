"use client";

import Link from "next/link";
import { getImageProps } from "next/image";
import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Product } from "@/lib/commerce/types";
import { productImage, productPrice, productSize } from "@/lib/commerce";
import { formatMoney } from "@/lib/format";
import { themeStyle } from "@/lib/theme";
import { ButtonLink } from "@/components/ui/button";
import { StatusBadge } from "@/components/products/coming-soon-badge";

const ease = [0.22, 1, 0.36, 1] as const;
const LINES = ["Your hair.", "Your rules."];

/**
 * Brand campaign opener. The brand line sits on the empty studio band of
 * the featured product's render (desktop: landscape `set`, phone: `front`
 * crop) — the image is the stage, the type is MONCRÉ talking.
 * Which product is featured is data; the layout is not tied to No.1.
 */
export function Hero({ product }: { product: Product }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const size = productSize(product);
  const price = productPrice(product);
  const wide = productImage(product, "set");
  const tall = productImage(product, "front");

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);

  let art: { wideSet?: string; tallSet?: string; img: Omit<ReturnType<typeof getImageProps>["props"], "srcSet"> } | null = null;
  if (wide && tall) {
    const {
      props: { srcSet: wideSet },
    } = getImageProps({ alt: wide.alt, src: wide.src, width: wide.width, height: wide.height, quality: 85, sizes: "100vw" });
    const {
      props: { srcSet: tallSet, ...img },
    } = getImageProps({
      alt: tall.alt,
      src: tall.src,
      width: tall.width,
      height: tall.height,
      quality: 85,
      sizes: "100vw",
      loading: "eager",
      fetchPriority: "high",
    });
    art = { wideSet, tallSet, img };
  }

  const headline = (
    <h1 className="display text-ink">
      <span className="sr-only">Your hair. Your rules. MONCRÉ — kosmetyki do stylizacji męskich włosów</span>
      <span aria-hidden className="block">
        {LINES.map((line, i) => (
          <span key={line} className="-mt-[0.14em] block overflow-hidden pt-[0.14em] pb-[0.02em] lg:inline-block lg:pr-[0.26em]">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.05, ease, delay: 0.2 + i * 0.09 }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    </h1>
  );

  const ctas = (
    <div className="grid gap-2 sm:grid-cols-2 lg:flex lg:gap-3">
      <ButtonLink href={`/product/${product.slug}`} size="lg" className="w-full lg:w-auto" arrow>
        Poznaj {product.type}
      </ButtonLink>
      <ButtonLink href="/about" size="lg" variant="secondary" className="w-full lg:w-auto lg:bg-paper/60 lg:backdrop-blur-sm">
        Poznaj MONCRÉ
      </ButtonLink>
    </div>
  );

  const featured = (
    <Link href={`/product/${product.slug}`} className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="label text-ink">
        <span aria-hidden className="mr-2 inline-block size-2.5 bg-product align-[-1px]" />
        MONCRÉ {product.type} · {product.categoryLabel}
        {size && <> · {size}</>}
        {price && <> · {formatMoney(price)}</>}
      </span>
      <StatusBadge product={product} />
    </Link>
  );

  return (
    <section
      ref={ref}
      style={themeStyle(product.theme)}
      aria-label="MONCRÉ — your hair, your rules"
      className="relative overflow-hidden pt-14 md:pt-[72px]"
    >
      {/* Tablet: headline above the image */}
      <div className="container-x hidden pt-8 pb-6 md:block lg:hidden">
        <p className="label mb-4 text-graphite">MONCRÉ — stylizacja męskich włosów</p>
        <div className="text-[13.5vw] leading-[0.84]">{headline}</div>
      </div>

      <div className="relative">
        {/* Stage — the product's render on its own studio surface */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease }}
          className="relative aspect-[3/4] w-full overflow-hidden bg-product-bg [background-image:radial-gradient(ellipse_75%_70%_at_50%_45%,#ebeae6_0%,#e2e1dd_55%,#d6d6d1_100%)] md:aspect-[16/9] lg:max-h-[calc(100svh-72px)] lg:min-h-[560px]"
        >
          {art && (
            <motion.div style={{ scale: imageScale }} className="absolute inset-0 origin-[50%_62%]">
              {/* ~10% smaller than full-bleed, edges feathered into the studio surface → more air around the product */}
              <div className="absolute inset-0 scale-[0.9] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_52%,#000_74%,transparent_100%)]">
              <picture>
                <source media="(min-width: 768px)" srcSet={art.wideSet} />
                <img
                  {...art.img}
                  srcSet={art.tallSet}
                  alt={`${product.name} — opakowanie`}
                  className="h-full w-full object-cover [object-position:var(--focus-tall)] md:[object-position:var(--focus-wide)]"
                  style={
                    {
                      width: "100%",
                      height: "100%",
                      "--focus-tall": tall?.focus ?? "50% 50%",
                      "--focus-wide": wide?.focus ?? "50% 50%",
                    } as CSSProperties
                  }
                />
              </picture>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Phone: headline on the empty studio band above the jar */}
        <div className="absolute inset-x-0 top-0 md:hidden">
          <div className="container-x pt-5 text-[14.6vw] leading-[0.84]">{headline}</div>
        </div>

        {/* Desktop: brand line on the top band, actions on the bottom band */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <div className="container-x flex h-full flex-col justify-between pt-7 pb-7 xl:pt-9 xl:pb-9">
            <div className="pointer-events-auto">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="label mb-4 text-ink/70"
              >
                MONCRÉ — stylizacja męskich włosów
              </motion.p>
              <div className="whitespace-nowrap text-[min(8.8vw,9.4rem)] leading-[0.84]">{headline}</div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.65 }}
              className="pointer-events-auto flex items-end justify-between gap-8"
            >
              <div>
                {ctas}
              </div>
              <div className="hidden xl:block">{featured}</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Below the stage: phone/tablet copy + actions; lg shows the product line */}
      <div className="container-x pt-6 pb-10 md:pt-8 md:pb-14 lg:pt-5 lg:pb-8 xl:hidden">
        <div className="lg:hidden">
          <div>{featured}</div>
          <div className="mt-6">{ctas}</div>
        </div>
        <div className="hidden lg:block">{featured}</div>
      </div>
    </section>
  );
}
