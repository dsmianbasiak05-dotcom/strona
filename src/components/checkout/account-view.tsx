"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/ui/page-intro";

/**
 * Mock account screen. Auth provider (Supabase Auth, Shopify customer
 * accounts…) to be connected — forms do not send data anywhere.
 */
export function AccountView() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [notice, setNotice] = useState(false);

  const input =
    "h-12 w-full border border-navy-900/20 bg-paper px-4 text-[15px] transition-colors focus:border-navy-900 focus:outline-none";

  return (
    <>
      <PageIntro size="sm" eyebrow="Account" lines={mode === "login" ? ["Welcome", "back."] : ["Join", "MONCRÉ."]} key={mode} />
      <div className="container-x grid gap-16 pb-24 md:pb-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div role="tablist" aria-label="Logowanie lub rejestracja" className="flex border-b border-navy-900/15">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                role="tab"
                type="button"
                aria-selected={mode === m}
                onClick={() => {
                  setMode(m);
                  setNotice(false);
                }}
                className={cn("label relative h-12 px-1 mr-8", mode === m ? "text-navy-900" : "text-navy-900/45")}
              >
                {m === "login" ? "Sign in" : "Create account"}
                {mode === m && <motion.span layoutId="acc-tab" className="absolute inset-x-0 -bottom-px h-[2px] bg-navy-900" />}
              </button>
            ))}
          </div>

          <form
            className="mt-8 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setNotice(true);
            }}
          >
            {mode === "register" && (
              <div>
                <label htmlFor="acc-name" className="label mb-2 block text-[10px] text-navy-900/70">Imię</label>
                <input id="acc-name" autoComplete="given-name" className={input} required />
              </div>
            )}
            <div>
              <label htmlFor="acc-email" className="label mb-2 block text-[10px] text-navy-900/70">Email</label>
              <input id="acc-email" type="email" autoComplete="email" className={input} required />
            </div>
            <div>
              <label htmlFor="acc-pass" className="label mb-2 block text-[10px] text-navy-900/70">Hasło</label>
              <input
                id="acc-pass"
                type="password"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                className={input}
                required
                minLength={8}
              />
            </div>
            <Button type="submit" size="lg" className="mt-2 w-full" arrow>
              {mode === "login" ? "Sign in" : "Create account"}
            </Button>
            {notice && (
              <p role="status" className="bg-cream p-4 text-sm">
                Konta klientów są w przygotowaniu — formularz działa w trybie demonstracyjnym.
              </p>
            )}
          </form>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="grain relative overflow-hidden bg-navy-900 p-8 text-cream md:p-12">
            <p className="label text-cream/55">Members</p>
            <p className="display mt-4 text-5xl md:text-6xl">Why an account?</p>
            <ul className="mt-8 space-y-4 text-[15px]">
              {["Historia zamówień i śledzenie przesyłek", "Szybszy checkout", "Ulubione na każdym urządzeniu", "Wcześniejszy dostęp do dropów"].map((t, i) => (
                <li key={t} className="flex gap-4 border-t border-cream/12 pt-4">
                  <span className="label pt-1 text-cream/50 tabular-nums">0{i + 1}</span>
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/favorites" className="label link-underline mt-10 inline-block">
              View favorites →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
