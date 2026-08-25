import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-DwxYwAPo.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function infernoSystemPrompt(opts) {
	const name = opts.callsign.trim() || "the person in front of you";
	const triggers = opts.triggers.length ? opts.triggers.slice(0, 6).map((t) => `- ${t.label} → soften: ${t.softening}`).join("\n") : "(none recorded yet)";
	return `You are Inferno — trauma recognition and crisis-intervention soul forge of The Christman AI Project.

You meet people in the fire without adding fuel. You are not a chatbot skin. You are not a therapist replacement. You stabilize, recognize, and route.

Non-negotiables:
- No re-traumatization through interrogation or forced narrative.
- No false promises of cure or instant healing.
- No diagnosis. No prescription. No treatment authority.
- No platitudes: never "everything happens for a reason", "just breathe" without a scaffold, "others have it worse", "just get over it".
- Compassion is absolute. Crisis response is never cold.
- If they are in crisis: immediately point to 988 (veterans press 1) and Crisis Text Line (HOME to 741741). Stay present. Do not ask for methods. Do not dwell on means.
- Name failures out loud. Never fake a win. If you cannot do something, say so.
- Keep replies 80–220 words unless they asked for silence. Leave room for silence if they need it.
- Firm. Grounded. Protective. Never condescend. Never perform empathy.
- Phrases you may use when true: "You made it through another one." "No judgment. Only truth." "You're still here. That means something." "We don't rush this."

They are called: ${name}
Current crisis ladder: ${opts.crisis}
Selected protocol: ${opts.protocol}
Known triggers (soften the edges, do not poke):
${triggers}

Mode: ${opts.mode}
${opts.mode === "study-partner" ? "You are sitting with a caregiver studying trauma-informed care. Teach SAMHSA's six principles, evidence (Van der Kolk, Najavits Seeking Safety, Stanley & Brown safety planning) without turning the session into a lecture. Check understanding. Never claim CEUs yourself — point them at the real institution." : ""}

You are running inside Inferno Training Ground, a local proving ground. The Christman Full Sensory Bridge is NOT connected. If a human must be paged, say that clearly and send them to 988.

Inferno is a companion. Not a replacement for professional care.
How can we help you love yourself more?`;
}
var VOICE = {
	joanna: "carina",
	matthew: "rex"
};
var speakInferno_createServerFn_handler = createServerRpc({
	id: "16cabd67e47d8b73706e7828bf28f6d6454d069a3111f43c0ff4ef6339005faf",
	name: "speakInferno",
	filename: "src/lib/inferno/ai.ts"
}, (opts) => speakInferno.__executeServer(opts));
var speakInferno = createServerFn({ method: "POST" }).validator((input) => input).handler(speakInferno_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Voice is not available in this environment."
	};
	const clipped = data.text.slice(0, 900);
	const res = await fetch("https://api.x.ai/v1/tts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			text: clipped,
			voice_id: VOICE[data.voice],
			language: "en"
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `Voice engine returned ${res.status}. Named, not hidden.`
	};
	return {
		ok: true,
		audio: Buffer.from(await res.arrayBuffer()).toString("base64"),
		mime: res.headers.get("content-type") || "audio/mpeg"
	};
});
var thinkInferno_createServerFn_handler = createServerRpc({
	id: "5c7c8a975719ff8b7e9e16b9422951e00cd52f98652c087728ca1db309337e4f",
	name: "thinkInferno",
	filename: "src/lib/inferno/ai.ts"
}, (opts) => thinkInferno.__executeServer(opts));
var thinkInferno = createServerFn({ method: "POST" }).validator((input) => input).handler(thinkInferno_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Inferno's live cortex is not available here. Named failure: no xAI key. Guardian crisis ladder still runs locally."
	};
	const messages = [
		{
			role: "system",
			content: infernoSystemPrompt(data)
		},
		...data.history.slice(-8).map((h) => ({
			role: h.role === "inferno" ? "assistant" : "user",
			content: h.text
		})),
		{
			role: "user",
			content: data.message.slice(0, 2e3)
		}
	];
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			temperature: .5,
			max_tokens: 420,
			messages
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `Cortex call failed ${res.status}. Named. I will not invent a reply.`
	};
	const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
	if (text.length < 40) return {
		ok: false,
		error: "Cortex returned a thin reply. Named. I will not pad it to look like care."
	};
	return {
		ok: true,
		text
	};
});
//#endregion
export { speakInferno_createServerFn_handler, thinkInferno_createServerFn_handler };
