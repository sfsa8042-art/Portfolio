import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { certificates, moreCertificates, type Certificate } from "../data/content";
import { Emphasis } from "./Emphasis";

const EASE = [0.25, 0.1, 0.25, 1] as const;

function CertCard({
  cert,
  index,
  onZoom,
}: {
  cert: Certificate;
  index: number;
  onZoom: (src: string) => void;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: EASE }}
      className="group flex flex-col rounded-3xl border border-stroke bg-surface overflow-hidden transition-colors hover:border-white/20"
    >
      <button
        onClick={() => onZoom(cert.src)}
        className="relative block cursor-zoom-in bg-white"
        aria-label={`Zoom ${cert.title}`}
      >
        <img
          src={cert.src}
          alt={cert.title}
          loading="lazy"
          className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <span className="absolute top-3 right-3 text-[11px] text-text-primary bg-bg/70 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Zoom ⤢
        </span>
      </button>
      <figcaption className="p-6 md:p-7">
        <h3 className="text-lg md:text-xl text-text-primary mb-2">
          {cert.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed">{cert.caption}</p>
      </figcaption>
    </motion.figure>
  );
}

export function Certificates() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  // close the lightbox on Escape
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  if (certificates.length === 0 && moreCertificates.length === 0) return null;

  return (
    <section id="certificates" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE }}
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

        {/* important certificates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((c, i) => (
            <CertCard key={c.src} cert={c} index={i} onZoom={setLightbox} />
          ))}
        </div>

        {/* less-important — collapsed behind a toggle */}
        {moreCertificates.length > 0 && (
          <div className="mt-6">
            <button
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="group flex w-full items-center justify-between rounded-2xl border border-stroke bg-surface px-6 py-4 text-left transition-colors hover:border-white/20"
            >
              <span className="flex items-center gap-3">
                <span className="text-sm md:text-base text-text-primary">
                  More certificates &amp; diplomas
                </span>
                <span className="text-xs text-muted font-mono tabular-nums border border-stroke rounded-full px-2 py-0.5">
                  {moreCertificates.length}
                </span>
              </span>
              <span className="flex items-center gap-2 text-xs text-muted uppercase tracking-[0.2em]">
                {expanded ? "Hide" : "Show"}
                <span
                  className={`inline-block transition-transform duration-300 ${
                    expanded ? "rotate-180" : ""
                  }`}
                >
                  ↓
                </span>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key="more"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    {moreCertificates.map((c, i) => (
                      <CertCard
                        key={c.src}
                        cert={c}
                        index={i}
                        onZoom={setLightbox}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
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
