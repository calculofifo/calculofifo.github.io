import { Download } from "lucide-react";
import { Logo, LogoMark } from "@/components/graphics/logo";
import { cn } from "@/lib/utils";

const files = [
  ["/brand/monedo-logo-light-bg.svg", "Logotipo · fondo claro"],
  ["/brand/monedo-logo-dark-bg.svg", "Logotipo · fondo oscuro"],
  ["/brand/monedo-mark.svg", "Símbolo"],
  ["/icon.svg", "Favicon"],
] as const;

function Panel({ theme }: { theme: "light" | "dark" }) {
  return (
    <div
      data-theme={theme}
      className="flex flex-col gap-8 rounded-lg border border-border bg-bg p-6 text-fg sm:p-8"
    >
      <p className="text-xs font-medium tracking-[0.08em] text-fg-subtle uppercase">
        {theme === "light" ? "Modo claro" : "Modo oscuro"}
      </p>
      <Logo className="h-10 sm:h-12" />
      <div className="flex items-end gap-5">
        {[
          [64, "size-16"],
          [32, "size-8"],
          [24, "size-6"],
          [16, "size-4"],
        ].map(([px, cls]) => (
          <div key={px} className="flex flex-col items-center gap-2">
            <LogoMark className={cls as string} small={px === 16} />
            <span className="font-mono text-xs text-fg-subtle">{px}</span>
          </div>
        ))}
      </div>
      {/* Favicon at its real size inside a browser-tab mock. */}
      <div className="flex max-w-64 items-center gap-2 rounded-t-md border border-b-0 border-border bg-surface px-3 py-2">
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG preview at 16px */}
        <img src="/icon.svg" alt="" width={16} height={16} />
        <span className="truncate text-sm text-fg-muted">Monedo · Aprende a manejar tu dinero</span>
      </div>
    </div>
  );
}

export function BrandSection() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel theme="light" />
        <Panel theme="dark" />
      </div>
      <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [
            "Símbolo",
            "Una «M» trazada como un gráfico: el hombro derecho sube más que el izquierdo. Inicial y crecimiento en una sola línea.",
          ],
          [
            "Nombre",
            "Geist SemiBold convertida a trazados, con tracking −2,5 %. No depende de que la fuente esté cargada.",
          ],
          [
            "Tamaños mínimos",
            "Símbolo a 16 px con trazo reforzado (favicon). Logotipo completo a partir de 20 px de alto.",
          ],
          [
            "Color",
            "Baldosa en esmeralda de marca y trazo blanco. El nombre usa el color de texto del tema: casi negro en claro, casi blanco en oscuro.",
          ],
        ].map(([title, body]) => (
          <div key={title} className="flex flex-col gap-1.5">
            <dt className="font-medium">{title}</dt>
            <dd className="text-base leading-7 text-fg-muted">{body}</dd>
          </div>
        ))}
      </dl>
      <ul className="flex flex-wrap gap-x-6">
        {files.map(([href, label]) => (
          <li key={href}>
            <a
              href={href}
              download
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-xs text-base text-brand-text underline-offset-4 hover:underline md:min-h-0 md:text-sm",
                "focus-visible:outline-2 focus-visible:outline-focus",
              )}
            >
              <Download aria-hidden className="size-4" />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
