import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Aprender" };

export default function LearnPage() {
  return (
    <ComingSoon
      eyebrow="Tu panel"
      title="Continúa donde lo dejaste"
      description="Tu progreso, tu racha y la siguiente lección recomendada."
    />
  );
}
