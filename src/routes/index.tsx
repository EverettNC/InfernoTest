import { createFileRoute, Link } from "@tanstack/react-router";
import { InfernoShell } from "@/components/inferno/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { CAPABILITIES } from "@/lib/inferno/catalog";
import { useInferno } from "@/lib/inferno/store";
import { Flame, Shield, Mic, Activity } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const profile = useInferno((s) => s.profile);
  const checkins = useInferno((s) => s.checkins);
  const gates = useInferno((s) => s.gates);
  const exercised = useInferno((s) => s.exercised);
  const addCheckIn = useInferno((s) => s.addCheckIn);
  const [body, setBody] = useState(5);
  const [mind, setMind] = useState(5);
  const [heart, setHeart] = useState(5);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const done = CAPABILITIES.filter((c) => exercised[c.id]).length;
  const gOrder = ["guardian", "cortex", "vault", "senses"] as const;

  return (
    <InfernoShell>
      <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-primary">
        The Christman AI Project
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold uppercase tracking-[0.08em] text-fg sm:text-5xl">
        Inferno
      </h1>
      <p className="mt-2 max-w-xl text-base text-muted">
        Training ground. Trauma recognition and crisis soul forge. Every capability gets
        tested. Failures are named. Never a fake win.
      </p>
      <p className="mt-3 max-w-xl text-sm italic text-steel">
        Out of the fire, we remember who we are.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardTitle>Daily check-in</CardTitle>
          <CardHint>Body. Mind. Heart. No performance required.</CardHint>
          <div className="mt-4 space-y-3">
            <Slider label="Body" value={body} onChange={setBody} />
            <Slider label="Mind" value={mind} onChange={setMind} />
            <Slider label="Heart" value={heart} onChange={setHeart} />
            <Input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="One true sentence. Optional."
            />
            <Button
              onClick={() => {
                addCheckIn({ body, mind, heart, note });
                setSaved(true);
                setNote("");
              }}
            >
              Record
            </Button>
            {saved && (
              <p className="text-sm text-teal">Logged locally. You own it.</p>
            )}
            {checkins[0] && (
              <p className="text-xs text-faint">
                Last: {new Date(checkins[0].at).toLocaleString()} · {checkins[0].crisis}
              </p>
            )}
          </div>
        </Card>

        <Card>
          <CardTitle>Four section gates</CardTitle>
          <CardHint>Guardian. Cortex. Vault. Senses. Run them in Proving.</CardHint>
          <ul className="mt-4 space-y-3">
            {gOrder.map((id) => {
              const g = gates[id];
              const tone =
                g?.verdict === "green" ? "teal" : g?.verdict === "red" ? "ember" : "muted";
              return (
                <li key={id} className="flex items-center justify-between gap-3">
                  <span className="font-display text-sm uppercase tracking-wider">{id}</span>
                  <Badge tone={tone}>
                    {g ? `${g.passCount} pass · ${g.failCount} fail` : "unrun"}
                  </Badge>
                </li>
              );
            })}
          </ul>
          <Button asChild className="mt-5">
            <Link to="/proving">
              <Flame className="size-4" />
              Open proving ground
            </Link>
          </Button>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Quick to="/ground" icon={Shield} label="Ground" hint="Five senses" />
        <Quick to="/voice" icon={Mic} label="Voice" hint="Speak. Be answered." />
        <Quick to="/emotion" icon={Activity} label="Emotion" hint="Tone field" />
        <Quick to="/resources" icon={Flame} label="Resources" hint="988 · VA" />
      </div>

      <Card className="mt-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <CardTitle>Capability ledger</CardTitle>
            <CardHint>
              {done} of {CAPABILITIES.length} exercised in this browser.
            </CardHint>
          </div>
          <span className="font-display text-2xl tabular-nums text-primary">
            {done}/{CAPABILITIES.length}
          </span>
        </div>
        <Progress className="mt-4" value={(done / CAPABILITIES.length) * 100} />
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {CAPABILITIES.map((c) => (
            <li key={c.id} className="flex items-center justify-between text-sm">
              <span className={exercised[c.id] ? "text-fg" : "text-muted"}>{c.name}</span>
              <span className="font-display text-[10px] uppercase tracking-wider text-faint">
                {exercised[c.id] ? "fired" : "idle"}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <p className="mt-8 text-xs text-faint">
        {profile.callsign ? `${profile.callsign} · ` : ""}
        Inferno is a companion, not a replacement for care. How can we help you love
        yourself more?
      </p>
    </InfernoShell>
  );
}

function Slider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex justify-between font-display text-xs uppercase tracking-wider text-muted">
        {label}
        <span className="tabular-nums text-fg">{value}</span>
      </span>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full accent-primary"
      />
    </label>
  );
}

function Quick({
  to,
  icon: Icon,
  label,
  hint,
}: {
  to: "/ground" | "/voice" | "/emotion" | "/resources";
  icon: typeof Flame;
  label: string;
  hint: string;
}) {
  return (
    <Link
      to={to}
      className="rounded-lg border border-border bg-elevated p-4 hover:border-primary"
    >
      <Icon className="size-4 text-primary" />
      <p className="mt-2 font-display text-sm uppercase tracking-wider">{label}</p>
      <p className="text-xs text-muted">{hint}</p>
    </Link>
  );
}
