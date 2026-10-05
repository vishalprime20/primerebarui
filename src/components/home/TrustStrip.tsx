"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

const items = [
  { label: "Established", value: String(SITE.yearEstablished) },
  { label: "Projects Completed", value: "1400+" },
  { label: "Coverage", value: "Tri-state delivery" },
];

export function TrustStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative z-10 border-y border-black/8 bg-graphite/90 backdrop-blur-sm">
      <div className="container-site">
        <Stagger className="grid divide-y divide-black/8 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {items.map((item, index) => (
            <StaggerItem key={item.label}>
              <motion.div
                className="group relative flex flex-col items-start gap-1 overflow-hidden px-0 py-8 sm:items-center sm:px-6 sm:text-center"
                whileHover={reduceMotion ? undefined : { y: -2 }}
              >
                <motion.span
                  className="absolute inset-x-0 top-0 h-px origin-left bg-accent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * index, duration: 0.7 }}
                />
                <span className="font-display text-3xl tracking-[0.08em] text-ink-text transition-colors group-hover:text-accent sm:text-4xl">
                  {item.value}
                </span>
                <span className="text-sm uppercase tracking-[0.16em] text-muted">
                  {item.label}
                </span>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
