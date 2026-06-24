"use client";

import { cn } from "@/lib/utils";

/** Gradient text (ReactBits-style) */
export function GradientText({
  children,
  className,
  variant = "violet",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "violet" | "ember";
}) {
  return (
    <span
      className={cn(
        variant === "violet" ? "text-gradient-violet" : "text-gradient-ember",
        className
      )}
    >
      {children}
    </span>
  );
}

/** Shiny sweeping text (ReactBits-style) */
export function ShinyText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("shiny-text", className)}>{children}</span>;
}

/** Small uppercase eyebrow label */
export function Eyebrow({
  children,
  className,
  tone = "violet",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "violet" | "ember" | "mist";
}) {
  const color =
    tone === "ember"
      ? "text-ember"
      : tone === "mist"
        ? "text-mist/70"
        : "text-brand";
  return (
    <span
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.32em]",
        color,
        className
      )}
    >
      {children}
    </span>
  );
}
