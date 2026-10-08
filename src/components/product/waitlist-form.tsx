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
}: {
  productName: string;
  id?: string;
  className?: string;
}) {
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
            className="border border-navy-900 bg-cream/60 p-4 text-[15px]"
          >
            <span className="display mr-2 text-2xl">You&apos;re on the list.</span>
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
            <label htmlFor={inputId} className="label mb-2 block text-[10px] text-navy-900/70">
              Email
            </label>
            <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <input
                id={inputId}
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                aria-invalid={status === "error"}
                aria-describedby={`${inputId}-hint`}
                className={cn(
                  "h-14 w-full min-w-0 border bg-paper px-4 text-[15px] focus:border-navy-900 focus:outline-none",
                  status === "error" ? "border-error" : "border-navy-900/25",
                )}
              />
              <button
                type="submit"
                className="label h-14 bg-navy-900 px-8 text-cream transition-colors duration-500 hover:bg-navy-700"
              >
                Join the waitlist
              </button>
            </div>
            <p
              id={`${inputId}-hint`}
              className={status === "error" ? "mt-2 text-sm text-error" : "mt-2 text-xs text-navy-500"}
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
