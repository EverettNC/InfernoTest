import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as cn } from "./card-Iagpwpqf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-Di0gP0Yt.js
var import_jsx_runtime = require_jsx_runtime();
function Progress({ value, className, tone = "primary" }) {
	const fill = tone === "ember" ? "bg-ember" : tone === "teal" ? "bg-teal" : "bg-primary";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-1.5 overflow-hidden rounded-full bg-border", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full transition-[width] duration-300", fill),
			style: { width: `${Math.max(0, Math.min(100, value))}%` }
		})
	});
}
//#endregion
export { Progress as t };
