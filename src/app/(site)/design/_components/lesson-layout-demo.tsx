"use client";

import { ArrowLeft, ArrowRight, Check, Clock, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { KeyFigure } from "@/components/ui/key-figure";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const syllabus = [
  { title: "El dinero es tiempo", done: true },
  { title: "Inflación", done: false, current: true },
  { title: "Necesidad o capricho", done: false },
  { title: "Págate primero", done: false },
  { title: "Tu primer presupuesto", done: false },
  { title: "Trampas", done: false },
];

const steps = [
  {
    kind: "Objetivo",
    body: (
      <p className="text-xl leading-8 font-medium tracking-tight">
        Al terminar sabrás por qué el dinero quieto pierde valor y cómo calcular cuánto.
      </p>
    ),
  },
  {
    kind: "Texto",
    body: (
      <p className="text-lg leading-8 text-fg-muted">
        La inflación es la subida general de los precios. Si los precios suben y tu dinero no, cada
        año puedes comprar un poco menos con la misma cantidad.
      </p>
    ),
  },
  {
    kind: "Dato clave",
    body: (
      <KeyFigure
        value={97.09}
        fractionDigits={2}
        unit="€"
        label="Poder de compra"
        context="es lo que valdrían hoy 100 € guardados un año, con una inflación del 3 %."
      />
    ),
  },
];

/** Prototype of the lesson reader shell: collapsible syllabus, step transitions, keyboard nav. */
export function LessonLayoutDemo() {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const current = steps[step]!;

  const go = (delta: number) => {
    const next = Math.min(steps.length - 1, Math.max(0, step + delta));
    if (next === step) return;
    setDirection(delta);
    setStep(next);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") go(1);
    if (event.key === "ArrowLeft") go(-1);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex min-h-[460px]">
        <aside
          id="demo-syllabus"
          aria-label="Temario"
          className={cn(
            "hidden shrink-0 border-r border-border bg-bg transition-[width] duration-(--duration-slow) ease-(--ease-out) md:block",
            open ? "w-64" : "w-0 border-r-0",
          )}
        >
          <div className={cn("w-64 p-4", !open && "invisible")}>
            <p className="mb-3 text-xs font-medium tracking-wide text-fg-subtle uppercase">
              Fundamentos del dinero
            </p>
            <ol className="flex flex-col gap-0.5">
              {syllabus.map((item, index) => (
                <li key={item.title}>
                  <span
                    aria-current={item.current ? "step" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-sm px-2 py-1.5 text-sm",
                      item.current ? "bg-surface-muted font-medium text-fg" : "text-fg-muted",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-6 shrink-0 place-items-center rounded-full border font-mono text-xs",
                        item.done
                          ? "border-brand bg-brand text-brand-fg"
                          : item.current
                            ? "border-brand text-brand-text"
                            : "border-border-strong text-fg-subtle",
                      )}
                    >
                      {item.done ? <Check className="size-3" aria-label="Completada" /> : index + 1}
                    </span>
                    {item.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Button
              variant="ghost"
              size="icon-sm"
              className="hidden md:inline-flex"
              aria-controls="demo-syllabus"
              aria-expanded={open}
              aria-label={open ? "Ocultar temario" : "Mostrar temario"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <PanelLeftClose /> : <PanelLeftOpen />}
            </Button>
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate font-medium">
                  Inflación: por qué el dinero quieto pierde valor
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-fg-subtle">
                  <Clock aria-hidden className="size-3.5" />6 min
                </span>
              </div>
              <Progress value={(step + 1) / steps.length} label="Progreso de la lección" />
            </div>
          </div>

          <div
            role="region"
            aria-roledescription="lección"
            aria-label={`Paso ${step + 1} de ${steps.length}: ${current.kind}`}
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="relative flex flex-1 items-center overflow-hidden px-6 py-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus sm:px-12"
          >
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                initial={{ opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -24 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="flex measure flex-col gap-4"
              >
                <p className="text-xs font-medium tracking-wide text-brand-text uppercase">
                  {current.kind}
                </p>
                {current.body}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
            <Button variant="ghost" onClick={() => go(-1)} disabled={step === 0}>
              <ArrowLeft />
              Anterior
            </Button>
            <span className="hidden items-center gap-1.5 text-xs text-fg-subtle sm:inline-flex">
              <Kbd>←</Kbd>
              <Kbd>→</Kbd>
              para navegar
            </span>
            <Button onClick={() => go(1)} disabled={step === steps.length - 1}>
              Continuar
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
