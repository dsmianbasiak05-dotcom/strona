import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/brand/logo";

const columns = [
  {
    title: "Sklep",
    links: [
      { href: "/shop", label: "Wszystkie produkty" },
      { href: "/product/no-1", label: "MONCRÉ No.1" },
    ],
  },
  {
    title: "Pomoc",
    links: [
      { href: "/contact", label: "Kontakt" },
      { href: "/contact#shipping", label: "Dostawa" },
      { href: "/contact#returns", label: "Zwroty" },
      { href: "/contact#faq", label: "Pytania" },
    ],
  },
  {
    title: "Obserwuj",
    links: [
      { href: siteConfig.social.instagram, label: "Instagram", external: true },
      { href: siteConfig.social.tiktok, label: "TikTok", external: true },
    ],
  },
  {
    title: "Informacje prawne",
    // Placeholder routes — legal documents to be provided by the brand.
    links: [
      { href: "/contact#privacy", label: "Polityka prywatności" },
      { href: "/contact#terms", label: "Regulamin" },
      { href: "/contact#cookies", label: "Pliki cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      <div className="container-x pt-16 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <Logo className="text-4xl" />
            <p className="mt-4 max-w-[28ch] text-[15px] leading-relaxed text-bone/60">
              Kosmetyki do stylizacji męskich włosów.
            </p>
          </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:col-span-2">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="label mb-5 text-bone/45">{col.title}</h2>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="link-underline text-[15px]">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="link-underline text-[15px]">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </div>
      </div>

      {/* Oversized wordmark — sits on the bottom edge like a campaign sign-off */}
      <div className="container-x mt-16 md:mt-24" aria-hidden>
        <p className="display translate-y-[0.08em] text-center text-[23vw] leading-[0.78] text-bone select-none 2xl:text-[23rem]">
          MONCRÉ
        </p>
      </div>

      <div className="relative border-t border-bone/12 bg-ink">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-bone/55 md:flex-row md:items-center md:justify-between">
          <p>© MONCRÉ 2026</p>
          <p>Kosmetyki do stylizacji męskich włosów</p>
        </div>
      </div>
    </footer>
  );
}
