export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

export async function postFormPayload(
  fields: Record<string, string>,
  file?: File | null,
): Promise<{ ok: boolean; skipped?: boolean }> {
  if (!FORM_ENDPOINT) return { ok: false, skipped: true };

  const body = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    if (value) body.append(key, value);
  });
  if (file) {
    body.append("drawings", file, file.name);
    body.append("drawingsName", file.name);
  }

  const res = await fetch(FORM_ENDPOINT, {
    method: "POST",
    body,
    headers: { Accept: "application/json" },
  });
  return { ok: res.ok };
}
