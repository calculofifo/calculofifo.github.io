import type { LessonProgress, ProgressSnapshot } from "./types";

export function lessonKey(courseSlug: string, lessonSlug: string): string {
  return `${courseSlug}/${lessonSlug}`;
}

/** Local calendar day (not UTC) so a lesson at 23:30 in Madrid counts for that day. */
export function toDay(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function createLessonProgress(
  courseSlug: string,
  lessonSlug: string,
  now: Date,
): LessonProgress {
  const at = now.toISOString();
  return {
    courseSlug,
    lessonSlug,
    currentStepId: null,
    completedStepIds: [],
    answers: {},
    decisions: {},
    startedAt: at,
    updatedAt: at,
    completedAt: null,
  };
}

export function visitStep(progress: LessonProgress, stepId: string, now: Date): LessonProgress {
  if (progress.currentStepId === stepId) return progress;
  return { ...progress, currentStepId: stepId, updatedAt: now.toISOString() };
}

export function completeStep(progress: LessonProgress, stepId: string, now: Date): LessonProgress {
  if (progress.completedStepIds.includes(stepId)) return progress;
  return {
    ...progress,
    completedStepIds: [...progress.completedStepIds, stepId],
    updatedAt: now.toISOString(),
  };
}

/** Records the first checked answer only: answers are locked once checked. */
export function answerQuestion(
  progress: LessonProgress,
  questionId: string,
  optionId: string,
  now: Date,
): LessonProgress {
  if (questionId in progress.answers) return progress;
  return {
    ...progress,
    answers: { ...progress.answers, [questionId]: optionId },
    updatedAt: now.toISOString(),
  };
}

export function chooseDecision(
  progress: LessonProgress,
  blockId: string,
  optionId: string,
  now: Date,
): LessonProgress {
  if (progress.decisions[blockId] === optionId) return progress;
  return {
    ...progress,
    decisions: { ...progress.decisions, [blockId]: optionId },
    updatedAt: now.toISOString(),
  };
}

/** Keeps the first completion date; finishing again is a review, not a new completion. */
export function completeLesson(progress: LessonProgress, now: Date): LessonProgress {
  if (progress.completedAt) return progress;
  const at = now.toISOString();
  return { ...progress, completedAt: at, updatedAt: at };
}

/** Index to resume at: the last visited step, or the start. */
export function resumeIndex(
  stepIds: readonly string[],
  progress: LessonProgress | undefined,
): number {
  if (!progress?.currentStepId) return 0;
  const index = stepIds.indexOf(progress.currentStepId);
  return index === -1 ? 0 : index;
}

export function addActivityDay(days: readonly string[], day: string): string[] {
  if (days.includes(day)) return [...days];
  return [...days, day].sort();
}

export function getLesson(
  snapshot: ProgressSnapshot,
  courseSlug: string,
  lessonSlug: string,
): LessonProgress | undefined {
  return snapshot.lessons[lessonKey(courseSlug, lessonSlug)];
}
