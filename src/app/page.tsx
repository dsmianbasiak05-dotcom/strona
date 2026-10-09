import { notFound } from "next/navigation";
import { Hero } from "@/components/home/hero";
import { ProductVisuals } from "@/components/home/product-visuals";
import { WaitlistSection } from "@/components/home/waitlist-section";
import { BrandStatement } from "@/components/brand/brand-statement";
import { getFeaturedProduct } from "@/lib/commerce";
import { siteConfig } from "@/config/site";

/**
 * Home: the product first (claim, image, price, one action), then its
 * packaging, one brand line and the waitlist. Nothing repeats the hero.
 */
export default async function HomePage() {
  const featured = await getFeaturedProduct();
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
      <ProductVisuals product={featured} />
      <BrandStatement />
      <WaitlistSection product={featured} />
    </>
  );
}
