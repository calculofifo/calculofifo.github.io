"use client";

import { Check, X } from "lucide-react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Single-choice group for quiz questions. Arrow keys move between options. */
export function ChoiceGroup({
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} />;
}

export type ChoiceStatus = "correct" | "incorrect";

export function ChoiceItem({
  className,
  children,
  letter,
  status,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Item> & {
  letter: string;
  status?: ChoiceStatus | undefined;
}) {
  return (
    <RadioGroupPrimitive.Item
      data-status={status}
      className={cn(
        "group flex w-full cursor-pointer items-start gap-3 rounded-md border border-border bg-surface p-3.5 text-left text-base leading-6",
        "transition-[border-color,background-color] duration-(--duration-fast) ease-(--ease-out)",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus enabled:hover:border-border-control",
        "data-[state=checked]:border-brand data-[state=checked]:bg-brand-subtle/50",
        "data-[status=correct]:border-success data-[status=correct]:bg-success-subtle",
        "data-[status=incorrect]:border-danger data-[status=incorrect]:bg-danger-subtle",
        "disabled:cursor-default",
        "disabled:[&:not([data-status])]:opacity-60",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "grid size-6 shrink-0 place-items-center rounded-sm border border-border-strong font-mono text-xs font-medium text-fg-muted",
          "group-data-[state=checked]:border-brand group-data-[state=checked]:bg-brand group-data-[state=checked]:text-brand-fg",
          "group-data-[status=correct]:border-success group-data-[status=correct]:bg-success group-data-[status=correct]:text-surface",
          "group-data-[status=incorrect]:border-danger group-data-[status=incorrect]:bg-danger group-data-[status=incorrect]:text-surface",
        )}
      >
        {status === "correct" ? (
          <Check className="size-3.5" />
        ) : status === "incorrect" ? (
          <X className="size-3.5" />
        ) : (
          letter
        )}
      </span>
      <span className="min-w-0 pt-px text-fg">{children}</span>
      {status ? (
        <span className="sr-only">{status === "correct" ? "Correcta" : "Incorrecta"}</span>
      ) : null}
    </RadioGroupPrimitive.Item>
  );
}
