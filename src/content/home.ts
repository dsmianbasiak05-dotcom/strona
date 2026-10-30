import type { ImageAsset } from "@/types/content";

/**
 * Home page copy. Working marketing texts — verify with the brand before publishing.
 * Components read everything from here, so editing copy never requires touching JSX.
 */
export const heroContent = {
  eyebrow: "Architektura i wyposażenie wnętrz",
  /** Each entry is one visual line of the H1. */
  titleLines: ["Przestrzeń,", "która ma", "znaczenie."],
  lead: "Projektowanie wnętrz, świadomy dobór materiałów i kompleksowa obsługa realizacji. Od pierwszej koncepcji po ostatni detal.",
  primaryCta: "Poznaj nasze usługi",
  secondaryCta: "Porozmawiajmy o Twoim wnętrzu",
  disciplines: ["Projekt", "Materiały", "Realizacja"],
  /**
   * Hero photograph. Set to an ImageAsset (see src/types/content.ts) once a real
   * photo is available, e.g. { src: "/images/hero.jpg", alt: "…", width: 1600, height: 2000 }.
   * Until then an architectural composition is rendered instead.
   */
  image: null as ImageAsset | null,
};

export const introContent = {
  eyebrow: "O nas",
  title: "Dobrze zaprojektowane wnętrze zaczyna się od dobrych decyzji.",
  paragraphs: [
    "STILL LIVING pomaga tworzyć spójne przestrzenie — od projektu, przez wybór materiałów wykończeniowych i wyposażenia, po uporządkowanie zamówień i przygotowanie realizacji.",
    "Łączymy wrażliwość na estetykę z praktycznym podejściem do codziennego użytkowania wnętrza. Każdą decyzję podejmujemy świadomie: tak, aby materiały, formy i detale tworzyły jedną, przemyślaną całość.",
  ],
  values: [
    { title: "Estetyka", description: "Proporcje, światło i kompozycja, które budują charakter wnętrza." },
    { title: "Funkcjonalność", description: "Układ odpowiadający temu, jak naprawdę korzystasz z przestrzeni." },
    { title: "Świadome decyzje", description: "Wybory oparte na potrzebach, budżecie i trwałości rozwiązań." },
    { title: "Spójność materiałów", description: "Faktury, kolory i wykończenia dobrane jako jedna paleta." },
    { title: "Uporządkowany proces", description: "Jasne etapy, od koncepcji po zamówienia i dostawy." },
    { title: "Dbałość o detale", description: "Uwaga poświęcona elementom, które decydują o odbiorze całości." },
  ],
} as const;

export const servicesContent = {
  eyebrow: "Usługi",
  title: "Od koncepcji do gotowego wnętrza.",
  lead: "Cztery obszary, w których wspieramy klientów. Możesz skorzystać z jednego z nich lub połączyć je w spójny proces.",
  linkLabel: "Zapytaj o tę usługę",
} as const;

export const approachContent = {
  eyebrow: "Nasze podejście",
  title: "Piękno wymaga dobrych decyzji.",
  lead: "Wnętrze, które dobrze się starzeje, powstaje na styku trzech wartości. Żadna z nich nie działa bez pozostałych.",
} as const;

export const portfolioContent = {
  eyebrow: "Realizacje",
  title: "Każda przestrzeń zaczyna się od pomysłu.",
  /** Shown while src/content/portfolio.ts is empty. */
  emptyState:
    "Przygotowujemy prezentację wybranych realizacji. Wkrótce pokażemy tu projekty — wraz z opisem przestrzeni, materiałów i decyzji, które je ukształtowały.",
  emptyCta: "Opowiedz nam o swoim projekcie",
} as const;

export const testimonialsContent = {
  eyebrow: "Opinie",
  title: "Słowa naszych klientów.",
} as const;

export const contactContent = {
  eyebrow: "Kontakt",
  title: "Porozmawiajmy o Twojej przestrzeni.",
  lead: "Opowiedz nam o swoim wnętrzu, planach i potrzebach. Wspólnie przyjrzymy się możliwościom i kolejnym krokom.",
  steps: [
    { title: "Opowiedz o wnętrzu", description: "Kilka zdań o przestrzeni, planach i tym, czego potrzebujesz." },
    { title: "Rozmowa", description: "Odpowiemy na wiadomość i ustalimy dogodną formę rozmowy." },
    { title: "Kolejne kroki", description: "Zaproponujemy zakres współpracy dopasowany do Twojego projektu." },
  ],
} as const;

export const footerContent = {
  statement: "Projektowanie wnętrz, dobór materiałów i wsparcie realizacji — od pierwszej koncepcji po ostatni detal.",
} as const;
