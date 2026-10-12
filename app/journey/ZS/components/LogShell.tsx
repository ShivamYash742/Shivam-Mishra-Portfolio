"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { TOTAL_DAYS } from "../derive";

/**
 * Frames the server-rendered entries with a sticky day counter and a spine that fills as you read.
 * Entries are found by their `data-day` attribute; no per-entry React state.
 */
export default function LogShell({ children }: { children: React.ReactNode }) {
  const listRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState({ n: "01", name: "Awareness" });
  const day = useMotionValue(0);
  const shown = useTransform(day, (v) => Math.round(v));
  const ratio = useTransform(day, (v) => v / TOTAL_DAYS);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const rows = Array.from(listRef.current?.querySelectorAll<HTMLElement>("[data-day]") ?? []);
    const io = new IntersectionObserver(
      (entries) => {
        // "Reached" = the entry's top has crossed the middle of the screen.
        for (const { target, isIntersecting, boundingClientRect } of entries) {
          target.toggleAttribute("data-reached", isIntersecting || boundingClientRect.top < 0);
        }
        const reached = rows.filter((r) => r.hasAttribute("data-reached"));
        const last = reached[reached.length - 1];
        animate(day, last ? Number(last.dataset.day) : 0, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
        const row = last ?? rows[0];
        if (row) setPhase({ n: row.dataset.n ?? "01", name: row.dataset.phase ?? "" });
      },
      { rootMargin: "0px 0px -50% 0px" },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, [day]);

  return (
    <div className="mx-auto grid max-w-7xl gap-x-16 px-5 sm:px-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
      <aside
        aria-hidden="true"
        className="sticky top-0 z-30 -mx-5 flex items-center gap-4 border-b border-zs-line bg-zs-ink/90 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:top-12 lg:mx-0 lg:block lg:self-start lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none"
      >
        <p className="zs-gtext font-head text-5xl font-extrabold leading-none [font-stretch:62%] lg:text-[9rem]">
          <motion.span className="tabular-nums">{shown}</motion.span>
        </p>
        <div className="min-w-0 flex-1 lg:mt-5">
          <p className="text-sm text-zs-mute">
            Day of {TOTAL_DAYS} · Phase {phase.n}
          </p>
          <p className="truncate font-semibold lg:text-lg">{phase.name}</p>
          <div className="mt-2 h-0.5 bg-zs-line">
            <motion.div style={{ scaleX: ratio }} className="h-full origin-left bg-zs-landmark" />
          </div>
        </div>
      </aside>

      <div ref={listRef} className="relative pb-24 pt-10 lg:pt-0">
        <span aria-hidden="true" className="absolute bottom-0 left-[6px] top-0 w-0.5 bg-zs-line" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: fill }}
          className="absolute bottom-0 left-[6px] top-0 w-0.5 origin-top bg-linear-to-b from-zs-progress via-zs-landmark to-zs-alert"
        />
        {children}
      </div>
    </div>
  );
}
