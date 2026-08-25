import { createFileRoute } from "@tanstack/react-router";
import { InfernoShell } from "@/components/inferno/shell";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { CRISIS_RESOURCES } from "@/lib/inferno/detector";
import { useInferno } from "@/lib/inferno/store";
import { useEffect } from "react";

export const Route = createFileRoute("/resources")({ component: ResourcesPage });

const MORE = [
  {
    name: "VA location finder",
    href: "https://www.va.gov/find-locations/",
    note: "Clinics, hospitals, Vet Centers.",
  },
  {
    name: "VA National Center for PTSD",
    href: "https://www.ptsd.va.gov/",
    note: "Education for veterans, families, clinicians.",
  },
  {
    name: "Give an Hour",
    href: "https://giveanhour.org/",
    note: "Free mental health services for veterans and families.",
  },
  {
    name: "DAV",
    href: "https://www.dav.org/",
    note: "Claims assistance and advocacy.",
  },
];

function ResourcesPage() {
  const mark = useInferno((s) => s.mark);
  useEffect(() => {
    mark("resources");
  }, [mark]);

  return (
    <InfernoShell>
      <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-ember">
        Resources
      </p>
      <h1 className="mt-1 font-display text-3xl uppercase">The human path</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Inferno is a companion. It is not a replacement for professional care. If you need
        someone right now, use a number, not a model.
      </p>

      <div className="mt-6 grid gap-3">
        {[...CRISIS_RESOURCES, ...MORE].map((r) => (
          <Card key={r.name}>
            <CardTitle>{r.name}</CardTitle>
            <CardHint>{r.note}</CardHint>
            <a
              href={r.href}
              className="mt-3 inline-block font-display text-sm uppercase tracking-wider text-primary"
              target={r.href.startsWith("http") ? "_blank" : undefined}
              rel={r.href.startsWith("http") ? "noreferrer" : undefined}
            >
              Open
            </a>
          </Card>
        ))}
      </div>

      <p className="mt-8 text-xs text-faint">
        In the United States the 988 Suicide & Crisis Lifeline is available 24 hours a day.
        Call or text 988. Veterans, press 1. Or text HOME to 741741.
      </p>
    </InfernoShell>
  );
}
