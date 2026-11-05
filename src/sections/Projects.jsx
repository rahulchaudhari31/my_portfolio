import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiExternalLink,
  FiGithub,
  FiImage,
  FiX,
} from "react-icons/fi";
import SectionHeading from "../components/SectionHeading";
import useTilt from "../hooks/useTilt";
import { getLenis } from "../hooks/useLenis";
import { projects, projectsSection } from "../data/content";

const easeOut = [0.22, 1, 0.36, 1];
const activePillTransition = {
  type: "spring",
  stiffness: 380,
  damping: 32,
};

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const hostFor = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "live project";
  }
};

const numberFor = (projectId) =>
  String(projects.findIndex((project) => project.id === projectId) + 1).padStart(
    2,
    "0",
  );

function ProjectPreview({
  project,
  layoutId,
  className = "",
  scrollOnHover = false,
  priority = false,
}) {
  const [status, setStatus] = useState("loading");

  return (
    <motion.div
      layoutId={layoutId}
      transition={{ duration: 0.45, ease: easeOut }}
      className={`relative overflow-hidden bg-gradient-to-br from-violet/30 via-ink-soft to-cyan/20 ${className}`}
    >
      {status !== "error" ? (
        <img
          src={project.screenshot}
          alt={`${project.title} ${projectsSection.previewAltSuffix}`}
          width={1200}
          height={750}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`h-full w-full object-cover object-top transition-[object-position] duration-[4200ms] ease-linear ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          } ${
            scrollOnHover
              ? "group-hover:object-bottom group-focus-within:object-bottom"
              : ""
          }`}
        />
      ) : null}

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 flex h-7 items-center gap-1.5 border-b border-white/10 bg-white/15 px-3 backdrop-blur-md"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-rose-400/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-300/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 truncate text-[9px] tracking-wide text-slate-100 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          {hostFor(project.liveUrl)}
        </span>
      </div>

      {status === "loading" ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden bg-slate-200/95"
        >
          <div className="absolute inset-x-0 top-7 h-9 animate-pulse bg-slate-300/70" />
          <div className="absolute left-5 top-20 h-3 w-32 animate-pulse rounded bg-slate-300/80" />
          <div className="absolute left-5 top-24 h-7 w-3/5 animate-pulse rounded bg-slate-300/70" />
          <div className="absolute left-5 top-36 h-2.5 w-2/5 animate-pulse rounded bg-slate-300/60" />
          <div className="absolute inset-x-5 bottom-5 h-16 animate-pulse rounded-xl bg-slate-300/50" />
        </div>
      ) : null}

      {status === "error" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan">
            <FiImage className="text-lg" />
          </span>
          <p className="text-sm font-medium text-slate-300">
            {projectsSection.previewUnavailable}
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
            {project.title}
          </p>
        </div>
      ) : null}
    </motion.div>
  );
}

function ProjectCard({ project, onOpen }) {
  const reduceMotion = useReducedMotion();
  const { ref: tiltRef, tiltHandlers } = useTilt({
    max: 8,
    scale: 1.015,
    perspective: 1200,
  });
  const number = numberFor(project.id);
  const featured = project.featured;

  const handleMouseMove = (event) => {
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();

    node.style.setProperty("--glare-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--glare-y", `${event.clientY - rect.top}px`);

    if (!reduceMotion) {
      tiltHandlers.onMouseMove(event);
    }
  };

  const handleOpen = () => {
    if (tiltRef.current) {
      tiltRef.current.style.transform =
        "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";
    }

    onOpen(project);
  };

  return (
    <motion.article
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.95 }}
      transition={{ duration: 0.42, ease: easeOut }}
      data-cursor="hover"
      className="group relative"
    >
      <div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={tiltHandlers.onMouseLeave}
        className={`relative h-full rounded-[2rem] transition-transform duration-200 ease-out will-change-transform ${
          featured
            ? "bg-gradient-to-br from-violet via-cyan/70 to-violet p-px shadow-[0_0_50px_-24px_rgba(124,58,237,0.85)]"
            : ""
        }`}
      >
        <div
          className={`glass relative flex h-full flex-col overflow-hidden ${
            featured ? "rounded-[calc(2rem-1px)]" : "rounded-[2rem]"
          }`}
        >
          <div className="relative">
            <ProjectPreview
              project={project}
              layoutId={`project-preview-${project.id}`}
              scrollOnHover
              className="aspect-[2/1]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 right-3 z-20 flex translate-y-1 items-center gap-1.5 rounded-full border border-white/15 bg-white/15 px-3 py-1.5 text-[11px] font-medium text-slate-100 opacity-0 shadow-lg backdrop-blur-md [text-shadow:0_1px_2px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
            >
              {projectsSection.viewDetailsLabel}
              <FiArrowUpRight className="text-cyan" />
            </div>
          </div>

          <div className="pointer-events-none relative z-20 flex flex-1 flex-col p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-display text-[10px] tracking-[0.32em] text-slate-400">
                  {number}
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white">
                  {project.title}
                </h3>
              </div>

              {featured ? (
                <span className="shrink-0 rounded-full border border-cyan/30 bg-gradient-to-r from-violet/25 to-cyan/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan">
                  {projectsSection.featuredLabel}
                </span>
              ) : null}
            </div>

            <p className="mt-2 text-base leading-[1.65] text-[#a8b3c4]">
              {project.tagline}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-slate-400"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pointer-events-auto mt-auto flex flex-wrap gap-2 pt-5">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${projectsSection.liveDemoLabel}: ${project.title}`}
                onClick={(event) => event.stopPropagation()}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-gradient-to-r from-violet to-cyan px-4 py-2 text-xs font-semibold text-[#07070d] transition-opacity hover:opacity-90"
              >
                {projectsSection.liveDemoLabel}
                <FiExternalLink className="text-sm" />
              </a>

              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${projectsSection.githubLabel}: ${project.title}`}
                onClick={(event) => event.stopPropagation()}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-white/20 hover:text-white"
              >
                {projectsSection.githubLabel}
                <FiGithub className="text-sm" />
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpen}
            aria-label={`${projectsSection.viewDetailsLabel}: ${project.title}`}
            aria-haspopup="dialog"
            className="absolute inset-0 z-10 rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(420px circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255, 255, 255, 0.14), transparent 45%)",
            }}
          />
        </div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const number = numberFor(project.id);
  const featured = project.featured;

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const lenis = getLenis();

    lenis?.stop();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;
      if (!dialog) {
        return;
      }

      const focusable = Array.from(
        dialog.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!dialog.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      lenis?.start();

      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] overflow-y-auto bg-ink/80 px-4 py-6 backdrop-blur-xl sm:px-6 sm:py-10"
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-description"
        initial={{ opacity: 0, y: 26, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.35, ease: easeOut }}
        onClick={(event) => event.stopPropagation()}
        className="mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-ink-soft/95 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-7">
          <div className="flex min-w-0 items-start gap-4">
            <span className="font-display text-[10px] tracking-[0.32em] text-slate-400">
              {number}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2
                  id="project-modal-title"
                  className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                >
                  {project.title}
                </h2>
                {featured ? (
                  <span className="rounded-full border border-cyan/30 bg-gradient-to-r from-violet/25 to-cyan/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan">
                    {projectsSection.featuredLabel}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-sm text-slate-400">{project.tagline}</p>
            </div>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={projectsSection.closeLabel}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:border-white/20 hover:text-white"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[1.1fr_0.9fr]">
          <ProjectPreview
            project={project}
            layoutId={`project-preview-${project.id}`}
            priority
            className="aspect-[16/10] rounded-2xl border border-white/10"
          />

          <div className="min-w-0">
            <p className="eyebrow text-[10px]">
              {projectsSection.detailsEyebrow}
            </p>

            <p
              id="project-modal-description"
              className="mt-3 text-base leading-[1.65] text-[#a8b3c4]"
            >
              {project.description}
            </p>

            <h3 className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.18em] text-white">
              {projectsSection.featuresLabel}
            </h3>

            <ul className="mt-3 space-y-2.5">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-base leading-[1.65] text-[#a8b3c4]"
                >
                  <FiCheckCircle className="mt-0.5 shrink-0 text-cyan" />
                  {feature}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.18em] text-white">
              {projectsSection.stackLabel}
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3 border-t border-white/10 pt-5">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${projectsSection.liveLinkLabel}: ${project.title}`}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-gradient-to-r from-violet to-cyan px-4 py-2 text-xs font-semibold text-[#07070d] transition-opacity hover:opacity-90"
              >
                {projectsSection.liveDemoLabel}
                <FiExternalLink className="text-sm" />
              </a>

              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${projectsSection.repoLinkLabel}: ${project.title}`}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-white/20 hover:text-white"
              >
                {projectsSection.githubLabel}
                <FiGithub className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState(projectsSection.filters[0]);
  const [selectedId, setSelectedId] = useState(null);

  const filteredProjects = useMemo(
    () =>
      activeFilter === projectsSection.filters[0]
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedId) ?? null,
    [selectedId],
  );

  const openProject = useCallback((project) => setSelectedId(project.id), []);
  const closeProject = useCallback(() => setSelectedId(null), []);

  const handleTabKeyDown = (event, index) => {
    const { key } = event;
    const filterCount = projectsSection.filters.length;

    if (
      key !== "ArrowRight" &&
      key !== "ArrowLeft" &&
      key !== "Home" &&
      key !== "End"
    ) {
      return;
    }

    event.preventDefault();

    let nextIndex = index;

    if (key === "ArrowRight") {
      nextIndex = (index + 1) % filterCount;
    } else if (key === "ArrowLeft") {
      nextIndex = (index - 1 + filterCount) % filterCount;
    } else if (key === "Home") {
      nextIndex = 0;
    } else if (key === "End") {
      nextIndex = filterCount - 1;
    }

    const nextFilter = projectsSection.filters[nextIndex];
    setActiveFilter(nextFilter);
    document.getElementById(`project-tab-${slugify(nextFilter)}`)?.focus();
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section-padding relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-cyan/10 blur-[140px]"
      />

      <div className="section-shell relative">
        <SectionHeading
          id="projects-heading"
          eyebrow={projectsSection.eyebrow}
          title={projectsSection.heading}
          description={projectsSection.description}
        />

        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label={projectsSection.filterLabel}
            className="glass inline-flex w-fit flex-wrap gap-1 rounded-full p-1"
          >
            {projectsSection.filters.map((filter, index) => {
              const active = filter === activeFilter;
              const filterId = slugify(filter);

              return (
                <button
                  key={filter}
                  id={`project-tab-${filterId}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="projects-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => setActiveFilter(filter)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className="relative flex min-h-10 items-center rounded-full px-4 text-sm font-medium transition-colors"
                >
                  {active ? (
                    <motion.span
                      layoutId="active-project-filter"
                      transition={activePillTransition}
                      className="absolute inset-0 rounded-full border border-white/10 bg-gradient-to-r from-violet/30 to-cyan/20"
                    />
                  ) : null}
                  <span
                    className={`relative z-10 ${
                      active
                        ? "text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {filter}
                  </span>
                </button>
              );
            })}
          </div>

          <p
            aria-live="polite"
            className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400"
          >
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1
              ? projectsSection.resultsSingular
              : projectsSection.resultsSuffix}
          </p>
        </div>

        <div
          id="projects-panel"
          role="tabpanel"
          aria-labelledby={`project-tab-${slugify(activeFilter)}`}
        >
          <motion.div
            layout
            className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={openProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject ? (
          <ProjectModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={closeProject}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
