"use client";

import { useState } from "react";
import { copy, type EventStatus } from "../data";
import { allEvents, fmtDay, START, statusLabel, TOTAL_DAYS } from "../derive";

const RANK: Record<EventStatus, number> = { muted: 0, blue: 1, gold: 2, red: 3 };

// One tile per day, placed on a month × day-of-month grid (a calendar heatmap).
const first = new Date(START);
const monthRow = (d: Date) =>
  (d.getUTCFullYear() - first.getUTCFullYear()) * 12 + d.getUTCMonth() - first.getUTCMonth();
const monthLabels = Array.from({ length: monthRow(new Date(START + TOTAL_DAYS * 864e5)) + 1 }, (_, i) =>
  new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" }).format(
    Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + i, 1),
  ),
);

const days = Array.from({ length: TOTAL_DAYS + 1 }, (_, d) => {
  const date = new Date(START + d * 864e5);
  const events = allEvents.filter((e) => e.day === d);
  const status = events.reduce<EventStatus | undefined>(
    (top, e) => (top === undefined || RANK[e.status] > RANK[top] ? e.status : top),
    undefined,
  );
  return { d, row: monthRow(date), col: date.getUTCDate() + 1, events, status };
});

const legend = (Object.keys(statusLabel) as EventStatus[]).map((s) => ({
  s,
  count: allEvents.filter((e) => e.status === s).length,
}));

export default function DayStrip() {
  const [active, setActive] = useState<number | null>(null);
  const hit = active === null ? null : days[active];

  return (
    <div>
      <div
        role="group"
        aria-label={`Calendar of ${TOTAL_DAYS + 1} days from ${fmtDay(0)} to ${fmtDay(TOTAL_DAYS)}. Lit days are milestones and link to their entry in the log.`}
        className="grid gap-[3px] sm:gap-1"
        style={{ gridTemplateColumns: "2.25rem repeat(31, minmax(0, 1fr))" }}
        onMouseLeave={() => setActive(null)}
      >
        {monthLabels.map((m, i) => (
          <span key={m + i} className="self-center text-xs text-zs-mute" style={{ gridColumn: 1, gridRow: i + 1 }}>
            {m}
          </span>
        ))}
        {days.map(({ d, row, col, events, status }) => {
          const style = { gridColumn: col, gridRow: row + 1, "--i": d } as React.CSSProperties;
          if (!events.length)
            return <span key={d} aria-hidden="true" className="zs-tile zs-pop" style={style} />;
          return (
            <a
              key={d}
              href={`#${events[0].id}`}
              data-s={status}
              aria-label={`${fmtDay(d)}, day ${d}: ${events.map((e) => e.title).join(", ")}`}
              className={`zs-tile zs-pop relative ${d === TOTAL_DAYS ? "zs-pulse" : ""}`}
              style={style}
              onMouseEnter={() => setActive(d)}
              onFocus={() => setActive(d)}
              onBlur={() => setActive(null)}
            />
          );
        })}
      </div>

      <p aria-live="polite" className="mt-6 min-h-14 max-w-3xl text-base sm:text-lg">
        {hit ? (
          <>
            <span className="font-semibold tabular-nums">
              {fmtDay(hit.d)} · Day {hit.d}
            </span>
            <span className="text-zs-mute"> — {hit.events.map((e) => e.title).join(" / ")}</span>
          </>
        ) : (
          <span className="text-zs-mute">{copy.hero.calendarHint}</span>
        )}
      </p>

      <ul className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zs-mute">
        {legend.map(({ s, count }) => (
          <li key={s} className="flex items-center gap-2">
            <span className="zs-glyph" data-s={s} aria-hidden="true" />
            {statusLabel[s]} <b className="font-semibold tabular-nums text-zs-text">{count}</b>
          </li>
        ))}
        <li className="font-semibold text-zs-text">= {allEvents.length} milestones</li>
      </ul>
    </div>
  );
}
