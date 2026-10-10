import type { Product } from "@/lib/commerce/types";
import { themeStyle } from "@/lib/theme";
import { Reveal } from "@/components/ui/reveal";

/** Warning-tape rule: diagonal cream stripes, like the edge of a label. */
function Tape() {
  return (
    <div
      aria-hidden
      className="h-2.5 w-full opacity-90 md:h-3"
      style={{
        backgroundImage:
          "repeating-linear-gradient(-45deg, var(--color-product-secondary) 0 9px, transparent 9px 18px)",
      }}
    />
  );
}

/**
 * Poster in the pack's navy: "ATTENTION! Your hair might turn heads." set
 * like the warning panel on the back of the jar, between warning-tape
 * rules, with the pack's supporting line "For daily chaos." on a bordered
 * label after the side of the box. Drawn in type and CSS only.
 */
export function AttentionPoster({ product }: { product: Product }) {
  return (
    <section
      aria-labelledby="attention-title"
      lang="en"
      style={themeStyle(product.theme)}
      className="grain grain-light relative overflow-hidden bg-product text-product-secondary"
    >
      <Tape />
      <div className="container-x relative py-16 md:py-24">
        {/* Concentric rings — a "turning heads" ripple, drawn, not photographed */}
        <svg
          aria-hidden
          viewBox="0 0 400 400"
          className="pointer-events-none absolute -top-24 -right-32 w-[34rem] text-product-secondary/12 md:-top-32 md:right-[28%] md:w-[44rem]"
          fill="none"
          stroke="currentColor"
        >
          {[60, 100, 140, 180].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} strokeWidth="1.5" />
          ))}
        </svg>

        <div className="relative grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <p className="label flex items-center gap-3 text-product-secondary/60" lang="pl">
              <span className="tabular-nums">03</span>
              <span className="inline-block h-px w-8 bg-current" aria-hidden />
              Z etykiety
            </p>
            <h2 id="attention-title" className="display mt-6 text-[19.5vw] leading-[0.86] md:text-[14vw] lg:text-[min(11.8vw,13rem)]">
              Attention!
            </h2>
            <p className="mt-6 max-w-[18ch] text-3xl leading-[1.15] font-bold md:text-5xl md:leading-[1.1]">
              Your hair might turn heads.
            </p>
          </div>

          <Reveal className="lg:col-span-4">
            <div className="border-2 border-product-secondary p-1.5">
              <div className="border border-product-secondary/50">
                <p className="display border-b border-product-secondary/50 px-5 py-4 text-4xl leading-none">MONCRÉ</p>
                <p className="display px-5 py-6 text-[16vw] leading-[0.88] sm:text-7xl lg:text-[min(5.6vw,6rem)]">
                  For daily
                  <br />
                  chaos.
                </p>
                <p className="label flex items-center justify-between border-t border-product-secondary/50 px-5 py-3 text-[10px] text-product-secondary/70" lang="pl">
                  <span>{product.type}</span>
                  <span>Hasło z opakowania</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <Tape />
    </section>
  );
}
