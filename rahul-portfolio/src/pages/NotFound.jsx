import { useEffect } from "react";
import { FiArrowLeft, FiCompass } from "react-icons/fi";
import { brand, notFound, site } from "../data/content";

export default function NotFound() {
  useEffect(() => {
    const previousTitle = document.title;
    const robots = document.querySelector('meta[name="robots"]');
    const previousRobots = robots?.getAttribute("content");

    document.title = `Page not found — ${site.author}`;
    robots?.setAttribute("content", "noindex, nofollow");

    return () => {
      document.title = previousTitle;
      if (robots && previousRobots) {
        robots.setAttribute("content", previousRobots);
      }
    };
  }, []);

  return (
    <main
      id="main-content"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-glow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
      />

      <div className="relative w-full max-w-xl text-center">
        <a
          href={brand.href}
          aria-label={notFound.homeLabel}
          className="inline-flex items-center gap-3"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gradient font-display text-sm font-bold text-white shadow-glow">
            {brand.initials}
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-white">
            {brand.name}
            <span className="text-cyan">.</span>
          </span>
        </a>

        <p className="mt-12 font-display text-[clamp(5rem,20vw,9rem)] font-bold leading-none tracking-tighter text-gradient">
          {notFound.code}
        </p>
        <h1 className="mt-4 text-balance font-display text-3xl font-bold text-white sm:text-4xl">
          {notFound.title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-slate-300">
          {notFound.description}
        </p>

        <a
          href={brand.href}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform duration-300 hover:scale-[1.03]"
        >
          <FiArrowLeft className="text-base" />
          {notFound.backLabel}
        </a>

        <p className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
          <FiCompass className="text-cyan" />
          {notFound.hint}
        </p>
      </div>
    </main>
  );
}
