"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search, X } from "lucide-react";
import type { Product, ProductCategory, SortKey, StyleKey } from "@/lib/commerce/types";
import { filterProducts } from "@/lib/commerce";
import { categories, styles } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { cn } from "@/lib/utils";
import { pluralProducts } from "@/lib/format";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: low → high" },
  { key: "price-desc", label: "Price: high → low" },
  { key: "name", label: "Name A–Z" },
];

export interface ShopInitialState {
  category: ProductCategory | "all";
  style: StyleKey | null;
  q: string;
  sort: SortKey;
}

export function ShopView({ products, initial }: { products: Product[]; initial: ShopInitialState }) {
  const [category, setCategory] = useState(initial.category);
  const [style, setStyle] = useState<StyleKey | null>(initial.style);
  const [q, setQ] = useState(initial.q);
  const [sort, setSort] = useState<SortKey>(initial.sort);

  const results = useMemo(
    () => filterProducts(products, { category, style, q, sort }),
    [products, category, style, q, sort],
  );

  // Keep the URL shareable without triggering a server round-trip.
  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (style) params.set("style", style);
    if (q.trim()) params.set("q", q.trim());
    if (sort !== "featured") params.set("sort", sort);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `/shop?${qs}` : "/shop");
  }, [category, style, q, sort]);

  const hasFilters = category !== "all" || style !== null || q.trim() !== "";
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
      <div className="sticky top-14 z-30 border-y border-navy-900/10 bg-paper/92 backdrop-blur-xl md:top-16">
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
                    active ? "text-navy-900" : "text-navy-900/45 hover:text-navy-900",
                  )}
                >
                  {c.label}
                  <sup className="ml-0.5 text-[9px] tabular-nums">{counts.get(c.key)}</sup>
                  {active && (
                    <motion.span
                      layoutId="cat-underline"
                      className="absolute inset-x-3 bottom-0 h-[2px] bg-navy-900 md:inset-x-4"
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 border-t border-navy-900/10 py-2.5 lg:border-0 lg:py-0">
            <label className="flex h-10 flex-1 items-center gap-2 border-b border-navy-900/25 focus-within:border-navy-900 lg:w-56 lg:flex-none">
              <Search className="size-4 shrink-0 text-navy-500" strokeWidth={1.8} />
              <span className="sr-only">Szukaj w sklepie</span>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search"
                className="h-full w-full min-w-0 bg-transparent text-sm placeholder:text-navy-900/40 focus:outline-none"
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

      <div className="container-x pt-6 pb-24 md:pt-8 md:pb-32">
        {/* Style filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="label mr-2 text-navy-500">Style</span>
          {styles.map((s) => {
            const active = style === s.key;
            return (
              <button
                key={s.key}
                type="button"
                aria-pressed={active}
                onClick={() => setStyle(active ? null : s.key)}
                className={cn(
                  "label h-9 border px-4 transition-colors duration-300",
                  active
                    ? "border-navy-900 bg-navy-900 text-cream"
                    : "border-navy-900/20 hover:border-navy-900",
                )}
              >
                {s.label}
              </button>
            );
          })}
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setCategory("all");
                setStyle(null);
                setQ("");
              }}
              className="label ml-auto inline-flex h-9 items-center gap-1.5 text-navy-500 hover:text-navy-900"
            >
              <X className="size-3.5" /> Clear
            </button>
          )}
        </div>

        <p className="mt-6 text-sm text-navy-500" aria-live="polite">
          {results.length} {pluralProducts(results.length)}
          {style && <> · efekt <strong className="text-navy-900">{styles.find((s) => s.key === style)?.label}</strong></>}
          {q.trim() && <> · „{q.trim()}”</>}
        </p>

        {results.length === 0 ? (
          <div className="py-24 text-center">
            <p className="display text-6xl md:text-8xl">No match.</p>
            <p className="mt-4 text-navy-500">Spróbuj innego filtra lub wyczyść wyszukiwanie.</p>
          </div>
        ) : (
          <motion.ul layout className="mt-6 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-5 md:gap-y-14 lg:grid-cols-4">
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
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  />
                </motion.li>
              ))}
              {!hasFilters && (
                <motion.li
                  key="editorial"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-2 md:col-span-1"
                >
                  <Link
                    href="/#style"
                    className="grain group relative flex aspect-[2/1] flex-col justify-between overflow-hidden bg-navy-900 p-5 text-cream md:aspect-[4/5] md:p-6"
                  >
                    <span className="label text-cream/55">Not sure?</span>
                    <span className="display text-5xl leading-[0.88] md:text-6xl">
                      Shop by
                      <br />
                      style →
                    </span>
                  </Link>
                </motion.li>
              )}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </>
  );
}
