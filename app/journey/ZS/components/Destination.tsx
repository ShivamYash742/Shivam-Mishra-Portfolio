import { Flag } from "lucide-react";
import { copy, stats } from "../data";
import { fill, fmtIsoLong, stages } from "../derive";
import Artifact from "./Artifact";
import { EventLog } from "./Chapter";
import Reveal from "./Reveal";

const stage = stages[stages.length - 1];
const offer = stage.events.find((e) => e.isOffer)!;

/** The route arrives. Fewer elements than any other chapter, and more room around them. */
export default function Destination({ index }: { index: number }) {
  return (
    <section
      id={stage.id}
      data-stage={index}
      aria-labelledby="outcome-h"
      className="relative scroll-mt-12 overflow-hidden border-t border-zs-line pb-24 pt-0 text-center md:pb-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-24 h-[60rem] bg-[radial-gradient(50%_40%_at_50%_22%,color-mix(in_oklab,var(--color-zs-landmark)_20%,transparent),transparent)]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <span aria-hidden="true" className="mx-auto block h-28 w-px bg-linear-to-b from-transparent to-zs-landmark md:h-40" />
        <span className="zs-glow zs-ring relative mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-zs-landmark bg-zs-ink">
          <Flag size={24} aria-hidden="true" />
        </span>

        <Reveal>
          <p className="mt-10 text-sm font-semibold tracking-[0.2em] text-zs-landmark">
            <span className="sr-only">Stage {stage.number}: </span>
            {stage.number} · {fmtIsoLong(offer.date).toUpperCase()}
          </p>
          <h2
            id="outcome-h"
            className="mt-4 font-head text-[clamp(2.25rem,6vw,5rem)] font-bold uppercase leading-none [font-stretch:68%]"
          >
            {stage.tagline.replace(/\.$/, "")}
          </h2>
          <p className="zs-gtext mx-auto mt-10 max-w-5xl font-head text-[clamp(4rem,15vw,13rem)] font-extrabold uppercase leading-[0.84] [font-stretch:56%]">
            {copy.offer.headline}
          </p>
          <p className="mt-10 font-head text-4xl font-bold uppercase [font-stretch:70%] md:text-6xl">{stats.offerShort}</p>
          <p className="mt-3 text-zs-mute">
            {stats.role} · {stats.offer} · {stats.offerType}
          </p>
          <p className="mx-auto mt-10 max-w-xl text-lg leading-relaxed text-zs-mute">{fill(stage.story)}</p>
        </Reveal>

        <Reveal className="mx-auto mt-20 max-w-2xl text-left">
          <Artifact e={offer} />
        </Reveal>

        <div className="mx-auto max-w-4xl text-left">
          <EventLog stage={stage} />
        </div>
      </div>
    </section>
  );
}
