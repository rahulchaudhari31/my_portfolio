import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { loadEnv } from "vite";

const DEFAULT_SITE_URL = "https://rahulchaudhari.vercel.app";
const env = loadEnv("production", process.cwd(), "");
const siteUrl = (env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
const lastmod = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

writeFileSync(resolve("public/sitemap.xml"), sitemap);
writeFileSync(resolve("public/robots.txt"), robots);
