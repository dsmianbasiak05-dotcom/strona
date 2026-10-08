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

## Design system

- **Kolory** (`src/app/globals.css`, `@theme`): navy `#171936`/`#202342`, cream `#F4EEDC`, paper `#F7F6F1`, stone `#D9D9D6`.
  Domyślne tło jest jasne (paper), navy pojawia się w akcentach — bez „przesadzonej czerni”.
- **Typografia**: Anton (display, nagłówki) + Manrope (tekst użytkowy). Klasy `.display` i `.label`.
- **Ruch**: jedna krzywa `cubic-bezier(.22,1,.36,1)`, maskowane wejścia linii nagłówków, parallax, scroll-scenes.
  `MotionConfig reducedMotion="user"` + globalna reguła CSS respektują `prefers-reduced-motion`.

## Placeholdery — do podmiany przed startem

| Co | Gdzie |
|---|---|
| Katalog | MONCRÉ sprzedaje obecnie **jeden produkt: No.1 Matte Clay, 85 zł brutto** (`src/data/products.ts`). Dane produktu pochodzą wyłącznie od marki (cena) lub z opakowania (nazwa, „For daily chaos”, wykończenie matowe, sposób użycia). Gramatura nie jest pokazywana (na makiecie „[75] g” — do potwierdzenia), skład INCI nie jest publikowany (na makiecie szablon). |
| Kolejne produkty | Dodać obiekt do `products` — sklep automatycznie przełączy się z widoku jednego produktu na siatkę z kategoriami, wyszukiwarką i sortowaniem. Produkt bez zdjęć pokaże neutralny kafel „Packshot coming soon”. |
| Dostawa i zwroty | `src/config/site.ts` — koszty InPost/DPD, próg darmowej dostawy (199 zł) i terminy to nadal dane demonstracyjne. |
| Logo | `src/components/ui/logo.tsx` — wordmark złożony fontem Anton. Opakowanie używa innego kroju (szeryf blokowy) — podmienić na oficjalny plik SVG. |
| Community | `community.tsx` — oficjalne packshoty + tekstury jako podgląd feedu; brak prawdziwych zdjęć UGC. |
| E-mail, social, progi dostawy | `src/config/site.ts` |
| Regulamin, polityka prywatności, cookies | sekcje na `/contact` |

## Zdjęcia produktów — pipeline

Packshoty Matte Clay powstały z dostarczonych renderów: usunięcie neutralnego szarego tła studia
(maska na podstawie chromatyczności — piksele opakowania nie są modyfikowane), rozdzielenie słoika i pudełka,
przycięcie i jednolite skalowanie 2× (bez zmiany proporcji). Wyświetlane zawsze z `object-contain`.
Rendery mają ok. 360 px szczegółu na produkt — do większych formatów (hero, kampanie) potrzebne są pliki ≥ 2000 px.

## Integracje (przygotowana architektura)

- **Katalog**: UI czyta dane wyłącznie przez `src/lib/commerce/index.ts` (async) — wystarczy podmienić implementację na Shopify Storefront API / WooCommerce REST / Supabase.
- **Płatności**: interfejs `PaymentProvider` w `src/lib/commerce/checkout.ts` (obecnie `mockPaymentProvider`). Stripe / Przelewy24 / PayU implementują `createCheckout` po stronie serwera i zwracają `redirectUrl`.
- **Koszyk**: Zustand + `persist` (localStorage), przechowuje tylko `productId/variantId/quantity`.
