"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProgressProvider } from "@/features/progress/progress-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ProgressProvider>
        <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
      </ProgressProvider>
    </MotionConfig>
  );
}
