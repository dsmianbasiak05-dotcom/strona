import type { InterestId } from "@/lib/contact-validation";

export type { InterestId };

/** Shared content types. Data lives in src/content and src/config; components only render it. */

export interface NavItem {
  label: string;
  href: string;
}

export interface ImageAsset {
  /** Path under /public (e.g. "/images/hero.jpg") or an allowed remote URL. */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type ServiceIcon = "plan" | "materials" | "delivery" | "coordination";

export interface Service {
  /** Stable id — also used as the contact form "topic" value. */
  id: InterestId;
  number: string;
  title: string;
  description: string;
  icon: ServiceIcon;
  /** Future dedicated page (e.g. "/uslugi/projektowanie-wnetrz"). Until it exists the card links to the contact form. */
  href?: string;
}

export interface Pillar {
  number: string;
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  /** e.g. "Mieszkanie", "Dom jednorodzinny" */
  spaceType: string;
  excerpt: string;
  cover: ImageAsset;
  gallery?: ImageAsset[];
  details?: { label: string; value: string }[];
}

export interface Testimonial {
  quote: string;
  author: string;
  /** Optional context, e.g. "Projekt mieszkania". Never invented. */
  context?: string;
}

export interface Partner {
  name: string;
  slug: string;
  category: string;
  url?: string;
  logo?: ImageAsset;
}

