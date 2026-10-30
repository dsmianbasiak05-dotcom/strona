import Image from "next/image";
import type { CSSProperties } from "react";
import { projects } from "@/content/portfolio";
import { portfolioContent } from "@/content/home";
import { sectionIds } from "@/config/navigation";
import type { Project } from "@/types/content";
import { SectionHeader } from "@/components/ui/section-header";
import { ButtonLink } from "@/components/ui/button-link";
import { MaterialBoard } from "@/components/ui/material-board";

/** Ready for real projects; add entries to src/content/portfolio.ts. */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <li data-reveal style={{ "--reveal-delay": `${(index % 2) * 100}ms` } as CSSProperties}>
      <article>
        <div className="relative aspect-[4/3] overflow-hidden bg-cream">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <p className="mt-5 eyebrow text-stone-deep">{project.spaceType}</p>
        <h3 className="mt-2 font-serif text-h3">{project.title}</h3>
        <p className="mt-3 max-w-[48ch] leading-relaxed text-stone-deep">{project.excerpt}</p>
      </article>
    </li>
  );
}

export function Portfolio() {
  const hasProjects = projects.length > 0;

  return (
    <section id={sectionIds.portfolio} aria-labelledby="portfolio-title" className="section-y bg-paper">
      <div className="container-site">
        {hasProjects ? (
          <>
            <SectionHeader id="portfolio-title" eyebrow={portfolioContent.eyebrow} title={portfolioContent.title} />
            <ul className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
              {projects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </ul>
          </>
        ) : (
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <SectionHeader
                id="portfolio-title"
                eyebrow={portfolioContent.eyebrow}
                title={portfolioContent.title}
                titleClassName="max-w-[13ch]"
              />
              <p data-reveal className="mt-8 max-w-[30rem] leading-relaxed text-stone-deep">
                {portfolioContent.emptyState}
              </p>
              <div data-reveal className="mt-10">
                <ButtonLink href={`/#${sectionIds.contact}`} variant="text" withArrow>
                  {portfolioContent.emptyCta}
                </ButtonLink>
              </div>
            </div>
            <div data-reveal="fade" className="w-full max-w-[34rem] lg:col-span-6 lg:col-start-7 lg:max-w-none">
              <MaterialBoard />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
