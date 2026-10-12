import { ChevronDown, ExternalLink, FileText, Mail } from "lucide-react";
import { copy, phases } from "../data";
import { allEvents, fmtDay, pdfsOf, pdfSrc, statusLabel } from "../derive";
import Jolt from "./Jolt";
import LogShell from "./LogShell";

type Entry = (typeof allEvents)[number];

// Space between entries grows with the days between them, capped so a 22-day wait stays scrollable.
const gapPx = (days: number) => (days === 0 ? 14 : Math.min(28 + days * 5, 130));
const prev = new Map(allEvents.map((e, i) => [e.id, allEvents[i - 1]]));

/** Expander for an entry: the email text and/or its PDF. The PDF iframe is lazy, so it only loads once opened. */
function Attachment({ e }: { e: Entry }) {
  const mail = e.emailData;
  const pdfs = pdfsOf(e.pdf);
  return (
    <details className="zs-mail group mt-2 max-w-3xl border-l-2 border-transparent open:border-zs-line open:bg-zs-panel/70">
      <summary className="flex min-h-10 w-fit cursor-pointer list-none items-center gap-2 pr-2 text-sm font-medium text-zs-progress hover:underline group-open:px-4 [&::-webkit-details-marker]:hidden">
        {mail ? <Mail size={16} aria-hidden="true" /> : <FileText size={16} aria-hidden="true" />}
        {mail ? `Email from ${mail.sender}` : (e.pdfLabel ?? "View document")}
        <ChevronDown size={16} aria-hidden="true" className="transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-4 pb-4 text-sm">
        {mail && (
          <>
            <p className="text-zs-mute">{mail.senderRole}</p>
            <p className="mt-2 font-semibold">{mail.subject}</p>
            <p className="mt-1 leading-relaxed text-zs-mute">{mail.preview}</p>
          </>
        )}
        {pdfs.map((file) => (
          <div key={file} className="mt-5">
            {pdfs.length > 1 && <p className="mb-2 font-medium">{file.replace(/\.pdf$/i, "").replace(/[-_]/g, " ")}</p>}
            <iframe
              src={pdfSrc(file)}
              title={`${e.title}: ${file}`}
              loading="lazy"
              className="hidden h-[34rem] w-full rounded-sm border border-zs-line bg-white md:block"
            />
            <a
              href={pdfSrc(file)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-zs-progress underline-offset-4 hover:underline"
            >
              <FileText size={16} aria-hidden="true" /> Open PDF in a new tab
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        ))}
      </div>
    </details>
  );
}

function Row({ e }: { e: Entry }) {
  const before = prev.get(e.id);
  const wait = before ? e.day - before.day : 0;
    const feature = e.isVictory || e.isOffer;
  const Wrap: React.ElementType = e.status === "red" ? Jolt : "div";

  return (
    <>
      {before && (
        <li aria-hidden="true" className="relative" style={{ height: gapPx(wait) }}>
          {wait >= 3 && (
            <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm italic text-zs-mute">
              {wait} days later
            </span>
          )}
        </li>
      )}
      <li
        id={e.id}
        data-day={e.day}
        data-n={e.phase.number}
        data-phase={e.phase.name}
        data-s={e.status}
        className="zs-ev relative isolate scroll-mt-28 pl-9"
      >
        {feature && (
          <span
            aria-hidden="true"
            className="absolute -inset-y-4 left-7 right-0 -z-10 rounded-sm bg-linear-to-r from-zs-landmark/15 to-transparent outline outline-1 outline-zs-landmark/30"
          />
        )}
        <span className="zs-glyph absolute left-0 top-2" data-s={e.status} aria-hidden="true" />

        <Wrap className="grid gap-x-8 gap-y-1 md:grid-cols-[6.5rem_minmax(0,1fr)]">
          <p className="pt-1 text-zs-mute tabular-nums">
            {fmtDay(e.day)}
            {e.time && <span> · {e.time}</span>}
          </p>
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h4
                className={
                  feature
                    ? "font-head text-3xl font-bold leading-tight [font-stretch:72%] md:text-5xl"
                    : "text-lg font-semibold md:text-xl"
                }
              >
                {e.title}
              </h4>
              <span className="zs-chip capitalize" data-s={e.status} title={statusLabel[e.status]}>
                <span className="zs-glyph" data-s={e.status} aria-hidden="true" />
                <span className="sr-only">{statusLabel[e.status]}: </span>
                {e.badge.toLowerCase()}
              </span>
            </div>
            <p className="mt-2 max-w-prose leading-relaxed text-zs-mute">{e.description}</p>
            {(e.emailData || e.pdf) && <Attachment e={e} />}
          </div>
        </Wrap>
      </li>
    </>
  );
}

export default function Chronicle() {
  return (
    <section id="log" aria-labelledby="log-h" className="scroll-mt-4 pb-20 pt-8 md:pb-28 md:pt-12">
      <div className="mx-auto mb-12 max-w-7xl px-5 sm:px-8 md:mb-16">
        <h2 id="log-h" className="font-head text-5xl font-bold [font-stretch:70%] md:text-7xl">
          {copy.log.title}
        </h2>
        <p className="mt-4 max-w-xl text-lg text-zs-mute">
          {allEvents.length} entries in {phases.length} phases. {copy.log.intro}
        </p>
      </div>

      <LogShell>
        {phases.map((phase) => (
          <section key={phase.id} aria-labelledby={`ph-${phase.id}`} className="pt-16 first:pt-0">
            <header className="mb-8 pl-9">
              <p className="text-zs-mute">Phase {phase.number}</p>
              <h3 id={`ph-${phase.id}`} className="font-head text-4xl font-bold [font-stretch:68%] md:text-6xl">
                {phase.name}
              </h3>
              {phase.note && (
                <p className="mt-2 inline-block rounded-sm bg-zs-alert/15 px-2 py-0.5 text-sm font-medium text-zs-alert">
                  {phase.note}
                </p>
              )}
            </header>
            <ol>
              {allEvents
                .filter((e) => e.phase.id === phase.id)
                .map((e) => (
                  <Row key={e.id} e={e} />
                ))}
            </ol>
          </section>
        ))}
      </LogShell>
    </section>
  );
}
