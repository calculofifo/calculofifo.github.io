"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ProgressRing } from "@/components/ui/progress-ring";

export function ProgressDemo() {
  const [done, setDone] = useState(2);
  const total = 6;
  const value = done / total;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-8">
        <ProgressRing value={value} label="Progreso del curso" size={72} stroke={6}>
          <span className="font-mono tabular text-sm font-medium">{Math.round(value * 100)}%</span>
        </ProgressRing>
        <ProgressRing value={value} label="Progreso compacto" size={40} stroke={4} />
        <ProgressRing value={3 / 3} label="Objetivo semanal" size={56} stroke={5} tone="amber">
          <span className="font-mono tabular text-xs font-medium">3/3</span>
        </ProgressRing>
      </div>
      <div className="flex max-w-sm flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-fg-muted">Fundamentos del dinero</span>
          <span className="font-mono tabular">
            {done}/{total}
          </span>
        </div>
        <Progress value={value} label="Lecciones completadas" />
      </div>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="icon-sm"
          aria-label="Quitar una lección"
          disabled={done === 0}
          onClick={() => setDone((d) => Math.max(0, d - 1))}
        >
          <Minus />
        </Button>
        <Button
          variant="secondary"
          size="icon-sm"
          aria-label="Añadir una lección"
          disabled={done === total}
          onClick={() => setDone((d) => Math.min(total, d + 1))}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
