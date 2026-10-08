import type { CartLine } from "./types";

/**
 * Payment / checkout adapter.
 *
 * Each provider (Stripe, Przelewy24, PayU…) implements this interface
 * server-side. The mock provider below simulates a successful order so
 * the full checkout UX can be tested locally.
 */

export type PaymentMethod = "blik" | "p24" | "card";

export interface CheckoutCustomer {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
}

export interface CheckoutRequest {
  lines: CartLine[];
  customer: CheckoutCustomer;
  shippingMethod: string;
  paymentMethod: PaymentMethod;
}

export interface CheckoutResult {
  orderId: string;
  /** Real providers return a hosted payment URL to redirect to. */
  redirectUrl?: string;
}

export interface PaymentProvider {
  id: string;
  createCheckout(request: CheckoutRequest): Promise<CheckoutResult>;
}

export const mockPaymentProvider: PaymentProvider = {
  id: "mock",
  async createCheckout() {
    await new Promise((r) => setTimeout(r, 1200));
    return { orderId: `MC-${Date.now().toString(36).toUpperCase()}` };
  },
};

export const paymentProvider: PaymentProvider = mockPaymentProvider;
