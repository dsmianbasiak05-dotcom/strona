import Link from "next/link";
import { getSocialLinks, siteConfig } from "@/config/site";
import { legalNav, mainNav, primaryCta } from "@/config/navigation";
import { footerContent } from "@/content/home";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  const social = getSocialLinks();
  const { email, phone, address } = siteConfig.contact;
  const hasContactDetails = Boolean(email || phone || address);
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-ink text-cream">
      <div className="container-site pt-20 pb-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo className="text-paper" />
            <p className="mt-6 font-serif text-[1.75rem] leading-snug text-paper italic">{siteConfig.tagline}</p>
            <p className="mt-4 max-w-[34ch] text-[0.9375rem] leading-relaxed text-cream/65">{footerContent.statement}</p>
          </div>

          <nav aria-label="Stopka — nawigacja" className="lg:col-span-2 lg:col-start-7">
            <h2 className="eyebrow text-sand">Strona</h2>
            <ul className="mt-5 grid gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-10 items-center text-[0.9375rem] text-cream/80 transition-colors hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3 lg:col-start-10">
            <h2 className="eyebrow text-sand">Kontakt</h2>
            <div className="mt-5 grid gap-1 text-[0.9375rem]">
              {email && (
                <a href={`mailto:${email}`} className="inline-flex min-h-10 items-center text-cream/80 hover:text-paper">
                  {email}
                </a>
              )}
              {phone && (
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="inline-flex min-h-10 items-center text-cream/80 hover:text-paper">
                  {phone}
                </a>
              )}
              {address && <p className="py-2 leading-relaxed text-cream/80 not-italic">{address}</p>}
              {!hasContactDetails && (
                <Link href={primaryCta.href} className="inline-flex min-h-10 items-center text-cream/80 underline decoration-cream/30 underline-offset-4 hover:text-paper hover:decoration-paper">
                  Napisz do nas przez formularz
                </Link>
              )}
            </div>

            {social.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2" aria-label="Media społecznościowe">
                {social.map((item) => (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center text-[0.9375rem] text-cream/80 hover:text-paper"
                    >
                      {item.label}
                      <span className="sr-only"> (otwiera się w nowej karcie)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mt-20 font-serif text-[clamp(3.25rem,13.5vw,13rem)] leading-[0.85] tracking-[-0.01em] whitespace-nowrap text-paper/[0.07] uppercase select-none lg:mt-28"
        >
          Still Living
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-line-dark pt-8 text-[0.8125rem] text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.company.legalName || siteConfig.name}. Wszelkie prawa zastrzeżone.
          </p>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-10 items-center hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
