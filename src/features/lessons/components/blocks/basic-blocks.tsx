import { CheckCircle2 } from "lucide-react";
import type { Block } from "@/content/schema";
import { KeyFigure } from "@/components/ui/key-figure";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Prose, StepShell } from "./step-shell";

type BlockOf<T extends Block["type"]> = Extract<Block, { type: T }>;

export function ObjectiveBlock({
  block,
  minutes,
  steps,
}: {
  block: BlockOf<"objective">;
  minutes: number;
  steps: number;
}) {
  return (
    <StepShell label="Objetivo" title="Al terminar sabrás…">
      <ul className="flex measure flex-col gap-4">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3 text-lg leading-8">
            <CheckCircle2 aria-hidden className="mt-1.5 size-5 shrink-0 text-brand-text" />
            <span>{item.charAt(0).toUpperCase() + item.slice(1)}.</span>
          </li>
        ))}
      </ul>
      <p className="text-base text-fg-muted">
        {minutes} minutos · {steps} pasos · Tu progreso se guarda en cada paso.
      </p>
    </StepShell>
  );
}

export function TextBlock({ block }: { block: BlockOf<"text"> }) {
  return (
    <StepShell label="Idea" title={block.title}>
      <Prose paragraphs={block.paragraphs} />
    </StepShell>
  );
}

export function ExampleBlock({ block }: { block: BlockOf<"example"> }) {
  const initial = block.character.trim().charAt(0).toUpperCase();
  return (
    <StepShell label="Ejemplo" title={block.title}>
      <p className="flex items-center gap-3 text-base text-fg-muted">
        <span
          aria-hidden
          className="grid size-9 place-items-center rounded-full bg-brand-subtle font-medium text-brand-subtle-fg"
        >
          {initial}
        </span>
        {block.character}
      </p>
      <Prose paragraphs={block.paragraphs} />
      {block.figures ? (
        <dl className="measure divide-y divide-border border-y border-border">
          {block.figures.map((figure) => (
            <div
              key={figure.label}
              className={cn(
                "flex items-baseline justify-between gap-4 py-3 text-base",
                figure.emphasis && "font-medium",
              )}
            >
              <dt className={figure.emphasis ? "text-fg" : "text-fg-muted"}>{figure.label}</dt>
              <dd
                className={cn(
                  "font-mono tabular",
                  figure.emphasis ? "text-xl text-brand-text" : "text-fg",
                )}
              >
                {formatNumber(figure.value, figure.fractionDigits ?? 0)}
                {figure.unit ? (
                  <span className="ml-1 font-sans text-fg-muted">{figure.unit}</span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </StepShell>
  );
}

export function KeyFigureBlock({ block }: { block: BlockOf<"key-figure"> }) {
  return (
    <div className="flex flex-col gap-6">
      {/* The figure itself is the heading of this step for assistive tech. */}
      <h2 id="lesson-step-title" tabIndex={-1} className="sr-only outline-none">
        Dato clave: {formatNumber(block.value, block.fractionDigits)} {block.unit} {block.context}
      </h2>
      <KeyFigure
        value={block.value}
        fractionDigits={block.fractionDigits}
        unit={block.unit}
        context={block.context}
        source={block.source}
      />
    </div>
  );
}

export function KeyIdeasBlock({ block }: { block: BlockOf<"key-ideas"> }) {
  return (
    <StepShell label="Ideas clave" title="Lo que te llevas">
      <ol className="flex measure flex-col">
        {block.items.map((item, index) => (
          <li key={item} className="flex gap-5 border-t border-border py-5 last:border-b">
            <span className="font-mono tabular text-3xl leading-none font-medium tracking-tight text-brand-text">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-lg leading-8">{item}</span>
          </li>
        ))}
      </ol>
    </StepShell>
  );
}

export function ChallengeBlock({ block }: { block: BlockOf<"challenge"> }) {
  return (
    <StepShell label="Reto práctico" title={block.title}>
      <p className="measure text-lg leading-8 text-fg-muted">{block.description}</p>
      <ol className="flex measure flex-col gap-4">
        {block.steps.map((step, index) => (
          <li key={step} className="flex gap-4 text-lg leading-8">
            <span
              aria-hidden
              className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-border-strong font-mono text-sm text-fg-muted"
            >
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </StepShell>
  );
}
