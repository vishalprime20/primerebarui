"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RebarBuildingBackground } from "./RebarBuildingBackground";

export function HeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden bg-charcoal" aria-hidden>
      <RebarBuildingBackground />

      {/* Soft overlays so copy stays readable */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/35 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-ink/40" />

      {!reduceMotion ? (
        <motion.p
          className="pointer-events-none absolute bottom-20 right-6 hidden font-display text-[10px] tracking-[0.28em] text-steel/80 sm:block lg:right-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.35, 0.85, 0.35] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          MOVE CURSOR TO BUILD →
        </motion.p>
      ) : null}
    </div>
  );
}
