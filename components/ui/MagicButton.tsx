"use client";

import { type ReactNode } from "react";
import Magnetic from "./Magnetic";
import { cn } from "@/lib/utils";

/**
 * Magic button — magnetic pull, liquid hover fill, glow and ripple.
 */
export default function MagicButton({
  children,
  onClick,
  variant = "violet",
  size = "md",
  className,
  cursorLabel,
  icon,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "violet" | "ember" | "ghost";
  size?: "md" | "lg";
  className?: string;
  cursorLabel?: string;
  icon?: ReactNode;
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-tight transition-colors duration-300";
  const sizing =
    size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm";

  const skins: Record<string, string> = {
    violet:
      "text-white bg-violet-600/90 shadow-glow border border-violet-400/40",
    ember:
      "text-white bg-ember/90 shadow-glow-ember border border-ember-300/40",
    ghost: "text-fg glass border border-line/15",
  };

  const fill: Record<string, string> = {
    violet: "bg-gradient-to-r from-violet-400 to-violet-600",
    ember: "bg-gradient-to-r from-ember-300 to-ember",
    ghost: "bg-surface/10",
  };

  return (
    <Magnetic strength={0.45}>
      <button
        onClick={onClick}
        data-cursor="hover"
        data-cursor-label={cursorLabel}
        className={cn(base, sizing, skins[variant], className)}
      >
        {/* liquid fill */}
        <span
          className={cn(
            "absolute inset-0 -z-0 translate-y-[110%] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0",
            fill[variant]
          )}
          aria-hidden
        />
        {/* sheen */}
        <span
          className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(120px 60px at var(--x,50%) 0%, rgba(255,255,255,0.35), transparent 70%)",
          }}
          aria-hidden
        />
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {icon}
        </span>
      </button>
    </Magnetic>
  );
}
