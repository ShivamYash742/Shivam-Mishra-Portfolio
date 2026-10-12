import Link from "next/link";
import { ArrowDown, ArrowLeft } from "lucide-react";
import { copy, stats } from "../data";
import { TOTAL_DAYS } from "../derive";
import DayStrip from "./DayStrip";

export default function Hero() {
  return (
    <header className="mx-auto max-w-7xl px-5 pb-12 pt-6 sm:px-8 md:pb-16 md:pt-8">
      <nav className="flex items-center justify-between gap-4 text-sm">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 text-zs-mute transition-colors hover:text-zs-text"
        >
          <ArrowLeft size={16} aria-hidden="true" /> {copy.hero.portfolioLink}
        </Link>
        <p className="text-right text-zs-mute">{stats.company} · {stats.campaign}</p>
      </nav>

      <h1 className="mt-12 font-head text-[clamp(4.25rem,16.5vw,14.5rem)] font-extrabold leading-[0.9] tracking-[0.01em] [font-stretch:58%] md:mt-16">
        <span className="zs-mask block">
          <span className="zs-rise zs-gtext-hero block">{TOTAL_DAYS} days,</span>
        </span>
        <span className="zs-mask block">
          <span className="zs-rise zs-gtext-hero block [animation-delay:0.14s]">{copy.hero.tagline}</span>
        </span>
      </h1>

      <div className="mt-10 flex flex-col gap-6 md:mt-14 md:flex-row md:items-end md:justify-between">
        <p className="max-w-xl text-lg leading-relaxed text-zs-mute md:text-xl">
          {copy.hero.blurb} <span className="text-zs-text">{stats.role}</span>, {stats.offer}.
        </p>
        <a
          href="#log"
          className="group inline-flex min-h-12 shrink-0 items-center gap-3 self-start rounded-full border border-zs-line px-6 font-semibold transition-colors hover:border-zs-landmark hover:text-zs-landmark md:self-auto"
        >
          {copy.hero.cta}
          <ArrowDown size={16} aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" />
        </a>
      </div>

      <div className="mt-14 md:mt-20">
        <DayStrip />
      </div>
    </header>
  );
}
