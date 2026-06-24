"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { scoring } from "@/lib/content";
import SectionShell from "@/components/ui/SectionShell";
import { GradientText } from "@/components/ui/TextEffects";
import Counter from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function Scoring() {
  return (
    <SectionShell id="scoring" eyebrow={scoring.eyebrow} index={scoring.index}>
      <Reveal direction="up">
        <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[0.9] tracking-tight">
          {scoring.titleLead}{" "}
          <GradientText variant="violet">{scoring.titleAccent}</GradientText>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-fg/75">
          {scoring.subtitle}
        </p>
      </Reveal>

      <div className="mt-14 space-y-8">
        {scoring.criteria.map((c, i) => {
          const ember = c.tone === "ember";
          return (
            <Reveal key={c.name} direction="up" delay={i * 0.06}>
              <div className="group">
                <div className="mb-3 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-fg sm:text-2xl">
                      {c.name}{" "}
                      <span className="text-sm font-normal text-fg/45">
                        {c.detail}
                      </span>
                    </h3>
                  </div>
                  <span
                    className={cn(
                      "font-display text-3xl font-extrabold tabular-nums",
                      ember ? "text-ember" : "text-gradient-violet"
                    )}
                  >
                    <Counter to={c.pct} suffix="%" />
                  </span>
                </div>
                <div className="relative h-3 overflow-hidden rounded-full bg-surface/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${c.pct}%` }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className={cn(
                      "relative h-full rounded-full",
                      ember
                        ? "bg-gradient-to-r from-ember-300 to-ember shadow-glow-ember"
                        : "bg-gradient-to-r from-violet-400 to-violet-600 shadow-glow"
                    )}
                  >
                    <span className="absolute inset-0 animate-pulse-glow rounded-full bg-white/20" />
                  </motion.div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* callout */}
      <Reveal direction="scale" className="mt-12">
        <div className="flex items-center gap-4 rounded-3xl glass-strong p-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/20 text-brand ring-1 ring-violet-400/30">
            <Info className="h-6 w-6" />
          </span>
          <p className="text-lg font-semibold text-fg sm:text-xl">
            {scoring.callout.lead}{" "}
            <GradientText variant="violet">{scoring.callout.accent}</GradientText>{" "}
            {scoring.callout.tail}
          </p>
        </div>
      </Reveal>
    </SectionShell>
  );
}
