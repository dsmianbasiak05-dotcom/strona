import type { Metadata } from "next";
import { getProducts } from "@/lib/commerce";
import { PageIntro } from "@/components/ui/page-intro";
import { Reveal, RevealLines } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import Link from "next/link";
import { ProductMedia } from "@/components/product/product-media";

export const metadata: Metadata = {
  title: "About — marka kosmetyków do stylizacji włosów dla mężczyzn",
  description:
    "MONCRÉ tworzy kosmetyki do stylizacji męskich włosów. Proste produkty, mocny efekt, minimalistyczny design.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About MONCRÉ" },
};

const principles = [
  { k: "Simple", t: "Cztery produkty zamiast czterdziestu. Każdy ma jedno zadanie." },
  { k: "Strong", t: "Efekt, który widać. Fryzura, którą kontrolujesz." },
  { k: "Clean", t: "Opakowanie, które dobrze wygląda na półce, w łazience i na zdjęciu." },
];

export default async function AboutPage() {
  const products = (await getProducts()).filter((p) => p.category !== "sets");

  return (
    <>
      <PageIntro eyebrow="About MONCRÉ" lines={["Style with", "purpose."]} srLabel="About MONCRÉ — style with purpose">
        MONCRÉ to polska marka kosmetyków do stylizacji męskich włosów. Robimy mniej, ale lepiej.
      </PageIntro>

      <section className="grain grain-light relative overflow-hidden bg-navy-900 py-20 text-cream md:py-32" aria-labelledby="lineup-title">
        <div className="container-x">
          <h2 id="lineup-title" className="label text-cream/55">The line-up</h2>
          <ul className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {products.map((p, i) => (
              <li key={p.id}>
                <Reveal delay={i * 0.08}>
                  <Link href={`/product/${p.slug}`} className="group block">
                    <div className="relative aspect-[4/5] bg-cream">
                      <div className="absolute inset-[10%_8%] transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.04]">
                        <ProductMedia product={p} sizes="(min-width: 768px) 25vw, 50vw" />
                      </div>
                    </div>
                    <p className="label mt-4 text-cream/80">{p.type}</p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
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
          <p className="text-navy-900/75">
            MONCRÉ to zestaw podstawowych narzędzi: glinka, pomada, puder i spray. Każdy produkt odpowiada na konkretny
            efekt — matte, textured, volume, slick albo natural. Wybierasz styl, my dajemy narzędzie.
          </p>
          <ButtonLink href="/shop" size="lg" arrow>
            Shop products
          </ButtonLink>
        </Reveal>
      </section>

      <section className="bg-cream py-20 md:py-28" aria-label="Zasady marki">
        <ol className="container-x grid gap-10 md:grid-cols-3 md:gap-8">
          {principles.map((p, i) => (
            <li key={p.k}>
              <Reveal delay={i * 0.08} className="border-t border-navy-900/20 pt-6">
                <p className="label text-navy-500 tabular-nums">0{i + 1}</p>
                <h3 className="display mt-4 text-6xl md:text-7xl">{p.k}.</h3>
                <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-navy-900/75">{p.t}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <Marquee items={["Simple products", "Strong results", "No unnecessary noise"]} className="display bg-navy-900 py-5 text-5xl leading-none text-cream md:text-7xl" />
    </>
  );
}
