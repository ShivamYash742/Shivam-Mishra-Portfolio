import { useTransform, type MotionValue } from "framer-motion";

/**
 * Scroll-linked ramp from `a` to `b` while `p` runs from `from` to `to`.
 * Function form on purpose: framer runs the array form of opacity transforms natively against a
 * ScrollTimeline, which drifts inside sticky sections.
 */
export const useRamp = (p: MotionValue<number>, from: number, to: number, a = 0, b = 1) =>
  useTransform(p, (v) => a + (b - a) * Math.min(1, Math.max(0, (v - from) / (to - from))));
