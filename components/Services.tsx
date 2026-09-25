import { SERVICES } from "@/lib/data";
import { Reveal } from "./Reveal";
import {
  SearchIcon,
  CodeIcon,
  GlobeIcon,
  ZapIcon,
  CheckIcon,
  ArrowRight,
  ArrowUpRight,
} from "./icons";

const icons = {
  search: SearchIcon,
  code: CodeIcon,
  globe: GlobeIcon,
  zap: ZapIcon,
} as const;

export function Services() {
  return (
    <section
      id="services"
      aria-label="Services and offerings"
      className="relative border-t border-line/60 py-24 sm:py-28"
    >
      {/* ambient glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-accent/8 blur-3xl" />
        <div className="absolute left-1/3 bottom-10 h-64 w-64 rounded-full bg-accent-purple/8 blur-3xl" />
      </div>

      <div className="container-x">
        <Reveal className="max-w-2xl">
          <span className="section-label">Services</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            What I Offer
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            End-to-end technical SEO, content strategy, and high-performance development
            engineered to get discovered, rank, and convert.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SERVICES.map((service, index) => {
            const Icon = icons[service.icon as keyof typeof icons] ?? SearchIcon;
            return (
              <Reveal key={service.id} delay={index * 90} className="h-full">
                <article className="card-surface group relative flex h-full flex-col overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift sm:p-8">
                  {/* Subtle top border glow */}
                  <div
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-soft/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />

                  {/* Header: Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-accent/10 text-accent-soft transition-colors duration-300 group-hover:bg-accent/20">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-line-strong bg-white/[0.03] px-3 py-1 text-[11px] font-medium tracking-wide text-ink-dim">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] font-medium text-accent-soft">
                    {service.tagline}
                  </p>

                  {/* Description */}
                  <p className="mt-3.5 text-[14px] leading-relaxed text-ink-muted">
                    {service.description}
                  </p>

                  {/* Deliverables */}
                  <div className="mt-6 flex-1 border-t border-line/80 pt-5">
                    <span className="text-[11px] font-semibold uppercase tracking-widest2 text-ink-dim">
                      Key Deliverables
                    </span>
                    <ul className="mt-3 space-y-2.5">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[13px] leading-snug text-ink-muted"
                        >
                          <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-soft" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools & CTA */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line/60 pt-5">
                    <div className="flex flex-wrap gap-1.5" aria-label="Tools used">
                      {service.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-md border border-line bg-base-900/60 px-2 py-0.5 text-[11px] text-ink-dim"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      className="group/link inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink transition-colors hover:text-accent-soft"
                    >
                      Inquire
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Free audit conversion banner */}
        <Reveal delay={200} className="mt-10">
          <div className="card-surface relative flex flex-col items-center justify-between gap-6 overflow-hidden p-8 sm:flex-row sm:p-9">
            <div className="max-w-xl text-center sm:text-left">
              <span className="text-xs font-semibold uppercase tracking-widest2 text-accent-soft">
                Unsure where to start?
              </span>
              <h4 className="mt-2 font-display text-xl font-semibold text-ink">
                Get a Free Technical SEO Audit Snapshot
              </h4>
              <p className="mt-2 text-sm text-ink-muted">
                Send me your website URL and I&apos;ll manually review your crawlability,
                core indexation blockers, and top keyword opportunities.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-base-950 shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              Request Free Audit
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
