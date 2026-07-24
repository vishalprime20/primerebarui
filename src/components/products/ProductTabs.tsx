"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PRODUCT_CATEGORIES } from "@/lib/data";
import { TiltCard } from "@/components/motion/TiltCard";

type CategoryId = (typeof PRODUCT_CATEGORIES)[number]["id"];

export function ProductTabs() {
  const [active, setActive] = useState<CategoryId>(PRODUCT_CATEGORIES[0].id);
  const reduceMotion = useReducedMotion();
  const current =
    PRODUCT_CATEGORIES.find((c) => c.id === active) ?? PRODUCT_CATEGORIES[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Product categories"
        className="flex flex-wrap gap-2 border-b border-white/10 pb-4"
      >
        {PRODUCT_CATEGORIES.map((category) => {
          const selected = category.id === active;
          return (
            <button
              key={category.id}
              role="tab"
              type="button"
              aria-selected={selected}
              id={`tab-${category.id}`}
              aria-controls={`panel-${category.id}`}
              className={`focus-ring rounded-[var(--radius-sm)] px-4 py-2.5 font-display text-sm tracking-[0.1em] transition-colors ${
                selected
                  ? "bg-accent text-white"
                  : "border border-white/10 bg-white/5 text-steel-light hover:text-white"
              }`}
              onClick={() => setActive(category.id)}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          initial={reduceMotion ? false : { opacity: 0, y: 18, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="pt-8"
          style={{ transformPerspective: 900 }}
        >
          <h2 className="font-display text-3xl tracking-[0.08em] text-white">
            {current.label}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {current.items.map((item) => (
              <li key={item}>
                <TiltCard className="steel-sheen group rounded-[var(--radius-md)] border border-white/10 bg-graphite/80 px-5 py-4">
                  <span className="mr-3 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle shadow-[0_0_10px_rgba(232,93,4,0.5)]" />
                  <span className="text-steel-light transition-colors group-hover:text-white">
                    {item}
                  </span>
                </TiltCard>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
