import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export default function CountUp({
  value,
  suffix = "",
  duration = 1.6,
  className = "",
}) {
  const ref = useRef(null);
  const frameRef = useRef(0);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(() =>
    prefersReducedMotion ? value : 0,
  );

  useEffect(() => {
    if (!inView) {
      return undefined;
    }

    const start = performance.now();
    const effectiveDuration = prefersReducedMotion ? 0 : duration;

    const tick = (now) => {
      const progress =
        effectiveDuration === 0
          ? 1
          : Math.min((now - start) / (effectiveDuration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplay(Math.round(value * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameRef.current);
  }, [duration, inView, prefersReducedMotion, value]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
