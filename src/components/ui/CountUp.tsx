"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type CountUpProps = {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
  /** Thousands separators. Off for years so 2015 does not become 2,015. */
  grouped?: boolean;
};

export function CountUp({
  end,
  suffix = "",
  duration = 1.6,
  className,
  grouped = true,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration, reduceMotion]);

  const display = reduceMotion || !inView ? (inView ? end : 0) : value;

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("en-US", { useGrouping: grouped })}
      {suffix}
    </span>
  );
}
