"use client";

import { AnimatePresence, motion } from "motion/react";
import type { Block } from "@/content/schema";
import { Callout } from "@/components/ui/callout";
import { ChoiceGroup, ChoiceItem } from "@/components/ui/choice-group";
import { StepShell } from "./step-shell";

/** A choice with consequences. Any option is valid; the learner can change their mind. */
export function DecisionStep({
  block,
  chosen,
  onChoose,
}: {
  block: Extract<Block, { type: "decision" }>;
  chosen: string | undefined;
  onChoose: (optionId: string) => void;
}) {
  const option = block.options.find((o) => o.id === chosen);
  return (
    <StepShell label="Decide" title={block.title}>
      <p className="measure text-lg leading-8">{block.situation}</p>
      <ChoiceGroup
        aria-labelledby="lesson-step-title"
        value={chosen ?? ""}
        onValueChange={onChoose}
        className="measure"
      >
        {block.options.map((o, index) => (
          <ChoiceItem
            key={o.id}
            value={o.id}
            letter={String.fromCharCode(65 + index)}
            className="text-lg"
          >
            {o.label}
          </ChoiceItem>
        ))}
      </ChoiceGroup>
      <div aria-live="polite" className="flex measure flex-col gap-4">
        <AnimatePresence mode="wait" initial={false}>
          {option ? (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4"
            >
              <Callout tone="info" title="Qué pasa">
                {option.consequence}
              </Callout>
              <p className="text-base leading-7 text-fg-muted">{block.takeaway}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </StepShell>
  );
}
