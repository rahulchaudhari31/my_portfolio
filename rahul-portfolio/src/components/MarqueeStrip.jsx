import { marqueeSection, skills } from "../data/content";
import { skillIcons } from "../data/skillIcons";

const techItems = Array.from(
  new Set(skills.flatMap((group) => group.items)),
);

const loop = [...techItems, ...techItems];

export default function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-white/[0.015] py-5">
      <p className="sr-only">
        {marqueeSection.label}: {techItems.join(", ")}
      </p>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent"
      />

      <div
        aria-hidden="true"
        className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]"
      >
        {loop.map((item, index) => {
          const Icon = skillIcons[item];

          return (
            <div
              key={`${item}-${index}`}
              className="flex shrink-0 items-center gap-3 px-5 sm:px-7"
            >
              {Icon ? (
                <Icon className="text-lg text-cyan/80" />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-violet" />
              )}
              <span className="whitespace-nowrap font-display text-sm font-medium tracking-wide text-slate-400">
                {item}
              </span>
              <span className="text-xs text-violet/50">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
