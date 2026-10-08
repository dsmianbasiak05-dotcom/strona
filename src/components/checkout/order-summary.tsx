import { formatMoney } from "@/lib/format";

export function SummaryRows({
  subtotal,
  shipping,
  shippingLabel = "Dostawa",
}: {
  subtotal: number;
  shipping: number | null;
  shippingLabel?: string;
}) {
  const total = subtotal + (shipping ?? 0);
  return (
    <dl className="space-y-3 text-[15px]">
      <div className="flex justify-between">
        <dt className="text-ink/70">Subtotal</dt>
        <dd className="tabular-nums">{formatMoney(subtotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-ink/70">{shippingLabel}</dt>
        <dd className="tabular-nums">
          {shipping === null ? "Do ustalenia" : shipping === 0 ? "Gratis" : formatMoney(shipping)}
        </dd>
      </div>
      <div className="flex items-baseline justify-between border-t border-ink/15 pt-4">
        <dt className="label">Total</dt>
        <dd className="text-xl font-bold tabular-nums">{formatMoney(total)}</dd>
      </div>
    </dl>
  );
}
