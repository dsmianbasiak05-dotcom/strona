import { testimonials } from "@/content/testimonials";
import { testimonialsContent } from "@/content/home";
import { SectionHeader } from "@/components/ui/section-header";

/** Renders only when real testimonials exist in src/content/testimonials.ts. */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-title" className="section-y bg-cream">
      <div className="container-site">
        <SectionHeader id="testimonials-title" eyebrow={testimonialsContent.eyebrow} title={testimonialsContent.title} />
        <ul className="mt-16 grid gap-12 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <li key={`${item.author}-${item.quote.slice(0, 24)}`} data-reveal>
              <figure className="border-t border-ink/15 pt-8">
                <blockquote className="font-serif text-[1.5rem] leading-snug">„{item.quote}”</blockquote>
                <figcaption className="mt-6 text-sm text-stone-deep">
                  <span className="font-semibold text-ink">{item.author}</span>
                  {item.context && <span> — {item.context}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
