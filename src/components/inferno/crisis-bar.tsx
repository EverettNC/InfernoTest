import { Phone, Shield } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useInferno } from "@/lib/inferno/store";

export function CrisisBar() {
  const contacts = useInferno((s) => s.profile.contacts);
  const primary = contacts[0];
  return (
    <div
      data-inferno-crisis-bar
      className="sticky top-0 z-50 border-b border-ember/40 bg-bg/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-ember">
          Need crisis support? You are not alone.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="tel:988"
            className="inline-flex h-11 items-center gap-1.5 rounded-sm bg-ember px-3 font-display text-xs font-semibold uppercase tracking-wider text-bg"
          >
            <Phone className="size-3.5" />
            988 · Veterans press 1
          </a>
          {primary?.tel ? (
            <a
              href={`tel:${primary.tel}`}
              className="inline-flex h-11 items-center gap-1.5 rounded-sm border border-border px-3 font-display text-xs font-semibold uppercase tracking-wider text-fg"
            >
              <Shield className="size-3.5" />
              {primary.name || "My person"}
            </a>
          ) : (
            <Link
              to="/profile"
              className="inline-flex h-11 items-center rounded-sm border border-border px-3 font-display text-xs font-semibold uppercase tracking-wider text-muted"
            >
              Add your person
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
