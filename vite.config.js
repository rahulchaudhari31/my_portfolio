import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const DEFAULT_SITE_URL = "https://rahulchaudhari.vercel.app";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = (env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");

  return {
    plugins: [
      react(),
      {
        name: "html-site-url",
        transformIndexHtml(html) {
          return html.replaceAll("%SITE_URL%", siteUrl);
        },
      },
    ],
    build: {
      chunkSizeWarningLimit: 500,
      rolldownOptions: {
        checks: {
          bundlerTimings: false,
        },
        output: {
          codeSplitting: {
            groups: [
              {
                name: "react-vendor",
                test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
                priority: 100,
              },
              {
                name: "motion-vendor",
                test: /node_modules[\\/](framer-motion|motion-dom|motion-utils|lenis)[\\/]/,
                priority: 90,
              },
              {
                name: "icons-vendor",
                test: /node_modules[\\/]react-icons[\\/]/,
                priority: 80,
              },
              {
                name: "three-vendor",
                test: /node_modules[\\/](three|three-stdlib|@react-three|troika|maath|camera-controls|zustand|suspend-react|react-use-measure|its-fine|@use-gesture)[\\/]/,
                priority: 70,
                maxSize: 420_000,
              },
              {
                name: "vendor",
                test: /node_modules[\\/]/,
                priority: 10,
                maxSize: 420_000,
              },
            ],
          },
        },
      },
    },
  };
});
