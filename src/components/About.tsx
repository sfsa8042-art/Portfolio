import { motion } from "framer-motion";
import { about, stats } from "../data/content";
import { Emphasis } from "./Emphasis";

export function About() {
  return (
    <section id="about" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              {about.eyebrow}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display text-text-primary mb-10 max-w-3xl">
            <Emphasis text={about.heading} />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
            className="md:col-span-7 space-y-5"
          >
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-base md:text-lg text-muted leading-relaxed">
                {p}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="md:col-span-5"
          >
            <p className="text-xs text-muted uppercase tracking-[0.2em] mb-5">
              Interested in
            </p>
            <ul className="space-y-3">
              {about.interests.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-text-primary"
                >
                  <span className="w-1.5 h-1.5 rounded-full accent-gradient" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 pt-12 border-t border-stroke">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <div className="text-5xl md:text-6xl font-display text-text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
