import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { InfernoShell } from "@/components/inferno/shell";
import { Button } from "@/components/ui/button";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { breathTick } from "@/lib/inferno/audio";
import { useInferno } from "@/lib/inferno/store";

export const Route = createFileRoute("/ground")({ component: GroundPage });

const STEPS = [
  { key: "see", count: 5, prompt: "Five things you can see" },
  { key: "touch", count: 4, prompt: "Four things you can touch" },
  { key: "hear", count: 3, prompt: "Three things you can hear" },
  { key: "smell", count: 2, prompt: "Two things you can smell" },
  { key: "taste", count: 1, prompt: "One thing you can taste" },
] as const;

const LADDER = [
  { id: 1, label: "Think about the place" },
  { id: 2, label: "Look at a photo of it" },
  { id: 3, label: "Stand near the door" },
  { id: 4, label: "Step outside for one minute" },
  { id: 5, label: "Walk the block and return" },
  { id: 6, label: "Stay for five minutes" },
] as const;

function GroundPage() {
  const addGrounding = useInferno((s) => s.addGrounding);
  const mark = useInferno((s) => s.mark);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string[]>>({
    see: [],
    touch: [],
    hear: [],
    smell: [],
    taste: [],
  });
  const [draft, setDraft] = useState("");
  const [phase, setPhase] = useState<"in" | "out" | "hold">("in");
  const [breathing, setBreathing] = useState(false);
  const [handsFree, setHandsFree] = useState(false);
  const [rung, setRung] = useState(1);
  const [suds, setSuds] = useState(5);
  const [logged, setLogged] = useState<string | null>(null);
  const stopRef = useRef<null | (() => void)>(null);
  const current = STEPS[step];

  useEffect(() => {
    if (!handsFree || !current) return;
    if (!("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(
      `${current.prompt}. Name them slowly. I will wait.`,
    );
    u.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }, [handsFree, current]);

  useEffect(
    () => () => {
      stopRef.current?.();
    },
    [],
  );

  const addItem = () => {
    if (!current || !draft.trim()) return;
    const next = {
      ...values,
      [current.key]: [...values[current.key], draft.trim()].slice(0, current.count),
    };
    setValues(next);
    setDraft("");
    if (next[current.key].length >= current.count) {
      if (step < STEPS.length - 1) setStep(step + 1);
      else {
        addGrounding({
          see: next.see,
          touch: next.touch,
          hear: next.hear,
          smell: next.smell,
          taste: next.taste,
          complete: true,
        });
      }
    }
  };

  const complete = values.taste.length >= 1 && values.see.length >= 5;
  const filled = STEPS.reduce((n, s) => n + values[s.key].length, 0);

  return (
    <InfernoShell>
      <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
        Ground
      </p>
      <h1 className="mt-1 font-display text-3xl uppercase">Five senses</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Najavits 2002 · Seeking Safety. Hands-free if the hands are busy. Then, this is now.
      </p>

      <Progress className="mt-6" value={(filled / 15) * 100} tone="teal" />

      <Card className="mt-6">
        <CardTitle>{current?.prompt}</CardTitle>
        <CardHint>
          {values[current?.key ?? "see"].length}/{current?.count} named
        </CardHint>
        <ul className="mt-3 space-y-1 text-sm">
          {values[current?.key ?? "see"].map((v) => (
            <li key={v} className="text-fg">
              {v}
            </li>
          ))}
        </ul>
        {!complete && (
          <div className="mt-4 flex gap-2">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addItem();
              }}
              placeholder="Name one."
            />
            <Button onClick={addItem}>Add</Button>
          </div>
        )}
        {complete && (
          <p className="mt-4 text-sm text-teal">
            Complete. You came back. That is the whole drill.
          </p>
        )}
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setHandsFree((v) => !v)}
        >
          {handsFree ? "Hands-free on" : "Hands-free voice prompts"}
        </Button>
      </Card>

      <Card className="mt-4">
        <CardTitle>Breath pacer</CardTitle>
        <CardHint>Four in. One hold. Six out. Barlow panic control pattern.</CardHint>
        <div
          className="mx-auto my-8 size-36 rounded-full border border-primary/40 bg-primary/10 transition-transform duration-1000"
          style={{
            transform:
              phase === "in" ? "scale(1.08)" : phase === "out" ? "scale(0.92)" : "scale(1)",
          }}
        />
        <p className="text-center font-display text-xl uppercase tracking-[0.2em] text-primary">
          {breathing ? (phase === "in" ? "In" : phase === "out" ? "Out" : "Hold") : "Still"}
        </p>
        <Button
          className="mx-auto mt-4 flex"
          variant={breathing ? "ember" : "default"}
          onClick={() => {
            if (breathing) {
              stopRef.current?.();
              stopRef.current = null;
              setBreathing(false);
              return;
            }
            mark("breathing");
            stopRef.current = breathTick(4, 6, setPhase);
            setBreathing(true);
          }}
        >
          {breathing ? "Stop" : "Begin 4-6"}
        </Button>
      </Card>

      <Card className="mt-4">
        <CardTitle>Gradual exposure</CardTitle>
        <CardHint>
          Foa PE ladder, shortened. You choose the rung. Inferno does not push. SUDS 0–10.
        </CardHint>
        <ol className="mt-4 space-y-2">
          {LADDER.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => setRung(r.id)}
                className={`flex h-11 w-full items-center justify-between rounded-md border px-3 text-left text-sm ${
                  rung === r.id ? "border-primary text-primary" : "border-border text-muted"
                }`}
              >
                <span>
                  {r.id}. {r.label}
                </span>
                {rung === r.id && <span className="font-display text-xs uppercase">now</span>}
              </button>
            </li>
          ))}
        </ol>
        <label className="mt-4 block">
          <span className="flex justify-between font-display text-xs uppercase tracking-wider text-muted">
            SUDS now
            <span className="tabular-nums text-fg">{suds}</span>
          </span>
          <input
            type="range"
            min={0}
            max={10}
            value={suds}
            onChange={(e) => setSuds(Number(e.target.value))}
            className="mt-1 w-full accent-primary"
          />
        </label>
        <Button
          className="mt-3"
          variant="outline"
          onClick={() => {
            mark("exposure");
            setLogged(`Rung ${rung} · SUDS ${suds}. Stay. Do not jump rungs.`);
          }}
        >
          Log this rung
        </Button>
        {logged && <p className="mt-3 text-sm text-teal">{logged}</p>}
      </Card>
    </InfernoShell>
  );
}
