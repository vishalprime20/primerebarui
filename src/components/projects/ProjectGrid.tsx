"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { CountUp } from "@/components/ui/CountUp";
import { TiltCard } from "@/components/motion/TiltCard";
import { ProjectDrawer } from "@/components/projects/ProjectDrawer";
import { ProjectMap } from "@/components/projects/ProjectMap";
import {
  BOROUGH_COUNT,
  ENRICHED_PROJECTS,
  boroughTiles,
  filterProjects,
  parseProjectHash,
  sectionIdFromHash,
  writeProjectHash,
  type BoroughId,
  type EnrichedProject,
  type ProjectKind,
  type ProjectView,
} from "@/lib/projects";

const LIST_PAGE = 8;
const KIND_FILTERS: { id: ProjectKind | "all"; label: string }[] = [
  { id: "all", label: "All types" },
  { id: "airport", label: "Airport" },
  { id: "bridge", label: "Bridge" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
];

type SortKey = "name" | "city" | "type" | "year";

export function ProjectGrid() {
  const reduceMotion = useReducedMotion();
  const tiles = useMemo(() => boroughTiles(), []);
  const [query, setQuery] = useState("");
  const [type, setType] = useState<ProjectKind | "all">("all");
  const [borough, setBorough] = useState<BoroughId | undefined>();
  const [view, setView] = useState<ProjectView>("grid");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<EnrichedProject | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const apply = () => {
      const state = parseProjectHash(window.location.hash);
      if (state.q) setQuery(state.q);
      if (state.type) setType(state.type);
      if (state.borough) setBorough(state.borough);
      if (state.view) setView(state.view);
    };
    apply();
    setReady(true);
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const section = sectionIdFromHash(window.location.hash);
    const idle =
      type === "all" && !borough && !query.trim() && view === "grid";
    if (section !== "projects" && idle) return;
    writeProjectHash({
      q: query,
      type,
      borough,
      view,
    });
  }, [ready, query, type, borough, view]);

  const filtered = useMemo(
    () => filterProjects(ENRICHED_PROJECTS, { q: query, type, borough }),
    [query, type, borough],
  );

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  const sortedRest = useMemo(() => {
    const copy = [...rest];
    copy.sort((a, b) => {
      const av =
        sortKey === "name"
          ? a.name
          : sortKey === "city"
            ? a.location
            : sortKey === "type"
              ? a.kind.label
              : String(a.year ?? "");
      const bv =
        sortKey === "name"
          ? b.name
          : sortKey === "city"
            ? b.location
            : sortKey === "type"
              ? b.kind.label
              : String(b.year ?? "");
      const cmp = av.localeCompare(bv);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [rest, sortKey, sortDir]);

  const visibleRows = expanded ? sortedRest : sortedRest.slice(0, LIST_PAGE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Listed jobs" value={ENRICHED_PROJECTS.length} />
        <Stat
          label="Jobs delivered"
          value={SITE.projectsCompleted}
          suffix="+"
        />
        <Stat label="Boroughs & counties" value={BOROUGH_COUNT} />
      </div>

      <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <label className="block min-w-0 flex-1 text-sm text-steel-light">
          Search projects
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name, city, or type"
            className="focus-ring mt-1.5 w-full rounded-[var(--radius-sm)] border border-black/10 bg-graphite px-3.5 py-2.5 text-ink-text outline-none focus:border-accent"
          />
        </label>
        <p className="text-sm text-muted" aria-live="polite">
          Showing {filtered.length} project{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      <div
        className="mt-6 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by type"
      >
        {KIND_FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={type === item.id}
            onClick={() => setType(item.id)}
            className={`focus-ring rounded-[var(--radius-sm)] px-4 py-2 font-display text-sm tracking-[0.12em] ${
              type === item.id
                ? "bg-accent text-white"
                : "border border-black/10 text-steel-light hover:text-ink-text"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
        role="group"
        aria-label="Filter by borough or county"
      >
        {tiles.map((tile) => {
          const active = borough === tile.id;
          return (
            <button
              key={tile.id}
              type="button"
              aria-pressed={active}
              onClick={() => setBorough(active ? undefined : tile.id)}
              className={`focus-ring rounded-[var(--radius-md)] border px-4 py-3 text-left ${
                active
                  ? "border-accent bg-accent/10 text-ink-text"
                  : "border-black/10 bg-graphite text-ink-text hover:border-accent/40"
              }`}
            >
              <span className="font-display tracking-[0.1em]">{tile.label}</span>
              <span className="mt-1 block text-sm text-muted">
                {tile.count} job{tile.count === 1 ? "" : "s"}
              </span>
            </button>
          );
        })}
      </div>

      {view !== "map" && featured.length ? (
        <ul className="mt-10 grid gap-4 lg:grid-cols-2">
          {featured.map((project) => (
            <li key={project.id}>
              <FeaturedCard
                project={project}
                onOpen={() => setOpen(project)}
              />
            </li>
          ))}
        </ul>
      ) : null}

      <div
        className="mt-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Project view"
      >
        {(["grid", "list", "map"] as const).map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={view === id}
            onClick={() => setView(id)}
            className={`focus-ring rounded-[var(--radius-sm)] px-4 py-2 font-display text-sm tracking-[0.12em] ${
              view === id
                ? "bg-accent text-white"
                : "border border-black/10 text-steel-light hover:text-ink-text"
            }`}
          >
            {id === "grid" ? "Grid" : id === "list" ? "List" : "Map"}
          </button>
        ))}
      </div>

      {view === "map" ? (
        <div className="mt-6">
          <ProjectMap projects={filtered} onSelect={setOpen} />
        </div>
      ) : null}

      {view === "grid" ? (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {sortedRest.map((project, index) => (
              <motion.li
                key={project.id}
                layout
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(project)}
                  className="h-full w-full text-left"
                >
                  <TiltCard
                    as="article"
                    className="h-full rounded-[var(--radius-md)] border border-black/10 bg-graphite/80 p-5"
                  >
                    <p className="font-display text-xs tracking-[0.16em] text-accent">
                      {String(index + 1).padStart(2, "0")} · {project.kind.label}
                    </p>
                    <h3 className="mt-2 font-display text-xl tracking-[0.05em] text-ink-text">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{project.location}</p>
                  </TiltCard>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : null}

      {view === "list" ? (
        <div className="mt-6 overflow-x-auto rounded-[var(--radius-md)] border border-black/10 bg-graphite">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="font-display text-xs tracking-[0.14em] text-steel">
                <SortHead
                  label="Project"
                  active={sortKey === "name"}
                  dir={sortDir}
                  onClick={() => toggleSort("name")}
                />
                <SortHead
                  label="City"
                  active={sortKey === "city"}
                  dir={sortDir}
                  onClick={() => toggleSort("city")}
                />
                <SortHead
                  label="Type"
                  active={sortKey === "type"}
                  dir={sortDir}
                  onClick={() => toggleSort("type")}
                />
                <SortHead
                  label="Year"
                  active={sortKey === "year"}
                  dir={sortDir}
                  onClick={() => toggleSort("year")}
                />
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((project) => (
                <tr
                  key={project.id}
                  className="cursor-pointer border-t border-black/8 hover:bg-black/5"
                  onClick={() => setOpen(project)}
                >
                  <td className="px-3 py-3 font-medium text-ink-text">
                    {project.name}
                  </td>
                  <td className="px-3 py-3 text-muted">{project.location}</td>
                  <td className="px-3 py-3 text-muted">{project.kind.label}</td>
                  <td className="px-3 py-3 text-muted">
                    {project.year ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {view === "list" && sortedRest.length > LIST_PAGE ? (
        <button
          type="button"
          className="focus-ring mt-5 font-display text-sm tracking-[0.12em] text-accent hover:text-accent-hover"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded
            ? "Show less"
            : `Show more (${sortedRest.length - LIST_PAGE} more)`}
        </button>
      ) : null}

      <ProjectDrawer project={open} onClose={() => setOpen(null)} />
    </div>
  );
}

function Stat({
  label,
  value,
  suffix = "",
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="rounded-[var(--radius-md)] border border-black/10 bg-graphite px-5 py-5">
      <p className="font-display text-3xl tracking-[0.06em] text-ink-text">
        <CountUp end={value} suffix={suffix} grouped={false} />
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">
        {label}
      </p>
    </div>
  );
}

function FeaturedCard({
  project,
  onOpen,
}: {
  project: EnrichedProject;
  onOpen: () => void;
}) {
  return (
    <button type="button" onClick={onOpen} className="w-full text-left">
      <article className="overflow-hidden rounded-[var(--radius-lg)] border border-black/10 bg-graphite shadow-[var(--shadow-soft)]">
        <div className="relative aspect-[16/9] bg-ink">
          {project.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.photo}
              alt={project.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 metal-grid opacity-60" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <p className="absolute bottom-4 left-4 font-display text-xs tracking-[0.18em] text-white">
            {project.kind.label} · {project.borough.label}
          </p>
        </div>
        <div className="p-5 sm:p-6">
          <h3 className="font-display text-2xl tracking-[0.06em] text-ink-text">
            {project.name}
          </h3>
          <p className="mt-2 text-sm text-muted">{project.location}</p>
          {project.scope ? (
            <p className="mt-3 text-ink-text">{project.scope}</p>
          ) : null}
          {project.year ||
          project.tons != null ||
          project.barSizes ||
          project.coatings ? (
            <dl className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.12em] text-steel">
              {project.year ? <span>Year {project.year}</span> : null}
              {project.tons != null ? <span>{project.tons} tons</span> : null}
              {project.barSizes ? <span>{project.barSizes}</span> : null}
              {project.coatings ? <span>{project.coatings}</span> : null}
            </dl>
          ) : null}
        </div>
      </article>
    </button>
  );
}

function SortHead({
  label,
  active,
  dir,
  onClick,
}: {
  label: string;
  active: boolean;
  dir: "asc" | "desc";
  onClick: () => void;
}) {
  return (
    <th className="px-3 py-3 font-normal">
      <button
        type="button"
        onClick={onClick}
        className={`focus-ring ${active ? "text-ink-text" : ""}`}
      >
        {label}
        {active ? (dir === "asc" ? " ↑" : " ↓") : ""}
      </button>
    </th>
  );
}
