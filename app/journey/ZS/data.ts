// ─── ZS Campus Beats: the ONE file you edit ─────────────────────────────────
// Every word, date, event and PDF on the page comes from here.
// Calendar, counts, legend, log spacing and the Day counter all update by themselves.
//
// ADD AN EVENT: put an object in the `events` list of the right phase (order doesn't matter, it is
// sorted by date):
//     { date: "2026-05-20", badge: "SENT", title: "…", description: "…", status: "muted" }
//   status  "muted" routine · "blue" progress · "gold" landmark · "red" disruption
//   time    optional, "AM" / "PM" / "EVE": shown beside the date when a day has several entries
//   email   optional, { sender, senderRole, subject, preview }: shows as a mail in the expander
//   pdf     optional, file name of a PDF you put in  public/journey/zs/ , e.g. pdf: "offer-letter.pdf"
//           (or several: pdf: ["a.pdf", "b.pdf"])
//           shows inside the expander (and as an "Open PDF" link on phones)
//   pdfLabel optional, expander title when there is no email, e.g. "Hackathon certificate"
// Dates are ISO (YYYY-MM-DD). `stats.startDate` and `stats.endDate` set the calendar range.
// In text, {days} becomes the total day count and {span} the length of the silence stretch, so numbers never go stale.

export type EventStatus = "muted" | "blue" | "gold" | "red";

export interface EmailData {
  sender: string;
  senderRole: string;
  subject: string;
  preview: string;
}

export interface TimelineEvent {
  date: string;
  time?: string;
  badge: string;
  title: string;
  description: string;
  status: EventStatus;
  isOffer?: boolean;
  isChallenge?: boolean;
  isVictory?: boolean;
  emailData?: EmailData;
  pdf?: string | string[];
  pdfLabel?: string;
}

export interface Phase {
  id: string;
  number: string;
  name: string;
  note?: string;
  events: TimelineEvent[];
}

export const stats = {
  company: "ZS Associates",
  campaign: "Campus Beats 2026–27",
  role: "Business Technology Solutions Associate",
  offer: "₹14.2 LPA",
  offerType: "PPO · FTE",
  startDate: "2026-03-17",
  endDate: "2026-07-20", // the offer day: last tile of the calendar
  acceptBy: "2026-07-24",
  by: "Shivam Mishra · MSIT",
};

// ─── Page text ──────────────────────────────────────────────────────────────

export const copy = {
  hero: {
    tagline: "one offer.", // the first line, "{n} days,", is counted from stats
    blurb: "The full log of ZS Associates’ Campus Beats process, from a webinar sign-up to a pre-placement offer:",
    portfolioLink: "Portfolio",
    cta: "Read the log",
    calendarHint: "Hover or tab through the calendar. Every lit day is a milestone and links to its entry in the log.",
  },
  log: {
    title: "The full log",
    intro: "The space between entries grows with the days between them, so waiting looks like waiting.",
  },
  moments: {
    title: "Three stretches didn’t go to plan",
    intro: "Most of the process ran on schedule. These didn’t, and each one asked for a reset.",
  },
  offer: {
    title: "The email that ended the wait",
    story:
      "ZS finalized its decision with the MSIT TPO on Jul 17. The offer reached me on Jul 20, with the acceptance form due Jul 24.",
  },
  reflection: {
    lines: [
      "This wasn't just a placement process.",
      "It was {days} days of uncertainty,",
      "preparation,",
      "waiting,",
      "rescheduling,",
      "interviews,",
      "and persistence.",
      "Eventually,",
      "it became my first full-time offer.",
    ],
    primaryCta: "Back to the portfolio",
    secondaryCta: "Get in touch",
  },
};

// ─── Phases and events ──────────────────────────────────────────────────────

export const phases: Phase[] = [
  {
    id: "awareness",
    number: "01",
    name: "Awareness",
    events: [
      {
        date: "2026-03-17",
        badge: "REGISTERED",
        title: "Webinar Registration",
        description: `Registered for "Unlock Your Future at ZS" — Campus Beats info session.`,
        status: "muted",
        emailData: {
          sender: "ZS Campus Beats",
          senderRole: "Campus team",
          subject: "Webinar Invite | ZS Campus Beats 2026 | Webinar details - 18 March 2026",
          preview:
            "Confirms your registration for the next day's webinar, “Unlock your future at ZS”, with the session details.",
        },
      },
      {
        date: "2026-03-18",
        badge: "ATTENDED",
        title: "Campus Beats Webinar",
        description: "Live session covering roles and the selection process.",
        status: "muted",
        emailData: {
          sender: "ZS Campus Beats",
          senderRole: "Reminders via Superset",
          subject: "Starting in 1 Hour: ZS Campus Beats Webinar | Join Us at 4 PM",
          preview:
            "Reminder emails went out in the morning and an hour before the 4 PM webinar.",
        },
      },
      {
        date: "2026-03-26",
        badge: "INVITED",
        title: "Invite to the Next Webinar",
        description: "ZS invited registered students to another session for anyone who missed the first.",
        status: "muted",
        emailData: {
          sender: "ZS Campus Beats",
          senderRole: "Campus team",
          subject: "ZS Campus Beats 2026 | Missed Our Last Webinar? Join Us for the Next One!",
          preview:
            "A second “Unlock Your Future at ZS” session for students who could not attend the first, covering ZS, career opportunities and tips for the hiring process.",
        },
      },
    ],
  },
  {
    id: "hackathon",
    number: "02",
    name: "Hackathon & Screening",
    events: [
      {
        date: "2026-04-12",
        badge: "REGISTERED",
        title: 'Team "AlgoRhythm" Registered',
        description: "Team formed for the Campus Beats Tech Challenge.",
        status: "muted",
        emailData: {
          sender: "Superset",
          senderRole: "Placement portal",
          subject: "Team Registration Confirmed — Campus Beats Team Registration",
          preview:
            "The portal confirmed the team’s Campus Beats registration.",
        },
      },
      {
        date: "2026-04-17",
        badge: "CONFIRMED",
        title: "Tech Challenge Registration Confirmed",
        description: "Hackathon slot locked in.",
        status: "muted",
        emailData: {
          sender: "ZS Campus Beats",
          senderRole: "Campus team",
          subject: "Confirmation of Tech Challenge Hackathon Registration - ZS Campus Beats",
          preview:
            "The team’s registration for the Tech Challenge was received and confirmed. The instruction manual is attached.",
        },
        pdf: "tech-challenge-instruction-manual.pdf",
      },
      {
        date: "2026-04-22",
        badge: "BRIEFED",
        title: "Team Captain Briefing",
        description: "Problem statement walkthrough for team captains.",
        status: "muted",
        emailData: {
          sender: "ZS Campus Beats",
          senderRole: "Campus team",
          subject: "ZS Campus Beats 2026 | Team Captain Briefing & Event Schedule",
          preview:
            "Hackathon on 25 April 2026: the challenge opens at 11:00 AM IST and closes at 8:00 PM IST. The team case runs 120 minutes once started, with 6:00 PM IST as the latest start.",
        },
      },
      {
        date: "2026-04-23",
        badge: "RECEIVED",
        title: "Platform Walkthrough FAQs",
        description: "FAQ document shared after the pre-hackathon platform walkthrough sessions.",
        status: "muted",
        emailData: {
          sender: "ZS Campus Beats",
          senderRole: "Campus team",
          subject: "Follow-up: FAQs from Pre-Hackathon Platform Walkthrough",
          preview:
            "The questions raised in the walkthrough sessions, compiled with answers in the attached FAQ.",
        },
        pdf: "hackathon-faq.pdf",
      },
      {
        date: "2026-04-25",
        time: "AM",
        badge: "REMINDER",
        title: "Hackathon Starts in 2 Hours",
        description: "Get-ready reminder on the morning of the Tech Challenge.",
        status: "muted",
        emailData: {
          sender: "ZS Campus Beats",
          senderRole: "Reminders via Superset",
          subject: "Starting Soon: ZS Campus Beats Hackathon | Be Ready in 2 Hours",
          preview:
            "Reminder that the hackathon starts in two hours.",
        },
      },
      {
        date: "2026-04-25",
        time: "PM",
        badge: "REMINDER",
        title: "Final Reminder: 2 Hours Left",
        description: "Last call before the challenge window closed.",
        status: "muted",
        emailData: {
          sender: "ZS Campus Beats",
          senderRole: "Reminders via Superset",
          subject: "Final Reminder: ZS Campus Beats Ends in 2 Hours",
          preview:
            "Reminder that the challenge ends in two hours.",
        },
      },
      {
        date: "2026-04-25",
        badge: "COMPLETED",
        title: "Hackathon Day",
        description:
          "Round 2 (Python assessment) hit scoring issues — ZS extended the deadline and adjusted scoring.",
        status: "gold",
        isChallenge: true,
        emailData: {
          sender: "ZS Campus Beats",
          senderRole: "Campus team",
          subject: "Important: Changes to Round 2 Scoring & Deadline Extension",
          preview:
            "A few participants hit technical problems in Round 2, including the Python coding section, and some could not start individual sections. ZS announced changes to Round 2 scoring and a deadline extension.",
        },
      },
      {
        date: "2026-04-25",
        time: "EVE",
        badge: "THANKED",
        title: "Thank-You After the Hackathon",
        description: "ZS thanked every participant at the end of the day.",
        status: "muted",
        emailData: {
          sender: "ZS Campus Beats",
          senderRole: "Via Superset",
          subject: "ZS Campus Beats 2026- You made today remarkable. Thank you.",
          preview:
            "A thank-you note to everyone who took part in the Tech Challenge.",
        },
      },
      {
        date: "2026-04-25",
        badge: "ASSIGNED",
        title: "MCQ Assessment Assigned",
        description: "Next-stage online assessment issued same day.",
        status: "blue",
        emailData: {
          sender: "ZS Associates",
          senderRole: "via Superset",
          subject: "Congratulations! You’ve progressed to the next level of Campus Beats!",
          preview:
            "Next step: an MCQ-based online assessment covering attention to detail, analytical thinking and other core competencies.",
        },
      },
      {
        date: "2026-04-26",
        badge: "COMPLETED",
        title: "Round 2 Online Assessment: Aptitude",
        description:
          "Sunday. A complete online assessment of aptitude questions, taken in the 11:00 AM to 7:00 PM IST window: about 60 minutes, audio and video proctored, covering numerical aptitude, critical reasoning and verbal ability.",
        status: "gold",
      },
    ],
  },
  {
    id: "shortlisting",
    number: "03",
    name: "Shortlisting",
    events: [
      {
        date: "2026-04-30",
        badge: "ANNOUNCED",
        title: "Top Teams List Announced",
        description: "Results of the Tech Challenge published.",
        status: "blue",
        emailData: {
          sender: "ZS Campus Beats",
          senderRole: "Campus team",
          subject: "Top Teams - ZS Campus Beats Tech Challenge 2026 | Have you made it?",
          preview:
            "The Top Teams list for the Tech Challenge was shared as an attachment.",
        },
      },
      {
        date: "2026-05-01",
        badge: "SHORTLISTED",
        title: "Confirmed as a Top Team",
        description: "PPO / PPI interview track opens.",
        status: "gold",
        isVictory: true,
        emailData: {
          sender: "ZS Campus Beats",
          senderRole: "Campus team",
          subject: "Congratulations! PPO Interview Process Begins – ZS Campus Beats 2026",
          preview:
            "The PPO interview process runs in batches through May. The job description for the Business Technology Solutions Associate role is enclosed.",
        },
        pdf: "jd-business-technology-solutions-associate.pdf",
      },
      {
        date: "2026-05-01",
        badge: "SUBMITTED",
        title: "BTSA PPI Application Submitted",
        description:
          "Business Technology Solutions Associate — Campus Beats PPI 2026.",
        status: "muted",
        emailData: {
          sender: "Superset",
          senderRole: "Placement portal",
          subject: "Application submitted: ZS Associates's Business Technology Solutions Associate- Campus Beats PPI 2026",
          preview:
            "Confirms the application for Business Technology Solutions Associate, Campus Beats PPI 2026, was submitted.",
        },
      },
      {
        date: "2026-05-08",
        badge: "ADVANCED",
        title: "Advanced to Communication Assessment",
        description:
          "Moved past the Tech Challenge stage into the comms evaluation track.",
        status: "blue",
        emailData: {
          sender: "ZS Campus Beats",
          senderRole: "Campus team",
          subject: "Next Steps: ZS Campus Beats 2026 Communication Assessment",
          preview:
            "Shortlisted teams take the Communication Assessment, which tests the communication skills needed to collaborate in a consulting environment.",
        },
      },
      {
        date: "2026-05-09",
        badge: "ASSIGNED",
        title: "Verbal Assessment Assigned",
        description: "Online test — Phase 2 of the process.",
        status: "blue",
        emailData: {
          sender: "ZS Associates",
          senderRole: "via Superset, the placement portal",
          subject: "Congratulations! You have made it to Phase 2 of ZS interview process",
          preview:
            "Congratulations on reaching Phase 2 of the ZS interview process.",
        },
      },
      {
        date: "2026-05-10",
        badge: "COMPLETED",
        title: "Verbal Assessment Completed",
        description:
          "Sunday. Online, audio and video proctored, about 60 minutes: reading and recording statements, a 60-second talk on a topic, MCQs and fill-in-the-blanks, and a short written paragraph.",
        status: "gold",
      },
    ],
  },
  {
    id: "scheduling",
    number: "04",
    name: "Interview Scheduling",
    note: "3 changes in 48 hrs",
    events: [
      {
        date: "2026-05-12",
        badge: "SHORTLISTED",
        title: "Shortlisted for Interviews",
        description: "MSIT TPO shared interview rounds and prep material.",
        status: "gold",
        emailData: {
          sender: "MSIT TPO",
          senderRole: "Training & Placement Office",
          subject: "Fwd: Important Update - ZS Campus Beats 2026 | Maharaja Surajmal Institute of Technology, Delhi",
          preview:
            "Congratulations on being shortlisted for the interview rounds. Job descriptions for the BTSA and DAA profiles are attached, with preparation instructions.",
        },
        pdf: ["jd-business-technology-solutions-associate.pdf", "jd-decision-analytics-associate.pdf"],
      },
      {
        date: "2026-06-03",
        badge: "UPDATED",
        title: "Interview Schedule Instructions Updated",
        description:
          "TPO forwarded revised instructions for the Decision Analytics Associate track.",
        status: "muted",
        emailData: {
          sender: "MSIT TPO",
          senderRole: "Training & Placement Office",
          subject: "Fwd: Important Update - ZS Campus Beats 2026 | Maharaja Surajmal Institute of Technology, Delhi",
          preview:
            "The TPO forwarded the instructions for the Decision Analytics Associate interview round on 3 June 2026.",
        },
      },
      {
        date: "2026-06-13",
        badge: "SCHEDULED",
        title: "Round 1 Scheduled",
        description: "Case/Tech Round 1 set for Jun 15, 1:00–2:00 PM IST.",
        status: "blue",
        emailData: {
          sender: "Superset",
          senderRole: "Placement portal",
          subject: "Interview Slot | Your Application at ZS Associates",
          preview:
            "Your Round 1 interview slot: June 15, 1:00 PM to 2:00 PM IST.",
        },
      },
      {
        date: "2026-06-15",
        badge: "CHANGED",
        title: "Round 1 Slot Changed",
        description: "Queue number changed — pulled from the waiting room.",
        status: "red",
        isChallenge: true,
        emailData: {
          sender: "ZS Associates",
          senderRole: "via Superset, the placement portal",
          subject: "[IMPORTANT] ZS Associates | interview queue number changed",
          preview:
            "You were taken out of the interview waiting room because of an operational change. You will be notified when you are assigned to a new room.",
        },
      },
      {
        date: "2026-06-16",
        badge: "RESCHEDULED",
        title: "Round 1 Rescheduled",
        description: "Moved to Jun 17, 6:30–7:30 PM IST.",
        status: "red",
        isChallenge: true,
        emailData: {
          sender: "ZS Associates",
          senderRole: "via Superset, the placement portal",
          subject: "[IMPORTANT] ZS Associates | Your interview slot changed",
          preview:
            "The interview slotted for June 15, 1:00 PM to 2:00 PM IST was changed because of an operational modification. The new slot was to follow shortly.",
        },
      },
      {
        date: "2026-06-17",
        time: "AM",
        badge: "QUEUED",
        title: "Panel Assigned",
        description: "In queue, panel confirmed for the day.",
        status: "muted",
        emailData: {
          sender: "Superset",
          senderRole: "Placement portal",
          subject: "Interview Schedule | Your Application at ZS Associates - Business Technology Solutions Associate- Campus Beats PPI 2026",
          preview:
            "Schedule notification for the Business Technology Solutions Associate interview.",
        },
      },
      {
        date: "2026-06-17",
        time: "PM",
        badge: "ALERTED",
        title: "Interview Started Alert",
        description: "An “Interview Started” alert arrived at 6:32 PM, while the 6:30–7:30 PM slot was open.",
        status: "muted",
        emailData: {
          sender: "Superset",
          senderRole: "Placement portal",
          subject: "[Urgent] Interview Started | Your Application at ZS Associates - Business Technology Solutions Associate- Campus Beats PPI 2026",
          preview:
            "Alert that the interview had started.",
        },
      },
      {
        date: "2026-06-17",
        time: "PM",
        badge: "CHANGED",
        title: "Slot Changed Again",
        description: "Operational change — moved once more, same day.",
        status: "red",
        isChallenge: true,
        emailData: {
          sender: "ZS Associates",
          senderRole: "via Superset, the placement portal",
          subject: "[IMPORTANT] ZS Associates | Your interview slot changed",
          preview:
            "The interview slotted for June 17, 6:30 PM to 7:30 PM IST was changed because of an operational modification. The new slot was to follow shortly.",
        },
      },
      {
        date: "2026-06-17",
        time: "EVE",
        badge: "CONFIRMED",
        title: "Final Slot Confirmed",
        description:
          "Locked at 3:30–4:30 PM IST — third and final time for R1.",
        status: "gold",
        emailData: {
          sender: "Superset",
          senderRole: "Placement portal",
          subject: "Interview Schedule | Your Application at ZS Associates - Business Technology Solutions Associate- Campus Beats PPI 2026",
          preview:
            "Schedule notification confirming the new interview slot.",
        },
      },
    ],
  },
  {
    id: "interviews",
    number: "05",
    name: "Interviews",
    events: [
      {
        date: "2026-06-18",
        badge: "COMPLETED",
        title: "Round 1 Interview — Case/Tech",
        description: "First round conducted, after three reschedules.",
        status: "gold",
        emailData: {
          sender: "Superset",
          senderRole: "Placement portal",
          subject: "[Urgent] Interview Started | Your Application at ZS Associates - Business Technology Solutions Associate- Campus Beats PPI 2026",
          preview:
            "Alert that the Round 1 interview had started.",
        },
      },
      {
        date: "2026-06-23",
        badge: "SCHEDULED",
        title: "Round 2 Scheduled",
        description: "Case/Tech Round 2 set for Jun 24, 3:00–4:00 PM IST.",
        status: "blue",
        emailData: {
          sender: "Superset",
          senderRole: "Placement portal",
          subject: "Interview Slot | Your Application at ZS Associates",
          preview:
            "Your Round 2 interview slot: 24 June 2026, 3:00 PM to 4:00 PM IST.",
        },
      },
      {
        date: "2026-06-24",
        badge: "COMPLETED",
        title: "Round 2 Interview — Case/Tech",
        description: "Second and final interview round conducted.",
        status: "gold",
        emailData: {
          sender: "Superset",
          senderRole: "Placement portal",
          subject: "[Urgent] Interview Started | Your Application at ZS Associates - Business Technology Solutions Associate- Campus Beats PPI 2026",
          preview:
            "Alert that the Round 2 interview had started.",
        },
      },
      {
        date: "2026-06-30",
        badge: "SENT",
        title: "Follow-up Correspondence",
        description: "Messages sent following up after Round 2.",
        status: "muted",
      },
    ],
  },
  {
    id: "outcome",
    number: "06",
    name: "Outcome",
    events: [
      {
        date: "2026-07-17",
        badge: "DECIDED",
        title: "ZS Finalizes Decision with TPO",
        description:
          "Offer sent to MSIT TPO by ZS's campus team — not yet visible to candidates.",
        status: "blue",
        emailData: {
          sender: "ZS Associates",
          senderRole: "Campus team, to the MSIT TPO",
          subject: "ZS Campus Beats 2026-27 | Maharaja Surajmal Institute of Technology_Delhi - PPO Offers",
          preview:
            "ZS thanked the Training & Placement team for the Campus Beats 2026–27 partnership and shared the list of MSIT students selected for Pre-Placement Offers, asking for acceptances by 24 July.",
        },
      },
      {
        date: "2026-07-20",
        badge: "★ OFFER",
        title: "PPO Offer Received — BTSA, FTE",
        description: "TPO forwarded the offer. Acceptance form due Jul 24.",
        status: "gold",
        isOffer: true,
        emailData: {
          sender: "MSIT TPO",
          senderRole: "Training & Placement Office",
          subject: "Fwd: ZS Campus Beats 2026-27 | Maharaja Surajmal Institute of Technology_Delhi - PPO Offers",
          preview:
            "The TPO forwarded ZS’s list of students selected for Pre-Placement Offers (FTE) and asked for the students to be informed. Offer acceptance is due by 24 July.",
        },
      },
    ],
  },
];


// ─── The three hard moments ─────────────────────────────────────────────────

export const challengeMoments = {
  scoring: {
    title: "Python Assessment Scoring Failure",
    date: "Apr 25",
    description:
      "During the hackathon, Round 2's Python assessment encountered a critical scoring system failure. ZS had to extend the deadline and recalibrate scoring — a moment of uncertainty that tested every team.",
    steps: [
      { status: "red", label: "Scoring failed" },
      { status: "blue", label: "Deadline extended" },
      { status: "gold", label: "Scoring adjusted" },
    ] as { status: EventStatus; label: string }[],
  },
  reschedules: {
    title: "Three Interview Reschedules in 48 Hours",
    date: "Jun 15–17",
    description:
      "R1 was scheduled, then the queue number changed. It was rescheduled, then moved again on the same day. Three separate changes over 48 hours, each requiring a mental reset and fresh preparation.",
    slots: [
      { time: "Jun 15 · 1:00–2:00 PM", note: "First slot", out: true },
      { time: "Jun 17 · 6:30–7:30 PM", note: "Moved after the queue number changed", out: true },
      { time: "3:30–4:30 PM IST", note: "Locked Jun 17 evening, interviewed Jun 18", out: false },
    ],
  },
  silence: {
    title: "{span} Days of Silence",
    description:
      "After both interview rounds, {span} days passed without a word. Every morning felt like the longest wait. The silence was the hardest part.",
    from: "2026-06-24", // Round 2 done
    fromLabel: "Round 2 done",
    to: "2026-07-20", // offer
    closing: "Jul 20. Offer.",
  },
};
