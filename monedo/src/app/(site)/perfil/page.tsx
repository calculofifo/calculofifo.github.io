import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Perfil" };

export default function ProfilePage() {
  return (
    <ComingSoon
      eyebrow="Tu perfil"
      title="Perfil"
      description="Tus estadísticas, cursos completados y certificados."
    />
  );
}
