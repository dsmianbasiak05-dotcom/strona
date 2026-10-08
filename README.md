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
