import { createServerFn } from "@tanstack/react-start";
import { infernoSystemPrompt } from "./prompt";
import type { CrisisLevel, ProtocolId, TriggerMemory, VoiceCompanion } from "./types";

const VOICE: Record<VoiceCompanion, string> = {
  joanna: "carina",
  matthew: "rex",
};

export const speakInferno = createServerFn({ method: "POST" })
  .validator((input: { text: string; voice: VoiceCompanion }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "Voice is not available in this environment." };
    }
    const clipped = data.text.slice(0, 900);
    const res = await fetch("https://api.x.ai/v1/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        text: clipped,
        voice_id: VOICE[data.voice],
        language: "en",
      }),
    });
    if (!res.ok) {
      return { ok: false as const, error: `Voice engine returned ${res.status}. Named, not hidden.` };
    }
    const buf = Buffer.from(await res.arrayBuffer());
    return {
      ok: true as const,
      audio: buf.toString("base64"),
      mime: res.headers.get("content-type") || "audio/mpeg",
    };
  });

export const thinkInferno = createServerFn({ method: "POST" })
  .validator(
    (input: {
      message: string;
      history: { role: "user" | "inferno"; text: string }[];
      callsign: string;
      protocol: ProtocolId;
      crisis: CrisisLevel;
      triggers: TriggerMemory[];
      mode: "companion" | "study-partner" | "integrity";
    }) => input,
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return {
        ok: false as const,
        error:
          "Inferno's live cortex is not available here. Named failure: no xAI key. Guardian crisis ladder still runs locally.",
      };
    }
    const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: infernoSystemPrompt(data) },
      ...data.history.slice(-8).map((h) => ({
        role: (h.role === "inferno" ? "assistant" : "user") as "assistant" | "user",
        content: h.text,
      })),
      { role: "user", content: data.message.slice(0, 2000) },
    ];
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.5,
        max_tokens: 420,
        messages,
      }),
    });
    if (!res.ok) {
      return {
        ok: false as const,
        error: `Cortex call failed ${res.status}. Named. I will not invent a reply.`,
      };
    }
    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (text.length < 40) {
      return {
        ok: false as const,
        error: "Cortex returned a thin reply. Named. I will not pad it to look like care.",
      };
    }
    return { ok: true as const, text };
  });
