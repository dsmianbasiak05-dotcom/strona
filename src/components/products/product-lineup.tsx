import type { Product } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";

/**
 * Catalogue of N products with one rule set:
 * - 1 product  → wide `feature` card (a lone tile in a 4-col grid looks broken)
 * - 2+ products → grid of cards; the first may lead at double width
 */
export function ProductLineup({ products, leadFirst = true }: { products: Product[]; leadFirst?: boolean }) {
  if (products.length === 0) return null;
  if (products.length === 1) return <ProductCard product={products[0]} variant="feature" priority />;

  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
      {products.map((p, i) => (
        <li key={p.id} className={cn(leadFirst && i === 0 && products.length > 2 && "col-span-2")}>
          <ProductCard
            product={p}
            priority={i < 2}
            sizes={leadFirst && i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
          />
        </li>
      ))}
    </ul>
  );
}
