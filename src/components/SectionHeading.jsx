import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1];

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, ease: easeOut }}
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }
    >
      <p
        className={`flex items-center gap-3 font-display text-xs font-medium uppercase tracking-[0.28em] ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-gradient-to-r from-violet to-cyan" />
        <span className="text-gradient">{eyebrow}</span>
      </p>

      <h2
        id={id}
        className="mt-4 text-balance font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>

      {description ? (
        <p className="mt-4 max-w-[680px] text-pretty text-[1.1rem] leading-[1.75] text-[#a8b3c4]">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
