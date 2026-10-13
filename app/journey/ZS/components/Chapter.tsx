import { ChevronDown } from "lucide-react";
import { fill, statusLabel, fmtDay, type Stage } from "../derive";
import Artifact from "./Artifact";
import Attachment from "./Attachment";
import { stageIcons } from "./icons";
import Jolt from "./Jolt";
import Reveal from "./Reveal";

type Variant = "split" | "stack" | "center";

/** The real emails and documents of a stage, framed. Driven by `featured: true` in data.ts. */
export function StageArtifacts({ stage, className = "" }: { stage: Stage; className?: string }) {
  const items = stage.events.filter((e) => e.featured);
  if (!items.length) return null;
  return (
    <div className={`grid gap-5 ${className}`}>
      {items.map((e) => (
        <Reveal key={e.id}>
          <Artifact e={e} />
        </Reveal>
      ))}
    </div>
  );
}

/** Every entry of the stage, kept in full. Collapsed so the chapter stays a story, not a table. */
export function EventLog({ stage }: { stage: Stage }) {
  return (
    <details className="group mt-16 border-t border-zs-line md:mt-24">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold uppercase tracking-[0.16em] text-zs-mute transition-colors hover:text-zs-text [&::-webkit-details-marker]:hidden">
        <span>Full log · {stage.events.length} {stage.events.length === 1 ? "entry" : "entries"}</span>
        <ChevronDown size={18} aria-hidden="true" className="transition-transform group-open:rotate-180" />
      </summary>
      <ol className="pb-4 pt-2">
        {stage.events.map((e) => {
          const Wrap: React.ElementType = e.status === "red" ? Jolt : "div";
          return (
            <li key={e.id} id={e.id} data-s={e.status} className="scroll-mt-16 border-t border-zs-line/60 py-5 first:border-t-0">
              <Wrap className="grid gap-x-8 gap-y-1 md:grid-cols-[8rem_minmax(0,1fr)]">
                <p className="pt-1 text-zs-mute tabular-nums">
                  {fmtDay(e.day)}
                  {e.time && <span> · {e.time}</span>}
                </p>
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h4 className="text-lg font-semibold">{e.title}</h4>
                    <span className="zs-chip capitalize" data-s={e.status}>
                      <span className="zs-glyph" data-s={e.status} aria-hidden="true" />
                      <span className="sr-only">{statusLabel[e.status]}: </span>
                      {e.badge.toLowerCase()}
                    </span>
                  </div>
                  <p className="mt-1.5 max-w-prose leading-relaxed text-zs-mute">{e.description}</p>
                  {(e.emailData || e.pdf) && <Attachment e={e} />}
                </div>
              </Wrap>
            </li>
          );
        })}
      </ol>
    </details>
  );
}

function Head({ stage, variant }: { stage: Stage; variant: Variant }) {
  const Icon = stageIcons[stage.id];
  const center = variant === "center";
  return (
    <header className={center ? "mx-auto max-w-4xl text-center" : ""}>
      <p
        aria-hidden="true"
        className="zs-gtext font-head text-[clamp(7rem,20vw,16rem)] font-extrabold leading-[0.8] [font-stretch:55%]"
      >
        {stage.number}
      </p>
      <p className={`mt-6 flex items-center gap-3 text-sm font-semibold tracking-[0.16em] text-zs-landmark ${center ? "justify-center" : ""}`}>
        <Icon size={16} aria-hidden="true" />
        <span>
          <span className="sr-only">Stage {stage.number}: </span>
          {stage.dates} 2026
        </span>
      </p>
      <h2
        id={`${stage.id}-h`}
        className="mt-3 font-head text-4xl font-bold uppercase leading-[0.95] [font-stretch:68%] md:text-6xl"
      >
        {stage.name}
      </h2>
      <p
        className={
          center
            ? "mt-8 font-head text-[clamp(2.75rem,8.5vw,7.5rem)] font-extrabold leading-[0.92] [font-stretch:62%] zs-gtext"
            : "mt-6 text-2xl italic text-zs-text md:text-3xl"
        }
      >
        {stage.tagline}
      </p>
      <p className={`mt-5 text-lg leading-relaxed text-zs-mute ${center ? "mx-auto max-w-2xl" : "max-w-md"}`}>{fill(stage.story)}</p>
      {stage.note && (
        <p className="mt-4 inline-block rounded-sm bg-zs-alert/15 px-2 py-0.5 text-sm font-medium text-zs-alert">{stage.note}</p>
      )}
    </header>
  );
}

/**
 * One stop on the route. `split` puts the text and the stage visual side by side (`flip` swaps them),
 * `stack` gives the visual the full width below, `center` centres everything.
 */
export default function Chapter({
  stage,
  index,
  variant = "split",
  flip = false,
  sticky = false,
  children,
}: {
  stage: Stage;
  index: number;
  variant?: Variant;
  flip?: boolean;
  /** Keep the text in view while a tall visual scrolls past (desktop). */
  sticky?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={stage.id}
      data-stage={index}
      aria-labelledby={`${stage.id}-h`}
      className="scroll-mt-12 border-t border-zs-line py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {variant === "split" ? (
          <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className={`lg:col-span-5 ${flip ? "lg:order-2" : ""} ${sticky ? "lg:sticky lg:top-24" : ""}`}>
              <Head stage={stage} variant={variant} />
            </Reveal>
            <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>{children}</div>
          </div>
        ) : (
          <>
            <Reveal>
              <Head stage={stage} variant={variant} />
            </Reveal>
            <div className="mt-16 md:mt-24">{children}</div>
          </>
        )}
        <EventLog stage={stage} />
      </div>
    </section>
  );
}
