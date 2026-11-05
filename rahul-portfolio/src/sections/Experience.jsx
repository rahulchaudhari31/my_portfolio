import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FiBriefcase, FiCalendar, FiMapPin } from "react-icons/fi";
import SectionHeading from "../components/SectionHeading";
import { experience, experienceSection } from "../data/content";

const easeOut = [0.22, 1, 0.36, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 42 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeOut,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const bulletVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

export default function Experience() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 72%", "end 68%"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section-padding relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-violet/10 blur-[130px]"
      />

      <div className="section-shell relative">
        <SectionHeading
          id="experience-heading"
          eyebrow={experienceSection.eyebrow}
          title={experienceSection.heading}
          description={experienceSection.description}
        />

        <div ref={timelineRef} className="relative mt-14 sm:mt-16">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[18px] top-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2"
          >
            <motion.div
              style={{ scaleY: lineProgress }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-violet via-cyan to-violet shadow-[0_0_18px_rgba(34,211,238,0.65)]"
            />
          </div>

          <div>
            {experience.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isLast = index === experience.length - 1;

              return (
                <div
                  key={`${item.company}-${item.period}`}
                  className={`relative pl-12 md:grid md:grid-cols-2 md:gap-16 md:pl-0 ${
                    isLast ? "pb-0" : "pb-12 md:pb-20"
                  }`}
                >
                  <div className="absolute left-[18px] top-8 z-10 -translate-x-1/2 md:left-1/2">
                    <span className="relative flex h-4 w-4 items-center justify-center">
                      <span
                        aria-hidden="true"
                        className={`absolute h-4 w-4 animate-timeline-pulse rounded-full ${
                          item.current ? "bg-cyan/40" : "bg-violet/30"
                        }`}
                        style={{ animationDelay: `${index * 0.35}s` }}
                      />
                      <span className="relative h-2.5 w-2.5 rounded-full bg-gradient-to-br from-violet to-cyan ring-4 ring-ink" />
                    </span>
                  </div>

                  <motion.article
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    data-cursor="hover"
                    className={`glass glass-hover relative rounded-3xl p-5 sm:p-7 ${
                      isLeft
                        ? "md:col-start-1 md:mr-2"
                        : "md:col-start-2 md:ml-2"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet/25 to-cyan/10 text-cyan">
                          <FiBriefcase className="text-lg" />
                        </span>
                        <div>
                          <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                            {item.role}
                          </h3>
                          <p className="mt-0.5 text-sm font-medium text-gradient">
                            {item.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
                          {item.type}
                        </span>
                        {item.current ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan shadow-[0_0_26px_-8px_rgba(34,211,238,0.9)]">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
                            {experienceSection.currentLabel}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <FiCalendar className="text-cyan" />
                        {item.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FiMapPin className="text-cyan" />
                        {item.location}
                      </span>
                    </div>

                    <motion.ul
                      variants={{
                        hidden: {},
                        show: {
                          transition: {
                            staggerChildren: 0.08,
                            delayChildren: 0.05,
                          },
                        },
                      }}
                      className="mt-5 space-y-2.5"
                    >
                      {item.highlights.map((highlight) => (
                        <motion.li
                          key={highlight}
                          variants={bulletVariants}
                          className="flex items-start gap-2.5 text-base leading-[1.65] text-[#a8b3c4]"
                        >
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet to-cyan" />
                          {highlight}
                        </motion.li>
                      ))}
                    </motion.ul>

                    <div className="mt-5 flex flex-wrap gap-2 border-t border-white/5 pt-4">
                      {item.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
