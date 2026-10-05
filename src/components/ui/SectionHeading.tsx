import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <Reveal className={`max-w-2xl ${alignClass}`}>
      {eyebrow ? (
        <p className="mb-3 font-display text-xs tracking-[0.22em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-display text-4xl leading-none tracking-[0.06em] sm:text-5xl ${
          light ? "text-white" : "text-ink-text"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            light ? "text-steel-light/90" : "text-muted"
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
