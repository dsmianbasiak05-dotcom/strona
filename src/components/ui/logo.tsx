import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/** Typographic wordmark. Replace with an SVG logo here once the brand provides one. */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${siteConfig.name} — strona główna`}
      className={cn(
        "inline-flex min-h-11 items-center font-serif text-[1.3125rem] leading-none font-medium tracking-[0.2em] whitespace-nowrap uppercase",
        className,
      )}
    >
      Still&nbsp;Living
    </Link>
  );
}
