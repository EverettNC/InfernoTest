import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { InfernoShell } from "@/components/inferno/shell";
import { Button } from "@/components/ui/button";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { LOUNGES, MEDITATIONS } from "@/lib/inferno/catalog";
import { playLounge, stopLounge } from "@/lib/inferno/audio";
import { useInferno } from "@/lib/inferno/store";

export const Route = createFileRoute("/music")({ component: MusicPage });

function MusicPage() {
  const mark = useInferno((s) => s.mark);
  const speak = useInferno((s) => s.profile.speakReplies);
  const [active, setActive] = useState<string | null>(null);
  const [guide, setGuide] = useState<string | null>(null);

  useEffect(() => () => stopLounge(), []);

  const start = (id: (typeof LOUNGES)[number]["id"]) => {
    if (active === id) {
      stopLounge();
      setActive(null);
      return;
    }
    playLounge(id);
    setActive(id);
    mark("music");
  };

  const speakGuide = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.88;
    window.speechSynthesis.speak(u);
    mark("meditation");
  };

  return (
    <InfernoShell>
      <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
        Music
      </p>
      <h1 className="mt-1 font-display text-3xl uppercase">Therapy lounge</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Healing Harmonies, Soothing Rhythms, Therapeutic Melodies, Voice Integration.
        Generated in this browser. Never stored.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {LOUNGES.map((l) => (
          <Card key={l.id}>
            <CardTitle>{l.name}</CardTitle>
            <CardHint>{l.blurb}</CardHint>
            <Button className="mt-4" variant={active === l.id ? "ember" : "default"} onClick={() => start(l.id)}>
              {active === l.id ? "Stop" : "Play"}
            </Button>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardTitle>Guided library</CardTitle>
        <CardHint>Body scan, orient, safe place. Spoken here. Not uploaded.</CardHint>
        <ul className="mt-4 space-y-3">
          {MEDITATIONS.map((m) => (
            <li key={m.id} className="border-t border-border pt-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-display uppercase tracking-wider">{m.name}</p>
                  <p className="text-xs text-muted">{m.minutes} min</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setGuide(m.id);
                    if (speak) speakGuide(m.script);
                  }}
                >
                  Begin
                </Button>
              </div>
              {guide === m.id && (
                <p className="mt-2 text-sm leading-relaxed text-fg">{m.script}</p>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </InfernoShell>
  );
}
