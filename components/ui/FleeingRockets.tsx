"use client";

/**
 * Four sleek rockets that glide steadily across the viewport in one direction
 * (a calm "fleet" drift — no jitter) and smoothly veer away from the cursor /
 * touch like same magnetic poles repel, then ease back onto their heading.
 * They wrap around the edges for a continuous flow. Pointer-events are off so
 * they never block clicks; reduced-motion users get a static fleet.
 */

import { useEffect, useRef } from "react";

const COUNT = 4;
const REPEL_RADIUS = 170;
const REPEL_FORCE = 2600;
const DRIFT_SPEED = 1.15; // steady glide
const HEADING = -0.32; // radians ≈ up-and-to-the-right, shared by the fleet

type Rocket = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  angle: number;
};

export default function FleeingRockets() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = window.innerWidth;
    let h = window.innerHeight;
    const mouse = { x: -9999, y: -9999, active: false };
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    const rockets: Rocket[] = Array.from({ length: COUNT }, () => {
      // shared heading with a tiny per-rocket variation + speed variation
      const heading = HEADING + rnd(-0.08, 0.08);
      const speed = DRIFT_SPEED * rnd(0.85, 1.15);
      const baseVx = Math.cos(heading) * speed;
      const baseVy = Math.sin(heading) * speed;
      return {
        x: rnd(0.05, 0.95) * w,
        y: rnd(0.1, 0.9) * h,
        vx: baseVx,
        vy: baseVy,
        baseVx,
        baseVy,
        angle: (Math.atan2(baseVy, baseVx) * 180) / Math.PI,
      };
    });

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) {
        mouse.x = t.clientX;
        mouse.y = t.clientY;
        mouse.active = true;
      }
    };
    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onLeave);
    window.addEventListener("resize", onResize);

    const M = 60; // wrap margin
    let raf = 0;
    const tick = () => {
      for (let i = 0; i < rockets.length; i++) {
        const r = rockets[i];

        // ease velocity back toward the steady heading (kills jitter)
        r.vx += (r.baseVx - r.vx) * 0.05;
        r.vy += (r.baseVy - r.vy) * 0.05;

        // smooth repulsion from the cursor
        if (mouse.active) {
          const dx = r.x - mouse.x;
          const dy = r.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const d = Math.sqrt(d2) || 1;
          if (d < REPEL_RADIUS) {
            const f = REPEL_FORCE / (d2 + 600);
            r.vx += (dx / d) * f;
            r.vy += (dy / d) * f;
          }
        }

        r.x += r.vx;
        r.y += r.vy;

        // wrap around the edges for a continuous one-direction flow
        if (r.x < -M) r.x = w + M;
        else if (r.x > w + M) r.x = -M;
        if (r.y < -M) r.y = h + M;
        else if (r.y > h + M) r.y = -M;

        // face direction of travel, smoothly
        const target = (Math.atan2(r.vy, r.vx) * 180) / Math.PI;
        let diff = target - r.angle;
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        r.angle += diff * 0.15;

        const el = refs.current[i];
        if (el) {
          el.style.transform = `translate3d(${r.x}px, ${r.y}px, 0) translate(-50%, -50%) rotate(${r.angle}deg)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    if (reduce) {
      rockets.forEach((r, i) => {
        const el = refs.current[i];
        if (el)
          el.style.transform = `translate3d(${r.x}px, ${r.y}px, 0) translate(-50%, -50%) rotate(${r.angle}deg)`;
      });
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[40] overflow-hidden"
      aria-hidden
    >
      {Array.from({ length: COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="absolute left-0 top-0 will-change-transform"
        >
          <svg
            viewBox="-10 0 74 32"
            className="h-5 w-11 opacity-80 drop-shadow-[0_0_10px_rgba(120,170,255,0.55)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ion trail */}
            <path d="M2 13 L-9 16 L2 19 Z" fill="#7fd1ff" opacity="0.9" />
            <path d="M2 14.5 L-4 16 L2 17.5 Z" fill="#ffffff" />
            {/* fins */}
            <path d="M12 9 L4 3 L15 12 Z" fill="#5b8cff" />
            <path d="M12 23 L4 29 L15 20 Z" fill="#5b8cff" />
            {/* sleek body */}
            <path
              d="M4 16 C4 10 16 7 32 7 L44 7 C55 8 60 12 63 16 C60 20 55 24 44 25 L32 25 C16 25 4 22 4 16 Z"
              fill="#eef2f8"
            />
            {/* nose */}
            <path d="M44 7 C55 8 60 12 63 16 C60 20 55 24 44 25 Z" fill="#3b6fe0" />
            {/* window */}
            <circle cx="36" cy="16" r="4.2" fill="#9fe0ff" stroke="#2b6fd6" strokeWidth="1.4" />
          </svg>
        </div>
      ))}
    </div>
  );
}
