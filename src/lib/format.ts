import type { Money } from "@/lib/commerce/types";

const formatter = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  minimumFractionDigits: 2,
});

export function formatMoney(money: Money | number): string {
  const amount = typeof money === "number" ? money : money.amount;
  return formatter.format(amount / 100);
}

/** Polish plural for "produkt". */
export function pluralProducts(n: number): string {
  if (n === 1) return "produkt";
  const lastTwo = n % 100;
  const last = n % 10;
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return "produkty";
  return "produktów";
}
