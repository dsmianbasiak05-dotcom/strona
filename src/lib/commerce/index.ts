import { products } from "@/data/products";
import type { Product, ProductCategory, SortKey, StyleKey } from "./types";

/**
 * Commerce data access layer.
 *
 * Every UI component reads catalog data through these functions only.
 * To connect a real backend (Shopify Storefront API, WooCommerce REST,
 * Supabase…) re-implement these functions — signatures are already
 * async so remote fetching drops in without UI changes.
 */

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getBestsellers(limit = 4): Promise<Product[]> {
  return products.filter((p) => p.bestseller).slice(0, limit);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return products
    .filter((p) => p.id !== product.id)
    .map((p) => ({ p, score: p.styles.filter((s) => product.styles.includes(s)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}

/** Synchronous lookup for client-side stores (cart, favorites). */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function lowestPrice(product: Product): number {
  return Math.min(...product.variants.map((v) => v.price.amount));
}

export interface ProductQuery {
  category?: ProductCategory | "all";
  style?: StyleKey | null;
  q?: string;
  sort?: SortKey;
}

export function filterProducts(list: Product[], query: ProductQuery): Product[] {
  const q = query.q?.trim().toLowerCase();
  const result = list.filter((p) => {
    if (query.category && query.category !== "all" && p.category !== query.category) return false;
    if (query.style && !p.styles.includes(query.style)) return false;
    if (q) {
      const haystack = `${p.name} ${p.type} ${p.category} ${p.styles.join(" ")} ${p.description}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  switch (query.sort) {
    case "price-asc":
      return [...result].sort((a, b) => lowestPrice(a) - lowestPrice(b));
    case "price-desc":
      return [...result].sort((a, b) => lowestPrice(b) - lowestPrice(a));
    case "name":
      return [...result].sort((a, b) => a.name.localeCompare(b.name));
    default:
      return result;
  }
}
