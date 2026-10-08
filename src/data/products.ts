import type { Product, ProductCategory } from "@/lib/commerce/types";

/**
 * CATALOG — MONCRÉ has one real product: MONCRÉ No.1 (hair clay, 75 ml,
 * 85 zł), not yet on sale. A second entry is a clearly flagged DEMO. Only brand-confirmed data (or text printed on the
 * official pack) is used. Never add product claims the brand has not given.
 */

const pln = (zl: number) => ({ amount: Math.round(zl * 100), currency: "PLN" as const });

export const products: Product[] = [
  {
    id: "p_moncre_no1",
    // Not on sale yet — flip to "active" (and keep the variant available) to open sales.
    status: "coming_soon",
    number: 1,
    categoryLabel: "Glinka do włosów",
    // No.1 pack palette, sampled from the official renders.
    theme: {
      primary: "#262944", // navy body
      secondary: "#f4eedc", // cream print
      accent: "#3c4062", // lighter navy of the lid
      background: "#e4e3df", // studio surface of the renders
    },
    slug: "no-1",
    name: "MONCRÉ No.1",
    type: "No.1",
    category: "clay",
    styles: ["matte", "textured"],
    tagline: "For daily chaos.", // printed on the pack
    description:
      "MONCRÉ No.1 — glinka do włosów. Efekt mat + tekstura, utrwalenie średnie do mocnego. Do wszystkich rodzajów włosów.",
    // Exactly as provided by the brand.
    specs: [
      { label: "Rodzaj", value: "Glinka do włosów" },
      { label: "Efekt", value: "Mat + tekstura" },
      { label: "Utrwalenie", value: "Średnie do mocnego" },
      { label: "Włosy", value: "Wszystkie rodzaje" },
      { label: "Pojemność", value: "75 ml" },
      // Scent: not decided yet — intentionally not shown.
    ],
    details: [
      "Efekt: mat + tekstura",
      "Utrwalenie: średnie do mocnego",
      "Do wszystkich rodzajów włosów",
      "Pojemność: 75 ml",
    ],
    // Usage instructions not provided by the brand yet (the pack render is a mock-up) — not shown.
    howToUse: [],
    // INCI not provided yet — not published.
    ingredients: null,
    variants: [{ id: "v_moncre_no1_75ml", title: "75 ml", price: pln(85), available: true }],
    // Official renders (2000 px). Never altered — only framed via `focus`.
    images: [
      { role: "front", src: "/images/products/no-1/jar-front.jpg", alt: "MONCRÉ No.1 — słoik, przód", width: 2000, height: 2000, focus: "50% 53%" },
      { role: "set", src: "/images/products/no-1/set.jpg", alt: "MONCRÉ No.1 — słoik i pudełko", width: 2000, height: 1125, focus: "50% 50%" },
      { role: "packaging", src: "/images/products/no-1/box.jpg", alt: "MONCRÉ No.1 — pudełko", width: 2000, height: 2000, focus: "50% 55%" },
      { role: "back", src: "/images/products/no-1/jar-back.jpg", alt: "MONCRÉ No.1 — tył słoika ze składem i sposobem użycia", width: 2000, height: 2000, focus: "50% 53%" },
      { role: "lid", src: "/images/products/no-1/lid.jpg", alt: "MONCRÉ No.1 — wieczko z monogramem M", width: 2000, height: 2000, focus: "50% 50%" },
    ],
    bestseller: true,
    featured: true,
  },

  // ─────────────────────────────────────────────────────────────────────
  // ⚠️ DEMO / CONCEPT — NOT A MONCRÉ PRODUCT.
  // Exists only to show how the shop handles a second product with a
  // different palette (espresso). No price, no properties, no claims.
  // Image: mock-up of the No.1 jar geometry recoloured to espresso, with all
  // print (logo, No.1, slogans) removed — not a real or planned pack.
  // To remove: delete this entry and /public/images/products/demo-espresso.
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "p_demo_espresso",
    demo: true,
    status: "concept",
    number: 2,
    categoryLabel: "Produkt demonstracyjny",
    theme: {
      primary: "#3b2a22", // espresso
      secondary: "#efe6da", // cream
      accent: "#8b857d", // neutral
      background: "#e9e5df", // light neutral
    },
    slug: "demo-espresso",
    name: "Demo Espresso",
    type: "Demo Espresso",
    category: "demo",
    styles: [],
    tagline: "DEMO / CONCEPT",
    description:
      "Produkt demonstracyjny. Służy wyłącznie do pokazania, jak sklep prezentuje produkt w innej palecie kolorów. Nie jest produktem MONCRÉ i nie jest w sprzedaży.",
    details: [],
    howToUse: [],
    ingredients: null,
    variants: [],
    images: [
      {
        role: "front",
        // Mock-up made from the No.1 jar render (scripts/make-demo-espresso.py):
        // same geometry/lighting, all print removed, navy → espresso.
        src: "/images/products/demo-espresso/jar-front.jpg",
        alt: "DEMO / CONCEPT — słoik w kolorze espresso, bez nadruku (wizualizacja systemu kolorów)",
        width: 2000,
        height: 2000,
        focus: "50% 52%",
      },
    ],
  },
];

const categoryNames: Record<ProductCategory, string> = {
  clay: "Glinki",
  pomade: "Pomady",
  powder: "Pudry",
  spray: "Spraye",
  sets: "Zestawy",
  demo: "Demo",
};

/** Shop tabs — only categories that actually have products. */
export const categories: { key: ProductCategory | "all"; label: string }[] = [
  { key: "all", label: "Wszystkie" },
  ...(Object.keys(categoryNames) as ProductCategory[])
    .filter((c) => products.some((p) => p.category === c))
    .map((c) => ({ key: c, label: categoryNames[c] })),
];
