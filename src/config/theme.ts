/**
 * Brand palette. The same values are declared as Tailwind tokens in
 * src/app/globals.css (@theme) — change both together.
 * Used directly where CSS is not available (OG image, viewport theme color).
 */
export const palette = {
  sand: "#D8C8B4", // ciepły beż — powierzchnie akcentowe
  cream: "#F5F1EA", // jasny krem — tła sekcji
  paper: "#FCFBF8", // złamana biel — tło strony
  ink: "#171715", // głęboka czerń — typografia, sekcje kontrastowe
  stone: "#827B73", // ciepły szary — linie, detale, duże napisy
  /** Darker warm grey for small body text — keeps WCAG AA contrast on paper/cream. */
  stoneDeep: "#615B54",
} as const;
