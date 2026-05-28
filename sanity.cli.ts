// sanity.cli.ts — Sanity CLI config: project coordinates + TypeGen settings.
// TypeGen auto-generates sanity.types.ts from schemas + GROQ queries on every
// `sanity dev` and `sanity typegen generate` run.
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: { projectId: 'j8vrs6gs', dataset: 'production' },
  typegen: {
    // Scan all TS/TSX/Astro files for defineQuery() calls
    enabled: true,
    path: './src/**/*.{ts,tsx,astro}',
    // Output file — included in tsconfig.json include array
    generates: './sanity.types.ts',
    overloadClientMethods: true,
  },
    deployment: {
    appId: 'zgz20dwwwa35tg2s3zcmu19s',
  },
})
