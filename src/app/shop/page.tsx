import type { Metadata } from "next";
import { getProducts } from "@/lib/commerce";
import type { ProductCategory, SortKey, StyleKey } from "@/lib/commerce/types";
import { categories, styles } from "@/data/products";
import { PageIntro } from "@/components/ui/page-intro";
import { ShopView } from "@/components/shop/shop-view";

export const metadata: Metadata = {
  title: "Shop — kosmetyki do stylizacji włosów męskich",
  description:
    "Sklep MONCRÉ: glinka do włosów, pomada, puder do włosów i spray z solą morską. Wybierz produkt po efekcie — matte, textured, volume, slick lub natural.",
  alternates: { canonical: "/shop" },
  openGraph: { url: "/shop", title: "Shop MONCRÉ" },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const products = await getProducts();

  const categoryParam = one(params.category);
  const styleParam = one(params.style);
  const sortParam = one(params.sort);

  const initial = {
    category: (categories.some((c) => c.key === categoryParam) ? categoryParam : "all") as ProductCategory | "all",
    style: (styles.some((s) => s.key === styleParam) ? styleParam : null) as StyleKey | null,
    q: one(params.q) ?? "",
    sort: (["featured", "price-asc", "price-desc", "name"].includes(sortParam ?? "") ? sortParam : "featured") as SortKey,
  };

  return (
    <>
      <PageIntro eyebrow="All products" lines={["Shop MONCRÉ"]} srLabel="Shop MONCRÉ — kosmetyki do stylizacji włosów">
        Glinka, pomada, puder i spray. Wybierz produkt albo efekt, który chcesz osiągnąć.
      </PageIntro>
      <ShopView key={JSON.stringify(initial)} products={products} initial={initial} />
    </>
  );
}
