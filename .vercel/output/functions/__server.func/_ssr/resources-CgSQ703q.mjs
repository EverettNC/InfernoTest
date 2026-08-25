import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as CardTitle, i as CardHint, n as CRISIS_RESOURCES, p as useInferno, r as Card, s as InfernoShell } from "./card-Iagpwpqf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resources-CgSQ703q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MORE = [
	{
		name: "VA location finder",
		href: "https://www.va.gov/find-locations/",
		note: "Clinics, hospitals, Vet Centers."
	},
	{
		name: "VA National Center for PTSD",
		href: "https://www.ptsd.va.gov/",
		note: "Education for veterans, families, clinicians."
	},
	{
		name: "Give an Hour",
		href: "https://giveanhour.org/",
		note: "Free mental health services for veterans and families."
	},
	{
		name: "DAV",
		href: "https://www.dav.org/",
		note: "Claims assistance and advocacy."
	}
];
function ResourcesPage() {
	const mark = useInferno((s) => s.mark);
	(0, import_react.useEffect)(() => {
		mark("resources");
	}, [mark]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfernoShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xs font-semibold uppercase tracking-[0.22em] text-ember",
			children: "Resources"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 font-display text-3xl uppercase",
			children: "The human path"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-sm text-muted",
			children: "Inferno is a companion. It is not a replacement for professional care. If you need someone right now, use a number, not a model."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-3",
			children: [...CRISIS_RESOURCES, ...MORE].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: r.name }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: r.note }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: r.href,
					className: "mt-3 inline-block font-display text-sm uppercase tracking-wider text-primary",
					target: r.href.startsWith("http") ? "_blank" : void 0,
					rel: r.href.startsWith("http") ? "noreferrer" : void 0,
					children: "Open"
				})
			] }, r.name))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-xs text-faint",
			children: "In the United States the 988 Suicide & Crisis Lifeline is available 24 hours a day. Call or text 988. Veterans, press 1. Or text HOME to 741741."
		})
	] });
}
//#endregion
export { ResourcesPage as component };
