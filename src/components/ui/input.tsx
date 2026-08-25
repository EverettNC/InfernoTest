import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-faint",
        "focus-visible:border-primary",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg placeholder:text-faint",
        "focus-visible:border-primary",
        className,
      )}
      {...props}
    />
  );
}
