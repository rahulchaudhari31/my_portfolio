import { Suspense, useEffect, useRef, useState } from "react";
import SceneErrorBoundary from "./SceneErrorBoundary";

const hasIntersectionObserver =
  typeof window !== "undefined" && "IntersectionObserver" in window;

export default function LazyScene({
  scene: Scene,
  className = "",
  fallback = null,
  errorFallback = null,
  rootMargin = "120px 0px",
  threshold = 0.01,
  ...sceneProps
}) {
  const containerRef = useRef(null);
  const visibleRef = useRef(false);
  const [shouldMount, setShouldMount] = useState(!hasIntersectionObserver);
  const [active, setActive] = useState(
    () => !hasIntersectionObserver && !document.hidden,
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (failed) {
      return undefined;
    }

    const node = containerRef.current;
    if (!node) {
      return undefined;
    }

    if (!hasIntersectionObserver) {
      const updateVisibility = () => setActive(!document.hidden);
      document.addEventListener("visibilitychange", updateVisibility);
      return () =>
        document.removeEventListener("visibilitychange", updateVisibility);
    }

    const updateActive = () => {
      setActive(visibleRef.current && !document.hidden);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          setShouldMount(true);
        }

        updateActive();
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    document.addEventListener("visibilitychange", updateActive);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateActive);
    };
  }, [failed, rootMargin, threshold]);

  if (failed) {
    return errorFallback;
  }

  return (
    <div ref={containerRef} className={className}>
      {shouldMount ? (
        <SceneErrorBoundary
          fallback={errorFallback}
          onError={() => setFailed(true)}
        >
          <Suspense fallback={fallback}>
            <Scene {...sceneProps} active={active} />
          </Suspense>
        </SceneErrorBoundary>
      ) : (
        fallback
      )}
    </div>
  );
}
