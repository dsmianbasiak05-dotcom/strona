import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * Privacy policy — TEMPLATE. Structure only: the controller's details, legal
 * bases and processors must be completed (ideally verified by a lawyer)
 * before publication. Not indexed until then.
 */
export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: `Zasady przetwarzania danych osobowych na stronie ${siteConfig.name}.`,
  robots: { index: false, follow: true },
};

const TODO = "[do uzupełnienia]";

const sections = [
  {
    title: "1. Administrator danych",
    body: [
      `Administratorem danych osobowych jest ${siteConfig.company.legalName || TODO}${siteConfig.company.taxId ? `, NIP ${siteConfig.company.taxId}` : ""}. Kontakt w sprawie danych osobowych: ${siteConfig.contact.email || TODO}.`,
    ],
  },
  {
    title: "2. Jakie dane przetwarzamy",
    body: [
      "Dane przekazane w formularzu kontaktowym: imię, adres e-mail, opcjonalnie numer telefonu, wybrany temat oraz treść wiadomości.",
    ],
  },
  {
    title: "3. Cel i podstawa przetwarzania",
    body: [
      "Dane przetwarzamy w celu odpowiedzi na zapytanie i prowadzenia korespondencji przed ewentualnym zawarciem umowy (art. 6 ust. 1 lit. b RODO) oraz w prawnie uzasadnionym interesie administratora polegającym na obsłudze zapytań (art. 6 ust. 1 lit. f RODO).",
    ],
  },
  {
    title: "4. Odbiorcy danych",
    body: [
      `Dane mogą być przekazywane dostawcom usług technicznych, z których korzysta strona: hostingu oraz wysyłki wiadomości e-mail ${TODO}.`,
    ],
  },
  {
    title: "5. Okres przechowywania",
    body: [`Dane przechowujemy przez okres niezbędny do obsługi zapytania, nie dłużej niż ${TODO}.`],
  },
  {
    title: "6. Twoje prawa",
    body: [
      "Przysługuje Ci prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia oraz wniesienia sprzeciwu, a także prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.",
    ],
  },
  {
    title: "7. Pliki cookies",
    body: [
      "Strona nie wykorzystuje obecnie plików cookies analitycznych ani marketingowych. W przypadku dodania narzędzi analitycznych ta część zostanie zaktualizowana.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <article className="container-site pt-32 pb-24 lg:pt-44 lg:pb-36">
      <div className="max-w-[46rem]">
        <p className="eyebrow text-stone-deep">Dokumenty</p>
        <h1 className="mt-6 font-serif text-h2">Polityka prywatności</h1>
        <p className="mt-8 border border-sand bg-cream px-5 py-4 text-sm leading-relaxed text-stone-deep">
          <strong className="font-semibold text-ink">Wersja robocza.</strong> Dokument wymaga uzupełnienia danych
          administratora i weryfikacji przed publikacją strony. Fragmenty oznaczone jako {TODO} nie zostały jeszcze
          ustalone.
        </p>
        <div className="mt-14 grid gap-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-serif text-[1.75rem] leading-tight">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-stone-deep">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
