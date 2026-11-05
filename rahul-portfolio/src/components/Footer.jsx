import { FiArrowUp } from "react-icons/fi";
import { brand, footer, navigation, socials } from "../data/content";
import { socialIcons } from "../data/socialIcons";
import { getLenis } from "../hooks/useLenis";

export default function Footer() {
  const handleBackToTop = (event) => {
    event.preventDefault();

    const lenis = getLenis();

    if (lenis) {
      lenis.scrollTo(0, { duration: 1.15 });
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-violet/10 blur-[130px]"
      />

      <div className="section-shell relative py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <a
              href={brand.href}
              className="group inline-flex items-center gap-3"
              aria-label={footer.wordmark}
              data-cursor="hover"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-gradient font-display text-sm font-bold text-white shadow-glow">
                {brand.initials}
              </span>
              <span className="font-display text-xl font-semibold tracking-tight text-white">
                {footer.wordmark}
                <span className="text-cyan">.</span>
              </span>
            </a>

            <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-slate-400">
              {footer.tagline}
            </p>

            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {footer.availability}
            </span>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <nav aria-label={footer.navigationLabel}>
              <h2 className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                {footer.navigationLabel}
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-1">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                      data-cursor="hover"
                    >
                      <span className="h-px w-0 bg-cyan transition-all duration-300 group-hover:w-4" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label={footer.socialLabel}>
              <h2 className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                {footer.socialLabel}
              </h2>
              <ul className="mt-4 space-y-2">
                {socials.map((social) => {
                  const Icon = socialIcons[social.icon];
                  const external = social.href.startsWith("http");

                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="group inline-flex items-center gap-2.5 text-sm text-slate-400 transition-colors hover:text-white"
                        data-cursor="hover"
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition-colors group-hover:border-cyan/30 group-hover:text-cyan">
                          {Icon ? <Icon className="text-sm" /> : null}
                        </span>
                        {social.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        <div aria-hidden="true" className="mt-12 overflow-hidden sm:mt-14">
          <p className="whitespace-nowrap font-display text-[clamp(2.6rem,10vw,8rem)] font-bold leading-none tracking-tight text-white/[0.045]">
            {footer.wordmark}
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <p>{footer.builtWith}</p>

          <button
            type="button"
            onClick={handleBackToTop}
            className="group inline-flex min-h-11 items-center gap-2 self-start font-medium text-slate-400 transition-colors hover:text-white sm:self-auto"
            data-cursor="hover"
          >
            {footer.backToTopLabel}
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-cyan transition-all duration-300 group-hover:-translate-y-1 group-hover:border-cyan/40 group-hover:bg-cyan/10">
              <FiArrowUp className="text-sm" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
