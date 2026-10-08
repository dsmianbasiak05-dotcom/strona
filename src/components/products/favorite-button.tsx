"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useFavorites } from "@/store/favorites";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  productId,
  productName,
  className,
}: {
  productId: string;
  productName: string;
  className?: string;
}) {
  const mounted = useMounted();
  const active = useFavorites((s) => s.ids.includes(productId)) && mounted;
  const toggle = useFavorites((s) => s.toggle);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      aria-pressed={active}
      aria-label={active ? `Usuń ${productName} z ulubionych` : `Dodaj ${productName} do ulubionych`}
      className={cn(
        "grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5",
        className,
      )}
    >
      <motion.span
        key={String(active)}
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="grid place-items-center"
      >
        <Heart className={cn("size-[18px]", active && "fill-ink")} strokeWidth={1.6} />
      </motion.span>
    </button>
  );
}
