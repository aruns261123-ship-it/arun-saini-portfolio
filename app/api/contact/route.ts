import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/contact
 *
 * Receives the portfolio contact form, validates + sanitizes server-side,
 * enforces rate limits & anti-spam protections, and sends the notification
 * email through Resend (https://resend.com).
 *
 * Deliverability & Authentication:
 * - From address: A verified sender address supported by Resend (defaults to
 *   "Arun Saini Portfolio <onboarding@resend.dev>" or RESEND_FROM_EMAIL).
 *   Never the visitor's address — spoofing visitor domains fails SPF/DKIM/DMARC
 *   and causes Gmail/Yahoo/Outlook to flag emails as spam or reject them.
 * - Reply-To: The visitor's verified email address (allowing direct replies).
 * - Recipient: aruns261123@gmail.com (or CONTACT_TO_EMAIL).
 * - Security: RESEND_API_KEY is kept strictly server-side.
 */

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "aruns261123@gmail.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ??
  process.env.CONTACT_FROM_EMAIL ??
  "Arun Saini Portfolio <onboarding@resend.dev>";

const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  subject: { min: 3, max: 120 },
  message: { min: 20, max: 5000 },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* ------------------------------ sanitization ----------------------------- */

/** Collapse control characters and trim to a hard length limit. */
function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

/** Escape untrusted text before placing it inside the HTML email. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ------------------------------- validation ------------------------------ */

type Payload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
};

function validate(p: Payload): Record<string, string> {
  const errors: Record<string, string> = {};
  if (p.name.length < LIMITS.name.min) {
    errors.name = "Please enter your name (at least 2 characters).";
  }
  if (!EMAIL_RE.test(p.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (p.subject.length < LIMITS.subject.min) {
    errors.subject = "Please add a short subject (at least 3 characters).";
  }
  if (p.message.length < LIMITS.message.min) {
    errors.message = "Please write a message of at least 20 characters.";
  }
  // Honeypot field: invisible to humans, filled only by automated bots
  if (p.company !== "") {
    errors.company = "Spam detected.";
  }
  return errors;
}

/* ------------------------------ rate limiting ---------------------------- */

// In-memory sliding window, keyed by client IP.
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 3; // 3 emails per 10 minutes

const hits = new Map<string, number[]>();

function isLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length > 0) hits.set(ip, recent);
  return recent.length >= MAX_PER_WINDOW;
}

function recordHit(ip: string): void {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) {
    const stale = Array.from(hits.entries()).filter(([, times]) =>
      times.every((t: number) => now - t >= WINDOW_MS)
    );
    for (const [key] of stale) hits.delete(key);
  }
}

/* ---------------------- duplicate submission protection ------------------- */

const recentSubmissions = new Map<string, number>();
const DEDUP_WINDOW_MS = 2 * 60 * 1000; // 2 minutes

function isDuplicate(key: string): boolean {
  const last = recentSubmissions.get(key);
  if (!last) return false;
  if (Date.now() - last < DEDUP_WINDOW_MS) return true;
  recentSubmissions.delete(key);
  return false;
}

function recordSubmission(key: string): void {
  const now = Date.now();
  recentSubmissions.set(key, now);
  if (recentSubmissions.size > 500) {
    recentSubmissions.forEach((timestamp, k) => {
      if (now - timestamp >= DEDUP_WINDOW_MS) {
        recentSubmissions.delete(k);
      }
    });
  }
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/* ------------------------------ email content ---------------------------- */

function renderEmail(p: Payload): { html: string; text: string } {
  const name = escapeHtml(p.name);
  const email = escapeHtml(p.email);
  const subject = escapeHtml(p.subject);
  const message = escapeHtml(p.message).replace(/\n/g, "<br />");

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Portfolio Contact: ${subject}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f5f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f8;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:12px;border:1px solid #e5e7eb;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <tr>
              <td style="background:#0b0b12;padding:24px 28px;">
                <h1 style="margin:0;color:#ffffff;font-size:16px;font-weight:600;letter-spacing:0.01em;">Arun Saini — Portfolio</h1>
                <p style="margin:6px 0 0 0;color:#8b90a3;font-size:13px;line-height:1.4;">New message received from Arun Saini's portfolio website.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#1f2430;">
                  <tr>
                    <td style="padding:8px 0;color:#6b7180;width:90px;vertical-align:top;">Name:</td>
                    <td style="padding:8px 0;font-weight:600;color:#111827;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#6b7180;vertical-align:top;">Email:</td>
                    <td style="padding:8px 0;font-weight:600;"><a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#6b7180;vertical-align:top;">Subject:</td>
                    <td style="padding:8px 0;font-weight:600;color:#111827;">${subject}</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding-top:16px;color:#6b7180;">Message:</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding:10px 0 0 0;">
                      <div style="background:#f8f9fb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;line-height:1.6;color:#1f2430;white-space:pre-wrap;word-break:break-word;">${message}</div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding-top:24px;">
                      <a href="mailto:${email}?subject=Re%3A%20${encodeURIComponent(p.subject)}"
                         style="display:inline-block;background:#0b0b12;color:#ffffff;text-decoration:none;font-size:13.5px;font-weight:600;padding:11px 22px;border-radius:999px;">
                        Reply to ${name} (${email})
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;border-top:1px solid #eef0f3;color:#9aa0af;font-size:12px;background:#fafbfc;">
                Sent from the contact form at <a href="https://arun-saini-portfolio.vercel.app" style="color:#6b7180;text-decoration:underline;">arun-saini-portfolio.vercel.app</a>.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    "New message received from Arun Saini's portfolio website.",
    "",
    `Name: ${p.name}`,
    `Email: ${p.email}`,
    `Subject: ${p.subject}`,
    "",
    "Message:",
    p.message,
    "",
    `Reply to: ${p.email}`,
  ].join("\n");

  return { html, text };
}

/* --------------------------------- handler ------------------------------- */

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY;

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured in environment variables.");
    return NextResponse.json(
      { ok: false, error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const ip = clientIp(req);

  // Quick rate-limit check before parsing
  if (isLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again later." },
      { status: 429 }
    );
  }

  let body: Partial<Payload>;
  try {
    body = (await req.json()) as Partial<Payload>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request payload." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const payload: Payload = {
    name: clean(body.name, LIMITS.name.max),
    email: clean(body.email, LIMITS.email.max),
    subject: clean(body.subject, LIMITS.subject.max),
    message: clean(body.message, LIMITS.message.max),
    company: typeof body.company === "string" ? body.company.trim() : "",
  };

  const errors = validate(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  // Duplicate submission protection (prevents spamming same message repeatedly)
  const dedupKey = `${ip}:${payload.email.toLowerCase()}:${payload.subject.toLowerCase()}:${payload.message}`;
  if (isDuplicate(dedupKey)) {
    // Return ok: true so user doesn't get an error, but skip sending duplicate email
    return NextResponse.json({ ok: true });
  }

  // Final rate limit check and record hit
  if (isLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again later." },
      { status: 429 }
    );
  }
  recordHit(ip);
  recordSubmission(dedupKey);

  const { html, text } = renderEmail(payload);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: payload.email,
        subject: `New Portfolio Contact: ${payload.subject}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[contact] Resend error ${res.status}: ${detail.slice(0, 300)}`);
      return NextResponse.json(
        { ok: false, error: "Failed to send the message." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[contact] Send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send the message." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
