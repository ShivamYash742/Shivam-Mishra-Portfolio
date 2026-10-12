"use client";

import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";

/** Honours the visitor's reduced-motion setting for every child and draws the read-progress line. */
export default function Frame({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-linear-to-r from-zs-progress via-zs-landmark to-zs-alert"
      />
      {children}
    </MotionConfig>
  );
}
