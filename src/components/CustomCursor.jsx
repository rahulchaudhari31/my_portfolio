import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [data-cursor="hover"], input, textarea, select, label';

export default function CustomCursor() {
  const [enabled] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const touchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0;

    return finePointer && !touchDevice;
  });
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.55 });

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    document.documentElement.classList.add("custom-cursor-active");

    const handleMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);

      const target =
        event.target instanceof Element
          ? event.target.closest(INTERACTIVE_SELECTOR)
          : null;
      setHovering(Boolean(target));
    };

    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);
    const handleLeave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) {
    return null;
  }

  return (
    <div aria-hidden="true">
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{ x, y }}
      >
        <motion.span
          className="block h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_12px_rgba(34,211,238,0.9)]"
          style={{ marginLeft: -3, marginTop: -3 }}
          animate={{ scale: pressed ? 0.5 : hovering ? 0.35 : 1 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.span
          className="block h-10 w-10 rounded-full border"
          style={{ marginLeft: -20, marginTop: -20 }}
          animate={{
            scale: hovering ? 1.6 : pressed ? 0.8 : 1,
            opacity: hovering ? 1 : 0.65,
            borderColor: hovering
              ? "rgba(34, 211, 238, 0.85)"
              : "rgba(167, 139, 250, 0.65)",
            backgroundColor: hovering
              ? "rgba(34, 211, 238, 0.08)"
              : "rgba(0, 0, 0, 0)",
          }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
        />
      </motion.div>
    </div>
  );
}
