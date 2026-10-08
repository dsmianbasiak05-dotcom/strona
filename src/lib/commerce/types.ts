/**
 * Commerce domain types.
 * Kept platform-agnostic so the data source can later be swapped for
 * Shopify, WooCommerce, Supabase etc. without touching UI components.
 */

export type ProductCategory = "clay" | "pomade" | "powder" | "spray" | "sets";

export type StyleKey = "matte" | "textured" | "volume" | "slick" | "natural";

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

/**
 * "coming_soon": shown with price, but cannot be added to cart — UI offers
 * the waitlist instead. Switch to "active" to open sales.
 */
export type ProductStatus = "active" | "coming_soon";

export interface Product {
  id: string;
  status: ProductStatus;
  slug: string;
  name: string;
  /** Short display name, e.g. "No.1" */
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
   * Official product imagery (transparent packshots). images[0] is the
   * primary view, images[1] the hover/alternate view. Empty = no photos
   * yet — UI shows a neutral "packshot coming soon" tile.
   */
  images: ProductImage[];
  /** For sets: slugs of products included. */
  includes?: string[];
  bestseller?: boolean;
  /** Short key/value facts shown on the product page (only brand-confirmed data). */
  specs?: { label: string; value: string }[];
  /** Brand-provided headline facts (EN), shown on the home page product section. */
  highlights?: { label: string; value: string }[];
  /** Marks demo data that must be replaced before going live. */
  placeholder?: boolean;
}

export interface CartLine {
  productId: string;
  variantId: string;
  quantity: number;
}

export type SortKey = "featured" | "price-asc" | "price-desc" | "name";
