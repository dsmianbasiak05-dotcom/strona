"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useCart } from "@/store/cart";
import { useFavorites } from "@/store/favorites";
import { useUI } from "@/store/ui";
import { useMounted } from "@/hooks/use-mounted";
import { useCartDetails } from "@/hooks/use-cart-details";
import { cn } from "@/lib/utils";
import { formatMoney } from "@/lib/format";
import { products } from "@/data/products";

const featured = products[0];
import { ProductMedia } from "@/components/product/product-media";

const iconBtn =
  "relative grid size-10 place-items-center rounded-full transition-colors hover:bg-navy-900/6";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const openCart = useCart((s) => s.open);
  const pulse = useCart((s) => s.pulse);
  const { count } = useCartDetails();
  const favCount = useFavorites((s) => s.ids.length);
  const mounted = useMounted();
  const setSearchOpen = useUI((s) => s.setSearchOpen);
  const setMenuOpen = useUI((s) => s.setMenuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mega menu on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMegaOpen(false);
  }

  const openMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 160);
  };

  const isActive = (href: string) => {
    const path = href.split("?")[0];
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || megaOpen
          ? "border-b border-navy-900/10 bg-paper"
          : "border-b border-transparent bg-transparent",
      )}
      onMouseLeave={scheduleCloseMega}
    >
      <a
        href="#main"
        className="label sr-only z-50 bg-navy-900 px-4 py-3 text-cream focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
      >
        Przejdź do treści
      </a>

      <div
        className={cn(
          "container-x grid grid-cols-[1fr_auto_1fr] items-center transition-[height] duration-500 ease-[var(--ease-premium)]",
          scrolled ? "h-14 md:h-16" : "h-16 md:h-20",
        )}
      >
        {/* Left — logo */}
        <div className="flex items-center">
          <Logo className={cn("transition-[font-size] duration-500", scrolled ? "md:text-[1.6rem]" : "md:text-[1.9rem]")} />
        </div>

        {/* Center — desktop nav */}
        <nav aria-label="Główna nawigacja" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            <li>
              <Link href="/shop" className={cn("label link-underline inline-block py-2", isActive("/shop") && "bg-[length:100%_1px]")}>
                Shop
              </Link>
            </li>
            <li onMouseEnter={openMega} onFocus={openMega}>
              <button
                type="button"
                className="label link-underline inline-block py-2"
                aria-expanded={megaOpen}
                aria-controls="mega-menu"
                onClick={() => setMegaOpen((v) => !v)}
              >
                Products
              </button>
            </li>
            <li>
              <Link href="/about" className={cn("label link-underline inline-block py-2", isActive("/about") && "bg-[length:100%_1px]")}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className={cn("label link-underline inline-block py-2", isActive("/contact") && "bg-[length:100%_1px]")}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="lg:hidden" />

        {/* Right — actions */}
        <div className="-mr-2 flex items-center justify-end gap-0.5 md:gap-1">
          <button type="button" className={iconBtn} aria-label="Szukaj" onClick={() => setSearchOpen(true)}>
            <Search className="size-[19px]" strokeWidth={1.6} />
          </button>
          <Link href="/account" className={cn(iconBtn, "hidden lg:grid")} aria-label="Konto">
            <User className="size-[19px]" strokeWidth={1.6} />
          </Link>
          <Link
            href="/favorites"
            className={cn(iconBtn, "hidden lg:grid")}
            aria-label={`Ulubione${mounted && favCount ? ` (${favCount})` : ""}`}
          >
            <Heart className="size-[19px]" strokeWidth={1.6} />
            {mounted && favCount > 0 && (
              <span className="absolute top-2 right-2 size-1.5 rounded-full bg-navy-900" aria-hidden />
            )}
          </Link>
          <button
            type="button"
            className={iconBtn}
            onClick={openCart}
            aria-label={`Koszyk, ${count} ${count === 1 ? "produkt" : "produktów"}`}
          >
            <motion.span
              key={pulse}
              initial={pulse ? { y: -4, rotate: -8 } : false}
              animate={{ y: 0, rotate: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 14 }}
              className="grid place-items-center"
            >
              <ShoppingBag className="size-[19px]" strokeWidth={1.6} />
            </motion.span>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-0.5 right-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-navy-900 px-1 text-[10px] font-bold text-cream tabular-nums"
                  aria-hidden
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            type="button"
            className={cn(iconBtn, "lg:hidden")}
            aria-label="Otwórz menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="size-[21px]" strokeWidth={1.6} />
          </button>
        </div>
      </div>

      {/* Desktop mega menu */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            id="mega-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={openMega}
            onKeyDown={(e) => e.key === "Escape" && setMegaOpen(false)}
            className="absolute inset-x-0 top-full hidden border-b border-navy-900/10 bg-paper lg:block"
          >
            <div className="container-x grid grid-cols-12 gap-8 py-10">
              <div className="col-span-4 flex flex-col">
                <p className="label mb-5 text-navy-500">Products</p>
                <ul className="space-y-3">
                  {products.map((p) => (
                    <li key={p.id}>
                      <Link href={`/product/${p.slug}`} className="group block">
                        <span className="display block text-5xl transition-colors duration-500 group-hover:text-navy-700">
                          {p.type}
                        </span>
                        <span className="mt-2 block text-sm text-navy-500">
                          {p.tagline} · <span className="text-navy-900 tabular-nums">{formatMoney(p.variants[0].price)}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/shop" className="label link-underline mt-auto self-start pt-8">
                  Shop all →
                </Link>
              </div>
              {featured && (
                <ul className="col-span-8 grid grid-cols-2 gap-4">
                  {[0, 1].map((i) => (
                    <li key={i}>
                      <Link href={`/product/${featured.slug}`} className="group block" tabIndex={-1} aria-hidden>
                        <div className="relative aspect-[16/10] overflow-hidden bg-cream transition-colors duration-500 group-hover:bg-cream-dark">
                          <div className="absolute inset-[12%] transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-105">
                            <ProductMedia product={featured} index={i} sizes="30vw" />
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
