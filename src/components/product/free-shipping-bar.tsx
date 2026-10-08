import { siteConfig } from "@/config/site";
import { formatMoney } from "@/lib/format";

export function FreeShippingBar({ subtotal }: { subtotal: number }) {
  const threshold = siteConfig.shipping.freeThreshold;
  const remaining = Math.max(0, threshold - subtotal);
  const progress = Math.min(1, subtotal / threshold);

  return (
    <div>
      <p className="text-[13px] font-medium">
        {remaining > 0 ? (
          <>
            Brakuje <strong className="tabular-nums">{formatMoney(remaining)}</strong> do darmowej dostawy
          </>
        ) : (
          <>Masz darmową dostawę ✓</>
        )}
      </p>
      <div
        className="mt-2.5 h-[3px] w-full bg-navy-900/10"
        role="progressbar"
        aria-label="Postęp do darmowej dostawy"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <div
          className="h-full origin-left bg-navy-900 transition-transform duration-700 ease-[var(--ease-premium)]"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  );
}
