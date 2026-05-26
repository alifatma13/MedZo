// sanity.config.ts — Sanity Studio configuration (embedded via @sanity/astro at /studio).
// Schema types live in src/lib/content/schemas/ — add one file per document type.
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

export default defineConfig({
  name: "medzo-studio",
  title: "MedZo",

  // Project ID and dataset are public values — safe to hard-code here.
  // They are also stored in .env as PUBLIC_SANITY_PROJECT_ID / PUBLIC_SANITY_DATASET
  // for use with the Sanity client in Astro pages.
  projectId: "j8vrs6gs",
  dataset: "production",

  plugins: [structureTool()],

  schema: {
    // Register document type schemas here as the content model grows.
    // e.g. import post from "./src/lib/content/schemas/post";
    //      types: [post],
    types: [],
  },
});
