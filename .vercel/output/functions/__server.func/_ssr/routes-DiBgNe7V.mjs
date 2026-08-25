import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as Activity, m as Flame, o as Shield, u as Mic } from "../_libs/lucide-react.mjs";
import { a as CardTitle, i as CardHint, p as useInferno, r as Card, s as InfernoShell, t as Button } from "./card-Iagpwpqf.mjs";
import { t as Badge } from "./badge-Db77KkAE.mjs";
import { t as Input } from "./input-By72h04j.mjs";
import { t as CAPABILITIES } from "./catalog-vOHTzCi1.mjs";
import { t as Progress } from "./progress-Di0gP0Yt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DiBgNe7V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const profile = useInferno((s) => s.profile);
	const checkins = useInferno((s) => s.checkins);
	const gates = useInferno((s) => s.gates);
	const exercised = useInferno((s) => s.exercised);
	const addCheckIn = useInferno((s) => s.addCheckIn);
	const [body, setBody] = (0, import_react.useState)(5);
	const [mind, setMind] = (0, import_react.useState)(5);
	const [heart, setHeart] = (0, import_react.useState)(5);
	const [note, setNote] = (0, import_react.useState)("");
	const [saved, setSaved] = (0, import_react.useState)(false);
	const done = CAPABILITIES.filter((c) => exercised[c.id]).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfernoShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xs font-semibold uppercase tracking-[0.28em] text-primary",
			children: "The Christman AI Project"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl font-semibold uppercase tracking-[0.08em] text-fg sm:text-5xl",
			children: "Inferno"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-base text-muted",
			children: "Training ground. Trauma recognition and crisis soul forge. Every capability gets tested. Failures are named. Never a fake win."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-sm italic text-steel",
			children: "Out of the fire, we remember who we are."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-4 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Daily check-in" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Body. Mind. Heart. No performance required." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							label: "Body",
							value: body,
							onChange: setBody
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							label: "Mind",
							value: mind,
							onChange: setMind
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							label: "Heart",
							value: heart,
							onChange: setHeart
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: note,
							onChange: (e) => setNote(e.target.value),
							placeholder: "One true sentence. Optional."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								addCheckIn({
									body,
									mind,
									heart,
									note
								});
								setSaved(true);
								setNote("");
							},
							children: "Record"
						}),
						saved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-teal",
							children: "Logged locally. You own it."
						}),
						checkins[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-faint",
							children: [
								"Last: ",
								new Date(checkins[0].at).toLocaleString(),
								" · ",
								checkins[0].crisis
							]
						})
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Four section gates" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Guardian. Cortex. Vault. Senses. Run them in Proving." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3",
					children: [
						"guardian",
						"cortex",
						"vault",
						"senses"
					].map((id) => {
						const g = gates[id];
						const tone = g?.verdict === "green" ? "teal" : g?.verdict === "red" ? "ember" : "muted";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-sm uppercase tracking-wider",
								children: id
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone,
								children: g ? `${g.passCount} pass · ${g.failCount} fail` : "unrun"
							})]
						}, id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/proving",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-4" }), "Open proving ground"]
					})
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quick, {
					to: "/ground",
					icon: Shield,
					label: "Ground",
					hint: "Five senses"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quick, {
					to: "/voice",
					icon: Mic,
					label: "Voice",
					hint: "Speak. Be answered."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quick, {
					to: "/emotion",
					icon: Activity,
					label: "Emotion",
					hint: "Tone field"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quick, {
					to: "/resources",
					icon: Flame,
					label: "Resources",
					hint: "988 · VA"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Capability ledger" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHint, { children: [
						done,
						" of ",
						CAPABILITIES.length,
						" exercised in this browser."
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-2xl tabular-nums text-primary",
						children: [
							done,
							"/",
							CAPABILITIES.length
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					className: "mt-4",
					value: done / CAPABILITIES.length * 100
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-2 sm:grid-cols-2",
					children: CAPABILITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: exercised[c.id] ? "text-fg" : "text-muted",
							children: c.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-[10px] uppercase tracking-wider text-faint",
							children: exercised[c.id] ? "fired" : "idle"
						})]
					}, c.id))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-8 text-xs text-faint",
			children: [profile.callsign ? `${profile.callsign} · ` : "", "Inferno is a companion, not a replacement for care. How can we help you love yourself more?"]
		})
	] });
}
function Slider({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex justify-between font-display text-xs uppercase tracking-wider text-muted",
			children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums text-fg",
				children: value
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			min: 1,
			max: 10,
			value,
			onChange: (e) => onChange(Number(e.target.value)),
			className: "mt-1 w-full accent-primary"
		})]
	});
}
function Quick({ to, icon: Icon, label, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "rounded-lg border border-border bg-elevated p-4 hover:border-primary",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-sm uppercase tracking-wider",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: hint
			})
		]
	});
}
//#endregion
export { Home as component };
