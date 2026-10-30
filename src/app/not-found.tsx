import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Nie znaleziono strony",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[80svh] flex-col justify-center pt-32 pb-20">
      <p className="eyebrow text-stone-deep">Błąd 404</p>
      <h1 className="mt-6 max-w-[14ch] font-serif text-h2">Tej strony tu nie ma.</h1>
      <p className="mt-6 max-w-[36rem] leading-relaxed text-stone-deep">
        Adres mógł się zmienić albo strona nie została jeszcze opublikowana.
      </p>
      <div className="mt-10">
        <ButtonLink href="/" withArrow>
          Wróć na stronę główną
        </ButtonLink>
      </div>
    </section>
  );
}
