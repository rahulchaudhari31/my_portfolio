# Rahul Chaudhari Portfolio

Production-ready personal portfolio for Rahul Dattatray Chaudhari, a full-stack developer based in Nashik, India.

## Overview

The site is a single-page React experience with a dark editorial design, animated sections, responsive layouts, and optional 3D enhancements. Content is centralized in one file, contact submissions support EmailJS with a mailto fallback, and the production build includes SEO metadata, social sharing assets, a sitemap, and SPA routing for Vercel.

## Features

- Responsive layout tested for mobile, tablet, and desktop viewports
- Accessible navigation, skip link, focus-visible states, focus trapping, and semantic landmarks
- Reduced-motion support across animations, counting numbers, tilt effects, and 3D scenes
- Lazy-mounted 3D scenes that pause when off-screen or when the browser tab is hidden
- WebGL capability detection with graceful fallbacks and an error boundary
- Contact form validation, EmailJS integration, keyboard focus handling, and fallback email link
- Self-hosted fonts, local favicon, Apple touch icon, social share image, and web manifest
- SEO metadata, Person structured data, sitemap, robots file, and custom 404 page
- Warning-free production build with vendor code splitting
- EmailJS credentials and canonical site URL configurable through environment variables

## Tech Stack

- React 19
- Vite 8 (Rolldown)
- Tailwind CSS 3
- Framer Motion
- Lenis
- Three.js, React Three Fiber, Drei
- React Icons
- EmailJS
- Oxlint

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

On Windows PowerShell, create `.env.local` manually or copy the example with:

```powershell
Copy-Item .env.example .env.local
```

The app runs at `http://localhost:5173` by default.

## Environment Variables

Create `.env.local` for local development and add the same variables in your Vercel project settings.

```dotenv
VITE_SITE_URL=https://your-domain.vercel.app
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

- `VITE_SITE_URL`: Canonical production URL used for canonical links, Open Graph, Twitter cards, JSON-LD, `robots.txt`, and `sitemap.xml`.
- `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`: EmailJS credentials for the contact form.

If the EmailJS variables are missing, the form falls back to opening a populated `mailto:` link.

## Scripts

```bash
npm run dev       # Start the development server
npm run lint      # Run Oxlint
npm run build     # Generate SEO files and build for production
npm run preview   # Preview the production build locally
```

`npm run build` automatically runs `scripts/generate-seo.mjs`, which regenerates `public/robots.txt` and `public/sitemap.xml` using `VITE_SITE_URL`.

## Project Structure

```text
public/                 Static assets, fonts, SEO files, resume and images
scripts/                Build-time SEO generation
src/
  components/           Shared UI, navigation, footer, scene wrappers
  data/                 Centralized content and icon mappings
  hooks/                Device capability, tilt, and animation helpers
  pages/                Client-side 404 page
  sections/             Page sections
  three/                Lazy-loaded 3D scenes
  App.jsx               Page composition and loading transition
  index.css             Tailwind layers, fonts, and global styles
  main.jsx              React entry point
index.html              SEO metadata, structured data, and font preloads
tailwind.config.js      Design tokens and content paths
vercel.json             SPA rewrite, caching, and security headers
vite.config.js          Vite, HTML site URL injection, and chunk splitting
```

## Editing Content

Most text, projects, experience, skills, and contact information live in `src/data/content.js`. Update that file first when changing site copy.

Other common edits:

- Profile photo: `public/images/rahul.jpg`
- Resume: `public/Rahul_Resume.pdf`
- Social share image: `public/og-image.png`
- Favicon: `public/favicon.svg`
- Colors and typography: `tailwind.config.js` and `src/index.css`

After changing the profile photo or resume, keep the existing aspect ratio and filename, or update the references in `src/data/content.js` and `src/sections/About.jsx`.

## Deployment

### GitHub

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<repository>.git
git push -u origin main
```

### Vercel

Option 1: Import the repository at [vercel.com/new](https://vercel.com/new). Vercel detects Vite automatically. Set the environment variables from `.env.example` in the project settings.

Option 2: Deploy from the CLI:

```bash
npm install -g vercel
vercel login
vercel --prod
```

Before deploying, set `VITE_SITE_URL` to the final production URL. The build regenerates the sitemap and robots file from that value.

## Production Notes

- `vercel.json` rewrites unknown routes to `index.html` so the custom 404 page works while keeping static assets available.
- Hashed assets, fonts, and images receive long-lived immutable cache headers.
- 3D scenes use dynamic imports and only mount when they approach the viewport.
- The contact form requires working EmailJS credentials for direct delivery. Test it after setting the environment variables.
- Run `npm run lint` and `npm run build` before every deployment.
