import type { ComponentProps } from "react";
import { formatEuro, formatNumber, formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

type NumProps = Omit<ComponentProps<"span">, "children"> & { value: number };

const numClass = "font-mono tabular tracking-tight whitespace-nowrap";

/** Euros in Geist Mono with tabular figures: `1.234,50 €`. */
export function Money({
  value,
  decimals = true,
  className,
  ...props
}: NumProps & { decimals?: boolean }) {
  return (
    <span className={cn(numClass, className)} {...props}>
      {formatEuro(value, { decimals })}
    </span>
  );
}

export function Num({
  value,
  fractionDigits = 0,
  className,
  ...props
}: NumProps & { fractionDigits?: number }) {
  return (
    <span className={cn(numClass, className)} {...props}>
      {formatNumber(value, fractionDigits)}
    </span>
  );
}

export function Percent({ value, className, ...props }: NumProps) {
  return (
    <span className={cn(numClass, className)} {...props}>
      {formatPercent(value)}
    </span>
  );
}
