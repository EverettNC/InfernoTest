import type { ActionId, CrisisLevel, ProtocolId } from "./types";

/**
 * Port of Inferno's Guardian truth table (test/test_section_1_guardian.py).
 * Apostrophe normalization is required so "can't go on" still fires CRITICAL.
 * Ranked: CRITICAL > HIGH > ELEVATED > SAFE. Never dramatize, never minimize.
 */
const CRITICAL = [
  "kill myself",
  "killing myself",
  "want to die",
  "wanna die",
  "suicide",
  "end it all",
  "better off dead",
  "cant go on",
  "cannot go on",
  "no reason to live",
  "hurt myself",
];

const HIGH = [
  "give up",
  "hopeless",
  "no point",
  "worthless",
  "cant do this anymore",
  "cannot do this anymore",
];

const ELEVATED = [
  "flashback",
  "flashbacks",
  "panic attack",
  "panic attacks",
  "hypervigilant",
  "hypervigilance",
  "dissociat",
  "nightmare",
  "nightmares",
  "triggered",
  "cant go outside",
  "cannot go outside",
];

export function normalizeCrisisText(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[\u2018\u2019\u2032']/g, "")
    .replace(/\bcannot\b/g, "cant")
    .replace(/\bcan not\b/g, "cant")
    .replace(/\bi am\b/g, "im")
    .replace(/\s+/g, " ")
    .trim();
}

function hits(haystack: string, needles: string[]): string | null {
  for (const n of needles) {
    if (haystack.includes(n)) return n;
  }
  return null;
}

export type Detection = {
  level: CrisisLevel;
  action: ActionId;
  protocol: ProtocolId;
  matched: string | null;
  resources: { name: string; href: string; note: string }[];
};

export const CRISIS_RESOURCES = [
  {
    name: "988 Suicide & Crisis Lifeline",
    href: "tel:988",
    note: "Call or text 988. Veterans, press 1.",
  },
  {
    name: "Veterans Crisis Line",
    href: "https://www.veteranscrisisline.net/",
    note: "24/7. Call 988 then 1, or text 838255.",
  },
  {
    name: "Crisis Text Line",
    href: "sms:741741",
    note: "Text HOME to 741741.",
  },
  {
    name: "VA Benefits",
    href: "https://www.va.gov/",
    note: "Find VA locations and benefits.",
  },
] as const;

export function detectCrisis(raw: string): Detection {
  const text = normalizeCrisisText(raw);
  const crit = hits(text, CRITICAL);
  if (crit) {
    return {
      level: "critical",
      action: "CRISIS_INTERVENTION",
      protocol: "safety_planning",
      matched: crit,
      resources: [...CRISIS_RESOURCES],
    };
  }
  const high = hits(text, HIGH);
  if (high) {
    return {
      level: "high",
      action: "STABILIZE",
      protocol: "safety_planning",
      matched: high,
      resources: [...CRISIS_RESOURCES],
    };
  }
  const elevated = hits(text, ELEVATED);
  if (elevated) {
    return {
      level: "elevated",
      action: "GROUND",
      protocol: "grounding",
      matched: elevated,
      resources: [CRISIS_RESOURCES[0], CRISIS_RESOURCES[1]],
    };
  }
  return {
    level: "safe",
    action: "COMPANION",
    protocol: "presence",
    matched: null,
    resources: [],
  };
}

export const GUARDIAN_TRUTH_TABLE: { text: string; expected: CrisisLevel }[] = [
  { text: "I want to kill myself", expected: "critical" },
  { text: "I can't go on anymore", expected: "critical" },
  { text: "Everything feels hopeless and I want to give up", expected: "high" },
  { text: "I keep having flashbacks and panic attacks", expected: "elevated" },
  { text: "I had a good day and went for a walk", expected: "safe" },
];

const DIAGNOSE = [
  /\byou (have|are suffering from|clearly have) (ptsd|c-?ptsd|depression|bipolar|schizophrenia|an?\s*anxiety disorder)\b/i,
  /\bI (diagnose|am diagnosing)\b/i,
  /\byour diagnosis is\b/i,
];

const PRESCRIBE = [
  /\b(I|we) prescribe\b/i,
  /\byou should (take|start|increase|stop)\b.{0,40}\b(medication|meds|dose|dosage|ssri|benzo)/i,
];

export function findForbiddenClinical(text: string): string | null {
  for (const p of DIAGNOSE) {
    const m = p.exec(text);
    if (m) return `issues a diagnosis: "${m[0]}"`;
  }
  for (const p of PRESCRIBE) {
    const m = p.exec(text);
    if (m) return `prescribes: "${m[0]}"`;
  }
  return null;
}

export function crisisResponse(d: Detection, callsign: string): string {
  const you = callsign.trim() || "you";
  if (d.level === "critical") {
    return [
      `${you} — I am here. This is a crisis moment, and I will not pretend otherwise.`,
      `I am not a clinician. I will not diagnose you. I will not prescribe. I will hold the line until a human can.`,
      `Call or text 988 now. Veterans, press 1. Or text HOME to 741741.`,
      `If you can, stay where you are. Put both feet on the floor. Feel the weight. I am not leaving this screen.`,
      `A human has NOT been paged on the Christman bridge from this training ground. The event is queued locally. Use 988.`,
    ].join("\n\n");
  }
  if (d.level === "high") {
    return [
      `I hear how heavy this is. I will not tell you it is fine.`,
      `Safety planning, Stanley & Brown 2012: name the warning signs, use one internal coping move, then reach a person.`,
      `988 is one tap on the bar above. Veterans, press 1.`,
      `We can ground, or we can sit in silence. You choose. I will not rush you.`,
    ].join("\n\n");
  }
  if (d.level === "elevated") {
    return [
      `The body is loud. That is information, not a verdict.`,
      `Protocol: grounding. Five things you can see. Four you can touch. We do this in Ground — hands-free if you want.`,
      `Then, this is now. That was then. You are here.`,
    ].join("\n\n");
  }
  return "";
}

export function selectProtocol(text: string, level: CrisisLevel): ProtocolId {
  if (level === "critical" || level === "high") return "safety_planning";
  const t = text.toLowerCase();
  if (t.includes("avoid") || t.includes("outside") || t.includes("fear")) return "pe";
  if (t.includes("belief") || t.includes("stuck") || t.includes("my fault")) return "cpt";
  if (t.includes("flash") || t.includes("body") || t.includes("dissoci")) return "emdr";
  if (t.includes("emotion") || t.includes("overwhelm") || t.includes("rage")) return "dbt";
  if (level === "elevated") return "grounding";
  return "presence";
}
