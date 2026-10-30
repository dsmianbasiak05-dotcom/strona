import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { heroContent } from "@/content/home";
import { sectionIds } from "@/config/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { ArchitecturalVisual } from "@/components/ui/architectural-visual";

const heroImage = heroContent.image;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-paper pt-24 lg:pt-32">
      <div className="container-site grid gap-12 pb-14 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pb-20">
        <div className="lg:col-span-7 lg:pb-6 xl:col-span-7">
          <p className="hero-fade eyebrow flex items-center gap-4 text-stone-deep" style={{ "--d": "80ms" } as CSSProperties}>
            <span aria-hidden="true" className="h-px w-8 bg-stone" />
            {heroContent.eyebrow}
          </p>

          <h1 id="hero-title" className="mt-8 font-serif text-display font-normal lg:mt-10">
            {heroContent.titleLines.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span
                  className={`hero-line block ${index === 2 ? "italic" : ""}`}
                  style={{ "--i": index } as CSSProperties}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="hero-fade mt-8 max-w-[34rem] text-lead text-stone-deep lg:mt-10"
            style={{ "--d": "520ms" } as CSSProperties}
          >
            {heroContent.lead}
          </p>

          <div
            className="hero-fade mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            style={{ "--d": "680ms" } as CSSProperties}
          >
            <ButtonLink href={`/#${sectionIds.services}`} withArrow>
              {heroContent.primaryCta}
            </ButtonLink>
            <ButtonLink href={`/#${sectionIds.contact}`} variant="outline">
              {heroContent.secondaryCta}
            </ButtonLink>
          </div>
        </div>

        <div className="hero-fade lg:col-span-5" style={{ "--d": "300ms" } as CSSProperties}>
          <div className="relative mx-auto aspect-[4/5] max-h-[78svh] w-full max-w-[34rem] overflow-hidden rounded-t-[999px] bg-cream lg:ml-auto">
            {heroImage ? (
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            ) : (
              <>
                <ArchitecturalVisual />
                <div className="grain pointer-events-none absolute inset-0" />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container-site">
        <div className="flex items-center justify-between gap-6 border-t border-line py-6">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 eyebrow text-stone-deep" aria-label="Zakres działań">
            {heroContent.disciplines.map((item, index) => (
              <li key={item} className="flex items-center gap-4">
                {index > 0 && <span aria-hidden="true" className="h-px w-5 bg-stone/60" />}
                {item}
              </li>
            ))}
          </ul>
          <Link
            href={`/#${sectionIds.about}`}
            className="group hidden min-h-11 items-center gap-3 eyebrow text-stone-deep transition-colors hover:text-ink sm:inline-flex"
          >
            Przewiń
            <ArrowIcon direction="down" className="transition-transform duration-500 ease-premium group-hover:translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
