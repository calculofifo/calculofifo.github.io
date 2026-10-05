import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DesignSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-20 border-t border-border py-12"
    >
      <div className="mb-8 flex max-w-2xl flex-col gap-2">
        <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        {description ? <p className="leading-7 text-fg-muted">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function Specimen({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <p className="font-mono text-xs text-fg-subtle">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}
