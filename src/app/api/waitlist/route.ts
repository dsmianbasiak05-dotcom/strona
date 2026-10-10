/**
 * Waitlist sign-up. Forwards { email, product, source, createdAt } as JSON
 * to the endpoint in WAITLIST_WEBHOOK_URL (an ESP / automation webhook,
 * e.g. Klaviyo, Mailchimp via Zapier/Make, a Google Apps Script…).
 *
 * Nothing is stored here. Without WAITLIST_WEBHOOK_URL the route answers
 * 503 so the form says sign-ups are not open yet — it never pretends.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: unknown; product?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const product = typeof body.product === "string" ? body.product.slice(0, 80) : "";
  if (!EMAIL.test(email) || email.length > 254) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }

  const target = process.env.WAITLIST_WEBHOOK_URL;
  if (!target) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(target, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, product, source: "moncre.pl", createdAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return Response.json({ error: "upstream_failed" }, { status: 502 });
  } catch {
    return Response.json({ error: "upstream_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
