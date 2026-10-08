"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Lock } from "lucide-react";
import { useCart } from "@/store/cart";
import { useCartDetails } from "@/hooks/use-cart-details";
import { siteConfig, SHIPPING_TBA } from "@/config/site";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";
import { paymentProvider, type CheckoutCustomer, type PaymentMethod } from "@/lib/commerce/checkout";
import { Button, ButtonLink } from "@/components/ui/button";
import { ProductMedia } from "@/components/product/product-media";
import { SummaryRows } from "./order-summary";

type Errors = Partial<Record<keyof CheckoutCustomer | "terms", string>>;

const emptyCustomer: CheckoutCustomer = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  postalCode: "",
  city: "",
};

const paymentMethods: { id: PaymentMethod; label: string; note: string }[] = [
  { id: "blik", label: "BLIK", note: "Kod z aplikacji banku" },
  { id: "p24", label: "Przelewy24", note: "Szybki przelew online" },
  { id: "card", label: "Karta płatnicza", note: "Visa, Mastercard" },
];

function validate(c: CheckoutCustomer, terms: boolean): Errors {
  const e: Errors = {};
  if (!/^\S+@\S+\.\S+$/.test(c.email)) e.email = "Podaj poprawny adres e-mail.";
  if (!c.firstName.trim()) e.firstName = "Podaj imię.";
  if (!c.lastName.trim()) e.lastName = "Podaj nazwisko.";
  if (!/^[+\d\s-]{9,}$/.test(c.phone)) e.phone = "Podaj poprawny numer telefonu.";
  if (!c.address.trim()) e.address = "Podaj adres.";
  if (!/^\d{2}-\d{3}$/.test(c.postalCode)) e.postalCode = "Format: 00-000.";
  if (!c.city.trim()) e.city = "Podaj miasto.";
  if (!terms) e.terms = "Zaakceptuj regulamin, aby kontynuować.";
  return e;
}

function Field({
  id,
  label,
  error,
  className,
  ...props
}: { id: keyof CheckoutCustomer; label: string; error?: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label mb-2 block text-[10px] text-navy-900/70">
        {label}
      </label>
      <input
        id={id}
        name={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "h-12 w-full border bg-paper px-4 text-[15px] transition-colors focus:border-navy-900 focus:outline-none",
          error ? "border-error" : "border-navy-900/20",
        )}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-error">
          {error}
        </p>
      )}
    </div>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`step-${n}`} className="border-t border-navy-900/15 py-8 md:py-10">
      <h2 id={`step-${n}`} className="mb-6 flex items-baseline gap-4">
        <span className="label text-navy-500 tabular-nums">{n}</span>
        <span className="display text-4xl md:text-5xl">{title}</span>
      </h2>
      {children}
    </section>
  );
}

export function CheckoutView() {
  const { lines, subtotal, mounted } = useCartDetails();
  const clear = useCart((s) => s.clear);
  const [customer, setCustomer] = useState(emptyCustomer);
  const shippingOptions = siteConfig.shipping.options;
  const [shippingId, setShippingId] = useState<string>(shippingOptions[0]?.id ?? "");
  const [payment, setPayment] = useState<PaymentMethod>("blik");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);

  // No shipping terms configured yet → cost "to be decided" and ordering is blocked.
  const shippingOption = shippingOptions.find((o) => o.id === shippingId);
  const shipping = shippingOption ? shippingOption.price : null;
  const total = subtotal + (shipping ?? 0);
  const canOrder = shippingOptions.length > 0;

  const update = (key: keyof CheckoutCustomer) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer((c) => ({ ...c, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(customer, terms);
    setErrors(found);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      document.getElementById(firstKey)?.focus();
      return;
    }
    if (!canOrder) return;
    setSubmitting(true);
    const result = await paymentProvider.createCheckout({
      lines: lines.map(({ productId, variantId, quantity }) => ({ productId, variantId, quantity })),
      customer,
      shippingMethod: shippingId,
      paymentMethod: payment,
    });
    // Real providers: window.location.href = result.redirectUrl
    setOrderId(result.orderId);
    clear();
    setSubmitting(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (orderId) {
    return (
      <div className="container-x flex min-h-[80vh] flex-col items-start justify-center pt-28 pb-20">
        <p className="label text-navy-500">Order {orderId}</p>
        <h1 className="display mt-4 text-[18vw] md:text-[10rem]">Thank you.</h1>
        <p className="mt-6 max-w-[44ch] text-lg leading-relaxed">
          To było zamówienie testowe — płatność nie została pobrana. Po podłączeniu bramki płatności (Przelewy24, PayU,
          Stripe) w tym miejscu pojawi się potwierdzenie.
        </p>
        <ButtonLink href="/shop" size="lg" className="mt-10" arrow>
          Continue shopping
        </ButtonLink>
      </div>
    );
  }

  if (mounted && lines.length === 0) {
    return (
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-28 pb-20 text-center">
        <h1 className="display text-6xl md:text-8xl">Your cart is empty.</h1>
        <ButtonLink href="/shop" size="lg" className="mt-8" arrow>
          Shop products
        </ButtonLink>
      </div>
    );
  }

  const summaryList = (
    <ul className="space-y-4">
      {lines.map((l) => (
        <li key={l.variantId} className="flex items-center gap-4">
          <div className="relative aspect-square w-16 shrink-0 bg-paper">
            <ProductMedia product={l.product} compact sizes="64px" />
            <span className="absolute -top-2 -right-2 grid size-5 place-items-center rounded-full bg-navy-900 text-[10px] font-bold text-cream">
              {l.quantity}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{l.product.name.replace("MONCRÉ ", "")}</p>
            <p className="text-xs text-navy-500 tabular-nums">
              {l.product.variants.length > 1 ? `${l.variant.title} · ` : ""}
              {l.quantity} × {formatMoney(l.variant.price)}
            </p>
          </div>
          <p className="text-sm tabular-nums">{formatMoney(l.total)}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="pt-14 md:pt-20">
      {/* Mobile collapsible summary */}
      <div className="border-b border-navy-900/10 bg-cream lg:hidden">
        <button
          type="button"
          onClick={() => setSummaryOpen((v) => !v)}
          aria-expanded={summaryOpen}
          className="container-x flex h-14 items-center justify-between"
        >
          <span className="label inline-flex items-center gap-2">
            {summaryOpen ? "Hide" : "Show"} order summary
            <ChevronDown className={cn("size-4 transition-transform", summaryOpen && "rotate-180")} />
          </span>
          <span className="font-bold tabular-nums">{formatMoney(total)}</span>
        </button>
        <AnimatePresence initial={false}>
          {summaryOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="container-x space-y-6 pt-2 pb-6">
                {summaryList}
                <SummaryRows subtotal={subtotal} shipping={shipping} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="container-x grid gap-10 pb-24 lg:grid-cols-12 lg:gap-16">
        <form noValidate onSubmit={onSubmit} className="pt-8 lg:col-span-7 lg:pt-16">
          <div className="mb-8 flex items-end justify-between">
            <h1 className="display text-7xl md:text-8xl">Checkout</h1>
            <p className="label inline-flex items-center gap-1.5 pb-2 text-navy-500">
              <Lock className="size-3.5" /> Secure
            </p>
          </div>

          <Step n="01" title="Contact">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="email" label="Email" type="email" autoComplete="email" inputMode="email" value={customer.email} onChange={update("email")} error={errors.email} className="sm:col-span-2" />
              <Field id="phone" label="Telefon" type="tel" autoComplete="tel" inputMode="tel" value={customer.phone} onChange={update("phone")} error={errors.phone} className="sm:col-span-2" />
            </div>
          </Step>

          <Step n="02" title="Delivery">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="firstName" label="Imię" autoComplete="given-name" value={customer.firstName} onChange={update("firstName")} error={errors.firstName} />
              <Field id="lastName" label="Nazwisko" autoComplete="family-name" value={customer.lastName} onChange={update("lastName")} error={errors.lastName} />
              <Field id="address" label="Ulica i numer" autoComplete="street-address" value={customer.address} onChange={update("address")} error={errors.address} className="sm:col-span-2" />
              <Field id="postalCode" label="Kod pocztowy" autoComplete="postal-code" inputMode="numeric" placeholder="00-000" value={customer.postalCode} onChange={update("postalCode")} error={errors.postalCode} />
              <Field id="city" label="Miasto" autoComplete="address-level2" value={customer.city} onChange={update("city")} error={errors.city} />
            </div>

            <fieldset className="mt-8">
              <legend className="label mb-3 text-[10px] text-navy-900/70">Metoda dostawy</legend>
              {shippingOptions.length === 0 ? (
                <p className="border border-navy-900/20 bg-cream/60 p-4 text-sm">{SHIPPING_TBA}</p>
              ) : (
                <div className="grid gap-2">
                  {shippingOptions.map((o) => (
                    <label
                      key={o.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-4 border p-4 transition-colors has-[:focus-visible]:outline-2",
                        shippingId === o.id ? "border-navy-900 bg-cream/60" : "border-navy-900/20 hover:border-navy-900/50",
                      )}
                    >
                      <input type="radio" name="shipping" value={o.id} checked={shippingId === o.id} onChange={() => setShippingId(o.id)} className="size-4 accent-navy-900" />
                      <span className="flex-1">
                        <span className="block text-[15px] font-semibold">{o.label}</span>
                        <span className="block text-xs text-navy-500">{o.eta}</span>
                      </span>
                      <span className="text-sm tabular-nums">{formatMoney(o.price)}</span>
                    </label>
                  ))}
                </div>
              )}
            </fieldset>
          </Step>

          <Step n="03" title="Payment">
            <fieldset>
              <legend className="sr-only">Metoda płatności</legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {paymentMethods.map((m) => (
                  <label
                    key={m.id}
                    className={cn(
                      "flex cursor-pointer flex-col gap-1 border p-4 transition-colors has-[:focus-visible]:outline-2",
                      payment === m.id ? "border-navy-900 bg-cream/60" : "border-navy-900/20 hover:border-navy-900/50",
                    )}
                  >
                    <input type="radio" name="payment" value={m.id} checked={payment === m.id} onChange={() => setPayment(m.id)} className="sr-only" />
                    <span className="label">{m.label}</span>
                    <span className="text-xs text-navy-500">{m.note}</span>
                  </label>
                ))}
              </div>
              <p className="mt-3 text-xs text-navy-500">
                Tryb demonstracyjny — płatność nie zostanie pobrana. Integracja z bramką płatności w przygotowaniu.
              </p>
            </fieldset>

            <label className="mt-8 flex cursor-pointer items-start gap-3 text-sm">
              <input
                id="terms"
                type="checkbox"
                checked={terms}
                onChange={(e) => {
                  setTerms(e.target.checked);
                  if (errors.terms) setErrors((er) => ({ ...er, terms: undefined }));
                }}
                aria-invalid={!!errors.terms}
                aria-describedby={errors.terms ? "terms-error" : undefined}
                className="mt-0.5 size-4 accent-navy-900"
              />
              <span>
                Akceptuję{" "}
                <Link href="/contact#terms" className="underline underline-offset-2">
                  regulamin
                </Link>{" "}
                i{" "}
                <Link href="/contact#privacy" className="underline underline-offset-2">
                  politykę prywatności
                </Link>
                .
              </span>
            </label>
            {errors.terms && (
              <p id="terms-error" className="mt-1.5 text-xs text-error">
                {errors.terms}
              </p>
            )}
          </Step>

          <Button type="submit" size="lg" className="w-full" disabled={submitting || !mounted || !canOrder}>
            {submitting ? "Processing…" : `Place order — ${formatMoney(total)}`}
          </Button>
        </form>

        <aside className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-24 mt-16 bg-cream p-8">
            <h2 className="display mb-8 text-4xl">Your order</h2>
            {summaryList}
            <div className="mt-8">
              <SummaryRows subtotal={subtotal} shipping={shipping} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
