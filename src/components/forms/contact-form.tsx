"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { interestOptions } from "@/content/contact-form";
import {
  contactLimits,
  normalizeContact,
  validateContact,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact-validation";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { cn } from "@/lib/cn";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const fieldOrder: ContactField[] = ["name", "email", "phone", "interest", "message", "consent"];

const inputClasses =
  "block w-full min-h-12 border-0 border-b bg-transparent px-0 py-3 text-base text-ink placeholder:text-stone/80 transition-colors duration-300 focus:border-ink focus:shadow-[0_1px_0_0_var(--color-ink)] focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-error";

interface ContactFormProps {
  /** Preselected interest, e.g. from a service card link (?temat=…). */
  initialTopic?: string | null;
  /** False until a delivery channel is configured in env — the form says so openly. */
  deliveryConfigured: boolean;
}

export function ContactForm({ initialTopic, deliveryConfigured }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const topic = interestOptions.some((option) => option.value === initialTopic) ? initialTopic! : "";

  function readForm(form: HTMLFormElement | null) {
    return normalizeContact(form ? Object.fromEntries(new FormData(form)) : {});
  }

  /** Re-validates one field (on blur, or while the user fixes an existing error). */
  function revalidate(field: ContactField, onlyIfInvalid: boolean, form: HTMLFormElement | null) {
    if (onlyIfInvalid && !errors[field]) return;
    const message = validateContact(readForm(form))[field];
    setErrors((current) => ({ ...current, [field]: message }));
  }

  function fieldProps(field: ContactField) {
    const error = errors[field];
    return {
      id: `contact-${field}`,
      name: field,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `contact-${field}-error` : undefined,
      onBlur: (event: FocusEvent<FieldElement>) => revalidate(field, false, event.currentTarget.form),
      onChange: (event: ChangeEvent<FieldElement>) => revalidate(field, true, event.currentTarget.form),
    } as const;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "submitting") return;

    const input = readForm(event.currentTarget);
    const nextErrors = validateContact(input);
    setErrors(nextErrors);
    const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      setStatus({ kind: "error", message: "Sprawdź zaznaczone pola formularza." });
      return;
    }

    setStatus({ kind: "submitting" });
    const honeypot = new FormData(event.currentTarget).get("company");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, company: honeypot, startedAt: startedAt.current }),
      });

      if (response.ok) {
        setStatus({ kind: "success" });
        formRef.current?.reset();
        return;
      }

      const data: { error?: string; fields?: ContactErrors } = await response.json().catch(() => ({}));
      if (response.status === 422 && data.fields) {
        setErrors(data.fields);
        setStatus({ kind: "error", message: "Sprawdź zaznaczone pola formularza." });
      } else if (data.error === "not_configured") {
        setStatus({
          kind: "error",
          message: "Wysyłka wiadomości nie jest jeszcze aktywna. Twoja wiadomość nie została wysłana.",
        });
      } else {
        setStatus({
          kind: "error",
          message: "Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę.",
        });
      }
    } catch {
      setStatus({
        kind: "error",
        message: "Brak połączenia. Sprawdź internet i spróbuj ponownie.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div role="status" className="flex min-h-[32rem] flex-col justify-center border-t border-ink/15 pt-10">
        <span aria-hidden="true" className="grid size-12 place-items-center rounded-full border border-success text-success">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
            <path d="m4 10.5 4 4 8-9" />
          </svg>
        </span>
        <h3 className="mt-8 font-serif text-h3">Dziękujemy za wiadomość.</h3>
        <p className="mt-4 max-w-[36ch] leading-relaxed text-stone-deep">
          Otrzymaliśmy Twoje zapytanie. Odezwiemy się na podany adres e-mail.
        </p>
        <button
          type="button"
          onClick={() => {
            startedAt.current = Date.now();
            setStatus({ kind: "idle" });
          }}
          className="mt-10 inline-flex min-h-11 items-center gap-3 self-start text-[0.75rem] font-semibold tracking-[0.08em] uppercase underline decoration-ink/30 underline-offset-[6px] hover:decoration-ink"
        >
          Wyślij kolejną wiadomość
        </button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} aria-describedby="contact-form-status" className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
      {!deliveryConfigured && (
        <p className="border border-sand bg-paper/70 px-5 py-4 text-sm leading-relaxed text-stone-deep sm:col-span-2">
          <strong className="font-semibold text-ink">Formularz w trakcie konfiguracji.</strong> Wysyłka wiadomości
          zostanie uruchomiona przed publikacją strony — obecnie zgłoszenia nie są przekazywane.
        </p>
      )}

      <Field label="Imię" field="name" error={errors.name}>
        <input
          {...fieldProps("name")}
          type="text"
          autoComplete="given-name"
          required
          maxLength={contactLimits.name}
          className={cn(inputClasses, "border-ink/25")}
        />
      </Field>

      <Field label="Adres e-mail" field="email" error={errors.email}>
        <input
          {...fieldProps("email")}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={contactLimits.email}
          className={cn(inputClasses, "border-ink/25")}
        />
      </Field>

      <Field label="Telefon" hint="opcjonalnie" field="phone" error={errors.phone}>
        <input
          {...fieldProps("phone")}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={contactLimits.phone}
          className={cn(inputClasses, "border-ink/25")}
        />
      </Field>

      <Field label="W czym możemy pomóc?" field="interest" error={errors.interest}>
        <div className="relative">
          <select
            key={topic}
            {...fieldProps("interest")}
            required
            defaultValue={topic}
            className={cn(inputClasses, "cursor-pointer appearance-none border-ink/25 pr-8")}
          >
            <option value="" disabled>
              Wybierz temat
            </option>
            {interestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ArrowIcon direction="down" className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-stone" />
        </div>
      </Field>

      <Field label="Wiadomość" field="message" error={errors.message} className="sm:col-span-2">
        <textarea
          {...fieldProps("message")}
          required
          rows={5}
          maxLength={contactLimits.message}
          placeholder="Opowiedz o przestrzeni, planach i terminie, który bierzesz pod uwagę."
          className={cn(inputClasses, "resize-y border-ink/25 leading-relaxed")}
        />
      </Field>

      {/* Honeypot — hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">Firma</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <div className="flex items-start gap-4">
          <input
            {...fieldProps("consent")}
            type="checkbox"
            required
            className="mt-0.5 size-5 shrink-0 cursor-pointer appearance-none border border-ink/40 bg-paper bg-center bg-no-repeat transition-colors checked:border-ink checked:bg-ink checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2020%2020%22%20fill=%22none%22%20stroke=%22%23FCFBF8%22%20stroke-width=%222%22%3E%3Cpath%20d=%22m4%2010.5%204%204%208-9%22/%3E%3C/svg%3E')] aria-[invalid=true]:border-error"
          />
          <label htmlFor="contact-consent" className="text-sm leading-relaxed text-stone-deep">
            Zapoznałem/am się z{" "}
            <Link href="/polityka-prywatnosci" className="text-ink underline underline-offset-4 hover:decoration-2">
              polityką prywatności
            </Link>{" "}
            i wyrażam zgodę na kontakt w sprawie mojego zapytania.
          </label>
        </div>
        <FieldError field="consent" error={errors.consent} />
      </div>

      <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p id="contact-form-status" role="status" aria-live="polite" className="min-h-6 text-sm text-stone-deep">
          {status.kind === "submitting" && "Wysyłanie wiadomości…"}
          {status.kind === "error" && <span className="text-error">{status.message}</span>}
        </p>
        <button
          type="submit"
          disabled={submitting}
          aria-disabled={submitting}
          className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 bg-ink px-8 text-[0.8125rem] font-semibold tracking-[0.08em] text-paper uppercase transition-[background-color,opacity] duration-500 ease-premium hover:bg-ink-soft disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? (
            <>
              <span aria-hidden="true" className="size-4 animate-spin rounded-full border border-paper/30 border-t-paper" />
              Wysyłanie
            </>
          ) : (
            <>
              Wyślij wiadomość
              <ArrowIcon className="transition-transform duration-500 ease-premium group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  field,
  error,
  className,
  children,
}: {
  label: string;
  hint?: string;
  field: ContactField;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={`contact-${field}`} className="eyebrow block text-stone-deep">
        {label}
        {hint && <span className="ml-2 tracking-normal normal-case text-stone-deep/80">({hint})</span>}
      </label>
      {children}
      <FieldError field={field} error={error} />
    </div>
  );
}

function FieldError({ field, error }: { field: ContactField; error?: string }) {
  if (!error) return null;
  return (
    <p id={`contact-${field}-error`} className="mt-2 flex items-start gap-2 text-sm text-error">
      <span aria-hidden="true">—</span>
      {error}
    </p>
  );
}
