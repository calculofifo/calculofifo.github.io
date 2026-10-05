@AGENTS.md

# Monedo — convenciones del proyecto

Plataforma web de cursos cortos de educación financiera para jóvenes de 14 a 18 años en España.
Esta carpeta (`monedo/`) es una app autocontenida dentro del repo `calculofifo.github.io`, que aloja
otro producto (calculadora FIFO). **No toques nada fuera de `monedo/`.** En Vercel: Root Directory = `monedo`.

## Idioma

- Código, nombres, comentarios y commits: **inglés**.
- Interfaz y contenido: **español de España**, euros, ejemplos reales del contexto español.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 5 estricto · Tailwind CSS 4 · componentes
estilo shadcn/ui sobre `radix-ui` · Motion (`motion/react`) · Lucide · Recharts · Zustand · Zod ·
Vitest + Testing Library · Playwright · ESLint 9 (flat) + Prettier · fuentes Geist autoalojadas (`geist`).

Next 16 cambia APIs respecto a versiones anteriores: consulta `node_modules/next/dist/docs/` antes de
usar una API nueva (p. ej. `params` es asíncrono, `LayoutProps`/`PageProps` son globales generados).

## Comandos

```bash
npm run dev          # servidor de desarrollo
npm run build        # build de producción (todas las páginas de contenido son SSG)
npm run lint         # ESLint
npm run typecheck    # next typegen + tsc --noEmit
npm run format       # Prettier (con orden de clases de Tailwind)
npm run test         # Vitest (unitarios)
npm run test:e2e     # Playwright (construye y arranca en :3100)
npm run check        # lint + typecheck + format:check + test  ← ejecutar al cerrar cada fase
```

En el contenedor cloud: `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium npm run test:e2e`.

## Estructura

```
src/
  app/                    rutas; solo composición, sin lógica de negocio
    (site)/               páginas con cabecera, pie y navegación inferior
    (site)/design/        página interna del sistema de diseño (noindex)
    globals.css           tokens de diseño (fuente de verdad del CSS)
  components/ui/          primitivas (button, card, badge, input, slider, tabs, progress-ring…)
  components/layout/      cabecera, navegación inferior, pie, contenedor, selector de tema
  components/graphics/    logotipo y SVG geométricos de marca
  features/{courses,lessons,progress,tools,certificates}/   código por funcionalidad
  content/                cursos y lecciones como datos TS validados con Zod
  lib/finance/            funciones financieras puras + tests
  lib/progress/           ProgressRepository + LocalProgressRepository
  lib/design/             espejo TS de los tokens + utilidades de contraste
  lib/format.ts           formateo es-ES (€, %, fechas, minutos)
e2e/                      tests de Playwright
```

Reglas de arquitectura:

- **Progreso** solo a través de la interfaz `ProgressRepository` (asíncrona). Nunca `localStorage`
  directamente desde componentes o stores. En v2 llegará `SupabaseProgressRepository`.
- **Contenido** = datos. Añadir un curso es añadir archivos en `src/content/`; si no valida con Zod,
  el build falla.
- **Lógica financiera** solo en `src/lib/finance/`, funciones puras con tests de casos límite.
- **Privacidad**: sin analítica, sin cookies de terceros, sin recursos externos (fuentes incluidas).
  El nombre del certificado solo se guarda en local.
- Con `exactOptionalPropertyTypes`, las props opcionales que puedan recibir `undefined` se tipan
  como `prop?: T | undefined`.

## Sistema de diseño

Referencia viva: `/design`. Listón: Linear, Vercel, Stripe, Brilliant.

- **Solo tokens semánticos.** La paleta por defecto de Tailwind está desactivada (`--color-*: initial`).
  Usa `bg-surface`, `text-fg-muted`, `border-border`, `bg-brand`, `text-brand-text`, etc.
- Si cambias un color, cámbialo en `globals.css` (`:root`, `[data-theme="dark"]` y el bloque
  `prefers-color-scheme`) **y** en `src/lib/design/tokens.ts`. El test de tokens verifica que
  coinciden y que todos los pares cumplen WCAG AA (texto ≥ 4,5:1, UI ≥ 3:1).
- **Color**: neutros zinc fríos; un solo color de marca (esmeralda profundo); **ámbar solo para
  logros y rachas**; `success`/`danger` para acierto y error.
- **Tema**: sigue al sistema; el selector guarda `light`/`dark` en `localStorage` (`monedo-theme`)
  y un script inline lo aplica antes de pintar. Variante `dark:` disponible pero preferir tokens.
- **Tipografía**: Geist Sans para todo; **números y euros con `<Money>`, `<Num>`, `<Percent>`
  o `font-mono tabular`**. Escala: xs 12 · sm 14 · base 16 · lg 18 · xl 20 · 2xl 24 · 3xl 30 ·
  4xl 38 · 5xl 48 · 6xl 60. Texto de lección con la utilidad `measure` (68ch) y `leading-7/8`.
- **Forma**: bordes 1 px; radios `xs 4 · sm 6 · md 10 · lg 14 · xl 20`; sombra solo en capas
  flotantes (`shadow-overlay`). Jerarquía con espacio y tipografía, no con cajas.
- **Estados** obligatorios en todo lo interactivo: hover, `focus-visible` (anillo `outline-focus`),
  disabled y loading.
- **Movimiento**: `--duration-fast/base/slow` (120/200/320 ms) y `--ease-out`. Motion va envuelto en
  `MotionConfig reducedMotion="user"` y hay un fallback CSS para `prefers-reduced-motion`.
- **Mobile-first**: navegación inferior fija en móvil, cabecera en `md+`. Sin scroll horizontal a 390 px.
- **Prohibido**: degradados morados o azules, emojis, mascotas, ilustraciones de stock, todo
  centrado, sombras en todas las tarjetas, el aspecto por defecto de shadcn.

Componentes: el registro de shadcn no es accesible desde el contenedor cloud, así que los componentes
se escriben a mano con el mismo patrón (código propio + `radix-ui` + `cva` + `cn`). `components.json`
está listo por si la CLI se puede usar en local.

## Reglas de contenido

- Frases cortas, segunda persona, situaciones de un adolescente en España, cifras en euros.
- Tono "modo formación": serio y claro, nunca infantil. Sin emojis.
- **Educación, no asesoramiento**: nunca recomendar productos, entidades, activos concretos ni
  decisiones personales de inversión. Ninguna marca de banco, bróker ni producto financiero.
- Toda mención a rentabilidad aclara que **no está garantizada y que las inversiones pueden bajar**.
- **No inventar cifras legales o fiscales.** Todo dato sobre IRPF, Seguridad Social, salario mínimo,
  umbrales para declarar, etc. lleva `// TODO(verify): fuente oficial` con la fuente a consultar
  (AEAT, Seguridad Social, BOE) y se añade a la lista de abajo.

## TODO(verify) — datos pendientes de verificar con fuente oficial

_Sin entradas todavía. Se completará en la fase 3 (contenido del curso 2)._

| Archivo | Dato | Fuente a consultar |
| ------- | ---- | ------------------ |

## Fases

1. ✅ Base: proyecto, tokens, componentes, `/design`, layout, navegación y modo oscuro.
2. Motor de cursos: esquema Zod, `ProgressRepository`, lector con todos los bloques, lección 1.1.
3. Contenido: resto de cursos 1 y 2, evaluaciones y certificados.
4. Panel, catálogo, fichas de curso, perfil y herramientas.
5. Landing, legal, SEO, tests e2e, Lighthouse y README de despliegue.

Al cerrar cada fase: `npm run check` + `npm run build` + e2e, commit y resumen.

## Decisiones registradas

- App en `monedo/` para no interferir con la calculadora FIFO ni sus workflows de GitHub Pages.
- TypeScript 5 y ESLint 9: son las versiones que fija `create-next-app` para Next 16 (TS 7 y
  ESLint 10 aún no tienen soporte oficial del plugin de Next).
- `@types/node` 22 para casar con Node 22 (`engines`) y con las peer deps de Vitest.
- Separador de miles siempre activo en euros (`1.234 €`), aunque es-ES lo omite por defecto en
  cifras de 4 dígitos: las cifras se leen y alinean igual en toda la interfaz.
- Tema sin dependencias (`next-themes` no hace falta): script inline + `useSyncExternalStore`.
