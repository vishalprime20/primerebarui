const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Asset path under public/images/site-files (spaces encoded for URLs). */
export function siteAsset(filename: string) {
  const encoded = filename
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  return `${BASE}/images/site-files/${encoded}`;
}
