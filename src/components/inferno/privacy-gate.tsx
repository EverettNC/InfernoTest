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
          Your privacy matters
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-fg">Before we begin</h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
          <p>
            Inferno Training Ground keeps check-ins, journals, and memories in this browser.
            Nothing is sent to a cloud store unless you press Speak or Talk — those calls go
            to Inferno's live cortex and are user-initiated.
          </p>
          <p>
            Inferno is a companion. It is not a medical device and not a replacement for
            professional care. If you are in crisis, use the bar: 988, veterans press 1.
          </p>
          <p>You own your data. Export it. Wipe it. We do not keep a copy here.</p>
        </div>
        <Button
          className="mt-6 w-full"
          onClick={() => {
            accept();
            mark("privacy");
          }}
        >
          I understand and accept
        </Button>
      </div>
    </div>
  );
}
