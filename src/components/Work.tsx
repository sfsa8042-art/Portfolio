import { motion } from "framer-motion";
import { projects, type Project } from "../data/content";
import { Emphasis } from "./Emphasis";
import { mockups } from "./Mockups";

export function Work({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <section id="work" className="bg-bg py-16 md:py-24">
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
              Selected Work
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display text-text-primary mb-4">
            <Emphasis text="Featured *projects*" />
          </h2>
          <p className="text-sm md:text-base text-muted max-w-md">
            A selection of things I'm building — from concept and research to
            launch. Click any project to open its full profile.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, i) => {
            const Mock = mockups[project.mockup];
            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className={project.span}
              >
                <button
                  onClick={() => onOpen(project)}
                  className="group relative flex flex-col h-full w-full text-left bg-surface border border-stroke rounded-3xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:-translate-y-1"
                >
                  <span
                    className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      padding: "1px",
                      background:
                        "linear-gradient(120deg, rgba(137,170,204,0.6), rgba(78,133,191,0.15), rgba(137,170,204,0.6))",
                      WebkitMask:
                        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />

                  <div className="relative aspect-[16/9] overflow-hidden border-b border-stroke">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
                      {project.cardImage ? (
                        <img
                          src={project.cardImage}
                          alt={`${project.title} preview`}
                          loading="lazy"
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <Mock />
                      )}
                    </div>
                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
                    {project.badge && (
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] text-bg bg-white rounded-full px-3 py-1 font-medium shadow-lg">
                        <span className="text-[10px]">★</span>
                        {project.badge}
                      </div>
                    )}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[11px] text-text-primary bg-bg/70 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Open profile →
                    </div>
                  </div>

                  <div className="relative flex flex-col flex-1 p-6 md:p-7">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-muted uppercase tracking-[0.2em]">
                        {project.category}
                      </span>
                      <span className="text-xs text-muted tabular-nums font-mono">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display italic text-text-primary mb-3">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted mb-5 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.detail.reviews &&
                        project.detail.reviews.length > 0 && (
                          <span className="flex items-center gap-1.5 text-[11px] text-text-primary border border-[#89AACC]/45 bg-[#89AACC]/10 rounded-full px-3 py-1">
                            <span className="w-1 h-1 rounded-full accent-gradient" />
                            {project.detail.reviews.length} industry reviews
                          </span>
                        )}
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] text-muted border border-stroke rounded-full px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
