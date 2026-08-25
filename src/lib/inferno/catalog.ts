export const CIRCLES = [
  {
    id: "combat-veterans",
    name: "Combat Veterans Brotherhood",
    category: "Combat Veterans",
    blurb:
      "For those who served in combat zones. Share the weight with people who already know the sound.",
    holds: ["Combat trauma", "Peer mentorship", "Night watches"],
    crisis: "Veterans Crisis Line — 988, press 1",
  },
  {
    id: "ptsd-support",
    name: "PTSD Warriors United",
    category: "PTSD Support",
    blurb:
      "A closed circle for veterans battling PTSD. Evidence, not slogans. Hope, not pressure.",
    holds: ["Trauma-informed care", "Coping drills", "Medication-adjacent talk, no prescribing"],
    crisis: "Veterans Crisis Line — 988, press 1",
  },
  {
    id: "transition-support",
    name: "Civilian Transition Command",
    category: "Transition Support",
    blurb:
      "The move back to civilian life — career, paper, identity. The uniform comes off. You do not.",
    holds: ["Career guidance", "Education benefits", "Reintegration"],
    crisis: "VA Benefits — va.gov",
  },
  {
    id: "women-veterans",
    name: "Women Veterans Strong",
    category: "Women Veterans",
    blurb:
      "MST recovery and career advancement. Gender-specific support that does not talk over you.",
    holds: ["MST recovery", "Career", "Women-only space"],
    crisis: "Veterans Crisis Line — 988, press 1",
  },
  {
    id: "military-families",
    name: "Military Family Fortress",
    category: "Military Families",
    blurb:
      "Spouses, children, families. Healing together without making the veteran the only story.",
    holds: ["Family systems", "Child support", "Caregiver rest"],
    crisis: "Military Crisis Line — 988",
  },
  {
    id: "crisis-recovery",
    name: "Phoenix Rising Recovery",
    category: "Crisis Recovery",
    blurb:
      "Active recovery from crisis or addiction. Rise is not a metaphor. It is a schedule.",
    holds: ["Recovery", "Life rebuilding", "Daily accountability"],
    crisis: "988 / 741741",
  },
] as const;

export const PROGRAMS = [
  {
    id: "trauma-informed-oregon",
    name: "TIC Modules — NEAR sciences",
    provider: "Trauma Informed Oregon",
    level: "Foundational",
    duration: "4 modules · 6–8 hours",
    ceus: 0,
    url: "https://traumainformedoregon.org/resources/training/tic-intro-training-modules/",
    summary:
      "Four free self-guided modules: trauma-informed principles, neurobiology, practical implementation.",
  },
  {
    id: "trauma-free-world",
    name: "Faith-Based Trauma-Informed Care",
    provider: "Trauma Free World",
    level: "Foundational",
    duration: "8–12 hours",
    ceus: 0,
    url: "https://traumafreeworld.org",
    summary:
      "Trauma reactions, de-escalation, resilience. Used by organizations worldwide.",
  },
  {
    id: "indiana-university-tic",
    name: "Trauma-Informed Care Certificate",
    provider: "Indiana University",
    level: "Intermediate",
    duration: "6 modules",
    ceus: 12,
    url: "https://rural.indiana.edu/focus/health/trauma-informed-care-certificate.html",
    summary:
      "Free six-module professional certificate. Veteran and justice-involved modules included.",
  },
  {
    id: "samhsa-trauma-ceus",
    name: "SAMHSA Trauma CEU Training",
    provider: "SAMHSA",
    level: "Intermediate",
    duration: "Multiple courses",
    ceus: 24,
    url: "https://www.samhsa.gov",
    summary:
      "Trauma screening, trauma-focused CBT, community trauma systems. Federal CEUs.",
  },
  {
    id: "va-ptsd-training",
    name: "VA National Center for PTSD CE",
    provider: "VA National Center for PTSD",
    level: "Advanced",
    duration: "20+ hours",
    ceus: 20,
    url: "https://www.ptsd.va.gov/professional/continuing_ed/index.asp",
    summary:
      "Prolonged exposure, trauma assessment, cultural issues in PTSD care. Free worldwide.",
  },
  {
    id: "emdr-intro",
    name: "The EMDR Approach to Trauma",
    provider: "Trauma Therapist Institute",
    level: "Intermediate",
    duration: "1 hour",
    ceus: 1,
    url: "https://www.traumatherapistinstitute.com/",
    summary: "AIP model, EMDR fundamentals, neurobiological trauma integration.",
  },
  {
    id: "creative-mindfulness-emdr",
    name: "Free EMDR Webinar Series",
    provider: "Institute for Creative Mindfulness",
    level: "Advanced",
    duration: "Ongoing",
    ceus: 12,
    url: "https://www.instituteforcreativemindfulness.com/free-webinars/",
    summary: "EMDR applications, trauma-informed yoga, dissociation.",
  },
  {
    id: "university-pittsburgh-emdr",
    name: "EMDR Certification Track",
    provider: "University of Pittsburgh School of Social Work",
    level: "Specialist",
    duration: "52 hours",
    ceus: 52,
    url: "https://www.socialwork.pitt.edu/professional-continuing-education/free-emdr-certification",
    summary:
      "52-hour virtual EMDR track. Occasionally funded. For qualified clinicians.",
  },
  {
    id: "wounded-warrior-project",
    name: "Project Odyssey",
    provider: "Wounded Warrior Project",
    level: "Specialist",
    duration: "12 weeks + retreats",
    ceus: 0,
    url: "https://www.woundedwarriorproject.org/programs/project-odyssey",
    summary:
      "Trauma resilience program for PTSD-affected veterans. Retreats and follow-up.",
  },
  {
    id: "adler-military-psychology",
    name: "Military Psychology Training",
    provider: "Adler University",
    level: "Advanced",
    duration: "15+ hours",
    ceus: 15,
    url: "https://www.adler.edu/",
    summary: "Combat trauma and reintegration strategies for clinicians supporting soldiers.",
  },
] as const;

export const MODULES = [
  {
    id: "safety",
    title: "Safety is not a mood",
    body: "SAMHSA: physical and emotional safety is the first principle. Inferno does not interrogate. Inferno does not force a narrative. If the body says fight, we stabilize before we talk.",
  },
  {
    id: "trust",
    title: "Trustworthiness and transparency",
    body: "Name what you can do. Name what you cannot. Inferno will say when a module is missing, when the bridge is not connected, when a test failed. A fake pass is a clinical injury.",
  },
  {
    id: "peer",
    title: "Peer support",
    body: "Healing happens in relationship. The six circles exist so no one has to carry this as a solo. Inferno trains the person holding them up — not only the person in the fire.",
  },
  {
    id: "collab",
    title: "Collaboration and mutuality",
    body: "Shared decisions. You choose Ground, Voice, or silence. Inferno does not perform empathy. Inferno stays.",
  },
  {
    id: "empower",
    title: "Empowerment and choice",
    body: "The goal is that you trust yourself again — not that you need Inferno. Adaptation must never become dependence.",
  },
  {
    id: "culture",
    title: "Cultural, historical, and gender issues",
    body: "Honor military context without stereotype. Women veterans, MST, families, and recovery each have their own circle. One size is how people get missed.",
  },
] as const;

export const MEDITATIONS = [
  {
    id: "body-scan",
    name: "Body scan",
    minutes: 8,
    script:
      "Start at the crown. Notice temperature, pressure, contact. Move slowly to the jaw. Unclench if you can. Shoulders. Hands. The ribcage moving. The belly. The sit bones. The feet. You do not have to like what you find. You only have to notice it is here, and that you are too.",
  },
  {
    id: "orient",
    name: "Orient to now",
    minutes: 4,
    script:
      "Name the room. Name the year. Name one object that was not in the memory. Feel the chair. That was then. This is now. Stay with the object for three breaths.",
  },
  {
    id: "safe-place",
    name: "Safe place imagery",
    minutes: 6,
    script:
      "Pick a place that does not demand anything of you. Color. Sound. Temperature. Who is allowed in — maybe no one. You can leave whenever you want. This image is a tool, not a trap.",
  },
] as const;

export const LOUNGES = [
  {
    id: "harmonies",
    name: "Healing Harmonies",
    blurb: "Slow fifths. Warm low pad. Breath-synced swell.",
    base: 110,
    fifth: true,
    pulse: 0.08,
  },
  {
    id: "rhythms",
    name: "Soothing Rhythms",
    blurb: "Soft 60 BPM pulse — resting heart, not a drumline.",
    base: 98,
    fifth: false,
    pulse: 0.18,
  },
  {
    id: "melodies",
    name: "Therapeutic Melodies",
    blurb: "Pentatonic drift over a held drone. No lyrics. Never stored.",
    base: 130.81,
    fifth: true,
    pulse: 0.05,
  },
  {
    id: "voice",
    name: "Voice Integration",
    blurb: "Low drone under spoken guidance. Inferno talks. The room holds.",
    base: 82.41,
    fifth: false,
    pulse: 0.04,
  },
] as const;

export const CAPABILITIES: { id: import("./types").CapabilityId; name: string; section: string }[] =
  [
    { id: "crisis-bar", name: "Crisis bar on every screen", section: "Guardian" },
    { id: "crisis-detect", name: "Crisis detection 4-tier ladder", section: "Guardian" },
    { id: "protocol-select", name: "Protocol selection", section: "Guardian" },
    { id: "no-diagnose", name: "No diagnose / no prescribe", section: "Guardian" },
    { id: "bridge-queue", name: "Bridge notify queue (honest)", section: "Guardian" },
    { id: "grounding", name: "5-4-3-2-1 grounding", section: "Senses" },
    { id: "breathing", name: "Breath pacer", section: "Senses" },
    { id: "voice-listen", name: "Voice listen", section: "Senses" },
    { id: "voice-speak", name: "Voice speak", section: "Senses" },
    { id: "emotion-tone", name: "Emotion / tone field", section: "Cortex" },
    { id: "trigger-memory", name: "Trigger memory", section: "Vault" },
    { id: "check-in", name: "Daily check-in", section: "Vault" },
    { id: "community", name: "Six support circles", section: "Senses" },
    { id: "training", name: "Professional Training Hub", section: "Cortex" },
    { id: "study-partner", name: "Study partner", section: "Cortex" },
    { id: "music", name: "Music Therapy Lounge", section: "Senses" },
    { id: "meditation", name: "Guided meditation library", section: "Senses" },
    { id: "exposure", name: "Gradual exposure", section: "Guardian" },
    { id: "privacy", name: "Privacy consent + local store", section: "Vault" },
    { id: "export-wipe", name: "Export and full wipe", section: "Vault" },
    { id: "integrity", name: "Named failures, never a fake win", section: "Cortex" },
    { id: "resources", name: "988 / VA routing", section: "Guardian" },
  ];
