"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { PackagingShape, StyleKey } from "@/lib/commerce/types";
import { ProductVisual } from "@/components/product/product-visual";
import { cn } from "@/lib/utils";
import { pluralProducts } from "@/lib/format";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "./section-heading";
import { StylePattern } from "./style-pattern";

interface StyleItem {
  key: StyleKey;
  label: string;
  line: string;
  count: number;
  product?: { name: string; shape: PackagingShape; size: string };
}

const tones: Record<StyleKey, { bg: string; fg: string; pattern: string; muted: string }> = {
  matte: { bg: "bg-navy-900", fg: "text-cream", pattern: "#F4EEDC", muted: "text-cream/60" },
  textured: { bg: "bg-cream", fg: "text-navy-900", pattern: "#171936", muted: "text-navy-900/60" },
  volume: { bg: "bg-navy-800", fg: "text-cream", pattern: "#F4EEDC", muted: "text-cream/60" },
  slick: { bg: "bg-stone", fg: "text-navy-900", pattern: "#171936", muted: "text-navy-900/60" },
  natural: { bg: "bg-navy-700", fg: "text-cream", pattern: "#F4EEDC", muted: "text-cream/60" },
};

export function ShopByStyle({ items }: { items: StyleItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <section id="style" aria-labelledby="style-title" className="scroll-mt-20 pb-20 md:pb-32">
      <div className="container-x">
        <SectionHeading
          id="style-title"
          index="02"
          eyebrow="Shop by style"
          lines={["What's your", "style?"]}
          aside={
            <p className="max-w-[32ch] text-[15px] leading-relaxed text-navy-900/75">
              Wybierz efekt, nie produkt. Pokażemy Ci, czego potrzebujesz.
            </p>
          }
        />

        {/* Desktop — expanding panels */}
        <Reveal className="mt-16 hidden h-[min(78vh,760px)] gap-2 lg:flex">
          {items.map((item, i) => {
            const tone = tones[item.key];
            const isActive = active === i;
            return (
              <Link
                key={item.key}
                href={`/shop?style=${item.key}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-label={`${item.label} — ${item.count} ${pluralProducts(item.count)}`}
                className={cn(
                  "group grain relative overflow-hidden transition-[flex-grow] duration-[900ms] ease-[var(--ease-premium)]",
                  tone.bg,
                  tone.fg,
                  isActive ? "grow-[3.2]" : "grow",
                )}
                style={{ flexBasis: 0 }}
              >
                <div
                  className={cn(
                    "absolute inset-0 transition-[transform,opacity] duration-[1200ms] ease-[var(--ease-premium)]",
                    isActive ? "scale-100 opacity-100" : "scale-110 opacity-50",
                  )}
                >
                  <StylePattern style={item.key} color={tone.pattern} />
                </div>

                <span className="label absolute top-6 left-6 tabular-nums">0{i + 1}</span>
                <ArrowUpRight
                  className={cn(
                    "absolute top-5 right-5 size-6 transition-all duration-700 ease-[var(--ease-premium)]",
                    isActive ? "translate-x-0 translate-y-0 opacity-100" : "-translate-x-2 translate-y-2 opacity-0",
                  )}
                  strokeWidth={1.4}
                />

                <span className="display absolute bottom-5 left-4 text-[min(7.4vw,8.5rem)] leading-[0.8] [writing-mode:vertical-rl] rotate-180">
                  {item.label}
                </span>

                {item.product && (
                  <div
                    aria-hidden
                    className={cn(
                      "absolute top-[14%] right-[8%] bottom-[24%] left-[30%] transition-all duration-[1000ms] ease-[var(--ease-premium)]",
                      isActive ? "translate-y-0 opacity-100 delay-150" : "translate-y-8 opacity-0",
                    )}
                  >
                    <ProductVisual
                      shape={item.product.shape}
                      label={item.product.name}
                      size={item.product.size}
                      shadow={false}
                      className="drop-shadow-[0_30px_30px_rgba(0,0,0,0.3)]"
                    />
                  </div>
                )}

                <div
                  className={cn(
                    "absolute right-6 bottom-6 max-w-[30ch] text-right transition-all duration-700 ease-[var(--ease-premium)]",
                    isActive ? "translate-y-0 opacity-100 delay-200" : "translate-y-4 opacity-0",
                  )}
                >
                  <p className="text-[15px] leading-snug">{item.line}</p>
                  {item.product && <p className={cn("mt-1 text-[13px]", tone.muted)}>Key product: {item.product.name}</p>}
                  <p className={cn("label mt-3", tone.muted)}>
                    {item.count} {pluralProducts(item.count)} — Shop →
                  </p>
                </div>
              </Link>
            );
          })}
        </Reveal>

        {/* Mobile / tablet — stacked tiles */}
        <ul className="mt-10 grid gap-2 sm:grid-cols-2 lg:hidden">
          {items.map((item, i) => {
            const tone = tones[item.key];
            return (
              <li key={item.key} className={cn(i === 0 && "sm:col-span-2")}>
                <Reveal delay={i * 0.04}>
                  <Link
                    href={`/shop?style=${item.key}`}
                    className={cn(
                      "grain relative flex h-40 items-end justify-between overflow-hidden p-5 active:scale-[0.99] sm:h-56",
                      tone.bg,
                      tone.fg,
                    )}
                  >
                    <div className="absolute inset-0 opacity-50" aria-hidden>
                      <StylePattern style={item.key} color={tone.pattern} />
                    </div>
                    <span className="label absolute top-5 left-5 tabular-nums">0{i + 1}</span>
                    <span className="relative">
                      <span className="display block text-6xl leading-[0.85]">{item.label}</span>
                      <span className={cn("mt-2 block text-[13px]", tone.muted)}>{item.line}</span>
                    </span>
                    <ArrowUpRight className="relative size-6 shrink-0" strokeWidth={1.4} />
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
