import { motion, useReducedMotion } from "framer-motion";
import { FiAward, FiBookOpen, FiMapPin } from "react-icons/fi";
import CountUp from "../components/CountUp";
import SectionHeading from "../components/SectionHeading";
import { about, profile } from "../data/content";
import useTilt from "../hooks/useTilt";

const easeOut = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeOut },
  },
};

export default function About() {
  const reduceMotion = useReducedMotion();
  const { ref: tiltRef, tiltHandlers } = useTilt({ max: 12, scale: 1.03 });

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-padding relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-violet/10 blur-[120px]"
      />

      <div className="section-shell relative">
        <SectionHeading
          id="about-heading"
          eyebrow={about.eyebrow}
          title={about.heading}
        />

        <div className="mt-14 grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="relative mx-auto w-full max-w-sm lg:max-w-md"
          >
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <div className="-rotate-3">
                <div
                  ref={tiltRef}
                  {...tiltHandlers}
                  className="relative transition-transform duration-200 ease-out will-change-transform"
                >
                  <div
                    aria-hidden="true"
                    className="conic-gradient pointer-events-none absolute -inset-5 animate-spin-slow rounded-[2.6rem] opacity-40 blur-3xl"
                  />
                  <div
                    aria-hidden="true"
                    className="conic-gradient pointer-events-none absolute -inset-[2px] animate-spin-slow rounded-[2.1rem] opacity-80"
                  />

                  <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink/80 p-2 shadow-glass backdrop-blur-xl">
                    <img
                      src={profile.photo}
                      alt={profile.photoAlt}
                      width={862}
                      height={1248}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/5] w-full rounded-[1.6rem] object-cover"
                    />

                    <div className="glass absolute inset-x-4 bottom-4 rounded-2xl px-4 py-3">
                      <p className="font-display text-sm font-semibold text-white">
                        {profile.name}
                      </p>
                      <p className="mt-0.5 text-[11px] text-cyan">
                        {profile.role} · {profile.company}
                      </p>
                    </div>
                  </div>

                  <div className="glass absolute -right-4 top-8 hidden items-center gap-2 rounded-full px-3 py-1.5 text-[11px] text-slate-300 sm:flex">
                    <FiMapPin className="text-sm text-cyan" />
                    {profile.location}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.div variants={reveal} className="space-y-4">
              {about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-pretty text-[1.1rem] leading-[1.75] text-[#a8b3c4]"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.div
              variants={reveal}
              className="mt-8 grid grid-cols-2 gap-3 xl:grid-cols-4"
            >
              {about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-2xl px-4 py-4"
                >
                  <p className="font-display text-2xl font-bold sm:text-3xl">
                    <CountUp
                      value={stat.value}
                      suffix={stat.suffix}
                      className="text-gradient"
                    />
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={reveal}
              className="glass mt-4 rounded-2xl p-5 sm:p-6"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-violet/15 text-cyan">
                  <FiBookOpen className="text-sm" />
                </span>
                <span className="font-display text-[11px] font-medium uppercase tracking-[0.24em] text-slate-400">
                  {about.educationLabel}
                </span>
              </div>

              <ul className="mt-4 divide-y divide-white/5">
                {about.education.map((item) => (
                  <li
                    key={item.degree}
                    className="flex items-start justify-between gap-4 py-3 first:pt-0"
                  >
                    <div>
                      <p className="font-medium text-white">{item.degree}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                        {item.institution}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        {item.location}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium tracking-wide text-cyan">
                      {item.period}
                    </span>
                  </li>
                ))}

                {about.schooling.map((item) => (
                  <li
                    key={item.level}
                    className="flex items-center justify-between gap-4 py-2.5"
                  >
                    <span className="text-sm text-slate-300">
                      {item.level}
                      <span className="text-slate-400"> — {item.score}</span>
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {item.year}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-slate-400">
                <FiAward className="shrink-0 text-cyan" />
                <span>
                  <span className="text-slate-400">
                    {about.certificationLabel}:
                  </span>{" "}
                  {about.certification.title}
                  <span className="text-slate-400">
                    {" "}
                    · {about.certification.type}
                  </span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
