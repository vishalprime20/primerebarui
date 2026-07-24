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
npm run build   # production build
npm start       # serve production build
npm run lint    # eslint
```

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
