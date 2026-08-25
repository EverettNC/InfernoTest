import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as CardTitle, i as CardHint, p as useInferno, r as Card, s as InfernoShell, t as Button } from "./card-Iagpwpqf.mjs";
import { t as Badge } from "./badge-Db77KkAE.mjs";
import { a as MODULES, o as PROGRAMS } from "./catalog-vOHTzCi1.mjs";
import { t as Progress } from "./progress-Di0gP0Yt.mjs";
import { t as InfernoTalk } from "./talk-Drs7GJjq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/training-P0ruznqj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TrainingPage() {
	const progress = useInferno((s) => s.programProgress);
	const setProgress = useInferno((s) => s.setProgramProgress);
	const mark = useInferno((s) => s.mark);
	const [moduleId, setModuleId] = (0, import_react.useState)(MODULES[0].id);
	const [partner, setPartner] = (0, import_react.useState)(false);
	const mod = MODULES.find((m) => m.id === moduleId) ?? MODULES[0];
	const ceus = PROGRAMS.reduce((n, p) => n + (progress[p.id] === 100 ? p.ceus : 0), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfernoShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary",
			children: "Training"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 font-display text-3xl uppercase",
			children: "Professional hub"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-sm text-muted",
			children: "The system does not only hold the person in crisis. It trains the person holding them up. Real institutions. Real CEUs. Inferno sits with you."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex gap-3 font-display text-sm uppercase tracking-wider",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-primary",
				children: [ceus, " CEUs marked complete"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-faint",
				children: "local tracker only"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-3",
			children: PROGRAMS.map((p) => {
				const v = progress[p.id] ?? 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "text-base",
								children: p.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHint, { children: [
								p.provider,
								" · ",
								p.duration,
								" · ",
								p.ceus,
								" CEUs"
							] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: v === 100 ? "teal" : "muted",
								children: p.level
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: p.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							className: "mt-3",
							value: v
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => {
									setProgress(p.id, Math.min(100, v + 25));
									mark("training");
								},
								children: "Mark 25%"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: p.url,
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex h-11 items-center rounded-sm border border-border px-3 font-display text-xs font-semibold uppercase tracking-wider",
								children: "Open provider"
							})]
						})
					]
				}, p.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Study partner" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "SAMHSA six principles. Inferno sits any hour you want to work." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: MODULES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setModuleId(m.id),
						className: `h-11 rounded-sm border px-3 font-display text-xs uppercase tracking-wider ${moduleId === m.id ? "border-primary text-primary" : "border-border text-muted"}`,
						children: m.title
					}, m.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed text-fg",
					children: mod.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					onClick: () => {
						setPartner(true);
						mark("study-partner");
					},
					children: "Sit with Inferno"
				}),
				partner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 border-t border-border pt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfernoTalk, {
						mode: "study-partner",
						seed: `Walk me through this module as a study partner: ${mod.title}. ${mod.body}`
					})
				})
			]
		})
	] });
}
//#endregion
export { TrainingPage as component };
