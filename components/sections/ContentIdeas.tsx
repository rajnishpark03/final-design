"use client";

import { Zap, Film } from "lucide-react";
import { contentIdeas } from "@/lib/content";
import SectionShell from "@/components/ui/SectionShell";
import { GradientText } from "@/components/ui/TextEffects";
import Marquee from "@/components/ui/Marquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function ContentIdeas() {
  return (
    <SectionShell
      id="content-ideas"
      eyebrow={contentIdeas.eyebrow}
      index={contentIdeas.index}
    >
      <Reveal direction="up">
        <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[0.9] tracking-tight">
          {contentIdeas.titleLead}{" "}
          <GradientText variant="violet">
            {contentIdeas.titleAccent}
          </GradientText>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-fg/75">
          {contentIdeas.subtitle}
        </p>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-4 md:grid-cols-2" stagger={0.06}>
        {contentIdeas.hooks.map((hook) => {
          const ember = hook.tone === "ember";
          return (
            <RevealItem key={hook.n} direction="up">
              <div
                data-cursor="hover"
                className="group flex items-center gap-4 overflow-hidden rounded-2xl glass p-4 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-surface/[0.07]"
              >
                <span
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold transition-transform duration-300 group-hover:scale-110",
                    ember
                      ? "bg-ember/20 text-ember ring-1 ring-ember/30"
                      : "bg-violet-500/20 text-brand ring-1 ring-violet-400/30"
                  )}
                >
                  {hook.n}
                </span>
                <p className="font-semibold text-fg/90 transition-colors group-hover:text-fg">
                  {hook.text}
                </p>
                <Film className="ml-auto h-4 w-4 shrink-0 text-fg/0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-fg/40" />
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <Reveal direction="up" className="mt-8 flex items-center justify-center gap-2 text-center">
        <Zap className="h-5 w-5 text-ember" />
        <p className="text-base font-medium text-brandember">
          {contentIdeas.footnote}
        </p>
      </Reveal>

      {/* Flowing hook marquee for texture */}
      <Reveal direction="up" className="mt-12 -mx-5 sm:-mx-8">
        <Marquee
          items={contentIdeas.hooks.map((h) => h.text)}
          speed={42}
        />
      </Reveal>
    </SectionShell>
  );
}
