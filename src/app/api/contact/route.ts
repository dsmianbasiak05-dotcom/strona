import { deliverContactMessage } from "@/lib/contact-delivery";
import { normalizeContact, validateContact } from "@/lib/contact-validation";

/**
 * POST /api/contact — receives the contact form as JSON.
 *
 * Spam protection suited to a small brochure site:
 *  - honeypot field ("company") that people never see or fill in,
 *  - minimum fill time (bots submit instantly),
 *  - payload size limit and strict server-side validation.
 * For heavier traffic add Cloudflare Turnstile / hCaptcha (see README).
 */

const MAX_BODY_BYTES = 16_000;
const MIN_FILL_MS = 3_000;

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return Response.json({ error: "too_large" }, { status: 413 });

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("invalid");
    body = parsed as Record<string, unknown>;
  } catch {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }

  // Honeypot / timing: answer like a success so bots get no signal, but send nothing.
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
  if (body.company || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return Response.json({ ok: true });
  }

  const input = normalizeContact(body);
  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "validation", fields: errors }, { status: 422 });
  }

  const result = await deliverContactMessage(input);
  if (result === "not_configured") return Response.json({ error: "not_configured" }, { status: 503 });
  if (result === "failed") return Response.json({ error: "delivery_failed" }, { status: 502 });
  return Response.json({ ok: true });
}
