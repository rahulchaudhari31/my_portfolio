import { lazy } from "react";
import { motion } from "framer-motion";
import LazyScene from "../components/LazyScene";
import SectionHeading from "../components/SectionHeading";
import { skills, skillsSection } from "../data/content";
import { skillGroupIcons, skillIcons } from "../data/skillIcons";
import useCanRender3D from "../hooks/useCanRender3D";

const SkillSphere = lazy(() => import("../three/SkillSphere"));

const techItems = Array.from(
  new Set(skills.flatMap((group) => group.items)),
);

const cardSpans = {
  Languages: "lg:col-span-2",
  Frontend: "lg:col-span-4",
  Backend: "lg:col-span-2",
  Databases: "lg:col-span-2",
  Security: "lg:col-span-2",
  Cloud: "lg:col-span-3",
  Tools: "lg:col-span-3",
};

const easeOut = [0.22, 1, 0.36, 1];

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

function SkillMarquee() {
  const loop = [...techItems, ...techItems];

  return (
    <div className="relative flex h-full items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink/80 to-transparent" />

      <div className="animate-marquee flex w-max gap-3 hover:[animation-play-state:paused]">
        {loop.map((item, index) => {
          const Icon = skillIcons[item];

          return (
            <div
              key={`${item}-${index}`}
              className="glass flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-300"
            >
              {Icon ? <Icon className="text-base text-cyan" /> : null}
              <span className="whitespace-nowrap">{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SkillCard({ group }) {
  const GroupIcon = skillGroupIcons[group.category];

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    event.currentTarget.style.setProperty(
      "--glow-x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--glow-y",
      `${event.clientY - rect.top}px`,
    );
  };

  return (
    <motion.article
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      className={`glass glass-hover group relative overflow-hidden rounded-3xl p-5 sm:p-6 ${
        cardSpans[group.category] ?? ""
      }`}
      data-cursor="hover"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(124, 58, 237, 0.16), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {GroupIcon ? (
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan">
                <GroupIcon className="text-lg" />
              </span>
            ) : null}
            <h3 className="font-display text-lg font-semibold text-white">
              {group.category}
            </h3>
          </div>

          <span className="font-display text-[10px] tracking-[0.25em] text-slate-400">
            {String(group.items.length).padStart(2, "0")}
          </span>
        </div>

        <ul className="mt-5 flex flex-wrap gap-2">
          {group.items.map((item) => {
            const Icon = skillIcons[item];

            return (
              <li
                key={item}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white"
              >
                {Icon ? (
                  <Icon className="text-sm text-cyan" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-violet" />
                )}
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </motion.article>
  );
}

export default function Skills() {
  const canRender3D = useCanRender3D();

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-padding relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-cyan/10 blur-[130px]"
      />

      <div className="section-shell relative">
        <SectionHeading
          id="skills-heading"
          eyebrow={skillsSection.eyebrow}
          title={skillsSection.heading}
          description={skillsSection.description}
        />

        <div className="glass relative mt-12 overflow-hidden rounded-[2rem]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(124,58,237,0.18),transparent_62%)]"
          />

          <div className="relative h-[340px] w-full sm:h-[420px]">
            {canRender3D ? (
              <LazyScene
                scene={SkillSphere}
                className="h-full w-full"
                fallback={<SkillMarquee />}
                errorFallback={<SkillMarquee />}
              />
            ) : (
              <SkillMarquee />
            )}
          </div>

          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-ink/60 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-slate-400 backdrop-blur">
            {skillsSection.sphereHint}
          </div>
        </div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6"
        >
          {skills.map((group) => (
            <SkillCard key={group.category} group={group} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
