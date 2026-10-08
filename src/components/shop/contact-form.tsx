"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const input =
  "w-full border-b border-navy-900/25 bg-transparent py-3 text-lg transition-colors placeholder:text-navy-900/35 focus:border-navy-900 focus:outline-none";

/** Mock contact form — connect to an API route / form service later. */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div role="status" className="border-t border-navy-900/15 pt-10">
        <p className="display text-6xl">Message sent.</p>
        <p className="mt-4 text-navy-500">Dzięki! (Tryb demonstracyjny — wiadomość nie została wysłana.)</p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-8 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div>
        <label htmlFor="c-name" className="label text-navy-500">Imię</label>
        <input id="c-name" name="name" required autoComplete="name" className={input} />
      </div>
      <div>
        <label htmlFor="c-email" className="label text-navy-500">Email</label>
        <input id="c-email" name="email" type="email" required autoComplete="email" className={input} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-topic" className="label text-navy-500">Temat</label>
        <select id="c-topic" name="topic" className={`${input} cursor-pointer`}>
          <option>Produkty</option>
          <option>Zamówienie</option>
          <option>Współpraca</option>
          <option>Inne</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-msg" className="label text-navy-500">Wiadomość</label>
        <textarea id="c-msg" name="message" required rows={5} className={`${input} resize-none`} />
      </div>
      <Button type="submit" size="lg" className="sm:col-span-2 sm:justify-self-start" arrow>
        Send message
      </Button>
    </form>
  );
}
