"use client";

import { AnimatePresence, motion } from "motion/react";
import type { QuizQuestion } from "@/content/schema";
import { Callout } from "@/components/ui/callout";
import { ChoiceGroup, ChoiceItem, type ChoiceStatus } from "@/components/ui/choice-group";
import { StepShell } from "./step-shell";

/**
 * One quiz question. Selection is local until "Comprobar" (in the action bar) locks the
 * answer; then the correct option and the explanation appear.
 */
export function QuestionStep({
  question,
  label,
  selected,
  answer,
  onSelect,
}: {
  question: QuizQuestion;
  label: string;
  selected: string | undefined;
  /** Locked answer, once checked. */
  answer: string | undefined;
  onSelect: (optionId: string) => void;
}) {
  const checked = answer !== undefined;
  const correct = answer === question.correctOptionId;
  const correctText = question.options.find((o) => o.id === question.correctOptionId)?.text;

  const statusFor = (optionId: string): ChoiceStatus | undefined => {
    if (!checked) return undefined;
    if (optionId === question.correctOptionId) return "correct";
    if (optionId === answer) return "incorrect";
    return undefined;
  };

  return (
    <StepShell label={label} title={question.prompt}>
      <ChoiceGroup
        aria-labelledby="lesson-step-title"
        value={answer ?? selected ?? ""}
        onValueChange={onSelect}
        disabled={checked}
        className="measure"
      >
        {question.options.map((option, index) => (
          <ChoiceItem
            key={option.id}
            value={option.id}
            letter={String.fromCharCode(65 + index)}
            status={statusFor(option.id)}
            className="text-lg"
          >
            {option.text}
          </ChoiceItem>
        ))}
      </ChoiceGroup>
      <div aria-live="polite" className="measure">
        <AnimatePresence initial={false}>
          {checked ? (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <Callout
                tone={correct ? "success" : "danger"}
                title={correct ? "Correcto" : `No es correcto. La respuesta es «${correctText}».`}
              >
                {question.explanation}
              </Callout>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </StepShell>
  );
}
