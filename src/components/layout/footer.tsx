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
  // Legal documents (privacy policy, terms, cookies) — add links here once
  // the brand provides them; no placeholder links until then.
];

export function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="container-x pt-16 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <Logo className="text-4xl" />
            <p className="mt-4 max-w-[28ch] text-[15px] leading-relaxed text-bone/60">
              Kosmetyki do stylizacji męskich włosów.
            </p>
          </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:col-span-2">
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

      <div className="mt-16 border-t border-bone/12 md:mt-24">
        <p className="container-x py-5 text-xs text-bone/55">© MONCRÉ 2026</p>
      </div>
    </footer>
  );
}
