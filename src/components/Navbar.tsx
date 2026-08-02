import { useEffect, useState } from "react";
import { profile } from "../data/content";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  // longer label — hidden on the smallest screens to keep the pill compact
  { label: "Certificates", href: "#certificates", cls: "hidden md:inline-block" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", "work", "about", "certificates", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
      >
        {/* logo */}
        <a href="#home" className="group relative">
          <div className="w-9 h-9 rounded-full accent-gradient p-[1.5px] transition-transform duration-300 group-hover:scale-110">
            <div className="w-full h-full rounded-full bg-bg flex items-center justify-center">
              <span className="font-display italic text-[13px] text-text-primary">
                {profile.initials}
              </span>
            </div>
          </div>
        </a>

        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors ${
              link.cls ?? ""
            } ${
              active === link.href
                ? "text-text-primary bg-stroke/50"
                : "text-muted hover:text-text-primary hover:bg-stroke/50"
            }`}
          >
            {link.label}
          </a>
        ))}

        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* say hi */}
        <a href="#contact" className="group relative rounded-full">
          <span className="absolute rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" style={{ inset: "-2px" }} />
          <span className="relative flex items-center gap-1 text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 bg-surface text-text-primary backdrop-blur-md">
            Say hi <span className="text-[10px]">↗</span>
          </span>
        </a>
      </div>
    </nav>
  );
}
