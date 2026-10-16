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

## Deploy to GitHub Pages (`www.primerebar.com`)

Workflow: [`.github/workflows/main.yml`](.github/workflows/main.yml)

1. Repo **Settings → Pages → Build and deployment → Source**: **GitHub Actions**
2. Pages **Custom domain**: `www.primerebar.com` (`public/CNAME`)
3. Push to `main`, or run the workflow under **Actions**
4. At the DNS host (currently Wix), point:

   - `www` **CNAME** → `vishalprime20.github.io`

Live URL: [https://www.primerebar.com](https://www.primerebar.com)

Do **not** set `GITHUB_PAGES=true` for this domain. That flag is only for the project URL `https://vishalprime20.github.io/primerebarui/` (`npm run build:pages`).

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
| Hero 3D studio scene | `src/components/hero/PremiumConstructionScene.tsx` — luxury concrete + rebar block; wired in `HeroVisual.tsx` (right-split, `pointer-events-none`) |
| Gallery photos | `src/lib/data.ts` → `GALLERY_IMAGES` — use local paths under `public/gallery/` |

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
