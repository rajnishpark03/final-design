"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * Fixed, full-page mount for the 3D planet field. Loaded client-only (WebGL),
 * sits behind all content, and never intercepts pointer events.
 *
 * PERFORMANCE: the WebGL planet scene is the single heaviest element on the
 * page, so it is mounted on capable desktops only (wide viewport + fine
 * pointer + enough CPU cores + motion allowed). Phones, tablets and low-end
 * machines fall back to the lightweight galaxy + twinkling-star background,
 * which keeps the experience smooth on every device.
 */
const PlanetScene = dynamic(() => import("./PlanetScene"), {
  ssr: false,
  loading: () => null,
});

export default function PlanetBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowCore = (navigator.hardwareConcurrency ?? 8) <= 4;
    const update = () => setEnabled(mq.matches && !reduced && !lowCore);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <PlanetScene />
    </div>
  );
}
