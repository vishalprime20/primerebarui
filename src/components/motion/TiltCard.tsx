"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";
import { useRef } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
};

export function TiltCard({
  children,
  className = "",
  as = "div",
}: TiltCardProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 18 });
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.16), transparent 45%)`;

  const onMove = (e: MouseEvent) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - py) * 12);
    rotateY.set((px - 0.5) * 14);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  const Comp = as === "article" ? motion.article : motion.div;

  return (
    <Comp
      ref={ref}
      className={`relative transform-gpu ${className}`}
      style={{
        transformPerspective: 900,
        rotateX: reduceMotion ? 0 : springX,
        rotateY: reduceMotion ? 0 : springY,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      {children}
      {!reduceMotion ? (
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare }}
          aria-hidden
        />
      ) : null}
    </Comp>
  );
}
