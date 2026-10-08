import type { ReactNode } from "react";
import { RevealLines } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/** Large editorial page header shared by inner pages. */
export function PageIntro({
  eyebrow,
  lines,
  srLabel,
  children,
  className,
  size = "lg",
}: {
  eyebrow: string;
  lines: string[];
  srLabel?: string;
  children?: ReactNode;
  className?: string;
  /** "sm" for utility pages (cart, account…) where the brand should not shout. */
  size?: "lg" | "sm";
}) {
  return (
    <header
      className={cn(
        "container-x",
        size === "lg" ? "pt-28 pb-10 md:pt-40 md:pb-14" : "pt-24 pb-8 md:pt-32 md:pb-10",
        className,
      )}
    >
      <p className="label mb-5 flex items-center gap-3 text-graphite">
        <span className="inline-block h-px w-8 bg-current" aria-hidden />
        {eyebrow}
      </p>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <RevealLines
          as="h1"
          animateOnMount
          lines={lines}
          srLabel={srLabel}
          className={cn(
            "display",
            size === "lg" ? "text-[17vw] md:text-[11vw] xl:text-[10rem]" : "text-[15vw] md:text-[7vw] xl:text-[6.5rem]",
          )}
        />
        {children && <div className="max-w-[40ch] text-[15px] leading-relaxed text-ink/75 md:pb-3">{children}</div>}
      </div>
    </header>
  );
}
