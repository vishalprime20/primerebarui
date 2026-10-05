/** CRSI theoretical unit weights (lb per linear foot). */
export const BAR_SIZES = [
  { size: "#3", lbPerFt: 0.376 },
  { size: "#4", lbPerFt: 0.668 },
  { size: "#5", lbPerFt: 1.043 },
  { size: "#6", lbPerFt: 1.502 },
  { size: "#7", lbPerFt: 2.044 },
  { size: "#8", lbPerFt: 2.67 },
  { size: "#9", lbPerFt: 3.4 },
  { size: "#10", lbPerFt: 4.303 },
  { size: "#11", lbPerFt: 5.313 },
  { size: "#14", lbPerFt: 7.65 },
  { size: "#18", lbPerFt: 13.6 },
] as const;

export type BarSize = (typeof BAR_SIZES)[number]["size"];

export function lbPerFoot(size: string): number {
  return BAR_SIZES.find((b) => b.size === size)?.lbPerFt ?? 0;
}

export function lineWeightLb(size: string, lengthFt: number, qty: number): number {
  if (!Number.isFinite(lengthFt) || !Number.isFinite(qty)) return 0;
  return lbPerFoot(size) * Math.max(0, lengthFt) * Math.max(0, qty);
}

export function shortTons(lb: number): number {
  return lb / 2000;
}

export function formatLb(lb: number): string {
  return Math.round(lb).toLocaleString("en-US");
}

export function formatTons(lb: number): string {
  return shortTons(lb).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
