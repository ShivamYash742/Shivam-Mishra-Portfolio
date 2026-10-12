'use client';
import { motion } from 'framer-motion';
import { columnDelay, easeOutExpo, inViewOnce } from '@/lib/motion';
import { achievements } from '@/lib/data';
import SectionHeader from './SectionHeader';
import SpotlightCard from './SpotlightCard';

export default function Achievements() {
  return (
    <section id="achievements" className="py-28 px-6 bg-[#0a0a0f] relative">
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-[radial-gradient(closest-side,rgb(124_58_237/0.1),transparent)] pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Notable wins" title="Achievements" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((item, idx) => (
            <SpotlightCard
              key={idx}
              className="p-5 rounded-xl flex gap-4 items-start"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.6, delay: columnDelay(idx, 3, 0.08), ease: easeOutExpo }}
            >
              {/* The emoji drops in with a little bounce, and wobbles when the card is hovered */}
              <motion.span
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 12,
                  delay: 0.2 + columnDelay(idx, 3, 0.08),
                }}
                className="text-2xl"
              >
                <span className="inline-block transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12">
                  {item.icon}
                </span>
              </motion.span>
              <div>
                <p className="text-white text-sm font-semibold leading-snug mb-1">{item.text}</p>
                <p className="text-slate-500 text-xs">{item.detail}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
