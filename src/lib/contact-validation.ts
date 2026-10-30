/**
 * Contact form validation — shared by the browser (instant feedback) and the
 * API route (the source of truth). Dependency-free on purpose.
 */

export const interestIds = [
  "projektowanie-wnetrz",
  "dobor-materialow",
  "dostawa-zamowienia",
  "kompleksowe-wsparcie",
  "inne",
] as const;

export type InterestId = (typeof interestIds)[number];

export const contactLimits = {
  name: 80,
  email: 254,
  phone: 30,
  messageMin: 10,
  message: 3000,
} as const;

export interface ContactInput {
  name: string;
  email: string;
  phone: string;
  interest: InterestId | "";
  message: string;
  consent: boolean;
}

export type ContactField = keyof ContactInput;
export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s()-]{7,}$/;

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Normalises untrusted input (FormData entries or JSON) into a ContactInput. */
export function normalizeContact(raw: Record<string, unknown>): ContactInput {
  const interest = text(raw.interest);
  return {
    name: text(raw.name).replace(/\s+/g, " "),
    email: text(raw.email).toLowerCase(),
    phone: text(raw.phone),
    interest: (interestIds as readonly string[]).includes(interest) ? (interest as InterestId) : "",
    message: text(raw.message).replace(/\r\n/g, "\n"),
    consent: raw.consent === true || raw.consent === "on" || raw.consent === "true",
  };
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};

  if (input.name.length < 2) errors.name = "Podaj swoje imię.";
  else if (input.name.length > contactLimits.name) errors.name = `Imię może mieć maksymalnie ${contactLimits.name} znaków.`;

  if (!input.email) errors.email = "Podaj adres e-mail.";
  else if (input.email.length > contactLimits.email || !EMAIL.test(input.email))
    errors.email = "Podaj poprawny adres e-mail, np. imie@domena.pl.";

  if (input.phone && (input.phone.length > contactLimits.phone || !PHONE.test(input.phone)))
    errors.phone = "Podaj poprawny numer telefonu lub zostaw to pole puste.";

  if (!input.interest) errors.interest = "Wybierz, w czym możemy pomóc.";

  if (input.message.length < contactLimits.messageMin)
    errors.message = `Napisz kilka słów o swoim wnętrzu (minimum ${contactLimits.messageMin} znaków).`;
  else if (input.message.length > contactLimits.message)
    errors.message = `Wiadomość może mieć maksymalnie ${contactLimits.message} znaków.`;

  if (!input.consent) errors.consent = "Potwierdź zapoznanie się z polityką prywatności.";

  return errors;
}
