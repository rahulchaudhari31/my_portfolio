import { useEffect, useState } from "react";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");

    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

function canRenderScene() {
  if (typeof window === "undefined") {
    return false;
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const smallScreen = window.matchMedia("(max-width: 768px)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = navigator.deviceMemory ?? 8;

  return (
    !reducedMotion &&
    !smallScreen &&
    !coarsePointer &&
    cores > 4 &&
    memory > 4 &&
    supportsWebGL()
  );
}

export default function useCanRender3D() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const queries = [
      window.matchMedia("(max-width: 768px)"),
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(pointer: coarse)"),
    ];
    const update = () => setEnabled(canRenderScene());

    update();
    queries.forEach((query) => query.addEventListener("change", update));

    return () =>
      queries.forEach((query) => query.removeEventListener("change", update));
  }, []);

  return enabled;
}
