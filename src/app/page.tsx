import { notFound } from "next/navigation";
import { Hero } from "@/components/home/hero";
import { LineupSection } from "@/components/home/lineup-section";
import { ProductVisuals } from "@/components/home/product-visuals";
import { WaitlistSection } from "@/components/home/waitlist-section";
import { BrandStatement } from "@/components/brand/brand-statement";
import { DailyChaos } from "@/components/brand/daily-chaos";
import { Marquee } from "@/components/brand/marquee";
import { getFeaturedProduct, getProducts } from "@/lib/commerce";
import { siteConfig } from "@/config/site";

/**
 * Home = the BRAND first (campaign hero, statements on brand surfaces),
 * products second (line-up driven by data). The featured product only
 * colours its own blocks.
 */
export default async function HomePage() {
  const [products, featured] = await Promise.all([getProducts(), getFeaturedProduct()]);
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
        items={["MONCRÉ", "Your hair. Your rules.", "For daily chaos."]}
        duration={38}
        className="display bg-ink py-3.5 text-[2rem] leading-none text-bone md:py-5 md:text-[3.5rem]"
      />
      <LineupSection featured={featured} products={products} />
      <BrandStatement />
      <ProductVisuals product={featured} />
      <DailyChaos product={featured} />
      <WaitlistSection product={featured} />
    </>
  );
}
