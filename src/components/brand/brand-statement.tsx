"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";

const lines = [["Built", "for"], ["the", "way"], ["you", "wear", "it."]];
const words = lines.flat();

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block pr-[0.22em]">
      {children}
    </motion.span>
  );
}

export function BrandStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });

  let wordIndex = 0;

  return (
    <section aria-labelledby="statement-title" className="section-y bg-bone">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
        <p className="label flex items-center gap-3 text-graphite lg:col-span-12">
          <span className="tabular-nums">02</span>
          <span className="inline-block h-px w-8 bg-current" aria-hidden />
          The brand
        </p>
        <div ref={ref} className="lg:col-span-8">
          <h2 id="statement-title" className="display text-[16vw] leading-[0.9] md:text-[13vw] lg:text-[10.5vw] 2xl:text-[11rem]">
            <span className="sr-only">Built for the way you wear it.</span>
            <span aria-hidden>
              {lines.map((line, li) => (
                <span key={li} className="block">
                  {line.map((w) => {
                    const i = wordIndex++;
                    const start = i / words.length;
                    return (
                      <Word key={w + i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
                        {w}
                      </Word>
                    );
                  })}
                </span>
              ))}
            </span>
          </h2>
        </div>
        <Reveal className="flex flex-col justify-end gap-8 lg:col-span-4 lg:pb-4">
          <p className="max-w-[38ch] text-lg leading-relaxed md:text-xl">
            MONCRÉ creates styling essentials designed for modern men&apos;s hair. Simple products. Strong results. No
            unnecessary noise.
          </p>
          <ButtonLink href="/about" variant="secondary" className="self-start" arrow>
            Our story
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
