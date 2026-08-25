type LoungeId = "harmonies" | "rhythms" | "melodies" | "voice";

type Handle = {
  stop: () => void;
};

let current: Handle | null = null;

function ctx(): AudioContext {
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  return new AC();
}

export function stopLounge() {
  current?.stop();
  current = null;
}

export function playLounge(id: LoungeId, volume = 0.12): Handle {
  stopLounge();
  const ac = ctx();
  const master = ac.createGain();
  master.gain.value = volume;
  master.connect(ac.destination);

  const make = (freq: number, type: OscillatorType, detune = 0) => {
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
    g.gain.value = 0.18;
    o.start();
    return { o, g };
  };

  const nodes: { o: OscillatorNode; g: GainNode }[] = [];
  if (id === "harmonies") {
    nodes.push(make(110, "sine"), make(165, "sine", 4), make(220, "triangle", -3));
  } else if (id === "rhythms") {
    nodes.push(make(98, "sine"), make(196, "triangle", 6));
  } else if (id === "melodies") {
    nodes.push(make(130.81, "sine"), make(196.0, "sine", 8), make(261.63, "triangle"));
  } else {
    nodes.push(make(82.41, "sine"), make(123.47, "triangle", -8));
  }

  const lfo = ac.createOscillator();
  const lfoGain = ac.createGain();
  lfo.frequency.value = id === "rhythms" ? 1 : 0.12;
  lfoGain.gain.value = id === "rhythms" ? 0.08 : 0.04;
  lfo.connect(lfoGain);
  lfoGain.connect(master.gain);
  lfo.start();

  const handle: Handle = {
    stop: () => {
      nodes.forEach((n) => {
        try {
          n.o.stop();
        } catch {
          /* already stopped */
        }
      });
      try {
        lfo.stop();
      } catch {
        /* already stopped */
      }
      void ac.close();
    },
  };
  current = handle;
  return handle;
}

export function breathTick(secondsIn = 4, secondsOut = 6, onPhase: (p: "in" | "out" | "hold") => void) {
  let alive = true;
  const loop = async () => {
    while (alive) {
      onPhase("in");
      await wait(secondsIn * 1000);
      if (!alive) break;
      onPhase("hold");
      await wait(1000);
      if (!alive) break;
      onPhase("out");
      await wait(secondsOut * 1000);
    }
  };
  void loop();
  return () => {
    alive = false;
  };
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
