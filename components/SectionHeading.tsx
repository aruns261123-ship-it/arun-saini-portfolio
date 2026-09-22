import { Reveal } from "./Reveal";

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
}: {
  label: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <Reveal className={`flex flex-col gap-4 ${alignCls}`}>
      <span className="section-label">{label}</span>
      <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-xl text-base leading-relaxed text-ink-muted">{subtitle}</p>
      ) : null}
    </Reveal>
  );
}
