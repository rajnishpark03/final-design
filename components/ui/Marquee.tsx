"use client";

import { cn } from "@/lib/utils";

/**
 * Infinite marquee. Duplicates children for a seamless loop.
 */
export default function Marquee({
  items,
  className,
  reverse = false,
  speed = 36,
  separator = "✦",
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
  speed?: number;
  separator?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]",
        className
      )}
    >
      {[0, 1].map((dup) => (
        <div
          key={dup}
          aria-hidden={dup === 1}
          className="flex shrink-0 items-center gap-8 pr-8 will-change-transform"
          style={{
            animation: `marquee-x ${speed}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="text-xl font-semibold tracking-tight text-fg/70 md:text-2xl">
                {item}
              </span>
              <span className="text-ember/70">{separator}</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
