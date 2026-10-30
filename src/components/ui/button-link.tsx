import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "@/components/ui/arrow-icon";

type Variant = "primary" | "outline" | "light" | "text";

const base =
  "group inline-flex items-center justify-center gap-3 text-[0.8125rem] font-semibold tracking-[0.08em] uppercase transition-[background-color,color,border-color,transform] duration-500 ease-premium";

const variants: Record<Variant, string> = {
  primary: "min-h-12 px-7 bg-ink text-paper hover:bg-ink-soft active:scale-[0.985]",
  outline: "min-h-12 px-7 border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper active:scale-[0.985]",
  light: "min-h-12 px-7 bg-paper text-ink hover:bg-sand active:scale-[0.985]",
  text: "min-h-11 text-ink underline-offset-[6px] decoration-ink/30 hover:decoration-ink underline",
};

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant;
  withArrow?: boolean;
}

export function ButtonLink({ variant = "primary", withArrow = false, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      <span>{children}</span>
      {withArrow && (
        <ArrowIcon className="transition-transform duration-500 ease-premium group-hover:translate-x-1" />
      )}
    </Link>
  );
}

export const buttonClasses = { base, variants };
