import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { profile } from "../data/content";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % profile.roles.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      ).fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 },
        "-=0.9"
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ambient gradient background (replaces video) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg" />
        <div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[60vh] rounded-full opacity-30 blur-[120px] gradient-border-anim"
          style={{ backgroundSize: "200% 200%" }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          {profile.eyebrow}
        </p>

        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          {profile.name}
        </h1>

        <p className="blur-in text-lg md:text-2xl text-muted mb-8">
          {profile.roleLinePrefix}{" "}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {profile.roles[roleIndex]}
          </span>{" "}
          {profile.roleLineSuffix}
        </p>

        <p className="blur-in text-sm md:text-base text-muted max-w-xl mb-12">
          {profile.tagline}
        </p>

        <div className="blur-in inline-flex flex-col sm:flex-row gap-4">
          <a
            href="#work"
            className="group relative rounded-full text-sm px-7 py-3.5 bg-text-primary text-bg transition-all hover:scale-105 hover:bg-bg hover:text-text-primary"
          >
            <span
              className="absolute rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity -z-10"
              style={{ inset: "-2px" }}
            />
            See work
          </a>
          <a
            href="#contact"
            className="group relative rounded-full text-sm px-7 py-3.5 border-2 border-stroke bg-bg text-text-primary transition-all hover:scale-105 hover:border-transparent"
          >
            <span
              className="absolute rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity -z-10"
              style={{ inset: "-2px" }}
            />
            Reach out
          </a>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">
          Scroll
        </span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <div className="absolute inset-0 w-full h-1/2 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
