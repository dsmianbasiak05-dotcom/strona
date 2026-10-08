"use client";

import Link from "next/link";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useUI } from "@/store/ui";
import { useDialog } from "@/hooks/use-dialog";
import { Logo } from "@/components/brand/logo";
import { siteConfig } from "@/config/site";
import { formatMoney } from "@/lib/format";
import { isPurchasable, listProducts, productPrice } from "@/lib/commerce";
import { ProductMedia } from "@/components/products/product-media";
import { themeStyle } from "@/lib/theme";

// Same source as the shop listing — new products appear here automatically.
const menuProducts = listProducts({ includeDemo: true });

const ease = [0.22, 1, 0.36, 1] as const;

const primary = [
  { href: "/shop", label: "Sklep" },
  { href: "/about", label: "O marce" },
  { href: "/contact", label: "Kontakt" },
];

const secondary = [
  { href: "/account", label: "Konto" },
  { href: "/favorites", label: "Ulubione" },
  { href: "/cart", label: "Koszyk" },
];

export function MobileMenu() {
  const open = useUI((s) => s.menuOpen);
  const setOpen = useUI((s) => s.setMenuOpen);
  const ref = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);
  useDialog(open, close, ref);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-ink text-bone lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="container-x flex h-16 shrink-0 items-center justify-between">
            <Logo href="/" />
            <button
              type="button"
              onClick={close}
              className="-mr-2 grid size-10 place-items-center rounded-full hover:bg-bone/10"
              aria-label="Zamknij menu"
            >
              <X className="size-6" strokeWidth={1.5} />
            </button>
          </div>

          <nav aria-label="Menu mobilne" className="container-x flex flex-1 flex-col pt-2 pb-8">
            <ul>
              {primary.map((item, i) => (
                <li key={item.href} className="overflow-hidden border-b border-bone/12">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease, delay: 0.2 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      onClick={close}
                      className="display flex items-center justify-between py-2.5 text-[13vw] leading-[0.95] sm:text-7xl"
                    >
                      {item.label}
                      <span className="text-base text-bone/40">0{i + 1}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-8"
            >
              <p className="label mb-4 text-bone/50">Produkty</p>
              <ul className="space-y-2">
                {menuProducts.map((p) => {
                  const price = productPrice(p);
                  return (
                  <li key={p.id}>
                    <Link href={`/product/${p.slug}`} onClick={close} className="flex items-center gap-4">
                      <div style={themeStyle(p.theme)} className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden bg-product-bg">
                        <div className="absolute inset-0">
                          <ProductMedia product={p} compact sizes="112px" />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="display text-3xl leading-none">{p.type}</p>
                        <p className="mt-2 text-sm text-bone/70 tabular-nums">
                          {p.demo ? "Demo / Concept" : (
                            <>
                              {price && formatMoney(price)}
                              {!isPurchasable(p) && " · Coming soon"}
                            </>
                          )}
                        </p>
                      </div>
                    </Link>
                  </li>
                  );
                })}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="mt-auto flex items-end justify-between gap-6 pt-12"
            >
              <ul className="space-y-3">
                {secondary.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={close} className="label link-underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3 text-right">
                <li>
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="label link-underline">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" className="label link-underline">
                    TikTok
                  </a>
                </li>
              </ul>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
