import { BadgeCheck, CalendarClock, Code, Flag, MessagesSquare, UserPlus, Video, type LucideIcon } from "lucide-react";

/** One small icon per stage, keyed by phase id in data.ts. */
export const stageIcons: Record<string, LucideIcon> = {
  registration: UserPlus,
  awareness: Video,
  hackathon: Code,
  shortlisting: BadgeCheck,
  scheduling: CalendarClock,
  interviews: MessagesSquare,
  outcome: Flag,
};
