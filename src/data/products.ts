import type { Product, ProductCategory, StyleKey } from "@/lib/commerce/types";

/**
 * ⚠️ PLACEHOLDER CATALOG
 * Names follow the brief; prices, sizes, copy and usage notes are DEMO
 * content. Nothing here is a verified claim about product performance
 * or formulation. Replace with data from the brand / commerce backend.
 */

const pln = (zl: number) => ({ amount: Math.round(zl * 100), currency: "PLN" as const });

export const products: Product[] = [
  {
    id: "p_matte_clay",
    slug: "matte-clay",
    name: "MONCRÉ Matte Clay",
    type: "Matte Clay",
    category: "clay",
    styles: ["matte", "textured"],
    tagline: "Matowe wykończenie. Twoje zasady.",
    description:
      "Glinka do włosów stworzona z myślą o fryzurach z matowym wykończeniem i wyraźną teksturą. Do codziennej stylizacji — od crop po quiff.",
    details: [
      "Efekt: matowy, teksturowany",
      "Do krótkich i średnich włosów",
      "Pojemność wg wariantu",
    ],
    howToUse: [
      "Nabierz niewielką ilość i rozgrzej w dłoniach.",
      "Wmasuj w suche lub lekko wilgotne włosy, od nasady po końce.",
      "Uformuj fryzurę palcami lub grzebieniem.",
    ],
    ingredients: null,
    variants: [
      { id: "v_matte_clay_100", title: "100 ml", price: pln(79), available: true },
      { id: "v_matte_clay_50", title: "50 ml", price: pln(49), available: true },
    ],
    images: [],
    packaging: "jar",
    bestseller: true,
    placeholder: true,
  },
  {
    id: "p_texture_powder",
    slug: "texture-powder",
    name: "MONCRÉ Texture Powder",
    type: "Texture Powder",
    category: "powder",
    styles: ["volume", "textured"],
    tagline: "Objętość bez wysiłku.",
    description:
      "Puder do włosów do budowania objętości i lekkiej, rozbitej tekstury. Kilka wstrząśnięć i gotowe.",
    details: [
      "Efekt: objętość, tekstura",
      "Do cienkich i średnich włosów",
      "Pojemność wg wariantu",
    ],
    howToUse: [
      "Rozdziel suche włosy i nasyp niewielką ilość pudru u nasady.",
      "Wmasuj opuszkami palców, by podnieść włosy.",
      "Dołóż odrobinę, jeśli potrzebujesz więcej objętości.",
    ],
    ingredients: null,
    variants: [{ id: "v_texture_powder_20", title: "20 g", price: pln(59), available: true }],
    images: [],
    packaging: "shaker",
    bestseller: true,
    placeholder: true,
  },
  {
    id: "p_pomade",
    slug: "pomade",
    name: "MONCRÉ Pomade",
    type: "Pomade",
    category: "pomade",
    styles: ["slick"],
    tagline: "Czyste linie. Pełna kontrola.",
    description:
      "Pomada do włosów do gładkich, uporządkowanych fryzur — slick back, side part i klasyczne cięcia barberskie.",
    details: ["Efekt: gładki, uporządkowany", "Do średnich i dłuższych włosów", "Pojemność wg wariantu"],
    howToUse: [
      "Nabierz niewielką ilość i rozprowadź w dłoniach.",
      "Nałóż na wilgotne lub suche włosy.",
      "Przeczesz grzebieniem, by uzyskać czyste linie.",
    ],
    ingredients: null,
    variants: [
      { id: "v_pomade_100", title: "100 ml", price: pln(69), available: true },
      { id: "v_pomade_50", title: "50 ml", price: pln(45), available: true },
    ],
    images: [],
    packaging: "jar",
    bestseller: true,
    placeholder: true,
  },
  {
    id: "p_sea_salt_spray",
    slug: "sea-salt-spray",
    name: "MONCRÉ Sea Salt Spray",
    type: "Sea Salt Spray",
    category: "spray",
    styles: ["natural", "textured", "volume"],
    tagline: "Naturalny look. Zero wysiłku.",
    description:
      "Spray z solą morską jako baza pod stylizację lub samodzielny produkt do luźnych, naturalnych fryzur.",
    details: ["Efekt: naturalny, lekka tekstura", "Do każdej długości włosów", "Pojemność wg wariantu"],
    howToUse: [
      "Wstrząśnij przed użyciem.",
      "Spryskaj wilgotne włosy z odległości ok. 20 cm.",
      "Wysusz suszarką lub pozostaw do naturalnego wyschnięcia.",
    ],
    ingredients: null,
    variants: [{ id: "v_sea_salt_200", title: "200 ml", price: pln(65), available: true }],
    images: [],
    packaging: "spray",
    bestseller: true,
    placeholder: true,
  },
  {
    id: "p_set_daily",
    slug: "daily-set",
    name: "MONCRÉ Daily Set",
    type: "Set — Clay + Spray",
    category: "sets",
    styles: ["matte", "textured", "natural"],
    tagline: "Codzienna rutyna w dwóch krokach.",
    description: "Zestaw Matte Clay i Sea Salt Spray — baza i wykończenie w jednym pudełku.",
    details: ["Zawiera: Matte Clay 100 ml, Sea Salt Spray 200 ml"],
    howToUse: [
      "Spryskaj wilgotne włosy Sea Salt Spray i wysusz.",
      "Wykończ fryzurę niewielką ilością Matte Clay.",
    ],
    ingredients: null,
    variants: [{ id: "v_set_daily", title: "Zestaw", price: pln(129), available: true }],
    images: [],
    packaging: "set",
    includes: ["matte-clay", "sea-salt-spray"],
    placeholder: true,
  },
  {
    id: "p_set_volume",
    slug: "volume-set",
    name: "MONCRÉ Volume Set",
    type: "Set — Powder + Spray",
    category: "sets",
    styles: ["volume", "textured"],
    tagline: "Maksimum objętości.",
    description: "Zestaw Texture Powder i Sea Salt Spray dla fryzur, które mają mieć objętość i ruch.",
    details: ["Zawiera: Texture Powder 20 g, Sea Salt Spray 200 ml"],
    howToUse: [
      "Spryskaj wilgotne włosy Sea Salt Spray i wysusz, unosząc u nasady.",
      "Dodaj Texture Powder u nasady dla dodatkowej objętości.",
    ],
    ingredients: null,
    variants: [{ id: "v_set_volume", title: "Zestaw", price: pln(109), available: true }],
    images: [],
    packaging: "set",
    includes: ["texture-powder", "sea-salt-spray"],
    placeholder: true,
  },
  {
    id: "p_set_essentials",
    slug: "essentials-set",
    name: "MONCRÉ Essentials Set",
    type: "Set — Full Line",
    category: "sets",
    styles: ["matte", "textured", "volume", "slick", "natural"],
    tagline: "Cała linia. Każdy styl.",
    description: "Wszystkie cztery produkty MONCRÉ w jednym zestawie. Dla tych, którzy lubią mieć wybór.",
    details: ["Zawiera: Matte Clay, Texture Powder, Pomade, Sea Salt Spray"],
    howToUse: ["Dobierz produkt do fryzury — sprawdź sekcję What's your style?"],
    ingredients: null,
    variants: [{ id: "v_set_essentials", title: "Zestaw", price: pln(239), available: true }],
    images: [],
    packaging: "set",
    includes: ["matte-clay", "texture-powder", "pomade", "sea-salt-spray"],
    placeholder: true,
  },
];

export const categories: { key: ProductCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "clay", label: "Clay" },
  { key: "pomade", label: "Pomade" },
  { key: "powder", label: "Powder" },
  { key: "spray", label: "Spray" },
  { key: "sets", label: "Sets" },
];

export const styles: { key: StyleKey; label: string; line: string }[] = [
  { key: "matte", label: "Matte", line: "Zero połysku. Czysty, surowy look." },
  { key: "textured", label: "Textured", line: "Rozbita struktura i charakter." },
  { key: "volume", label: "Volume", line: "Uniesione u nasady. Więcej ruchu." },
  { key: "slick", label: "Slick", line: "Gładko, precyzyjnie, klasycznie." },
  { key: "natural", label: "Natural", line: "Jakbyś nic nie robił. Ale zrobiłeś." },
];
