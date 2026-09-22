import {
  PROFILE_STRIP,
  PROFILE_CARD,
  CONTACT,
} from "@/lib/data";
import { Reveal } from "./Reveal";
import { LiveLocation, LiveLocationLabel } from "./LiveLocation";
import {
  TrendingIcon,
  CodeIcon,
  ToolIcon,
  PinIcon,
  SearchIcon,
} from "./icons";

const stripIcons = {
  trending: TrendingIcon,
  code: CodeIcon,
  tool: ToolIcon,
  pin: PinIcon,
} as const;

export function ProfileStrip() {
  return (
    <section aria-label="Quick profile" className="relative z-10 -mt-2 pb-8">
      <div className="container-x">
        <Reveal>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PROFILE_STRIP.map((item) => {
              const Icon = stripIcons[item.icon as keyof typeof stripIcons];
              return (
                <li
                  key={item.title}
                  className="card-surface group flex items-start gap-3.5 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-accent/10 text-accent-soft transition-colors duration-300 group-hover:bg-accent/20">
                    <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-ink-dim">
                      {item.lines.map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" aria-label="About" className="relative overflow-hidden py-24 sm:py-28">
      {/* soft ambient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-accent/8 blur-3xl animate-drift-slow" />
        <div className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-accent-purple/8 blur-3xl animate-drift-slow [animation-delay:-5s]" />
      </div>

      <div className="container-x">
        <SectionIntro />
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* left: about copy */}
          <Reveal delay={80}>
            <div className="space-y-5 text-[15.5px] leading-relaxed text-ink-muted">
              <p>
                I&apos;m <span className="font-semibold text-ink">Arun Saini</span>, an
                SEO professional with hands-on experience managing SEO for two live
                company websites targeting separate markets — India and US/Canada.
              </p>
              <p>
                My day-to-day work spans keyword research, on-page SEO, technical SEO,
                local SEO, content optimization, analytics and website audits — the
                full stack of what makes a website visible and healthy in search.
              </p>
              <p>
                With a BCA background and practical experience building web
                applications using <span className="text-ink">Next.js</span>,{" "}
                <span className="text-ink">TypeScript</span>,{" "}
                <span className="text-ink">Python</span> and{" "}
                <span className="text-ink">Flutter</span>, I understand both sides:
                how search engines read a website, and how that website is actually
                built.
              </p>
            </div>
          </Reveal>

          {/* right: profile card */}
          <Reveal delay={160}>
            <div className="relative">
              <div
                className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-accent/12 via-transparent to-accent-purple/12 blur-xl"
                aria-hidden
              />
              <div className="card-surface relative overflow-hidden p-7">
                {/* top gradient hairline */}
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-soft/70 to-transparent"
                  aria-hidden
                />
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-accent/25 to-accent-purple/20 font-display text-lg font-bold text-ink"
                    aria-hidden
                  >
                    AS
                  </span>                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink">
                        Arun Saini
                      </h3>
                      <p className="text-[13px] text-ink-dim">
                        <LiveLocation />
                      </p>
                    </div>
                </div>
                <dl className="mt-6 space-y-3.5 border-t border-line pt-6">
                  {PROFILE_CARD.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <dt className="shrink-0 text-[11px] font-medium uppercase tracking-widest2 text-ink-dim">
                        {row.label}
                      </dt>
                      <dd className="text-right text-[13.5px] font-medium text-ink">
                        {row.label === "Location" ? (
                          <span className="inline-flex items-center justify-end gap-1.5">
                            {row.value}
                            <LiveLocationLabel />
                          </span>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SectionIntro() {
  return (
    <Reveal className="max-w-2xl">
      <span className="section-label">About</span>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        More Than Just <span className="text-gradient">SEO.</span>
      </h2>
    </Reveal>
  );
}
