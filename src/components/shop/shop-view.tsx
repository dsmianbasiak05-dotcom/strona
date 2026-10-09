"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search, X } from "lucide-react";
import type { Product, ProductCategory, SortKey } from "@/lib/commerce/types";
import { filterProducts } from "@/lib/commerce";
import { categories } from "@/data/products";
import { ProductCard } from "@/components/products/product-card";
import { cn } from "@/lib/utils";
import { pluralProducts } from "@/lib/format";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Polecane" },
  { key: "price-asc", label: "Cena: rosnąco" },
  { key: "price-desc", label: "Cena: malejąco" },
  { key: "name", label: "Nazwa A–Z" },
];

export interface ShopInitialState {
  category: ProductCategory | "all";
  q: string;
  sort: SortKey;
}

/** Filters, search and sort only earn their place once the catalogue grows. */
const TOOLS_FROM = 5;

export function ShopView({ products, initial }: { products: Product[]; initial: ShopInitialState }) {
  const showTools = products.length >= TOOLS_FROM;
  const [category, setCategory] = useState(initial.category);
  const [q, setQ] = useState(initial.q);
  const [sort, setSort] = useState<SortKey>(initial.sort);

  const results = useMemo(
    () => (showTools ? filterProducts(products, { category, q, sort }) : products),
    [showTools, products, category, q, sort],
  );

  // Keep the URL shareable without triggering a server round-trip.
  useEffect(() => {
    if (!showTools) return;
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (q.trim()) params.set("q", q.trim());
    if (sort !== "featured") params.set("sort", sort);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `/shop?${qs}` : "/shop");
  }, [showTools, category, q, sort]);

  const hasFilters = category !== "all" || q.trim() !== "";
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of categories) {
      map.set(c.key, c.key === "all" ? products.length : products.filter((p) => p.category === c.key).length);
    }
    return map;
  }, [products]);

  return (
    <>
      {/* Toolbar */}
      {showTools && (
      <div className="sticky top-14 z-30 border-y border-ink/10 bg-paper/92 backdrop-blur-xl md:top-16">
        <div className="container-x flex flex-col gap-0 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div
            role="tablist"
            aria-label="Kategorie"
            className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 md:mx-0 md:px-0"
          >
            {categories.map((c) => {
              const active = category === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(c.key)}
                  className={cn(
                    "label relative h-14 shrink-0 px-3 transition-colors md:px-4",
                    active ? "text-ink" : "text-ink/45 hover:text-ink",
                  )}
                >
                  {c.label}
                  <sup className="ml-0.5 text-[9px] tabular-nums">{counts.get(c.key)}</sup>
                  {active && (
                    <motion.span
                      layoutId="cat-underline"
                      className="absolute inset-x-3 bottom-0 h-[2px] bg-ink md:inset-x-4"
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 border-t border-ink/10 py-2.5 lg:border-0 lg:py-0">
            <label className="flex h-10 flex-1 items-center gap-2 border-b border-ink/25 focus-within:border-ink lg:w-56 lg:flex-none">
              <Search className="size-4 shrink-0 text-graphite" strokeWidth={1.8} />
              <span className="sr-only">Szukaj w sklepie</span>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Szukaj"
                className="h-full w-full min-w-0 bg-transparent text-sm placeholder:text-ink/40 focus:outline-none"
              />
            </label>
            <label className="relative flex h-10 items-center">
              <span className="sr-only">Sortuj</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="label h-10 cursor-pointer appearance-none bg-transparent pr-6 pl-1 focus:outline-none"
              >
                {sortOptions.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-0 size-4" strokeWidth={1.8} />
            </label>
          </div>
        </div>
      </div>
      )}

      <div className="container-x pt-6 pb-24 md:pt-8 md:pb-32">
        {showTools && hasFilters && (
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setQ("");
            }}
            className="label inline-flex h-9 items-center gap-1.5 text-graphite hover:text-ink"
          >
            <X className="size-3.5" /> Wyczyść filtry
          </button>
        )}

        {showTools && (
          <p className="mt-6 text-sm text-graphite" aria-live="polite">
            {results.length} {pluralProducts(results.length)}
            {q.trim() && <> · „{q.trim()}”</>}
          </p>
        )}

        {results.length === 0 ? (
          <div className="py-24 text-center">
            <p className="display text-6xl md:text-8xl">Brak wyników.</p>
            <p className="mt-4 text-graphite">Spróbuj innego filtra lub wyczyść wyszukiwanie.</p>
          </div>
        ) : (
          <motion.ul
            layout
            className={cn(
              "mt-6 grid gap-x-3 gap-y-12 md:gap-x-5 md:gap-y-14",
              // Column count follows the catalogue size so a short list never looks broken:
              // ≤2 products stack on phones and sit side by side from md.
              results.length >= 4
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : results.length === 3
                  ? "grid-cols-2 md:grid-cols-3"
                  : "grid-cols-1 md:grid-cols-2",
            )}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {results.map((product, i) => (
                <motion.li
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard
                    product={product}
                    priority={i < 4}
                    sizes={results.length <= 2 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"}
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </>
  );
}
