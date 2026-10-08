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
    slug: "no-1",
    name: "MONCRÉ No.1",
    type: "No.1",
    category: "clay",
    styles: ["matte", "textured"],
    tagline: "For daily chaos.", // printed on the pack
    description:
      "MONCRÉ No.1 — glinka do włosów. Efekt mat + tekstura, utrwalenie średnie do mocnego. Do wszystkich rodzajów włosów.",
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
    images: [
      { src: "/images/products/matte-clay/jar-front.png", alt: "MONCRÉ No.1 — słoik, przód", width: 724, height: 572 },
      { src: "/images/products/matte-clay/box-front.png", alt: "MONCRÉ No.1 — pudełko, przód", width: 868, height: 658 },
      { src: "/images/products/matte-clay/jar-side.png", alt: "MONCRÉ No.1 — słoik, bok z opisem i sposobem użycia", width: 724, height: 572 },
      { src: "/images/products/matte-clay/box-side.png", alt: "MONCRÉ No.1 — pudełko z monogramem M", width: 870, height: 648 },
      { src: "/images/products/matte-clay/box-back.png", alt: "MONCRÉ No.1 — pudełko, tył ze składem i sposobem użycia", width: 1050, height: 708 },
    ],
    bestseller: true,
  },
];

/** Shop tabs — only categories that actually have products. */
export const categories: { key: ProductCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  ...(["clay", "pomade", "powder", "spray", "sets"] as const)
    .filter((c) => products.some((p) => p.category === c))
    .map((c) => ({ key: c, label: c[0].toUpperCase() + c.slice(1) })),
];
