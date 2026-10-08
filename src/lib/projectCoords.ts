/** City-level pins for the schematic NY/NJ map. Not survey-accurate. */

export type LatLng = { lat: number; lng: number };

const CITY: Record<string, LatLng> = {
  queens: { lat: 40.7282, lng: -73.7949 },
  manhattan: { lat: 40.758, lng: -73.9855 },
  brooklyn: { lat: 40.6782, lng: -73.9442 },
  bronx: { lat: 40.8448, lng: -73.8648 },
  "jersey-city": { lat: 40.7178, lng: -74.0431 },
  hackensack: { lat: 40.8859, lng: -74.0435 },
};

function jitter(base: LatLng, seed: string): LatLng {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const dLat = ((h % 19) - 9) * 0.0032;
  const dLng = (((h >>> 8) % 19) - 9) * 0.0038;
  return { lat: base.lat + dLat, lng: base.lng + dLng };
}

const CITY_BY_ID: Record<string, keyof typeof CITY> = {
  "jfk-t6": "queens",
  "jfk-substation": "queens",
  "jfk-t5": "queens",
  "46-10-70th": "queens",
  "5th-ave-bridge": "manhattan",
  "147-35-95th": "manhattan",
  "620-w-153rd": "manhattan",
  "509-3rd": "manhattan",
  "249-east-62": "manhattan",
  "113-w-24th": "manhattan",
  "98-08-queens": "manhattan",
  "virgin-hotels": "manhattan",
  "240-willoughby": "brooklyn",
  "334-wallabout": "brooklyn",
  "1634-flatbush": "brooklyn",
  "625-fulton": "brooklyn",
  "69-adams": "brooklyn",
  "347-flushing": "brooklyn",
  "200-montague": "brooklyn",
  "200-kent": "brooklyn",
  "310-grand": "bronx",
  "1850-jerome": "bronx",
  "198-135th": "bronx",
  "626-newark": "jersey-city",
  "622-summit": "jersey-city",
  "711-montgomery": "jersey-city",
  "321-main": "hackensack",
};

export function coordsForProject(id: string): LatLng | null {
  const city = CITY_BY_ID[id];
  if (!city) return null;
  return jitter(CITY[city], id);
}

export const MAP_BOUNDS = {
  west: -74.22,
  east: -73.68,
  south: 40.56,
  north: 40.92,
} as const;
