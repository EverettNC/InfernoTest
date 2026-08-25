import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as CardTitle, i as CardHint, p as useInferno, r as Card, s as InfernoShell, t as Button } from "./card-Iagpwpqf.mjs";
import { t as Input } from "./input-By72h04j.mjs";
import { t as Progress } from "./progress-Di0gP0Yt.mjs";
import { t as breathTick } from "./audio-BXC__zID.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ground-DOymvIss.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	{
		key: "see",
		count: 5,
		prompt: "Five things you can see"
	},
	{
		key: "touch",
		count: 4,
		prompt: "Four things you can touch"
	},
	{
		key: "hear",
		count: 3,
		prompt: "Three things you can hear"
	},
	{
		key: "smell",
		count: 2,
		prompt: "Two things you can smell"
	},
	{
		key: "taste",
		count: 1,
		prompt: "One thing you can taste"
	}
];
var LADDER = [
	{
		id: 1,
		label: "Think about the place"
	},
	{
		id: 2,
		label: "Look at a photo of it"
	},
	{
		id: 3,
		label: "Stand near the door"
	},
	{
		id: 4,
		label: "Step outside for one minute"
	},
	{
		id: 5,
		label: "Walk the block and return"
	},
	{
		id: 6,
		label: "Stay for five minutes"
	}
];
function GroundPage() {
	const addGrounding = useInferno((s) => s.addGrounding);
	const mark = useInferno((s) => s.mark);
	const [step, setStep] = (0, import_react.useState)(0);
	const [values, setValues] = (0, import_react.useState)({
		see: [],
		touch: [],
		hear: [],
		smell: [],
		taste: []
	});
	const [draft, setDraft] = (0, import_react.useState)("");
	const [phase, setPhase] = (0, import_react.useState)("in");
	const [breathing, setBreathing] = (0, import_react.useState)(false);
	const [handsFree, setHandsFree] = (0, import_react.useState)(false);
	const [rung, setRung] = (0, import_react.useState)(1);
	const [suds, setSuds] = (0, import_react.useState)(5);
	const [logged, setLogged] = (0, import_react.useState)(null);
	const stopRef = (0, import_react.useRef)(null);
	const current = STEPS[step];
	(0, import_react.useEffect)(() => {
		if (!handsFree || !current) return;
		if (!("speechSynthesis" in window)) return;
		const u = new SpeechSynthesisUtterance(`${current.prompt}. Name them slowly. I will wait.`);
		u.rate = .9;
		window.speechSynthesis.cancel();
		window.speechSynthesis.speak(u);
	}, [handsFree, current]);
	(0, import_react.useEffect)(() => () => {
		stopRef.current?.();
	}, []);
	const addItem = () => {
		if (!current || !draft.trim()) return;
		const next = {
			...values,
			[current.key]: [...values[current.key], draft.trim()].slice(0, current.count)
		};
		setValues(next);
		setDraft("");
		if (next[current.key].length >= current.count) {
			if (step < STEPS.length - 1) setStep(step + 1);
			else addGrounding({
				see: next.see,
				touch: next.touch,
				hear: next.hear,
				smell: next.smell,
				taste: next.taste,
				complete: true
			});
		}
	};
	const complete = values.taste.length >= 1 && values.see.length >= 5;
	const filled = STEPS.reduce((n, s) => n + values[s.key].length, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfernoShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary",
			children: "Ground"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 font-display text-3xl uppercase",
			children: "Five senses"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-sm text-muted",
			children: "Najavits 2002 · Seeking Safety. Hands-free if the hands are busy. Then, this is now."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
			className: "mt-6",
			value: filled / 15 * 100,
			tone: "teal"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: current?.prompt }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHint, { children: [
					values[current?.key ?? "see"].length,
					"/",
					current?.count,
					" named"
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-1 text-sm",
					children: values[current?.key ?? "see"].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-fg",
						children: v
					}, v))
				}),
				!complete && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: draft,
						onChange: (e) => setDraft(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") addItem();
						},
						placeholder: "Name one."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: addItem,
						children: "Add"
					})]
				}),
				complete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-teal",
					children: "Complete. You came back. That is the whole drill."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "mt-4",
					onClick: () => setHandsFree((v) => !v),
					children: handsFree ? "Hands-free on" : "Hands-free voice prompts"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Breath pacer" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Four in. One hold. Six out. Barlow panic control pattern." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto my-8 size-36 rounded-full border border-primary/40 bg-primary/10 transition-transform duration-1000",
					style: { transform: phase === "in" ? "scale(1.08)" : phase === "out" ? "scale(0.92)" : "scale(1)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center font-display text-xl uppercase tracking-[0.2em] text-primary",
					children: breathing ? phase === "in" ? "In" : phase === "out" ? "Out" : "Hold" : "Still"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mx-auto mt-4 flex",
					variant: breathing ? "ember" : "default",
					onClick: () => {
						if (breathing) {
							stopRef.current?.();
							stopRef.current = null;
							setBreathing(false);
							return;
						}
						mark("breathing");
						stopRef.current = breathTick(4, 6, setPhase);
						setBreathing(true);
					},
					children: breathing ? "Stop" : "Begin 4-6"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Gradual exposure" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Foa PE ladder, shortened. You choose the rung. Inferno does not push. SUDS 0–10." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 space-y-2",
					children: LADDER.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setRung(r.id),
						className: `flex h-11 w-full items-center justify-between rounded-md border px-3 text-left text-sm ${rung === r.id ? "border-primary text-primary" : "border-border text-muted"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							r.id,
							". ",
							r.label
						] }), rung === r.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xs uppercase",
							children: "now"
						})]
					}) }, r.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex justify-between font-display text-xs uppercase tracking-wider text-muted",
						children: ["SUDS now", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-fg",
							children: suds
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 10,
						value: suds,
						onChange: (e) => setSuds(Number(e.target.value)),
						className: "mt-1 w-full accent-primary"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3",
					variant: "outline",
					onClick: () => {
						mark("exposure");
						setLogged(`Rung ${rung} · SUDS ${suds}. Stay. Do not jump rungs.`);
					},
					children: "Log this rung"
				}),
				logged && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-teal",
					children: logged
				})
			]
		})
	] });
}
//#endregion
export { GroundPage as component };
