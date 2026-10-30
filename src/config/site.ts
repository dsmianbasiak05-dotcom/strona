/**
 * Central site configuration: brand, URL, contact details, social links, SEO.
 *
 * Fill in real data only. Empty values are not rendered anywhere,
 * so the site never shows placeholder contact details or dead social links.
 */

function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "STILL LIVING",
  tagline: "Przestrzeń, która ma znaczenie.",
  url: resolveSiteUrl(),
  /** True once a production domain is known — enables canonical URLs and structured data. */
  hasProductionUrl: Boolean(process.env.SITE_URL?.trim() || process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()),
  locale: "pl_PL",
  language: "pl",

  seo: {
    title: "STILL LIVING — projektowanie wnętrz, dobór materiałów i obsługa realizacji",
    description:
      "Projektowanie wnętrz, świadomy dobór materiałów wykończeniowych i wyposażenia oraz wsparcie w organizacji zamówień i dostaw. Od pierwszej koncepcji po ostatni detal.",
    /** Natural topics of the site — no city keywords until the service area is confirmed. */
    keywords: [
      "projektowanie wnętrz",
      "architektura wnętrz",
      "dobór materiałów wykończeniowych",
      "wyposażenie wnętrz",
      "dostawa materiałów wykończeniowych",
      "kompleksowa obsługa realizacji wnętrz",
    ],
    ogImageAlt: "STILL LIVING — Przestrzeń, która ma znaczenie.",
  },

  /** Real contact details only. Leave empty until confirmed — empty fields are hidden. */
  contact: {
    email: "",
    phone: "",
    address: "",
  },

  /** Real profile URLs only. Empty entries are not rendered. */
  social: {
    instagram: "",
    facebook: "",
    pinterest: "",
    linkedin: "",
  },

  /** Legal entity shown in the privacy policy and footer once provided. */
  company: {
    legalName: "",
    taxId: "",
  },
};

export const socialLabels: Record<keyof typeof siteConfig.social, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  pinterest: "Pinterest",
  linkedin: "LinkedIn",
};

export function getSocialLinks() {
  return (Object.keys(siteConfig.social) as (keyof typeof siteConfig.social)[])
    .filter((key) => siteConfig.social[key])
    .map((key) => ({ key, label: socialLabels[key], href: siteConfig.social[key] }));
}
