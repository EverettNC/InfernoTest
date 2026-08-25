import { createFileRoute } from "@tanstack/react-router";
import { InfernoShell } from "@/components/inferno/shell";
import { InfernoTalk } from "@/components/inferno/talk";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { useInferno } from "@/lib/inferno/store";

export const Route = createFileRoute("/voice")({ component: VoicePage });

function VoicePage() {
  const voice = useInferno((s) => s.profile.voice);
  return (
    <InfernoShell>
      <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
        Voice
      </p>
      <h1 className="mt-1 font-display text-3xl uppercase">Speak and be answered</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Companion {voice === "joanna" ? "Joanna" : "Matthew"}. Natural speech. If the
        ladder hits HIGH or CRITICAL, cortex yields to Guardian. 988 is still one tap.
      </p>
      <Card className="mt-6">
        <CardTitle>Closed loop</CardTitle>
        <CardHint>Listen locally. Think on the cortex. Speak back. Failures named.</CardHint>
        <div className="mt-4">
          <InfernoTalk />
        </div>
      </Card>
    </InfernoShell>
  );
}
