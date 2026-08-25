import { createFileRoute, Link } from "@tanstack/react-router";
import { InfernoShell } from "@/components/inferno/shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";
import { CIRCLES } from "@/lib/inferno/catalog";
import { useInferno } from "@/lib/inferno/store";
import { useState } from "react";

export const Route = createFileRoute("/community")({ component: CommunityPage });

function CommunityPage() {
  const [open, setOpen] = useState<string>(CIRCLES[0].id);
  const journals = useInferno((s) => s.journals);
  const setJournal = useInferno((s) => s.setJournal);
  const mark = useInferno((s) => s.mark);
  const circle = CIRCLES.find((c) => c.id === open) ?? CIRCLES[0];

  return (
    <InfernoShell>
      <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
        Community
      </p>
      <h1 className="mt-1 font-display text-3xl uppercase">The circles</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Six private rooms. This ground does not invent other veterans. Your journal stays
        on this device. Crisis routing is real.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {CIRCLES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              setOpen(c.id);
              mark("community");
            }}
            className={`rounded-lg border p-4 text-left ${
              open === c.id ? "border-primary bg-elevated" : "border-border bg-panel"
            }`}
          >
            <p className="font-display text-sm uppercase tracking-wider">{c.name}</p>
            <p className="mt-1 text-xs text-muted">{c.category}</p>
          </button>
        ))}
      </div>

      <Card className="mt-6">
        <Badge>{circle.category}</Badge>
        <CardTitle className="mt-3">{circle.name}</CardTitle>
        <CardHint>{circle.blurb}</CardHint>
        <ul className="mt-4 flex flex-wrap gap-2">
          {circle.holds.map((h) => (
            <Badge key={h} tone="muted">
              {h}
            </Badge>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ember">{circle.crisis}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <a className="text-primary" href="tel:988">
            Call 988
          </a>
          <a className="text-primary" href="https://www.va.gov/find-locations/" target="_blank" rel="noreferrer">
            Find a VA
          </a>
          <Link className="text-primary" to="/resources">
            All resources
          </Link>
        </div>
        <p className="mt-6 font-display text-xs uppercase tracking-wider text-muted">
          Private journal — this circle only
        </p>
        <Textarea
          className="mt-2"
          value={journals[circle.id] ?? ""}
          onChange={(e) => setJournal(circle.id, e.target.value)}
          placeholder="What this circle would hear, if it were a night watch."
        />
      </Card>
    </InfernoShell>
  );
}
