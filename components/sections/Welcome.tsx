"use client";

import { motion } from "framer-motion";
import { Check, Calendar, Instagram, Target, Trophy } from "lucide-react";
import { welcome } from "@/lib/content";
import SectionShell from "@/components/ui/SectionShell";
import SplitText from "@/components/ui/SplitText";
import { GradientText } from "@/components/ui/TextEffects";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const rowIcons = [Calendar, Instagram, Target, Trophy];

export default function Welcome() {
  return (
    <SectionShell
      id="welcome"
      eyebrow={welcome.eyebrow}
      index={welcome.index}
    >
      <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left — narrative */}
        <div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.92] tracking-tight">
            {welcome.titleLead}{" "}
            <GradientText variant="violet">{welcome.titleAccent}</GradientText>{" "}
            <span className="inline-block">{welcome.titleEmoji}</span>
          </h2>

          <div className="mt-8 text-[clamp(1.4rem,3vw,2rem)] font-bold leading-tight text-fg">
            {welcome.lead.map((line, i) => (
              <SplitText
                key={i}
                text={line}
                mode="words"
                className="block"
                delay={i * 0.05}
              />
            ))}
            <GradientText variant="ember" className="text-[clamp(1.4rem,3vw,2rem)]">
              {welcome.leadAccent}
            </GradientText>
          </div>

          <Reveal direction="blur" className="mt-6 max-w-xl text-base leading-relaxed text-fg/75">
            {welcome.body}
          </Reveal>

          <RevealGroup className="mt-8 space-y-3" stagger={0.1}>
            {welcome.checklist.map((item) => (
              <RevealItem key={item} direction="left">
                <div
                  data-cursor="hover"
                  className="group flex items-center gap-3 rounded-2xl glass px-4 py-3 transition-all hover:border-violet-400/40 hover:bg-surface/[0.07]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/20 ring-1 ring-violet-400/40 transition-transform group-hover:scale-110">
                    <Check className="h-3.5 w-3.5 text-brand" />
                  </span>
                  <span className="font-medium text-fg/85">{item}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Right — snapshot card */}
        <Reveal direction="scale" className="lg:sticky lg:top-28">
          <div className="glow-border relative overflow-hidden rounded-4xl bg-gradient-to-br from-violet-600/40 to-violet-800/30 p-7 shadow-glow backdrop-blur-xl">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-400/30 blur-3xl" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand/80">
              {welcome.snapshot.title}
            </p>

            <div className="mt-6 space-y-4">
              {welcome.snapshot.rows.map((row, i) => {
                const Icon = rowIcons[i];
                return (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
                    className={cn(
                      "flex items-center gap-4 rounded-2xl p-4",
                      row.highlight
                        ? "bg-ember/20 ring-1 ring-ember/40"
                        : "bg-surface/[0.06]"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl",
                        row.highlight
                          ? "bg-ember/30 text-ember"
                          : "bg-white/10 text-brand"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-fg/50">
                        {row.label}
                      </p>
                      <p
                        className={cn(
                          "text-lg font-bold",
                          row.highlight ? "text-ember" : "text-fg"
                        )}
                      >
                        {row.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <p className="mt-6 border-t border-line/10 pt-5 text-sm italic text-fg/75">
              {welcome.snapshot.footnote}
            </p>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
