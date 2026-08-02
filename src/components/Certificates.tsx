import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { certificates } from "../data/content";
import { Emphasis } from "./Emphasis";

export function Certificates() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  // close the lightbox on Escape
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Certificates
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display text-text-primary mb-4">
            <Emphasis text="Courses & *certificates*" />
          </h2>
          <p className="text-sm md:text-base text-muted max-w-lg">
            Programs and qualifications completed at Russian universities and
            colleges. The original documents are in Russian — captions are
            translated to English.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((c, i) => (
            <motion.figure
              key={c.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group flex flex-col rounded-3xl border border-stroke bg-surface overflow-hidden transition-colors hover:border-white/20"
            >
              <button
                onClick={() => setLightbox(c.src)}
                className="relative block cursor-zoom-in bg-white"
                aria-label={`Zoom ${c.title}`}
              >
                <img
                  src={c.src}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <span className="absolute top-3 right-3 text-[11px] text-text-primary bg-bg/70 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Zoom ⤢
                </span>
              </button>
              <figcaption className="p-6 md:p-7">
                <h3 className="text-lg md:text-xl text-text-primary mb-2">
                  {c.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{c.caption}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[110] bg-black/90 flex items-center justify-center p-6 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt=""
            className="max-w-full max-h-full rounded-lg border border-white/10"
          />
          <button
            className="absolute top-5 right-6 text-white/70 hover:text-white text-2xl"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}
