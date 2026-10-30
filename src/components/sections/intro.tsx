import type { CSSProperties } from "react";
import { introContent } from "@/content/home";
import { sectionIds } from "@/config/navigation";
import { SectionHeader } from "@/components/ui/section-header";

export function Intro() {
  return (
    <section id={sectionIds.about} aria-labelledby="intro-title" className="section-y bg-paper">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-8">
        <SectionHeader
          id="intro-title"
          eyebrow={introContent.eyebrow}
          title={introContent.title}
          className="lg:col-span-6"
          titleClassName="max-w-[14ch]"
        />

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-16">
          {introContent.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              data-reveal
              className={index === 0 ? "text-lead text-ink" : "mt-6 leading-relaxed text-stone-deep"}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-12 lg:mt-8 lg:grid-cols-3">
          {introContent.values.map((value, index) => (
            <li
              key={value.title}
              data-reveal
              style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as CSSProperties}
              className="border-t border-line pt-6 pb-10 lg:pb-12"
            >
              <span className="font-serif text-sm text-stone italic">0{index + 1}</span>
              <h3 className="mt-3 font-serif text-[1.625rem] leading-tight">{value.title}</h3>
              <p className="mt-2 max-w-[30ch] text-[0.9375rem] leading-relaxed text-stone-deep">{value.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
