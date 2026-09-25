import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, MotionConfig, useReducedMotion } from "framer-motion";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Work } from "./components/Work";
import { About } from "./components/About";
import { Certificates } from "./components/Certificates";
import { Contact } from "./components/Contact";
import { ProjectDetail } from "./components/ProjectDetail";
import type { Project } from "./data/content";

export default function App() {
  const reduced = useReducedMotion();
  const [isLoading, setIsLoading] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !window.location.hash);
  const [ready, setReady] = useState(!isLoading);
  const [active, setActive] = useState<Project | null>(null);
  const page = useRef<HTMLDivElement>(null);
  const finishIntro = useCallback(() => setIsLoading(false), []);
  const closeProject = useCallback(() => setActive(null), []);
  useEffect(() => { if (reduced) finishIntro(); }, [reduced, finishIntro]);
  useEffect(() => {
    document.body.style.overflow = !ready ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [ready]);
  useEffect(() => { if (page.current) page.current.inert = !ready || !!active; }, [ready, active]);
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <AnimatePresence onExitComplete={() => setReady(true)}>
          {isLoading && <LoadingScreen key="intro" onComplete={finishIntro} />}
        </AnimatePresence>
        <div ref={page}>
          <Navbar />
          <main>
            <Hero ready={ready && !active} />
            <Work onOpen={setActive} />
            <About />
            <Certificates />
          </main>
          <Contact />
        </div>
        <AnimatePresence>
          {active && <ProjectDetail key={active.slug} project={active} onClose={closeProject} />}
        </AnimatePresence>
      </MotionConfig>
    </LazyMotion>
  );
}
