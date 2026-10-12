import type { Metadata, Viewport } from "next";
import { Anybody, Instrument_Sans } from "next/font/google";
import { stats } from "./data";
import { allEvents, TOTAL_DAYS } from "./derive";

// Anybody's width axis lets the numerals run tall and narrow.
const head = Anybody({
  variable: "--font-zs-head",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const text = Instrument_Sans({
  variable: "--font-zs-text",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = { themeColor: "#0e0a1e", colorScheme: "dark" };

const reschedules = allEvents.filter((e) => e.status === "red").length;

export const metadata: Metadata = {
  title: `ZS Campus Beats — ${TOTAL_DAYS} Days to One Offer | Shivam Mishra`,
  description: `An interactive case study of ${TOTAL_DAYS} days navigating ${stats.company}' ${stats.campaign} process, from hackathon to PPO. ${stats.role} · ${stats.offer}.`,
  keywords: ["ZS Associates", "Campus Beats", "PPO", "BTSA", "Shivam Mishra", "MSIT", "Placement Journey"],
  openGraph: {
    title: `ZS Campus Beats — ${TOTAL_DAYS} Days to One Offer`,
    description: `An interactive case study of ${TOTAL_DAYS} days, ${allEvents.length} milestones, ${reschedules} reschedules, and 1 PPO from ${stats.company}.`,
    type: "article",
  },
};

export default function ZSCampusBeatsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${head.variable} ${text.variable} zs-root min-h-svh bg-zs-ink font-text text-zs-text antialiased`}
    >
      {children}
    </div>
  );
}
