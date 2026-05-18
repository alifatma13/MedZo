// env.d.ts — TypeScript ambient declarations: Astro client types and CSS-only package stubs.
/// <reference types="astro/client" />

// @fontsource packages are CSS-only and ship no type declarations.
declare module "@fontsource-variable/inter";
declare module "@fontsource-variable/plus-jakarta-sans";

// woff2 asset imports via Vite ?url suffix resolve to a string URL.
declare module "*?url" {
  const url: string;
  export default url;
}
