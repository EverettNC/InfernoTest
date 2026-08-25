import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as CardTitle, i as CardHint, p as useInferno, r as Card, s as InfernoShell } from "./card-Iagpwpqf.mjs";
import { t as InfernoTalk } from "./talk-Drs7GJjq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/voice-DCXXVz2r.js
var import_jsx_runtime = require_jsx_runtime();
function VoicePage() {
	const voice = useInferno((s) => s.profile.voice);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfernoShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary",
			children: "Voice"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 font-display text-3xl uppercase",
			children: "Speak and be answered"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 max-w-xl text-sm text-muted",
			children: [
				"Companion ",
				voice === "joanna" ? "Joanna" : "Matthew",
				". Natural speech. If the ladder hits HIGH or CRITICAL, cortex yields to Guardian. 988 is still one tap."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Closed loop" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Listen locally. Think on the cortex. Speak back. Failures named." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfernoTalk, {})
				})
			]
		})
	] });
}
//#endregion
export { VoicePage as component };
