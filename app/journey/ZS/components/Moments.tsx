import { ArrowRight } from "lucide-react";
import { challengeMoments, copy } from "../data";
import Jolt from "./Jolt";
import Reschedules from "./Reschedules";

const { scoring, reschedules } = challengeMoments;

function Moment({ date, title, body, offset, children }: {
  date: string;
  title: string;
  body: string;
  offset?: boolean;
  children: React.ReactNode;
}) {
  return (
    <article className={`grid gap-6 md:grid-cols-12 md:gap-10 ${offset ? "md:pl-[8%]" : ""}`}>
      <p
        className="zs-gtext-hot font-head text-[clamp(3.75rem,9vw,8rem)] font-extrabold leading-[0.85] [font-stretch:58%] md:col-span-5"
        aria-hidden="true"
      >
        {date}
      </p>
      <div className="md:col-span-7">
        <Jolt>
          <h3 className="text-2xl font-semibold md:text-3xl">
            <span className="sr-only">{date}: </span>
            {title}
          </h3>
        </Jolt>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-zs-mute">{body}</p>
        {children}
      </div>
    </article>
  );
}

export default function Moments() {
  return (
    <section id="moments" aria-labelledby="moments-h" className="zs-glow-hot">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <h2 id="moments-h" className="font-head text-5xl font-bold [font-stretch:70%] md:text-7xl">
        {copy.moments.title}
      </h2>
      <p className="mt-4 max-w-xl text-lg text-zs-mute">
        {copy.moments.intro}
      </p>

      <div className="mt-20 space-y-28">
        <Moment date={scoring.date} title={scoring.title} body={scoring.description}>
          <ol className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
            {scoring.steps.map(({ status: s, label }, i) => (
              <li key={label} className="flex items-center gap-3">
                <span className="zs-chip" data-s={s}>
                  <span className="zs-glyph" data-s={s} aria-hidden="true" />
                  {label}
                </span>
                {i < scoring.steps.length - 1 && <ArrowRight size={16} aria-hidden="true" className="text-zs-mute" />}
              </li>
            ))}
          </ol>
        </Moment>

        <Moment offset date={reschedules.date} title={reschedules.title} body={reschedules.description}>
          <Reschedules />
        </Moment>
      </div>
      </div>
    </section>
  );
}
