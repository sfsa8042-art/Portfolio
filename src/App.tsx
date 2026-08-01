import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Work } from "./components/Work";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { ProjectDetail } from "./components/ProjectDetail";
import type { Project } from "./data/content";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero />
        <Work onOpen={setActive} />
        <About />
      </main>
      <Contact />

      <AnimatePresence>
        {active && (
          <ProjectDetail project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
