"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Status = "idle" | "invalid" | "sending" | "success" | "closed" | "failed";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Waitlist sign-up for products that are not on sale yet. Posts to
 * /api/waitlist, which forwards the address to the configured provider.
 * Success is shown only when the server confirms; if sign-ups are not
 * configured yet the form says so instead of pretending.
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
          input: "text-product-secondary placeholder:text-product-secondary/45 focus:border-product-secondary",
          inputBorder: "border-product-secondary/40",
          button: "bg-product-secondary text-product hover:opacity-85",
          hint: "text-product-secondary/60",
        }
      : {
          ok: "border-ink",
          label: "text-ink/70",
          input: "text-ink placeholder:text-ink/35 focus:border-ink",
          inputBorder: "border-ink/30",
          button: "bg-ink text-paper hover:bg-ink-700",
          hint: "text-graphite",
        };
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const submit = async () => {
    if (!EMAIL.test(email.trim())) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), product: productName }),
      });
      if (res.ok) setStatus("success");
      else if (res.status === 400) setStatus("invalid");
      else if (res.status === 503) setStatus("closed");
      else setStatus("failed");
    } catch {
      setStatus("failed");
    }
  };

  const message: Record<Status, React.ReactNode> = {
    idle: "Zostaw e-mail — powiadomimy Cię o starcie sprzedaży.",
    sending: "Zapisuję…",
    invalid: "Podaj poprawny adres e-mail.",
    closed: (
      <>
        Zapisy na listę jeszcze nie ruszyły — nic nie zostało zapisane. Zajrzyj wkrótce albo{" "}
        <Link href="/contact" className="underline underline-offset-2">
          napisz do nas
        </Link>
        .
      </>
    ),
    failed: "Nie udało się zapisać. Spróbuj ponownie za chwilę.",
    success: null,
  };
  const isError = status === "invalid" || status === "closed" || status === "failed";

  return (
    <div id={id} className={cn("scroll-mt-28", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.p
            key="ok"
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("border-l-2 py-2 pl-4 text-[15px]", t.ok)}
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
              if (status !== "sending") void submit();
            }}
          >
            <label htmlFor={inputId} className={cn("label block text-[10px]", t.label)}>
              Twój e-mail
            </label>
            <div className="mt-1 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
              <input
                id={inputId}
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="adres@email.pl"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (isError) setStatus("idle");
                }}
                aria-invalid={status === "invalid"}
                aria-describedby={`${inputId}-hint`}
                className={cn(
                  "h-14 w-full min-w-0 border-0 border-b-2 bg-transparent px-0 text-lg focus:outline-none",
                  t.input,
                  status === "invalid" ? "border-error" : t.inputBorder,
                )}
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className={cn(
                  "label h-14 px-10 transition-[background-color,opacity] duration-500 disabled:opacity-60",
                  t.button,
                )}
              >
                {status === "sending" ? "Zapisuję…" : "Zapisz się"}
              </button>
            </div>
            <p
              id={`${inputId}-hint`}
              role={isError ? "alert" : undefined}
              className={cn("mt-3 text-xs leading-relaxed", isError ? "text-error" : t.hint)}
            >
              {message[status]}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
