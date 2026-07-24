"use client";

import { motion, useReducedMotion } from "framer-motion";

const BARS = [
  { x: "12%", y: "18%", rot: -28, delay: 0 },
  { x: "28%", y: "10%", rot: -18, delay: 0.08 },
  { x: "42%", y: "22%", rot: -32, delay: 0.16 },
  { x: "55%", y: "8%", rot: -22, delay: 0.24 },
  { x: "68%", y: "20%", rot: -30, delay: 0.32 },
  { x: "80%", y: "14%", rot: -16, delay: 0.4 },
];

type CssRebarFallbackProps = {
  className?: string;
};

export function CssRebarFallback({ className = "" }: CssRebarFallbackProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`pointer-events-none absolute inset-y-[12%] right-[-8%] w-[70%] sm:w-[55%] lg:w-[50%] ${className}`}
      aria-hidden
      style={{ perspective: "900px" }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={
          reduceMotion
            ? undefined
            : { rotateY: [-8, 8, -8], rotateX: [4, -2, 4] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        {BARS.map((bar, i) => (
          <motion.span
            key={i}
            className="absolute h-[58%] w-3 origin-center rounded-full"
            style={{
              left: bar.x,
              top: bar.y,
              rotate: `${bar.rot}deg`,
              background:
                i % 2 === 0
                  ? "linear-gradient(180deg, #d0d6dc 0%, #8a9199 45%, #5c646c 100%)"
                  : "linear-gradient(180deg, #b8c0c8 0%, #7a828a 50%, #4a525a 100%)",
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.18), 0 10px 24px rgba(0,0,0,0.4)",
            }}
            initial={reduceMotion ? false : { opacity: 0, z: -40 }}
            animate={{ opacity: 0.92, z: i * 8 }}
            transition={{ delay: 0.35 + bar.delay, duration: 0.7 }}
          >
            <span className="absolute inset-x-0 top-0 h-2 rounded-full bg-accent/80" />
            <span
              className="absolute inset-x-[-2px] top-[18%] h-[62%] opacity-40"
              style={{
                background:
                  "repeating-linear-gradient(180deg, transparent 0 10px, rgba(0,0,0,0.35) 10px 14px)",
              }}
            />
          </motion.span>
        ))}
        <div className="absolute bottom-[8%] left-[10%] right-[10%] h-16 rounded-[50%] bg-black/40 blur-2xl" />
      </motion.div>
    </div>
  );
}
