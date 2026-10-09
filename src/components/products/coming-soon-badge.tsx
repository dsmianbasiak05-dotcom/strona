import type { Product } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";

/** Availability status — UI copy, so Polish; one wording across the shop. */
export function ComingSoonBadge({ className }: { className?: string }) {
  return (
    <span className={cn("label inline-flex h-7 items-center bg-ink px-3 text-[10px] text-paper", className)}>
      Wkrótce w sprzedaży
    </span>
  );
}

/** Explicit marker for demo/concept entries — must never read as a real product. */
export function DemoBadge({ className }: { className?: string }) {
  return (
    <span className={cn("label inline-flex h-7 items-center border border-ink bg-paper px-3 text-[10px] text-ink", className)}>
      Demo / Concept
    </span>
  );
}

/** Status badge for any product: demo → DEMO / CONCEPT, not on sale → WKRÓTCE W SPRZEDAŻY. */
export function StatusBadge({ product, className }: { product: Product; className?: string }) {
  if (product.demo) return <DemoBadge className={className} />;
  if (product.status !== "active") return <ComingSoonBadge className={className} />;
  return null;
}
