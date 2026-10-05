"use client";

import { Tabs as TabsPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

export function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex h-9 items-center gap-0.5 rounded-md border border-border bg-surface-muted p-0.5",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex h-full cursor-pointer items-center justify-center gap-1.5 rounded-sm px-3 text-sm font-medium text-fg-muted",
        "transition-colors duration-(--duration-fast) hover:text-fg",
        "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus",
        "disabled:pointer-events-none disabled:opacity-45",
        "data-[state=active]:bg-surface data-[state=active]:text-fg data-[state=active]:shadow-[0_0_0_1px_var(--border)]",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        "mt-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-[state=active]:animate-fade-in",
        className,
      )}
      {...props}
    />
  );
}
