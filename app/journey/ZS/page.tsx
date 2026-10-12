import Chronicle from "./components/Chronicle";
import Frame from "./components/Frame";
import Hero from "./components/Hero";
import Moments from "./components/Moments";
import Offer from "./components/Offer";
import Reflection from "./components/Reflection";
import Silence from "./components/Silence";

export default function ZSCampusBeatsPage() {
  return (
    <Frame>
      <a
        href="#log"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-zs-landmark focus:px-4 focus:py-2 focus:font-semibold focus:text-zs-ink"
      >
        Skip to the log
      </a>
      <Hero />
      <main>
        <Chronicle />
        <Moments />
        <Silence />
        <Offer />
        <Reflection />
      </main>
    </Frame>
  );
}
