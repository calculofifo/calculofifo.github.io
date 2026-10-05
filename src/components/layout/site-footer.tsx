import Link from "next/link";
import { Logo } from "@/components/graphics/logo";
import { Container } from "./container";

const links = [
  { href: "/cursos", label: "Cursos" },
  { href: "/herramientas", label: "Herramientas" },
  { href: "/legal", label: "Aviso legal y privacidad" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <Container width="wide" className="flex flex-col gap-8 py-10 md:flex-row md:justify-between">
        <div className="flex max-w-md flex-col gap-3">
          <Logo />
          <p className="text-sm leading-6 text-fg-muted">
            Monedo es una plataforma educativa. Su contenido sirve para aprender y no constituye
            asesoramiento financiero: no recomendamos productos, entidades ni inversiones concretas.
          </p>
        </div>
        <nav aria-label="Pie de página">
          <ul className="flex flex-col gap-2 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-xs text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-focus"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <Container width="wide" className="pb-8 text-xs text-fg-subtle">
        © {new Date().getFullYear()} Monedo. Sin cookies de terceros ni analítica.
      </Container>
    </footer>
  );
}
