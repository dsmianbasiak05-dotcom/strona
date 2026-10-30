import type { InterestId } from "@/types/content";

export const interestOptions: { value: InterestId; label: string }[] = [
  { value: "projektowanie-wnetrz", label: "Projektowanie wnętrz" },
  { value: "dobor-materialow", label: "Dobór materiałów" },
  { value: "dostawa-zamowienia", label: "Dostawa i obsługa zamówień" },
  { value: "kompleksowe-wsparcie", label: "Kompleksowe wsparcie" },
  { value: "inne", label: "Inne" },
];
