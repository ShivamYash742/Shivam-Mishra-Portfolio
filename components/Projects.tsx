'use client';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Check } from 'lucide-react';
import { chipPop, columnDelay, easeOutExpo, inViewOnce, itemSlide, staggerChildren } from '@/lib/motion';
import { projects } from '@/lib/data';
import SectionHeader from './SectionHeader';
import SpotlightCard from './SpotlightCard';

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6 bg-[#0a0a0f] relative">
      <div className="absolute right-0 top-1/2 w-[500px] h-[500px] bg-[radial-gradient(closest-side,rgb(6_182_212/0.1),transparent)] pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="What I've built" title="Projects" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <SpotlightCard
              key={project.name}
              tilt
              glow={`${project.accentColor}1f`}
              className="p-7 rounded-2xl flex flex-col"
              initial="hidden"
              whileInView="show"
              viewport={inViewOnce}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.7,
                    delay: columnDelay(idx, 2, 0.15),
                    ease: easeOutExpo,
                    delayChildren: 0.3 + columnDelay(idx, 2, 0.15),
                  },
                },
              }}
            >
              <div className="mb-5 relative z-10">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} on GitHub`}
                      className="text-slate-500 hover:text-violet-400 hover:scale-125 transition-all duration-200"
                    >
                      <Github size={18} aria-hidden="true" />
                    </a>
                    {project.live !== '#' && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} live demo`}
                        className="text-slate-500 hover:text-cyan-400 hover:scale-125 hover:rotate-12 transition-all duration-200"
                      >
                        <ExternalLink size={18} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm font-mono" style={{ color: project.accentColor }}>
                  {project.subtitle}
                </p>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-5 relative z-10">
                {project.description}
              </p>

              <motion.ul
                variants={staggerChildren(0.08, 0)}
                className="space-y-2 mb-6 relative z-10 flex-1"
              >
                {project.points.slice(0, 4).map((point, i) => (
                  <motion.li
                    key={i}
                    variants={itemSlide}
                    className="flex items-start gap-2 text-slate-400 text-sm"
                  >
                    <Check size={14} className="text-violet-400 mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                variants={staggerChildren(0.04, 0.1)}
                className="flex flex-wrap gap-2 relative z-10"
              >
                {project.stack.map((tech) => (
                  <motion.span
                    key={tech}
                    variants={chipPop}
                    whileHover={{ y: -2, scale: 1.06 }}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg text-slate-300 border border-white/[0.08] bg-white/[0.04] transition-colors duration-200 hover:border-white/25 hover:text-white cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
