"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Waitlist sign-up for products that are not on sale yet.
 * ⚠️ MOCK — not connected to any list/ESP yet; nothing is stored. Wire the
 * submit handler to the chosen provider (Klaviyo, Mailchimp, Supabase…)
 * before going live.
 */
export function WaitlistForm({
  productName,
  id,
  className,
  tone = "brand",
}: {
  productName: string;
  id?: string;
  className?: string;
  /** "product": rendered on a product-colour block (uses theme tokens). */
  tone?: "brand" | "product";
}) {
  const t =
    tone === "product"
      ? {
          ok: "border-product-secondary/50 text-product-secondary",
          label: "text-product-secondary/70",
          input: "bg-transparent text-product-secondary placeholder:text-product-secondary/45 focus:border-product-secondary",
          inputBorder: "border-product-secondary/35",
          button: "bg-product-secondary text-product hover:opacity-85",
          hint: "text-product-secondary/60",
        }
      : {
          ok: "border-ink bg-bone/60",
          label: "text-ink/70",
          input: "bg-paper focus:border-ink",
          inputBorder: "border-ink/25",
          button: "bg-ink text-paper hover:bg-ink-700",
          hint: "text-graphite",
        };
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  return (
    <div id={id} className={cn("scroll-mt-28", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.p
            key="ok"
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("border p-4 text-[15px]", t.ok)}
          >
            <span className="display mr-2 text-2xl">Jesteś na liście.</span>
            Damy znać, gdy {productName} będzie dostępny.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0 }}
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              setStatus(/^\S+@\S+\.\S+$/.test(email) ? "success" : "error");
            }}
          >
            <label htmlFor={inputId} className={cn("label mb-2 block text-[10px]", t.label)}>
              E-mail
            </label>
            <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <input
                id={inputId}
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="TWÓJ E-MAIL"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                aria-invalid={status === "error"}
                aria-describedby={`${inputId}-hint`}
                className={cn(
                  "h-14 w-full min-w-0 border px-4 text-[15px] focus:outline-none",
                  t.input,
                  status === "error" ? "border-error" : t.inputBorder,
                )}
              />
              <button
                type="submit"
                className={cn("label h-14 px-8 transition-[background-color,opacity] duration-500", t.button)}
              >
                Zapisz się
              </button>
            </div>
            <p
              id={`${inputId}-hint`}
              className={status === "error" ? "mt-2 text-sm text-error" : cn("mt-2 text-xs", t.hint)}
            >
              {status === "error"
                ? "Podaj poprawny adres e-mail."
                : "Zostaw e-mail — powiadomimy Cię o starcie sprzedaży."}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
