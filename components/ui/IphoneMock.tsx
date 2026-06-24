import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * iPhone 15 device mockup (pure CSS/markup — crisp at any size, themeable).
 * - Signature Dynamic Island (not a notch)
 * - Titanium-style frame + side buttons (Action, Volume, Power)
 * - `children` render inside the screen; pass a background via screenClassName
 *   or as the first child.
 */
export default function IphoneMock({
  children,
  className,
  screenClassName,
}: {
  children?: ReactNode;
  className?: string;
  screenClassName?: string;
}) {
  return (
    <div className={cn("relative aspect-[9/19.5] select-none", className)}>
      {/* Side buttons */}
      <span className="absolute left-[-1.6%] top-[16%] h-[5%] w-[1.8%] rounded-l-sm bg-zinc-600/90" />
      <span className="absolute left-[-1.6%] top-[26%] h-[9%] w-[1.8%] rounded-l-sm bg-zinc-600/90" />
      <span className="absolute left-[-1.6%] top-[38%] h-[9%] w-[1.8%] rounded-l-sm bg-zinc-600/90" />
      <span className="absolute right-[-1.6%] top-[30%] h-[12%] w-[1.8%] rounded-r-sm bg-zinc-600/90" />

      {/* Titanium frame */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-zinc-400 via-zinc-600 to-zinc-800 p-[3.4%] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)]"
        style={{ borderRadius: "15% / 7%" }}
      >
        {/* Inner black bezel */}
        <div
          className="relative h-full w-full bg-black p-[2.4%]"
          style={{ borderRadius: "12.5% / 5.8%" }}
        >
          {/* Screen */}
          <div
            className={cn(
              "relative h-full w-full overflow-hidden bg-black",
              screenClassName
            )}
            style={{ borderRadius: "10.5% / 4.9%" }}
          >
            {children}

            {/* Dynamic Island */}
            <div className="absolute left-1/2 top-[2.4%] z-20 h-[3.4%] w-[33%] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
              <span className="absolute right-[14%] top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-zinc-700" />
            </div>

            {/* Screen sheen */}
            <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
