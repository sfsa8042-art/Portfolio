import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Project, Shot } from "../data/content";
import { mockups } from "./Mockups";

function ShotFigure({
  shot,
  onOpen,
}: {
  shot: Shot;
  onOpen: (src: string) => void;
}) {
  return (
    <figure
      className="group cursor-zoom-in"
      onClick={() => onOpen(shot.src)}
    >
      <div className="relative rounded-xl overflow-hidden border border-stroke bg-surface">
        <img
          src={shot.src}
          alt={shot.caption}
          loading="lazy"
          className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-bg/0 group-hover:bg-bg/10 transition-colors" />
        <div className="absolute top-2.5 right-2.5 text-[11px] text-text-primary bg-bg/70 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Zoom ⤢
        </div>
      </div>
      <figcaption className="text-xs text-muted mt-2">{shot.caption}</figcaption>
    </figure>
  );
}

export function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const Mock = mockups[project.mockup];
  const d = project.detail;
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [showLive, setShowLive] = useState(false);

  // lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox) setLightbox(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, lightbox]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-bg overflow-y-auto"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* top bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-5 md:px-10 py-4 bg-bg/80 backdrop-blur-md border-b border-stroke">
        <button
          onClick={onClose}
          className="group flex items-center gap-2 text-sm text-muted hover:text-text-primary transition-colors"
        >
          <span className="inline-block transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          Back to work
        </button>
        <span className="text-xs text-muted uppercase tracking-[0.25em] font-mono">
          {project.category}
        </span>
      </div>

      <div className="max-w-[1000px] mx-auto px-5 md:px-10 pb-24">
        {/* hero */}
        <header className="pt-12 md:pt-16 pb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs text-muted uppercase tracking-[0.25em] font-mono">
              {d.status}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display italic text-text-primary mb-5">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-text-primary/80 font-display italic mb-6">
            {d.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <span>{d.role}</span>
            <span className="hidden sm:inline">·</span>
            <span>{project.year}</span>
          </div>

          {/* action links */}
          {d.embeds && d.embeds.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-8">
              {d.embeds.map((e) => (
                <a
                  key={e.href}
                  href={e.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group relative rounded-full text-sm px-6 py-3 transition-all hover:scale-[1.03] ${
                    e.kind === "primary"
                      ? "bg-text-primary text-bg"
                      : "border border-stroke text-text-primary hover:border-white/30"
                  }`}
                >
                  {e.kind === "primary" && (
                    <span
                      className="absolute rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                      style={{ inset: "-2px" }}
                    />
                  )}
                  {e.label} <span className="text-xs">↗</span>
                </a>
              ))}
            </div>
          )}
        </header>

        {/* big visual: live embed toggle or mockup */}
        <section className="mb-16">
          <div className="relative rounded-2xl overflow-hidden border border-stroke bg-surface">
            {d.embedLive && showLive ? (
              <div className="relative">
                <div className="flex items-center justify-between px-4 py-2 border-b border-stroke bg-bg/60">
                  <span className="text-xs text-muted font-mono truncate">
                    {d.embedLive}
                  </span>
                  <button
                    onClick={() => setShowLive(false)}
                    className="text-xs text-muted hover:text-text-primary"
                  >
                    Close preview ✕
                  </button>
                </div>
                <iframe
                  src={d.embedLive}
                  title={`${project.title} live`}
                  className="w-full h-[520px] bg-white"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="relative aspect-[16/9]">
                {d.heroImage ? (
                  <img
                    src={d.heroImage}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <Mock />
                )}
                {d.embedLive && (
                  <button
                    onClick={() => setShowLive(true)}
                    className="group absolute inset-0 flex items-center justify-center bg-bg/0 hover:bg-bg/40 transition-colors"
                  >
                    <span className="flex items-center gap-2 text-sm text-text-primary bg-bg/70 backdrop-blur-md border border-white/15 rounded-full px-5 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      ▶ Load live preview
                    </span>
                  </button>
                )}
              </div>
            )}
          </div>
          {d.embedLive && (
            <p className="text-xs text-muted mt-2">
              Live preview loads the real site inside the page. Some sites may
              block embedding — use the buttons above to open in a new tab.
            </p>
          )}
        </section>

        {/* overview */}
        <section className="mb-16 max-w-[720px]">
          <h2 className="text-xs text-muted uppercase tracking-[0.25em] mb-6">
            Overview
          </h2>
          <div className="space-y-5">
            {d.overview.map((p, i) => (
              <p key={i} className="text-base md:text-lg text-muted leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* metrics */}
        {d.metrics && d.metrics.length > 0 && (
          <section className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {d.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-stroke bg-surface p-6"
                >
                  <div className="text-4xl md:text-5xl font-display text-text-primary mb-2">
                    {m.value}
                  </div>
                  <div className="text-xs text-muted">{m.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* features */}
        {d.features.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xs text-muted uppercase tracking-[0.25em] mb-6">
              Functionality
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {d.features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-stroke bg-surface p-6 transition-colors hover:border-white/20"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full accent-gradient shrink-0" />
                    <div>
                      <h3 className="text-lg text-text-primary mb-1.5">
                        {f.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {f.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* screenshots gallery */}
        {((d.shots && d.shots.length > 0) ||
          (d.shotGroups && d.shotGroups.length > 0)) && (
          <section className="mb-16">
            <h2 className="text-xs text-muted uppercase tracking-[0.25em] mb-6">
              Real screenshots & materials
            </h2>

            {/* flat shots */}
            {d.shots && d.shots.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                {d.shots.map((s) => (
                  <ShotFigure key={s.src} shot={s} onOpen={setLightbox} />
                ))}
              </div>
            )}

            {/* grouped shots */}
            {d.shotGroups &&
              d.shotGroups.map((group) => (
                <div key={group.title} className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-6 h-px bg-stroke" />
                    <h3 className="text-sm text-text-primary/80">
                      {group.title}
                    </h3>
                    <span className="text-xs text-muted font-mono">
                      {group.shots.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {group.shots.map((s) => (
                      <ShotFigure key={s.src} shot={s} onOpen={setLightbox} />
                    ))}
                  </div>
                </div>
              ))}
          </section>
        )}

        {/* footer cta */}
        <section className="pt-8 border-t border-stroke flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-sm text-muted hover:text-text-primary transition-colors"
          >
            ← Back to all work
          </button>
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-text-primary hover:opacity-70 transition-opacity"
            >
              Visit {project.title} ↗
            </a>
          )}
        </section>
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
    </motion.div>
  );
}
