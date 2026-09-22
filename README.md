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
- The contact form validates client-side and opens a prefilled email draft to
  `aruns261123@gmail.com` (no backend required). To wire a real endpoint, replace
  the `mailto:` handoff in `components/Contact.tsx`.
- Scroll reveals use a tiny IntersectionObserver wrapper (`components/Reveal.tsx`)
  and are disabled under `prefers-reduced-motion`.
- Update `https://arunsaini.dev` in `app/layout.tsx` and `app/sitemap.ts` when the
  real domain is known.
