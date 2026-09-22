import { WHY_CARDS } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SearchIcon, CodeIcon, GlobeIcon } from "./icons";

const icons = {
  search: SearchIcon,
  code: CodeIcon,
  globe: GlobeIcon,
} as const;

export function WhyMe() {
  return (
    <section
      aria-label="Why work with me"
      className="relative border-t border-line/60 py-24 sm:py-28"
    >
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <span className="section-label">Working With Me</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Why Work With Me
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {WHY_CARDS.map((card, i) => {
            const Icon = icons[card.icon as keyof typeof icons];
            return (
              <Reveal key={card.title} delay={i * 100}>
                <article className="card-surface group h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-accent/10 text-accent-soft transition-colors duration-300 group-hover:bg-accent/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-[17px] font-semibold text-ink">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-ink-muted">
                    {card.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
