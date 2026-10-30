import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** Public, indexable routes. Add service / portfolio pages here as they are created. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteConfig.url}/`, changeFrequency: "monthly", priority: 1 },
  ];
}
