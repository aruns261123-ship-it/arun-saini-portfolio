import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <span className="font-mono text-sm tracking-widest2 text-accent-soft">
        404 — PAGE NOT FOUND
      </span>
      <h1 className="mt-5 max-w-xl font-display text-3xl font-semibold sm:text-4xl">
        This page <span className="text-gradient">doesn&apos;t rank.</span>
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
        Even the best SEO can&apos;t optimize a URL that doesn&apos;t exist. Let&apos;s
        get you back to familiar territory.
      </p>
      <a
        href="/"
        className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-base-950 shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
      >
        Back to Home
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>
    </section>
  );
}
