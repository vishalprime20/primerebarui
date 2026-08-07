"use client";

import { motion, useReducedMotion } from "framer-motion";

const BARS = [
  { x: "10%", y: "16%", rot: -28, h: "62%", delay: 0 },
  { x: "24%", y: "8%", rot: -18, h: "70%", delay: 0.06 },
  { x: "38%", y: "18%", rot: -32, h: "58%", delay: 0.12 },
  { x: "50%", y: "6%", rot: -22, h: "74%", delay: 0.18 },
  { x: "63%", y: "14%", rot: -30, h: "64%", delay: 0.24 },
  { x: "76%", y: "10%", rot: -16, h: "68%", delay: 0.3 },
  { x: "88%", y: "20%", rot: -26, h: "56%", delay: 0.36 },
];

type CssRebarFallbackProps = {
  className?: string;
};

/** Lightweight 3D-feeling rebar cluster when Spline URL is not configured */
export function CssRebarFallback({ className = "" }: CssRebarFallbackProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`pointer-events-none absolute inset-y-[10%] right-[-6%] z-[1] w-[78%] sm:w-[58%] lg:w-[50%] ${className}`}
      aria-hidden
      style={{ perspective: "1100px" }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={
          reduceMotion
            ? undefined
            : { rotateY: [-10, 10, -10], rotateX: [5, -3, 5] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        {BARS.map((bar, i) => (
          <motion.span
            key={i}
            className="absolute w-[0.7rem] origin-center rounded-full sm:w-3"
            style={{
              left: bar.x,
              top: bar.y,
              height: bar.h,
              rotate: `${bar.rot}deg`,
              background:
                i % 2 === 0
                  ? "linear-gradient(180deg, #e8edf2 0%, #9aa3ad 42%, #5c646c 100%)"
                  : "linear-gradient(180deg, #c5ced6 0%, #7a828a 50%, #4a525a 100%)",
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.22), 0 14px 28px rgba(0,0,0,0.45)",
            }}
            initial={reduceMotion ? false : { opacity: 0, z: -50, y: 30 }}
            animate={{ opacity: 0.95, z: i * 10, y: 0 }}
            transition={{ delay: 0.3 + bar.delay, duration: 0.8 }}
          >
            <span className="absolute inset-x-0 top-0 h-2 rounded-full bg-accent/85 shadow-[0_0_12px_rgba(232,93,4,0.55)]" />
            <span
              className="absolute inset-x-[-2px] top-[16%] h-[66%] opacity-45"
              style={{
                background:
                  "repeating-linear-gradient(180deg, transparent 0 9px, rgba(0,0,0,0.38) 9px 13px)",
              }}
            />
          </motion.span>
        ))}
        <div className="absolute bottom-[6%] left-[8%] right-[8%] h-20 rounded-[50%] bg-black/45 blur-2xl" />
      </motion.div>
    </div>
  );
}
