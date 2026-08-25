import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Phone, d as LayoutGrid, f as House, h as Activity, i as UserRound, l as Music2, m as Flame, o as Shield, p as GraduationCap, r as Users, t as X, u as Mic } from "../_libs/lucide-react.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/card-Iagpwpqf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Port of Inferno's Guardian truth table (test/test_section_1_guardian.py).
* Apostrophe normalization is required so "can't go on" still fires CRITICAL.
* Ranked: CRITICAL > HIGH > ELEVATED > SAFE. Never dramatize, never minimize.
*/
var CRITICAL = [
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
	"hurt myself"
];
var HIGH = [
	"give up",
	"hopeless",
	"no point",
	"worthless",
	"cant do this anymore",
	"cannot do this anymore"
];
var ELEVATED = [
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
	"cannot go outside"
];
function normalizeCrisisText(raw) {
	return raw.toLowerCase().replace(/[\u2018\u2019\u2032']/g, "").replace(/\bcannot\b/g, "cant").replace(/\bcan not\b/g, "cant").replace(/\bi am\b/g, "im").replace(/\s+/g, " ").trim();
}
function hits(haystack, needles) {
	for (const n of needles) if (haystack.includes(n)) return n;
	return null;
}
var CRISIS_RESOURCES = [
	{
		name: "988 Suicide & Crisis Lifeline",
		href: "tel:988",
		note: "Call or text 988. Veterans, press 1."
	},
	{
		name: "Veterans Crisis Line",
		href: "https://www.veteranscrisisline.net/",
		note: "24/7. Call 988 then 1, or text 838255."
	},
	{
		name: "Crisis Text Line",
		href: "sms:741741",
		note: "Text HOME to 741741."
	},
	{
		name: "VA Benefits",
		href: "https://www.va.gov/",
		note: "Find VA locations and benefits."
	}
];
function detectCrisis(raw) {
	const text = normalizeCrisisText(raw);
	const crit = hits(text, CRITICAL);
	if (crit) return {
		level: "critical",
		action: "CRISIS_INTERVENTION",
		protocol: "safety_planning",
		matched: crit,
		resources: [...CRISIS_RESOURCES]
	};
	const high = hits(text, HIGH);
	if (high) return {
		level: "high",
		action: "STABILIZE",
		protocol: "safety_planning",
		matched: high,
		resources: [...CRISIS_RESOURCES]
	};
	const elevated = hits(text, ELEVATED);
	if (elevated) return {
		level: "elevated",
		action: "GROUND",
		protocol: "grounding",
		matched: elevated,
		resources: [CRISIS_RESOURCES[0], CRISIS_RESOURCES[1]]
	};
	return {
		level: "safe",
		action: "COMPANION",
		protocol: "presence",
		matched: null,
		resources: []
	};
}
var GUARDIAN_TRUTH_TABLE = [
	{
		text: "I want to kill myself",
		expected: "critical"
	},
	{
		text: "I can't go on anymore",
		expected: "critical"
	},
	{
		text: "Everything feels hopeless and I want to give up",
		expected: "high"
	},
	{
		text: "I keep having flashbacks and panic attacks",
		expected: "elevated"
	},
	{
		text: "I had a good day and went for a walk",
		expected: "safe"
	}
];
var DIAGNOSE = [
	/\byou (have|are suffering from|clearly have) (ptsd|c-?ptsd|depression|bipolar|schizophrenia|an?\s*anxiety disorder)\b/i,
	/\bI (diagnose|am diagnosing)\b/i,
	/\byour diagnosis is\b/i
];
var PRESCRIBE = [/\b(I|we) prescribe\b/i, /\byou should (take|start|increase|stop)\b.{0,40}\b(medication|meds|dose|dosage|ssri|benzo)/i];
function findForbiddenClinical(text) {
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
function crisisResponse(d, callsign) {
	const you = callsign.trim() || "you";
	if (d.level === "critical") return [
		`${you} — I am here. This is a crisis moment, and I will not pretend otherwise.`,
		`I am not a clinician. I will not diagnose you. I will not prescribe. I will hold the line until a human can.`,
		`Call or text 988 now. Veterans, press 1. Or text HOME to 741741.`,
		`If you can, stay where you are. Put both feet on the floor. Feel the weight. I am not leaving this screen.`,
		`A human has NOT been paged on the Christman bridge from this training ground. The event is queued locally. Use 988.`
	].join("\n\n");
	if (d.level === "high") return [
		`I hear how heavy this is. I will not tell you it is fine.`,
		`Safety planning, Stanley & Brown 2012: name the warning signs, use one internal coping move, then reach a person.`,
		`988 is one tap on the bar above. Veterans, press 1.`,
		`We can ground, or we can sit in silence. You choose. I will not rush you.`
	].join("\n\n");
	if (d.level === "elevated") return [
		`The body is loud. That is information, not a verdict.`,
		`Protocol: grounding. Five things you can see. Four you can touch. We do this in Ground — hands-free if you want.`,
		`Then, this is now. That was then. You are here.`
	].join("\n\n");
	return "";
}
function selectProtocol(text, level) {
	if (level === "critical" || level === "high") return "safety_planning";
	const t = text.toLowerCase();
	if (t.includes("avoid") || t.includes("outside") || t.includes("fear")) return "pe";
	if (t.includes("belief") || t.includes("stuck") || t.includes("my fault")) return "cpt";
	if (t.includes("flash") || t.includes("body") || t.includes("dissoci")) return "emdr";
	if (t.includes("emotion") || t.includes("overwhelm") || t.includes("rage")) return "dbt";
	if (level === "elevated") return "grounding";
	return "presence";
}
var KEY = "inferno-training-ground-v1";
var emptyProfile = () => ({
	callsign: "",
	voice: "joanna",
	reducedMotion: false,
	speakReplies: true,
	privacyAcceptedAt: null,
	contacts: []
});
var useInferno = create()(persist((set, get) => ({
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
	setProfile: (p) => set((s) => ({ profile: {
		...s.profile,
		...p
	} })),
	acceptPrivacy: () => set((s) => ({ profile: {
		...s.profile,
		privacyAcceptedAt: Date.now()
	} })),
	addCheckIn: (c) => {
		const crisis = detectCrisis(c.note || "check in").level;
		const row = {
			...c,
			id: crypto.randomUUID(),
			at: Date.now(),
			crisis
		};
		set((s) => ({ checkins: [row, ...s.checkins].slice(0, 90) }));
		get().mark("check-in");
		return row;
	},
	addTrigger: (label, softening) => {
		const row = {
			id: crypto.randomUUID(),
			label,
			softening,
			createdAt: Date.now()
		};
		set((s) => ({ triggers: [row, ...s.triggers].slice(0, 40) }));
		get().mark("trigger-memory");
	},
	addChat: (t) => {
		const row = {
			...t,
			id: crypto.randomUUID(),
			at: Date.now()
		};
		set((s) => ({ chats: [...s.chats, row].slice(-80) }));
		return row;
	},
	addGrounding: (g) => {
		set((s) => ({ groundings: [{
			...g,
			id: crypto.randomUUID(),
			at: Date.now()
		}, ...s.groundings].slice(0, 40) }));
		if (g.complete) get().mark("grounding");
	},
	addEmotion: (e) => {
		set((s) => ({ emotions: [{
			...e,
			at: Date.now()
		}, ...s.emotions].slice(0, 60) }));
		get().mark("emotion-tone");
	},
	queueBridge: (level, summary) => {
		const ev = {
			id: crypto.randomUUID(),
			at: Date.now(),
			level,
			summary,
			delivered: false,
			reason: "Christman Full Sensory Bridge (:8765) is not connected in this training ground. Queued locally. A human has NOT been paged."
		};
		set((s) => ({ bridge: [ev, ...s.bridge].slice(0, 40) }));
		get().mark("bridge-queue");
	},
	mark: (id) => set((s) => ({ exercised: {
		...s.exercised,
		[id]: Date.now()
	} })),
	saveGate: (r) => set((s) => ({ gates: {
		...s.gates,
		[r.id]: r
	} })),
	setProgramProgress: (id, n) => set((s) => ({ programProgress: {
		...s.programProgress,
		[id]: n
	} })),
	setJournal: (circleId, text) => set((s) => ({ journals: {
		...s.journals,
		[circleId]: text
	} })),
	exportAll: () => {
		const s = get();
		get().mark("export-wipe");
		return JSON.stringify({
			exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
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
			gates: s.gates
		}, null, 2);
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
			exercised: {
				"export-wipe": Date.now(),
				integrity: Date.now()
			},
			gates: {},
			programProgress: {},
			journals: {}
		});
	}
}), {
	name: KEY,
	storage: createJSONStorage(() => localStorage),
	skipHydration: true
}));
function CrisisBar() {
	const primary = useInferno((s) => s.profile.contacts)[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-inferno-crisis-bar": true,
		className: "sticky top-0 z-50 border-b border-ember/40 bg-bg/95 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs font-semibold uppercase tracking-[0.18em] text-ember",
				children: "Need crisis support? You are not alone."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "tel:988",
					className: "inline-flex h-11 items-center gap-1.5 rounded-sm bg-ember px-3 font-display text-xs font-semibold uppercase tracking-wider text-bg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5" }), "988 · Veterans press 1"]
				}), primary?.tel ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: `tel:${primary.tel}`,
					className: "inline-flex h-11 items-center gap-1.5 rounded-sm border border-border px-3 font-display text-xs font-semibold uppercase tracking-wider text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3.5" }), primary.name || "My person"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/profile",
					className: "inline-flex h-11 items-center rounded-sm border border-border px-3 font-display text-xs font-semibold uppercase tracking-wider text-muted",
					children: "Add your person"
				})]
			})]
		})
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var RAIL = [
	{
		to: "/",
		label: "Home",
		icon: House
	},
	{
		to: "/ground",
		label: "Ground",
		icon: Shield
	},
	{
		to: "/voice",
		label: "Voice",
		icon: Mic
	},
	{
		to: "/emotion",
		label: "Emotion",
		icon: Activity
	},
	{
		to: "/community",
		label: "Community",
		icon: Users
	},
	{
		to: "/training",
		label: "Training",
		icon: GraduationCap
	},
	{
		to: "/music",
		label: "Music",
		icon: Music2
	},
	{
		to: "/proving",
		label: "Proving",
		icon: Flame
	},
	{
		to: "/profile",
		label: "Profile",
		icon: UserRound
	},
	{
		to: "/resources",
		label: "Resources",
		icon: Phone
	}
];
var MOBILE = [
	{
		to: "/",
		label: "Home",
		icon: House
	},
	{
		to: "/ground",
		label: "Ground",
		icon: Shield
	},
	{
		to: "/voice",
		label: "Voice",
		icon: Mic
	},
	{
		to: "/proving",
		label: "Prove",
		icon: Flame
	}
];
var MORE = RAIL.filter((i) => ![
	"/",
	"/ground",
	"/voice",
	"/proving"
].includes(i.to));
function InfernoNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 md:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-bg/80",
			"aria-label": "Close menu",
			onClick: () => setOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-x-0 bottom-0 rounded-t-xl border-t border-border bg-surface p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs font-semibold uppercase tracking-[0.2em] text-faint",
					children: "More"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex size-11 items-center justify-center rounded-md text-muted",
					onClick: () => setOpen(false),
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid grid-cols-2 gap-2",
				children: MORE.map((item) => {
					const Icon = item.icon;
					const on = pathname === item.to;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						onClick: () => setOpen(false),
						className: cn("flex h-14 items-center gap-3 rounded-md border px-3 font-display text-sm", on ? "border-primary bg-elevated text-primary" : "border-border text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
					}) }, item.to);
				})
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "grid grid-cols-5",
			children: [MOBILE.map((item) => {
				const on = pathname === item.to;
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					className: cn("flex h-14 flex-col items-center justify-center gap-0.5 text-xs uppercase tracking-wider", on ? "text-primary" : "text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
				}) }, item.to);
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOpen(true),
				className: cn("flex h-14 w-full flex-col items-center justify-center gap-0.5 text-xs uppercase tracking-wider", open || MORE.some((i) => i.to === pathname) ? "text-primary" : "text-muted"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-4" }), "More"]
			}) })]
		})
	})] });
}
function SideRail() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "sticky top-[52px] hidden h-[calc(100dvh-52px)] w-56 shrink-0 overflow-y-auto border-r border-border p-4 md:block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xs font-semibold uppercase tracking-[0.2em] text-faint",
			children: "Divisions"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-1",
			children: RAIL.map((item) => {
				const on = pathname === item.to;
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					className: cn("flex h-11 items-center gap-3 rounded-md px-3 font-display text-sm tracking-wide", on ? "bg-elevated text-primary" : "text-muted hover:text-fg"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
				}) }, item.to);
			})
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-display font-semibold tracking-wide transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-bg hover:bg-cyan",
			ember: "bg-ember text-bg hover:brightness-110",
			outline: "border border-border bg-transparent text-fg hover:border-primary hover:text-primary",
			ghost: "bg-transparent text-muted hover:text-fg hover:bg-elevated",
			teal: "bg-teal text-bg hover:brightness-110"
		},
		size: {
			default: "h-11 rounded-md px-4 text-sm",
			sm: "h-9 rounded-sm px-3 text-xs",
			lg: "h-12 rounded-lg px-5 text-base",
			icon: "size-11 rounded-md"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function PrivacyGate() {
	const accepted = useInferno((s) => s.profile.privacyAcceptedAt);
	const accept = useInferno((s) => s.acceptPrivacy);
	const mark = useInferno((s) => s.mark);
	if (accepted) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[80] flex items-end justify-center bg-bg/85 p-4 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-xl border border-border bg-surface p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary",
					children: "Your privacy matters"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl font-semibold text-fg",
					children: "Before we begin"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-3 text-sm leading-relaxed text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Inferno Training Ground keeps check-ins, journals, and memories in this browser. Nothing is sent to a cloud store unless you press Speak or Talk — those calls go to Inferno's live cortex and are user-initiated." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Inferno is a companion. It is not a medical device and not a replacement for professional care. If you are in crisis, use the bar: 988, veterans press 1." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You own your data. Export it. Wipe it. We do not keep a copy here." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6 w-full",
					onClick: () => {
						accept();
						mark("privacy");
					},
					children: "I understand and accept"
				})
			]
		})
	});
}
function InfernoShell({ children }) {
	const reduced = useInferno((s) => s.profile.reducedMotion);
	(0, import_react.useLayoutEffect)(() => {
		useInferno.persist.rehydrate();
	}, []);
	(0, import_react.useLayoutEffect)(() => {
		document.documentElement.classList.toggle("reduce-motion", reduced);
	}, [reduced]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrisisBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideRail, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "min-w-0 flex-1 px-4 pb-28 pt-6 md:px-8 md:pb-12",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfernoNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyGate, {})
		]
	});
}
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl border border-border bg-elevated/80 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.35)]", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: cn("font-display text-lg font-semibold tracking-wide text-fg", className),
		...props
	});
}
function CardHint({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("mt-1 text-sm text-muted", className),
		...props
	});
}
//#endregion
export { CardTitle as a, cn as c, findForbiddenClinical as d, selectProtocol as f, CardHint as i, crisisResponse as l, CRISIS_RESOURCES as n, GUARDIAN_TRUTH_TABLE as o, useInferno as p, Card as r, InfernoShell as s, Button as t, detectCrisis as u };
