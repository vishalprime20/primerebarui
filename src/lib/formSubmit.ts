export const CRM_ENDPOINT = process.env.NEXT_PUBLIC_MWS_CRM_ENDPOINT ?? "";
const CRM_FORM_TOKEN = process.env.NEXT_PUBLIC_MWS_CRM_FORM_TOKEN ?? "";
const MAX_DRAWING_BYTES = 7 * 1024 * 1024;

function crmMessage(fields: Record<string, string>, file?: File | null): string {
  const extras = [
    fields.projectType && `Project type: ${fields.projectType}`,
    fields.pourDate && `Pour date: ${fields.pourDate}`,
    (fields.drawingsName || file?.name) &&
      `Drawings: ${fields.drawingsName || file?.name}`,
    fields.source &&
      fields.source !== "primerebar.com" &&
      `Source: ${fields.source}`,
  ].filter(Boolean);
  return [fields.message ?? "", ...extras].filter(Boolean).join("\n\n");
}

async function fileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export async function postFormPayload(
  fields: Record<string, string>,
  file?: File | null,
): Promise<{ ok: boolean; skipped?: boolean }> {
  if (!CRM_ENDPOINT) return { ok: false, skipped: true };

  const name = (fields.name ?? "").trim();
  const email = (fields.email ?? "").trim();
  const message = crmMessage(fields, file).trim();
  if (!name || !email || !message) return { ok: false, skipped: true };

  const payload: Record<string, string | null> = {
    name,
    email,
    phone: (fields.phone ?? "").trim() || null,
    company: (fields.company ?? "").trim() || null,
    message,
    division: "PR",
  };

  const drawing = file && file.size > 0 ? file : null;
  if (drawing && drawing.size <= MAX_DRAWING_BYTES) {
    payload.drawingsName = drawing.name;
    payload.drawingsType = drawing.type || "application/octet-stream";
    payload.drawingsBase64 = await fileToBase64(drawing);
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (CRM_FORM_TOKEN) {
    headers["X-MWS-Form-Token"] = CRM_FORM_TOKEN;
  }

  const res = await fetch(CRM_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  return { ok: res.ok };
}
