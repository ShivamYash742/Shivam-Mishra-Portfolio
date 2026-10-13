import { ArrowDown, ArrowRight } from "lucide-react";
import { challengeMoments, copy } from "../data";
import { fmtIso, type Stage } from "../derive";
import { StageArtifacts } from "./Chapter";
import Jolt from "./Jolt";
import Reschedules from "./Reschedules";
import Reveal from "./Reveal";

const panel = "border border-zs-line bg-zs-panel/40 p-6 md:p-8";
const kicker = "text-xs font-semibold uppercase tracking-[0.2em] text-zs-mute";

/** 01: the first artifact, with the Day 0 marker. */
export function RegistrationVisual({ stage }: { stage: Stage }) {
  return (
    <div className="grid gap-5">
      <Reveal className={`${panel} flex items-end justify-between gap-6`}>
        <p className={kicker}>Day</p>
        <p className="font-head text-[clamp(6rem,14vw,11rem)] font-extrabold leading-[0.8] [font-stretch:55%]">0</p>
      </Reveal>
      <StageArtifacts stage={stage} />
    </div>
  );
}

/** 02: two sessions on a short line, then the webinar email. */
export function AwarenessVisual({ stage }: { stage: Stage }) {
  const first = stage.events[0];
  const last = stage.events[stage.events.length - 1];
  return (
    <div className="grid gap-5">
      <Reveal className={panel}>
        <p className={kicker}>Two sessions, {last.day - first.day} days apart</p>
        <div className="mt-8 flex items-center gap-4">
          {[first, last].map((e, i) => (
            <div key={e.id} className="contents">
              {i === 1 && <span aria-hidden="true" className="h-px flex-1 bg-linear-to-r from-zs-landmark to-zs-line" />}
              <div className={i === 1 ? "text-right" : ""}>
                <p className="font-head text-4xl font-bold [font-stretch:70%] md:text-5xl">{fmtIso(e.date)}</p>
                <p className="mt-1 text-sm text-zs-mute">{e.title}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
      <StageArtifacts stage={stage} />
    </div>
  );
}

/** 03: the stage with the most weight: what the challenge was, how it went wrong, the screening that followed. */
export function HackathonVisual({ stage }: { stage: Stage }) {
  const { scoring } = challengeMoments;
  const screening = stage.events[stage.events.length - 1]; // the aptitude assessment the next day
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-12">
        <Reveal className={`${panel} lg:col-span-7`}>
          <p className={kicker}>The challenge</p>
          <p className="mt-4 text-xl leading-relaxed md:text-2xl">{copy.hackathon.challenge}</p>
          <dl className="mt-8 divide-y divide-zs-line border-t border-zs-line text-sm">
            {copy.hackathon.facts.map(({ k, v }) => (
              <div key={k} className="flex justify-between gap-6 py-3">
                <dt className="text-zs-mute">{k}</dt>
                <dd className="text-right font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className={`${panel} lg:col-span-5`} delay={0.1}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zs-alert">{scoring.date} · when it broke</p>
          <Jolt>
            <h3 className="mt-4 font-head text-3xl font-bold leading-tight [font-stretch:72%] md:text-4xl">{scoring.title}</h3>
          </Jolt>
          <p className="mt-4 leading-relaxed text-zs-mute">{scoring.description}</p>
          <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-3">
            {scoring.steps.map(({ status: s, label }, i) => (
              <li key={label} className="flex items-center gap-2">
                <span className="zs-chip" data-s={s}>
                  <span className="zs-glyph" data-s={s} aria-hidden="true" />
                  {label}
                </span>
                {i < scoring.steps.length - 1 && <ArrowRight size={14} aria-hidden="true" className="text-zs-mute" />}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      <Reveal className={`${panel} grid gap-4 md:grid-cols-12 md:items-baseline`}>
        <div className="md:col-span-4">
          <p className={kicker}>The screening · {fmtIso(screening.date)}</p>
          <h3 className="mt-3 text-xl font-semibold">{screening.title}</h3>
        </div>
        <p className="leading-relaxed text-zs-mute md:col-span-8">{screening.description}</p>
      </Reveal>

      <StageArtifacts stage={stage} className="lg:grid-cols-3" />
    </div>
  );
}

/** 04: the turning point. A statement above, a short descent from submission to shortlist below. */
export function ShortlistVisual({ stage }: { stage: Stage }) {
  const steps = stage.steps ?? [];
  return (
    <div className="mx-auto max-w-3xl">
      <ol className="text-center">
        {steps.map((s, i) => {
          const end = i === steps.length - 2; // "Shortlisted" is the turning point; the assessment after it is a footnote
          return (
            <li key={s.label}>
              <Reveal>
                <p className={`font-head font-extrabold uppercase leading-none [font-stretch:62%] ${end ? "zs-gtext text-6xl md:text-8xl" : "text-4xl text-zs-mute md:text-6xl"}`}>
                  {s.label}
                </p>
                <p className="mt-3 text-sm tracking-[0.12em] text-zs-mute">
                  {fmtIso(s.date)} · {s.note}
                </p>
              </Reveal>
              {i < steps.length - 1 && (
                <ArrowDown size={22} aria-hidden="true" className={`mx-auto my-6 ${end ? "text-zs-landmark" : "text-zs-line"}`} />
              )}
            </li>
          );
        })}
      </ol>
      <StageArtifacts stage={stage} className="mt-20" />
    </div>
  );
}

/** 05: preparation turns into execution; the slots that were taken away, then the one that held. */
export function SchedulingVisual({ stage }: { stage: Stage }) {
  const { reschedules } = challengeMoments;
  return (
    <div className="grid gap-5">
      <Reveal className={panel}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zs-alert">{reschedules.date}</p>
        <Jolt>
          <h3 className="mt-3 font-head text-3xl font-bold leading-tight [font-stretch:72%] md:text-5xl">{reschedules.title}</h3>
        </Jolt>
        <p className="mt-4 max-w-xl leading-relaxed text-zs-mute">{reschedules.description}</p>
        <Reschedules />
      </Reveal>
      <StageArtifacts stage={stage} className="md:grid-cols-2" />
    </div>
  );
}
