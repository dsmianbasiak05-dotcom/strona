import { notFound } from "next/navigation";
import { Hero } from "@/components/home/hero";
import { No1Section } from "@/components/home/no1-section";
import { BrandStatement } from "@/components/home/brand-statement";
import { ProductVisuals } from "@/components/home/product-visuals";
import { DailyChaos } from "@/components/home/daily-chaos";
import { WaitlistSection } from "@/components/home/waitlist-section";
import { Marquee } from "@/components/ui/marquee";
import { getProducts } from "@/lib/commerce";
import { siteConfig } from "@/config/site";

export default async function HomePage() {
  const [product] = await getProducts();
  if (!product) notFound();

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: [siteConfig.social.instagram, siteConfig.social.tiktok],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Hero product={product} />
      <Marquee
        items={["MONCRÉ No.1", "For daily chaos", "Coming soon"]}
        duration={36}
        className="display bg-navy-900 py-3.5 text-[2rem] leading-none text-cream md:py-5 md:text-[3.5rem]"
      />
      <No1Section product={product} />
      <BrandStatement />
      <ProductVisuals />
      <DailyChaos />
      <WaitlistSection product={product} />
    </>
  );
}
