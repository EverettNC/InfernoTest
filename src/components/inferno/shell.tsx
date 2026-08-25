import { useLayoutEffect, type ReactNode } from "react";
import { useInferno } from "@/lib/inferno/store";
import { CrisisBar } from "./crisis-bar";
import { InfernoNav, SideRail } from "./nav";
import { PrivacyGate } from "./privacy-gate";

export function InfernoShell({ children }: { children: ReactNode }) {
  const reduced = useInferno((s) => s.profile.reducedMotion);
  useLayoutEffect(() => {
    void useInferno.persist.rehydrate();
  }, []);
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduced);
  }, [reduced]);
  return (
    <div className="min-h-dvh text-fg">
      <CrisisBar />
      <div className="mx-auto flex max-w-6xl">
        <SideRail />
        <main className="min-w-0 flex-1 px-4 pb-28 pt-6 md:px-8 md:pb-12">{children}</main>
      </div>
      <InfernoNav />
      <PrivacyGate />
    </div>
  );
}
