import { notFound } from "next/navigation";
import { Hero } from "@/components/home/hero";
import { Essentials } from "@/components/home/essentials";
import { BrandStatement } from "@/components/home/brand-statement";
import { ProductShowcase } from "@/components/home/product-showcase";
import { WhyMoncre } from "@/components/home/why-moncre";
import { Community } from "@/components/home/community";
import { Newsletter } from "@/components/home/newsletter";
import { Marquee } from "@/components/ui/marquee";
import { getProducts } from "@/lib/commerce";
import { siteConfig } from "@/config/site";

const marqueeItems = ["MONCRÉ", "Style with purpose", "Built for your look"];

export default async function HomePage() {
  const [featured] = await getProducts();
  if (!featured) notFound();

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
      <Hero product={featured} />
      <Marquee
        items={marqueeItems}
        className="display bg-navy-900 py-4 text-[2.4rem] leading-none text-cream md:py-6 md:text-[4.5rem]"
      />
      <Essentials product={featured} />
      <BrandStatement />
      <ProductShowcase product={featured} />
      <WhyMoncre />
      <Community />
      <Newsletter />
    </>
  );
}
