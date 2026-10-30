import type { CSSProperties } from "react";
import { approachContent } from "@/content/home";
import { pillars } from "@/content/approach";
import { sectionIds } from "@/config/navigation";
import { SectionHeader } from "@/components/ui/section-header";

export function Approach() {
  return (
    <section
      id={sectionIds.approach}
      aria-labelledby="approach-title"
      className="on-dark section-y relative overflow-hidden bg-ink text-paper"
    >
      {/* Oversized arch outline — quiet architectural motif */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 600"
        className="pointer-events-none absolute -right-24 -bottom-40 h-[46rem] w-auto text-line-dark lg:right-[-4rem] lg:-bottom-24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M20 600V200a180 180 0 0 1 360 0v400" />
        <path d="M70 600V210a130 130 0 0 1 260 0v390" />
      </svg>

      <div className="container-site relative grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              id="approach-title"
              tone="light"
              eyebrow={approachContent.eyebrow}
              title={approachContent.title}
              titleClassName="max-w-[12ch]"
            />
            <p data-reveal className="mt-8 max-w-[28rem] leading-relaxed text-cream/70">
              {approachContent.lead}
            </p>
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {pillars.map((pillar, index) => (
            <li
              key={pillar.title}
              data-reveal
              style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
              className="grid grid-cols-[4.5rem_1fr] gap-x-6 border-t border-line-dark py-10 last:border-b sm:grid-cols-[7rem_1fr] lg:py-14"
            >
              <span aria-hidden="true" className="font-serif text-[3rem] leading-none text-sand italic sm:text-[4.5rem]">
                {pillar.number}
              </span>
              <div>
                <h3 className="eyebrow text-[0.75rem] text-paper">
                  <span className="sr-only">{index + 1}. </span>
                  {pillar.title}
                </h3>
                <p className="mt-4 max-w-[26ch] font-serif text-[1.625rem] leading-snug text-cream sm:text-[2rem]">
                  {pillar.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
