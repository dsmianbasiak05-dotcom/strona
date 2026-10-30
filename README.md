# STILL LIVING — strona internetowa

Strona marki **STILL LIVING** — architektura i projektowanie wnętrz, dobór materiałów i wyposażenia, obsługa zamówień i wsparcie realizacji.

**Stos:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · `next/font` (Cormorant Garamond + Manrope, licencja OFL).
Brak bibliotek animacji i zależności runtime poza Next/React — animacje to CSS + jeden `IntersectionObserver`.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run lint         # ESLint (next/core-web-vitals + TS)
npm run typecheck    # tsc --noEmit
npm test             # testy walidacji formularza (node:test)
```

Wymagany Node.js ≥ 20.19 (testy korzystają z natywnej obsługi TypeScript w Node ≥ 22.18).

## Struktura

```
src/
  app/
    layout.tsx               # fonty, metadane SEO/OG, nagłówek, stopka
    page.tsx                 # strona główna (sekcje + JSON-LD)
    polityka-prywatnosci/    # szablon polityki prywatności (noindex do czasu uzupełnienia)
    api/contact/route.ts     # odbiór formularza kontaktowego
    opengraph-image.tsx      # generowana grafika udostępniania 1200×630
    sitemap.ts, robots.ts, icon.svg, not-found.tsx, globals.css
  components/
    layout/                  # header (menu mobilne), footer
    sections/                # hero, intro, services, approach, portfolio, testimonials, contact
    forms/                   # formularz kontaktowy
    ui/                      # przyciski, nagłówki sekcji, ikony, kompozycje graficzne, reveal
  config/
    site.ts                  # marka, URL, kontakt, social, dane firmy, SEO
    navigation.ts            # menu, kotwice sekcji, CTA
    theme.ts                 # paleta (lustrzana do tokenów w globals.css)
  content/                   # WSZYSTKIE teksty i dane: home, services, approach,
                             # portfolio, testimonials, partners, contact-form
  lib/                       # walidacja i wysyłka formularza, cn()
  types/content.ts           # typy danych (Service, Project, Testimonial, Partner…)
assets/fonts/                # fonty dla generatora grafiki OG
```

Zasada: komponenty tylko wyświetlają dane. Zmiana tekstu = edycja pliku w `src/content/` lub `src/config/`.

## System wizualny

- **Paleta** (`src/app/globals.css` → `@theme`, `src/config/theme.ts`): `sand` #D8C8B4, `cream` #F5F1EA, `paper` #FCFBF8, `ink` #171715, `stone` #827B73.
  Dodatkowo `stone-deep` #615B54 — ciepły szary do drobnego tekstu (oryginalny #827B73 ma kontrast ok. 4:1 na jasnym tle, poniżej WCAG AA dla małych liter, więc służy do linii, detali i dużych napisów).
- **Typografia:** Cormorant Garamond (nagłówki, editorial), Manrope (tekst, nawigacja, przyciski). Płynna skala `text-display`, `text-h2`, `text-h3`, `text-lead` oparta na `clamp()`.
- **Rytm:** `container-site` (szerokość + marginesy), `section-y` (pionowe odstępy sekcji), `eyebrow` (etykiety).
- **Animacje:** maskowane linie nagłówka hero (CSS), łagodne pojawianie się elementów z `data-reveal` (obsługiwane przez `RevealObserver`). Respektują `prefers-reduced-motion`; bez JavaScriptu treść jest po prostu widoczna.

## Co wymaga konfiguracji przed publikacją

| Element | Gdzie | Stan |
|---|---|---|
| Wysyłka formularza | zmienne środowiskowe (`.env.example`) | **Nieaktywna.** Formularz pokazuje widoczną informację „Formularz w trakcie konfiguracji”, a API zwraca 503 — nic nie jest udawane ani zapisywane. |
| Domena | `SITE_URL` | Bez niej adresy kanoniczne i JSON-LD są wyłączone; na Vercel użyty zostanie adres produkcyjny projektu. |
| Dane kontaktowe (e-mail, telefon, adres) | `src/config/site.ts` → `contact` | Puste — nie są wyświetlane. Stopka kieruje do formularza. |
| Media społecznościowe | `src/config/site.ts` → `social` | Puste — linki pojawią się automatycznie po uzupełnieniu. |
| Nazwa firmy / NIP | `src/config/site.ts` → `company` | Puste — używane w stopce i polityce prywatności. |
| Polityka prywatności | `src/app/polityka-prywatnosci/page.tsx` | Szablon z oznaczeniami `[do uzupełnienia]`, `noindex`. Do weryfikacji (najlepiej prawnej). Po uzupełnieniu usuń `robots: { index: false }` i dodaj stronę do `sitemap.ts`. |
| Treści marketingowe | `src/content/*.ts` | Robocze — do zatwierdzenia przez markę (szczególnie zakres usług). |
| Google Search Console | `GOOGLE_SITE_VERIFICATION` | Opcjonalnie; alternatywnie weryfikacja przez DNS. |
| Logo | `src/components/ui/logo.tsx` | Typograficzne. Docelowe SVG wstaw w tym komponencie. |

## Formularz kontaktowy

- Walidacja współdzielona (`src/lib/contact-validation.ts`) — w przeglądarce (komunikaty przy polach, fokus na pierwszym błędzie) i na serwerze (źródło prawdy).
- Stany: ładowanie, blokada podwójnego wysłania, sukces, błędy (walidacja / brak konfiguracji / błąd dostawcy / brak sieci).
- Antyspam adekwatny do skali: pole-pułapka (honeypot), minimalny czas wypełnienia, limit rozmiaru żądania. Przy większym ruchu dodaj Cloudflare Turnstile lub hCaptcha (weryfikacja tokena w `route.ts`) oraz limit żądań (np. Vercel Firewall / Upstash Ratelimit).
- Wysyłka (`src/lib/contact-delivery.ts`), pierwszy skonfigurowany kanał:
  - **Resend** — `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (adres w zweryfikowanej domenie), `CONTACT_TO_EMAIL`;
  - **Webhook** — `CONTACT_WEBHOOK_URL` (Make, Zapier, n8n, Google Apps Script) — JSON z polami formularza.
- Strona główna jest generowana statycznie, więc informacja o stanie formularza jest ustalana podczas builda — po zmianie zmiennych środowiskowych wykonaj ponowne wdrożenie (na Vercel i tak jest to wymagane).
- Karty usług prowadzą do `/?temat=<id-usługi>#kontakt` — temat jest wtedy wstępnie wybrany.

## Własne zdjęcia

1. Umieść pliki w `public/images/` (np. `public/images/hero.jpg`; zalecane ≥ 1600 px po dłuższym boku, JPG/WebP). Next.js sam generuje AVIF/WebP w odpowiednich rozmiarach.
2. **Hero:** w `src/content/home.ts` ustaw
   `image: { src: "/images/hero.jpg", alt: "Opis tego, co widać na zdjęciu", width: 1600, height: 2000 }`.
   Kompozycja graficzna zostanie automatycznie zastąpiona zdjęciem (ładowanym priorytetowo, kadr łukowy 4:5).
3. Używaj wyłącznie zdjęć, do których marka ma prawa, i nie przedstawiaj zdjęć stockowych jako własnych realizacji.

Grafika udostępniania: domyślnie generowana (`src/app/opengraph-image.tsx`). Aby użyć własnej, usuń ten plik i dodaj `src/app/opengraph-image.jpg` (1200 × 630 px).

## Rozbudowa

- **Portfolio:** dodaj obiekty `Project` do `src/content/portfolio.ts` (wzór w komentarzu), zdjęcia w `public/images/realizacje/<slug>/`. Sekcja automatycznie przełączy się ze stanu „w przygotowaniu” na siatkę realizacji. Podstrony: utwórz `src/app/realizacje/[slug]/page.tsx` z `generateStaticParams()` czytającym `projects`, a slug dodaj do `sitemap.ts`.
- **Opinie:** dodaj prawdziwe opinie (za zgodą klientów) do `src/content/testimonials.ts` — sekcja pojawi się automatycznie. Dopóki lista jest pusta, sekcja nie jest renderowana.
- **Marki partnerskie:** typ `Partner` i plik `src/content/partners.ts` są przygotowane, ale katalog nie jest jeszcze wyświetlany. Gdy pojawią się potwierdzone dane: komponent `src/components/sections/partners.tsx` (lub strona `src/app/marki/page.tsx`) czytający `partners`, logotypy w `public/images/marki/`.
- **Podstrony usług:** utwórz np. `src/app/uslugi/[id]/page.tsx` i ustaw `href` w danej usłudze w `src/content/services.ts` — karta zacznie prowadzić do podstrony zamiast do formularza.
- **Artykuły / poradniki:** MDX (`@next/mdx`) lub headless CMS (Sanity, Storyblok) — warstwa `src/content/` jest miejscem, w którym dane można później pobierać z CMS bez zmiany komponentów.
- Nawigacja: `src/config/navigation.ts`.

## Wdrożenie na Vercel

1. Zaimportuj repozytorium w Vercel (framework wykrywany automatycznie, bez dodatkowej konfiguracji).
2. Ustaw zmienne środowiskowe z `.env.example` (Production): `SITE_URL`, kanał wysyłki formularza, opcjonalnie `GOOGLE_SITE_VERIFICATION`.
3. Podłącz domenę i ustaw ją jako `SITE_URL`.
4. Po wdrożeniu: wyślij testową wiadomość przez formularz, sprawdź `/sitemap.xml`, `/robots.txt`, podgląd linku (np. debugger Facebooka / LinkedIn Post Inspector) i zgłoś sitemapę w Google Search Console.

Sekrety są czytane wyłącznie po stronie serwera; żadna zmienna nie ma prefiksu `NEXT_PUBLIC_`.

## Lista kontrolna przed publikacją

- [ ] Zatwierdzone treści sekcji i opisy usług (`src/content/`)
- [ ] Domena (`SITE_URL`) i skonfigurowana wysyłka formularza — przetestowana
- [ ] Dane firmy i kontaktowe (`src/config/site.ts`)
- [ ] Uzupełniona i zweryfikowana polityka prywatności (+ indeksowanie i sitemap)
- [ ] Prawdziwe profile społecznościowe (jeśli istnieją)
- [ ] Zdjęcie hero i docelowa grafika OG (opcjonalnie)
- [ ] Logo SVG (opcjonalnie)
- [ ] Obszar działania — dopiero po potwierdzeniu dodać frazy lokalne i dane `LocalBusiness`
