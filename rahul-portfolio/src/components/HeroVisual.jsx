import { useRef } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import "./HeroVisual.css";

const easeOut = [0.16, 1, 0.3, 1];

const CUBES = [
  { id: "backend", label: "Backend", className: "hv-cube-slot-1", tone: "mint" },
  {
    id: "frontend",
    label: "Frontend",
    className: "hv-cube-slot-2",
    tone: "gold",
  },
  {
    id: "data",
    label: "Databases",
    className: "hv-cube-slot-3",
    tone: "coral",
  },
  { id: "cloud", label: "AWS Cloud", className: "hv-cube-slot-4", tone: "blue" },
];

const LAYERS = [
  {
    id: "api",
    eyebrow: "Node.js API",
    title: "Express REST Endpoints",
    tone: "mint",
    className: "hv-layer-1",
  },
  {
    id: "data",
    eyebrow: "Data Layer",
    title: "PostgreSQL + MongoDB",
    tone: "gold",
    className: "hv-layer-2",
  },
  {
    id: "aws",
    eyebrow: "AWS",
    title: "Cloud Deployment",
    tone: "coral",
    className: "hv-layer-3",
  },
];

const KEYS = "NODE AWS REACT SQL API {}/>_".split("");

export default function HeroVisual() {
  const visualRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 120, damping: 18, mass: 0.4 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 18, mass: 0.4 });

  const handlePointerMove = (event) => {
    if (reduceMotion) {
      return;
    }

    const node = visualRef.current;

    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    rotateY.set(x * 24);
    rotateX.set(-y * 12);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      ref={visualRef}
      aria-hidden="true"
      className="hv-visual"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="hv-stage">
        <span className="hv-ring" />

        <div className="hv-solar">
          <span className="hv-orbit hv-orbit-one">
            <i className="hv-planet hv-planet-one" />
          </span>
          <span className="hv-orbit hv-orbit-two">
            <i className="hv-planet hv-planet-two" />
          </span>
        </div>

        <motion.div
          className="hv-tilt"
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
        >
          <motion.div
            className="hv-scene-wrap"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, rotateX: 18, rotateY: -24, y: 42 }
            }
            animate={{ opacity: 1, rotateX: 0, rotateY: 0, y: 0 }}
            transition={{ duration: 1.2, ease: easeOut }}
          >
            <div className="hv-scene">
              <div className="hv-screen">
                <div className="hv-bezel">
                  <div className="hv-scan" />

                  <div className="hv-topbar">
                    <span />
                    <span />
                    <span />
                    <strong>RC.dev</strong>
                  </div>

                  <div className="hv-screen-grid">
                    <div className="hv-profile">
                      <span>RC</span>
                      <strong>6+</strong>
                      <small>Projects</small>
                    </div>

                    <div className="hv-code">
                      <i className="hv-line hv-line-wide" />
                      <i className="hv-line" />
                      <i className="hv-line hv-line-short" />
                      <i className="hv-line hv-line-mid" />
                    </div>
                  </div>

                  {LAYERS.map((layer, index) => (
                    <motion.div
                      key={layer.id}
                      className={`hv-layer-slot ${layer.className}`}
                      initial={
                        reduceMotion ? false : { opacity: 0, z: -90, y: 22 }
                      }
                      animate={{ opacity: 1, z: 0, y: 0 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.35 + index * 0.085,
                        ease: easeOut,
                      }}
                    >
                      <div
                        className={`hv-layer-inner hv-tone-${layer.tone}`}
                      >
                        <span>{layer.eyebrow}</span>
                        <strong>{layer.title}</strong>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="hv-hinge" />

              <div className="hv-base">
                <div className="hv-keyboard">
                  {KEYS.map((key, index) => (
                    <motion.span
                      key={`${key}-${index}`}
                      className="hv-key"
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.42,
                        delay: 0.5 + index * 0.012,
                        ease: easeOut,
                      }}
                    >
                      {key === " " ? "\u00A0" : key}
                    </motion.span>
                  ))}
                </div>
                <div className="hv-trackpad" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {CUBES.map((cube, index) => (
          <motion.div
            key={cube.id}
            className={`hv-cube-slot ${cube.className}`}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, scale: 0.2, rotateX: 90, rotateY: -90 }
            }
            animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
            transition={{
              duration: 0.95,
              delay: 0.45 + index * 0.11,
              ease: easeOut,
            }}
          >
            <div className={`hv-cube hv-tone-${cube.tone}`}>
              <span>{cube.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
