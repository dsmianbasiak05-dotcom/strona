import Image from "next/image";
import { renders, type Render } from "@/data/media";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

interface Frame {
  render: Render;
  caption: string;
  /** Aspect + object-position chosen per render so the pack is never cut. */
  frame: string;
  position: string;
  layout: string;
  sizes: string;
}

const frames: Frame[] = [
  {
    render: renders.box,
    caption: "Pudełko",
    frame: "aspect-[5/4]",
    position: "object-[50%_55%]",
    layout: "lg:col-span-7",
    sizes: "(min-width: 1024px) 56vw, 100vw",
  },
  {
    render: renders.jarBack,
    caption: "Tył słoika — sposób użycia",
    frame: "aspect-[4/5]",
    position: "object-[50%_52%]",
    layout: "lg:col-span-5 lg:mt-32",
    sizes: "(min-width: 1024px) 40vw, 100vw",
  },
];

/** Editorial pair of official renders — deliberately not a full gallery. */
export function ProductVisuals() {
  return (
    <section aria-labelledby="visuals-title" className="py-20 md:py-28 lg:py-36">
      <div className="container-x">
        <SectionHeading id="visuals-title" index="03" eyebrow="The pack" lines={["Navy.", "Cream. No.1."]} />
        <div className="mt-10 grid gap-10 md:mt-16 lg:grid-cols-12 lg:gap-8">
          {frames.map((f, i) => (
            <Reveal key={f.render.src} delay={i * 0.1} className={f.layout}>
              <figure className="group">
                <div className={cn("relative overflow-hidden bg-[#e3e2de]", f.frame)}>
                  <Image
                    src={f.render.src}
                    alt={f.render.alt}
                    fill
                    sizes={f.sizes}
                    quality={85}
                    className={cn(
                      "object-cover transition-transform duration-[1400ms] ease-[var(--ease-premium)] group-hover:scale-[1.03]",
                      f.position,
                    )}
                  />
                </div>
                <figcaption className="label mt-4 flex items-center gap-3 text-navy-500">
                  <span className="tabular-nums">0{i + 1}</span>
                  <span className="inline-block h-px w-6 bg-current" aria-hidden />
                  {f.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
