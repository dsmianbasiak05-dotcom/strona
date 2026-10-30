import type { ServiceIcon as ServiceIconName } from "@/types/content";
import { cn } from "@/lib/cn";

const paths: Record<ServiceIconName, React.ReactNode> = {
  // Floor plan with a door swing
  plan: (
    <>
      <rect x="6" y="8" width="36" height="32" />
      <path d="M24 8v14M24 30v10M6 24h10M24 22h18" />
      <path d="M16 24a8 8 0 0 1 8 8" strokeDasharray="1.5 2.5" />
    </>
  ),
  // Fanned material samples
  materials: (
    <>
      <rect x="8" y="14" width="18" height="26" transform="rotate(-10 17 27)" />
      <rect x="16" y="11" width="18" height="26" />
      <rect x="24" y="10" width="18" height="26" transform="rotate(10 33 23)" />
      <path d="M20 17h10M20 21h6" />
    </>
  ),
  // Box / delivery
  delivery: (
    <>
      <path d="M24 6 41 15v18L24 42 7 33V15Z" />
      <path d="M7 15l17 9 17-9M24 24v18" />
      <path d="M15.5 10.5 32.5 19.5v6" />
    </>
  ),
  // Coordination — connected points
  coordination: (
    <>
      <circle cx="11" cy="13" r="4" />
      <circle cx="37" cy="13" r="4" />
      <circle cx="24" cy="36" r="4" />
      <path d="M15 13h18M13 16.5l9 16M35 16.5l-9 16" />
    </>
  ),
};

export function ServiceIcon({ name, className }: { name: ServiceIconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      className={cn("size-12", className)}
    >
      {paths[name]}
    </svg>
  );
}
