"use client";

import { useFavorites } from "@/store/favorites";
import { useMounted } from "@/hooks/use-mounted";
import { getProductById } from "@/lib/commerce";
import { PageIntro } from "@/components/ui/page-intro";
import { ButtonLink } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";

export function FavoritesView() {
  const mounted = useMounted();
  const ids = useFavorites((s) => s.ids);
  const products = mounted ? ids.map(getProductById).filter((p) => p !== undefined) : [];

  return (
    <>
      <PageIntro size="sm" eyebrow="Zapisane" lines={["Ulubione."]}>
        Produkty, które zapisałeś. Przechowywane lokalnie w tej przeglądarce.
      </PageIntro>
      <div className="container-x pb-24 md:pb-32">
        {mounted && products.length === 0 ? (
          <div className="border-t border-ink/15 py-20 text-center">
            <p className="display text-6xl md:text-8xl">Brak ulubionych.</p>
            <p className="mt-4 text-graphite">Kliknij ♡ przy produkcie, żeby go zapisać.</p>
            <ButtonLink href="/shop" size="lg" className="mt-8" arrow>
              Przejdź do sklepu
            </ButtonLink>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-x-3 gap-y-10 border-t border-ink/15 pt-8 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
            {products.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
