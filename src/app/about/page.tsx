import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "O marce — kosmetyki do stylizacji włosów dla mężczyzn",
  description:
    "MONCRÉ — kosmetyki do stylizacji męskich włosów. Pierwszy produkt marki: MONCRÉ No.1.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "O marce MONCRÉ" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="O marce" lines={["MONCRÉ."]} srLabel="O marce MONCRÉ">
        MONCRÉ to polska marka kosmetyków do stylizacji męskich włosów.
      </PageIntro>

      <section aria-label="Pierwszy produkt" className="section-y border-t border-ink/10">
        <div className="container-x flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[44ch] text-lg leading-relaxed">
            Pierwszy produkt marki to MONCRÉ No.1 — glinka do włosów o efekcie mat + tekstura.
          </p>
          <ButtonLink href="/shop" size="lg" arrow>
            Przejdź do sklepu
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
