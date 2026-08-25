import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  Flame,
  Home,
  LayoutGrid,
  Mic,
  Music2,
  Phone,
  Shield,
  Users,
  GraduationCap,
  UserRound,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const RAIL = [
  { to: "/", label: "Home", icon: Home },
  { to: "/ground", label: "Ground", icon: Shield },
  { to: "/voice", label: "Voice", icon: Mic },
  { to: "/emotion", label: "Emotion", icon: Activity },
  { to: "/community", label: "Community", icon: Users },
  { to: "/training", label: "Training", icon: GraduationCap },
  { to: "/music", label: "Music", icon: Music2 },
  { to: "/proving", label: "Proving", icon: Flame },
  { to: "/profile", label: "Profile", icon: UserRound },
  { to: "/resources", label: "Resources", icon: Phone },
] as const;

const MOBILE = [
  { to: "/", label: "Home", icon: Home },
  { to: "/ground", label: "Ground", icon: Shield },
  { to: "/voice", label: "Voice", icon: Mic },
  { to: "/proving", label: "Prove", icon: Flame },
] as const;

const MORE = RAIL.filter((i) => !["/", "/ground", "/voice", "/proving"].includes(i.to));

export function InfernoNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-bg/80"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 rounded-t-xl border-t border-border bg-surface p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-faint">
                More
              </p>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-md text-muted"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>
            <ul className="grid grid-cols-2 gap-2">
              {MORE.map((item) => {
                const Icon = item.icon;
                const on = pathname === item.to;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex h-14 items-center gap-3 rounded-md border px-3 font-display text-sm",
                        on
                          ? "border-primary bg-elevated text-primary"
                          : "border-border text-muted",
                      )}
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
        <ul className="grid grid-cols-5">
          {MOBILE.map((item) => {
            const on = pathname === item.to;
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex h-14 flex-col items-center justify-center gap-0.5 text-xs uppercase tracking-wider",
                    on ? "text-primary" : "text-muted",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={cn(
                "flex h-14 w-full flex-col items-center justify-center gap-0.5 text-xs uppercase tracking-wider",
                open || MORE.some((i) => i.to === pathname) ? "text-primary" : "text-muted",
              )}
            >
              <LayoutGrid className="size-4" />
              More
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export function SideRail() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="sticky top-[52px] hidden h-[calc(100dvh-52px)] w-56 shrink-0 overflow-y-auto border-r border-border p-4 md:block">
      <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-faint">
        Divisions
      </p>
      <ul className="mt-3 space-y-1">
        {RAIL.map((item) => {
          const on = pathname === item.to;
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  "flex h-11 items-center gap-3 rounded-md px-3 font-display text-sm tracking-wide",
                  on ? "bg-elevated text-primary" : "text-muted hover:text-fg",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
