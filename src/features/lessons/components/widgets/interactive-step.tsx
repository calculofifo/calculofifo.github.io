import type { Block } from "@/content/schema";
import { StepShell } from "../blocks/step-shell";
import { WorkHoursWidget } from "./work-hours-widget";

/** Widget registry: content references widgets by id, each with its own validated props. */
export function InteractiveStep({ block }: { block: Extract<Block, { type: "interactive" }> }) {
  const { config } = block;
  return (
    <StepShell label="Practica" title={block.title}>
      <p className="measure text-lg leading-8 text-fg-muted">{block.instructions}</p>
      {config.widget === "work-hours" ? (
        <WorkHoursWidget
          defaultPrice={config.defaultPrice}
          defaultHourlyWage={config.defaultHourlyWage}
        />
      ) : null}
    </StepShell>
  );
}
