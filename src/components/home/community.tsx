import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import Image from "next/image";
import { StylePattern } from "./style-pattern";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

/**
 * ⚠️ PLACEHOLDER FEED
 * No real UGC yet. Tiles use official MONCRÉ No.1 packshots, type and
 * textures to preview the feed's art direction — not customer photos.
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

const shot = (name: string, alt: string, sizes: string) => (
  <Image
    src={`/images/products/matte-clay/${name}.png`}
    alt={alt}
    fill
    sizes={sizes}
    className="object-contain drop-shadow-[0_22px_22px_rgba(23,25,54,0.25)]"
  />
);

const tiles: Tile[] = [
  {
    layout: "col-span-2 row-span-2",
    className: "bg-stone text-navy-900",
    content: (
      <>
        <div className="absolute inset-[10%_8%_30%]">
          {shot("jar-front", "MONCRÉ No.1 — słoik", "(min-width: 768px) 46vw, 90vw")}
        </div>
        <p className="display absolute bottom-5 left-5 text-4xl leading-[0.9] md:bottom-7 md:left-7 md:text-6xl">
          For daily
          <br />
          chaos.
        </p>
      </>
    ),
  },
  {
    className: "bg-cream",
    content: <div className="absolute inset-[14%_10%]">{shot("box-side", "Pudełko MONCRÉ z monogramem M", "25vw")}</div>,
  },
  {
    className: "bg-cream-dark text-navy-900",
    content: (
      <>
        <div className="absolute inset-0 opacity-60" aria-hidden>
          <StylePattern style="textured" color="#171936" />
        </div>
        <p className="display absolute bottom-4 left-4 text-4xl md:text-5xl">No.1</p>
      </>
    ),
  },
  {
    className: "bg-paper",
    content: <div className="absolute inset-[14%_8%]">{shot("jar-side", "Słoik MONCRÉ No.1 — bok", "25vw")}</div>,
  },
  {
    className: "bg-navy-900 text-cream",
    content: (
      <>
        <div className="absolute inset-0 opacity-40" aria-hidden>
          <StylePattern style="slick" color="#F4EEDC" />
        </div>
        <p className="display absolute bottom-4 left-4 text-4xl md:text-5xl">MONCRÉ</p>
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
          index="05"
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
