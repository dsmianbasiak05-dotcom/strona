import type { Service } from "@/types/content";

/** Working service descriptions — confirm the scope with the brand before publishing. */
export const services: Service[] = [
  {
    id: "projektowanie-wnetrz",
    number: "01",
    title: "Projektowanie wnętrz",
    description:
      "Przemyślane układy, spójna estetyka i rozwiązania dopasowane do charakteru przestrzeni oraz potrzeb jej użytkowników.",
    icon: "plan",
  },
  {
    id: "dobor-materialow",
    number: "02",
    title: "Dobór materiałów",
    description:
      "Starannie dobrane materiały wykończeniowe i elementy wyposażenia, które tworzą harmonijną całość.",
    icon: "materials",
  },
  {
    id: "dostawa-zamowienia",
    number: "03",
    title: "Dostawa i obsługa zamówień",
    description:
      "Wsparcie w organizacji zamówień i dostaw materiałów, pomagające sprawniej przejść przez proces realizacji wnętrza.",
    icon: "delivery",
  },
  {
    id: "kompleksowe-wsparcie",
    number: "04",
    title: "Kompleksowe wsparcie realizacji",
    description:
      "Pomoc w koordynacji procesu doboru i zamawiania elementów wyposażenia, z naciskiem na spójność i dobrą organizację.",
    icon: "coordination",
  },
];
