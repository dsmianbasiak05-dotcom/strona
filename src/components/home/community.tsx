import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ProductVisual } from "@/components/product/product-visual";
import { StylePattern } from "./style-pattern";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

/**
 * ⚠️ PLACEHOLDER FEED
 * No real UGC yet. Tiles are brand-made compositions (packshots, type,
 * textures) that preview the feed's art direction — not customer photos.
 * Replace with real posts (e.g. Instagram Graph API). Never add
 * fabricated testimonials, handles or follower counts here.
 */
interface Tile {
  /** Grid placement (on the <li>). */
  layout?: string;
  /** Surface colours (on the link). */
  className: string;
  content: ReactNode;
}

const tiles: Tile[] = [
  {
    layout: "col-span-2 row-span-2",
    className: "bg-navy-900 text-cream",
    content: (
      <>
        <div aria-hidden className="absolute top-[44%] left-1/2 aspect-square w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-800" />
        <div className="absolute inset-[10%_18%_16%]">
          <ProductVisual shape="jar" label="Matte Clay" size="100 ml" shadow={false} className="drop-shadow-[0_30px_30px_rgba(0,0,0,0.4)]" />
        </div>
        <p className="display absolute bottom-5 left-5 text-4xl leading-[0.9] md:bottom-7 md:left-7 md:text-6xl">
          Your hair.
          <br />
          Your rules.
        </p>
      </>
    ),
  },
  {
    className: "bg-stone",
    content: (
      <div className="absolute inset-[8%_22%]">
        <ProductVisual shape="spray" label="Sea Salt Spray" size="200 ml" />
      </div>
    ),
  },
  {
    className: "bg-cream text-navy-900",
    content: (
      <>
        <div className="absolute inset-0 opacity-60" aria-hidden>
          <StylePattern style="textured" color="#171936" />
        </div>
        <p className="display absolute bottom-4 left-4 text-4xl md:text-5xl">Textured</p>
      </>
    ),
  },
  {
    className: "bg-navy-700 text-cream",
    content: (
      <div className="absolute inset-[10%_24%]">
        <ProductVisual shape="shaker" label="Texture Powder" size="20 g" shadow={false} className="drop-shadow-[0_24px_24px_rgba(0,0,0,0.35)]" />
      </div>
    ),
  },
  {
    className: "bg-navy-900 text-cream",
    content: (
      <>
        <div className="absolute inset-0 opacity-40" aria-hidden>
          <StylePattern style="slick" color="#F4EEDC" />
        </div>
        <p className="display absolute bottom-4 left-4 text-4xl md:text-5xl">Slick</p>
      </>
    ),
  },
];

export function Community() {
  return (
    <section aria-labelledby="community-title" className="pb-20 md:pb-32">
      <div className="container-x">
        <SectionHeading
          id="community-title"
          index="06"
          eyebrow={`Community — ${siteConfig.social.handle}`}
          lines={["The MONCRÉ", "look"]}
          aside={
            <ButtonLink
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="self-start md:self-auto"
              arrow
            >
              Follow MONCRÉ
            </ButtonLink>
          }
        />

        <ul className="mt-10 grid auto-rows-[44vw] grid-cols-2 gap-2 md:mt-16 md:auto-rows-[min(22vw,380px)] md:grid-cols-4 md:gap-3">
          {tiles.map((t, i) => (
            <li key={i} className={cn("relative", t.layout)}>
              <Reveal delay={i * 0.05} className="h-full">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`MONCRÉ na Instagramie — post ${i + 1}`}
                  className={cn("group grain relative block h-full overflow-hidden", t.className)}
                >
                  <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease-premium)] group-hover:scale-[1.06]">
                    {t.content}
                  </div>
                  <span className="absolute inset-0 grid place-items-center bg-navy-900/85 text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="text-center">
                      <span className="display block text-3xl md:text-4xl">{siteConfig.social.handle}</span>
                      <span className="label mt-2 block text-cream/60">View on Instagram ↗</span>
                    </span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-navy-500">
          Podgląd kierunku artystycznego feedu — miejsce na prawdziwe zdjęcia z {siteConfig.social.handle}.
        </p>
      </div>
    </section>
  );
}
