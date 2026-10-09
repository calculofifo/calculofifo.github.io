import { describe, expect, it } from "vitest";
import { getLesson } from "@/content";
import {
  answerQuestion,
  chooseDecision,
  createLessonProgress,
} from "@/lib/progress/lesson-progress";
import { buildSteps, isStepUnlocked, quizScore, stepLabel } from "./steps";

const lesson = getLesson("fundamentos-del-dinero", "el-dinero-es-tiempo")!;
const steps = buildSteps(lesson);
const NOW = new Date("2026-10-09T10:00:00Z");
const fresh = () => createLessonProgress("fundamentos-del-dinero", "el-dinero-es-tiempo", NOW);

describe("buildSteps", () => {
  it("expands the quiz into one step per question, in order", () => {
    const quizBlock = lesson.blocks.find((b) => b.type === "quiz");
    const questions = steps.filter((s) => s.kind === "question");
    expect(questions).toHaveLength(quizBlock?.type === "quiz" ? quizBlock.questions.length : -1);
    expect(steps).toHaveLength(lesson.blocks.length - 1 + questions.length);
    expect(steps[0]?.id).toBe("objetivo");
    expect(steps.at(-1)?.id).toBe("reto");
  });

  it("has unique step ids", () => {
    expect(new Set(steps.map((s) => s.id)).size).toBe(steps.length);
  });

  it("labels steps for the reader", () => {
    expect(stepLabel(steps[0]!)).toBe("Objetivo");
    expect(stepLabel(steps.find((s) => s.kind === "question")!)).toBe("Pregunta 1 de 4");
  });
});

describe("isStepUnlocked", () => {
  const question = steps.find((s) => s.kind === "question")!;
  const decision = steps.find((s) => s.kind === "block" && s.block.type === "decision")!;

  it("locks questions until answered and decisions until chosen", () => {
    expect(isStepUnlocked(question, fresh())).toBe(false);
    expect(isStepUnlocked(decision, undefined)).toBe(false);
    expect(isStepUnlocked(steps[0]!, undefined)).toBe(true);
  });

  it("unlocks after acting, whatever the answer", () => {
    expect(isStepUnlocked(question, answerQuestion(fresh(), question.id, "a", NOW))).toBe(true);
    expect(isStepUnlocked(decision, chooseDecision(fresh(), decision.id, "no-comprar", NOW))).toBe(
      true,
    );
  });
});

describe("quizScore", () => {
  it("counts correct answers only", () => {
    let progress = fresh();
    progress = answerQuestion(progress, "q-calculo", "b", NOW); // correct
    progress = answerQuestion(progress, "q-neto", "a", NOW); // wrong
    expect(quizScore(steps, progress)).toEqual({ correct: 1, total: 4 });
    expect(quizScore(steps, undefined)).toEqual({ correct: 0, total: 4 });
  });
});

describe("stepNavTitle", () => {
  it("uses the step's own title so the syllabus is scannable", async () => {
    const { stepNavTitle } = await import("./steps");
    expect(steps.map(stepNavTitle).slice(0, 4)).toEqual([
      "Objetivo",
      "El precio real no está en la etiqueta",
      "Primero, tu precio por hora",
      "Las zapatillas de Lucía",
    ]);
    expect(stepNavTitle(steps.find((s) => s.kind === "question")!)).toBe("Pregunta 1");
  });
});
