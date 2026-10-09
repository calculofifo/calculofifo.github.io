import { ahorroEInversion } from "./courses/ahorro-e-inversion";
import { bancosYPagos } from "./courses/bancos-y-pagos";
import { fundamentosDelDinero } from "./courses/fundamentos-del-dinero";
import { elDineroEsTiempo } from "./courses/fundamentos-del-dinero/el-dinero-es-tiempo";
import { queNoTeEstafen } from "./courses/que-no-te-estafen";
import { tuPrimerSueldo } from "./courses/tu-primer-sueldo";
import { courseSchema, lessonSchema, type Course, type Lesson, type LessonEntry } from "./schema";

/**
 * Content registry. Everything is validated with Zod when this module loads, which
 * happens during `next build` (generateStaticParams), so invalid content fails the build.
 * To add a course: create its folder, export it here. To add a lesson: add its file and
 * register it under its course in `lessonContent`.
 */
const courses: readonly Course[] = [
  fundamentosDelDinero,
  tuPrimerSueldo,
  bancosYPagos,
  ahorroEInversion,
  queNoTeEstafen,
]
  .map((course) => courseSchema.parse(course))
  .sort((a, b) => a.order - b.order);

const lessonContent: Record<string, readonly Lesson[]> = {
  "fundamentos-del-dinero": [elDineroEsTiempo].map((lesson) => lessonSchema.parse(lesson)),
};

function assertRegistryConsistency(): void {
  const courseSlugs = new Set(courses.map((c) => c.slug));
  if (courseSlugs.size !== courses.length) throw new Error("Duplicate course slugs");
  for (const [courseSlug, lessons] of Object.entries(lessonContent)) {
    const course = courses.find((c) => c.slug === courseSlug);
    if (!course) throw new Error(`Lesson content for unknown course "${courseSlug}"`);
    for (const lesson of lessons) {
      const entry = course.lessons.find((l) => l.slug === lesson.slug);
      if (!entry) throw new Error(`"${courseSlug}/${lesson.slug}" is not in the course syllabus`);
      for (const field of ["title", "summary", "minutes"] as const) {
        if (entry[field] !== lesson[field]) {
          throw new Error(`"${courseSlug}/${lesson.slug}": ${field} differs from the syllabus`);
        }
      }
    }
  }
}
assertRegistryConsistency();

export function getCourses(): readonly Course[] {
  return courses;
}

export function getCourse(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getLesson(courseSlug: string, lessonSlug: string): Lesson | undefined {
  return lessonContent[courseSlug]?.find((lesson) => lesson.slug === lessonSlug);
}

export function hasContent(courseSlug: string, lessonSlug: string): boolean {
  return getLesson(courseSlug, lessonSlug) !== undefined;
}

/** All lessons with written content, for static generation. */
export function getLessonParams(): { curso: string; leccion: string }[] {
  return Object.entries(lessonContent).flatMap(([curso, lessons]) =>
    lessons.map((lesson) => ({ curso, leccion: lesson.slug })),
  );
}

/** Syllabus neighbours, regardless of whether they have content yet. */
export function getAdjacentLessons(
  courseSlug: string,
  lessonSlug: string,
): { previous: LessonEntry | undefined; next: LessonEntry | undefined } {
  const lessons = getCourse(courseSlug)?.lessons ?? [];
  const index = lessons.findIndex((l) => l.slug === lessonSlug);
  return {
    previous: index > 0 ? lessons[index - 1] : undefined,
    next: index >= 0 ? lessons[index + 1] : undefined,
  };
}

export type { Block, Course, Lesson, LessonEntry, QuizQuestion } from "./schema";
