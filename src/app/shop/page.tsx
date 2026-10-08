import type { Metadata } from "next";
import { getProducts } from "@/lib/commerce";
import type { ProductCategory, SortKey } from "@/lib/commerce/types";
import { categories } from "@/data/products";
import { PageIntro } from "@/components/ui/page-intro";
import { ShopView } from "@/components/shop/shop-view";
import { ProductLineup } from "@/components/products/product-lineup";
import { pluralProducts } from "@/lib/format";

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

  // Filters/search only make sense with a real catalogue; below two
  // products the shop shows the shared line-up layout instead.
  if (products.length < 2) {
    return (
      <>
        <PageIntro eyebrow="Shop" lines={["Shop MONCRÉ"]} srLabel="Shop MONCRÉ — kosmetyki do stylizacji włosów">
          {products.length} {pluralProducts(products.length)}
        </PageIntro>
        <section aria-label="Produkty" className="container-x border-t border-ink/10 pt-10 pb-24 md:pt-14 md:pb-32">
          <ProductLineup products={products} />
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
