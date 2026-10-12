"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { copy, stats } from "../data";
import { allEvents, fmtIsoLong } from "../derive";

const offer = allEvents.find((e) => e.isOffer)!;
const mail = offer.emailData!;

export default function Offer() {
  const reduce = useReducedMotion();
  const card = useRef<HTMLDivElement>(null);
  const seen = useInView(card, { once: true, amount: 0.6 });

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 180, damping: 18 });
  const gx = useTransform(mx, (v) => v * 100);
  const gy = useTransform(my, (v) => v * 100);
  const glare = useMotionTemplate`radial-gradient(520px circle at ${gx}% ${gy}%, color-mix(in oklab, var(--color-zs-landmark) 22%, transparent), transparent 60%)`;

  useEffect(() => {
    if (!seen || reduce) return;
    // Same colours as the page tokens, read at runtime so they follow the palette in globals.css.
    const css = getComputedStyle(card.current!);
    const colors = ["landmark", "progress", "alert", "text"].map((n) => css.getPropertyValue(`--color-zs-${n}`).trim());
    import("canvas-confetti").then(({ default: confetti }) =>
      confetti({
        particleCount: 120,
        spread: 75,
        startVelocity: 38,
        origin: { y: 0.65 },
        colors,
        disableForReducedMotion: true,
      }),
    );
  }, [seen, reduce]);

  return (
    <section id="offer" aria-labelledby="offer-h" className="zs-tint-end relative overflow-hidden py-24 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_45%,color-mix(in_oklab,var(--color-zs-landmark)_12%,transparent),transparent)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className="text-zs-mute">
            {fmtIsoLong(offer.date)} · {stats.offerType}
          </p>
          <h2
            id="offer-h"
            className="mt-3 font-head text-6xl font-extrabold leading-[0.9] [font-stretch:60%] md:text-8xl"
          >
            {copy.offer.title}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-zs-mute">
            {copy.offer.story}
          </p>
        </div>

        <div className="[perspective:1200px] lg:col-span-7">
          <motion.div
            ref={card}
            style={{ rotateX, rotateY }}
            onPointerMove={(e) => {
              if (reduce || e.pointerType !== "mouse") return;
              const r = e.currentTarget.getBoundingClientRect();
              mx.set((e.clientX - r.left) / r.width);
              my.set((e.clientY - r.top) / r.height);
            }}
            onPointerLeave={() => {
              mx.set(0.5);
              my.set(0.5);
            }}
            className="relative overflow-hidden zs-card rounded-md p-6 shadow-[0_30px_70px_-30px_color-mix(in_oklab,var(--color-zs-landmark)_40%,transparent)] md:p-10"
          >
            <motion.div aria-hidden="true" style={{ background: glare }} className="pointer-events-none absolute inset-0" />
            <div className="relative">
              <p className="text-sm text-zs-mute">
                From <span className="text-zs-text">{mail.sender}</span> · {mail.senderRole}
              </p>
              <p className="mt-3 text-xl font-semibold md:text-2xl">{mail.subject}</p>

              <p className="mt-8 overflow-hidden font-head text-[clamp(3.5rem,11vw,7.5rem)] font-extrabold leading-none [font-stretch:62%]">
                <motion.span
                  className="zs-gtext block"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: seen ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
                  transition={{ duration: reduce ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {stats.offer}
                </motion.span>
              </p>

              <p className="mt-6 max-w-lg leading-relaxed text-zs-mute">{mail.preview}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="zs-chip" data-s="gold">
                  <span className="zs-glyph" data-s="gold" aria-hidden="true" />
                  {stats.offerType}
                </span>
                <span className="zs-chip" data-s="blue">
                  <span className="zs-glyph" data-s="blue" aria-hidden="true" />
                  Accept by {fmtIsoLong(stats.acceptBy)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
