import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-elevated/80 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.35)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn("font-display text-lg font-semibold tracking-wide text-fg", className)}
      {...props}
    />
  );
}

export function CardHint({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("mt-1 text-sm text-muted", className)} {...props} />;
}
