import { SEO_SKILLS, DEV_SKILLS } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SearchIcon, ToolIcon, TrendingIcon, ArrowRight } from "./icons";

const CATEGORY_META = {
  seo: { label: "SEO", icon: SearchIcon },
  tools: { label: "SEO Tools", icon: ToolIcon },
  marketing: { label: "Marketing", icon: TrendingIcon },
} as const;

export function Skills() {
  return (
    <section
      id="skills"
      aria-label="Skills"
      className="relative border-t border-line/60 py-24 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 opacity-60"
        aria-hidden
        style={{
          background:
            "radial-gradient(50% 100% at 50% 0%, rgba(109,124,255,0.08), transparent 70%)",
        }}
      />

      <div className="container-x">
        <SectionHeading
          label="Expertise"
          title="SEO Stack"
          subtitle="Skills across search optimization, professional tooling and marketing — built on live, multi-region websites."
        />

        {/* SEO categories */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {(Object.keys(SEO_SKILLS) as Array<keyof typeof SEO_SKILLS>).map((key, i) => {
            const meta = CATEGORY_META[key];
            const Icon = meta.icon;
            return (
              <Reveal key={key} delay={i * 100}>
                <article className="card-surface group h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong">
                  <div className="flex items-center gap-3.5">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-accent/10 text-accent-soft transition-colors duration-300 group-hover:bg-accent/20">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {meta.label}
                    </h3>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2.5">
                    {SEO_SKILLS[key].map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-[12.5px] font-medium text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:bg-accent/10 hover:text-ink"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* development flow */}
        <Reveal delay={120}>
          <div className="card-surface mt-6 overflow-hidden p-7 sm:p-9">
            <h3 className="text-center font-display text-xl font-semibold text-ink">
              Development &amp; Technical Skills
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-center text-[14px] leading-relaxed text-ink-muted">
              A developer&apos;s understanding of how websites are built — the bridge
              between search optimization and engineering.
            </p>

            <ul className="mt-7 flex flex-wrap justify-center gap-2.5">
              {DEV_SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="rounded-lg border border-line bg-base-900/70 px-4 py-2 font-mono text-[12.5px] text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:text-ink"
                >
                  {skill}
                </li>
              ))}
            </ul>

            {/* SEO → Development → Performance → UX flow */}
            <div className="mt-9 border-t border-line pt-8">
              <div className="flex flex-wrap items-center justify-center gap-y-3">
                {["SEO", "Development", "Performance", "User Experience"].map(
                  (step, i, arr) => (
                    <span key={step} className="flex items-center">
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[12.5px] font-semibold text-accent-soft">
                        {step}
                      </span>
                      {i < arr.length - 1 ? (
                        <ArrowRight className="mx-3 h-4 w-4 text-ink-dim" />
                      ) : null}
                    </span>
                  )
                )}
              </div>
              <p className="mt-4 text-center text-[13px] italic text-ink-dim">
                The working philosophy behind every project: optimization that starts
                at the code level and ends with the user.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
