// SanityImage.ts — shared type for Sanity image fields with resolved asset metadata.
// GROQ projection used to produce this shape:
//   field { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop, alt }

export interface SanityImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

export interface SanityImageAsset {
  _id: string;
  url: string;
  metadata: {
    lqip: string;
    dimensions: SanityImageDimensions;
  };
}

export interface SanityImage {
  asset: SanityImageAsset;
  hotspot?: { x: number; y: number; width: number; height: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
}
