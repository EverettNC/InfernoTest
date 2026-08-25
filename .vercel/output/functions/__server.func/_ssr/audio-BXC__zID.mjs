//#region node_modules/.nitro/vite/services/ssr/assets/audio-BXC__zID.js
var current = null;
function ctx() {
	return new (window.AudioContext || window.webkitAudioContext)();
}
function stopLounge() {
	current?.stop();
	current = null;
}
function playLounge(id, volume = .12) {
	stopLounge();
	const ac = ctx();
	const master = ac.createGain();
	master.gain.value = volume;
	master.connect(ac.destination);
	const make = (freq, type, detune = 0) => {
		const o = ac.createOscillator();
		const g = ac.createGain();
		o.type = type;
		o.frequency.value = freq;
		o.detune.value = detune;
		const f = ac.createBiquadFilter();
		f.type = "lowpass";
		f.frequency.value = 900;
		o.connect(f);
		f.connect(g);
		g.connect(master);
		g.gain.value = .18;
		o.start();
		return {
			o,
			g
		};
	};
	const nodes = [];
	if (id === "harmonies") nodes.push(make(110, "sine"), make(165, "sine", 4), make(220, "triangle", -3));
	else if (id === "rhythms") nodes.push(make(98, "sine"), make(196, "triangle", 6));
	else if (id === "melodies") nodes.push(make(130.81, "sine"), make(196, "sine", 8), make(261.63, "triangle"));
	else nodes.push(make(82.41, "sine"), make(123.47, "triangle", -8));
	const lfo = ac.createOscillator();
	const lfoGain = ac.createGain();
	lfo.frequency.value = id === "rhythms" ? 1 : .12;
	lfoGain.gain.value = id === "rhythms" ? .08 : .04;
	lfo.connect(lfoGain);
	lfoGain.connect(master.gain);
	lfo.start();
	const handle = { stop: () => {
		nodes.forEach((n) => {
			try {
				n.o.stop();
			} catch {}
		});
		try {
			lfo.stop();
		} catch {}
		ac.close();
	} };
	current = handle;
	return handle;
}
function breathTick(secondsIn = 4, secondsOut = 6, onPhase) {
	let alive = true;
	const loop = async () => {
		while (alive) {
			onPhase("in");
			await wait(secondsIn * 1e3);
			if (!alive) break;
			onPhase("hold");
			await wait(1e3);
			if (!alive) break;
			onPhase("out");
			await wait(secondsOut * 1e3);
		}
	};
	loop();
	return () => {
		alive = false;
	};
}
function wait(ms) {
	return new Promise((r) => setTimeout(r, ms));
}
//#endregion
export { playLounge as n, stopLounge as r, breathTick as t };
