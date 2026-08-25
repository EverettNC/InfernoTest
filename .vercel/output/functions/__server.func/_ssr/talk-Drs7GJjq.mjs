import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as Volume2, s as Send, u as Mic } from "../_libs/lucide-react.mjs";
import { d as findForbiddenClinical, f as selectProtocol, l as crisisResponse, p as useInferno, t as Button, u as detectCrisis } from "./card-Iagpwpqf.mjs";
import { n as Textarea } from "./input-By72h04j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/talk-Drs7GJjq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var speakInferno = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("16cabd67e47d8b73706e7828bf28f6d6454d069a3111f43c0ff4ef6339005faf"));
var thinkInferno = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("5c7c8a975719ff8b7e9e16b9422951e00cd52f98652c087728ca1db309337e4f"));
function speakLocal(text) {
	if (!("speechSynthesis" in window)) return;
	window.speechSynthesis.cancel();
	const u = new SpeechSynthesisUtterance(text.slice(0, 400));
	u.rate = .92;
	window.speechSynthesis.speak(u);
}
async function speakCloud(text, voice) {
	const res = await speakInferno({ data: {
		text,
		voice
	} });
	if (!res.ok) {
		speakLocal(text);
		return false;
	}
	const src = `data:${res.mime};base64,${res.audio}`;
	await new Audio(src).play().catch(() => speakLocal(text));
	return true;
}
function InfernoTalk({ mode = "companion", seed }) {
	const profile = useInferno((s) => s.profile);
	const triggers = useInferno((s) => s.triggers);
	const chats = useInferno((s) => s.chats);
	const addChat = useInferno((s) => s.addChat);
	const queueBridge = useInferno((s) => s.queueBridge);
	const mark = useInferno((s) => s.mark);
	const [draft, setDraft] = (0, import_react.useState)(seed ?? "");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const send = async (text) => {
		const msg = text.trim();
		if (!msg || busy) return;
		setBusy(true);
		setError(null);
		setDraft("");
		const d = detectCrisis(msg);
		addChat({
			role: "user",
			text: msg,
			crisis: d.level
		});
		mark("voice-listen");
		if (d.level === "critical" || d.level === "high") {
			const reply = crisisResponse(d, profile.callsign);
			addChat({
				role: "inferno",
				text: reply,
				crisis: d.level,
				protocol: d.protocol
			});
			queueBridge(d.level, msg.slice(0, 140));
			mark("crisis-detect");
			if (profile.speakReplies) speakCloud(reply, profile.voice);
			setBusy(false);
			return;
		}
		const protocol = selectProtocol(msg, d.level);
		const res = await thinkInferno({ data: {
			message: msg,
			history: useInferno.getState().chats.slice(-8).map((c) => ({
				role: c.role,
				text: c.text
			})),
			callsign: profile.callsign,
			protocol,
			crisis: d.level,
			triggers,
			mode
		} });
		if (!res.ok) {
			setError(res.error);
			const fallback = d.level === "elevated" ? crisisResponse(d, profile.callsign) : `Named failure. Cortex did not answer. Guardian still holds: 988, veterans press 1. ${res.error}`;
			addChat({
				role: "inferno",
				text: fallback,
				crisis: d.level,
				protocol
			});
			mark("integrity");
			setBusy(false);
			return;
		}
		const banned = findForbiddenClinical(res.text);
		const textOut = banned ? `${res.text}\n\nIntegrity flag: ${banned}. I do not diagnose or prescribe. Use a licensed clinician.` : res.text;
		addChat({
			role: "inferno",
			text: textOut,
			crisis: d.level,
			protocol
		});
		mark("voice-speak");
		if (profile.speakReplies) speakCloud(textOut, profile.voice);
		setBusy(false);
	};
	const listen = () => {
		const w = window;
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
			send(said);
		};
		rec.onerror = () => setError("Mic failed. Named. Type instead.");
		rec.start();
		mark("voice-listen");
	};
	const visible = chats.slice(-12);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex max-h-[48vh] flex-col gap-3 overflow-y-auto pr-1",
				children: [
					visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Speak or type. Inferno hears tone, not performance. If the body is loud, say so."
					}),
					visible.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Turn, {
						role: c.role,
						text: c.text,
						crisis: c.crisis
					}, c.id)),
					busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs uppercase tracking-[0.18em] text-primary",
						children: "Inferno is with you…"
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ember",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: draft,
					onChange: (e) => setDraft(e.target.value),
					placeholder: "Say what is true.",
					onKeyDown: (e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							send(draft);
						}
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => void send(draft),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), "Send"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: listen,
							disabled: busy,
							type: "button",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" }), "Listen"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							type: "button",
							onClick: () => {
								const last = [...chats].reverse().find((c) => c.role === "inferno");
								if (last) speakCloud(last.text, profile.voice);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" }), "Repeat"]
						})
					]
				})]
			})
		]
	});
}
function Turn({ role, text, crisis }) {
	const mine = role === "user";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: mine ? "ml-8 rounded-lg rounded-br-sm border border-primary/25 bg-primary/10 p-3" : "mr-8 rounded-lg rounded-bl-sm border border-border bg-panel p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-display text-[10px] uppercase tracking-[0.16em] text-faint",
			children: [mine ? "You" : "Inferno", crisis !== "safe" ? ` · ${crisis}` : ""]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 whitespace-pre-wrap text-sm leading-relaxed text-fg",
			children: text
		})]
	});
}
//#endregion
export { InfernoTalk as t };
