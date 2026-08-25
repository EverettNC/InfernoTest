import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as CardTitle, i as CardHint, p as useInferno, r as Card, s as InfernoShell, t as Button } from "./card-Iagpwpqf.mjs";
import { t as Input } from "./input-By72h04j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-oRNciOU1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const profile = useInferno((s) => s.profile);
	const setProfile = useInferno((s) => s.setProfile);
	const exportAll = useInferno((s) => s.exportAll);
	const wipe = useInferno((s) => s.wipe);
	const mark = useInferno((s) => s.mark);
	const [contactName, setContactName] = (0, import_react.useState)(profile.contacts[0]?.name ?? "");
	const [contactTel, setContactTel] = (0, import_react.useState)(profile.contacts[0]?.tel ?? "");
	const [wiped, setWiped] = (0, import_react.useState)(false);
	const saveContact = () => {
		setProfile({ contacts: contactTel.trim() ? [{
			id: "primary",
			name: contactName.trim() || "My person",
			tel: contactTel.trim()
		}] : [] });
		mark("crisis-bar");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfernoShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary",
			children: "Profile"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 font-display text-3xl uppercase",
			children: "Your system"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-sm text-muted",
			children: "Callsign, voice, your person. Local only. Sovereignty is a button, not a policy PDF."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Identity" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 block font-display text-xs uppercase tracking-wider text-muted",
					children: ["Callsign", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "mt-1",
						value: profile.callsign,
						onChange: (e) => setProfile({ callsign: e.target.value }),
						placeholder: "What Inferno should call you"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-display text-xs uppercase tracking-wider text-muted",
					children: "Voice companion"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex gap-2",
					children: ["joanna", "matthew"].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: profile.voice === v ? "default" : "outline",
						onClick: () => setProfile({ voice: v }),
						children: v === "joanna" ? "Joanna" : "Matthew"
					}, v))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: profile.speakReplies,
						onChange: (e) => setProfile({ speakReplies: e.target.checked })
					}), "Speak Inferno's replies"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-2 flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: profile.reducedMotion,
						onChange: (e) => setProfile({ reducedMotion: e.target.checked })
					}), "Reduce motion"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Your person" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "One tap from the crisis bar. Stored here, not in a cloud directory." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "mt-3",
					value: contactName,
					onChange: (e) => setContactName(e.target.value),
					placeholder: "Name"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "mt-2",
					value: contactTel,
					onChange: (e) => setContactTel(e.target.value),
					placeholder: "Phone",
					type: "tel"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3",
					variant: "outline",
					onClick: saveContact,
					children: "Save to crisis bar"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Sovereignty" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Export everything. Or burn it. Cardinal Rule 4." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							const blob = new Blob([exportAll()], { type: "application/json" });
							const url = URL.createObjectURL(blob);
							const a = document.createElement("a");
							a.href = url;
							a.download = "inferno-training-ground.json";
							a.click();
							URL.revokeObjectURL(url);
							mark("export-wipe");
						},
						children: "Export JSON"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ember",
						onClick: () => {
							wipe();
							setWiped(true);
							mark("export-wipe");
						},
						children: "Full wipe"
					})]
				}),
				wiped && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-ember",
					children: "Wiped. Privacy consent will ask again. Named and done."
				})
			]
		})
	] });
}
//#endregion
export { ProfilePage as component };
