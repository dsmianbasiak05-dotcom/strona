import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/logo";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All Products" },
      { href: "/product/no-1", label: "MONCRÉ No.1" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/contact#shipping", label: "Shipping" },
      { href: "/contact#returns", label: "Returns" },
      { href: "/contact#faq", label: "FAQ" },
    ],
  },
  {
    title: "Follow",
    links: [
      { href: siteConfig.social.instagram, label: "Instagram", external: true },
      { href: siteConfig.social.tiktok, label: "TikTok", external: true },
    ],
  },
  {
    title: "Legal",
    // Placeholder routes — legal documents to be provided by the brand.
    links: [
      { href: "/contact#privacy", label: "Privacy Policy" },
      { href: "/contact#terms", label: "Terms" },
      { href: "/contact#cookies", label: "Cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-cream">
      <div className="container-x pt-16 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <Logo className="text-4xl" />
            <p className="mt-4 max-w-[28ch] text-[15px] leading-relaxed text-cream/60">
              Styling essentials for modern men&apos;s hair. Style with purpose.
            </p>
          </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:col-span-2">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="label mb-5 text-cream/45">{col.title}</h2>
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
        <p className="display translate-y-[0.08em] text-center text-[23vw] leading-[0.78] text-cream select-none 2xl:text-[23rem]">
          MONCRÉ
        </p>
      </div>

      <div className="relative border-t border-cream/12 bg-navy-900">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-cream/55 md:flex-row md:items-center md:justify-between">
          <p>© MONCRÉ 2026</p>
          <p>Kosmetyki do stylizacji męskich włosów</p>
        </div>
      </div>
    </footer>
  );
}
