import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { DemoBadge } from "./coming-soon-badge";

/**
 * Product-page panel for DEMO / CONCEPT entries. States plainly what the
 * entry is — no price, no properties, no purchase or waitlist action.
 */
export function DemoPanel({ product }: { product: Product }) {
  return (
    <div className="lg:sticky lg:top-24">
      <nav aria-label="Ścieżka nawigacji" className="label text-[10px] text-graphite">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-ink">Strona główna</Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/shop" className="hover:text-ink">Sklep</Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-ink">Demo</li>
        </ol>
      </nav>

      <div className="mt-5">
        <DemoBadge />
      </div>
      <h1 className="display mt-5 text-[15vw] leading-[0.9] sm:text-7xl xl:text-[5.75rem]">
        <span className="label mb-3 block text-graphite">Koncept systemu kolorów</span>
        {product.type}
      </h1>
      <p className="mt-3 text-[15px] text-graphite">{product.categoryLabel}</p>

      <div className="mt-8 bg-product p-5 text-product-secondary md:p-6">
        <p className="display text-4xl leading-none md:text-5xl">Demo / Concept</p>
        <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-product-secondary/85">{product.description}</p>
        <p className="mt-4 text-xs leading-relaxed text-product-secondary/65">
          Zdjęcie jest neutralnym placeholderem bez logo MONCRÉ. Brak ceny, parametrów i możliwości zamówienia.
        </p>
      </div>

      <dl className="mt-8 border-t border-ink/15">
        {[
          { label: "Paleta", value: "Espresso + krem" },
          { label: "Status", value: "Demo / Concept" },
        ].map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-6 border-b border-ink/15 py-3">
            <dt className="label text-graphite">{row.label}</dt>
            <dd className="text-right text-[15px] font-bold">{row.value}</dd>
          </div>
        ))}
      </dl>

      <Link href="/shop" className="label link-underline mt-8 inline-block">
        ← Wróć do sklepu
      </Link>
    </div>
  );
}
