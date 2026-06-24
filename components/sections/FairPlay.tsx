"use client";

import {
  Eye,
  Heart,
  Users,
  Repeat,
  Bot,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { fairPlay } from "@/lib/content";
import SectionShell from "@/components/ui/SectionShell";
import { GradientText } from "@/components/ui/TextEffects";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const flagIcons: Record<string, LucideIcon> = {
  eye: Eye,
  heart: Heart,
  users: Users,
  repeat: Repeat,
  bot: Bot,
  "trending-up": TrendingUp,
};

export default function FairPlay() {
  return (
    <SectionShell id="fair-play" eyebrow={fairPlay.eyebrow} index={fairPlay.index}>
      <Reveal direction="up">
        <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[0.9] tracking-tight">
          {fairPlay.titleLead}{" "}
          <GradientText variant="violet">{fairPlay.titleAccent}</GradientText>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-fg/75">
          {fairPlay.subtitle}
        </p>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2" stagger={0.07}>
        {fairPlay.flags.map((flag) => {
          const Icon = flagIcons[flag.icon];
          return (
            <RevealItem key={flag.label} direction="up">
              <div
                data-cursor="hover"
                className="group flex items-center gap-4 rounded-2xl glass p-5 transition-all duration-300 hover:-translate-y-1 hover:border-ember/30 hover:bg-ember/[0.06]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-brand transition-colors duration-300 group-hover:bg-ember/20 group-hover:text-ember">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-semibold text-fg/85">{flag.label}</span>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>

      {/* warning */}
      <Reveal direction="scale" className="mt-8">
        <div className="relative overflow-hidden rounded-4xl bg-gradient-to-r from-ember-600 to-ember p-8 shadow-glow-ember">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
          <div className="relative z-10 flex items-start gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white">
              <AlertTriangle className="h-7 w-7" />
            </span>
            <div>
              <h3 className="font-display text-2xl font-extrabold text-white">
                {fairPlay.warning.title}
              </h3>
              <p className="mt-2 text-white/85">{fairPlay.warning.subtitle}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
