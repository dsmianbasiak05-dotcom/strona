import type { Metadata } from "next";
import { getProducts } from "@/lib/commerce";
import { PageIntro } from "@/components/ui/page-intro";
import { Reveal, RevealLines } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Marquee } from "@/components/brand/marquee";
import { ProductLineup } from "@/components/products/product-lineup";

export const metadata: Metadata = {
  title: "O marce — kosmetyki do stylizacji włosów dla mężczyzn",
  description:
    "MONCRÉ — kosmetyki do stylizacji męskich włosów. Pierwszy produkt marki: MONCRÉ No.1.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "O marce MONCRÉ" },
};


export default async function AboutPage() {
  const products = await getProducts();

  return (
    <>
      <PageIntro eyebrow="O marce" lines={["MONCRÉ."]} srLabel="O marce MONCRÉ">
        MONCRÉ to polska marka kosmetyków do stylizacji męskich włosów.
      </PageIntro>

      <section aria-labelledby="lineup-title" className="section-y border-t border-ink/10">
        <div className="container-x">
          <p id="lineup-title" className="label mb-10 flex items-center gap-3 text-graphite md:mb-14">
            <span className="inline-block h-px w-8 bg-current" aria-hidden />
            Produkty
          </p>
          <ProductLineup products={products} />
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 md:py-32 lg:grid-cols-12" aria-labelledby="manifesto-title">
        <div className="lg:col-span-7">
          <div id="manifesto-title">
            <RevealLines lines={["Your hair.", "Your rules."]} className="display text-[15vw] md:text-[9vw] xl:text-[8.5rem]" />
          </div>
        </div>
        <Reveal className="space-y-6 text-lg leading-relaxed lg:col-span-5 lg:pt-6">
          <p>
            Pierwszy produkt marki to MONCRÉ No.1 — glinka do włosów o efekcie mat + tekstura.
          </p>
          <ButtonLink href="/shop" size="lg" arrow>
            Przejdź do sklepu
          </ButtonLink>
        </Reveal>
      </section>


      <Marquee items={["MONCRÉ", "For daily chaos.", "Your hair. Your rules."]} className="display bg-ink py-5 text-5xl leading-none text-bone md:text-7xl" />
    </>
  );
}
