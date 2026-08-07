"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { SITE } from "@/lib/constants";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const contentY = useTransform(scrollYProgress, [0, 0.15], [0, -48]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0.35]);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: reduceMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 40, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const brand = {
    hidden: reduceMotion
      ? { opacity: 1, scale: 1, rotateX: 0 }
      : { opacity: 0, scale: 0.92, rotateX: 18 },
    show: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden scroll-mt-20"
    >
      <HeroVisual />

      <motion.div
        className="relative z-10 flex min-h-[100svh] items-end pb-16 pt-28 sm:items-center sm:pb-0 sm:pt-20"
        style={
          reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }
        }
      >
        <div className="container-site w-full">
          <motion.div
            className="max-w-xl lg:max-w-2xl"
            variants={container}
            initial="hidden"
            animate="show"
            style={{ transformPerspective: 1200 }}
          >
            <motion.div
              variants={item}
              className="mb-5 inline-flex items-center gap-3"
            >
              <span className="h-px w-8 bg-accent" />
              <p className="font-display text-sm tracking-[0.28em] text-accent drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] sm:text-base">
                New York & New Jersey
              </p>
            </motion.div>

            <motion.h1
              variants={brand}
              className="drop-shadow-[0_4px_28px_rgba(0,0,0,0.85)]"
            >
              <span className="sr-only">{SITE.name}</span>
              <BrandLogo size="hero" priority className="pointer-events-none" />
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 max-w-md font-display text-lg tracking-[0.08em] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)] sm:text-xl"
            >
              {SITE.tagline}
            </motion.p>

            <motion.p
              variants={item}
              className="mt-4 max-w-md text-base text-steel-light drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] sm:text-lg"
            >
              Full-service rebar fabrication from Bridgewater, NJ — built for
              speed, precision, and competitive pricing across the tri-state.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href="#contact" magnetic>
                Request a Quote
              </Button>
              <Button href="#projects" variant="secondary" magnetic>
                View Projects
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-display text-[10px] tracking-[0.28em] text-steel">
            SCROLL
          </span>
          <motion.div
            className="h-10 w-px bg-gradient-to-b from-accent to-transparent"
            animate={
              reduceMotion
                ? undefined
                : { scaleY: [0.55, 1, 0.55], opacity: [0.35, 1, 0.35] }
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </div>
      </div>
    </section>
  );
}
