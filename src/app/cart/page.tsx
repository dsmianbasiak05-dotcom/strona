import type { Metadata } from "next";
import { CartView } from "@/components/checkout/cart-view";

export const metadata: Metadata = {
  title: "Koszyk",
  robots: { index: false, follow: true },
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return <CartView />;
}
