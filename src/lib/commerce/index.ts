import { products } from "@/data/products";
import type { ImageRole, Money, Product, ProductCategory, ProductImage, SortKey, StyleKey } from "./types";

/**
 * Commerce data access layer.
 *
 * Every UI component reads catalog data through these functions only.
 * To connect a real backend (Shopify Storefront API, WooCommerce REST,
 * Supabase…) re-implement these functions — signatures are already
 * async so remote fetching drops in without UI changes.
 */

/**
 * Catalogue. Demo/concept entries are only included where explicitly asked
 * (the shop listing) — real-product surfaces never show them.
 */
export async function getProducts({ includeDemo = false }: { includeDemo?: boolean } = {}): Promise<Product[]> {
  return includeDemo ? products : products.filter((p) => !p.demo);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

/** The product the home page leads with (data-driven, not hard-coded). */
export async function getFeaturedProduct(): Promise<Product | undefined> {
  const real = products.filter((p) => !p.demo);
  return real.find((p) => p.featured) ?? real[0];
}

export async function getBestsellers(limit = 4): Promise<Product[]> {
  return products.filter((p) => p.bestseller).slice(0, limit);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return products
    .filter((p) => p.id !== product.id && !p.demo)
    .map((p) => ({ p, score: p.styles.filter((s) => product.styles.includes(s)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}

/** Synchronous lookup for client-side stores (cart, favorites). */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Pick an image by its job in the layout; falls back to the first image. */
export function productImage(product: Product, role: ImageRole): ProductImage | undefined {
  return product.images.find((img) => img.role === role) ?? product.images[0];
}

/** Display size: the single variant's title, a count when several, null when none. */
export function productSize(product: Product): string | null {
  if (product.variants.length === 0) return null;
  return product.variants.length === 1 ? product.variants[0].title : `${product.variants.length} warianty`;
}

/** Lowest price, or null for unpriced entries (e.g. demo/concept). */
export function productPrice(product: Product): Money | null {
  if (product.variants.length === 0) return null;
  return product.variants.reduce((min, v) => (v.price.amount < min.price.amount ? v : min)).price;
}

export function isDemo(product: Product): boolean {
  return product.demo === true;
}

/** Single switch for "can this be bought right now?" */
export function isPurchasable(product: Product): boolean {
  return !product.demo && product.status === "active" && product.variants.some((v) => v.available);
}

/** Lowest price in grosze; unpriced products sort last. */
export function lowestPrice(product: Product): number {
  return productPrice(product)?.amount ?? Number.POSITIVE_INFINITY;
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
