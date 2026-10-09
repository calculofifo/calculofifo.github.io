import { z } from "zod";

export const PROGRESS_SCHEMA_VERSION = 1;

/** ISO calendar day in the learner's local time zone: "2026-10-09". */
export const daySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const lessonProgressSchema = z.object({
  courseSlug: z.string().min(1),
  lessonSlug: z.string().min(1),
  /** Step the learner was on last; used to resume. */
  currentStepId: z.string().nullable(),
  completedStepIds: z.array(z.string()),
  /** questionId → optionId of the first checked answer (answers lock once checked). */
  answers: z.record(z.string(), z.string()),
  /** decision block id → chosen option id. */
  decisions: z.record(z.string(), z.string()),
  startedAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  completedAt: z.iso.datetime().nullable(),
});

export const progressSnapshotSchema = z.object({
  version: z.literal(PROGRESS_SCHEMA_VERSION),
  lessons: z.record(z.string(), lessonProgressSchema).default({}),
  /** Unique, sorted days with learning activity (streaks and weekly goal). */
  activityDays: z.array(daySchema).default([]),
});

export type LessonProgress = z.infer<typeof lessonProgressSchema>;
export type ProgressSnapshot = z.infer<typeof progressSnapshotSchema>;

export function emptySnapshot(): ProgressSnapshot {
  return { version: PROGRESS_SCHEMA_VERSION, lessons: {}, activityDays: [] };
}

/**
 * Persistence boundary for learner progress. The UI only talks to this interface:
 * v1 stores in the browser (LocalProgressRepository); v2 will add a Supabase
 * implementation without UI changes. All methods are async for that reason.
 */
export interface ProgressRepository {
  load(): Promise<ProgressSnapshot>;
  /** Insert or replace one lesson's progress. */
  saveLesson(progress: LessonProgress): Promise<void>;
  /** Mark a day as active. Idempotent. */
  recordActivity(day: string): Promise<void>;
  /** Delete all progress for this learner. */
  clear(): Promise<void>;
}

/** Raised when progress cannot be persisted (storage full, blocked, unavailable). */
export class ProgressStorageError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "ProgressStorageError";
  }
}
