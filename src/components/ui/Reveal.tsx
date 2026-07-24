"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  depth?: boolean;
} & Omit<HTMLMotionProps<"div">, "children">;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  depth = true,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y,
        rotateX: depth ? 8 : 0,
        scale: depth ? 0.98 : 1,
        filter: "blur(4px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ transformPerspective: 1000, transformOrigin: "center top" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

export function Stagger({ children, className, stagger = 0.09 }: StaggerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 32, rotateX: 10, scale: 0.96 },
        show: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      style={{ transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  );
}
