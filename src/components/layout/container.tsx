import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const widths = {
  prose: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

export function Container({
  className,
  width = "default",
  ...props
}: ComponentProps<"div"> & { width?: keyof typeof widths }) {
  return <div className={cn("mx-auto w-full px-4 sm:px-6", widths[width], className)} {...props} />;
}
