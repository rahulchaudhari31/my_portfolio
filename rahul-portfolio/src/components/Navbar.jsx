import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { a11y, brand, navigation } from "../data/content";
import { getLenis } from "../hooks/useLenis";

const easeOut = [0.22, 1, 0.36, 1];

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  try {
    return window.localStorage.getItem("theme") === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function ThemeToggle({ theme, onToggle }) {
  const isLight = theme === "light";
  const Icon = isLight ? FiMoon : FiSun;

  return (
    <button
      type="button"
      onClick={onToggle}
      className="ref-theme-toggle"
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      aria-pressed={isLight}
      title={isLight ? "Switch to dark theme" : "Switch to light theme"}
      data-cursor="hover"
    >
      <Icon className="text-base" />
    </button>
  );
}

export default function Navbar() {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    const isLight = theme === "light";

    root.classList.toggle("light", isLight);
    root.style.colorScheme = theme;

    const themeColor = document.querySelector('meta[name="theme-color"]');
    themeColor?.setAttribute("content", isLight ? "#f4f7fb" : "#07070d");

    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // ignore storage failures
    }
  }, [theme]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const lenis = getLenis();
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    const focusTimer = window.setTimeout(() => {
      menuRef.current?.querySelector("a")?.focus();
    }, 50);

    lenis?.stop();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) {
        return;
      }

      const focusable = Array.from(
        menuRef.current.querySelectorAll("a[href], button:not([disabled])"),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      lenis?.start();
      document.body.style.overflow = previousOverflow;

      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, [open]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (event) => {
      if (event.matches) {
        setOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleNavigate = (event, href) => {
    event.preventDefault();
    setOpen(false);

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    window.setTimeout(() => {
      const lenis = getLenis();

      if (lenis) {
        lenis.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 120);
  };

  return (
    <>
      <motion.header
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <nav aria-label="Primary" className="ref-nav">
          <a
            href={brand.href}
            className="ref-brand"
            aria-label={a11y.home}
            data-cursor="hover"
          >
            <span className="ref-brand-badge">{brand.initials}</span>
            <span className="ref-brand-name">{brand.name}</span>
          </a>

          <div className="hidden items-center gap-3 md:flex">
            <div className="ref-nav-links">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  data-cursor="hover"
                >
                  {item.label}
                </a>
              ))}

              <ThemeToggle
                theme={theme}
                onToggle={() =>
                  setTheme((value) => (value === "light" ? "dark" : "light"))
                }
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle
              theme={theme}
              onToggle={() =>
                setTheme((value) => (value === "light" ? "dark" : "light"))
              }
            />

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? a11y.closeMenu : a11y.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="ref-menu-btn relative"
              data-cursor="hover"
            >
              <motion.span
                className="absolute left-[9px] top-[13px] h-0.5 w-5 rounded-full bg-current"
                animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="absolute left-[9px] top-[19px] h-0.5 w-5 rounded-full bg-current"
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-[9px] top-[25px] h-0.5 w-5 rounded-full bg-current"
                animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            ref={menuRef}
            id="mobile-menu"
            key="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink/95 px-6 pb-10 pt-28 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleNavigate(event, item.href)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.06 + index * 0.06,
                      duration: 0.45,
                      ease: easeOut,
                    },
                  }}
                  className="group flex items-center justify-between border-b border-white/10 py-4"
                  data-cursor="hover"
                >
                  <span className="font-display text-3xl font-semibold text-slate-200 transition-colors group-hover:text-white">
                    {item.label}
                  </span>
                  <span className="font-display text-xs tracking-[0.3em] text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
