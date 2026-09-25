import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { profile, intro } from "../data/content";

// A short intro, not simulated network progress. Only two state updates.
export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [resolved, setResolved] = useState(false);
  useEffect(() => {
    const reveal = window.setTimeout(() => setResolved(true), 650);
    const finish = window.setTimeout(onComplete, 1100);
    return () => { window.clearTimeout(reveal); window.clearTimeout(finish); };
  }, [onComplete]);
  return (
    <m.div className="fixed inset-0 z-[9999] bg-bg overflow-hidden flex items-center justify-center"
      initial={false} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <div className="intro-glow absolute inset-0 pointer-events-none" />
      <span className="absolute top-6 left-6 text-[10px] text-muted uppercase tracking-[0.3em]">Portfolio</span>
      <button onClick={onComplete} className="absolute top-6 right-6 text-xs text-muted hover:text-text-primary rounded-full border border-stroke px-4 py-2">{intro.skip}</button>
      <div className="relative w-[min(92vw,640px)] px-2">
        <div className={"rounded-xl border border-white/10 bg-[#0c0d10] shadow-2xl transition-opacity duration-300 " + (resolved ? "opacity-0" : "opacity-100")}>
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]/70" /><span className="w-3 h-3 rounded-full bg-[#febc2e]/70" /><span className="w-3 h-3 rounded-full bg-[#28c840]/70" />
            <span className="ml-3 text-[11px] text-muted font-mono">artemiy@portfolio</span>
          </div>
          <div className="p-5 space-y-2 font-mono text-[11px] sm:text-sm text-muted">
            {intro.lines.map((line, i) => <p key={line} className="intro-line" style={{ animationDelay: i * 100 + "ms" }}>{line}</p>)}
          </div>
        </div>
        <div className={"absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300 " + (resolved ? "opacity-100" : "opacity-0")}>
          <p className="font-display italic text-5xl md:text-7xl text-text-primary text-center">{profile.name}</p>
          <div className="mt-5 h-px w-40 accent-gradient" />
          <p className="mt-5 text-[11px] text-muted uppercase tracking-[0.3em]">{intro.roles}</p>
        </div>
      </div>
    </m.div>
  );
}
