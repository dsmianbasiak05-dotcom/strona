/**
 * Global site configuration.
 * ⚠️ Contact details and social handles are PLACEHOLDERS — confirm with
 * the brand before launch. Shipping/returns terms are not set yet.
 */
export interface ShippingOption {
  id: string;
  label: string;
  /** grosze */
  price: number;
  eta: string;
}

export const SHIPPING_TBA = "Warunki dostawy i zwrotów ogłosimy przed startem sprzedaży.";

export const siteConfig = {
  name: "MONCRÉ",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://moncre.pl",
  locale: "pl_PL",
  title: "MONCRÉ — kosmetyki do stylizacji męskich włosów",
  description:
    "MONCRÉ — kosmetyki do stylizacji męskich włosów. MONCRÉ No.1: glinka do włosów, efekt mat + tekstura. Wkrótce w sprzedaży.",
  email: "hello@moncre.pl",
  social: {
    instagram: "https://www.instagram.com/moncre",
    tiktok: "https://www.tiktok.com/@moncre",
    handle: "@moncre",
  },
  shipping: {
    // Delivery methods, costs and times are NOT decided yet. Leave empty —
    // the UI then states that terms will be announced before launch.
    options: [] as ShippingOption[],
  },

} as const;

export const mainNav = [
  { href: "/shop", label: "Sklep" },
  { href: "/about", label: "O marce" },
  { href: "/contact", label: "Kontakt" },
] as const;
