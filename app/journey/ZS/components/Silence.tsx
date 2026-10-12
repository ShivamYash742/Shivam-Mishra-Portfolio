"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { challengeMoments } from "../data";
import { dayOf, fmtDay } from "../derive";
import { useRamp } from "./useRamp";

const { title: rawTitle, description: rawDescription, from, fromLabel, to, closing } = challengeMoments.silence;
const FROM = dayOf(from);
const SPAN = dayOf(to) - FROM;
const fill = (t: string) => t.replace("{span}", String(SPAN));
const title = fill(rawTitle);
const description = fill(rawDescription);
const sentences = description.split(". ").map((s) => (s.endsWith(".") ? s : `${s}.`));

function Tick({ i, day }: { i: number; day: MotionValue<number> }) {
  const opacity = useTransform(day, (v) => (v >= i ? 1 : 0.2));
  return (
    <motion.span
      aria-hidden="true"
      style={{ opacity }}
      className={`w-px sm:w-0.5 ${i === SPAN ? "zs-btn h-16" : "h-9 bg-zs-text"}`}
    />
  );
}

function Line({ p, at, children, className = "" }: {
  p: MotionValue<number>;
  at: number;
  children: React.ReactNode;
  className?: string;
}) {
  const opacity = useRamp(p, at, at + 0.07);
  const y = useRamp(p, at, at + 0.07, 18, 0);
  return (
    <motion.p aria-hidden="true" style={{ opacity, y }} className={className}>
      {children}
    </motion.p>
  );
}

/**
 * Pinned section: scrolling is the waiting. The ticks fill, the counter climbs, then the offer lands.
 */
export default function Silence() {
  const ref = useRef<HTMLElement>(null);
  const [done, setDone] = useState(false);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(p, "change", (v) => setDone(v > 0.9));

  const day = useTransform(p, [0.04, 0.86], [0, SPAN], { clamp: true });
  const shown = useTransform(day, (v) => Math.round(v));
  const date = useTransform(day, (v) => fmtDay(FROM + Math.round(v)));

  return (
    <section ref={ref} aria-labelledby="silence-h" className="zs-tint relative h-[330vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="relative flex h-full flex-col justify-center">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <h2 id="silence-h" className="text-xl font-semibold text-zs-mute md:text-2xl">
              {title}
            </h2>
            <p className="sr-only">{description}</p>

            <div className="mt-6 flex flex-wrap items-end gap-x-8">
              <p
                aria-hidden="true"
                className={`font-head text-[clamp(8rem,32vw,26rem)] font-extrabold leading-[0.78] transition-colors duration-500 [font-stretch:55%] ${
                  done ? "zs-gtext" : "text-zs-text"
                }`}
              >
                <motion.span className="tabular-nums">{shown}</motion.span>
              </p>
              <div aria-hidden="true" className="pb-3 text-lg md:text-2xl">
                <p className="text-zs-mute">days without a word</p>
                <motion.p className="font-semibold tabular-nums">{date}</motion.p>
              </div>
            </div>

            <div aria-hidden="true" className="mt-10 flex items-end justify-between">
              {Array.from({ length: SPAN + 1 }, (_, i) => (
                <Tick key={i} i={i} day={day} />
              ))}
            </div>
            <div aria-hidden="true" className="mt-2 flex justify-between text-sm text-zs-mute">
              <span>
                {fmtDay(FROM)} · {fromLabel}
              </span>
              <span>{fmtDay(FROM + SPAN)}</span>
            </div>

            <div className="relative mt-10 min-h-36 max-w-2xl">
              <Line p={p} at={0.12} className="text-xl md:text-2xl">{sentences[0]}</Line>
              <Line p={p} at={0.38} className="mt-3 text-xl text-zs-mute md:text-2xl">{sentences[1]}</Line>
              <Line p={p} at={0.62} className="mt-3 text-xl font-semibold md:text-2xl">{sentences[2]}</Line>
            </div>
            <Line
              p={p}
              at={0.88}
              className="zs-gtext absolute bottom-0 right-5 font-head text-3xl font-bold [font-stretch:70%] sm:right-8 md:text-6xl"
            >
              {closing}
            </Line>
          </div>
        </div>
      </div>
    </section>
  );
}
