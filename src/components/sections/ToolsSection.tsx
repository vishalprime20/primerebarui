"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WeightCalculator } from "@/components/tools/WeightCalculator";
import { CoatingPicker } from "@/components/tools/CoatingPicker";
import { PourDatePlanner } from "@/components/tools/PourDatePlanner";

const TABS = [
  { id: "weight", label: "Weight & tonnage" },
  { id: "coating", label: "Coating picker" },
  { id: "pour", label: "Pour-date planner" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ToolsSection() {
  const [active, setActive] = useState<TabId>("weight");
  const reduceMotion = useReducedMotion();

  return (
    <section id="tools" className="relative z-10 scroll-mt-20 section-pad">
      <div className="container-site">
        <SectionHeading
          eyebrow="Contractor tools"
          title="Free tools that start a quote"
          description="Figure weight, coating, or drawing dates — then send the numbers straight into the quote form."
        />

        <div className="mt-10">
          <div
            role="tablist"
            aria-label="Contractor tools"
            className="flex flex-wrap gap-2 border-b border-black/10 pb-4"
          >
            {TABS.map((tab) => {
              const selected = tab.id === active;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  id={`tool-tab-${tab.id}`}
                  aria-controls={`tool-panel-${tab.id}`}
                  className={`focus-ring rounded-[var(--radius-sm)] px-4 py-2.5 font-display text-sm tracking-[0.1em] transition-colors ${
                    selected
                      ? "bg-accent text-white"
                      : "border border-black/10 bg-black/5 text-steel-light hover:text-ink-text"
                  }`}
                  onClick={() => setActive(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              role="tabpanel"
              id={`tool-panel-${active}`}
              aria-labelledby={`tool-tab-${active}`}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="mt-8 rounded-[var(--radius-md)] border border-black/10 bg-graphite/70 p-5 sm:p-8"
            >
              {active === "weight" ? <WeightCalculator /> : null}
              {active === "coating" ? <CoatingPicker /> : null}
              {active === "pour" ? <PourDatePlanner /> : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
