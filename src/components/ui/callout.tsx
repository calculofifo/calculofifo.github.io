import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Lightbulb,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  info: { icon: Info, className: "border-border bg-surface-muted", iconClass: "text-fg-muted" },
  tip: {
    icon: Lightbulb,
    className: "border-transparent bg-brand-subtle",
    iconClass: "text-brand-subtle-fg",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-transparent bg-amber-subtle",
    iconClass: "text-amber-text",
  },
  success: {
    icon: CheckCircle2,
    className: "border-transparent bg-success-subtle",
    iconClass: "text-success",
  },
  danger: {
    icon: XCircle,
    className: "border-transparent bg-danger-subtle",
    iconClass: "text-danger",
  },
} satisfies Record<string, { icon: LucideIcon; className: string; iconClass: string }>;

export function Callout({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: keyof typeof tones;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const { icon: Icon, className: toneClass, iconClass } = tones[tone];
  return (
    <div
      role={tone === "danger" || tone === "warning" ? "alert" : "note"}
      className={cn("flex gap-3 rounded-md border p-4 text-sm leading-6", toneClass, className)}
    >
      <Icon aria-hidden className={cn("mt-0.5 size-4 shrink-0", iconClass)} />
      <div className="min-w-0">
        {title ? <p className="font-medium text-fg">{title}</p> : null}
        <div className="text-fg-muted">{children}</div>
      </div>
    </div>
  );
}
