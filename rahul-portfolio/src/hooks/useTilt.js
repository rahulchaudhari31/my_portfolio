import { useCallback, useRef } from "react";

export default function useTilt({
  max = 10,
  scale = 1.02,
  perspective = 1000,
} = {}) {
  const ref = useRef(null);

  const handleMouseMove = useCallback(
    (event) => {
      const node = ref.current;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!node || reduceMotion) {
        return;
      }

      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      node.style.transform = `perspective(${perspective}px) rotateX(${(
        -y * max
      ).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) scale(${scale})`;
    },
    [max, perspective, scale],
  );

  const handleMouseLeave = useCallback(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    node.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
  }, [perspective]);

  return {
    ref,
    tiltHandlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}
