import { cn } from "@/lib/utils";

export function ComingSoonBadge({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span
      className={cn(
        "label inline-flex h-7 items-center px-3 text-[10px]",
        tone === "dark" ? "bg-navy-900 text-cream" : "bg-cream text-navy-900",
        className,
      )}
    >
      Coming soon
    </span>
  );
}
