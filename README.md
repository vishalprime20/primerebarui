# Prime Rebar Website

Modern, industrial **single-page** marketing site for **Prime Rebar** — leading rebar fabricator in New York & New Jersey.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and an optional lightweight **Three.js / React Three Fiber** hero scene (desktop only; graceful CSS fallback on mobile / reduced motion).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build         # static export → out/
npm run build:pages   # static export with GitHub Pages basePath
npm run lint          # eslint
npx serve out         # preview static build locally
```

## Deploy to GitHub Pages

Workflow: [`.github/workflows/main.yml`](.github/workflows/main.yml)

1. Repo **Settings → Pages → Build and deployment → Source**: **GitHub Actions**
2. Push to `main` (or `master`), or run the workflow manually under **Actions**
3. Site URL: `https://vishalprime20.github.io/primerebarui/`

`GITHUB_PAGES=true` sets `basePath` / `assetPrefix` to `/primerebarui` (must match the repo name).

## Single-page sections

Everything lives on `/` with smooth-scroll navigation:

| Anchor        | Section                                      |
|---------------|----------------------------------------------|
| `#home`       | Hero                                         |
| `#about`      | Story, facility, animated stats              |
| `#services`   | Services + fabrication capabilities          |
| `#products`   | Tabbed product categories                    |
| `#projects`   | Filterable project portfolio                 |
| `#gallery`    | Masonry gallery + accessible lightbox        |
| `#contact`    | Quote form, office details, map embed        |

Nav highlights the active section as you scroll.

## Brand tokens

CSS variables live in `src/app/globals.css`:

- Palette: charcoal / graphite / steel / ink / **safety orange** accent (`--color-accent`)
- Fonts: **Bebas Neue** (display) + **Source Sans 3** (body) via `next/font`
- Shared layout: `Header`, `Footer` in `src/components/layout/`

## Swap logo & images later

| Asset | Where to change |
|-------|-----------------|
| Wordmark / logo | `src/components/layout/Header.tsx` and `Footer.tsx` — replace the text wordmark with an `<Image>` pointing at `public/logo.svg` (or `.png`) |
| Hero background | `src/components/hero/HeroVisual.tsx` — replace the Unsplash `src` with `/images/hero.jpg` |
| Gallery photos | `src/lib/data.ts` → `GALLERY_IMAGES` — use local paths under `public/gallery/` |
| Optional 3D hero | `src/components/hero/SteelScene.tsx` — tweak materials or disable via `HeroVisual` |

Recommended folder for local media:

```
public/
  logo.svg
  images/
    hero.jpg
  gallery/
    01.jpg
    ...
```

## Notes

- Contact form shows a client-side success state (“Thanks for submitting!”). Wire it to your email/API endpoint when ready (`src/components/contact/ContactForm.tsx`).
- Motion respects `prefers-reduced-motion`; WebGL rebar scene is limited to fine-pointer desktop viewports.
- Content and contact details are centralized in `src/lib/constants.ts` and `src/lib/data.ts`.
