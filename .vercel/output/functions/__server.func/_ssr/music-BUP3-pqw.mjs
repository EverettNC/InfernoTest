import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as CardTitle, i as CardHint, p as useInferno, r as Card, s as InfernoShell, t as Button } from "./card-Iagpwpqf.mjs";
import { i as MEDITATIONS, r as LOUNGES } from "./catalog-vOHTzCi1.mjs";
import { n as playLounge, r as stopLounge } from "./audio-BXC__zID.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/music-BUP3-pqw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MusicPage() {
	const mark = useInferno((s) => s.mark);
	const speak = useInferno((s) => s.profile.speakReplies);
	const [active, setActive] = (0, import_react.useState)(null);
	const [guide, setGuide] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => () => stopLounge(), []);
	const start = (id) => {
		if (active === id) {
			stopLounge();
			setActive(null);
			return;
		}
		playLounge(id);
		setActive(id);
		mark("music");
	};
	const speakGuide = (text) => {
		if (!("speechSynthesis" in window)) return;
		window.speechSynthesis.cancel();
		const u = new SpeechSynthesisUtterance(text);
		u.rate = .88;
		window.speechSynthesis.speak(u);
		mark("meditation");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfernoShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary",
			children: "Music"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 font-display text-3xl uppercase",
			children: "Therapy lounge"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-sm text-muted",
			children: "Healing Harmonies, Soothing Rhythms, Therapeutic Melodies, Voice Integration. Generated in this browser. Never stored."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-3 sm:grid-cols-2",
			children: LOUNGES.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: l.name }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: l.blurb }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					variant: active === l.id ? "ember" : "default",
					onClick: () => start(l.id),
					children: active === l.id ? "Stop" : "Play"
				})
			] }, l.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Guided library" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Body scan, orient, safe place. Spoken here. Not uploaded." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3",
					children: MEDITATIONS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-t border-border pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display uppercase tracking-wider",
								children: m.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [m.minutes, " min"]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => {
									setGuide(m.id);
									if (speak) speakGuide(m.script);
								},
								children: "Begin"
							})]
						}), guide === m.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-fg",
							children: m.script
						})]
					}, m.id))
				})
			]
		})
	] });
}
//#endregion
export { MusicPage as component };
