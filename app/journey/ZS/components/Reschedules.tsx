"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { challengeMoments } from "../data";

const { slots } = challengeMoments.reschedules;

/** The three Round 1 slots appear one by one; the first two get struck out. */
export default function Reschedules() {
  return (
    <motion.ol
      className="mt-10 max-w-xl space-y-3"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ staggerChildren: 0.6 }}
    >
      {slots.map((s, i) => (
        <motion.li
          key={s.time}
          variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex items-center gap-4 border-l-2 px-4 py-3 ${
            s.out ? "border-zs-alert/60 bg-zs-panel/50" : "border-zs-landmark bg-zs-landmark/10"
          }`}
        >
          <div className="min-w-0 flex-1">
            <p className={`font-head text-2xl font-bold [font-stretch:75%] ${s.out ? "text-zs-mute" : "text-zs-landmark"}`}>
              <span className="relative inline-block">
                {s.time}
                {s.out && (
                  <motion.span
                    aria-hidden="true"
                    variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
                    transition={{ delay: 0.35, duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-x-0 top-1/2 h-0.5 origin-left bg-zs-alert"
                  />
                )}
              </span>
              {s.out && <span className="sr-only"> (cancelled)</span>}
            </p>
            <p className="text-sm text-zs-mute">{s.note}</p>
          </div>
          {!s.out && <Check size={22} aria-label="Final slot" className="shrink-0 text-zs-landmark" />}
          <span className="sr-only">Slot {i + 1} of 3</span>
        </motion.li>
      ))}
    </motion.ol>
  );
}
