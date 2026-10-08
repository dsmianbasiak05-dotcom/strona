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
    "MONCRÉ — kosmetyki do stylizacji męskich włosów. Pierwszy produkt marki: No.1 Matte Clay.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About MONCRÉ" },
};

const principles = [
  { k: "Simple", t: "Jeden produkt zamiast czterdziestu." },
  { k: "Strong", t: "Simple products. Strong results." },
  { k: "Clean", t: "Opakowanie, które dobrze wygląda na półce, w łazience i na zdjęciu." },
];

export default async function AboutPage() {
  const [product] = await getProducts();

  return (
    <>
      <PageIntro eyebrow="About MONCRÉ" lines={["Style with", "purpose."]} srLabel="About MONCRÉ — style with purpose">
        MONCRÉ to polska marka kosmetyków do stylizacji męskich włosów. Robimy mniej, ale lepiej.
      </PageIntro>

      {product && (
        <section className="grain grain-light relative overflow-hidden bg-navy-900 py-20 text-cream md:py-32" aria-labelledby="first-title">
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-4">
              <p className="label text-cream/55">The first one</p>
              <h2 id="first-title" className="display mt-4 text-7xl leading-[0.9] md:text-8xl">
                {product.type}
              </h2>
              <p className="mt-4 text-lg text-cream/80">{product.tagline}</p>
              <Link href={`/product/${product.slug}`} className="label link-underline mt-8 inline-block">
                View product →
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-3 lg:col-span-8">
              {[0, 1].map((i) => (
                <li key={i}>
                  <Reveal delay={i * 0.08}>
                    <Link href={`/product/${product.slug}`} className="group block" tabIndex={i === 0 ? 0 : -1}>
                      <div className="relative aspect-[4/3] bg-cream">
                        <div className="absolute inset-[12%] transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.04]">
                          <ProductMedia product={product} index={i} sizes="(min-width: 1024px) 30vw, 50vw" />
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

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
            Zaczynamy od jednego produktu: No.1 Matte Clay — glinki do włosów z matowym wykończeniem. For daily
            chaos.
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
