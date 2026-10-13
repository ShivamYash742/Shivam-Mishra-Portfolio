import Chapter from "./components/Chapter";
import Destination from "./components/Destination";
import Frame from "./components/Frame";
import Hero from "./components/Hero";
import InterviewsVisual from "./components/InterviewsVisual";
import Reflection from "./components/Reflection";
import Reflections from "./components/Reflections";
import RouteMap from "./components/RouteMap";
import RouteRail from "./components/RouteRail";
import {
  AwarenessVisual,
  HackathonVisual,
  RegistrationVisual,
  SchedulingVisual,
  ShortlistVisual,
} from "./components/StageVisuals";
import { stages } from "./derive";

const [registration, awareness, hackathon, shortlisting, scheduling, interviews, outcome] = stages;

export default function ZSCampusBeatsPage() {
  return (
    <Frame>
      <a
        href="#route"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-zs-landmark focus:px-4 focus:py-2 focus:font-semibold focus:text-zs-ink"
      >
        Skip to the route
      </a>
      <Hero />
      <RouteRail />
      <main>
        <RouteMap />
        <Chapter stage={registration} index={0}>
          <RegistrationVisual stage={registration} />
        </Chapter>
        <Chapter stage={awareness} index={1} flip>
          <AwarenessVisual stage={awareness} />
        </Chapter>
        <Chapter stage={hackathon} index={2} variant="stack">
          <HackathonVisual stage={hackathon} />
        </Chapter>
        <Chapter stage={shortlisting} index={3} variant="center">
          <ShortlistVisual stage={shortlisting} />
        </Chapter>
        <Chapter stage={scheduling} index={4} flip>
          <SchedulingVisual stage={scheduling} />
        </Chapter>
        <Chapter stage={interviews} index={5} sticky>
          <InterviewsVisual steps={interviews.steps ?? []} />
        </Chapter>
        <Destination index={stages.indexOf(outcome)} />
        <Reflections />
        <Reflection />
      </main>
    </Frame>
  );
}
