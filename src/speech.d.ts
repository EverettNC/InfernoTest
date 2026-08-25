interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: ((ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((ev: Event) => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: { [index: number]: { [index: number]: { transcript: string } } };
}

declare var SpeechRecognition: { new (): SpeechRecognition };
declare var webkitSpeechRecognition: { new (): SpeechRecognition };
