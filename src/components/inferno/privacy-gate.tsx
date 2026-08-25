import { Button } from "@/components/ui/button";
import { useInferno } from "@/lib/inferno/store";

export function PrivacyGate() {
  const accepted = useInferno((s) => s.profile.privacyAcceptedAt);
  const accept = useInferno((s) => s.acceptPrivacy);
  const mark = useInferno((s) => s.mark);
  if (accepted) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-bg/85 p-4 sm:items-center">
      <div className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-xl border border-border bg-surface p-6">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Simulated proving field
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-fg">Before we begin</h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
          <p>
            This is Inferno's training ground. Not a clinic. Not production Inferno. There
            are no real patients, no real names, and no clinical records here.
          </p>
          <p>
            Community circles are empty rooms for testing. Anything you type stays in this
            browser as local demo state. Wipe it from Profile whenever you want.
          </p>
          <p>
            Speak and Talk can hit a live model if you press them — that is the cortex
            under test, not a care relationship. Guardian crisis detection runs on whatever
            text you enter. 988 in the bar is a real line.
          </p>
          <p>
            Inferno is a companion. Not a medical device. Not a replacement for care. This
            screen exists because privacy is one of the capabilities we prove.
          </p>
        </div>
        <Button
          className="mt-6 w-full"
          onClick={() => {
            accept();
            mark("privacy");
          }}
        >
          Enter the proving field
        </Button>
      </div>
    </div>
  );
}
