"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useUI } from "@/store/ui";
import { useDialog } from "@/hooks/use-dialog";
import { products } from "@/data/products";
import { filterProducts } from "@/lib/commerce";
import { formatMoney } from "@/lib/format";
import { ProductMedia } from "@/components/product/product-media";

const ease = [0.22, 1, 0.36, 1] as const;
const suggestions = ["No.1", "Glinka", "Clay"];

export function SearchOverlay() {
  const open = useUI((s) => s.searchOpen);
  const setOpen = useUI((s) => s.setSearchOpen);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const close = () => setOpen(false);
  useDialog(open, close, ref);

  const results = useMemo(
    () => (query.trim() ? filterProducts(products, { q: query }).slice(0, 4) : []),
    [query],
  );

  return (
    <AnimatePresence onExitComplete={() => setQuery("")}>
      {open && (
        <div className="fixed inset-0 z-[75]">
          <motion.div
            className="absolute inset-0 bg-navy-950/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden
          />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label="Wyszukiwarka"
            className="relative max-h-[100dvh] overflow-y-auto bg-paper"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="container-x pt-5 pb-10 md:pt-8 md:pb-14">
              <div className="flex items-center justify-between">
                <p className="label text-navy-500">Search MONCRÉ</p>
                <button
                  type="button"
                  onClick={close}
                  className="-mr-2 grid size-10 place-items-center rounded-full hover:bg-navy-900/6"
                  aria-label="Zamknij wyszukiwarkę"
                >
                  <X className="size-5" strokeWidth={1.6} />
                </button>
              </div>
              <form
                role="search"
                className="mt-4 flex items-center border-b-2 border-navy-900"
                onSubmit={(e) => {
                  e.preventDefault();
                  close();
                  router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
                }}
              >
                <label htmlFor="site-search" className="sr-only">
                  Szukaj produktów
                </label>
                <input
                  id="site-search"
                  data-autofocus
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  autoComplete="off"
                  className="display h-20 w-full min-w-0 bg-transparent text-4xl placeholder:text-navy-900/25 focus:outline-none md:h-28 md:text-7xl"
                />
                <button type="submit" aria-label="Szukaj" className="grid size-12 shrink-0 place-items-center">
                  <ArrowRight className="size-7" strokeWidth={1.4} />
                </button>
              </form>

              {query.trim() === "" ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="label h-9 border border-navy-900/20 px-4 transition-colors hover:border-navy-900 hover:bg-navy-900 hover:text-cream"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : results.length === 0 ? (
                <p className="mt-8 text-navy-500">Brak wyników dla „{query}”.</p>
              ) : (
                <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4" aria-live="polite">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link href={`/product/${p.slug}`} onClick={close} className="group block">
                        <div className="aspect-square overflow-hidden bg-cream p-4">
                          <div className="relative h-full transition-transform duration-700 group-hover:scale-105">
                            <ProductMedia product={p} sizes="(min-width: 768px) 25vw, 50vw" />
                          </div>
                        </div>
                        <p className="mt-3 text-sm font-bold">{p.name.replace("MONCRÉ ", "")}</p>
                        <p className="text-sm text-navy-500 tabular-nums">{formatMoney(p.variants[0].price)}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
