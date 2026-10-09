import type { ReactNode } from "react";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * "Dato clave": the brand's signature block. A large Geist Mono figure with tabular
 * digits, a short unit in the sans face and one line of context. Use one per screen.
 */
export function KeyFigure({
  value,
  fractionDigits = 0,
  unit,
  label = "Dato clave",
  context,
  source,
  className,
}: {
  value: number;
  fractionDigits?: number;
  /** Short unit after the figure: "€", "%", "horas"… */
  unit?: string | undefined;
  label?: string;
  context: ReactNode;
  source?: string | undefined;
  className?: string;
}) {
  return (
    <figure className={cn("flex flex-col gap-4", className)}>
      <p className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.08em] text-brand-text uppercase">
        <span aria-hidden className="size-1.5 rounded-[1px] bg-brand-text" />
        {label}
      </p>
      <p className="flex flex-wrap items-baseline gap-x-3 leading-none">
        <span className="font-mono tabular text-[clamp(3.5rem,16vw,6rem)] font-medium tracking-[-0.06em] text-fg">
          {formatNumber(value, fractionDigits)}
        </span>
        {unit ? (
          <span className="text-2xl font-medium tracking-tight text-fg-muted sm:text-3xl">
            {unit}
          </span>
        ) : null}
      </p>
      <figcaption className="measure border-t border-border pt-4 text-lg leading-8 text-fg-muted">
        {context}
        {source ? (
          <span className="mt-2 block text-sm leading-6 text-fg-subtle">Fuente: {source}</span>
        ) : null}
      </figcaption>
    </figure>
  );
}
