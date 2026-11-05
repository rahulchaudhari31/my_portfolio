import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#07070d",
          soft: "#0b0b14",
          light: "#0f0f1a",
        },
        violet: {
          DEFAULT: "#7c3aed",
          light: "#a78bfa",
          dark: "#5b21b6",
        },
        cyan: {
          DEFAULT: "#22d3ee",
          light: "#67e8f9",
          dark: "#0891b2",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
        body: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(120deg, #7c3aed 0%, #a78bfa 45%, #22d3ee 100%)",
        "radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.28), transparent 60%)",
        "grid-pattern":
          "linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 45px -12px rgba(124, 58, 237, 0.65)",
        "glow-cyan": "0 0 45px -12px rgba(34, 211, 238, 0.6)",
        glass: "0 18px 45px -20px rgba(0, 0, 0, 0.85)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.8" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "timeline-pulse": {
          "0%": { transform: "scale(0.7)", opacity: "0.65" },
          "80%, 100%": { transform: "scale(2.1)", opacity: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        "pulse-slow": "pulse-slow 7s ease-in-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        marquee: "marquee 32s linear infinite",
        "timeline-pulse": "timeline-pulse 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};
