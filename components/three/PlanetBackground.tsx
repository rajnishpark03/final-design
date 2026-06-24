"use client";

import dynamic from "next/dynamic";

/**
 * Fixed, full-page mount for the 3D planet field. Loaded client-only (WebGL),
 * sits behind all content, and never intercepts pointer events.
 */
const PlanetScene = dynamic(() => import("./PlanetScene"), {
  ssr: false,
  loading: () => null,
});

export default function PlanetBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <PlanetScene />
    </div>
  );
}
