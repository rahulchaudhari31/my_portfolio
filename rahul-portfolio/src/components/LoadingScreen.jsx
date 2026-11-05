import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { brand, loading, profile } from "../data/content";
import { getLenis } from "../hooks/useLenis";

const easeOut = [0.22, 1, 0.36, 1];

export default function LoadingScreen({ onFinish }) {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const finishedRef = useRef(false);
  const finishTimerRef = useRef(null);
  const displayProgress = reduceMotion ? 100 : progress;

  useEffect(() => {
    const lenis = getLenis();
    const previousOverflow = document.body.style.overflow;

    lenis?.stop();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, []);

  useEffect(() => {
    const finish = () => {
      if (finishedRef.current) {
        return;
      }

      finishedRef.current = true;
      onFinish();
    };

    if (reduceMotion) {
      const timer = window.setTimeout(finish, 80);
      return () => window.clearTimeout(timer);
    }

    const duration = 720;
    const startedAt = performance.now();

    const interval = window.setInterval(() => {
      const next = Math.min(
        100,
        Math.round(((performance.now() - startedAt) / duration) * 100),
      );

      setProgress(next);

      if (next >= 100) {
        window.clearInterval(interval);
        finishTimerRef.current = window.setTimeout(finish, 120);
      }
    }, 40);

    return () => {
      window.clearInterval(interval);

      if (finishTimerRef.current) {
        window.clearTimeout(finishTimerRef.current);
      }
    };
  }, [onFinish, reduceMotion]);

  return (
    <>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{
          y: "-100%",
          transition: { duration: reduceMotion ? 0.01 : 0.75, ease: easeOut },
        }}
        aria-hidden="true"
        className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-ink"
      >
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.07]" />
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(167,139,250,0.35),rgba(124,58,237,0.18)_42%,transparent_70%)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cyan/10 to-transparent" />

        <div className="relative z-10 w-full max-w-sm px-6 text-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOut }}
            className="flex justify-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-gradient font-display text-lg font-bold text-white shadow-glow">
              {brand.initials}
            </span>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
          >
            <p className="mt-7 text-[10px] font-medium uppercase tracking-[0.34em] text-slate-400">
              {loading.label}
            </p>
            <p className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {profile.firstName}{" "}
              <span className="text-gradient">{profile.lastName}</span>
            </p>
            <p className="mt-2 text-sm text-slate-400">{profile.role}</p>
          </motion.div>

          <div className="mt-11 flex items-end justify-between">
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">
                {loading.status}
              </p>
              <div className="mt-2 flex gap-1.5">
                <motion.span
                  animate={reduceMotion ? undefined : { opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="h-1 w-1 rounded-full bg-cyan"
                />
                <motion.span
                  animate={reduceMotion ? undefined : { opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 1.2, delay: 0.2, repeat: Infinity }}
                  className="h-1 w-1 rounded-full bg-cyan"
                />
                <motion.span
                  animate={reduceMotion ? undefined : { opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 1.2, delay: 0.4, repeat: Infinity }}
                  className="h-1 w-1 rounded-full bg-cyan"
                />
              </div>
            </div>

            <p className="font-display text-5xl font-bold tabular-nums tracking-tight text-white">
              {String(displayProgress).padStart(3, "0")}
              <span className="ml-1 text-lg text-cyan">%</span>
            </p>
          </div>

          <div className="mt-4 h-px overflow-hidden bg-white/10">
            <motion.div
              animate={{ scaleX: displayProgress / 100 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="h-full origin-left bg-gradient-to-r from-violet to-cyan shadow-[0_0_12px_rgba(34,211,238,0.8)]"
            />
          </div>
        </div>
      </motion.div>

      <div role="status" className="sr-only">
        {loading.label}
      </div>
    </>
  );
}
