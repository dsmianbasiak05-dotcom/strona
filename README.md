# MONCRÉ — sklep e-commerce (prototyp)

Prototyp sklepu marki MONCRÉ — kosmetyki do stylizacji męskich włosów.
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Zustand · Lucide.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint && npm run typecheck
```

## Struktura

```
src/
  app/                    # routing: /, /shop, /product/[slug], /about, /contact,
                          # /cart, /checkout, /account, /favorites, sitemap, robots, OG image
  components/
    layout/               # header (+ mega menu), mobile menu, search overlay, cart drawer, footer
    home/                 # sekcje strony głównej
    product/              # karta produktu, galeria, panel zakupowy, ilustracje opakowań
    shop/ checkout/       # widoki sklepu, ulubionych, koszyka, checkoutu, konta
    ui/                   # Button, Reveal/RevealLines, Marquee, Logo, QuantityStepper, PageIntro
  config/site.ts          # dane kontaktowe, social, progi dostawy (PLACEHOLDERY)
  data/products.ts        # katalog demonstracyjny (PLACEHOLDER)
  lib/commerce/           # warstwa danych + adapter płatności (punkt podłączenia backendu)
  store/                  # Zustand: koszyk i ulubione (localStorage), stan UI
```

## System marki i produktów

**Marka (stała dla wszystkich produktów)** — `src/app/globals.css`:
- kolory marki: `ink`, `ink-800/700`, `graphite`, `paper`, `bone`, `stone` (neutralne — strona nie przejmuje koloru produktu),
- typografia: Anton (display) + Space Mono (tekst, nawiązuje do drobnego druku na opakowaniu),
- rytm: `container-x` (szerokość + marginesy), `section-y` (pionowe odstępy sekcji), ostre krawędzie (brak zaokrągleń kart),
- komponenty marki: `src/components/brand/` (logo, nagłówki sekcji, pasek, „Built for the way you wear it”, „For daily chaos.”).

**Produkt (akcent)** — `product.theme = { primary, secondary, accent, background }` w `src/data/products.ts`.
`themeStyle(theme)` (`src/lib/theme.ts`) ustawia zmienne `--p-*` na elemencie, a potomkowie używają klas
`bg-product`, `text-product-secondary`, `bg-product-bg`, `border-product-accent`. Bez motywu — neutralne kolory marki.

**Zdjęcia według roli** — `product.images[].role`: `front`, `set`, `packaging`, `back`, `lid` (+ `focus` = kadrowanie).
Komponenty wybierają zdjęcie po roli (`productImage()`), więc nowy produkt z innym zestawem ujęć nie wymaga zmian w UI.

**Produkt demonstracyjny (DEMO / CONCEPT):** `MONCRÉ Demo Espresso` w `src/data/products.ts` (`demo: true`,
`status: "concept"`, bez ceny i wariantów) + placeholder `public/images/products/demo-espresso/placeholder.jpg`
(neutralny słoik bez logo MONCRÉ). Widoczny tylko w sklepie i na `/product/demo-espresso` (noindex);
wykluczony ze strony głównej, wyszukiwarki, menu produktów, sitemapy i danych strukturalnych.
Usunięcie: skasować wpis i katalog ze zdjęciem.

**Język:** interfejs po polsku; po angielsku tylko elementy marki/kampanii
(MONCRÉ, YOUR HAIR. YOUR RULES., FOR DAILY CHAOS., COMING SOON, No.1).

**Routing:** `/` → `/shop` (zawsze listing produktów) → `/product/[slug]`.

**Dodanie No.2:** nowy obiekt w `products` (number, theme, images z rolami, status). Sklep od 2 produktów
automatycznie pokazuje siatkę z filtrami; strona główna pokazuje produkt `featured` + pozostałe karty.

## Placeholdery — do podmiany przed startem

| Co | Gdzie |
|---|---|
| Katalog | Jeden produkt: **MONCRÉ No.1** — glinka do włosów, 75 ml, 85 zł brutto, efekt mat + tekstura, utrwalenie średnie do mocnego, do wszystkich rodzajów włosów (`src/data/products.ts`). Zapach nieustalony — nie jest pokazywany. Skład INCI nie jest publikowany. Nie dodawać danych, których marka nie podała. |
| Status sprzedaży | `status: "coming_soon"` — cena jest widoczna, ale wszystkie przyciski zakupu zamieniają się w „Join the waitlist”, a koszyk ignoruje produkty niedostępne. **Start sprzedaży:** zmienić na `status: "active"` (helper `isPurchasable` w `src/lib/commerce/index.ts`). |
| Lista oczekujących | `src/components/product/waitlist-form.tsx` — formularz demonstracyjny, niczego nie zapisuje. Podłączyć do dostawcy (Klaviyo, Mailchimp, Supabase…). |
| Dostawa i zwroty | Nieustalone. `siteConfig.shipping.options` jest puste — UI pokazuje „Warunki dostawy i zwrotów ogłosimy przed startem sprzedaży”, a checkout blokuje złożenie zamówienia do czasu dodania metod dostawy. |
| Metody płatności w checkoucie | BLIK / Przelewy24 / karta to układ demonstracyjny (checkout jest nieosiągalny, dopóki produkt ma status `coming_soon`). |
| Kolejne produkty | Dodać obiekt do `products` — sklep automatycznie przełączy się z widoku jednego produktu na siatkę z kategoriami, wyszukiwarką i sortowaniem. |
| Logo | `src/components/ui/logo.tsx` — wordmark złożony fontem Anton. Opakowanie używa innego kroju (szeryf blokowy) — podmienić na oficjalny plik SVG. |
| Community | `community.tsx` — oficjalne packshoty + tekstury jako podgląd feedu; brak prawdziwych zdjęć UGC. |
| E-mail, social, progi dostawy | `src/config/site.ts` |
| Regulamin, polityka prywatności, cookies | sekcje na `/contact` |

## Zdjęcia produktów

- `public/images/products/no-1/*.jpg` — oficjalne rendery 2000 px (zestaw, słoik przód/tył, wieczko, pudełko), używane bez zmian; kadrowane wyłącznie przez CSS `object-fit`. Lista i opisy w `src/data/media.ts`. Strona główna korzysta z tych plików.
- `public/images/products/matte-clay/*.png` — wcześniejsze packshoty z przezroczystym tłem (karty, galeria produktu, koszyk).

## Zdjęcia produktów — pipeline (packshoty PNG)

Packshoty MONCRÉ No.1 powstały z dostarczonych renderów: usunięcie neutralnego szarego tła studia
(maska na podstawie chromatyczności — piksele opakowania nie są modyfikowane), rozdzielenie słoika i pudełka,
przycięcie i jednolite skalowanie 2× (bez zmiany proporcji). Wyświetlane zawsze z `object-contain`.
Rendery mają ok. 360 px szczegółu na produkt — do większych formatów (hero, kampanie) potrzebne są pliki ≥ 2000 px.

## Integracje (przygotowana architektura)

- **Katalog**: UI czyta dane wyłącznie przez `src/lib/commerce/index.ts` (async) — wystarczy podmienić implementację na Shopify Storefront API / WooCommerce REST / Supabase.
- **Płatności**: interfejs `PaymentProvider` w `src/lib/commerce/checkout.ts` (obecnie `mockPaymentProvider`). Stripe / Przelewy24 / PayU implementują `createCheckout` po stronie serwera i zwracają `redirectUrl`.
- **Koszyk**: Zustand + `persist` (localStorage), przechowuje tylko `productId/variantId/quantity`.
