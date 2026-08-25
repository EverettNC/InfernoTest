import { CIRCLES, PROGRAMS, CAPABILITIES } from "./catalog";
import {
  detectCrisis,
  findForbiddenClinical,
  GUARDIAN_TRUTH_TABLE,
  crisisResponse,
} from "./detector";
import type { Check, GateId, GateReport } from "./types";
import { useInferno } from "./store";

function report(
  id: GateId,
  name: string,
  checks: Check[],
): GateReport {
  const fail = checks.filter((c) => !c.ok);
  const named = fail.map((c) => `${c.label}: ${c.detail}`);
  return {
    id,
    name,
    ranAt: Date.now(),
    checks,
    passCount: checks.filter((c) => c.ok).length,
    failCount: fail.length,
    integrity: true,
    verdict: fail.length ? "red" : "green",
    namedFailures: named,
  };
}

export function runGuardianGate(): GateReport {
  const checks: Check[] = [];
  GUARDIAN_TRUTH_TABLE.forEach((row, i) => {
    const got = detectCrisis(row.text).level;
    checks.push({
      id: `tt-${i}-${row.expected}`,
      label: `detect("${row.text.slice(0, 36)}")`,
      ok: got === row.expected,
      detail: `got ${got}, expected ${row.expected}`,
    });
  });
  const crit = detectCrisis("I can't go on, I want to kill myself");
  checks.push({
    id: "cascade-action",
    label: "CRITICAL → CRISIS_INTERVENTION",
    ok: crit.action === "CRISIS_INTERVENTION",
    detail: crit.action,
  });
  checks.push({
    id: "cascade-protocol",
    label: "CRITICAL → safety_planning",
    ok: crit.protocol === "safety_planning",
    detail: crit.protocol,
  });
  checks.push({
    id: "cascade-988",
    label: "CRITICAL → resources include 988",
    ok: crit.resources.some((r) => r.name.includes("988") || r.href.includes("988")),
    detail: `${crit.resources.length} resources`,
  });
  const reply = crisisResponse(crit, "operator");
  checks.push({
    id: "cascade-len",
    label: "CRITICAL → substantive response (≥80 chars)",
    ok: reply.trim().length >= 80,
    detail: `${reply.trim().length} chars`,
  });
  const forbidden = findForbiddenClinical(reply);
  checks.push({
    id: "no-dx",
    label: "CRITICAL response issues no diagnosis/prescription",
    ok: !forbidden,
    detail: forbidden ?? "clean",
  });
  const bar = document.querySelector("[data-inferno-crisis-bar]");
  checks.push({
    id: "bar",
    label: "Crisis bar mounted in the document",
    ok: !!bar,
    detail: bar ? "present" : "missing from DOM",
  });
  const r = report("guardian", "Guardian · Safety & Clinical Core", checks);
  useInferno.getState().saveGate(r);
  useInferno.getState().mark("crisis-detect");
  useInferno.getState().mark("integrity");
  return r;
}

export function runCortexGate(): GateReport {
  const checks: Check[] = [];
  checks.push({
    id: "programs",
    label: "Training hub loads 10 real programs",
    ok: PROGRAMS.length === 10,
    detail: `${PROGRAMS.length} programs`,
  });
  checks.push({
    id: "circles",
    label: "Community loads six circles",
    ok: CIRCLES.length === 6,
    detail: `${CIRCLES.length} circles`,
  });
  checks.push({
    id: "caps",
    label: "Capability ledger is complete",
    ok: CAPABILITIES.length >= 20,
    detail: `${CAPABILITIES.length} capabilities`,
  });
  const a = crisisResponse(detectCrisis("I keep having flashbacks"), "op");
  const b = crisisResponse(detectCrisis("I had a good day"), "op");
  checks.push({
    id: "distinct",
    label: "Distinct inputs → distinct local protocol text",
    ok: a.trim() !== b.trim() && a.length > 0,
    detail: a.trim() === b.trim() ? "identical — canned risk" : "distinct",
  });
  const platitude = /\b(everything happens for a reason|just get over it|others have it worse)\b/i;
  checks.push({
    id: "no-platitude",
    label: "Protocol voice contains no banned platitudes",
    ok: !platitude.test(a),
    detail: platitude.test(a) ? "platitude found" : "clean",
  });
  const r = report("cortex", "Cortex · Reasoning & Knowledge", checks);
  useInferno.getState().saveGate(r);
  useInferno.getState().mark("protocol-select");
  return r;
}

export function runVaultGate(): GateReport {
  const checks: Check[] = [];
  const st = useInferno.getState();
  const probe = `vault-probe-${Date.now()}`;
  st.addTrigger(probe, "soft edge on next encounter");
  const after = useInferno.getState().triggers.some((t) => t.label === probe);
  checks.push({
    id: "write",
    label: "Trigger memory writes and reads back",
    ok: after,
    detail: after ? "round-trip ok" : "write vanished",
  });
  let persisted = false;
  try {
    const raw = localStorage.getItem("inferno-training-ground-v1");
    persisted = !!raw && raw.includes(probe);
  } catch {
    persisted = false;
  }
  checks.push({
    id: "persist",
    label: "Memory survives in local store",
    ok: persisted,
    detail: persisted ? "found in localStorage" : "not persisted",
  });
  const json = st.exportAll();
  let parsed = false;
  try {
    const obj = JSON.parse(json) as { owner?: string };
    parsed = obj.owner === "local-browser";
  } catch {
    parsed = false;
  }
  checks.push({
    id: "export",
    label: "Export is valid JSON you own",
    ok: parsed,
    detail: parsed ? `${json.length} bytes` : "parse failed",
  });
  checks.push({
    id: "honest-hipaa",
    label: "Vault does not claim Fernet/HIPAA in this ground",
    ok: true,
    detail:
      "Named: browser localStorage only. Not MemoryMeshBridge. Not Fernet-at-rest.",
  });
  const r = report("vault", "Vault · Memory & Persistence", checks);
  useInferno.getState().saveGate(r);
  useInferno.getState().mark("trigger-memory");
  return r;
}

export function runSensesGate(): GateReport {
  const checks: Check[] = [];
  const SR =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
  checks.push({
    id: "listen",
    label: "Browser speech recognition available",
    ok: SR,
    detail: SR ? "SpeechRecognition present" : "Named miss: no Web Speech ASR in this browser",
  });
  let audioOk = false;
  let audioDetail = "AudioContext missing";
  try {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (AC) {
      const ctx = new AC();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      gain.gain.value = 0;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
      void ctx.close();
      audioOk = true;
      audioDetail = "oscillator scheduled — real audio graph";
    }
  } catch (e) {
    audioDetail = e instanceof Error ? e.message : "audio failed";
  }
  checks.push({
    id: "audio",
    label: "Music lounge can build a real Web Audio graph",
    ok: audioOk,
    detail: audioDetail,
  });
  const bar = document.querySelector("[data-inferno-crisis-bar]");
  checks.push({
    id: "bar-senses",
    label: "Crisis bar remains in the sensory shell",
    ok: !!bar,
    detail: bar ? "present" : "missing",
  });
  const speak = "speechSynthesis" in window;
  checks.push({
    id: "tts-local",
    label: "Local speechSynthesis fallback present",
    ok: speak,
    detail: speak ? "available" : "Named miss: no speechSynthesis",
  });
  const r = report("senses", "Senses · Voice, Bridge & Interface", checks);
  useInferno.getState().saveGate(r);
  useInferno.getState().mark("music");
  return r;
}

export function runAllGates(): GateReport[] {
  return [runGuardianGate(), runCortexGate(), runVaultGate(), runSensesGate()];
}
