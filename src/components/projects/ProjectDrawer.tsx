"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { sendQuoteNotes } from "@/lib/quoteHandoff";
import {
  quoteTypeForProject,
  type EnrichedProject,
} from "@/lib/projects";

type ProjectDrawerProps = {
  project: EnrichedProject | null;
  onClose: () => void;
};

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  const quoteLikeThis = () => {
    if (!project) return;
    const notes = [
      `Quote like: ${project.name}`,
      `Type: ${project.kind.label}`,
      `Location: ${project.location}`,
      project.scope ? `Scope: ${project.scope}` : null,
      project.barSizes ? `Bar sizes: ${project.barSizes}` : null,
      project.coatings ? `Coatings: ${project.coatings}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    sendQuoteNotes(notes, quoteTypeForProject(project));
    onClose();
  };

  const hasFacts = Boolean(
    project?.year ||
      project?.tons != null ||
      project?.barSizes ||
      project?.coatings,
  );

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[70] flex justify-end"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/45"
            aria-label="Close project details"
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-drawer-title"
            className="relative z-10 flex h-dvh w-full max-w-md flex-col overflow-y-auto border-l border-black/10 bg-graphite p-6 shadow-[var(--shadow-soft)] sm:p-8"
            initial={reduceMotion ? false : { x: 40 }}
            animate={{ x: 0 }}
            exit={reduceMotion ? undefined : { x: 48 }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
          >
            <p className="font-display text-xs tracking-[0.2em] text-accent">
              {project.kind.label} · {project.borough.label}
            </p>
            <h3
              id="project-drawer-title"
              className="mt-3 font-display text-3xl tracking-[0.06em] text-ink-text"
            >
              {project.name}
            </h3>
            <p className="mt-2 text-muted">{project.location}</p>
            {project.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.photo}
                alt={project.name}
                className="mt-4 aspect-video w-full rounded-[var(--radius-md)] object-cover"
              />
            ) : null}
            {project.scope ? (
              <p className="mt-4 text-ink-text">{project.scope}</p>
            ) : null}

            {hasFacts ? (
              <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                {project.year ? (
                  <Fact label="Year" value={String(project.year)} />
                ) : null}
                {project.tons != null ? (
                  <Fact label="Tons" value={String(project.tons)} />
                ) : null}
                {project.barSizes ? (
                  <Fact label="Bar sizes" value={project.barSizes} />
                ) : null}
                {project.coatings ? (
                  <Fact label="Coatings" value={project.coatings} />
                ) : null}
              </dl>
            ) : null}

            {project.services?.length ? (
              <div className="mt-6">
                <p className="font-display text-xs tracking-[0.16em] text-steel">
                  Services
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted">
                  {project.services.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-auto pt-8">
              <Button magnetic className="w-full" onClick={quoteLikeThis}>
                Get a quote like this
              </Button>
              <button
                type="button"
                className="focus-ring mt-3 w-full py-2 text-sm text-steel hover:text-ink-text"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-sm)] border border-black/10 bg-charcoal/70 px-3 py-2">
      <dt className="text-xs uppercase tracking-[0.14em] text-steel">{label}</dt>
      <dd className="mt-1 text-ink-text">{value}</dd>
    </div>
  );
}
