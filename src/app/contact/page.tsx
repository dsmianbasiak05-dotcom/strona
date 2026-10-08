import type { Metadata } from "next";
import { siteConfig, SHIPPING_TBA } from "@/config/site";
import { PageIntro } from "@/components/ui/page-intro";
import { ContactForm } from "@/components/shop/contact-form";
import { Accordion } from "@/components/products/accordion";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Skontaktuj się z MONCRÉ — pytania o produkty, zamówienia, dostawę i zwroty.",
  alternates: { canonical: "/contact" },
};

const faq = [
  {
    title: "Kiedy MONCRÉ No.1 będzie dostępny?",
    content: "Produkt nie jest jeszcze dostępny w sprzedaży. Zapisz się na listę oczekujących na stronie produktu — damy znać o starcie.",
  },
  { title: "Jakie są warunki dostawy i zwrotów?", content: SHIPPING_TBA },
];

const legal = [
  { id: "privacy", title: "Polityka prywatności" },
  { id: "terms", title: "Regulamin" },
  { id: "cookies", title: "Pliki cookies" },
];

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="MONCRÉ" lines={["Kontakt."]}>
        Pytania o produkty, zamówienie albo współpracę? Odpisujemy w dni robocze.
      </PageIntro>

      <div className="container-x grid gap-16 pb-20 md:pb-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
        <aside className="space-y-10 lg:col-span-4 lg:col-start-9">
          <div>
            <h2 className="label mb-3 text-graphite">E-mail</h2>
            <a href={`mailto:${siteConfig.email}`} className="display link-underline text-4xl">
              {siteConfig.email}
            </a>
          </div>
          <div>
            <h2 className="label mb-3 text-graphite">Media społecznościowe</h2>
            <ul className="space-y-1 text-lg">
              <li><a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="link-underline">Instagram</a></li>
              <li><a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" className="link-underline">TikTok</a></li>
            </ul>
          </div>
        </aside>
      </div>

      <section className="bg-bone py-20 md:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <div id="faq" className="scroll-mt-24">
            <h2 className="display mb-8 text-6xl md:text-7xl">Pytania</h2>
            <Accordion items={faq} />
          </div>
          <div className="space-y-10">
            <div id="shipping" className="scroll-mt-24">
              <h2 className="display text-4xl">Dostawa</h2>
              <p className="mt-4 text-[15px] text-ink/80">{SHIPPING_TBA}</p>
            </div>
            <div id="returns" className="scroll-mt-24">
              <h2 className="display text-4xl">Zwroty</h2>
              <p className="mt-4 text-[15px] text-ink/80">{SHIPPING_TBA}</p>
            </div>
            {legal.map((l) => (
              <div key={l.id} id={l.id} className="scroll-mt-24">
                <h2 className="display text-4xl">{l.title}</h2>
                <p className="mt-4 text-[15px] text-ink/60">Dokument w przygotowaniu.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
