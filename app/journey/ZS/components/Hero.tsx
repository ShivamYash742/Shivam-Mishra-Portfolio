import Link from "next/link";
import { ArrowDown, ArrowLeft } from "lucide-react";
import { copy, stats } from "../data";
import { fill, stages, TOTAL_DAYS } from "../derive";

const figures = [
  { n: TOTAL_DAYS, label: "Days" },
  { n: stages.length, label: "Stages" },
  { n: 1, label: "Offer" },
];

export default function Hero() {
  return (
    <header className="mx-auto max-w-7xl px-5 pb-16 pt-6 sm:px-8 md:pb-24 md:pt-8">
      <nav className="flex items-center justify-between gap-4 text-sm">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 text-zs-mute transition-colors hover:text-zs-text"
        >
          <ArrowLeft size={16} aria-hidden="true" /> {copy.hero.portfolioLink}
        </Link>
        <p className="text-right text-zs-mute">{stats.company} · {stats.campaign}</p>
      </nav>

      <p className="mt-16 text-sm tracking-[0.14em] text-zs-mute md:mt-24">
        <span className="text-zs-landmark">/</span> journey <span className="text-zs-landmark">/</span> ZS
      </p>
      <h1 className="mt-4 font-head text-[clamp(4.5rem,17vw,15rem)] font-extrabold uppercase leading-[0.86] tracking-[0.01em] [font-stretch:58%]">
        <span className="zs-mask block">
          <span className="zs-rise zs-gtext-hero block">{copy.hero.title}</span>
        </span>
      </h1>

      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="text-2xl font-semibold md:text-3xl">{copy.hero.lede}</p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-zs-mute">{fill(copy.hero.blurb)}</p>
          <a
            href="#route"
            className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full border border-zs-line px-6 font-semibold transition-colors hover:border-zs-landmark hover:text-zs-landmark"
          >
            {copy.hero.cta}
            <ArrowDown size={16} aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
        <dl className="grid grid-cols-3 border-t border-zs-line md:col-span-5">
          {figures.map(({ n, label }) => (
            <div key={label} className="flex flex-col-reverse justify-end pt-5">
              <dt className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-zs-mute">{label}</dt>
              <dd className="font-head text-5xl font-extrabold leading-none [font-stretch:62%] md:text-7xl">{n}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
