// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
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
    // React is required by Sanity Studio (it is a React app internally).
    // It does NOT affect the rest of the Astro site — all existing pages stay pure Astro.
    react(),
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET,
      // Studio served at yoursite.com/studio — protected by Sanity auth (login required).
      studioBasePath: '/studio',
      // Use CDN in production for faster reads; bypass in dev for fresh data.
      useCdn: process.env.NODE_ENV === 'production',
    }),
  ],
  build: {
    inlineStylesheets: "auto",
  },
  image: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      // Sanity CDN — required for Astro <Image /> to optimise images uploaded via Studio
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
});
