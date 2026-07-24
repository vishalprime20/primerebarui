"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  PROJECT_FILTERS,
  PROJECTS,
  type ProjectFilter,
} from "@/lib/data";
import { TiltCard } from "@/components/motion/TiltCard";

export function ProjectGrid() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.filters.includes(filter));
  }, [filter]);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects"
      >
        {PROJECT_FILTERS.map((item) => {
          const active = item.id === filter;
          return (
            <motion.button
              key={item.id}
              type="button"
              className={`focus-ring rounded-[var(--radius-sm)] px-4 py-2 font-display text-sm tracking-[0.12em] transition-colors ${
                active
                  ? "bg-accent text-white shadow-[0_8px_24px_rgba(232,93,4,0.35)]"
                  : "border border-white/10 text-steel-light hover:text-white"
              }`}
              aria-pressed={active}
              onClick={() => setFilter(item.id)}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            >
              {item.label}
            </motion.button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-muted" aria-live="polite">
        Showing {filtered.length} project{filtered.length === 1 ? "" : "s"}
      </p>

      <motion.ul
        layout
        className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.li
              key={project.id}
              layout
              initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.32, delay: Math.min(index * 0.02, 0.2) }}
            >
              <TiltCard
                as="article"
                className="group h-full overflow-hidden rounded-[var(--radius-md)] border border-white/10 bg-graphite/80 p-5"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(232,93,4,0.12), transparent 55%)",
                  }}
                  aria-hidden
                />
                <div className="relative flex items-start justify-between gap-3">
                  <span className="font-display text-xs tracking-[0.2em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs uppercase tracking-[0.14em] text-steel">
                    {project.filters
                      .filter((f) => f !== "residential")
                      .slice(0, 2)
                      .join(" · ")
                      .toUpperCase() || "PROJECT"}
                  </span>
                </div>
                <h3 className="relative mt-3 font-display text-xl leading-snug tracking-[0.05em] text-white">
                  {project.name}
                </h3>
                <p className="relative mt-2 text-sm text-muted">
                  {project.location}
                </p>
                <span className="relative mt-5 inline-block h-px w-8 bg-steel/50 transition-all duration-500 group-hover:w-16 group-hover:bg-accent" />
              </TiltCard>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
