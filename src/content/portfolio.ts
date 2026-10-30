import type { Project } from "@/types/content";

/**
 * Real projects only. While this list is empty the portfolio section shows a
 * neutral "in preparation" state instead of a gallery.
 *
 * Example entry (photos in /public/images/realizacje/<slug>/):
 * {
 *   slug: "mieszkanie-na-poddaszu",
 *   title: "Mieszkanie na poddaszu",
 *   spaceType: "Mieszkanie",
 *   excerpt: "Krótki opis projektu.",
 *   cover: { src: "/images/realizacje/mieszkanie-na-poddaszu/01.jpg", alt: "Salon z …", width: 1600, height: 1200 },
 *   gallery: [],
 *   details: [{ label: "Metraż", value: "…" }],
 * }
 */
export const projects: Project[] = [];
