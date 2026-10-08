import type { Metadata } from "next";
import { FavoritesView } from "@/components/shop/favorites-view";

export const metadata: Metadata = {
  title: "Ulubione",
  robots: { index: false, follow: true },
};

export default function FavoritesPage() {
  return <FavoritesView />;
}
