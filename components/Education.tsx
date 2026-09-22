import { EDUCATION } from "@/lib/data";
import { Reveal } from "./Reveal";
import { CapIcon, AwardIcon } from "./icons";

export function Education() {
  return (
    <section
      id="education"
      aria-label="Education and certifications"
      className="relative overflow-hidden border-t border-line/60 py-24 sm:py-28"
    >
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <span className="section-label">Background</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Education &amp; Certifications
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {EDUCATION.map((item, i) => {
            const Icon = i === 0 ? CapIcon : AwardIcon;
            return (
              <Reveal key={item.title} delay={i * 100}>
                <article className="card-surface group relative h-full overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong">
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-accent/10 text-accent-soft">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-[17px] font-semibold leading-snug text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[13.5px] text-accent-soft">
                        {item.institution}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-line pt-5 text-[13px] text-ink-dim">
                    {item.location ? <span>{item.location}</span> : null}
                    {item.year ? <span>{item.year}</span> : null}
                    <span className="font-medium text-ink-muted">{item.detail}</span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
