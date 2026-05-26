// env.d.ts — TypeScript ambient declarations: Astro client types and CSS-only package stubs.
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: string;
  /** Write-access token — only set server-side; never exposed to the browser. */
  readonly SANITY_API_TOKEN?: string;
  readonly PUBLIC_WEB3FORMS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// @fontsource packages are CSS-only and ship no type declarations.
declare module "@fontsource-variable/inter";
declare module "@fontsource-variable/plus-jakarta-sans";

// woff2 asset imports via Vite ?url suffix resolve to a string URL.
declare module "*?url" {
  const url: string;
  export default url;
}
