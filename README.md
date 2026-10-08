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
| Zdjęcia produktów | `product.images` w `src/data/products.ts` — gdy są puste, renderowana jest ilustracja SVG opakowania (`product-visual.tsx`). |
| Ceny, pojemności, opisy, sposób użycia, skład INCI | `src/data/products.ts` (żadne właściwości nie są podane jako fakty). |
| Logo | `src/components/ui/logo.tsx` — obecnie wordmark złożony fontem Anton; podmienić na plik SVG. |
| Zdjęcia stylów / community | `style-pattern.tsx`, `community.tsx` — abstrakcyjne wzory, oznaczone „Photo placeholder”. |
| E-mail, social, progi dostawy | `src/config/site.ts` |
| Regulamin, polityka prywatności, cookies | sekcje na `/contact` |

## Integracje (przygotowana architektura)

- **Katalog**: UI czyta dane wyłącznie przez `src/lib/commerce/index.ts` (async) — wystarczy podmienić implementację na Shopify Storefront API / WooCommerce REST / Supabase.
- **Płatności**: interfejs `PaymentProvider` w `src/lib/commerce/checkout.ts` (obecnie `mockPaymentProvider`). Stripe / Przelewy24 / PayU implementują `createCheckout` po stronie serwera i zwracają `redirectUrl`.
- **Koszyk**: Zustand + `persist` (localStorage), przechowuje tylko `productId/variantId/quantity`.
