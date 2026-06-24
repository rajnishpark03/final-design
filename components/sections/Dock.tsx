"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import {
  Home,
  Gift,
  ListChecks,
  Lightbulb,
  BarChart3,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { scrollToId } from "@/components/providers/SmoothScroll";

const items: { id: string; label: string; Icon: LucideIcon }[] = [
  { id: "hero", label: "Top", Icon: Home },
  { id: "prizes", label: "Prizes", Icon: Gift },
  { id: "how-it-works", label: "Flow", Icon: ListChecks },
  { id: "content-ideas", label: "Hooks", Icon: Lightbulb },
  { id: "scoring", label: "Scoring", Icon: BarChart3 },
  { id: "fair-play", label: "Fair Play", Icon: ShieldCheck },
  { id: "faq", label: "FAQ", Icon: HelpCircle },
];

function DockIcon({
  mouseX,
  item,
}: {
  mouseX: MotionValue<number>;
  item: (typeof items)[number];
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hover, setHover] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: 0,
    };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeSync = useTransform(distance, [-110, 0, 110], [40, 64, 40]);
  const size = useSpring(sizeSync, { stiffness: 280, damping: 18, mass: 0.4 });

  const { Icon } = item;
  return (
    <motion.button
      ref={ref}
      style={{ width: size, height: size }}
      onClick={() => scrollToId(item.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-cursor="hover"
      className="relative flex items-center justify-center rounded-2xl bg-surface/[0.07] text-fg/70 transition-colors hover:bg-violet-500/25 hover:text-fg"
    >
      <Icon className="h-1/2 w-1/2" />
      <AnimatePresence>
        {hover && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.8 }}
            className="absolute -top-9 whitespace-nowrap rounded-lg bg-fg px-2.5 py-1 text-[11px] font-semibold text-canvas"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4"
        >
          <motion.div
            onMouseMove={(e) => mouseX.set(e.clientX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="flex items-end gap-2 rounded-3xl glass-strong px-3 py-3 shadow-float"
          >
            {items.map((item) => (
              <DockIcon key={item.id} mouseX={mouseX} item={item} />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
