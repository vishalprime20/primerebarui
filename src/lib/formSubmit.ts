export const CRM_ENDPOINT = process.env.NEXT_PUBLIC_MWS_CRM_ENDPOINT ?? "";
const CRM_FORM_TOKEN = process.env.NEXT_PUBLIC_MWS_CRM_FORM_TOKEN ?? "";

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

export async function postFormPayload(
  fields: Record<string, string>,
  file?: File | null,
): Promise<{ ok: boolean; skipped?: boolean }> {
  if (!CRM_ENDPOINT) return { ok: false, skipped: true };

  const name = (fields.name ?? "").trim();
  const email = (fields.email ?? "").trim();
  const message = crmMessage(fields, file).trim();
  if (!name || !email || !message) return { ok: false, skipped: true };

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
    body: JSON.stringify({
      name,
      email,
      phone: (fields.phone ?? "").trim() || null,
      company: (fields.company ?? "").trim() || null,
      message,
      division: "PR",
    }),
  });
  return { ok: res.ok };
}
