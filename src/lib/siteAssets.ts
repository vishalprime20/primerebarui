const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Asset path under public/images/site-files (spaces encoded for URLs). */
export function siteAsset(filename: string) {
  const encoded = filename
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  return `${BASE}/images/site-files/${encoded}`;
}

/** Converted gallery still under public/images/gallery. */
export function galleryWebp(id: string) {
  return `${BASE}/images/gallery/${id}.webp`;
}

/** JPEG fallback for gallery stills stored under public/images/gallery. */
export function galleryJpg(id: string) {
  return `${BASE}/images/gallery/${id}.jpg`;
}

/** Gallery demo video under public/images/gallery. */
export function galleryVideo(filename: string) {
  return `${BASE}/images/gallery/${encodeURIComponent(filename)}`;
}

/** Featured-project still under public/images/projects. */
export function projectPhoto(id: string) {
  return `${BASE}/images/projects/${id}.jpg`;
}
