import { PROJECTS } from "@/lib/data";
import { Reveal } from "./Reveal";
import { ArrowUpRight, CodeIcon } from "./icons";

export function Projects() {
  return (
    <section
      id="projects"
      aria-label="Projects"
      className="relative border-t border-line/60 py-24 sm:py-28"
    >
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <span className="section-label">Projects</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Selected Work
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            A combination of SEO, web development and practical product building.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.number} delay={i * 100} className="h-full">
              <article className="card-surface group relative flex h-full flex-col overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift">
                {/* hover gradient wash */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-accent-purple/8 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />

                <div className="relative flex items-start justify-between">
                  <span className="font-mono text-xs tracking-widest2 text-ink-dim">
                    PROJECT {project.number}
                  </span>
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-dim transition-all duration-300 group-hover:border-accent/50 group-hover:text-accent-soft"
                    aria-hidden
                  >
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>

                <h3 className="relative mt-5 font-display text-xl font-semibold leading-snug text-ink">
                  {project.title}
                </h3>

                <p className="relative mt-3 flex-1 text-[14px] leading-relaxed text-ink-muted">
                  {project.description}
                </p>

                {project.highlight ? (
                  <p className="relative mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-[12px] font-medium text-accent-soft">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-accent-soft"
                      aria-hidden
                    />
                    {project.highlight}
                  </p>
                ) : null}

                <ul className="relative mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[11.5px] font-medium text-ink-muted transition-all duration-300 group-hover:border-line-strong group-hover:text-ink"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="relative mt-6 border-t border-line pt-5">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink transition-colors hover:text-accent-soft"
                    >
                      {project.cta}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-[13.5px] font-medium text-ink-dim">
                      <CodeIcon className="h-4 w-4" />
                      {project.cta}
                    </span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
