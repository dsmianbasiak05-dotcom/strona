/**
 * Global site configuration.
 * ⚠️ Contact details, social handles and shipping thresholds are
 * PLACEHOLDERS — confirm with the brand before launch.
 */
export const siteConfig = {
  name: "MONCRÉ",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://moncre.pl",
  locale: "pl_PL",
  title: "MONCRÉ — kosmetyki do stylizacji męskich włosów",
  description:
    "MONCRÉ — kosmetyki do stylizacji męskich włosów. No.1 Matte Clay: glinka do włosów z matowym wykończeniem.",
  email: "hello@moncre.pl",
  social: {
    instagram: "https://www.instagram.com/moncre",
    tiktok: "https://www.tiktok.com/@moncre",
    handle: "@moncre",
  },
  shipping: {
    freeThreshold: 19900, // grosze
    options: [
      { id: "inpost", label: "InPost Paczkomat 24/7", price: 1399, eta: "1–2 dni robocze" },
      { id: "courier", label: "Kurier DPD", price: 1699, eta: "1–2 dni robocze" },
    ],
    notes: [
      "Wysyłka w 1–2 dni robocze.",
      "Darmowa dostawa od 199 zł.",
      "14 dni na zwrot nieotwartego produktu.",
    ],
  },
} as const;

export const mainNav = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=all", label: "Products", mega: true },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
