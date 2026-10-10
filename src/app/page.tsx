import { notFound } from "next/navigation";
import { Hero } from "@/components/home/hero";
import { Philosophy } from "@/components/home/philosophy";
import { ProductShowcase } from "@/components/home/product-showcase";
import { AttentionPoster } from "@/components/home/attention-poster";
import { Features } from "@/components/home/features";
import { WaitlistSection } from "@/components/home/waitlist-section";
import { getFeaturedProduct } from "@/lib/commerce";
import { siteConfig } from "@/config/site";

/**
 * Home, as a campaign: claim + product (ink) → philosophy (cream) →
 * MONCRÉ No.1 (bone) → "ATTENTION!" poster (navy) → effect (ink) →
 * waitlist (cream). Every image is an official MONCRÉ render.
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
      <Philosophy product={featured} />
      <ProductShowcase product={featured} />
      <AttentionPoster product={featured} />
      <Features product={featured} />
      <WaitlistSection product={featured} />
    </>
  );
}
