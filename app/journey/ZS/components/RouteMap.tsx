"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, type MotionValue } from "framer-motion";
import { copy } from "../data";
import { stages, type Stage } from "../derive";
import { stageIcons } from "./icons";
import { useRamp } from "./useRamp";

const N = stages.length;
const W = 1200;
const H = 520;
// Stations alternate between a high and a low lane so labels always sit on the outside of the bend.
const LANES = [160, 345, 160, 345, 160, 345, 200];
const pt = (i: number) => ({ x: 84 + (i * (W - 168)) / (N - 1), y: LANES[i] });

/** S-curve between two stations, leaving and arriving horizontally. */
const segment = (i: number) => {
  const a = pt(i);
  const b = pt(i + 1);
  const m = (a.x + b.x) / 2;
  return `M${a.x} ${a.y} C${m} ${a.y} ${m} ${b.y} ${b.x} ${b.y}`;
};

const gap = (i: number) => stages[i + 1].startDay - stages[i].endDay;

function Station({ stage, i, p }: { stage: Stage; i: number; p: MotionValue<number> }) {
  const Icon = stageIcons[stage.id];
  const at = i / (N - 1);
  const lit = useRamp(p, at - 0.05, at);
  const fade = useRamp(p, at - 0.06, at, 0.35, 1);
  const last = i === N - 1;
  const high = pt(i).y < H / 2;
  const size = last ? "h-16 w-16" : "h-11 w-11";
  return (
    <a
      href={`#${stage.id}`}
      className="zs-stop group absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${(pt(i).x / W) * 100}%`, top: `${(pt(i).y / H) * 100}%` }}
    >
      <span className="absolute -inset-4" aria-hidden="true" />
      <span className={`zs-station relative grid place-items-center rounded-full border-2 border-zs-line bg-zs-ink text-zs-mute ${size}`}>
        <Icon size={last ? 24 : 18} aria-hidden="true" />
        <motion.span
          aria-hidden="true"
          style={{ opacity: lit }}
          className={`absolute -inset-0.5 grid place-items-center rounded-full border-2 border-zs-landmark bg-zs-landmark/15 text-zs-text ${last ? "zs-glow zs-ring" : ""}`}
        >
          <Icon size={last ? 24 : 18} />
        </motion.span>
      </span>
      <motion.span
        style={{ opacity: fade }}
        className={`absolute left-1/2 w-40 -translate-x-1/2 text-center lg:w-48 ${
          high ? "bottom-full mb-5 lg:mb-6" : "top-full mt-5 lg:mt-6"
        }`}
      >
        <span className="block text-xs font-semibold tracking-[0.18em] text-zs-landmark">{stage.number}</span>
        <span className="mt-1 block font-head text-2xl font-bold leading-none [font-stretch:70%] lg:text-3xl">{stage.short}</span>
        <span className="mt-1.5 block text-xs tracking-[0.12em] text-zs-mute">{stage.dates}</span>
        <span className="mt-2 hidden text-sm leading-snug text-zs-mute lg:block">{stage.line}</span>
      </motion.span>
    </a>
  );
}

function Horizontal({ p }: { p: MotionValue<number> }) {
  return (
    <div className="relative mx-auto hidden w-full max-w-[1200px] md:block" style={{ aspectRatio: `${W} / ${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true" fill="none">
        <defs>
          <linearGradient id="zs-route" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
            <stop offset="0" stopColor="#a98bff" />
            <stop offset="1" stopColor="#5cd0ff" />
          </linearGradient>
        </defs>
        {stages.slice(0, -1).map((s, i) => (
          <g key={s.id}>
            <path d={segment(i)} stroke="var(--color-zs-line)" strokeWidth="3" strokeLinecap="round" />
            <SegmentLit d={segment(i)} p={p} i={i} />
          </g>
        ))}
      </svg>
      {stages.slice(0, -1).map((s, i) => {
        const a = pt(i);
        const b = pt(i + 1);
        return (
          <span
            key={s.id}
            aria-hidden="true"
            className="absolute -translate-x-1/2 -translate-y-1/2 bg-zs-ink px-1.5 py-0.5 text-[11px] italic tracking-wide text-zs-mute"
            style={{ left: `${(((a.x + b.x) / 2) / W) * 100}%`, top: `${(((a.y + b.y) / 2) / H) * 100}%` }}
          >
            {gap(i) === 0 ? "same day" : `${gap(i)} ${gap(i) === 1 ? "day" : "days"} later`}
          </span>
        );
      })}
      {stages.map((s, i) => (
        <Station key={s.id} stage={s} i={i} p={p} />
      ))}
    </div>
  );
}

function SegmentLit({ d, p, i }: { d: string; p: MotionValue<number>; i: number }) {
  const pathLength = useRamp(p, i / (N - 1), (i + 1) / (N - 1));
  return <motion.path d={d} stroke="url(#zs-route)" strokeWidth="3" strokeLinecap="round" style={{ pathLength }} />;
}

function MobileStop({ stage, i }: { stage: Stage; i: number }) {
  const Icon = stageIcons[stage.id];
  const last = i === N - 1;
  return (
    <li className="relative pb-9 pl-14 last:pb-0">
      <a href={`#${stage.id}`} className="group block">
        <span
          className={`absolute left-0 top-0 grid place-items-center rounded-full border-2 border-zs-landmark bg-zs-ink text-zs-text ${
            last ? "zs-glow zs-ring h-11 w-11" : "h-9 w-9"
          }`}
        >
          <Icon size={16} aria-hidden="true" />
        </span>
        <span className="block text-xs font-semibold tracking-[0.18em] text-zs-landmark">
          {stage.number} · {stage.dates}
        </span>
        <span className="mt-1 block font-head text-3xl font-bold leading-none [font-stretch:70%] transition-colors group-hover:text-zs-landmark">
          {stage.short}
        </span>
        <span className="mt-1.5 block text-sm leading-snug text-zs-mute">{stage.line}</span>
      </a>
    </li>
  );
}

function Vertical({ p }: { p: MotionValue<number> }) {
  return (
    <div className="relative md:hidden">
      <span aria-hidden="true" className="absolute bottom-5 left-[17px] top-5 w-0.5 bg-zs-line" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: p }}
        className="absolute bottom-5 left-[17px] top-5 w-0.5 origin-top bg-linear-to-b from-zs-landmark to-zs-progress"
      />
      <ol className="relative">
        {stages.map((s, i) => (
          <MobileStop key={s.id} stage={s} i={i} />
        ))}
      </ol>
    </div>
  );
}

/** Desktop and tablet: a metro-style route that draws itself as you scroll. Phones: the same route, stood upright. */
export default function RouteMap() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const done = useMotionValue(1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 78%", "end 50%"] });
  const p = reduce ? done : scrollYProgress;

  return (
    <section id="route" aria-labelledby="route-h" className="scroll-mt-4 pb-16 pt-8 md:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 flex flex-col justify-between gap-2 md:mb-20 md:flex-row md:items-end">
          <h2 id="route-h" className="font-head text-4xl font-bold [font-stretch:70%] md:text-6xl">
            {copy.route.title}
          </h2>
          <p className="text-zs-mute">{copy.route.hint}</p>
        </div>
        <div ref={ref}>
          <Horizontal p={p} />
          <Vertical p={p} />
        </div>
      </div>
    </section>
  );
}
