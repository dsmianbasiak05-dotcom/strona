import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "./section-heading";

const points = [
  {
    title: "Built for daily use",
    text: "Produkty do codziennej rutyny, nie na specjalne okazje. Szybko, prosto, bez kombinowania.",
  },
  {
    title: "Barber inspired",
    text: "Inspirowane pracą barberów i fryzurami, które widzisz na ulicy, nie na wybiegu.",
  },
  {
    title: "Clean design",
    text: "Minimalistyczne opakowania, które dobrze wyglądają na półce i w kadrze.",
  },
  {
    title: "No unnecessary noise",
    text: "Jeden produkt. Zero zbędnych obietnic.",
  },
];

export function WhyMoncre() {
  return (
    <section aria-labelledby="why-title" className="py-20 md:py-32">
      <div className="container-x">
        <SectionHeading id="why-title" index="04" eyebrow="Why MONCRÉ" lines={["No noise.", "Just results."]} />

        <ol className="mt-12 border-t border-navy-900/15 md:mt-20">
          {points.map((p, i) => (
            <li key={p.title} className="group border-b border-navy-900/15">
              <Reveal
                delay={i * 0.05}
                className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 py-7 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
              >
                <span className="display text-2xl text-navy-500 tabular-nums md:col-span-1 md:text-4xl">0{i + 1}</span>
                <h3 className="display text-4xl transition-transform duration-700 ease-[var(--ease-premium)] group-hover:translate-x-2 md:col-span-6 md:text-6xl xl:text-7xl">
                  <span className="text-navy-500/60">/ </span>
                  {p.title}
                </h3>
                <p className="col-start-2 max-w-[42ch] text-[15px] leading-relaxed text-navy-900/75 md:col-span-5 md:col-start-auto md:text-base">
                  {p.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
