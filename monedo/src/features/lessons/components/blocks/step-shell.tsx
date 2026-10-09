import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const STEP_TITLE_ID = "lesson-step-title";

/** Common frame for every step: label, focusable title (focused on step change), body. */
export function StepShell({
  label,
  title,
  children,
  className,
}: {
  label: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <header className="flex flex-col gap-3">
        <p className="text-xs font-medium tracking-[0.08em] text-brand-text uppercase">{label}</p>
        <h2
          id={STEP_TITLE_ID}
          tabIndex={-1}
          className="text-[1.625rem] leading-tight font-semibold tracking-tight outline-none sm:text-3xl"
        >
          {title}
        </h2>
      </header>
      {children}
    </div>
  );
}

/** Lesson body copy: 18px, comfortable leading, ~68ch. */
export function Prose({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="flex measure flex-col gap-5 text-lg leading-8 text-fg">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
