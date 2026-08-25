import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "default",
  ...props
}: ComponentProps<"span"> & {
  tone?: "default" | "ember" | "teal" | "warn" | "muted";
}) {
  const tones = {
    default: "border-primary/40 text-primary",
    ember: "border-ember/50 text-ember",
    teal: "border-teal/50 text-teal",
    warn: "border-warn/50 text-warn",
    muted: "border-border text-muted",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
