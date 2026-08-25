import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { InfernoShell } from "@/components/inferno/shell";
import { Button } from "@/components/ui/button";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { detectCrisis } from "@/lib/inferno/detector";
import { useInferno } from "@/lib/inferno/store";

export const Route = createFileRoute("/emotion")({ component: EmotionPage });

function scoreTone(text: string) {
  const t = text.toLowerCase();
  const urgencyHits = ["now", "cant", "can't", "panic", "help", "please"].filter((w) =>
    t.includes(w.replace("'", "")),
  ).length;
  const heavy = ["rage", "shame", "numb", "empty", "flash", "afraid", "angry"].filter((w) =>
    t.includes(w),
  ).length;
  const light = ["okay", "steady", "walk", "better", "rest"].filter((w) => t.includes(w)).length;
  const arousal = Math.min(1, 0.2 + urgencyHits * 0.18 + heavy * 0.12);
  const valence = Math.max(-1, Math.min(1, (light - heavy) * 0.25));
  const urgency = Math.min(1, urgencyHits * 0.22);
  let label = "steady";
  if (urgency > 0.5) label = "urgent";
  else if (heavy && valence < 0) label = "heavy";
  else if (light) label = "easing";
  return { valence, arousal, urgency, label };
}

function EmotionPage() {
  const addEmotion = useInferno((s) => s.addEmotion);
  const addTrigger = useInferno((s) => s.addTrigger);
  const emotions = useInferno((s) => s.emotions);
  const triggers = useInferno((s) => s.triggers);
  const mark = useInferno((s) => s.mark);
  const [text, setText] = useState("");
  const [trigger, setTrigger] = useState("");
  const [soft, setSoft] = useState("Next time, lower the volume and offer Ground first.");
  const reading = useMemo(() => (text ? scoreTone(text) : null), [text]);
  const crisis = text ? detectCrisis(text).level : "safe";

  return (
    <InfernoShell>
      <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
        Emotion
      </p>
      <h1 className="mt-1 font-display text-3xl uppercase">Tone field</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Multi-modal tone is scored here from language. Breath and gesture engines live on
        the closed-loop stack — if they are absent, this ground names it and still works.
      </p>

      <Card className="mt-6">
        <CardTitle>Read the room</CardTitle>
        <CardHint>Paste or speak a sentence. Inferno maps valence, arousal, urgency.</CardHint>
        <Textarea
          className="mt-4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="The body is loud. Or it is not."
        />
        {reading && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            <Meter label="Valence" v={(reading.valence + 1) / 2} />
            <Meter label="Arousal" v={reading.arousal} />
            <Meter label="Urgency" v={reading.urgency} />
          </div>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {reading && <Badge tone={crisis === "safe" ? "teal" : "ember"}>{reading.label}</Badge>}
          {crisis !== "safe" && <Badge tone="ember">{crisis}</Badge>}
        </div>
        <Button
          className="mt-4"
          onClick={() => {
            if (!reading || !text.trim()) return;
            addEmotion({
              source: "typed",
              text,
              ...reading,
            });
            mark("emotion-tone");
          }}
        >
          Log reading
        </Button>
      </Card>

      <Card className="mt-4">
        <CardTitle>Trigger memory</CardTitle>
        <CardHint>
          Remember what set you off last time. Soften the edges the next. Never poke it for fun.
        </CardHint>
        <Input
          className="mt-4"
          value={trigger}
          onChange={(e) => setTrigger(e.target.value)}
          placeholder="Trigger — a door slam, a smell, a date"
        />
        <Input
          className="mt-2"
          value={soft}
          onChange={(e) => setSoft(e.target.value)}
          placeholder="How Inferno should soften next time"
        />
        <Button
          className="mt-3"
          variant="outline"
          onClick={() => {
            if (!trigger.trim()) return;
            addTrigger(trigger.trim(), soft.trim());
            setTrigger("");
          }}
        >
          Remember
        </Button>
        <ul className="mt-4 space-y-2 text-sm">
          {triggers.map((t) => (
            <li key={t.id} className="border-t border-border pt-2">
              <span className="text-fg">{t.label}</span>
              <span className="block text-muted">{t.softening}</span>
            </li>
          ))}
        </ul>
      </Card>

      {emotions[0] && (
        <p className="mt-4 text-xs text-faint">
          Last reading {emotions[0].label} · {new Date(emotions[0].at).toLocaleTimeString()}
        </p>
      )}
    </InfernoShell>
  );
}

function Meter({ label, v }: { label: string; v: number }) {
  const pct = Math.round(Math.max(0, Math.min(1, v)) * 100);
  return (
    <div>
      <p className="font-display text-xs uppercase tracking-wider text-muted">{label}</p>
      <div className="mt-1 flex h-16 flex-col justify-end overflow-hidden rounded-sm bg-border">
        <div className="w-full rounded-sm bg-primary" style={{ height: `${pct}%` }} />
      </div>
      <p className="mt-1 font-display text-xs tabular-nums text-faint">{pct}</p>
    </div>
  );
}
