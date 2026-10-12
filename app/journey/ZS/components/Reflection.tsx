"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, type MotionValue } from "framer-motion";
import { copy, stats } from "../data";
import { TOTAL_DAYS } from "../derive";
import { useRamp } from "./useRamp";

const lines = copy.reflection.lines.map((l) => l.replace("{days}", String(TOTAL_DAYS)).split(" "));
const total = lines.flat().length;

function Word({ w, i, p, grad }: { w: string; i: number; p: MotionValue<number>; grad: boolean }) {
  const opacity = useRamp(p, i / total, Math.min(1, (i + 3) / total), 0.22, 1);
  return (
    <motion.span style={{ opacity }} className={`zs-word inline-block pr-[0.28em] ${grad ? "zs-gtext" : ""}`}>
      {w}
    </motion.span>
  );
}

/** Each word lights up as it passes the reader's eye line, so the passage is read at scroll speed. */
export default function Reflection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 78%", "end 62%"] });
  let n = 0;

  return (
    <section aria-label="Reflection" className="px-5 pb-20 pt-24 sm:px-8 md:pt-40">
      <div ref={ref} className="mx-auto max-w-5xl">
        <p className="font-head text-[clamp(2.25rem,6.2vw,5.5rem)] font-bold leading-[1.02] [font-stretch:72%]">
          {lines.map((words, li) => (
            <span key={li} className={`block ${li === lines.length - 1 ? "mt-6" : "mt-1"}`}>
              {words.map((w) => (
                <Word key={n} w={w} i={n++} p={p} grad={li === lines.length - 1} />
              ))}
            </span>
          ))}
        </p>
      </div>

      <div className="mx-auto mt-[28svh] flex max-w-5xl flex-wrap items-center gap-4">
        <Link
          href="/"
          className="zs-btn inline-flex min-h-12 items-center rounded-full px-7 font-semibold"
        >
          {copy.reflection.primaryCta}
        </Link>
        <Link
          href="/#contact"
          className="inline-flex min-h-12 items-center rounded-full border border-zs-line px-7 font-semibold transition-colors hover:border-zs-landmark hover:text-zs-landmark"
        >
          {copy.reflection.secondaryCta}
        </Link>
      </div>
      <p className="mx-auto mt-16 max-w-5xl text-sm text-zs-mute">{stats.by} · {stats.campaign}</p>
    </section>
  );
}
