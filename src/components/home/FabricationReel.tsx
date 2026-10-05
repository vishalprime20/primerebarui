"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { FABRICATION_FRAMES } from "@/lib/data";

export function FabricationReel() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [frame, setFrame] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.04, 1.08]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setFrame((f) => (f + 1) % FABRICATION_FRAMES.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <section
      ref={ref}
      className="relative z-10 overflow-hidden border-y border-black/8"
      aria-label="Fabrication atmosphere"
    >
      <div className="relative min-h-[58vh] md:min-h-[70vh]">
        <motion.div
          className="absolute inset-0"
          style={reduceMotion ? undefined : { y, scale }}
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={FABRICATION_FRAMES[frame].src}
              className="absolute inset-0"
              initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={FABRICATION_FRAMES[frame].src}
                alt={FABRICATION_FRAMES[frame].alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority={frame === 0}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent" />
        <div className="absolute inset-0 film-grain opacity-20" />

        <div className="container-site relative flex min-h-[58vh] items-end py-16 md:min-h-[70vh] md:py-24">
          <Reveal className="max-w-xl">
            <p className="font-display text-sm tracking-[0.28em] text-accent">
              Shop floor
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.92] tracking-[0.04em] text-white">
              Steel in motion
            </h2>
            <p className="mt-4 max-w-md text-base text-white/85 sm:text-lg">
              From bend to bundle — fabrication built for speed, precision, and
              jobsites across New York and New Jersey.
            </p>
            <div className="mt-6 flex gap-2">
              {FABRICATION_FRAMES.map((item, i) => (
                <button
                  key={item.src}
                  type="button"
                  aria-label={`Show frame ${i + 1}`}
                  className={`h-1 w-8 rounded-full transition-colors ${
                    i === frame ? "bg-accent" : "bg-white/25"
                  }`}
                  onClick={() => setFrame(i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
