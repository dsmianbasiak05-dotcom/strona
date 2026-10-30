import { cn } from "@/lib/cn";

export function ArrowIcon({ className, direction = "right" }: { className?: string; direction?: "right" | "down" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
      className={cn("size-4 shrink-0", direction === "down" && "rotate-90", className)}
    >
      <path d="M3 10h13M11 5l5 5-5 5" strokeLinecap="square" />
    </svg>
  );
}
