import type { Metadata } from "next";
import { getProducts } from "@/lib/commerce";
import { PageIntro } from "@/components/ui/page-intro";
import { Reveal, RevealLines } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Marquee } from "@/components/brand/marquee";
import { ProductLineup } from "@/components/products/product-lineup";

export const metadata: Metadata = {
  title: "About — marka kosmetyków do stylizacji włosów dla mężczyzn",
  description:
    "MONCRÉ — kosmetyki do stylizacji męskich włosów. Pierwszy produkt marki: MONCRÉ No.1.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About MONCRÉ" },
};

const principles = [
  { k: "Simple", t: "Jeden produkt zamiast czterdziestu." },
  { k: "Strong", t: "Simple products. Strong results." },
  { k: "Clean", t: "Opakowanie, które dobrze wygląda na półce, w łazience i na zdjęciu." },
];

export default async function AboutPage() {
  const products = await getProducts();

  return (
    <>
      <PageIntro eyebrow="About MONCRÉ" lines={["Style with", "purpose."]} srLabel="About MONCRÉ — style with purpose">
        MONCRÉ to polska marka kosmetyków do stylizacji męskich włosów. Robimy mniej, ale lepiej.
      </PageIntro>

      <section aria-labelledby="lineup-title" className="section-y border-t border-ink/10">
        <div className="container-x">
          <p id="lineup-title" className="label mb-10 flex items-center gap-3 text-graphite md:mb-14">
            <span className="inline-block h-px w-8 bg-current" aria-hidden />
            The line-up
          </p>
          <ProductLineup products={products} />
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 md:py-32 lg:grid-cols-12" aria-labelledby="manifesto-title">
        <div className="lg:col-span-7">
          <div id="manifesto-title">
            <RevealLines lines={["Your hair.", "Your rules.", "Our tools."]} className="display text-[15vw] md:text-[9vw] xl:text-[8.5rem]" />
          </div>
        </div>
        <Reveal className="space-y-6 text-lg leading-relaxed lg:col-span-5 lg:pt-6">
          <p>
            Fryzura to pierwsza rzecz, którą widać. Mówi o Tobie więcej niż buty, kurtka czy zegarek. Dlatego nie powinna
            zależeć od skomplikowanej rutyny.
          </p>
          <p className="text-ink/75">
            Zaczynamy od jednego produktu: MONCRÉ No.1 — glinki do włosów o efekcie mat + tekstura. Wkrótce w
            sprzedaży.
          </p>
          <ButtonLink href="/shop" size="lg" arrow>
            Shop products
          </ButtonLink>
        </Reveal>
      </section>

      <section className="bg-bone py-20 md:py-28" aria-label="Zasady marki">
        <ol className="container-x grid gap-10 md:grid-cols-3 md:gap-8">
          {principles.map((p, i) => (
            <li key={p.k}>
              <Reveal delay={i * 0.08} className="border-t border-ink/20 pt-6">
                <p className="label text-graphite tabular-nums">0{i + 1}</p>
                <h3 className="display mt-4 text-6xl md:text-7xl">{p.k}.</h3>
                <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-ink/75">{p.t}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <Marquee items={["Simple products", "Strong results", "No unnecessary noise"]} className="display bg-ink py-5 text-5xl leading-none text-bone md:text-7xl" />
    </>
  );
}
