"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { mainNav, primaryCta } from "@/config/navigation";
import { Logo } from "@/components/ui/logo";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Subtle background once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: scroll lock, Escape, focus trap, auto-close on desktop widths.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !rootRef.current) return;
      const focusable = Array.from(
        rootRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((el) => el.offsetParent !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (event: MediaQueryListEvent) => event.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  const solid = scrolled || open;

  // The menu panel is a sibling of <header>: backdrop-filter on the header would
  // otherwise become the containing block of the fixed panel.
  return (
    <div ref={rootRef}>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-premium",
          solid ? "border-b border-line bg-paper/90 backdrop-blur-md" : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <Logo onClick={close} />
  
          <nav aria-label="Główna nawigacja" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="relative py-2 text-[0.8125rem] font-medium tracking-[0.04em] text-ink/80 transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-500 after:ease-premium hover:text-ink hover:after:scale-x-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
  
          <div className="flex items-center gap-3">
            <Link
              href={primaryCta.href}
              className="group hidden min-h-11 items-center gap-3 border border-ink/20 px-5 text-[0.75rem] font-semibold tracking-[0.08em] uppercase transition-colors duration-500 ease-premium hover:border-ink hover:bg-ink hover:text-paper lg:inline-flex"
            >
              {primaryCta.label}
              <ArrowIcon className="size-3.5 transition-transform duration-500 ease-premium group-hover:translate-x-0.5" />
            </Link>
  
            <button
              ref={toggleRef}
              type="button"
              className="-mr-2 inline-flex min-h-11 min-w-11 items-center justify-center gap-3 px-2 lg:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="eyebrow text-ink">{open ? "Zamknij" : "Menu"}</span>
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span
                  className={cn(
                    "absolute left-0 h-px w-6 bg-ink transition-transform duration-500 ease-premium",
                    open ? "top-1.5 rotate-45" : "top-0.5",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px w-6 bg-ink transition-transform duration-500 ease-premium",
                    open ? "top-1.5 -rotate-45" : "top-2.5",
                  )}
                />
              </span>
              <span className="sr-only">{open ? "Zamknij menu" : "Otwórz menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id={menuId}
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-paper transition-[opacity,visibility] duration-500 ease-premium z-40 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        // Hidden from assistive tech and tab order while closed.
        inert={!open}
      >
        <nav aria-label="Menu mobilne" className="container-site flex min-h-full flex-col pt-8 pb-10">
          <ul className="border-t border-line">
            {mainNav.map((item, index) => (
              <li
                key={item.href}
                className={cn(
                  "border-b border-line transition-[opacity,transform] duration-700 ease-premium",
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
                style={{ transitionDelay: open ? `${80 + index * 60}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex min-h-16 items-center justify-between py-4 font-serif text-[2rem] leading-none"
                >
                  {item.label}
                  <ArrowIcon className="size-5 text-stone" />
                </Link>
              </li>
            ))}
          </ul>
          <div
            className={cn(
              "mt-auto pt-10 transition-opacity duration-700 ease-premium",
              open ? "opacity-100 delay-300" : "opacity-0",
            )}
          >
            <Link
              href={primaryCta.href}
              onClick={close}
              className="flex min-h-14 w-full items-center justify-between gap-4 bg-ink px-6 text-[0.8125rem] font-semibold tracking-[0.08em] text-paper uppercase"
            >
              {primaryCta.label}
              <ArrowIcon />
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
