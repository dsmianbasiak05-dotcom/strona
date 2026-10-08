import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StylePattern } from "./style-pattern";
import { SectionHeading } from "./section-heading";
import type { StyleKey } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";

/**
 * ⚠️ PLACEHOLDER GRID
 * No real UGC yet — tiles are abstract placeholders, clearly labelled.
 * Replace `tiles` with real posts (e.g. Instagram Graph API) later.
 * Do not add fabricated testimonials or follower counts.
 */
const tiles: { style: StyleKey; bg: string; color: string; span?: string }[] = [
  { style: "textured", bg: "bg-navy-900", color: "#F4EEDC", span: "md:row-span-2" },
  { style: "slick", bg: "bg-cream", color: "#171936" },
  { style: "volume", bg: "bg-stone", color: "#171936" },
  { style: "natural", bg: "bg-navy-800", color: "#F4EEDC" },
  { style: "matte", bg: "bg-cream-dark", color: "#171936" },
  { style: "volume", bg: "bg-navy-700", color: "#F4EEDC" },
  { style: "slick", bg: "bg-stone", color: "#171936", span: "hidden md:block" },
];

export function Community() {
  return (
    <section aria-labelledby="community-title" className="pb-20 md:pb-32">
      <div className="container-x">
        <SectionHeading
          id="community-title"
          index="06"
          eyebrow="Community"
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

        <ul className="mt-10 grid grid-cols-2 gap-2 md:mt-16 md:grid-cols-4 md:grid-rows-2 md:gap-3">
          {tiles.map((t, i) => (
            <li key={i} className={cn("relative", t.span)}>
              <Reveal delay={i * 0.05} className="h-full">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteConfig.social.handle} na Instagramie — post ${i + 1}`}
                  className={cn(
                    "group grain relative block aspect-square h-full overflow-hidden",
                    i === 0 && "md:aspect-auto",
                    t.bg,
                  )}
                >
                  <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease-premium)] group-hover:scale-110">
                    <StylePattern style={t.style} color={t.color} />
                  </div>
                  <span
                    className={cn(
                      "label absolute bottom-3 left-3 text-[9px] opacity-60",
                      t.color === "#F4EEDC" ? "text-cream" : "text-navy-900",
                    )}
                  >
                    Photo placeholder
                  </span>
                  <span className="absolute inset-0 grid place-items-center bg-navy-900/80 text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="display text-3xl md:text-4xl">{siteConfig.social.handle}</span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
