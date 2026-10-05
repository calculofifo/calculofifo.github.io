import { AA_TEXT, AA_UI, contrastRatio } from "@/lib/design/contrast";
import { colorTokens, textPairs, uiPairs, type ColorToken } from "@/lib/design/tokens";
import { cn } from "@/lib/utils";

const groups: { title: string; tokens: ColorToken[] }[] = [
  {
    title: "Superficies y bordes",
    tokens: [
      "bg",
      "surface",
      "surface-muted",
      "surface-raised",
      "border",
      "border-strong",
      "border-control",
    ],
  },
  { title: "Texto", tokens: ["fg", "fg-muted", "fg-subtle"] },
  {
    title: "Marca · esmeralda",
    tokens: ["brand", "brand-hover", "brand-text", "brand-subtle", "brand-subtle-fg"],
  },
  { title: "Logros y rachas · ámbar", tokens: ["amber", "amber-text", "amber-subtle"] },
  {
    title: "Semánticos",
    tokens: ["success", "success-subtle", "danger", "danger-subtle", "focus"],
  },
];

export function ColorSwatches() {
  return (
    <div className="flex flex-col gap-10">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="mb-3 text-sm font-medium">{group.title}</h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
            {group.tokens.map((token) => (
              <li key={token} className="flex flex-col gap-2">
                <div
                  className="h-14 rounded-md border border-border"
                  style={{ backgroundColor: `var(--${token})` }}
                />
                <div className="flex flex-col">
                  <span className="font-mono text-xs font-medium">{token}</span>
                  <span className="font-mono text-xs text-fg-subtle">
                    {colorTokens.light[token]} · {colorTokens.dark[token]}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function ContrastTable() {
  const rows = [
    ...textPairs.map((pair) => ({ pair, min: AA_TEXT, kind: "Texto" })),
    ...uiPairs.map((pair) => ({ pair, min: AA_UI, kind: "UI" })),
  ];
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full min-w-[520px] text-sm">
        <caption className="sr-only">Ratios de contraste WCAG por par de tokens</caption>
        <thead className="bg-surface-muted text-left text-xs text-fg-muted">
          <tr>
            <th scope="col" className="px-3 py-2 font-medium">
              Par
            </th>
            <th scope="col" className="px-3 py-2 font-medium">
              Tipo
            </th>
            <th scope="col" className="px-3 py-2 text-right font-medium">
              Claro
            </th>
            <th scope="col" className="px-3 py-2 text-right font-medium">
              Oscuro
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map(({ pair: [fg, bg], min, kind }) => (
            <tr key={`${fg}-${bg}`}>
              <td className="px-3 py-2 font-mono text-xs">
                {fg} / {bg}
              </td>
              <td className="px-3 py-2 text-fg-muted">{kind}</td>
              {(["light", "dark"] as const).map((theme) => {
                const ratio = contrastRatio(colorTokens[theme][fg], colorTokens[theme][bg]);
                return (
                  <td
                    key={theme}
                    className={cn(
                      "px-3 py-2 text-right font-mono tabular text-xs",
                      ratio >= min ? "text-fg" : "text-danger",
                    )}
                  >
                    {ratio.toFixed(2)}:1
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
