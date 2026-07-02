import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  jp,
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  jp?: string;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={`flex flex-col ${align === "center" ? "items-center text-center" : "items-start"}`}>
      {eyebrow ? (
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-foreground/40" />
          <span className="eyebrow">{eyebrow}</span>
          {jp ? <span className="font-serif text-sm text-muted-foreground">{jp}</span> : null}
        </div>
      ) : null}
      <h2 className="display mt-4 max-w-4xl text-4xl md:text-5xl lg:text-6xl">{title}</h2>
      {children ? <div className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">{children}</div> : null}
    </div>
  );
}
