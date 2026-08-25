import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as CardTitle, i as CardHint, p as useInferno, r as Card, s as InfernoShell, t as Button, u as detectCrisis } from "./card-Iagpwpqf.mjs";
import { t as Badge } from "./badge-Db77KkAE.mjs";
import { n as Textarea, t as Input } from "./input-By72h04j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/emotion-DP9wn44m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function scoreTone(text) {
	const t = text.toLowerCase();
	const urgencyHits = [
		"now",
		"cant",
		"can't",
		"panic",
		"help",
		"please"
	].filter((w) => t.includes(w.replace("'", ""))).length;
	const heavy = [
		"rage",
		"shame",
		"numb",
		"empty",
		"flash",
		"afraid",
		"angry"
	].filter((w) => t.includes(w)).length;
	const light = [
		"okay",
		"steady",
		"walk",
		"better",
		"rest"
	].filter((w) => t.includes(w)).length;
	const arousal = Math.min(1, .2 + urgencyHits * .18 + heavy * .12);
	const valence = Math.max(-1, Math.min(1, (light - heavy) * .25));
	const urgency = Math.min(1, urgencyHits * .22);
	let label = "steady";
	if (urgency > .5) label = "urgent";
	else if (heavy && valence < 0) label = "heavy";
	else if (light) label = "easing";
	return {
		valence,
		arousal,
		urgency,
		label
	};
}
function EmotionPage() {
	const addEmotion = useInferno((s) => s.addEmotion);
	const addTrigger = useInferno((s) => s.addTrigger);
	const emotions = useInferno((s) => s.emotions);
	const triggers = useInferno((s) => s.triggers);
	const mark = useInferno((s) => s.mark);
	const [text, setText] = (0, import_react.useState)("");
	const [trigger, setTrigger] = (0, import_react.useState)("");
	const [soft, setSoft] = (0, import_react.useState)("Next time, lower the volume and offer Ground first.");
	const reading = (0, import_react.useMemo)(() => text ? scoreTone(text) : null, [text]);
	const crisis = text ? detectCrisis(text).level : "safe";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfernoShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary",
			children: "Emotion"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 font-display text-3xl uppercase",
			children: "Tone field"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-sm text-muted",
			children: "Multi-modal tone is scored here from language. Breath and gesture engines live on the closed-loop stack — if they are absent, this ground names it and still works."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Read the room" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Paste or speak a sentence. Inferno maps valence, arousal, urgency." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "mt-4",
					value: text,
					onChange: (e) => setText(e.target.value),
					placeholder: "The body is loud. Or it is not."
				}),
				reading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-3 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Valence",
							v: (reading.valence + 1) / 2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Arousal",
							v: reading.arousal
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Urgency",
							v: reading.urgency
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center gap-2",
					children: [reading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: crisis === "safe" ? "teal" : "ember",
						children: reading.label
					}), crisis !== "safe" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "ember",
						children: crisis
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					onClick: () => {
						if (!reading || !text.trim()) return;
						addEmotion({
							source: "typed",
							text,
							...reading
						});
						mark("emotion-tone");
					},
					children: "Log reading"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Trigger memory" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Remember what set you off last time. Soften the edges the next. Never poke it for fun." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "mt-4",
					value: trigger,
					onChange: (e) => setTrigger(e.target.value),
					placeholder: "Trigger — a door slam, a smell, a date"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "mt-2",
					value: soft,
					onChange: (e) => setSoft(e.target.value),
					placeholder: "How Inferno should soften next time"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3",
					variant: "outline",
					onClick: () => {
						if (!trigger.trim()) return;
						addTrigger(trigger.trim(), soft.trim());
						setTrigger("");
					},
					children: "Remember"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2 text-sm",
					children: triggers.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-t border-border pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: t.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-muted",
							children: t.softening
						})]
					}, t.id))
				})
			]
		}),
		emotions[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-xs text-faint",
			children: [
				"Last reading ",
				emotions[0].label,
				" · ",
				new Date(emotions[0].at).toLocaleTimeString()
			]
		})
	] });
}
function Meter({ label, v }) {
	const pct = Math.round(Math.max(0, Math.min(1, v)) * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xs uppercase tracking-wider text-muted",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 flex h-16 flex-col justify-end overflow-hidden rounded-sm bg-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full rounded-sm bg-primary",
				style: { height: `${pct}%` }
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-xs tabular-nums text-faint",
			children: pct
		})
	] });
}
//#endregion
export { EmotionPage as component };
