import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile, socials } from "../data/content";

export function Contact() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marquee-track", {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }, marqueeRef);
    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden"
    >
      {/* ambient background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 -bottom-20 -translate-x-1/2 h-[50vh] w-[70vw] rounded-full opacity-20 blur-[130px] gradient-border-anim"
          style={{ backgroundSize: "200% 200%" }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* marquee */}
      <div ref={marqueeRef} className="relative overflow-hidden mb-16 md:mb-24">
        <div className="marquee-track flex whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="text-5xl md:text-8xl font-display italic text-text-primary/10 px-6"
            >
              Building the future •
            </span>
          ))}
        </div>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 text-center">
        <p className="text-xs text-muted uppercase tracking-[0.3em] mb-6">
          Get in touch
        </p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary mb-10">
          Let's build something.
        </h2>

        <a
          href={`mailto:${profile.email}`}
          className="group relative inline-flex items-center gap-2 rounded-full text-sm md:text-base px-8 py-4 bg-text-primary text-bg transition-all hover:scale-105 hover:bg-bg hover:text-text-primary"
        >
          <span
            className="absolute rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity -z-10"
            style={{ inset: "-2px" }}
          />
          {profile.email} <span>↗</span>
        </a>
      </div>

      {/* footer bar */}
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mt-20 pt-8 border-t border-stroke flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-sm text-muted">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          Available for projects
        </div>

        {socials.length > 0 && (
          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted hover:text-text-primary transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        )}

        <p className="text-xs text-muted">
          © {year} {profile.name}
        </p>
      </div>
    </footer>
  );
}
