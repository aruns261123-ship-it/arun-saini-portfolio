import { CONTACT } from "@/lib/data";
import {
  LinkedInIcon,
  GitHubIcon,
  MailIcon,
  ArrowRight,
  TrendingIcon,
  SearchIcon,
  CodeIcon,
  CheckIcon,
} from "./icons";

function DashboardVisual() {
  const bars = [38, 52, 44, 66, 58, 78, 71, 92];
  const trendPoints = "0,34 14,30 28,32 42,26 56,27 70,20 84,22 100,12";
  return (
    <div className="relative w-full max-w-md" aria-hidden>
      {/* glow + orbit ring */}
      <div className="pointer-events-none absolute -inset-10 -z-10">
        <div className="absolute right-2 top-4 h-56 w-56 rounded-full bg-accent/20 blur-3xl animate-drift-slow" />
        <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-accent-purple/15 blur-3xl animate-drift-slow [animation-delay:-6s]" />
      </div>

    <div
      className="relative [transform-style:preserve-3d] animate-tilt-float will-change-transform motion-reduce:animate-none motion-reduce:[transform:none] motion-reduce:will-change-auto"
    >
      <div className="rounded-2xl border border-line bg-base-850/90 p-5 shadow-lift backdrop-blur">
        {/* browser chrome */}
        <div className="flex items-center gap-2 border-b border-line pb-3.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <div className="ml-2 flex flex-1 items-center gap-2 rounded-md border border-line bg-base-900/80 px-2.5 py-1 font-mono text-[10.5px] text-ink-dim">
            <SearchIcon className="h-3 w-3" />
            search performance — multi-region
          </div>
        </div>

        <div className="grid gap-4 pt-4 sm:grid-cols-5">
          {/* left: ranking chart card */}
          <div className="rounded-xl border border-line bg-base-900/70 p-4 sm:col-span-3">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-medium uppercase tracking-widest2 text-ink-dim">
                Organic visibility
              </span>
              <TrendingIcon className="h-4 w-4 text-accent-soft" />
            </div>
            <svg viewBox="0 0 100 40" className="mt-3 h-20 w-full" role="presentation">
              <defs>
                <linearGradient id="heroTrend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b96ff" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#8b96ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points={`${trendPoints} 100,40 0,40`} fill="url(#heroTrend)" />
              <polyline
                points={trendPoints}
                fill="none"
                stroke="#8b96ff"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            <div className="mt-2 flex items-end gap-1.5">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-accent/25 to-accent/70"
                  style={{ height: `${h * 0.42}px` }}
                />
              ))}
            </div>
          </div>

          {/* right: indexation + schema card */}
          <div className="flex flex-col gap-3 sm:col-span-2">
            <div className="flex-1 rounded-xl border border-line bg-base-900/70 p-4">
              <span className="text-[10.5px] font-medium uppercase tracking-widest2 text-ink-dim">
                Indexing
              </span>
              <div className="mt-2.5 space-y-2">
                {["Sitemap", "Crawl", "Render"].map((label, i) => (
                  <div key={label} className="flex items-center gap-2 text-[11.5px] text-ink-muted">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent/15 text-accent-soft">
                      <CheckIcon className="h-2.5 w-2.5" />
                    </span>
                    {label}
                    <span className="ml-auto flex gap-0.5">
                      {[0, 1, 2].map((dot) => (
                        <span
                          key={dot}
                          className="h-1 w-1 rounded-full bg-accent-soft/70"
                          style={{ opacity: 1 - dot * 0.3 - i * 0.08 }}
                        />
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 rounded-xl border border-line bg-base-900/70 p-4">
              <div className="flex items-center gap-2">
                <CodeIcon className="h-4 w-4 text-accent-soft" />
                <span className="font-mono text-[11px] text-ink-muted">schema.org</span>
              </div>
              <p className="mt-2 font-mono text-[10.5px] leading-relaxed text-ink-dim">
                {"{type: 'Person'}"}
                <br />
                {"+ WebSite + Breadcrumb"}
              </p>
            </div>
          </div>
        </div>
      </div>

        {/* floating 3D chips (parallax layer) */}
        <div className="pointer-events-none absolute -left-7 top-16 hidden animate-chip-float rounded-xl border border-line bg-base-800/90 px-3.5 py-2 shadow-card backdrop-blur motion-reduce:hidden sm:block">
          <span className="flex items-center gap-2 font-mono text-[11px] text-ink-muted">
            <CheckIcon className="h-3.5 w-3.5 text-emerald-400" />
            sitemap.xml — indexed
          </span>
        </div>
        <div className="pointer-events-none absolute -bottom-4 -right-3 hidden animate-chip-float rounded-xl border border-line bg-base-800/90 px-3.5 py-2 shadow-card backdrop-blur [animation-delay:-3.5s] motion-reduce:hidden sm:block">
          <span className="flex items-center gap-2 font-mono text-[11px] text-ink-muted">
            <SearchIcon className="h-3.5 w-3.5 text-accent-soft" />
            core web vitals — pass
          </span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" aria-label="Introduction" className="relative overflow-hidden">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.35] animate-grid-pan"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(70% 60% at 50% 30%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(70% 60% at 50% 30%, black 30%, transparent 75%)",
          }}
        />
        <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container-x grid items-center gap-14 pb-16 pt-32 sm:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24">
        <div className="animate-fade-up">
          <span className="badge-chip">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-soft animate-pulse-soft" />
            SEO Expert • Technical SEO • Front-End Developer
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.6rem]">
            I Build <span className="text-gradient">Search-Optimized</span> Digital
            Experiences.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            SEO professional combining technical SEO, content optimization and modern
            web development to build websites that are discoverable, fast and
            user-focused — with hands-on experience managing SEO for live websites
            targeting the India and US/Canada markets.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-base-950 shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent/10"
            >
              Let&apos;s Connect
            </a>
          </div>

          <div className="mt-9 flex items-center gap-2">
            <span className="text-[11px] font-medium uppercase tracking-widest2 text-ink-dim">
              Connect
            </span>
            <span className="h-px w-6 bg-line-strong" aria-hidden />
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/[0.03] text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-ink"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/[0.03] text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-ink"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              aria-label="Send email"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/[0.03] text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-ink"
            >
              <MailIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:150ms] lg:justify-self-end">
          <DashboardVisual />
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 hidden justify-center lg:flex">
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="group pointer-events-auto flex flex-col items-center gap-2 text-ink-dim transition-colors hover:text-ink-muted"
        >
          <span className="text-[10px] font-medium uppercase tracking-widest2">
            Scroll
          </span>
          <span className="flex h-9 w-6 items-start justify-center rounded-full border border-line-strong p-1.5">
            <span className="h-2 w-1 rounded-full bg-accent-soft animate-bounce" />
          </span>
        </a>
      </div>
    </section>
  );
}
