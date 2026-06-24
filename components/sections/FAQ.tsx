"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessagesSquare } from "lucide-react";
import { faq } from "@/lib/content";
import SectionShell from "@/components/ui/SectionShell";
import { GradientText } from "@/components/ui/TextEffects";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionShell id="faq" eyebrow={faq.eyebrow} index={faq.index}>
      <Reveal direction="up">
        <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[0.9] tracking-tight">
          {faq.titleLead}{" "}
          <GradientText variant="violet">{faq.titleAccent}</GradientText>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-fg/75">{faq.subtitle}</p>
      </Reveal>

      <div className="mt-12 space-y-3">
        {faq.items.map((item, i) => {
          const isOpen = open === i;
          const yes = item.a === "YES";
          return (
            <Reveal key={item.q} direction="up" delay={i * 0.04}>
              <div
                className={cn(
                  "overflow-hidden rounded-3xl transition-colors duration-300",
                  isOpen ? "glass-strong" : "glass"
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-cursor="hover"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-lg font-bold text-fg sm:text-xl">
                    {item.q}
                  </span>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "rounded-full px-4 py-1.5 text-sm font-bold text-white shadow-lg",
                        yes ? "bg-verde" : "bg-scarlet"
                      )}
                    >
                      {item.a}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-surface/10 text-fg"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="flex items-center gap-4 px-6 pb-6">
                        <div
                          className={cn(
                            "h-px flex-1",
                            yes ? "bg-verde/30" : "bg-scarlet/30"
                          )}
                        />
                        <span
                          className={cn(
                            "font-display text-5xl font-extrabold tracking-tight",
                            yes ? "text-verde" : "text-scarlet"
                          )}
                        >
                          {item.a}
                        </span>
                        <div
                          className={cn(
                            "h-px flex-1",
                            yes ? "bg-verde/30" : "bg-scarlet/30"
                          )}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal direction="up" className="mt-8">
        <div className="flex items-center justify-center gap-3 rounded-3xl border border-dashed border-violet-400/30 bg-violet-500/[0.06] px-6 py-5 text-center">
          <MessagesSquare className="h-5 w-5 shrink-0 text-brand" />
          <p className="font-medium text-brand">{faq.footnote}</p>
        </div>
      </Reveal>
    </SectionShell>
  );
}
