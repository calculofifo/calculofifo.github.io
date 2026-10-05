import { cn } from "@/lib/utils";

/** Brand mark: three rising bars inside a rounded square — money that grows. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-6", className)}>
      <rect width="24" height="24" rx="6" className="fill-brand" />
      <rect x="5.5" y="13" width="3" height="5.5" rx="1" className="fill-brand-fg" opacity="0.55" />
      <rect x="10.5" y="9.5" width="3" height="9" rx="1" className="fill-brand-fg" opacity="0.8" />
      <rect x="15.5" y="5.5" width="3" height="13" rx="1" className="fill-brand-fg" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-[-0.02em] text-fg">Monedo</span>
    </span>
  );
}
