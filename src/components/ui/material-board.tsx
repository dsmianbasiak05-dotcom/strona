import { cn } from "@/lib/cn";

/**
 * Decorative material-board composition in the brand palette — used where
 * real photography is not available yet. Purely abstract: no real products or projects.
 */
export function MaterialBoard({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative aspect-[5/4] w-full", className)}>
      <div className="grain absolute top-0 left-0 h-[72%] w-[54%] bg-sand" />
      <div className="grain absolute top-[12%] right-0 h-[46%] w-[40%] bg-cream ring-1 ring-line" />
      <div className="grain absolute bottom-0 left-[30%] h-[40%] w-[34%] bg-ink" />
      <div className="grain absolute right-[6%] bottom-[8%] h-[26%] w-[22%] bg-stone" />
      <div className="absolute top-[64%] left-[8%] size-[13%] rounded-full bg-[#BBA68B] shadow-[inset_-6px_-8px_14px_rgba(23,23,21,0.18)]" />
      <div className="absolute top-[20%] left-[46%] h-px w-[30%] bg-ink/30" />
    </div>
  );
}
