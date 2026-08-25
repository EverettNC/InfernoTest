import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as CardTitle, i as CardHint, p as useInferno, r as Card, s as InfernoShell } from "./card-Iagpwpqf.mjs";
import { t as Badge } from "./badge-Db77KkAE.mjs";
import { n as Textarea } from "./input-By72h04j.mjs";
import { n as CIRCLES } from "./catalog-vOHTzCi1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community-Dk3zfQD4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CommunityPage() {
	const [open, setOpen] = (0, import_react.useState)(CIRCLES[0].id);
	const journals = useInferno((s) => s.journals);
	const setJournal = useInferno((s) => s.setJournal);
	const mark = useInferno((s) => s.mark);
	const circle = CIRCLES.find((c) => c.id === open) ?? CIRCLES[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfernoShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary",
			children: "Community"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 font-display text-3xl uppercase",
			children: "The circles"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-sm text-muted",
			children: "Six private rooms. This ground does not invent other veterans. Your journal stays on this device. Crisis routing is real."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-3 sm:grid-cols-2",
			children: CIRCLES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					setOpen(c.id);
					mark("community");
				},
				className: `rounded-lg border p-4 text-left ${open === c.id ? "border-primary bg-elevated" : "border-border bg-panel"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-sm uppercase tracking-wider",
					children: c.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: c.category
				})]
			}, c.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: circle.category }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "mt-3",
					children: circle.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: circle.blurb }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 flex flex-wrap gap-2",
					children: circle.holds.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "muted",
						children: h
					}, h))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-ember",
					children: circle.crisis
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "text-primary",
							href: "tel:988",
							children: "Call 988"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "text-primary",
							href: "https://www.va.gov/find-locations/",
							target: "_blank",
							rel: "noreferrer",
							children: "Find a VA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "text-primary",
							to: "/resources",
							children: "All resources"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 font-display text-xs uppercase tracking-wider text-muted",
					children: "Private journal — this circle only"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "mt-2",
					value: journals[circle.id] ?? "",
					onChange: (e) => setJournal(circle.id, e.target.value),
					placeholder: "What this circle would hear, if it were a night watch."
				})
			]
		})
	] });
}
//#endregion
export { CommunityPage as component };
