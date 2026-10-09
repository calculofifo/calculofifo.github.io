import { describe, expect, it } from "vitest";
import {
  addActivityDay,
  answerQuestion,
  chooseDecision,
  completeLesson,
  completeStep,
  createLessonProgress,
  lessonKey,
  resumeIndex,
  toDay,
  visitStep,
} from "./lesson-progress";

const T0 = new Date("2026-10-09T10:00:00.000Z");
const T1 = new Date("2026-10-09T10:05:00.000Z");
const base = () => createLessonProgress("curso", "leccion", T0);

describe("lesson progress", () => {
  it("builds a stable key", () => {
    expect(lessonKey("curso", "leccion")).toBe("curso/leccion");
  });

  it("starts with nothing done", () => {
    expect(base()).toMatchObject({
      currentStepId: null,
      completedStepIds: [],
      completedAt: null,
      startedAt: T0.toISOString(),
    });
  });

  it("visits and completes steps immutably", () => {
    const start = base();
    const visited = visitStep(start, "texto-1", T1);
    const done = completeStep(visited, "texto-1", T1);
    expect(start.currentStepId).toBeNull();
    expect(done).toMatchObject({ currentStepId: "texto-1", completedStepIds: ["texto-1"] });
    expect(done.updatedAt).toBe(T1.toISOString());
  });

  it("returns the same object when nothing changes", () => {
    const p = completeStep(visitStep(base(), "a", T1), "a", T1);
    expect(visitStep(p, "a", T1)).toBe(p);
    expect(completeStep(p, "a", T1)).toBe(p);
  });

  it("locks the first answer to a question", () => {
    const first = answerQuestion(base(), "q1", "b", T1);
    expect(answerQuestion(first, "q1", "c", T1).answers).toEqual({ q1: "b" });
  });

  it("lets a decision change", () => {
    const p = chooseDecision(chooseDecision(base(), "d1", "a", T1), "d1", "b", T1);
    expect(p.decisions).toEqual({ d1: "b" });
  });

  it("keeps the first completion date", () => {
    const done = completeLesson(base(), T0);
    expect(completeLesson(done, T1).completedAt).toBe(T0.toISOString());
  });

  it("resumes at the last visited step", () => {
    const steps = ["a", "b", "c"];
    expect(resumeIndex(steps, undefined)).toBe(0);
    expect(resumeIndex(steps, visitStep(base(), "c", T1))).toBe(2);
  });

  it("restarts when the saved step no longer exists (content changed)", () => {
    expect(resumeIndex(["a", "b"], visitStep(base(), "removed", T1))).toBe(0);
  });

  it("adds activity days uniquely and sorted", () => {
    expect(addActivityDay(["2026-10-09"], "2026-10-01")).toEqual(["2026-10-01", "2026-10-09"]);
    expect(addActivityDay(["2026-10-09"], "2026-10-09")).toEqual(["2026-10-09"]);
  });

  it("uses the local calendar day", () => {
    expect(toDay(new Date(2026, 0, 5, 23, 30))).toBe("2026-01-05");
  });
});
