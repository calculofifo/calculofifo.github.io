import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Herramientas" };

export default function ToolsPage() {
  return (
    <ComingSoon
      eyebrow="Calculadoras"
      title="Herramientas"
      description="Interés compuesto, horas de trabajo, presupuesto 50/30/20 y metas de ahorro."
    />
  );
}
