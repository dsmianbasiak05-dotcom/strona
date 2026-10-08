import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { PageIntro } from "@/components/ui/page-intro";
import { ContactForm } from "@/components/shop/contact-form";
import { Accordion } from "@/components/product/accordion";

export const metadata: Metadata = {
  title: "Contact",
  description: "Skontaktuj się z MONCRÉ — pytania o produkty, zamówienia, dostawę i zwroty.",
  alternates: { canonical: "/contact" },
};

// ⚠️ PLACEHOLDER copy — confirm policies with the brand before launch.
const faq = [
  { title: "Ile trwa wysyłka?", content: "Zamówienia wysyłamy w 1–2 dni robocze (informacja demonstracyjna)." },
  { title: "Czy mogę zwrócić produkt?", content: "Masz 14 dni na zwrot nieotwartego produktu. Szczegóły znajdziesz w regulaminie." },
];

const legal = [
  { id: "privacy", title: "Privacy Policy" },
  { id: "terms", title: "Terms" },
  { id: "cookies", title: "Cookies" },
];

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Contact" lines={["Talk to us."]}>
        Pytania o produkty, zamówienie albo współpracę? Odpisujemy w dni robocze.
      </PageIntro>

      <div className="container-x grid gap-16 pb-20 md:pb-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
        <aside className="space-y-10 lg:col-span-4 lg:col-start-9">
          <div>
            <h2 className="label mb-3 text-navy-500">Email</h2>
            <a href={`mailto:${siteConfig.email}`} className="display link-underline text-4xl">
              {siteConfig.email}
            </a>
          </div>
          <div>
            <h2 className="label mb-3 text-navy-500">Social</h2>
            <ul className="space-y-1 text-lg">
              <li><a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="link-underline">Instagram</a></li>
              <li><a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" className="link-underline">TikTok</a></li>
            </ul>
          </div>
        </aside>
      </div>

      <section className="bg-cream py-20 md:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <div id="faq" className="scroll-mt-24">
            <h2 className="display mb-8 text-6xl md:text-7xl">FAQ</h2>
            <Accordion items={faq} />
          </div>
          <div className="space-y-10">
            <div id="shipping" className="scroll-mt-24">
              <h2 className="display text-4xl">Shipping</h2>
              <ul className="mt-4 space-y-1 text-[15px] text-navy-900/80">
                {siteConfig.shipping.notes.map((n) => <li key={n}>{n}</li>)}
              </ul>
            </div>
            <div id="returns" className="scroll-mt-24">
              <h2 className="display text-4xl">Returns</h2>
              <p className="mt-4 text-[15px] text-navy-900/80">14 dni na zwrot nieotwartego produktu. Napisz do nas, a prześlemy instrukcję.</p>
            </div>
            {legal.map((l) => (
              <div key={l.id} id={l.id} className="scroll-mt-24">
                <h2 className="display text-4xl">{l.title}</h2>
                <p className="mt-4 text-[15px] text-navy-900/60">Dokument w przygotowaniu.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
