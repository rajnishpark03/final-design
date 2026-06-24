"use client";

import { Check, X } from "lucide-react";
import { groundRules } from "@/lib/content";
import SectionShell from "@/components/ui/SectionShell";
import { GradientText } from "@/components/ui/TextEffects";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

function Panel({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant: "do" | "dont";
}) {
  const isDo = variant === "do";
  return (
    <div
      className={cn(
        "group relative h-full overflow-hidden rounded-4xl p-7 transition-transform duration-500 hover:-translate-y-1.5",
        isDo
          ? "bg-gradient-to-br from-verde/15 to-verde/[0.03] ring-1 ring-verde/25"
          : "bg-gradient-to-br from-scarlet/15 to-scarlet/[0.03] ring-1 ring-scarlet/25"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70",
          isDo ? "bg-verde/30" : "bg-scarlet/30"
        )}
      />
      <div className="relative z-10 mb-6 flex items-center gap-3">
        <span
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg",
            isDo ? "bg-verde" : "bg-scarlet"
          )}
        >
          {isDo ? <Check className="h-6 w-6" /> : <X className="h-6 w-6" />}
        </span>
        <h3 className="font-display text-3xl font-extrabold text-fg">
          {title}
        </h3>
      </div>

      <RevealGroup className="relative z-10 space-y-2.5" stagger={0.07}>
        {items.map((item) => (
          <RevealItem key={item} direction={isDo ? "left" : "right"}>
            <div
              data-cursor="hover"
              className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-surface/[0.05]"
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                  isDo
                    ? "bg-verde/20 text-verde"
                    : "bg-scarlet/20 text-scarlet"
                )}
              >
                {isDo ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <X className="h-3.5 w-3.5" />
                )}
              </span>
              <span className="font-medium text-fg/85">{item}</span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

export default function GroundRules() {
  return (
    <SectionShell
      id="ground-rules"
      eyebrow={groundRules.eyebrow}
      index={groundRules.index}
    >
      <Reveal direction="up">
        <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[0.9] tracking-tight">
          {groundRules.titleLead}{" "}
          <GradientText variant="violet">{groundRules.titleAccent}</GradientText>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-fg/75">
          {groundRules.subtitle}
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <Reveal direction="left">
          <Panel
            title={groundRules.do.title}
            items={groundRules.do.items}
            variant="do"
          />
        </Reveal>
        <Reveal direction="right">
          <Panel
            title={groundRules.dont.title}
            items={groundRules.dont.items}
            variant="dont"
          />
        </Reveal>
      </div>

      <Reveal direction="up" className="mt-10 text-center">
        <p className="text-lg text-fg/55">
          {groundRules.footnote.lead}{" "}
          <span className="font-bold text-fg">
            {groundRules.footnote.accent}
          </span>
        </p>
      </Reveal>
    </SectionShell>
  );
}
