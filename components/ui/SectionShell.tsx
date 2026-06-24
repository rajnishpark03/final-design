"use client";

import { cn } from "@/lib/utils";
import { Eyebrow } from "./TextEffects";
import { Reveal } from "./Reveal";

/**
 * Consistent section wrapper: id anchor, vertical rhythm, eyebrow + index row.
 */
export default function SectionShell({
  id,
  eyebrow,
  index,
  children,
  className,
  eyebrowTone = "violet",
}: {
  id: string;
  eyebrow: string;
  index: string;
  children: React.ReactNode;
  className?: string;
  eyebrowTone?: "violet" | "ember" | "mist";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 md:py-32",
        className
      )}
    >
      <Reveal direction="up" className="mb-10 flex items-center justify-between">
        <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>
        <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-fg/30">
          {index}
        </span>
      </Reveal>
      {children}
    </section>
  );
}
