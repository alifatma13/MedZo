// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import { loadEnv } from 'vite';

// Load .env so PUBLIC_SANITY_* vars are available at config time
const env = loadEnv('', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  site: "https://medzo.com.au",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404") && !page.includes("/studio"),
    }),
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET,
      // Studio is hosted externally at medzo.sanity.studio — not embedded here.
      // Use CDN in production for faster reads; bypass in dev for fresh data.
      useCdn: process.env.NODE_ENV === 'production',
    }),
  ],
  build: {
    inlineStylesheets: "auto",
  },
  image: {
    remotePatterns: [
      // Sanity CDN — required for Astro <Image /> to optimise images uploaded via Studio
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
});
