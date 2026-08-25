import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as cn } from "./card-Iagpwpqf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-Db77KkAE.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border px-2.5 py-0.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em]", {
			default: "border-primary/40 text-primary",
			ember: "border-ember/50 text-ember",
			teal: "border-teal/50 text-teal",
			warn: "border-warn/50 text-warn",
			muted: "border-border text-muted"
		}[tone], className),
		...props
	});
}
//#endregion
export { Badge as t };
