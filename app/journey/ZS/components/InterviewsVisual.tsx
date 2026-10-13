"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { challengeMoments, type Step } from "../data";
import { fill, fmtIso, SPAN } from "../derive";

const sentences = fill(challengeMoments.silence.description)
  .split(". ")
  .map((s) => (s.endsWith(".") ? s : `${s}.`));

/** The test, step by step. The line fills as you read down it; the long wait gets the room it took. */
export default function InterviewsVisual({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 60%"] });
  const fillY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const lastIdx = steps.length - 1;

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden="true" className="absolute bottom-3 left-[11px] top-3 w-0.5 bg-zs-line" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: fillY }}
        className="absolute bottom-3 left-[11px] top-3 w-0.5 origin-top bg-linear-to-b from-zs-landmark to-zs-progress"
      />
      {steps.map((s, i) => (
        <li key={s.label} className={`relative pl-14 ${i === lastIdx ? "" : s.wait ? "pb-24" : "pb-16"}`}>
          <span
            aria-hidden="true"
            className={`absolute left-0 top-2 h-6 w-6 rounded-full border-2 bg-zs-ink ${
              i === lastIdx ? "zs-glow zs-ring border-zs-landmark" : s.wait ? "border-dashed border-zs-mute" : "border-zs-landmark"
            }`}
          />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zs-mute">
            <span className="text-zs-landmark">{String(i + 1).padStart(2, "0")}</span> · {fmtIso(s.date)}
          </p>
          {s.wait ? (
            <>
              <p className="mt-2 font-head text-[clamp(7rem,22vw,15rem)] font-extrabold leading-[0.8] [font-stretch:55%] text-zs-mute">
                {SPAN}
              </p>
              <p className="mt-3 font-head text-3xl font-bold uppercase [font-stretch:70%]">days without a word</p>
              <p className="mt-4 max-w-md leading-relaxed text-zs-mute">{sentences[1]} {sentences[2]}</p>
              <p className="mt-3 text-sm text-zs-mute">{s.note}</p>
            </>
          ) : (
            <>
              <h3
                className={`mt-2 font-head font-extrabold uppercase leading-[0.9] [font-stretch:62%] ${
                  i === lastIdx ? "zs-gtext text-6xl md:text-8xl" : "text-5xl md:text-7xl"
                }`}
              >
                {s.label}
              </h3>
              {s.note && <p className="mt-3 max-w-md text-lg text-zs-mute">{s.note}</p>}
            </>
          )}
        </li>
      ))}
    </ol>
  );
}
