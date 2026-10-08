import type { ReactNode } from "react";
import { RevealLines } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/** Eyebrow index + display heading pairing used across home sections. */
export function SectionHeading({
  index,
  eyebrow,
  lines,
  className,
  aside,
  id,
  tone = "dark",
}: {
  index: string;
  eyebrow: string;
  lines: string[];
  className?: string;
  aside?: ReactNode;
  id?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div>
        <p className={cn("label mb-5 flex items-center gap-3", tone === "dark" ? "text-graphite" : "text-bone/55")}>
          <span className="tabular-nums">{index}</span>
          <span className="inline-block h-px w-8 bg-current" aria-hidden />
          {eyebrow}
        </p>
        <div id={id}>
          <RevealLines lines={lines} className="display text-[15vw] md:text-[8.5vw] xl:text-[8rem]" />
        </div>
      </div>
      {aside}
    </div>
  );
}
