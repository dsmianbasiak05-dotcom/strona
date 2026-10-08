"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  label,
  size = "md",
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const btn = cn(
    "grid place-items-center transition-colors hover:bg-ink/6 disabled:opacity-30",
    size === "sm" ? "size-8" : "size-12",
  );
  return (
    <div
      className={cn("inline-flex items-center border border-ink/20", className)}
      role="group"
      aria-label={label}
    >
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Zmniejsz ilość">
        <Minus className="size-3.5" strokeWidth={1.8} />
      </button>
      <output
        aria-live="polite"
        className={cn("text-center font-semibold tabular-nums", size === "sm" ? "w-7 text-sm" : "w-10")}
      >
        {value}
      </output>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Zwiększ ilość">
        <Plus className="size-3.5" strokeWidth={1.8} />
      </button>
    </div>
  );
}
