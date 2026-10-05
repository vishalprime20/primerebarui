/** Calendar days before pour that shop drawings should be submitted. */
export const DRAWING_LEAD_DAYS = 14;

export function addCalendarDays(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
}

export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatDisplayDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function drawingDeadline(pourIso: string): string {
  return addCalendarDays(pourIso, -DRAWING_LEAD_DAYS);
}

export function isRush(pourIso: string, todayIso = toIsoDate(new Date())): boolean {
  return drawingDeadline(pourIso) < todayIso;
}
