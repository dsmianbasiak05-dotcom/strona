import type { Metadata } from "next";
import { AccountView } from "@/components/checkout/account-view";

export const metadata: Metadata = {
  title: "Konto",
  robots: { index: false, follow: true },
};

export default function AccountPage() {
  return <AccountView />;
}
