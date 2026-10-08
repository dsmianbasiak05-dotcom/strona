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
| Zdjęcia produktów | Oficjalne packshoty ma tylko **No.1 Matte Clay** (`public/images/products/matte-clay/`). Pozostałe produkty mają pusty `product.images` → neutralny kafel „Packshot coming soon” (nigdy wymyślone opakowanie). Nowe zdjęcia: dodać PNG z przezroczystym tłem do `images` produktu. |
| Ceny, opisy, skład INCI | `src/data/products.ts`. Dla Matte Clay copy z opakowania („For daily chaos”, sposób użycia); gramatura `75 g` jest na makiecie w nawiasie (do potwierdzenia), INCI to wciąż szablon. |
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
