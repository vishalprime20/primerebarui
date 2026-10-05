"use client";

import { motion, useReducedMotion } from "framer-motion";

export function SectionDivider() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative h-px w-full overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-black/8" />
      <motion.div
        className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent to-transparent"
        initial={reduceMotion ? false : { x: "-100%" }}
        whileInView={{ x: "320%" }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
