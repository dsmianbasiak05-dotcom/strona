import Link from "next/link";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "outline-light" | "ghost";
type Size = "md" | "lg" | "sm";

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden label whitespace-nowrap transition-colors duration-500 ease-[var(--ease-premium)] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-bone hover:bg-ink-700",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-bone",
  light: "bg-bone text-ink hover:bg-paper",
  "outline-light": "border border-bone/50 text-bone hover:bg-bone hover:text-ink hover:border-bone",
  ghost: "text-ink hover:text-ink-700 px-0!",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5",
  md: "h-12 px-7",
  lg: "h-14 px-9 md:h-16 md:px-10",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  /** Shows a sliding arrow that nudges on hover. */
  arrow?: boolean;
}

function Arrow() {
  return (
    <span aria-hidden className="relative inline-block h-[1em] w-4 overflow-hidden">
      <span className="absolute inset-0 flex items-center transition-transform duration-500 ease-[var(--ease-premium)] group-hover/btn:translate-x-full">
        →
      </span>
      <span className="absolute inset-0 flex -translate-x-full items-center transition-transform duration-500 ease-[var(--ease-premium)] group-hover/btn:translate-x-0">
        →
      </span>
    </span>
  );
}

export const Button = forwardRef<
  HTMLButtonElement,
  CommonProps & ComponentPropsWithoutRef<"button">
>(function Button({ variant, size, className, children, arrow, ...props }, ref) {
  return (
    <button ref={ref} className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
});

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  arrow,
  ...props
}: CommonProps & ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}
