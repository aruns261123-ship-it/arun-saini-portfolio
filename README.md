# Arun Saini — Portfolio

Personal portfolio for **Arun Saini**, SEO Expert & Front-End Developer (Moradabad, India).

Built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS**. No other runtime dependencies.

## Getting started

```bash
npm install
npm run dev        # development server
npm run build      # production build
npm run start      # serve production build
npm run typecheck  # TypeScript checks
```

## Structure

```
app/
  layout.tsx        # metadata, fonts, JSON-LD (Person + WebSite), skip link
  page.tsx          # section composition
  api/contact/route.ts  # server-side form handling → Resend email
  globals.css       # theme tokens, utilities, reduced-motion support
  sitemap.ts        # /sitemap.xml
  robots.txt
  manifest.ts       # /manifest.webmanifest
  opengraph-image.tsx  # dynamic OG image (edge runtime)
  not-found.tsx     # custom 404
components/         # Navbar, Hero, About, Experience, Projects, Skills,
                    # Education, WhyMe, Contact, Footer, BackToTop, Reveal, icons
lib/data.ts         # all portfolio content in one place
public/favicon.svg
```

## Notes

- All content lives in `lib/data.ts` — edit copy, links, skills and projects there.
- Scroll reveals use a tiny IntersectionObserver wrapper (`components/Reveal.tsx`)
  and are disabled under `prefers-reduced-motion`.
- Update `https://arunsaini.dev` in `app/layout.tsx` and `app/sitemap.ts` when the
  real domain is known.

## Contact form & email delivery

The form POSTs to the site's own API route (`app/api/contact`), which validates,
sanitizes, rate-limits and sends the notification through
[Resend](https://resend.com). The API key stays server-side.

### 1. Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key (**required**) — never commit, never expose client-side |
| `CONTACT_TO_EMAIL` | Notification recipient (defaults to `aruns261123@gmail.com`) |
| `RESEND_FROM_EMAIL` | Verified sender, e.g. `"Arun Saini Portfolio <contact@yourdomain.com>"` (defaults to `Arun Saini Portfolio <onboarding@resend.dev>`) |

The email is **never** sent from the visitor's address (that fails SPF/DMARC and
lands in spam); the visitor's email is used as `Reply-To` instead.

### 2. Custom domain + DNS (only if you use one)

In Resend: **Domains → Add Domain → yourdomain.com**, then add the records Resend
shows you (values are domain-specific — always use the ones from your dashboard):

| Type | Name (typical) | Purpose |
| --- | --- | --- |
| TXT | `yourdomain.com` | SPF — authorizes Resend to send for the domain |
| TXT | `resend._domainkey.yourdomain.com` | DKIM — cryptographic signing |
| TXT | `_dmarc.yourdomain.com` | DMARC policy |
| MX | `send.yourdomain.com` (or `bounce.yourdomain.com`) | Bounce handling |

Wait for the records to verify in the Resend dashboard, then set
`CONTACT_FROM_EMAIL="Arun Saini Portfolio <contact@yourdomain.com>"`.

### 3. Deployment (Vercel)

1. Push the repo to GitHub.
2. Import it at vercel.com; framework preset: Next.js (zero config).
3. Add the environment variables above under **Settings → Environment Variables**.
4. Deploy. Test the form once and check the Gmail inbox (and Spam) for
   `New Portfolio Contact: …`.

> Deliverability is maximized (authenticated domain, proper From/Reply-To,
> HTML+text body, server-side sending) but inbox placement is ultimately
> decided by the recipient's mail provider.
