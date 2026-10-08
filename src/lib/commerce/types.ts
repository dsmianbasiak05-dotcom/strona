/**
 * Commerce domain types.
 * Kept platform-agnostic so the data source can later be swapped for
 * Shopify, WooCommerce, Supabase etc. without touching UI components.
 */

export type ProductCategory = "clay" | "pomade" | "powder" | "spray" | "sets";

export type StyleKey = "matte" | "textured" | "volume" | "slick" | "natural";

/** Which packaging shape the placeholder visual should render. */
export type PackagingShape = "jar" | "shaker" | "spray" | "set";

export interface Money {
  /** Amount in minor units (grosze) to avoid floating point issues. */
  amount: number;
  currency: "PLN";
}

export interface ProductVariant {
  id: string;
  /** e.g. "100 ml" */
  title: string;
  price: Money;
  available: boolean;
}

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Short type line, e.g. "Matte Clay" */
  type: string;
  category: ProductCategory;
  styles: StyleKey[];
  tagline: string;
  description: string;
  details: string[];
  howToUse: string[];
  /** Full INCI list — null until provided by the brand. */
  ingredients: string | null;
  variants: ProductVariant[];
  /**
   * Real product photography. Empty until the brand delivers photos —
   * UI then falls back to the illustrated packaging placeholder.
   */
  images: ProductImage[];
  packaging: PackagingShape;
  /** For sets: slugs of products included. */
  includes?: string[];
  bestseller?: boolean;
  /** Marks demo data that must be replaced before going live. */
  placeholder?: boolean;
}

export interface CartLine {
  productId: string;
  variantId: string;
  quantity: number;
}

export type SortKey = "featured" | "price-asc" | "price-desc" | "name";
