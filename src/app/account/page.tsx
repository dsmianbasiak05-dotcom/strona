import type { Metadata } from "next";
import { AccountView } from "@/components/checkout/account-view";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: true },
};

export default function AccountPage() {
  return <AccountView />;
}
