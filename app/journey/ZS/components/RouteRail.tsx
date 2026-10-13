"use client";

import { useEffect, useState } from "react";
import { stages } from "../derive";

/** Slim bar that appears while you are inside a chapter and shows which stop of the route you are on. */
export default function RouteRail() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-stage]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          const i = Number((target as HTMLElement).dataset.stage);
          setActive((cur) => (isIntersecting ? i : cur === i ? null : cur));
        }
      },
      // A thin band across the middle of the viewport: the chapter under the reader's eye.
      { rootMargin: "-50% 0px -49.9% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const shown = active !== null;
  return (
    <nav
      aria-label="Route stops"
      inert={!shown}
      className={`fixed inset-x-0 top-[3px] z-40 border-b border-zs-line bg-zs-ink/80 backdrop-blur transition-transform duration-300 ${
        shown ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <ol className="mx-auto flex h-11 max-w-7xl items-center gap-1 px-3 sm:px-8">
        {stages.map((s, i) => (
          <li key={s.id} className="flex items-center">
            <a
              href={`#${s.id}`}
              aria-current={active === i ? "step" : undefined}
              className={`flex min-h-11 items-center gap-2 px-2 text-xs font-semibold tracking-[0.14em] transition-colors ${
                active === i ? "text-zs-text" : "text-zs-mute hover:text-zs-text"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${active === i ? "bg-zs-landmark shadow-[0_0_10px_var(--color-zs-landmark)]" : "border border-zs-mute"}`} />
              {s.number}
              <span className={active === i ? "inline" : "hidden lg:inline"}>{s.short.toUpperCase()}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
