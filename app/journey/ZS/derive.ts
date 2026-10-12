// Everything computed from data.ts. Nothing here needs editing.
import { phases, stats, type EventStatus } from "./data";

const DAY = 864e5;
const utc = (iso: string) => Date.parse(`${iso}T00:00:00Z`);

export const START = utc(stats.startDate);
export const TOTAL_DAYS = Math.round((utc(stats.endDate) - START) / DAY);

export const dayOf = (iso: string) => Math.round((utc(iso) - START) / DAY);
const fmt = (opts: Intl.DateTimeFormatOptions) => (iso: number) =>
  new Intl.DateTimeFormat("en-US", { ...opts, timeZone: "UTC" }).format(iso);

export const fmtDay = (day: number) => fmt({ month: "short", day: "numeric" })(START + day * DAY);
export const fmtIso = (iso: string) => fmt({ month: "short", day: "numeric" })(utc(iso));
export const fmtIsoLong = (iso: string) => fmt({ month: "short", day: "numeric", year: "numeric" })(utc(iso));

export const statusLabel: Record<EventStatus, string> = {
  muted: "Routine",
  blue: "Progress",
  gold: "Landmark",
  red: "Disruption",
};

// Sorted by date (stable), each entry gets an id like "2026-06-17-2" for anchors.
const seen: Record<string, number> = {};
export const allEvents = phases
  .flatMap((phase) => phase.events.map((e) => ({ ...e, phase, day: dayOf(e.date) })))
  .sort((a, b) => a.day - b.day)
  .map((e) => ({ ...e, id: `${e.date}-${(seen[e.date] = (seen[e.date] ?? 0) + 1)}` }));

/** Where a PDF named in data.ts is served from. */
/** One PDF name or a list → always a list. */
export const pdfsOf = (pdf?: string | string[]) => (pdf === undefined ? [] : [pdf].flat());

export const pdfSrc = (file: string) => `/journey/zs/${encodeURIComponent(file)}`;
