"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { useCartDetails } from "@/hooks/use-cart-details";
import { mainNav } from "@/config/site";
import { cn } from "@/lib/utils";

const iconBtn = "relative grid size-10 place-items-center rounded-full transition-colors hover:bg-current/10";

/** Logo · Sklep · O marce · Kontakt · cart. Phone: logo · cart · menu. Cream over the dark home hero. */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const openCart = useCart((s) => s.open);
  const pulse = useCart((s) => s.pulse);
  const { count } = useCartDetails();
  const setMenuOpen = useUI((s) => s.setMenuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Home opens on the dark hero: the bar stays transparent there, in cream.
  const onDark = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color] duration-500",
        onDark ? "border-transparent bg-transparent text-bone" : "bg-paper",
        !onDark && (scrolled ? "border-ink/10" : "border-transparent"),
      )}
    >
      <a
        href="#main"
        className="label sr-only z-50 bg-ink px-4 py-3 text-bone focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
      >
        Przejdź do treści
      </a>

      <div className="container-x grid h-14 grid-cols-[1fr_auto_1fr] items-center md:h-[72px]">
        <div className="flex items-center">
          <Logo className="text-[1.45rem] md:text-[1.75rem]" />
        </div>

        <nav aria-label="Główna nawigacja" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {mainNav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn("label link-underline inline-block py-2", active && "bg-[length:100%_1px]")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="lg:hidden" />

        <div className="-mr-2 flex items-center justify-end gap-0.5">
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
              <ShoppingBag className="size-[18px]" strokeWidth={1.5} />
            </motion.span>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "absolute top-0.5 right-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 text-[10px] font-bold tabular-nums",
                    onDark ? "bg-bone text-ink" : "bg-ink text-bone",
                  )}
                  aria-hidden
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button type="button" className={cn(iconBtn, "lg:hidden")} aria-label="Otwórz menu" onClick={() => setMenuOpen(true)}>
            <Menu className="size-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  );
}
