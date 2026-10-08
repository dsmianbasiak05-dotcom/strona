"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RevealLines } from "@/components/ui/reveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  return (
    <section aria-labelledby="newsletter-title" className="bg-cream py-20 md:py-32">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <div id="newsletter-title">
            <RevealLines lines={["Stay in", "style."]} className="display text-[22vw] md:text-[12vw] lg:text-[10vw] 2xl:text-[11rem]" />
          </div>
        </div>
        <div className="lg:col-span-5">
          <p className="max-w-[36ch] text-lg leading-relaxed">Get product drops, styling tips and MONCRÉ updates.</p>
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.p
                key="ok"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="display mt-8 text-4xl"
                role="status"
              >
                You&apos;re in. ✓
              </motion.p>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0 }}
                noValidate
                className="mt-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Mock — wire to ESP (Klaviyo, Mailchimp, GetResponse…) later.
                  setStatus(/^\S+@\S+\.\S+$/.test(email) ? "success" : "error");
                }}
              >
                <div className="flex items-stretch border-b-2 border-navy-900">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
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
                    aria-describedby="newsletter-hint"
                    className="label h-14 min-w-0 flex-1 bg-transparent text-sm placeholder:text-navy-900/45 focus:outline-none"
                  />
                  <button type="submit" className="label shrink-0 pl-4 transition-opacity hover:opacity-60">
                    Join MONCRÉ →
                  </button>
                </div>
                <p id="newsletter-hint" className={status === "error" ? "mt-3 text-sm text-error" : "mt-3 text-xs text-navy-500"}>
                  {status === "error"
                    ? "Podaj poprawny adres e-mail."
                    : "Zapisując się, akceptujesz politykę prywatności. Wypiszesz się jednym kliknięciem."}
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
