import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as cn } from "./card-Iagpwpqf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-By72h04j.js
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-faint", "focus-visible:border-primary", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-28 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg placeholder:text-faint", "focus-visible:border-primary", className),
		...props
	});
}
//#endregion
export { Textarea as n, Input as t };
