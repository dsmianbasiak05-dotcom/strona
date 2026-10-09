import { ButtonLink } from "@/components/ui/button";

/** The one place the supporting line "For daily chaos." gets a section. */
export function BrandStatement() {
  return (
    <section aria-labelledby="statement-title" className="section-y border-t border-ink/10">
      <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
        <h2 id="statement-title" className="display text-[16vw] leading-[0.86] md:text-[10vw] lg:col-span-8 lg:text-[min(8.6vw,9rem)]">
          For daily chaos.
        </h2>
        <div className="flex flex-col gap-6 lg:col-span-4 lg:pb-2">
          <p className="max-w-[38ch] text-lg leading-relaxed">
            MONCRÉ tworzy kosmetyki do stylizacji męskich włosów. Bez zbędnych dodatków.
          </p>
          <ButtonLink href="/about" variant="secondary" className="self-start" arrow>
            O marce
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
