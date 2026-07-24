"use client";

import { motion, useReducedMotion } from "framer-motion";

export function FloatingOrbs() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute -left-24 top-[20%] h-72 w-72 rounded-full bg-steel/10 blur-3xl"
        animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 top-[55%] h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[40%] h-56 w-56 rounded-full bg-navy/40 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
