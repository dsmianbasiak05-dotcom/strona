import { Hero } from "@/components/home/hero";
import { Essentials } from "@/components/home/essentials";
import { ShopByStyle } from "@/components/home/shop-by-style";
import { BrandStatement } from "@/components/home/brand-statement";
import { ProductShowcase } from "@/components/home/product-showcase";
import { WhyMoncre } from "@/components/home/why-moncre";
import { Community } from "@/components/home/community";
import { Newsletter } from "@/components/home/newsletter";
import { Marquee } from "@/components/ui/marquee";
import { getBestsellers, getProductBySlug, getProducts } from "@/lib/commerce";
import { styles } from "@/data/products";
import { siteConfig } from "@/config/site";

const marqueeItems = ["MONCRÉ", "Style with purpose", "Built for your look"];

export default async function HomePage() {
  const [bestsellers, all, featured] = await Promise.all([
    getBestsellers(4),
    getProducts(),
    getProductBySlug("matte-clay"),
  ]);

  // Key product per style — shown inside the expanded style panel.
  const keyProduct: Record<string, string> = {
    matte: "matte-clay",
    textured: "matte-clay",
    volume: "sea-salt-spray",
    slick: "pomade",
    natural: "sea-salt-spray",
  };
  const styleItems = styles.map((s) => {
    const key = all.find((p) => p.slug === keyProduct[s.key]);
    return {
      ...s,
      count: all.filter((p) => p.styles.includes(s.key)).length,
      // Only products with official photography are shown inside the panel.
      product: key && key.images.length > 0 ? key : undefined,
    };
  });

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
      {featured && <Hero product={featured} />}
      <Marquee
        items={marqueeItems}
        className="display bg-navy-900 py-4 text-[2.4rem] leading-none text-cream md:py-6 md:text-[4.5rem]"
      />
      <Essentials products={bestsellers} />
      <ShopByStyle items={styleItems} />
      <BrandStatement />
      {featured && <ProductShowcase product={featured} />}
      <WhyMoncre />
      <Community />
      <Newsletter />
    </>
  );
}
