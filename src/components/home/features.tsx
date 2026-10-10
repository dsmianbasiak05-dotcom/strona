import type { ReactNode } from "react";
import type { Product } from "@/lib/commerce/types";
import { Reveal } from "@/components/ui/reveal";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2 } as const;

/** Matte: a surface with no highlight — hatched disc. */
function MatteIcon() {
  return (
    <svg viewBox="0 0 64 64" className="size-14 md:size-16" aria-hidden>
      <defs>
        <clipPath id="matte-disc">
          <circle cx="32" cy="32" r="24" />
        </clipPath>
      </defs>
      <circle cx="32" cy="32" r="24" {...stroke} />
      <g clipPath="url(#matte-disc)" {...stroke} strokeWidth={1.25}>
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={-8 + i * 10} y1="64" x2={22 + i * 10} y2="0" />
        ))}
      </g>
    </svg>
  );
}

/** Texture: separated, wavy strands. */
function TextureIcon() {
  return (
    <svg viewBox="0 0 64 64" className="size-14 md:size-16" aria-hidden {...stroke}>
      {[18, 32, 46].map((x) => (
        <path key={x} d={`M${x} 8 c -8 8, 8 16, 0 24 s 8 16, 0 24`} strokeLinecap="round" />
      ))}
    </svg>
  );
}

/** Hold: the pack's HOLD scale — 4 of 5 cells filled. */
function HoldIcon() {
  return (
    <svg viewBox="0 0 64 64" className="size-14 md:size-16" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={3 + i * 12}
          y={22}
          width={9}
          height={20}
          fill={i < 4 ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.75}
        />
      ))}
    </svg>
  );
}

const FEATURES: { icon: ReactNode; title: [string, string] }[] = [
  { icon: <MatteIcon />, title: ["Matowe", "wykończenie"] },
  { icon: <TextureIcon />, title: ["Wyraźna", "tekstura"] },
  { icon: <HoldIcon />, title: ["Średnie do mocnego", "utrwalenie"] },
];

/** The three confirmed properties of No.1 — icons drawn in SVG, no ratings. */
export function Features({ product }: { product: Product }) {
  return (
    <section aria-labelledby="features-title" className="bg-ink py-16 text-bone md:py-24">
      <div className="container-x">
        <h2 id="features-title" className="label flex items-center gap-3 text-bone/55">
          <span className="tabular-nums">04</span>
          <span className="inline-block h-px w-8 bg-current" aria-hidden />
          Efekt MONCRÉ {product.type}
        </h2>

        <ul className="mt-10 grid border-t border-bone/15 md:mt-14 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <li key={f.title.join(" ")} className="border-b border-bone/15 md:border-b-0 md:not-first:border-l md:not-first:pl-8 lg:not-first:pl-12">
              <Reveal delay={i * 0.08} className="flex items-center gap-6 py-8 md:flex-col md:items-start md:gap-10 md:py-12">
                <span className="shrink-0 text-bone">{f.icon}</span>
                <p className="display text-[9.5vw] leading-[1] md:text-[3.4vw] lg:text-[min(3.2vw,3.5rem)]">
                  <span className="label mb-3 block text-[11px] text-bone/45 tabular-nums">0{i + 1}</span>
                  {f.title[0]}
                  <br />
                  {f.title[1]}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
