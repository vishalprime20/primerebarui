"use client";

import { BuildingRevealBackground } from "./BuildingRevealBackground";

/**
 * Full-bleed hero: finished building ↔ photoreal rebar detailing wipe.
 */
export function HeroVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black">
      <BuildingRevealBackground />

      {/* Strong left scrim so brand copy stays readable over busy photos */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent md:from-black/95 md:via-black/55 md:to-transparent md:w-[70%]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/45" />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-full max-w-3xl md:max-w-[52%]"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 18% 48%, rgba(12,14,18,0.72), transparent 72%)",
        }}
      />
    </div>
  );
}
