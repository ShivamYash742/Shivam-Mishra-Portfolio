import { copy } from "../data";
import { fill } from "../derive";
import Reveal from "./Reveal";

export default function Reflections() {
  const { title, blocks } = copy.reflection;
  return (
    <section aria-labelledby="changed-h" className="border-t border-zs-line px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <h2
          id="changed-h"
          className="max-w-4xl font-head text-[clamp(3rem,8vw,7rem)] font-extrabold uppercase leading-[0.9] [font-stretch:60%]"
        >
          {fill(title)}
        </h2>
        <ol className="mt-16 grid gap-px border-y border-zs-line bg-zs-line md:mt-24 md:grid-cols-3">
          {blocks.map((b, i) => (
            <li key={b.title} className="bg-zs-ink">
              <Reveal delay={i * 0.1} className="flex h-full flex-col p-6 md:p-8">
                <p className="text-xs font-semibold tracking-[0.2em] text-zs-landmark">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-head text-4xl font-bold uppercase [font-stretch:68%] md:text-5xl">{b.title}</h3>
                <p className="mt-8 font-head text-5xl font-extrabold leading-none [font-stretch:62%] zs-gtext">{fill(b.stat)}</p>
                <p className="mt-1 text-sm text-zs-mute">{fill(b.statNote)}</p>
                <p className="mt-6 leading-relaxed text-zs-mute">{fill(b.body)}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
