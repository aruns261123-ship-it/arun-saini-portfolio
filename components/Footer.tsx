import { NAV_ITEMS, CONTACT } from "@/lib/data";
import { LinkedInIcon, GitHubIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";
import { LiveLocationLabel } from "./LiveLocation";

const SERVICES = [
  { label: "Technical SEO", href: "#skills" },
  { label: "On-Page SEO", href: "#skills" },
  { label: "Local SEO", href: "#skills" },
  { label: "Multi-Region SEO", href: "#experience" },
  { label: "Website Audits", href: "#contact" },
] as const;

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="text-[11px] font-semibold uppercase tracking-widest2 text-ink-dim">
        {title}
      </span>
      {children}
    </div>
  );
}

const footerLinkCls =
  "text-[13.5px] text-ink-muted transition-colors duration-200 hover:text-ink";

export function Footer() {
  return (
    <footer className="relative border-t border-line/60 bg-base-900/40">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        aria-hidden
      />
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* brand */}
          <div className="max-w-sm">
            <a
              href="#home"
              className="font-display text-base font-bold tracking-[0.14em] text-ink transition-colors hover:text-accent-soft"
            >
              ARUN&nbsp;SAINI
            </a>
            <p className="mt-4 text-[13.5px] leading-relaxed text-ink-muted">
              SEO Expert focused on technical, on-page and local SEO — combining
              search optimization with modern front-end development to build
              websites that get found and perform.
            </p>
            <div className="mt-5 flex gap-2.5">
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in a new tab)"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/[0.03] text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-ink"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/[0.03] text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-ink"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                aria-label="Send email"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/[0.03] text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-ink"
              >
                <MailIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* navigation */}
          <FooterColumn title="Navigate">
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={footerLinkCls}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* services */}
          <FooterColumn title="Services">
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.label}>
                  <a href={service.href} className={footerLinkCls}>
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* contact */}
          <FooterColumn title="Get in Touch">
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-center gap-2.5 text-[13.5px] text-ink-muted transition-colors hover:text-ink"
                >
                  <MailIcon className="h-4 w-4 shrink-0 text-ink-dim transition-colors group-hover:text-accent-soft" />
                  <span className="truncate">{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-[13.5px] text-ink-muted transition-colors hover:text-ink"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-emerald-400" />
                  WhatsApp — {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="group flex items-center gap-2.5 text-[13.5px] text-ink-muted transition-colors hover:text-ink"
                >
                  <PhoneIcon className="h-4 w-4 shrink-0 text-ink-dim transition-colors group-hover:text-accent-soft" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-[13.5px] text-ink-muted">
                <PinIcon className="h-4 w-4 shrink-0 text-ink-dim" />
                <LiveLocationLabel />
              </li>
            </ul>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center rounded-full border border-line-strong bg-white/[0.03] px-4 py-2 text-[13px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent/10"
            >
              Start a Project
            </a>
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-[12.5px] text-ink-dim sm:flex-row">
          <p>© 2026 Arun Saini. All rights reserved.</p>
          <p className="font-mono text-[11.5px]">
            Built with Next.js · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
