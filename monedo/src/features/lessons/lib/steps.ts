import type { Block, Lesson, QuizQuestion } from "@/content/schema";
import type { LessonProgress } from "@/lib/progress/types";

type NonQuizBlock = Exclude<Block, { type: "quiz" }>;

/** One screen of the reader. Quiz blocks expand into one step per question. */
export type Step =
  | { id: string; kind: "block"; block: NonQuizBlock }
  | { id: string; kind: "question"; question: QuizQuestion; number: number; total: number };

export function buildSteps(lesson: Lesson): Step[] {
  return lesson.blocks.flatMap((block): Step[] => {
    if (block.type !== "quiz") return [{ id: block.id, kind: "block", block }];
    return block.questions.map((question, index) => ({
      id: question.id,
      kind: "question",
      question,
      number: index + 1,
      total: block.questions.length,
    }));
  });
}

const blockLabels: Record<NonQuizBlock["type"], string> = {
  objective: "Objetivo",
  text: "Idea",
  example: "Ejemplo",
  "key-figure": "Dato clave",
  interactive: "Practica",
  decision: "Decide",
  "key-ideas": "Ideas clave",
  challenge: "Reto práctico",
};

export function stepLabel(step: Step): string {
  return step.kind === "question"
    ? `Pregunta ${step.number} de ${step.total}`
    : blockLabels[step.block.type];
}

/** Steps that need an action before moving on: answer the question or make the decision. */
export function isStepUnlocked(step: Step, progress: LessonProgress | undefined): boolean {
  if (step.kind === "question") return step.question.id in (progress?.answers ?? {});
  if (step.block.type === "decision") return step.block.id in (progress?.decisions ?? {});
  return true;
}

export function quizScore(
  steps: readonly Step[],
  progress: LessonProgress | undefined,
): { correct: number; total: number } {
  const questions = steps.filter((s) => s.kind === "question");
  const correct = questions.filter(
    (s) => progress?.answers[s.question.id] === s.question.correctOptionId,
  ).length;
  return { correct, total: questions.length };
}

/** Short, specific name for navigation (syllabus): the step's own title when it has one. */
export function stepNavTitle(step: Step): string {
  if (step.kind === "question") return `Pregunta ${step.number}`;
  const { block } = step;
  switch (block.type) {
    case "text":
    case "example":
    case "interactive":
    case "decision":
    case "challenge":
      return block.title;
    default:
      return blockLabels[block.type];
  }
}
