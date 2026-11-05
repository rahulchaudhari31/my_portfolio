import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance = null;

export function getLenis() {
  return lenisInstance;
}

export default function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.15,
      smoothWheel: true,
      anchors: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisInstance = lenis;

    return () => {
      lenis.destroy();
      if (lenisInstance === lenis) {
        lenisInstance = null;
      }
    };
  }, []);
}
