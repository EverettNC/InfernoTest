import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
  tone = "primary",
}: {
  value: number;
  className?: string;
  tone?: "primary" | "ember" | "teal";
}) {
  const fill =
    tone === "ember" ? "bg-ember" : tone === "teal" ? "bg-teal" : "bg-primary";
  return (
    <div className={cn("h-1.5 overflow-hidden rounded-full bg-border", className)}>
      <div
        className={cn("h-full rounded-full transition-[width] duration-300", fill)}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
