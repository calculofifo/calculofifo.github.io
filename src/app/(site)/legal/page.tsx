import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Aviso legal y privacidad" };

export default function LegalPage() {
  return (
    <ComingSoon
      eyebrow="Legal"
      title="Aviso legal y privacidad"
      description="Monedo es educación, no asesoramiento financiero."
    />
  );
}
