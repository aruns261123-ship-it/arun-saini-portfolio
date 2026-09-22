import { EXPERIENCE } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SearchIcon, CodeIcon, ToolIcon, GlobeIcon } from "./icons";

const groupIcons = {
  "Strategy & Research": SearchIcon,
  "On-Page & Content": CodeIcon,
  "Technical SEO": ToolIcon,
  "Analytics, Local & Paid": GlobeIcon,
} as const;

export function Experience() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className="relative border-t border-line/60 py-24 sm:py-28"
    >
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <span className="section-label">Career</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Experience
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Current role — hands-on SEO ownership across two live, multi-region
            websites.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* left: role summary card */}
          <Reveal delay={80}>
            <article className="card-surface relative overflow-hidden p-7 lg:sticky lg:top-28">
              <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-soft/70 to-transparent"
                aria-hidden
              />
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-soft/50" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-soft" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-widest2 text-accent-soft">
                  Current Role
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
                {EXPERIENCE.role}
              </h3>
              <p className="mt-1.5 text-[15px] font-medium text-accent-soft">
                {EXPERIENCE.company}
              </p>
              <p className="mt-1 text-[13px] font-medium text-ink-dim">
                {EXPERIENCE.period}
              </p>
              <p className="mt-5 border-t border-line pt-5 text-[14.5px] leading-relaxed text-ink-muted">
                {EXPERIENCE.highlight}
              </p>
            </article>
          </Reveal>

          {/* right: responsibility groups on a timeline rail */}
          <div className="relative">
            <div
              className="absolute bottom-4 left-[15px] top-4 w-px bg-gradient-to-b from-accent/50 via-line-strong to-transparent sm:left-[19px]"
              aria-hidden
            />
            <ol className="space-y-8">
              {EXPERIENCE.groups.map((group, gi) => {
                const Icon =
                  groupIcons[group.title as keyof typeof groupIcons] ?? SearchIcon;
                return (
                  <li key={group.title}>
                    <Reveal delay={gi * 90}>
                      <div className="relative flex gap-5">
                        <span className="z-10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong bg-base-800 text-accent-soft sm:h-10 sm:w-10">
                          <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                        </span>
                        <div className="card-surface min-w-0 flex-1 p-6 transition-colors duration-300 hover:border-line-strong">
                          <h4 className="text-[15px] font-semibold text-ink">
                            {group.title}
                          </h4>
                          <ul className="mt-4 space-y-3">
                            {group.items.map((item) => (
                              <li
                                key={item}
                                className="flex gap-3 text-[13.5px] leading-relaxed text-ink-muted"
                              >
                                <span
                                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
                                  aria-hidden
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
