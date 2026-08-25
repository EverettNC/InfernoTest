export type CrisisLevel = "safe" | "elevated" | "high" | "critical";

export type ProtocolId =
  | "safety_planning"
  | "grounding"
  | "trauma_informed_care"
  | "cpt"
  | "pe"
  | "emdr"
  | "dbt"
  | "presence";

export type ActionId =
  | "CRISIS_INTERVENTION"
  | "STABILIZE"
  | "GROUND"
  | "REGULATE"
  | "COMPANION";

export type VoiceCompanion = "joanna" | "matthew";

export type GateId = "guardian" | "cortex" | "vault" | "senses";

export type TrialStatus = "idle" | "running" | "pass" | "fail" | "named";

export type Check = {
  id: string;
  label: string;
  ok: boolean;
  detail: string;
};

export type GateReport = {
  id: GateId;
  name: string;
  ranAt: number | null;
  checks: Check[];
  passCount: number;
  failCount: number;
  integrity: boolean;
  verdict: "green" | "red" | "unrun";
  namedFailures: string[];
};

export type CrisisContact = {
  id: string;
  name: string;
  tel: string;
};

export type TriggerMemory = {
  id: string;
  label: string;
  softening: string;
  createdAt: number;
};

export type CheckIn = {
  id: string;
  at: number;
  body: number;
  mind: number;
  heart: number;
  note: string;
  crisis: CrisisLevel;
};

export type ChatTurn = {
  id: string;
  role: "user" | "inferno";
  text: string;
  at: number;
  crisis: CrisisLevel;
  protocol?: ProtocolId;
  spoken?: boolean;
};

export type GroundingLog = {
  id: string;
  at: number;
  see: string[];
  touch: string[];
  hear: string[];
  smell: string[];
  taste: string[];
  complete: boolean;
};

export type EmotionReading = {
  at: number;
  source: "typed" | "voice";
  text: string;
  valence: number;
  arousal: number;
  urgency: number;
  label: string;
};

export type BridgeEvent = {
  id: string;
  at: number;
  level: CrisisLevel;
  summary: string;
  delivered: false;
  reason: string;
};

export type CapabilityId =
  | "crisis-bar"
  | "crisis-detect"
  | "protocol-select"
  | "no-diagnose"
  | "grounding"
  | "breathing"
  | "voice-listen"
  | "voice-speak"
  | "emotion-tone"
  | "trigger-memory"
  | "check-in"
  | "community"
  | "training"
  | "study-partner"
  | "music"
  | "meditation"
  | "exposure"
  | "privacy"
  | "export-wipe"
  | "bridge-queue"
  | "integrity"
  | "resources";

export type Profile = {
  callsign: string;
  voice: VoiceCompanion;
  reducedMotion: boolean;
  speakReplies: boolean;
  privacyAcceptedAt: number | null;
  contacts: CrisisContact[];
};
