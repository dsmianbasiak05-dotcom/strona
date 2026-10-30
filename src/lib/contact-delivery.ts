import type { ContactInput } from "@/lib/contact-validation";
import { interestOptions } from "@/content/contact-form";
import { siteConfig } from "@/config/site";

/**
 * Delivery of contact form messages. Server-side only — reads secrets from env.
 *
 * Supported channels (first configured wins):
 *  A) Resend REST API  — RESEND_API_KEY + CONTACT_FROM_EMAIL + CONTACT_TO_EMAIL
 *  B) Generic webhook  — CONTACT_WEBHOOK_URL (Make, Zapier, n8n, Apps Script…)
 *
 * Nothing is stored by the site itself.
 */

type Channel =
  | { kind: "resend"; apiKey: string; from: string; to: string }
  | { kind: "webhook"; url: string };

function getChannel(): Channel | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  if (apiKey && from && to) return { kind: "resend", apiKey, from, to };

  const url = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (url) return { kind: "webhook", url };

  return null;
}

export function isContactDeliveryConfigured(): boolean {
  return getChannel() !== null;
}

function interestLabel(id: ContactInput["interest"]): string {
  return interestOptions.find((option) => option.value === id)?.label ?? id;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
}

export type DeliveryResult = "sent" | "not_configured" | "failed";

export async function deliverContactMessage(input: ContactInput): Promise<DeliveryResult> {
  const channel = getChannel();
  if (!channel) return "not_configured";

  const submittedAt = new Date().toISOString();
  const rows: [string, string][] = [
    ["Imię", input.name],
    ["E-mail", input.email],
    ["Telefon", input.phone || "—"],
    ["Zainteresowanie", interestLabel(input.interest)],
    ["Wiadomość", input.message],
  ];

  try {
    const response =
      channel.kind === "resend"
        ? await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${channel.apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from: channel.from,
              to: [channel.to],
              reply_to: input.email,
              subject: `Nowe zapytanie: ${interestLabel(input.interest)} — ${input.name}`,
              text: rows.map(([label, value]) => `${label}: ${value}`).join("\n\n"),
              html: rows
                .map(([label, value]) => `<p><strong>${label}</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`)
                .join(""),
            }),
            signal: AbortSignal.timeout(10_000),
          })
        : await fetch(channel.url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...input,
              interestLabel: interestLabel(input.interest),
              source: siteConfig.url,
              submittedAt,
            }),
            signal: AbortSignal.timeout(10_000),
          });
    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
