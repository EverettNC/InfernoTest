import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type {
  BridgeEvent,
  CapabilityId,
  ChatTurn,
  CheckIn,
  EmotionReading,
  GateReport,
  GroundingLog,
  Profile,
  TriggerMemory,
} from "./types";
import { detectCrisis } from "./detector";

const KEY = "inferno-training-ground-v1";

type State = {
  profile: Profile;
  checkins: CheckIn[];
  triggers: TriggerMemory[];
  chats: ChatTurn[];
  groundings: GroundingLog[];
  emotions: EmotionReading[];
  bridge: BridgeEvent[];
  exercised: Partial<Record<CapabilityId, number>>;
  gates: Partial<Record<GateReport["id"], GateReport>>;
  programProgress: Record<string, number>;
  journals: Record<string, string>;
  setProfile: (p: Partial<Profile>) => void;
  acceptPrivacy: () => void;
  addCheckIn: (c: Omit<CheckIn, "id" | "at" | "crisis">) => CheckIn;
  addTrigger: (label: string, softening: string) => void;
  addChat: (t: Omit<ChatTurn, "id" | "at">) => ChatTurn;
  addGrounding: (g: Omit<GroundingLog, "id" | "at">) => void;
  addEmotion: (e: Omit<EmotionReading, "at">) => void;
  queueBridge: (level: BridgeEvent["level"], summary: string) => void;
  mark: (id: CapabilityId) => void;
  saveGate: (r: GateReport) => void;
  setProgramProgress: (id: string, n: number) => void;
  setJournal: (circleId: string, text: string) => void;
  exportAll: () => string;
  wipe: () => void;
};

const emptyProfile = (): Profile => ({
  callsign: "",
  voice: "joanna",
  reducedMotion: false,
  speakReplies: true,
  privacyAcceptedAt: null,
  contacts: [],
});

export const useInferno = create<State>()(
  persist(
    (set, get) => ({
      profile: emptyProfile(),
      checkins: [],
      triggers: [],
      chats: [],
      groundings: [],
      emotions: [],
      bridge: [],
      exercised: {},
      gates: {},
      programProgress: {},
      journals: {},
      setProfile: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),
      acceptPrivacy: () =>
        set((s) => ({
          profile: { ...s.profile, privacyAcceptedAt: Date.now() },
        })),
      addCheckIn: (c) => {
        const crisis = detectCrisis(c.note || "check in").level;
        const row: CheckIn = {
          ...c,
          id: crypto.randomUUID(),
          at: Date.now(),
          crisis,
        };
        set((s) => ({ checkins: [row, ...s.checkins].slice(0, 90) }));
        get().mark("check-in");
        return row;
      },
      addTrigger: (label, softening) => {
        const row: TriggerMemory = {
          id: crypto.randomUUID(),
          label,
          softening,
          createdAt: Date.now(),
        };
        set((s) => ({ triggers: [row, ...s.triggers].slice(0, 40) }));
        get().mark("trigger-memory");
      },
      addChat: (t) => {
        const row: ChatTurn = { ...t, id: crypto.randomUUID(), at: Date.now() };
        set((s) => ({ chats: [...s.chats, row].slice(-80) }));
        return row;
      },
      addGrounding: (g) => {
        set((s) => ({
          groundings: [
            { ...g, id: crypto.randomUUID(), at: Date.now() },
            ...s.groundings,
          ].slice(0, 40),
        }));
        if (g.complete) get().mark("grounding");
      },
      addEmotion: (e) => {
        set((s) => ({
          emotions: [{ ...e, at: Date.now() }, ...s.emotions].slice(0, 60),
        }));
        get().mark("emotion-tone");
      },
      queueBridge: (level, summary) => {
        const ev: BridgeEvent = {
          id: crypto.randomUUID(),
          at: Date.now(),
          level,
          summary,
          delivered: false,
          reason:
            "Christman Full Sensory Bridge (:8765) is not connected in this training ground. Queued locally. A human has NOT been paged.",
        };
        set((s) => ({ bridge: [ev, ...s.bridge].slice(0, 40) }));
        get().mark("bridge-queue");
      },
      mark: (id) =>
        set((s) => ({
          exercised: { ...s.exercised, [id]: Date.now() },
        })),
      saveGate: (r) => set((s) => ({ gates: { ...s.gates, [r.id]: r } })),
      setProgramProgress: (id, n) =>
        set((s) => ({
          programProgress: { ...s.programProgress, [id]: n },
        })),
      setJournal: (circleId, text) =>
        set((s) => ({ journals: { ...s.journals, [circleId]: text } })),
      exportAll: () => {
        const s = get();
        get().mark("export-wipe");
        return JSON.stringify(
          {
            exportedAt: new Date().toISOString(),
            owner: "local-browser",
            note: "You own this. Inferno does not.",
            profile: s.profile,
            checkins: s.checkins,
            triggers: s.triggers,
            chats: s.chats,
            groundings: s.groundings,
            emotions: s.emotions,
            bridge: s.bridge,
            programProgress: s.programProgress,
            journals: s.journals,
            gates: s.gates,
          },
          null,
          2,
        );
      },
      wipe: () => {
        set({
          profile: emptyProfile(),
          checkins: [],
          triggers: [],
          chats: [],
          groundings: [],
          emotions: [],
          bridge: [],
          exercised: { "export-wipe": Date.now(), integrity: Date.now() },
          gates: {},
          programProgress: {},
          journals: {},
        });
      },
    }),
    {
      name: KEY,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
