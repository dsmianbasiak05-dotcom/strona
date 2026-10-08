/**
 * Official MONCRÉ No.1 renders (2000 px, light studio background).
 * Used as-is — only framed/cropped with CSS `object-fit`, never altered.
 * `focus` documents where the product sits so crops never cut the pack.
 */
export interface Render {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const base = "/images/products/no-1";

export const renders = {
  set: {
    src: `${base}/set.jpg`,
    alt: "MONCRÉ No.1 — słoik i pudełko",
    width: 2000,
    height: 1125,
  },
  jarFront: {
    src: `${base}/jar-front.jpg`,
    alt: "MONCRÉ No.1 — słoik, przód z napisem MONCRÉ i „No.1 matte clay”",
    width: 2000,
    height: 2000,
  },
  jarBack: {
    src: `${base}/jar-back.jpg`,
    alt: "MONCRÉ No.1 — tył słoika: skład, sposób użycia i ATTENTION!",
    width: 2000,
    height: 2000,
  },
  lid: {
    src: `${base}/lid.jpg`,
    alt: "MONCRÉ No.1 — wieczko z monogramem M",
    width: 2000,
    height: 2000,
  },
  box: {
    src: `${base}/box.jpg`,
    alt: "MONCRÉ No.1 — pudełko w ujęciu 3/4",
    width: 2000,
    height: 2000,
  },
} satisfies Record<string, Render>;
