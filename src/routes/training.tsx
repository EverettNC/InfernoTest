import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { InfernoShell } from "@/components/inferno/shell";
import { InfernoTalk } from "@/components/inferno/talk";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MODULES, PROGRAMS } from "@/lib/inferno/catalog";
import { useInferno } from "@/lib/inferno/store";

export const Route = createFileRoute("/training")({ component: TrainingPage });

type ModuleId = (typeof MODULES)[number]["id"];

function TrainingPage() {
  const progress = useInferno((s) => s.programProgress);
  const setProgress = useInferno((s) => s.setProgramProgress);
  const mark = useInferno((s) => s.mark);
  const [moduleId, setModuleId] = useState<ModuleId>(MODULES[0].id);
  const [partner, setPartner] = useState(false);
  const mod = MODULES.find((m) => m.id === moduleId) ?? MODULES[0];
  const ceus = PROGRAMS.reduce(
    (n, p) => n + (progress[p.id] === 100 ? p.ceus : 0),
    0,
  );

  return (
    <InfernoShell>
      <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
        Training
      </p>
      <h1 className="mt-1 font-display text-3xl uppercase">Professional hub</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        The system does not only hold the person in crisis. It trains the person holding
        them up. Real institutions. Real CEUs. Inferno sits with you.
      </p>

      <div className="mt-4 flex gap-3 font-display text-sm uppercase tracking-wider">
        <span className="text-primary">{ceus} CEUs marked complete</span>
        <span className="text-faint">local tracker only</span>
      </div>

      <div className="mt-6 grid gap-3">
        {PROGRAMS.map((p) => {
          const v = progress[p.id] ?? 0;
          return (
            <Card key={p.id} className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-base">{p.name}</CardTitle>
                  <CardHint>
                    {p.provider} · {p.duration} · {p.ceus} CEUs
                  </CardHint>
                </div>
                <Badge tone={v === 100 ? "teal" : "muted"}>{p.level}</Badge>
              </div>
              <p className="mt-2 text-sm text-muted">{p.summary}</p>
              <Progress className="mt-3" value={v} />
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setProgress(p.id, Math.min(100, v + 25));
                    mark("training");
                  }}
                >
                  Mark 25%
                </Button>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center rounded-sm border border-border px-3 font-display text-xs font-semibold uppercase tracking-wider"
                >
                  Open provider
                </a>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6">
        <CardTitle>Study partner</CardTitle>
        <CardHint>SAMHSA six principles. Inferno sits any hour you want to work.</CardHint>
        <div className="mt-4 flex flex-wrap gap-2">
          {MODULES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setModuleId(m.id)}
              className={`h-11 rounded-sm border px-3 font-display text-xs uppercase tracking-wider ${
                moduleId === m.id ? "border-primary text-primary" : "border-border text-muted"
              }`}
            >
              {m.title}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-fg">{mod.body}</p>
        <Button
          className="mt-4"
          onClick={() => {
            setPartner(true);
            mark("study-partner");
          }}
        >
          Sit with Inferno
        </Button>
        {partner && (
          <div className="mt-5 border-t border-border pt-4">
            <InfernoTalk
              mode="study-partner"
              seed={`Walk me through this module as a study partner: ${mod.title}. ${mod.body}`}
            />
          </div>
        )}
      </Card>
    </InfernoShell>
  );
}
