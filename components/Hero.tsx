'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, Phone, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { profile } from '@/lib/data';
import { easeOutExpo } from '@/lib/motion';

const Hero3D = dynamic(() => import('./Hero3D'), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full bg-gradient-to-br from-violet-900/10 to-cyan-900/10 animate-pulse"
    />
  ),
});

const socials = [
  { icon: Github, href: profile.github, label: 'GitHub' },
  { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
  { icon: Phone, href: `tel:${profile.phone}`, label: 'Phone' },
] as const;

/** The hero renders a mobile and a desktop layout; only the one that matches should run the 3D scene. */
function useIsDesktop() {
  const [desktop, setDesktop] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return desktop;
}

function ImageAvatar() {
  return (
    <div className="relative animate-float-y">
      <div className="absolute inset-[-18px] rounded-full border-2 border-dashed border-violet-500/25 animate-orbit [--orbit-duration:25s]" />
      <div className="absolute inset-[-9px] rounded-full border border-cyan-400/20 animate-orbit animate-orbit-reverse [--orbit-duration:18s]" />
      <div className="absolute inset-[-20px] rounded-full animate-orbit [--orbit-duration:6s]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_8px_3px_rgba(167,139,250,0.7)]" />
      </div>
      <div className="absolute inset-[-20px] rounded-full animate-orbit animate-orbit-reverse [--orbit-duration:8s]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_3px_rgba(34,211,238,0.7)]" />
      </div>

      <div className="w-44 h-44 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-full p-[3px] bg-gradient-to-br from-violet-500 via-purple-400 to-cyan-400 shadow-[0_0_70px_rgba(124,58,237,0.55),0_0_120px_rgba(124,58,237,0.2)]">
        <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a0f] ring-2 ring-black/40">
          <Image
            src="/shivam.png"
            alt="Shivam Mishra"
            width={256}
            height={256}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>

      {/* Two sonar pings, offset so one is always expanding */}
      <div className="absolute inset-0 rounded-full border border-violet-400/50 pointer-events-none animate-ring-ping" />
      <div className="absolute inset-0 rounded-full border border-cyan-400/40 pointer-events-none animate-ring-ping [animation-delay:1.8s]" />
    </div>
  );
}

function ThoughtBubble({
  opacity,
  y,
  inline = false,
}: {
  opacity?: MotionValue<number>;
  y?: MotionValue<number>;
  /** Sits in the normal flow above the avatar (mobile) instead of floating over it, so it can't slide under the navbar. */
  inline?: boolean;
}) {
  return (
    <motion.div
      style={opacity && y ? { opacity, y } : undefined}
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.0, duration: 0.6, type: 'spring', stiffness: 100 }}
      className={
        inline
          ? 'relative mx-auto mb-16 w-72 max-w-full z-30 pointer-events-none'
          : 'absolute left-1/2 -translate-x-1/2 bottom-full mb-20 w-72 z-30 pointer-events-none'
      }
    >
      <div className="relative bg-white/[0.06] backdrop-blur-md border border-violet-500/30 rounded-2xl p-5 shadow-[0_8px_40px_rgba(124,58,237,0.25)]">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={13} className="text-violet-400" />
          <span className="font-mono text-violet-400 text-[10px] tracking-[0.2em] uppercase">
            Thinking about
          </span>
        </div>
        <h3 className="text-white font-bold text-base leading-tight mb-1">{profile.name}</h3>
        <p className="text-slate-400 text-xs leading-snug">{profile.title}</p>
      </div>

      <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          className="w-2.5 h-2.5 rounded-full bg-violet-500/60 shadow-[0_0_8px_2px_rgba(167,139,250,0.5)]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          className="w-1.5 h-1.5 rounded-full bg-violet-500/40"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          className="w-1 h-1 rounded-full bg-violet-500/30"
        />
      </div>
    </motion.div>
  );
}

const infoItem: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easeOutExpo } },
};

function InfoPanel({
  centered = false,
  show = true,
  delay = 0,
}: {
  centered?: boolean;
  /** Plays the entrance when true, and reverses it when false. */
  show?: boolean;
  delay?: number;
}) {
  const alignment = centered ? 'items-center text-center' : 'items-start text-left';
  const btnRow = centered ? 'justify-center' : '';
  return (
    <motion.div
      initial="hidden"
      animate={show ? 'show' : 'hidden'}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.09, delayChildren: delay } },
      }}
      className={`flex flex-col ${alignment}`}
    >
      <motion.span
        variants={infoItem}
        className="inline-block font-mono text-violet-400 text-sm tracking-[0.2em] uppercase mb-4"
      >
        Hi, I&apos;m
      </motion.span>
      <motion.h1
        variants={infoItem}
        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight"
      >
        <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
          {profile.name}
        </span>
      </motion.h1>
      <motion.h2
        variants={infoItem}
        className="text-xl sm:text-2xl font-semibold mb-6 bg-gradient-to-r from-violet-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent animate-gradient-drift"
      >
        {profile.title}
      </motion.h2>
      <motion.p
        variants={infoItem}
        className="text-slate-400 text-base sm:text-lg leading-relaxed mb-10 max-w-lg"
      >
        {profile.tagline}
      </motion.p>
      <motion.div variants={infoItem} className={`flex flex-wrap gap-3 mb-10 ${btnRow}`}>
        <a
          href="#projects"
          className="btn-shine group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white font-semibold rounded-xl transition-[translate,scale,box-shadow] duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 active:scale-[0.97]"
        >
          View Projects
          <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
        </a>
        <a
          href="#contact"
          className="flex items-center gap-2 px-6 py-3 border border-violet-500/40 text-violet-300 hover:bg-violet-500/10 hover:border-violet-400/60 font-semibold rounded-xl transition-[translate,scale,background-color,border-color] duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
        >
          Contact Me
        </a>
        <a
          href="/journey/ZS"
          className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600/20 to-violet-600/20 border border-cyan-500/40 hover:border-cyan-400/60 hover:from-cyan-600/30 hover:to-violet-600/30 text-cyan-300 font-semibold rounded-xl transition-[translate,scale,border-color] duration-200 hover:-translate-y-0.5 active:scale-[0.97] backdrop-blur-sm"
        >
          <Sparkles size={15} className="transition-transform duration-300 group-hover:rotate-180 group-hover:scale-110" />
          My Journey
        </a>
      </motion.div>
      <motion.div variants={infoItem} className={`flex items-center gap-5 ${btnRow}`}>
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            aria-label={label}
            className="text-slate-400 hover:text-violet-400 hover:-translate-y-1 hover:scale-110 transition-[translate,scale,color] duration-200"
          >
            <Icon size={20} />
          </a>
        ))}
      </motion.div>
    </motion.div>
  );
}

function EdgeFades() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0a0a0f] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0a0a0f] to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0a0f] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktop = useIsDesktop();
  const { scrollY } = useScroll();

  // Scroll-driven values run through a spring so the avatar glides and settles
  // instead of tracking the scrollbar 1:1.
  const glide = { stiffness: 120, damping: 28, mass: 0.4 };
  const unitXvw = useSpring(useTransform(scrollY, [0, 400], [0, -22], { clamp: true }), glide);
  const unitX = useMotionTemplate`${unitXvw}vw`;
  const unitScale = useSpring(useTransform(scrollY, [0, 400], [1.05, 0.92], { clamp: true }), glide);

  const infoOpacity = useTransform(scrollY, [60, 300], [0, 1], { clamp: true });
  const infoX = useTransform(scrollY, [60, 400], [60, 0], { clamp: true });

  // The info panel's contents cascade in (and back out) once scrolling starts.
  const [infoShown, setInfoShown] = useState(() => scrollY.get() > 140);
  useMotionValueEvent(scrollY, 'change', (v) => setInfoShown(v > 140));

  const bubbleOpacity = useTransform(scrollY, [0, 120], [1, 0], { clamp: true });
  const bubbleY = useTransform(scrollY, [0, 120], [0, -30], { clamp: true });

  const hintOpacity = useTransform(scrollY, [0, 80], [1, 0], { clamp: true });

  return (
    // One #home for the nav and anchor links; the two layouts below are mutually exclusive by breakpoint.
    <div id="home">
      {/* Mobile: simple static stacked */}
      <section
        className="lg:hidden min-h-screen bg-[#0a0a0f] relative overflow-hidden flex flex-col items-center justify-center px-6 pt-32 pb-16"
      >
        <div className="absolute inset-0 opacity-60">{desktop === false && <Hero3D />}</div>
        <EdgeFades />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[radial-gradient(closest-side,rgb(124_58_237/0.2),transparent)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(closest-side,rgb(6_182_212/0.15),transparent)] pointer-events-none" />

        <div className="relative z-20 flex flex-col items-center gap-16 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, type: 'spring', stiffness: 80 }}
            className="relative flex flex-col items-center"
          >
            <ThoughtBubble inline />
            <ImageAvatar />
          </motion.div>
          <div className="w-full">
            <InfoPanel centered delay={0.4} />
          </div>
        </div>
      </section>

      {/* Desktop: scrollytelling — height increased so scroll range matches animation range */}
      <section
        ref={sectionRef}
        className="hidden lg:block relative bg-[#0a0a0f] h-[260vh]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Ambient background glows (stationary) */}
          <div className="absolute top-20 right-0 w-[760px] h-[760px] bg-[radial-gradient(closest-side,rgb(124_58_237/0.2),transparent)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[640px] h-[640px] bg-[radial-gradient(closest-side,rgb(6_182_212/0.15),transparent)] pointer-events-none" />

          {/* 3D + Image unit — moves together */}
          <motion.div
            style={{ x: unitX, scale: unitScale }}
            className="absolute left-1/2 top-0 -translate-x-1/2 h-screen aspect-square z-20"
          >
            {/* 3D fills this container — radial mask blends edges into background */}
            <div
              className="absolute inset-0"
              style={{
                maskImage: 'radial-gradient(circle at center, black 30%, transparent 72%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 72%)',
              }}
            >
              {desktop && <Hero3D />}
            </div>

            {/* Image + bubble — absolute-centered exactly on 3D origin */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, type: 'spring', stiffness: 80 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <ThoughtBubble opacity={bubbleOpacity} y={bubbleY} />
              <ImageAvatar />
            </motion.div>
          </motion.div>

          {/* Info panel — slides in from right */}
          <motion.div
            style={{ opacity: infoOpacity, x: infoX }}
            className="absolute right-0 top-0 h-full w-1/2 flex items-center pr-20 pl-12 z-10"
          >
            <InfoPanel show={infoShown} />
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 z-30 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase">Scroll</span>
            <div className="animate-nudge-down">
              <ChevronDown size={22} />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
