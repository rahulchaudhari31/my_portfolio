import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import MarqueeStrip from "./components/MarqueeStrip";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import SiteBackground from "./components/SiteBackground";
import useLenis from "./hooks/useLenis";
import NotFound from "./pages/NotFound";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";

const easeOut = [0.22, 1, 0.36, 1];

function isNotFoundPath() {
  if (typeof window === "undefined") {
    return false;
  }

  const basePath = import.meta.env.BASE_URL.replace(/\/+$/, "");
  const path = window.location.pathname.replace(/\/+$/, "");

  return (
    path !== "" &&
    path !== basePath &&
    path !== `${basePath}/index.html`
  );
}

function App() {
  const reduceMotion = useReducedMotion();
  const [notFound] = useState(isNotFoundPath);
  const [loading, setLoading] = useState(true);
  const finishLoading = useCallback(() => setLoading(false), []);

  useLenis();

  if (notFound) {
    return <NotFound />;
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <SiteBackground />

      <motion.div
        initial={false}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.7, ease: easeOut }}
        inert={loading}
        className={loading ? "pointer-events-none relative z-10" : "relative z-10"}
      >
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <About />
          <Skills />
          <MarqueeStrip />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </motion.div>

      <AnimatePresence>
        {loading ? (
          <LoadingScreen key="loading-screen" onFinish={finishLoading} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default App;
