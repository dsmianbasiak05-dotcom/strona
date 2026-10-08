import type { Metadata } from "next";
import { getProducts } from "@/lib/commerce";
import type { ProductCategory, SortKey } from "@/lib/commerce/types";
import { categories } from "@/data/products";
import { PageIntro } from "@/components/ui/page-intro";
import { ShopView } from "@/components/shop/shop-view";

export const metadata: Metadata = {
  title: "Sklep — kosmetyki do stylizacji włosów męskich",
  description: "Sklep MONCRÉ: MONCRÉ No.1 — glinka do włosów, efekt mat + tekstura. Wkrótce w sprzedaży.",
  alternates: { canonical: "/shop" },
  openGraph: { url: "/shop", title: "Sklep MONCRÉ" },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

/** Product listing. Always a listing — never a single product page in disguise. */
export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  // The shop is the one place the demo/concept entry is shown.
  const products = await getProducts({ includeDemo: true });

  const categoryParam = one(params.category);
  const sortParam = one(params.sort);

  const initial = {
    category: (categories.some((c) => c.key === categoryParam) ? categoryParam : "all") as ProductCategory | "all",
    q: one(params.q) ?? "",
    sort: (["featured", "price-asc", "price-desc", "name"].includes(sortParam ?? "") ? sortParam : "featured") as SortKey,
  };

  return (
    <>
      <PageIntro eyebrow="MONCRÉ" lines={["Sklep."]} srLabel="Sklep MONCRÉ — kosmetyki do stylizacji włosów" />
      <ShopView key={JSON.stringify(initial)} products={products} initial={initial} />
    </>
  );
}
