"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const FINISHED_SRC = `${BASE}/images/building-finished-glass.png?v=photo3`;
const REBAR_SRC = `${BASE}/images/building-rebar-detailing.png?v=photo3`;

/**
 * Dual-photo wipe (no canvas grid):
 * left  = photoreal rebar detailing of the tower
 * right = finished glass building
 */
export function BuildingRevealBackground() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const initial = reduceMotion ? 0.5 : 0.45;
  const progress = useSpring(initial, {
    stiffness: 130,
    damping: 26,
    mass: 0.38,
  });
  const [pct, setPct] = useState(initial * 100);

  useEffect(() => {
    return progress.on("change", (v) => setPct(v * 100));
  }, [progress]);

  const setFromClientX = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el || reduceMotion) return;
      const rect = el.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      progress.set(Math.min(0.98, Math.max(0.02, x)));
      setHasInteracted(true);
    },
    [progress, reduceMotion],
  );

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: PointerEvent) => setFromClientX(e.clientX);
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) setFromClientX(e.touches[0].clientX);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [reduceMotion, setFromClientX]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-charcoal"
      aria-hidden
    >
      {/* Finished glass building */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={FINISHED_SRC}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
      />

      {/* Photoreal rebar detailing of the same tower */}
      <div
        className="absolute inset-0 will-change-[clip-path]"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={REBAR_SRC}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          draggable={false}
        />
      </div>

      {/* Wipe handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-px"
        style={{ left: `${pct}%` }}
      >
        <div className="absolute inset-y-0 -left-10 w-20 bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-[2px] bg-accent shadow-[0_0_24px_rgba(232,93,4,0.95)]" />
        <motion.div
          className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-accent bg-charcoal/90 shadow-[0_0_20px_rgba(232,93,4,0.45)]"
          animate={reduceMotion ? undefined : { scale: [1, 1.07, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="absolute -left-2 h-px w-2 bg-accent/80" />
          <span className="absolute -right-2 h-px w-2 bg-accent/80" />
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute bottom-24 left-4 z-10 font-display text-[10px] tracking-[0.22em] text-accent sm:bottom-28 sm:left-8"
        style={{ opacity: pct > 8 ? 1 : 0.35 }}
      >
        REBAR DETAILING
      </div>
      <div
        className="pointer-events-none absolute bottom-24 right-4 z-10 font-display text-[10px] tracking-[0.22em] text-steel-light sm:bottom-28 sm:right-8"
        style={{ opacity: pct < 92 ? 1 : 0.35 }}
      >
        FINISHED BUILDING
      </div>

      {!reduceMotion && (
        <motion.p
          className="pointer-events-none absolute bottom-10 left-1/2 z-10 -translate-x-1/2 font-display text-[10px] tracking-[0.28em] text-steel-light/90"
          initial={{ opacity: 0.85 }}
          animate={{ opacity: hasInteracted ? 0 : [0.45, 0.9, 0.45] }}
          transition={
            hasInteracted
              ? { duration: 0.45 }
              : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          MOVE CURSOR · REVEAL REBAR
        </motion.p>
      )}
    </div>
  );
}
