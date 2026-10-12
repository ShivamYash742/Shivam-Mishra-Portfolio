'use client';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase } from 'lucide-react';
import { easeOutExpo, inViewOnce, itemSlide } from '@/lib/motion';
import { experience } from '@/lib/data';
import SectionHeader from './SectionHeader';
import SpotlightCard from './SpotlightCard';

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);

  // The timeline line draws itself downward as the section scrolls past.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 65%'],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <section id="experience" className="py-28 px-6 bg-[#0a0a0f] relative">
      <div className="absolute left-0 top-0 w-[420px] h-[420px] bg-[radial-gradient(closest-side,rgb(124_58_237/0.1),transparent)] pointer-events-none" />
      <div className="max-w-4xl mx-auto">
        <SectionHeader eyebrow="Where I've worked" title="Experience" />

        <div className="relative" ref={timelineRef}>
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/[0.06]" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: lineProgress }}
            className="absolute left-6 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-violet-400 via-violet-500/60 to-cyan-400/40 shadow-[0_0_10px_rgba(139,92,246,0.6)]"
          />

          <div className="space-y-10">
            {experience.map((item, idx) => (
              <motion.div
                key={item.org}
                initial="hidden"
                whileInView="show"
                viewport={inViewOnce}
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.7,
                      delay: idx * 0.1,
                      ease: easeOutExpo,
                      delayChildren: 0.3,
                      staggerChildren: 0.08,
                    },
                  },
                }}
                className="relative pl-16"
              >
                <motion.div
                  variants={{
                    hidden: { scale: 0 },
                    show: { scale: 1, transition: { type: 'spring', stiffness: 380, damping: 16 } },
                  }}
                  className="absolute left-[18px] top-4 w-3 h-3"
                >
                  {item.current && (
                    <span className="absolute inset-0 rounded-full bg-violet-400/60 motion-safe:animate-ping" />
                  )}
                  <span className="relative block w-3 h-3 rounded-full bg-violet-500 ring-4 ring-violet-500/20" />
                </motion.div>

                <SpotlightCard lift={false} className="p-6 rounded-2xl">
                  <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg group-hover:text-violet-300 transition-colors">
                        {item.role}
                      </h3>
                      <p className="text-violet-400 text-sm font-medium flex items-center gap-1.5 mt-0.5">
                        <Briefcase size={13} />
                        {item.org}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {item.current && (
                        <span className="px-2 py-0.5 bg-emerald-500/15 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/20">
                          Current
                        </span>
                      )}
                      <span className="text-slate-500 text-sm font-mono">{item.timeline}</span>
                    </div>
                  </div>

                  <ul className="relative space-y-2">
                    {item.highlights.map((point, i) => (
                      <motion.li
                        key={i}
                        variants={itemSlide}
                        className="flex items-start gap-2 text-slate-400 text-sm"
                      >
                        <span className="text-violet-400 mt-0.5 shrink-0">–</span>
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
