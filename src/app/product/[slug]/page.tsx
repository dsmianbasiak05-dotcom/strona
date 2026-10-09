import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts, getRelatedProducts, isPurchasable } from "@/lib/commerce";
import { siteConfig } from "@/config/site";
import { ProductGallery } from "@/components/products/product-gallery";
import { PurchasePanel } from "@/components/products/purchase-panel";
import { DemoPanel } from "@/components/products/demo-panel";
import { ProductCard } from "@/components/products/product-card";
import { ProductBand } from "@/components/products/product-band";
import { ProductAttention } from "@/components/products/product-attention";
import { themeStyle } from "@/lib/theme";
import { RevealLines } from "@/components/ui/reveal";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const products = await getProducts({ includeDemo: true });
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

const categorySeo: Record<string, string> = {
  clay: "glinka do włosów",
  pomade: "pomada do włosów",
  powder: "puder do włosów",
  spray: "spray do stylizacji włosów",
  sets: "zestaw kosmetyków do stylizacji włosów",
  demo: "produkt demonstracyjny (DEMO / CONCEPT)",
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const title = `${product.name} — ${categorySeo[product.category]}`;
  return {
    title,
    description: product.description,
    alternates: { canonical: `/product/${product.slug}` },
    // Demo/concept entries must never be indexed as a real product.
    ...(product.demo ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "website",
      url: `/product/${product.slug}`,
      title,
      description: product.description,
      images: product.images.slice(0, 1).map((img) => ({ url: img.src, width: img.width, height: img.height, alt: img.alt })),
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [related, all] = await Promise.all([getRelatedProducts(product, 4), getProducts()]);
  const included = product.includes?.map((s) => all.find((p) => p.slug === s)).filter((p) => p !== undefined) ?? [];

  // Structured data — no ratings/reviews until real data exists.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: siteConfig.name },
    category: categorySeo[product.category],
    url: `${siteConfig.url}/product/${product.slug}`,
    image: product.images.map((img) => `${siteConfig.url}${img.src}`),
    offers: product.variants.map((v) => ({
      "@type": "Offer",
      sku: v.id,
      name: product.variants.length > 1 ? `${product.name} ${v.title}` : product.name,
      price: (v.price.amount / 100).toFixed(2),
      priceCurrency: v.price.currency,
      // Not on sale yet → OutOfStock (no orders accepted).
      availability: isPurchasable(product) && v.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Strona główna", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Sklep", item: `${siteConfig.url}/shop` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${siteConfig.url}/product/${product.slug}` },
    ],
  };

  return (
    <>
      {!product.demo && (
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbLd]) }}
        />
        )}
      <div style={themeStyle(product.theme)}>
      <article className="pt-14 md:pt-20 lg:pt-24">
        <div className="lg:container-x grid gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-7">
            <ProductGallery product={product} />
          </div>
          <div className="container-x pb-16 lg:col-span-5 lg:px-0! lg:pb-0">
            {product.demo ? <DemoPanel product={product} /> : <PurchasePanel product={product} />}
          </div>
        </div>

        {included.length > 0 && (
          <section aria-labelledby="included-title" className="container-x mt-20 md:mt-28">
            <h2 id="included-title" className="label mb-6 text-graphite">
              W zestawie
            </h2>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
              {included.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {!product.demo && <ProductAttention product={product} />}

      <ProductBand product={product} />

      {related.length > 0 ? (
      <section aria-labelledby="related-title" className="container-x py-20 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <div id="related-title">
            <RevealLines lines={["Zobacz też."]} className="display text-[14vw] md:text-8xl" />
          </div>
          <Link href="/shop" className="label link-underline shrink-0">
            Cały sklep →
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
          {related.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} sizes="(min-width: 768px) 25vw, 50vw" />
            </li>
          ))}
        </ul>
      </section>
      ) : (
        <div className="h-20 md:h-28" aria-hidden />
      )}
      </div>
    </>
  );
}
