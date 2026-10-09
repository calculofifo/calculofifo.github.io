import { Check, Clock, Lock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { getCourse, getCourses, hasContent } from "@/content";
import { CourseProgressActions } from "@/features/courses/components/course-progress-actions";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCourses().map((course) => ({ curso: course.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/cursos/[curso]">): Promise<Metadata> {
  const course = getCourse((await params).curso);
  return course ? { title: course.title, description: course.tagline } : {};
}

/** Basic course page (phase 2). Polished in phase 4. */
export default async function CoursePage({ params }: PageProps<"/cursos/[curso]">) {
  const course = getCourse((await params).curso);
  if (!course) notFound();
  const minutes = course.lessons.reduce((sum, l) => sum + l.minutes, 0);
  const lessons = course.lessons.map((l) => ({ ...l, available: hasContent(course.slug, l.slug) }));

  return (
    <Container>
      <PageHeader
        eyebrow={`Curso ${course.order} · ${course.level}`}
        title={course.title}
        description={course.description}
      />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex flex-col gap-10">
          {course.status === "available" ? (
            <CourseProgressActions courseSlug={course.slug} lessons={lessons} />
          ) : (
            <Badge variant="outline" className="w-fit">
              <Lock aria-hidden /> Próximamente
            </Badge>
          )}
          <section aria-labelledby="temario" className="flex flex-col gap-4">
            <h2 id="temario" className="text-xl font-semibold tracking-tight">
              Temario
            </h2>
            <ol className="flex flex-col border-t border-border">
              {lessons.map((lesson, index) => {
                const body = (
                  <>
                    <span className="font-mono tabular text-sm text-fg-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-base font-medium">{lesson.title}</span>
                      <span className="text-base text-fg-muted">{lesson.summary}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1 text-sm text-fg-subtle">
                      {lesson.available ? (
                        <>
                          <Clock aria-hidden className="size-3.5" />
                          {lesson.minutes} min
                        </>
                      ) : (
                        <>
                          <Lock aria-hidden className="size-3.5" />
                          Pronto
                        </>
                      )}
                    </span>
                  </>
                );
                const row = "flex items-start gap-4 border-b border-border py-4";
                return (
                  <li key={lesson.slug}>
                    {lesson.available ? (
                      <Link
                        href={`/cursos/${course.slug}/${lesson.slug}`}
                        className={cn(
                          row,
                          "-mx-2 rounded-sm px-2 transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-focus",
                        )}
                      >
                        {body}
                      </Link>
                    ) : (
                      <div className={cn(row, "text-fg-muted")}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
        <aside className="flex flex-col gap-6">
          <dl className="grid grid-cols-2 gap-6 border-y border-border py-5">
            <div>
              <dt className="text-sm text-fg-muted">Lecciones</dt>
              <dd className="font-mono tabular text-2xl font-medium">{course.lessons.length}</dd>
            </div>
            <div>
              <dt className="text-sm text-fg-muted">Duración</dt>
              <dd className="font-mono tabular text-2xl font-medium">
                {minutes}
                <span className="ml-1 font-sans text-base text-fg-muted">min</span>
              </dd>
            </div>
          </dl>
          <section aria-labelledby="aprenderas" className="flex flex-col gap-3">
            <h2 id="aprenderas" className="text-base font-semibold">
              Qué vas a aprender
            </h2>
            <ul className="flex flex-col gap-3">
              {course.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-2.5 text-base leading-7 text-fg-muted">
                  <Check aria-hidden className="mt-1.5 size-4 shrink-0 text-brand-text" />
                  {outcome}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </Container>
  );
}
