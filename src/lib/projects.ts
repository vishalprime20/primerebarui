import { PROJECTS, type Project, type ProjectFilter } from "@/lib/data";
import { coordsForProject } from "@/lib/projectCoords";

export const FEATURED_PROJECT_IDS = [
  "jfk-t6",
  "jfk-substation",
  "jfk-t5",
  "5th-ave-bridge",
] as const;

export type BoroughId =
  | "brooklyn"
  | "queens"
  | "bronx"
  | "manhattan"
  | "jersey-city"
  | "hackensack";

export type ProjectKind = "airport" | "bridge" | "residential" | "commercial";

export type ProjectView = "grid" | "list" | "map";

export type BoroughInfo = { id: BoroughId; label: string };

export function boroughFromLocation(location: string): BoroughInfo {
  if (location.includes("Brooklyn")) return { id: "brooklyn", label: "Brooklyn" };
  if (location.includes("Queens")) return { id: "queens", label: "Queens" };
  if (location.includes("Bronx")) return { id: "bronx", label: "Bronx" };
  if (location.includes("Jersey City"))
    return { id: "jersey-city", label: "Jersey City" };
  if (location.includes("Hackensack"))
    return { id: "hackensack", label: "Hackensack" };
  return { id: "manhattan", label: "Manhattan" };
}

export function kindFromFilters(filters: ProjectFilter[]): {
  id: ProjectKind;
  label: string;
} {
  if (filters.includes("airport")) return { id: "airport", label: "Airport" };
  if (filters.includes("bridge")) return { id: "bridge", label: "Bridge" };
  if (filters.includes("residential"))
    return { id: "residential", label: "Residential" };
  return { id: "commercial", label: "Commercial" };
}

export function quoteTypeForProject(project: Project): string {
  const kind = kindFromFilters(project.filters).id;
  if (kind === "airport") return "Airport";
  if (kind === "bridge") return "Bridge";
  if (kind === "residential") return "Residential";
  return "Commercial";
}

export type EnrichedProject = Project & {
  borough: BoroughInfo;
  kind: { id: ProjectKind; label: string };
  coords: { lat: number; lng: number } | null;
  featured: boolean;
};

export function enrichProject(project: Project): EnrichedProject {
  return {
    ...project,
    borough: boroughFromLocation(project.location),
    kind: kindFromFilters(project.filters),
    coords: coordsForProject(project.id),
    featured: FEATURED_PROJECT_IDS.includes(
      project.id as (typeof FEATURED_PROJECT_IDS)[number],
    ),
  };
}

export const ENRICHED_PROJECTS = PROJECTS.map(enrichProject);

export function boroughTiles(projects: EnrichedProject[] = ENRICHED_PROJECTS) {
  const counts = new Map<BoroughId, { label: string; count: number }>();
  for (const project of projects) {
    const current = counts.get(project.borough.id);
    if (current) current.count += 1;
    else
      counts.set(project.borough.id, {
        label: project.borough.label,
        count: 1,
      });
  }
  return [...counts.entries()]
    .map(([id, value]) => ({ id, ...value }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export const BOROUGH_COUNT = boroughTiles().length;

export type ProjectHashState = {
  type?: ProjectKind | "all";
  borough?: BoroughId;
  q?: string;
  view?: ProjectView;
};

export function parseProjectHash(hash: string): ProjectHashState {
  const raw = hash.replace(/^#/, "");
  const qIndex = raw.indexOf("?");
  if (!raw.startsWith("projects") || qIndex === -1) return {};
  const params = new URLSearchParams(raw.slice(qIndex + 1));
  const type = params.get("type") as ProjectHashState["type"];
  const borough = params.get("borough") as BoroughId | null;
  const q = params.get("q") ?? undefined;
  const view = params.get("view") as ProjectView | null;
  const types: ProjectKind[] = [
    "airport",
    "bridge",
    "residential",
    "commercial",
  ];
  const views: ProjectView[] = ["grid", "list", "map"];
  return {
    type: type === "all" || (type && types.includes(type)) ? type : undefined,
    borough: borough ?? undefined,
    q: q || undefined,
    view: view && views.includes(view) ? view : undefined,
  };
}

export function writeProjectHash(state: ProjectHashState) {
  const params = new URLSearchParams();
  if (state.type && state.type !== "all") params.set("type", state.type);
  if (state.borough) params.set("borough", state.borough);
  if (state.q?.trim()) params.set("q", state.q.trim());
  if (state.view && state.view !== "grid") params.set("view", state.view);
  const query = params.toString();
  const next = query ? `#projects?${query}` : "#projects";
  window.history.replaceState(null, "", next);
}

export function sectionIdFromHash(hash: string) {
  const raw = hash.replace(/^#/, "");
  if (!raw) return "home";
  return raw.split("?")[0] || "home";
}

export function filterProjects(
  projects: EnrichedProject[],
  state: {
    type?: ProjectKind | "all";
    borough?: BoroughId;
    q?: string;
  },
) {
  const query = state.q?.trim().toLowerCase() ?? "";
  return projects.filter((project) => {
    if (state.type && state.type !== "all" && project.kind.id !== state.type) {
      return false;
    }
    if (state.borough && project.borough.id !== state.borough) return false;
    if (!query) return true;
    return (
      project.name.toLowerCase().includes(query) ||
      project.location.toLowerCase().includes(query) ||
      project.kind.label.toLowerCase().includes(query) ||
      project.borough.label.toLowerCase().includes(query)
    );
  });
}
