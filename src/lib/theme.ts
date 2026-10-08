import type { CSSProperties } from "react";
import type { ProductTheme } from "@/lib/commerce/types";

/**
 * Brand-neutral fallback theme — used when a product has no palette yet.
 * Values mirror the BRAND tokens in globals.css.
 */
export const neutralTheme: ProductTheme = {
  primary: "#141416",
  secondary: "#f7f6f2",
  accent: "#66666c",
  background: "#ece9e2",
};

/**
 * Inline CSS variables that scope a product's palette to an element.
 * Every descendant can then use `bg-product`, `text-product-secondary`,
 * `bg-product-bg`, `border-product-accent`… (see globals.css).
 */
export function themeStyle(theme: ProductTheme | undefined = neutralTheme): CSSProperties {
  return {
    "--p-primary": theme.primary,
    "--p-secondary": theme.secondary,
    "--p-accent": theme.accent,
    "--p-background": theme.background,
  } as CSSProperties;
}
