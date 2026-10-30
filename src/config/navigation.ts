import type { NavItem } from "@/types/content";

/** Section anchors on the home page. Prefixed with "/" so they also work from subpages. */
export const sectionIds = {
  about: "o-nas",
  services: "uslugi",
  approach: "podejscie",
  portfolio: "realizacje",
  contact: "kontakt",
} as const;

export const mainNav: NavItem[] = [
  { label: "O nas", href: `/#${sectionIds.about}` },
  { label: "Usługi", href: `/#${sectionIds.services}` },
  { label: "Nasze podejście", href: `/#${sectionIds.approach}` },
  { label: "Kontakt", href: `/#${sectionIds.contact}` },
];

export const primaryCta: NavItem = {
  label: "Porozmawiajmy o Twoim wnętrzu",
  href: `/#${sectionIds.contact}`,
};

export const legalNav: NavItem[] = [{ label: "Polityka prywatności", href: "/polityka-prywatnosci" }];
