import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  id?: string;
  className?: string;
  titleClassName?: string;
  tone?: "dark" | "light";
}

/** Eyebrow label + editorial serif H2. */
export function SectionHeader({ eyebrow, title, id, className, titleClassName, tone = "dark" }: SectionHeaderProps) {
  return (
    <div className={className}>
      <p
        data-reveal="fade"
        className={cn("eyebrow flex items-center gap-4", tone === "dark" ? "text-stone-deep" : "text-sand")}
      >
        <span aria-hidden="true" className={cn("h-px w-8", tone === "dark" ? "bg-stone" : "bg-sand/60")} />
        {eyebrow}
      </p>
      <h2 id={id} data-reveal className={cn("mt-6 font-serif text-h2 font-normal", titleClassName)}>
        {title}
      </h2>
    </div>
  );
}
