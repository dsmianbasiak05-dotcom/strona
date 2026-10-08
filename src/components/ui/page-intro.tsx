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
}: {
  eyebrow: string;
  lines: string[];
  srLabel?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("container-x pt-28 pb-10 md:pt-40 md:pb-14", className)}>
      <p className="label mb-5 flex items-center gap-3 text-navy-500">
        <span className="inline-block h-px w-8 bg-current" aria-hidden />
        {eyebrow}
      </p>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <RevealLines
          as="h1"
          animateOnMount
          lines={lines}
          srLabel={srLabel}
          className="display text-[17vw] md:text-[11vw] xl:text-[10rem]"
        />
        {children && <div className="max-w-[40ch] text-[15px] leading-relaxed text-navy-900/75 md:pb-3">{children}</div>}
      </div>
    </header>
  );
}
