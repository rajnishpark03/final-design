"use client";

import { Clock, Smartphone, Zap, Camera, Captions, Music, Quote } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { bestPractices } from "@/lib/content";
import SectionShell from "@/components/ui/SectionShell";
import { GradientText } from "@/components/ui/TextEffects";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const specIcons: Record<string, LucideIcon> = {
  clock: Clock,
  phone: Smartphone,
  zap: Zap,
  camera: Camera,
  captions: Captions,
  music: Music,
};

export default function BestPractices() {
  return (
    <SectionShell
      id="best-practices"
      eyebrow={bestPractices.eyebrow}
      index={bestPractices.index}
    >
      <Reveal direction="up">
        <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[0.9] tracking-tight">
          {bestPractices.titleLead}{" "}
          <GradientText variant="violet">{bestPractices.titleAccent}</GradientText>{" "}
          {bestPractices.titleTail}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-fg/75">
          {bestPractices.subtitle}
        </p>
      </Reveal>

      {/* spec grid */}
      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {bestPractices.specs.map((spec) => {
          const Icon = specIcons[spec.icon];
          const ember = spec.tone === "ember";
          return (
            <RevealItem key={spec.label} direction="up">
              <div
                data-cursor="hover"
                className={cn(
                  "group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5",
                  ember
                    ? "bg-ember/15 ring-1 ring-ember/30"
                    : "glass hover:border-violet-400/40"
                )}
              >
                <span
                  className={cn(
                    "mb-5 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                    ember
                      ? "bg-ember/25 text-ember"
                      : "bg-violet-500/15 text-brand"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fg/45">
                  {spec.label}
                </p>
                <p
                  className={cn(
                    "mt-1 text-2xl font-extrabold",
                    ember ? "text-ember" : "text-fg"
                  )}
                >
                  {spec.value}
                </p>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>

      {/* example hooks */}
      <Reveal direction="up" className="mt-12">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand">
          {bestPractices.hooksLabel}
        </p>
      </Reveal>
      <RevealGroup className="space-y-3" stagger={0.1}>
        {bestPractices.hooks.map((hook) => {
          const styles =
            hook.tone === "violet"
              ? "bg-gradient-to-r from-violet-600/60 to-violet-700/40 text-fg"
              : hook.tone === "ember"
                ? "bg-ember/15 text-brandember ring-1 ring-ember/30"
                : "glass text-fg/90";
          return (
            <RevealItem key={hook.text} direction="left">
              <div
                data-cursor="hover"
                className={cn(
                  "group flex items-center gap-4 rounded-2xl p-5 transition-transform duration-300 hover:translate-x-1.5",
                  styles
                )}
              >
                <Quote className="h-5 w-5 shrink-0 opacity-70" />
                <p className="text-lg font-bold">{hook.text}</p>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </SectionShell>
  );
}
