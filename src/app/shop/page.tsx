import type { Metadata } from "next";
import { getProducts } from "@/lib/commerce";
import type { ProductCategory, SortKey } from "@/lib/commerce/types";
import { categories } from "@/data/products";
import { PageIntro } from "@/components/ui/page-intro";
import { ShopView } from "@/components/shop/shop-view";
import { ProductSpotlight } from "@/components/product/product-spotlight";

export const metadata: Metadata = {
  title: "Shop — kosmetyki do stylizacji włosów męskich",
  description: "Sklep MONCRÉ: MONCRÉ No.1 — glinka do włosów, efekt mat + tekstura. Wkrótce w sprzedaży.",
  alternates: { canonical: "/shop" },
  openGraph: { url: "/shop", title: "Shop MONCRÉ" },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const products = await getProducts();

  // One product: present it properly instead of a lonely grid tile.
  if (products.length === 1) {
    return (
      <>
        <PageIntro eyebrow="Shop" lines={["Shop MONCRÉ"]} srLabel="Shop MONCRÉ — kosmetyki do stylizacji włosów" />
        <section aria-label={products[0].name} className="container-x border-t border-navy-900/15 pt-10 pb-24 md:pt-14 md:pb-32">
          <ProductSpotlight product={products[0]} headingLevel="h2" priority />
        </section>
      </>
    );
  }

  const categoryParam = one(params.category);
  const sortParam = one(params.sort);

  const initial = {
    category: (categories.some((c) => c.key === categoryParam) ? categoryParam : "all") as ProductCategory | "all",
    q: one(params.q) ?? "",
    sort: (["featured", "price-asc", "price-desc", "name"].includes(sortParam ?? "") ? sortParam : "featured") as SortKey,
  };

  return (
    <>
      <PageIntro eyebrow="All products" lines={["Shop MONCRÉ"]} srLabel="Shop MONCRÉ — kosmetyki do stylizacji włosów" />
      <ShopView key={JSON.stringify(initial)} products={products} initial={initial} />
    </>
  );
}
