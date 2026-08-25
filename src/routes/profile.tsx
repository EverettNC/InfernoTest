import { createFileRoute } from "@tanstack/react-router";
import { InfernoShell } from "@/components/inferno/shell";
import { Button } from "@/components/ui/button";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useInferno } from "@/lib/inferno/store";
import type { VoiceCompanion } from "@/lib/inferno/types";
import { useState } from "react";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  const profile = useInferno((s) => s.profile);
  const setProfile = useInferno((s) => s.setProfile);
  const exportAll = useInferno((s) => s.exportAll);
  const wipe = useInferno((s) => s.wipe);
  const mark = useInferno((s) => s.mark);
  const [contactName, setContactName] = useState(profile.contacts[0]?.name ?? "");
  const [contactTel, setContactTel] = useState(profile.contacts[0]?.tel ?? "");
  const [wiped, setWiped] = useState(false);

  const saveContact = () => {
    setProfile({
      contacts: contactTel.trim()
        ? [{ id: "primary", name: contactName.trim() || "My person", tel: contactTel.trim() }]
        : [],
    });
    mark("crisis-bar");
  };

  return (
    <InfernoShell>
      <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
        Profile
      </p>
      <h1 className="mt-1 font-display text-3xl uppercase">Your system</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Callsign, voice, your person. Local only. Sovereignty is a button, not a policy PDF.
      </p>

      <Card className="mt-6">
        <CardTitle>Identity</CardTitle>
        <label className="mt-4 block font-display text-xs uppercase tracking-wider text-muted">
          Callsign
          <Input
            className="mt-1"
            value={profile.callsign}
            onChange={(e) => setProfile({ callsign: e.target.value })}
            placeholder="What Inferno should call you"
          />
        </label>
        <p className="mt-4 font-display text-xs uppercase tracking-wider text-muted">Voice companion</p>
        <div className="mt-2 flex gap-2">
          {(["joanna", "matthew"] as VoiceCompanion[]).map((v) => (
            <Button
              key={v}
              variant={profile.voice === v ? "default" : "outline"}
              onClick={() => setProfile({ voice: v })}
            >
              {v === "joanna" ? "Joanna" : "Matthew"}
            </Button>
          ))}
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={profile.speakReplies}
            onChange={(e) => setProfile({ speakReplies: e.target.checked })}
          />
          Speak Inferno's replies
        </label>
        <label className="mt-2 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={profile.reducedMotion}
            onChange={(e) => setProfile({ reducedMotion: e.target.checked })}
          />
          Reduce motion
        </label>
      </Card>

      <Card className="mt-4">
        <CardTitle>Your person</CardTitle>
        <CardHint>One tap from the crisis bar. Stored here, not in a cloud directory.</CardHint>
        <Input
          className="mt-3"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          placeholder="Name"
        />
        <Input
          className="mt-2"
          value={contactTel}
          onChange={(e) => setContactTel(e.target.value)}
          placeholder="Phone"
          type="tel"
        />
        <Button className="mt-3" variant="outline" onClick={saveContact}>
          Save to crisis bar
        </Button>
      </Card>

      <Card className="mt-4">
        <CardTitle>Sovereignty</CardTitle>
        <CardHint>Export everything. Or burn it. Cardinal Rule 4.</CardHint>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            onClick={() => {
              const blob = new Blob([exportAll()], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "inferno-training-ground.json";
              a.click();
              URL.revokeObjectURL(url);
              mark("export-wipe");
            }}
          >
            Export JSON
          </Button>
          <Button
            variant="ember"
            onClick={() => {
              wipe();
              setWiped(true);
              mark("export-wipe");
            }}
          >
            Full wipe
          </Button>
        </div>
        {wiped && (
          <p className="mt-3 text-sm text-ember">
            Wiped. Privacy consent will ask again. Named and done.
          </p>
        )}
      </Card>
    </InfernoShell>
  );
}
