"use client";

import {
  Mic,
  Monitor,
  AudioLines,
  Sparkles,
  Smartphone,
  VenetianMask,
  Check,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { howToShoot } from "@/lib/content";
import SectionShell from "@/components/ui/SectionShell";
import { GradientText } from "@/components/ui/TextEffects";
import TiltCard from "@/components/ui/TiltCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const styleIcons: Record<string, LucideIcon> = {
  mic: Mic,
  monitor: Monitor,
  "audio-lines": AudioLines,
  sparkles: Sparkles,
  smartphone: Smartphone,
  "venetian-mask": VenetianMask,
};

export default function HowToShoot() {
  return (
    <SectionShell
      id="how-to-shoot"
      eyebrow={howToShoot.eyebrow}
      index={howToShoot.index}
    >
      <Reveal direction="up">
        <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[0.9] tracking-tight">
          {howToShoot.titleLead}{" "}
          <GradientText variant="violet">{howToShoot.titleAccent}</GradientText>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-fg/75">
          {howToShoot.subtitle}
        </p>
      </Reveal>

      <RevealGroup
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.08}
      >
        {howToShoot.styles.map((style) => {
          const Icon = styleIcons[style.icon];
          const ember = style.tone === "ember";
          return (
            <RevealItem key={style.title} direction="scale">
              <TiltCard max={10} className="group h-full">
                <div
                  className={cn(
                    "relative h-full overflow-hidden rounded-3xl p-7 transition-colors duration-300",
                    ember
                      ? "bg-gradient-to-br from-ember/25 to-ember/5 ring-1 ring-ember/30"
                      : "glass hover:border-violet-400/30"
                  )}
                >
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: ember
                        ? "rgba(255,122,26,0.3)"
                        : "rgba(124,92,252,0.3)",
                    }}
                  />
                  <span
                    className={cn(
                      "relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6",
                      ember
                        ? "bg-ember/25 text-ember"
                        : "bg-violet-500/20 text-brand"
                    )}
                  >
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="relative z-10 text-xl font-bold text-fg">
                    {style.title}
                  </h3>
                  <p className="relative z-10 mt-2 text-sm leading-relaxed text-fg/75">
                    {style.description}
                  </p>
                </div>
              </TiltCard>
            </RevealItem>
          );
        })}
      </RevealGroup>

      {/* banner */}
      <Reveal direction="up" className="mt-6">
        <div className="glow-border relative flex flex-col items-start gap-4 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-violet-800 p-7 shadow-glow sm:flex-row sm:items-center">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white">
            <Check className="h-6 w-6" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-white">
              {howToShoot.banner.title}
            </h3>
            <p className="mt-1 text-white/70">{howToShoot.banner.subtitle}</p>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
