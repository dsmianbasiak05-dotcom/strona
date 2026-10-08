import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * MONCRÉ wordmark.
 * Typeset in the display face as a stand-in for the official logo file.
 * When the vector logo is delivered, replace the <span> with the SVG —
 * keep the accessible label.
 */
export function Logo({ className, href = "/" }: { className?: string; href?: string | null }) {
  const mark = (
    <span className={cn("display inline-block text-[1.65rem] leading-none tracking-[0.02em]", className)}>
      MONCRÉ
    </span>
  );

  if (!href) return mark;

  return (
    <Link href={href} aria-label="MONCRÉ — strona główna" className="inline-flex items-center">
      {mark}
    </Link>
  );
}
