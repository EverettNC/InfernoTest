import { useState } from "react";
import { Mic, Send, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { thinkInferno, speakInferno } from "@/lib/inferno/ai";
import { crisisResponse, detectCrisis, findForbiddenClinical, selectProtocol } from "@/lib/inferno/detector";
import { useInferno } from "@/lib/inferno/store";
import type { CrisisLevel } from "@/lib/inferno/types";

function speakLocal(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.slice(0, 400));
  u.rate = 0.92;
  window.speechSynthesis.speak(u);
}

async function speakCloud(text: string, voice: "joanna" | "matthew") {
  const res = await speakInferno({ data: { text, voice } });
  if (!res.ok) {
    speakLocal(text);
    return false;
  }
  const src = `data:${res.mime};base64,${res.audio}`;
  const audio = new Audio(src);
  await audio.play().catch(() => speakLocal(text));
  return true;
}

type RecCtor = new () => {
  lang: string;
  interimResults: boolean;
  start: () => void;
  onresult: ((ev: { results: { [i: number]: { [j: number]: { transcript: string } } } }) => void) | null;
  onerror: ((ev: Event) => void) | null;
};

export function InfernoTalk({
  mode = "companion",
  seed,
}: {
  mode?: "companion" | "study-partner" | "integrity";
  seed?: string;
}) {
  const profile = useInferno((s) => s.profile);
  const triggers = useInferno((s) => s.triggers);
  const chats = useInferno((s) => s.chats);
  const addChat = useInferno((s) => s.addChat);
  const queueBridge = useInferno((s) => s.queueBridge);
  const mark = useInferno((s) => s.mark);
  const [draft, setDraft] = useState(seed ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async (text: string) => {
    const msg = text.trim();
    if (!msg || busy) return;
    setBusy(true);
    setError(null);
    setDraft("");
    const d = detectCrisis(msg);
    addChat({ role: "user", text: msg, crisis: d.level });
    mark("voice-listen");
    if (d.level === "critical" || d.level === "high") {
      const reply = crisisResponse(d, profile.callsign);
      addChat({
        role: "inferno",
        text: reply,
        crisis: d.level,
        protocol: d.protocol,
      });
      queueBridge(d.level, msg.slice(0, 140));
      mark("crisis-detect");
      if (profile.speakReplies) void speakCloud(reply, profile.voice);
      setBusy(false);
      return;
    }
    const protocol = selectProtocol(msg, d.level);
    const history = useInferno
      .getState()
      .chats.slice(-8)
      .map((c) => ({ role: c.role, text: c.text }));
    const res = await thinkInferno({
      data: {
        message: msg,
        history,
        callsign: profile.callsign,
        protocol,
        crisis: d.level,
        triggers,
        mode,
      },
    });
    if (!res.ok) {
      setError(res.error);
      const fallback =
        d.level === "elevated"
          ? crisisResponse(d, profile.callsign)
          : `Named failure. Cortex did not answer. Guardian still holds: 988, veterans press 1. ${res.error}`;
      addChat({
        role: "inferno",
        text: fallback,
        crisis: d.level,
        protocol,
      });
      mark("integrity");
      setBusy(false);
      return;
    }
    const banned = findForbiddenClinical(res.text);
    const textOut = banned
      ? `${res.text}\n\nIntegrity flag: ${banned}. I do not diagnose or prescribe. Use a licensed clinician.`
      : res.text;
    addChat({
      role: "inferno",
      text: textOut,
      crisis: d.level,
      protocol,
    });
    mark("voice-speak");
    if (profile.speakReplies) void speakCloud(textOut, profile.voice);
    setBusy(false);
  };

  const listen = () => {
    const w = window as unknown as { SpeechRecognition?: RecCtor; webkitSpeechRecognition?: RecCtor };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) {
      setError("Named miss: this browser has no speech recognition.");
      mark("integrity");
      return;
    }
    const rec = new Ctor();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.onresult = (ev) => {
      const said = ev.results[0]?.[0]?.transcript ?? "";
      setDraft(said);
      void send(said);
    };
    rec.onerror = () => setError("Mic failed. Named. Type instead.");
    rec.start();
    mark("voice-listen");
  };

  const visible = chats.slice(-12);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex max-h-[48vh] flex-col gap-3 overflow-y-auto pr-1">
        {visible.length === 0 && (
          <p className="text-sm text-muted">
            Speak or type. Inferno hears tone, not performance. If the body is loud, say so.
          </p>
        )}
        {visible.map((c) => (
          <Turn key={c.id} role={c.role} text={c.text} crisis={c.crisis} />
        ))}
        {busy && (
          <p className="font-display text-xs uppercase tracking-[0.18em] text-primary">
            Inferno is with you…
          </p>
        )}
      </div>
      {error && <p className="text-sm text-ember">{error}</p>}
      <div className="flex flex-col gap-2">
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Say what is true."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send(draft);
            }
          }}
        />
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => void send(draft)} disabled={busy}>
            <Send className="size-4" />
            Send
          </Button>
          <Button variant="outline" onClick={listen} disabled={busy} type="button">
            <Mic className="size-4" />
            Listen
          </Button>
          <Button
            variant="ghost"
            type="button"
            onClick={() => {
              const last = [...chats].reverse().find((c) => c.role === "inferno");
              if (last) void speakCloud(last.text, profile.voice);
            }}
          >
            <Volume2 className="size-4" />
            Repeat
          </Button>
        </div>
      </div>
    </div>
  );
}

function Turn({
  role,
  text,
  crisis,
}: {
  role: "user" | "inferno";
  text: string;
  crisis: CrisisLevel;
}) {
  const mine = role === "user";
  return (
    <div
      className={
        mine
          ? "ml-8 rounded-lg rounded-br-sm border border-primary/25 bg-primary/10 p-3"
          : "mr-8 rounded-lg rounded-bl-sm border border-border bg-panel p-3"
      }
    >
      <p className="font-display text-[10px] uppercase tracking-[0.16em] text-faint">
        {mine ? "You" : "Inferno"}
        {crisis !== "safe" ? ` · ${crisis}` : ""}
      </p>
      <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-fg">{text}</p>
    </div>
  );
}
