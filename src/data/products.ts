import type { Product, ProductCategory } from "@/lib/commerce/types";

/**
 * CATALOG — MONCRÉ has one product: MONCRÉ No.1 (hair clay, 75 ml, 85 zł),
 * not yet on sale. Only brand-confirmed data (or text printed on the
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
    highlights: [
      { label: "Type", value: "Matte clay" },
      { label: "Effect", value: "Mat + texture" },
      { label: "Hold", value: "Medium to strong hold" },
      { label: "Size", value: "75 ml" },
    ],
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
    // Printed on the pack: "Rozetrzyj niewielką ilość w dłoniach i wmasuj w suche włosy. Ułóż palcami."
    howToUse: ["Rozetrzyj niewielką ilość w dłoniach.", "Wmasuj w suche włosy.", "Ułóż palcami."],
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
];

/** Shop tabs — only categories that actually have products. */
export const categories: { key: ProductCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  ...(["clay", "pomade", "powder", "spray", "sets"] as const)
    .filter((c) => products.some((p) => p.category === c))
    .map((c) => ({ key: c, label: c[0].toUpperCase() + c.slice(1) })),
];
