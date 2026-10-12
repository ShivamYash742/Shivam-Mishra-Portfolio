"use client";

import { motion } from "framer-motion";

/** Disruptions are the only things on this page that physically shake: once, when they scroll in. */
export default function Jolt({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      whileInView={{ x: [0, -7, 6, -4, 2, 0] }}
      viewport={{ once: true, margin: "0px 0px -25% 0px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
