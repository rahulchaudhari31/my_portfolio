import { motion, useReducedMotion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";
import HeroVisual from "../components/HeroVisual";
import { hero, socials } from "../data/content";
import { socialIcons } from "../data/socialIcons";

const heroSocials = socials.filter((social) =>
  hero.socialLinks.includes(social.icon),
);

const typingSequence = hero.typewriter.flatMap((text) => [text, 2200]);

const codeWords = [
  "React",
  "Node",
  "AWS",
  "SQL",
  "Express",
  "API",
  "JWT",
  "Mongo",
];

const easeOut = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-24"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
        <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#a78bfa_0%,#7c3aed_45%,#22d3ee_100%)] opacity-40 blur-3xl md:left-[68%] md:h-[34rem] md:w-[34rem]" />
      </div>

      <div aria-hidden="true" className="hv-ambient">
        {[0, 1, 2, 3].map((index) => (
          <span
            key={index}
            className={`hv-shard hv-shard-${index + 1}`}
            style={{ "--i": index }}
          />
        ))}

        <div className="hv-code-stream">
          {codeWords.map((word, index) => (
            <span key={word} style={{ "--i": index }}>
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="section-shell relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-6">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {hero.availability}
            </motion.div>

            <motion.h1
              id="hero-heading"
              variants={fadeUp}
              className="mt-5 max-w-2xl font-display text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl"
            >
              {hero.greeting}{" "}
              <span className="text-gradient-animated">
                {hero.headlineName}
              </span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="mt-4 flex min-h-[2rem] flex-wrap items-center gap-x-2 font-display text-xl text-slate-300 sm:text-2xl"
            >
              <span className="text-slate-400">{hero.rolePrefix}</span>
              <span className="text-cyan" aria-hidden={!reduceMotion}>
                {reduceMotion ? (
                  hero.role
                ) : (
                  <TypeAnimation
                    sequence={typingSequence}
                    speed={45}
                    deletionSpeed={70}
                    repeat={Infinity}
                    wrapper="span"
                  />
                )}
              </span>
              <span className="sr-only">{hero.role}</span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-[680px] text-pretty text-[1.1rem] leading-[1.75] text-[#a8b3c4]"
            >
              {hero.tagline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <a
                href={hero.primaryCta.href}
                className="btn-mono group"
                data-cursor="hover"
              >
                {hero.primaryCta.label}
                <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <a
                href={hero.resumeCta.href}
                download
                className="btn-mono btn-mono-outline group"
                data-cursor="hover"
              >
                <FiDownload className="text-base" />
                {hero.resumeCta.label}
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-7 flex items-center gap-3">
              {heroSocials.map((social) => {
                const Icon = socialIcons[social.icon];

                if (!Icon) {
                  return null;
                }

                const external = social.href.startsWith("http");

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="glass glass-hover flex h-11 w-11 items-center justify-center rounded-full text-slate-300 transition-colors hover:text-cyan"
                    data-cursor="hover"
                  >
                    <Icon className="text-lg" />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          <div>
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
