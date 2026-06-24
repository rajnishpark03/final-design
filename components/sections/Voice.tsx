"use client";

import { Check, Quote } from "lucide-react";
import { voice } from "@/lib/content";
import SectionShell from "@/components/ui/SectionShell";
import { GradientText } from "@/components/ui/TextEffects";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function Voice() {
  return (
    <SectionShell id="voice" eyebrow={voice.eyebrow} index={voice.index}>
      <Reveal direction="up">
        <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[0.9] tracking-tight">
          {voice.titleLead}{" "}
          <GradientText variant="violet">{voice.titleAccent}</GradientText>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-fg/75">{voice.subtitle}</p>
      </Reveal>

      <RevealGroup
        className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.05}
      >
        {voice.topics.map((topic) => {
          const ember = topic === voice.emberTopic;
          return (
            <RevealItem key={topic} direction="scale">
              <div
                data-cursor="hover"
                className={cn(
                  "group flex items-center gap-3 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1",
                  ember
                    ? "bg-ember/15 ring-1 ring-ember/30 hover:bg-ember/25"
                    : "glass hover:border-violet-400/40 hover:bg-surface/[0.07]"
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-110",
                    ember
                      ? "bg-ember/30 text-ember"
                      : "bg-violet-500/20 text-brand ring-1 ring-violet-400/30"
                  )}
                >
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span
                  className={cn(
                    "font-medium",
                    ember ? "text-brandember" : "text-fg/85"
                  )}
                >
                  {topic}
                </span>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>

      {/* Quote card */}
      <Reveal direction="scale" className="mt-12">
        <div className="glow-border relative overflow-hidden rounded-4xl bg-gradient-to-br from-violet-600 via-violet-700 to-violet-900 p-10 text-center shadow-glow md:p-16">
          <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-violet-400/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-10 h-56 w-56 rounded-full bg-ember/20 blur-3xl" />
          <Quote className="mx-auto mb-6 h-10 w-10 text-ember" />
          <p className="relative z-10 mx-auto max-w-3xl font-display text-[clamp(1.8rem,4.5vw,3.4rem)] font-extrabold leading-[1.05] tracking-tight text-white">
            {voice.quote.lead}{" "}
            <span className="text-gradient-ember">{voice.quote.accent}</span>{" "}
            {voice.quote.tail}
          </p>
        </div>
      </Reveal>
    </SectionShell>
  );
}
