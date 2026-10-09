import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

export const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap select-none",
    "transition-[background-color,border-color,color,transform] duration-(--duration-fast) ease-(--ease-out)",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
    "active:translate-y-px disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        primary: "bg-brand text-brand-fg hover:bg-brand-hover",
        secondary:
          "border border-border-strong bg-surface text-fg hover:border-border-control hover:bg-surface-muted",
        ghost: "text-fg-muted hover:bg-surface-muted hover:text-fg",
        subtle: "bg-brand-subtle text-brand-subtle-fg hover:bg-brand-subtle/70",
        danger: "bg-danger text-danger-fg hover:bg-danger/90",
        link: "px-0 text-brand-text underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-11 rounded-sm px-3 text-sm md:h-8",
        md: "h-11 rounded-md px-4 text-base md:h-10 md:text-sm",
        lg: "h-12 rounded-md px-5 text-base",
        icon: "size-11 rounded-md md:size-10",
        "icon-sm": "size-11 rounded-sm md:size-8",
      },
    },
    // Text links stay 44px tall on touch screens, natural height from md up.
    compoundVariants: [{ variant: "link", className: "h-11 px-0 md:h-auto" }],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={asChild ? undefined : disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading ? (
            <span className="absolute inset-0 grid place-items-center">
              <Spinner />
            </span>
          ) : null}
          <span className={cn("inline-flex items-center gap-2", loading && "invisible")}>
            {children}
          </span>
        </>
      )}
    </Comp>
  );
}
