// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: "https://medzoweb.netlify.app",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
    }),
  ],
  build: {
    inlineStylesheets: "always",
  },
  image: {
    remotePatterns: [{ protocol: "https", hostname: "i.pravatar.cc" }],
  },
});
