export type PlacementEnv =
  | "dry-interior"
  | "damp-interior"
  | "exterior"
  | "deicing"
  | "bridge-marine";

export type Coating = "Plain" | "Epoxy" | "Galvanized" | "Stainless";

export const PLACEMENT_ENVS: {
  id: PlacementEnv;
  label: string;
  description: string;
}[] = [
  {
    id: "dry-interior",
    label: "Dry interior",
    description: "Conditioned indoor slabs, walls, and columns with no moisture exposure.",
  },
  {
    id: "damp-interior",
    label: "Damp / wet interior",
    description: "Parking decks, basements, wash-down areas, or chronically damp interiors.",
  },
  {
    id: "exterior",
    label: "Exterior / exposed",
    description: "Outdoor members exposed to weather but not chlorides or salt spray.",
  },
  {
    id: "deicing",
    label: "Deicing / chlorides",
    description: "Roads, ramps, and structures that see deicing salts.",
  },
  {
    id: "bridge-marine",
    label: "Bridge / marine",
    description: "Bridges, piers, seawalls, and splash-zone or saltwater exposure.",
  },
];

export type CoatingAdvice = {
  recommended: Coating;
  alternate?: Coating;
  why: string;
  product: string;
};

export const COATING_BY_ENV: Record<PlacementEnv, CoatingAdvice> = {
  "dry-interior": {
    recommended: "Plain",
    why: "Dry interiors typically do not need a corrosion coating. Uncoated ASTM A615/A706 is the economical choice.",
    product: "Plain reinforcing steel",
  },
  "damp-interior": {
    recommended: "Epoxy",
    why: "Moisture and condensation accelerate rust. Fusion-bonded epoxy adds a barrier without jumping to a metallic coating.",
    product: "Epoxy coated rebar",
  },
  exterior: {
    recommended: "Epoxy",
    why: "Weather-exposed members benefit from a barrier coating. Epoxy is the usual first step before galvanizing.",
    product: "Epoxy coated rebar",
  },
  deicing: {
    recommended: "Epoxy",
    why: "Chlorides from deicing salts attack black bar quickly. Epoxy is the standard chloride-resistant option for this exposure.",
    product: "Epoxy coated rebar",
  },
  "bridge-marine": {
    recommended: "Galvanized",
    alternate: "Stainless",
    why: "Salt spray and splash zones need a metallic barrier. Hot-dip galvanized is the usual spec; stainless is the upgrade for the harshest marine work.",
    product: "Hot dipped galvanized rebar",
  },
};
