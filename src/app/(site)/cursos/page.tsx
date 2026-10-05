import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Cursos" };

export default function CoursesPage() {
  return (
    <ComingSoon
      eyebrow="Catálogo"
      title="Cursos"
      description="Rutas cortas con lecciones de 5 a 8 minutos, evaluación final y certificado."
    />
  );
}
