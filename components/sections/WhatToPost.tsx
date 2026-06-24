"use client";

import {
  BookOpen,
  Code2,
  Lightbulb,
  TrendingUp,
  Bot,
  Smile,
  Sparkles,
} from "lucide-react";
import { whatToPost } from "@/lib/content";
import SectionShell from "@/components/ui/SectionShell";
import { GradientText } from "@/components/ui/TextEffects";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const catIcons = [BookOpen, Code2, Lightbulb, TrendingUp, Bot, Smile];

export default function WhatToPost() {
  return (
    <SectionShell
      id="what-to-post"
      eyebrow={whatToPost.eyebrow}
      index={whatToPost.index}
    >
      <Reveal direction="up">
        <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[0.9] tracking-tight">
          {whatToPost.titleLead}{" "}
          <span className="relative">
            <GradientText variant="violet">
              &ldquo;{whatToPost.titleQuoted}&rdquo;
            </GradientText>
          </span>{" "}
          {whatToPost.titleTail}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-fg/75">
          {whatToPost.subtitle}
        </p>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2" stagger={0.09}>
        {whatToPost.categories.map((cat, i) => {
          const Icon = catIcons[i];
          const ember = cat.tone === "ember";
          return (
            <RevealItem key={cat.title} direction={i % 2 ? "right" : "left"}>
              <SpotlightCard
                glow={ember ? "ember" : "violet"}
                className="group h-full"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6",
                      ember
                        ? "bg-ember/20 text-ember ring-ember/30"
                        : "bg-violet-500/20 text-brand ring-violet-400/30"
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-2xl font-bold text-fg">{cat.title}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cat.tags.map((tag) => (
                    <span
                      key={tag}
                      data-cursor="hover"
                      className={cn(
                        "rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5",
                        ember
                          ? "bg-ember/10 text-brandember hover:bg-ember/20"
                          : "bg-surface/[0.06] text-fg/70 hover:bg-violet-500/20 hover:text-brand"
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <Reveal direction="up" className="mt-6">
        <div className="glow-border relative flex items-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-violet-700 p-6 shadow-glow">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
            <Sparkles className="h-5 w-5" />
          </span>
          <p className="text-lg font-semibold text-white">
            {whatToPost.footnote}
          </p>
        </div>
      </Reveal>
    </SectionShell>
  );
}
