/**
 * Commerce domain types.
 * Kept platform-agnostic so the data source can later be swapped for
 * Shopify, WooCommerce, Supabase etc. without touching UI components.
 */

export type ProductCategory = "clay" | "pomade" | "powder" | "spray" | "sets" | "demo";

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

/** What job an image does in a layout — components pick images by role. */
export type ImageRole = "front" | "set" | "packaging" | "back" | "lid";

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  role: ImageRole;
  /** CSS object-position keeping the pack fully in frame when cropped. */
  focus?: string;
}

/**
 * A product's own palette. Used as an ACCENT (product page, product
 * blocks, image surfaces) — never as the site palette.
 */
export interface ProductTheme {
  /** Dominant pack colour (blocks, product-page bands). */
  primary: string;
  /** Colour printed on the primary (type on product blocks). */
  secondary: string;
  /** Small accents: rules, swatches, highlights. */
  accent: string;
  /** Neutral surface behind the product imagery. */
  background: string;
}

/**
 * "coming_soon": shown with price, but cannot be added to cart — UI offers
 * the waitlist instead. Switch to "active" to open sales.
 */
export type ProductStatus = "active" | "coming_soon" | "concept";

export interface Product {
  id: string;
  status: ProductStatus;
  /**
   * DEMO / CONCEPT entry used only to test the layout and theme system.
   * Never purchasable, never priced, excluded from home, search, sitemap
   * and structured data. Shown with an explicit "DEMO / CONCEPT" label.
   */
  demo?: boolean;
  /** Position in the numbered line-up (No.1, No.2, …). */
  number: number;
  /** Human category label shown in UI, e.g. "Glinka do włosów". */
  categoryLabel: string;
  theme: ProductTheme;
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
  /** Hero / home spotlight product. First product is used when none is flagged. */
  featured?: boolean;
  /** Key/value facts (Polish), only brand-confirmed data. Shown on cards, home and product page. */
  specs?: { label: string; value: string }[];
  /** Marks demo data that must be replaced before going live. */
  placeholder?: boolean;
}

export interface CartLine {
  productId: string;
  variantId: string;
  quantity: number;
}

export type SortKey = "featured" | "price-asc" | "price-desc" | "name";
