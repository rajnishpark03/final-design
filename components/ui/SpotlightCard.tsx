"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Glass card with a cursor-following spotlight + glow border.
 */
export default function SpotlightCard({
  children,
  className,
  glow = "violet",
  spotlight = true,
}: {
  children: ReactNode;
  className?: string;
  glow?: "violet" | "ember" | "none";
  spotlight?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const glowColor =
    glow === "ember"
      ? "rgba(255,122,26,0.18)"
      : glow === "violet"
        ? "rgba(124,92,252,0.22)"
        : "transparent";

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group relative overflow-hidden rounded-3xl glass p-6 transition-transform duration-300 will-change-transform",
        "hover:-translate-y-1",
        className
      )}
    >
      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(260px circle at var(--mx) var(--my), ${glowColor}, transparent 65%)`,
          }}
          aria-hidden
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
