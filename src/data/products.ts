import type { Product, ProductCategory } from "@/lib/commerce/types";

/**
 * CATALOG — MONCRÉ currently sells exactly one product: No.1 Matte Clay.
 * Only information confirmed by the brand (price) or printed on the
 * official pack renders is used. Do not add product claims here that the
 * brand has not provided.
 */

const pln = (zl: number) => ({ amount: Math.round(zl * 100), currency: "PLN" as const });

export const products: Product[] = [
  {
    id: "p_matte_clay",
    slug: "matte-clay",
    name: "MONCRÉ No.1 Matte Clay",
    type: "No.1 Matte Clay",
    category: "clay",
    // Finish stated on the pack ("FINISH: MATTE").
    styles: ["matte"],
    tagline: "For daily chaos.", // from the pack
    description: "No.1 Matte Clay — glinka do włosów MONCRÉ z matowym wykończeniem.",
    details: ["Wykończenie: matowe (Finish: Matte)"], // from the pack
    // From the pack: "Rozetrzyj niewielką ilość w dłoniach i wmasuj w suche włosy. Ułóż palcami."
    howToUse: ["Rozetrzyj niewielką ilość w dłoniach.", "Wmasuj w suche włosy.", "Ułóż palcami."],
    // INCI on the render is still a template — not published until the brand provides it.
    ingredients: null,
    variants: [
      // Single variant. Net weight is not confirmed (the pack mockup shows "[75] g"), so no
      // size is displayed. Price confirmed by the brand: 85 zł gross.
      { id: "v_matte_clay", title: "No.1 Matte Clay", price: pln(85), available: true },
    ],
    images: [
      { src: "/images/products/matte-clay/jar-front.png", alt: "MONCRÉ No.1 Matte Clay — słoik, przód", width: 724, height: 572 },
      { src: "/images/products/matte-clay/box-front.png", alt: "MONCRÉ No.1 Matte Clay — pudełko, przód", width: 868, height: 658 },
      { src: "/images/products/matte-clay/jar-side.png", alt: "MONCRÉ No.1 Matte Clay — słoik, bok z opisem i sposobem użycia", width: 724, height: 572 },
      { src: "/images/products/matte-clay/box-side.png", alt: "MONCRÉ No.1 Matte Clay — pudełko z monogramem M", width: 870, height: 648 },
      { src: "/images/products/matte-clay/box-back.png", alt: "MONCRÉ No.1 Matte Clay — pudełko, tył ze składem i sposobem użycia", width: 1050, height: 708 },
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
